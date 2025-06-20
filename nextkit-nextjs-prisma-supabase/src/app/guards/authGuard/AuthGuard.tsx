'use client';
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from 'react';
import Spinner from "@/app/components/shared/spinner/Spinner";

const AuthGuard = ({ children }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isToken, setIsToken] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("sb-mtzwkjdeadalzldzbuwe-auth-token");
    if (token) {
      setIsToken(true);
    } else {
      setIsToken(false);
      router.push('/auth/login'); 
    }
  }, [pathname, router]);

  if (isToken === null) {
    return <Spinner />;
  }

  if (isToken) {
    return children;
  }

  return <Spinner />;
};

export default AuthGuard;
