'use client';

import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withGuest = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithGuest: React.FC<P> = (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated) {
        router.push('/dashboard');
      }
    }, [isAuthenticated, router]);

    if (isAuthenticated) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  return WithGuest;
};

export default withGuest;
