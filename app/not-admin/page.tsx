import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { ShieldX } from 'lucide-react';
import Link from 'next/link';

export default function NotAdminPage() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6'>
      <Card className='max-w-md w-full text-center shadow-2xl border border-gray-700 bg-gray-800 text-white'>
        <CardHeader>
          <div className='flex justify-center mb-4'>
            <ShieldX className='w-16 h-16 text-red-500' strokeWidth={1.5} />
          </div>
          <CardTitle className='text-2xl font-bold'>Access Denied</CardTitle>
          <CardDescription className='text-gray-400'>
            You do not have permission to view this page.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className='mb-6 text-gray-300'>
            This area is restricted to administrators only. If you believe this
            is an error, please contact support.
          </p>

          <Link
            href='/'
            className='px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition'
          >
            Go Back Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
