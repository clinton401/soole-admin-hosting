"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = Boolean(localStorage.getItem("token"));
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [router]);

  return <>{children}</>;
}
