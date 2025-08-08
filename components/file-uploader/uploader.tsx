'use client';
import { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { RenderEmptyState } from './render-state';
import { toast } from 'sonner';

interface UploadFile {
  id: string | null;
  file: File | null;
  uploading: boolean;
  progress: number;
  key?: string;
  isDeleting: boolean;
  error: boolean;
  objectUrl?: string;
  fileType: 'image' | 'video';
}

export const Uplaoder = () => {
  const [files, setFiles] = useState<UploadFile>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: 'image',
  });

  const uploadFile = (file: File) => {
    setFiles((prev) => ({
      ...prev,
      uploading: true,
    }));
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const newFile = acceptedFiles[0];
      setFiles({
        id: crypto.randomUUID(),
        file: newFile,
        uploading: false,
        progress: 0,
        isDeleting: false,
        error: false,
        objectUrl: URL.createObjectURL(newFile),
        fileType: 'image',
      });
    }
  }, []);

  const rejectedFiles = (fileRejection: FileRejection[]) => {
    if (fileRejection.length) {
      const tooManyFile = fileRejection.find(
        (rejection) => rejection.errors[0].code === 'too-many-file'
      );

      const fileSizeTooBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === 'file-too-large'
      );

      if (fileSizeTooBig) {
        toast.error('File Size exceeds the limit');
      }

      if (tooManyFile) {
        toast.error('Too many files selected, max is 1');
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,

    accept: { 'image/*': [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: rejectedFiles,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        'relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64',
        isDragActive
          ? 'border-primary bg-primary/10 border-solid'
          : 'border-border hover:border-primary'
      )}
    >
      <CardContent className='flex items-center justify-center h-full w-full p-4'>
        <input {...getInputProps()} />
        <RenderEmptyState isDragActive={isDragActive} />
      </CardContent>
    </Card>
  );
};
