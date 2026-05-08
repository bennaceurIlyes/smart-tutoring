'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AccountsPage() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    };

    checkUser();
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
      <div className="animate-pulse" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Redirecting...</h2>
        <div className="animate-spin" style={{ width: '40px', height: '40px', border: '4px solid var(--primary)', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto' }}></div>
      </div>
    </div>
  );
}
