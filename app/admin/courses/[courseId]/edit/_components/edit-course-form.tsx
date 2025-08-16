'use client';

import { Uploader } from '@/components/file-uploader/uploader';
import Tiptap from '@/components/text-editor/editor';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  courseCategories,
  courseLevels,
  courseSchema,
  CourseSchemaType,
  courseStatus,
} from '@/lib/schema';
import { tryCatch } from '@/lib/try-catch';
import { Loader2, PlusIcon, SparkleIcon } from 'lucide-react';
import slugify from 'slugify';
import { CreateCourse } from '../../../create/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { editCourse } from '../actions';
import { AdminSingleCourseType } from '@/app/data/admin/admin-get-course';

interface Props {
  data: AdminSingleCourseType;
}

export const EditCourseForm = ({ data }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      fileKey: data.fileKey,
      price: data.price,
      duration: data.duration,
      level: data.level,
      category: data.category as CourseSchemaType['category'],
      smallDescription: data.smallDescription,
      slug: data.slug,
      status: data.status,
    },
  });

  const onSubmit = (values: CourseSchemaType) => {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        editCourse(values, data.id)
      );

      if (error) {
        toast.error('An unexpected error occurred. Please try again');
        return;
      }

      if (result?.status === 'success') {
        toast.success(result.message);
        form.reset();
        router.push('admin/courses');
      }

      if (result?.status === 'error') {
        toast.error(result.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder='Title' {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex gap-4 items-end '>
          <FormField
            control={form.control}
            name='slug'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder='Slug' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='button'
            className='w-fit'
            onClick={() => {
              const title = form.getValues('title');
              const slug = slugify(title);
              form.setValue('slug', slug, { shouldValidate: true });
            }}
          >
            Generate Slug <SparkleIcon className='ml-1' size={16} />
          </Button>
        </div>

        <FormField
          control={form.control}
          name='smallDescription'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Small Description</FormLabel>
              <FormControl>
                <Textarea
                  className='min-h-[120px]'
                  placeholder='Small Description'
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Tiptap field={field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='fileKey'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Thumbnail Image</FormLabel>
              <FormControl>
                <Uploader value={field.value} onChange={field.onChange} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <FormField
            control={form.control}
            name='category'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select Category' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='level'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select Value' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseLevels.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='duration'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Duration (hours)</FormLabel>
                <FormControl>
                  <Input placeholder='Duration' type='number' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='price'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input placeholder='Price' type='number' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Select Status' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {courseStatus.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isPending}>
          {isPending ? (
            <>
              Updating... <Loader2 className='ml-1' size={16} />
            </>
          ) : (
            <>
              Update Course <PlusIcon className='ml-1' size={16} />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
