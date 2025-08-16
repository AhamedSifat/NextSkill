import { prisma } from '@/lib/prisma';
import { requireAdmin } from './require-admin';
import { notFound } from 'next/navigation';

export const adminGetCourse = async (id: string) => {
  await requireAdmin();
  const data = await prisma.course.findUnique({
    where: {
      id: id,
    },

    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      status: true,
      level: true,
      price: true,
      fileKey: true,
      slug: true,
      category: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
};

export type CourseType = Awaited<ReturnType<typeof adminGetCourse>>;
