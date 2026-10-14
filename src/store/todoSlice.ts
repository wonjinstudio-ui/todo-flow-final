import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterType, ThemeType } from '@/types/todo';

interface UIState {
  theme: ThemeType;
  filter: FilterType;
}

const initialState: UIState = {
  theme: 'light',
  filter: 'all',
};

export const todoSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // 💡 [과제 3-1] 테마를 토글하세요. (light ↔ dark)
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    // 💡 [과제 3-2] 외부에서 받은 값으로 필터를 변경하세요.
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload;
    },
  },
});

export const { toggleTheme, setFilter } = todoSlice.actions;
export default todoSlice.reducer;
