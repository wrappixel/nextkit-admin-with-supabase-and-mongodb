'use client'
import { redirect, usePathname } from 'next/navigation';
import useAuth from './UseAuth';
import { useEffect } from 'react';

const GuestGuard = ({ children }: any) => {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (isAuthenticated) {

      redirect('/');
    }
  }, [isAuthenticated, pathname]);


  return children;
};

export default GuestGuard;
