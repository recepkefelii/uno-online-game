import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const RoomSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setGames: (state, action) => {
      state.push(...action.payload)
    },
  },
});

export const { setGames } = RoomSlice.actions;

export default RoomSlice.reducer;