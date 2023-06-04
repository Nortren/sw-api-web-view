import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageNumber: 1,
};

const toolsSlice = createSlice({
  name: 'toolsSlice',
  initialState,
  reducers: {
    setPageNumber(state, action) {
      state.pageNumber = action.payload;
    },
    clearTools(state) {
      state.pageNumber = 1;
    },
  },
});
export const toolsSliceReducer = toolsSlice.reducer;
export const toolsSliceActions = toolsSlice.actions;
