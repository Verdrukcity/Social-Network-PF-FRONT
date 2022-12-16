import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
	user: [],
	message: [],
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
    },
		authUser: (state, action) => {
			state.message = action.payload
		},
  },
})

// SELECTOR
export const allUsersSelector = (state) => state.users.user
export const messageSelector = (state) => state.users.message

export const { postUser, getAllUsers, authUser, userError } = userSlice.actions
export default userSlice.reducer
