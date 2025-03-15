import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';

export default function AuthHandler() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('guest', { redirect: false });
    }
  }, [status]);

  return null;
}