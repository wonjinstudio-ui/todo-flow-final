'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { toggleTheme, setFilter } from '@/store/todoSlice';
import { FilterType } from '@/types/todo';

// 💡 [추가 과제 2] theme, filter, 관련 dispatch 함수를 하나의 훅으로 묶으세요.
export const useSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { theme, filter } = useSelector((state: RootState) => state.ui);

  return {
    theme,
    filter,
    // 💡 toggleTheme과 setFilter를 실행하는 핸들러 함수를 만드세요.
    handleToggleTheme: () => {
      dispatch(toggleTheme());
    },
    handleSetFilter: (f: FilterType) => {
      dispatch(setFilter(f));
    },
  };
};
