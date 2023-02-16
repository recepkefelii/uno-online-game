import { configureStore } from '@reduxjs/toolkit'
import JoinRoomSlice from './features/User/UserSlice'
import RoomSlice from './features/Room/RoomSlice'

export const store = configureStore({
  reducer: {
    JoinRoomSlice,
    RoomSlice
  },
})