'use client';
import { useSettings } from '@/hooks/useSettings';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useSettings();
  const [mounted, setMounted] = useState(false);

  // 서버/클라이언트 하이드레이션 불일치 방지 (마운트 후 한 번만 실행되는 플래그)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 최초 마운트 시 1회만 실행되는 하이드레이션 가드
    setMounted(true);
  }, []);

  if (!mounted) return <div style={{ minHeight: '100vh' }}>{children}</div>;

  return (
    <div
      style={{
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f5f5f5',
        color: theme === 'dark' ? '#ededed' : '#171717',
        minHeight: '100vh',
        transition: 'all 0.3s',
      }}
    >
      <Navbar />
      <main style={{ padding: '2rem', maxWidth: '640px', margin: '0 auto' }}>
        {children}
      </main>
    </div>
  );
}
