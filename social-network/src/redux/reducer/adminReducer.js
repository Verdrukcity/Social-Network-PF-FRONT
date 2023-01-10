import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	allUsers: [],
}

export const userSlice = createSlice({
	name: 'allUsers',
	initialState,
	reducers: {
		getAllUsersVerify: (state, action) => {
			/**
			 * traer todos los usuarios
			 */
			state.allUsers = action.payload
		},
	},
})

// SELECTOR
export const allUsersVerifySelector = (state) => state.allUsers.allUsers

export const { getAllUsersVerify } = userSlice.actions
export default userSlice.reducer
