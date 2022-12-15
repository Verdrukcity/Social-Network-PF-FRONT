import axios from 'axios'
import { getAllUsers, postUser, authUser } from '../reducer/usersReducer'

export const createUser = (data) => {
	return async function (dispatch) {
		try {
			let created = await axios.post(`http://127.0.0.1:3001/user`, data)
			dispatch(postUser(created.data))
		} catch (error) {
			console.log(error)
		}
	}
}

export const getAllUsersAsync = (data) => async (dispatch) => {
	try {
		const response = await axios.get('http://127.0.0.1:3001/user')
		dispatch(getAllUsers(response.data))
	} catch (error) {
		console.log(error)
	}
}

export const authUserAsync = (data) => async (dispatch) => {
	try {
		const response = await axios.post('http://127.0.0.1:3001/authuser', data)
		dispatch(authUser(response))
	} catch (error) {
		console.log(error)
	}
}
