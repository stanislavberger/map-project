import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isChecked: [], // Initial state
  };

export const sideBarSlice = createSlice ({
    name: 'sidebar',
    initialState,
    reducers: {
       
    }

})

export const { handleClick } = sideBarSlice.actions;
export default sideBarSlice.reducer;