import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: [],
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getAllUsers: (state, action) => {
      /**
       * traer todos los usuarios
       */
      state.user = action.payload
    },
    postUser: (state, action) => {
      state.user = action.payload
    },
  },
})

// SELECTOR
export const allUsersSelector = (state) => state.users.user

export const { postUser, getAllUsers } = userSlice.actions
export default userSlice.reducer
