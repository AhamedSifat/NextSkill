'use client';

import { useCallback, useEffect, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadedState,
  RenderUploadingState,
} from './render-state';
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

export const Uploader = () => {
  const [file, setFile] = useState<UploadFile>({
    error: false,
    file: null,
    id: null,
    uploading: false,
    progress: 0,
    isDeleting: false,
    fileType: 'image',
  });

  const uploadFile = async (file: File) => {
    setFile((prev) => ({
      ...prev,
      uploading: true,
    }));

    try {
      const presignedResponse = await fetch('/api/s3/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });

      if (!presignedResponse.ok) {
        toast.error('Failed to get presigned URL');
        setFile((prev) => ({
          ...prev,
          uploading: false,
          error: true,
          progress: 0,
        }));
        return;
      }
      const { presignedUrl, key } = await presignedResponse.json();
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', presignedUrl, true);
        xhr.setRequestHeader('Content-Type', file.type);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setFile((prev) => ({
              ...prev,
              key: key,
              progress: progress,
            }));
          }
        };

        xhr.onload = () => {
          if (xhr.status === 200) {
            setFile((prev) => ({
              ...prev,
              key: key,
              progress: 100,
              uploading: false,
            }));

            toast.success('File uploaded successfully');
            resolve();
          } else {
            reject(new Error('Failed to upload file'));
          }
        };
        xhr.onerror = () => {
          reject(new Error('Failed to upload file'));
        };
        xhr.send(file);
      });
    } catch {
      toast.error('Failed to upload file');

      setFile((prev) => ({
        ...prev,

        progress: 0,
        uploading: false,
        error: true,
      }));
    }
  };

  const removeFile = async () => {
    try {
      if (file.isDeleting || !file.key) return;
      setFile((prevFile) => ({
        ...prevFile,
        isDeleting: true,
      }));

      const response = await fetch('/api/s3/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: file?.key }),
      });

      if (!response.ok) {
        toast.error('Failed to remove file from storage.');
        setFile((prevFile) => ({
          ...prevFile,
          isDeleting: false,
          error: true,
        }));
        return;
      }

      if (file.objectUrl && !file.objectUrl.startsWith('http')) {
        URL.revokeObjectURL(file.objectUrl);
      }
      setFile({
        error: false,
        file: null,
        id: null,
        uploading: false,
        progress: 0,
        isDeleting: false,
        fileType: 'image',
      });
      toast.success('File removed successfully');
    } catch {
      toast.error('Failed to remove file from storage.');
      setFile((prevFile) => ({
        ...prevFile,
        isDeleting: false,
        error: true,
      }));
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const newFile = acceptedFiles[0];

        if (file.objectUrl && !file.objectUrl.startsWith('http')) {
          URL.revokeObjectURL(file.objectUrl);
        }
        setFile({
          id: crypto.randomUUID(),
          file: newFile,
          uploading: false,
          progress: 0,
          isDeleting: false,
          error: false,
          objectUrl: URL.createObjectURL(newFile),
          fileType: 'image',
        });

        uploadFile(newFile);
      }
    },
    [file.objectUrl]
  );

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
    disabled: file.uploading || !!file.objectUrl,
  });

  const renderContent = () => {
    if (file.uploading) {
      return (
        <RenderUploadingState
          file={file.file as File}
          progress={file.progress}
        />
      );
    }
    if (file.error) {
      return <RenderErrorState />;
    }

    if (file.objectUrl) {
      return (
        <RenderUploadedState
          isDeleting={file.isDeleting}
          previewUrl={file.objectUrl}
          removeFile={removeFile}
        />
      );
    }
    return <RenderEmptyState isDragActive={isDragActive} />;
  };

  useEffect(() => {
    return () => {
      if (file.objectUrl && !file.objectUrl.startsWith('http')) {
        URL.revokeObjectURL(file.objectUrl);
      }
    };
  }, [file.objectUrl]);

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
        {renderContent()}
      </CardContent>
    </Card>
  );
};
