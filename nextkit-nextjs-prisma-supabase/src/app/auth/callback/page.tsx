
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/guards/supabase/supabaseClient';
import Spinner from '@/app/components/shared/spinner/Spinner';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/');
      } else {
        console.log('No session found');
      }
    });
  }, [router]);

  return <Spinner/>;
}
