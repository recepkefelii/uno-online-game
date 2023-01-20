import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: false,
    nickname: ""
}

export const JoinRoomSlice = createSlice({
  name: 'JoinRoomSlice',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.nickname = action.payload;
      state.status = true;
    },
  },
});

export const { setName } = JoinRoomSlice.actions;

export default JoinRoomSlice.reducer;
