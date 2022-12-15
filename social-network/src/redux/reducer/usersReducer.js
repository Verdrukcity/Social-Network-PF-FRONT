import { createSlice, current } from '@reduxjs/toolkit'

const initialState = {
	user: [],
	message: '',
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
		authUser: (state, action) => {
			state.message = action.payload
		},
	},
})

// SELECTOR
export const allUsersSelector = (state) => state.users.user
export const messageSelector = (state) => state.users.message

export const { postUser, getAllUsers, authUser } = userSlice.actions
export default userSlice.reducer
