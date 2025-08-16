'use server';

import { prisma } from '@/lib/prisma';
import { courseSchema, CourseSchemaType } from '@/lib/schema';

import { requireAdmin } from '@/app/data/admin/require-admin';
import { arcjet } from '@/app/api/s3/upload/route';
import { request } from '@arcjet/next';
import { CreateCourseResponse } from '../../create/types';

export const editCourse = async (
  data: CourseSchemaType,
  courseId: string
): Promise<CreateCourseResponse> => {
  const user = await requireAdmin();
  try {
    const req = await request();
    const decision = await arcjet.protect(req, {
      userId: user?.user.id as string,
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

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.user.id,
      },
      data: {
        ...validation.data,
      },
    });

    return {
      status: 'success',
      message: 'Course updated successfully',
    };
  } catch (error) {
    console.error('Error updating course:', error);
    return {
      status: 'error',
      message: 'Failed to update course',
    };
  }
};
