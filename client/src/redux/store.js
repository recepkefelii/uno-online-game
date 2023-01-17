import { configureStore } from '@reduxjs/toolkit'
import JoinRoomSlice from './features/JoinRoomSlice'

export const store = configureStore({
  reducer: {
    JoinRoomSlice
  },
})