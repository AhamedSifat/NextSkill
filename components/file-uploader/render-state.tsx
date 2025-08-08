import { CloudUploadIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <>
      <div className='text-center'>
        <div className='flex items-center mx-auto justify-center size-12 rounded-full bg-muted mb-4'>
          <CloudUploadIcon
            className={cn(
              'size-6 text-muted-foreground',
              isDragActive && 'text-primary'
            )}
          />
        </div>
        <p className='text-base font-semibold text-foreground'>
          Drop your files here or{' '}
          <span className='text-primary font-bold cursor-pointer'>
            click to upload
          </span>
        </p>
      </div>
      <Button type='button' className='mt-4'>
        Select File
      </Button>
    </>
  );
}
