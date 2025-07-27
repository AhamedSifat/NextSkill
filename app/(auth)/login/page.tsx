import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Mail } from 'lucide-react';

export default function LoginPage() {
  return (
    <Card className='w-full border-0 shadow-2xl bg-white/95 backdrop-blur-sm'>
      <CardHeader className='space-y-3 pb-6'>
        <div className='flex flex-col items-center space-y-2'>
          <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-2'>
            <div className='w-8 h-8 bg-white rounded-lg flex items-center justify-center'>
              <div className='w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-sm'></div>
            </div>
          </div>
          <CardTitle className='text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'>
            Welcome Back!
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className='space-y-6 px-6 pb-6'>
        <Button
          className='w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'
          variant='default'
        >
          <Github className='w-5 h-5 mr-3' />
          Continue with GitHub
        </Button>

        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t border-gray-200' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-white px-4 text-gray-500 font-medium'>
              Or continue with email
            </span>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label
              htmlFor='email'
              className='text-sm font-medium text-gray-700'
            >
              Email Address
            </Label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
              <Input
                id='email'
                type='email'
                placeholder='Enter your email'
                className='pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200'
              />
            </div>
          </div>

          <Button className='w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg'>
            Continue with Email
          </Button>
        </div>

        <div className='flex items-center justify-center space-x-1 text-sm'>
          <span className='text-gray-500'>Don&apos;t have an account?</span>
          <button className='text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors'>
            Sign up
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
