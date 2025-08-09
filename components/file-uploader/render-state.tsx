import { CloudUploadIcon, ImageOffIcon, Loader2, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Image from 'next/image';
export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  return (
    <div className='flex flex-col items-center justify-center text-center'>
      {/* Icon container */}
      <div className='flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 mb-4'>
        <CloudUploadIcon
          className={cn(
            'w-6 h-6 text-gray-500',
            isDragActive && 'text-blue-500'
          )}
        />
      </div>

      {/* Text */}
      <p className='text-base font-semibold text-gray-800'>
        Drop your files here or{' '}
        <span className=' font-bold cursor-pointer'>click to upload</span>
      </p>

      {/* Button */}
      <Button type='button' className='mt-4  text-white hover:bg-blue-600'>
        Select File
      </Button>
    </div>
  );
}

export function RenderErrorState() {
  return (
    <div className='text-center'>
      <div className='flex items-center mx-auto justify-center size-12 rounded-full bg-destructive/30 mb-4'>
        <ImageOffIcon className={cn('size-6 text-destructive')} />
      </div>

      <p className='text-base font-semibold'>Upload Failed</p>
      <p className='text-xs mt-1 text-muted-foreground'>Something went wrong</p>

      <Button className='mt-4' type='button'>
        Retry File Selection
      </Button>
    </div>
  );
}

export function RenderUploadedState({
  previewUrl,
  isDeleting,
  removeFile,
}: {
  previewUrl: string;
  isDeleting: boolean;
  removeFile: () => void;
}) {
  return (
    <div>
      <Image
        src={previewUrl}
        alt='Uploaded File'
        fill
        className='object-contain p-2'
      />
      <Button
        variant='destructive'
        size='icon'
        className={cn(['absolute top-4 right-4'])}
        onClick={removeFile}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <Loader2 className='size-4 animated-spin' />
        ) : (
          <XIcon className='size-4' />
        )}
      </Button>
    </div>
  );
}

export function RenderUploadingState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className='text-center flex justify-center items-center flex-col'>
      <p>{progress}</p>
      <p className='mt-2 text-sm font-medium text-foreground'>Uploading...</p>
      <p className='mt-1 text-xs text-muted-foreground truncate max-w-xs'>
        {file.name}
      </p>
    </div>
  );
}
