import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    nickname: ""
}

export const JoinRoomSlice = createSlice({
  name: 'JoinRoomSlice',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.nickname = action.payload
    }
  },
})

export const { setName } = JoinRoomSlice.actions

export default JoinRoomSlice.reducer