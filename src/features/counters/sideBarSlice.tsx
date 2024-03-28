import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isChecked: [], // Initial state
  };

export const sideBarSlice = createSlice ({
    name: 'sidebar',
    initialState,
    reducers: {
        handleClick(state, action) {
            const { payload: index } = action;
            const newCheckedState = [...state.isChecked];
            newCheckedState[index] = !newCheckedState[index];
            state.isChecked = newCheckedState;
        },
    }

})

export const { handleClick } = sideBarSlice.actions;
export default sideBarSlice.reducer;