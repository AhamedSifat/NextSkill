import { redirect } from 'next/navigation';
import { LoginForm } from './_components/login-form';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    return redirect('/');
  }
  return <LoginForm />;
}
