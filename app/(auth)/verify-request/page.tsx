'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { CheckCircle, Loader2, Mail, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useState, useTransition, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [resendPending, startResendTransition] = useTransition();
  const [otp, setOtp] = useState<string>('');
  const [email, setEmail] = useState('');

  console.log(email);
  console.log(otp === '922054');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleVerifyOtp = () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    startTransition(async () => {
      try {
        const { error } = await authClient.emailOtp.verifyEmail({
          email,
          otp,
        });

        if (error) {
          toast.error('Invalid OTP. Please try again.');
          console.log(error);
        } else {
          toast.success('Email verified successfully!');
          router.push('/');
        }
      } catch {
        toast.error('Internal server error');
      }
    });
  };

  const handleResendOtp = () => {
    startResendTransition(async () => {
      await authClient.emailOtp.sendVerificationOtp({
        email: email,
        type: 'sign-in',
        fetchOptions: {
          onSuccess: () => {
            toast.success('New OTP sent to your email');
          },
          onError: () => {
            toast.error('Failed to resend OTP');
          },
        },
      });
    });
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <div className='min-h-screen  from-blue-50 to-purple-50 flex items-center justify-center p-4'>
      <Card className='w-full max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur-sm'>
        <CardHeader className='space-y-3 pb-6'>
          <div className='flex flex-col items-center space-y-2'>
            <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-2'>
              <Mail className='w-8 h-8 text-white' />
            </div>
            <CardTitle className='text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent'>
              Verify Your Email
            </CardTitle>
            <p className='text-sm text-gray-500 text-center'>
              We&apos;ve sent a verification code to
            </p>
            <p className='text-sm font-medium text-gray-700'>{email}</p>
          </div>
        </CardHeader>

        <CardContent className='space-y-6 px-6 pb-6'>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label
                htmlFor='otp'
                className='text-sm font-medium text-gray-700'
              >
                Enter Verification Code
              </Label>
              <Input
                id='otp'
                type='text'
                value={otp}
                onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                placeholder='Enter 6-digit code'
                className='h-12 text-center text-lg font-mono tracking-widest border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200'
                maxLength={6}
                required
              />
            </div>

            <Button
              onClick={handleVerifyOtp}
              disabled={isPending || otp.length !== 6}
              className='w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isPending ? (
                <>
                  <Loader2 className='w-5 h-5 mr-3 animate-spin' />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <CheckCircle className='w-5 h-5 mr-3' />
                  <span>Verify Email</span>
                </>
              )}
            </Button>
          </div>

          <div className='space-y-3'>
            <div className='flex items-center justify-center space-x-1 text-sm'>
              <span className='text-gray-500'>
                Didn&apos;t receive the code?
              </span>
              <button
                onClick={handleResendOtp}
                disabled={resendPending}
                className='text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors disabled:opacity-50'
              >
                {resendPending ? 'Sending...' : 'Resend'}
              </button>
            </div>

            <button
              onClick={handleBackToLogin}
              className='flex items-center justify-center space-x-2 w-full text-sm text-gray-500 hover:text-gray-700 transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              <span>Back to login</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
