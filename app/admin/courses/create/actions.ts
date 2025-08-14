'use server';

import { prisma } from '@/lib/prisma';
import { courseSchema, CourseSchemaType } from '@/lib/schema';
import { CreateCourseResponse } from './types';

import { requireAdmin } from '@/app/data/admin/require-admin';
import { arcjet } from '@/app/api/s3/upload/route';
import { request } from '@arcjet/next';

export const CreateCourse = async (
  data: CourseSchemaType
): Promise<CreateCourseResponse> => {
  const session = await requireAdmin();
  try {
    const req = await request();
    const decision = await arcjet.protect(req, {
      userId: session?.user.id as string,
    });

    if (decision.isDenied()) {
      // BOT detection -> deny with 403
      if (decision.reason.isBot()) {
        return {
          status: 'error',
          message: 'You are a bot! if this is a mistake contact our support',
        };
      }

      if (decision.reason.isRateLimit()) {
        return {
          status: 'error',
          message: 'You have been blocked due to rate limiting',
        };
      }
    }
    const validation = courseSchema.safeParse(data);

    if (!validation.success) {
      return {
        status: 'error',
        message: 'Invalid Form Data',
      };
    }

    await prisma.course.create({
      data: {
        ...validation.data,
        duration: Number(validation.data.duration),
        price: Number(validation.data.price),
        userId: session?.user.id,
      },
    });

    return {
      status: 'success',
      message: 'Course created successfully',
    };
  } catch (error) {
    console.error('Error creating course:', error);
    return {
      status: 'error',
      message: 'Failed to create course',
    };
  }
};
