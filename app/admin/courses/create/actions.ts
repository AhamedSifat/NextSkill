import { prisma } from '@/lib/prisma';
import { courseSchema, CourseSchemaType } from '@/lib/schema';
import { CreateCourseResponse } from './types';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const CreateCourse = async (
  data: CourseSchemaType
): Promise<CreateCourseResponse> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
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
