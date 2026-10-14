import type { Timestamp } from 'firebase/firestore';

// Firestore에 저장할 할 일 항목의 구조
export interface Todo {
  id: string; // Firestore 문서 ID
  text: string; // 할 일 내용
  isDone: boolean; // 완료 여부
  createdAt: Timestamp | null; // Firestore Timestamp
}

// 필터는 '전체', '진행 중', '완료' 세 가지만 가능
export type FilterType = 'all' | '진행 중' | '완료';

// 테마는 라이트/다크 두 가지만 가능
export type ThemeType = 'light' | 'dark';
