"use client";

import { hasCookie } from 'cookies-next';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function NeedsAuth({ children }) {
  const router = useRouter();

  useEffect(() => {
    if (!hasCookie('logged_in')) {
      router.replace('/login');
    }
  }, []);

  return hasCookie('logged_in') ? children : null;
}