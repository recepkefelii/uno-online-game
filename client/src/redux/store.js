import { configureStore } from '@reduxjs/toolkit'
import JoinRoomSlice from './features/User/UserSlice'

export const store = configureStore({
  reducer: {
    JoinRoomSlice
  },
})