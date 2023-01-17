import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: {
    nickname: ""
  },
}

export const JoinRoomSlice = createSlice({
  name: 'JoinRoomSlice',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    }
  },
})

export const { setName } = JoinRoomSlice.actions

export default JoinRoomSlice.reducer