import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse'></div>
        <div
          className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse'
          style={{ animationDelay: '1s' }}
        ></div>
      </div>

      <Button
        variant='outline'
        className='absolute left-6 top-6 h-10 w-10 p-0 border-gray-200 hover:border-gray-300 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-200 hover:scale-105'
      >
        <ArrowLeft className='w-4 h-4' />
      </Button>

      <div className='w-full max-w-md space-y-8 relative z-10'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent'>
            NextSkills
          </h1>
          <div className='w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-2 rounded-full'></div>
        </div>

        {children}

        <div className='text-center text-xs text-gray-500 leading-relaxed max-w-sm mx-auto'>
          By continuing, you agree to our{' '}
          <button className='text-blue-600 hover:text-blue-700 hover:underline transition-colors'>
            Terms of Service
          </button>{' '}
          and{' '}
          <button className='text-blue-600 hover:text-blue-700 hover:underline transition-colors'>
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}
