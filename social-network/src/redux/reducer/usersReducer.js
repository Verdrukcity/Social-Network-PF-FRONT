import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: [],
  userCreated: {},
  userError: '',
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
      state.userCreated = action.payload
    },
    userError: (state,action)=>{
      state.userError = action.payload
    }
  },
})

// SELECTOR
export const allUsersSelector = (state) => state.users.user

export const { postUser, getAllUsers, userError } = userSlice.actions
export default userSlice.reducer
