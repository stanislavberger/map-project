import { configureStore } from '@reduxjs/toolkit'
import sideBarSlice from '../features/counters/sideBarSlice'

export default configureStore({
  reducer: {
    sidebar: sideBarSlice
  }
})

