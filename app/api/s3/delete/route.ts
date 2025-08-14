import { NextResponse } from 'next/server';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { S3 } from '@/lib/s3Client';

import { arcjet } from '../upload/route';
import { toast } from 'sonner';
import { requireAdmin } from '@/app/data/admin/require-admin';

export async function DELETE(request: Request) {
  const session = await requireAdmin();
  try {
    const decision = await arcjet.protect(request, {
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

    const body = await request.json();
    const key = body.key;

    if (!key || typeof key !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid object key.' },
        { status: 400 }
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });

    await S3.send(command);

    return NextResponse.json(
      { message: 'File deleted successfully' },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete file.' },
      { status: 500 }
    );
  }
}
