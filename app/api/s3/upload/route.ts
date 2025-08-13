import { PutObjectCommand } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3 } from '@/lib/s3Client'; // Adjust the import path as necessary
import { aj, detectBot, fixedWindow } from '@/lib/arcjet';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { toast } from 'sonner';
const uploadRequestSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
  size: z.number(),
});

export const arcjet = aj
  .withRule(
    detectBot({
      mode: 'LIVE',
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
      window: '1m', // 60 second fixed window
      max: 5, // allow a maximum of 5 requests
    })
  );

export const POST = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  try {
    const decision = await arcjet.protect(req, {
      userId: session?.user.id as string,
    });

    if (decision.isDenied()) {
      // BOT detection -> deny with 403
      if (decision.reason.isBot()) {
        toast.error('Arcjet denied: bot detected');

        console.warn('Arcjet denied: bot detected', {
          reason: decision.reason,
        });
        return NextResponse.json(
          { error: 'Bot detected', reason: { type: 'bot' } },
          { status: 403 }
        );
      }

      if (decision.reason.isRateLimit()) {
        toast.error('Arcjet denied: rate limit');
        console.warn('Arcjet denied: rate limit', {
          userId: session?.user?.id,
        });
        return NextResponse.json(
          { error: 'Rate limit exceeded' },
          { status: 429 }
        );
      }
    }

    const body = await req.json();
    const result = uploadRequestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid request payload' },
        { status: 400 }
      );
    }

    const { filename, contentType, size } = result.data;
    const uniqueKey = `${crypto.randomUUID()}_${filename}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // URL expires in 6 minutes
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    );
  }
};
