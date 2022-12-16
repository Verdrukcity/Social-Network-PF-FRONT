import axios from 'axios'
import {
	authUser,
	getAllUsers,
	postUser,
	userError,
} from '../reducer/usersReducer'

export const createUser = (data) => {
	return async function (dispatch) {
		try {
			let created = await axios.post(`http://127.0.0.1:3001/user`, data)
			dispatch(postUser(created.data))
		} catch (error) {
			const errorFromBack = error.response.data
			dispatch(userError(errorFromBack))
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
	/*
	 * data: {
	 *   userName : nombre de usuario (string),
	 *   password: contraseña del usuario(string)
	 * }
	 */

	const userPromise = axios
		.post('http://127.0.0.1:3001/authuser', data)
		.then((res) => res.data)
		.catch((err) => err.response.data.error)

	const res = await userPromise
	return dispatch(authUser(res))
}
