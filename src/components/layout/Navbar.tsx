'use client';
import { useSettings } from '@/hooks/useSettings';
import { FilterType } from '@/types/todo';
import Link from 'next/link';

const FILTERS: FilterType[] = ['all', '진행 중', '완료'];

export default function Navbar() {
  const { theme, filter, handleToggleTheme, handleSetFilter } = useSettings();

  return (
    <nav
      style={{
        padding: '1rem 2rem',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}
    >
      <strong>TodoFlow</strong>

      {/* 필터 버튼 */}
      {FILTERS.map((f) => (
        <button
          key={f}
          onClick={() => handleSetFilter(f)}
          style={{
            fontWeight: filter === f ? 'bold' : 'normal',
            textDecoration: filter === f ? 'underline' : 'none',
          }}
        >
          {f === 'all' ? '전체' : f}
        </button>
      ))}

      <div style={{ marginLeft: 'auto', display: 'flex', gap: '16px' }}>
        <Link href="/">목록</Link>
        <Link href="/completed">완료</Link>
        <button onClick={handleToggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}
