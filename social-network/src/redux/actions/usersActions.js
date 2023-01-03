import axios from 'axios'
import {
	authUser,
	getAllUsers,
	postUser,
	userError,
	sendToken,
	userUpdate,
} from '../reducer/usersReducer'

export const createUser = (data) => {
	return async function (dispatch) {
		try {
			let created = await axios.post(`/user`, data)
			dispatch(postUser(created.data))
		} catch (error) {
			const errorFromBack = error.response.data
			dispatch(userError(errorFromBack))
		}
	}
}

export const getAllUsersAsync = (data) => async (dispatch) => {
	try {
		const response = await axios.get('/user')
		dispatch(getAllUsers(response.data))
	} catch (error) {
		console.log(error)
	}
}

export const authUserAsync = (data, auth) => async (dispatch) => {
	/*
	 * data: {
	 *   userName : nombre de usuario (string),
	 *   password: contraseña del usuario(string)
	 * }
	 */
	
	// TODO: si la data está vacía no hacer dispatch
	if (!auth) {
		const userPromise = axios
		.post('/authuser', data)
		.then((res) => res.data)
		.catch((err) => err.response.data.error)

	const res = await userPromise
	
	return dispatch(authUser(res))
	} else {
		const userPromise = axios
		.post('/authuserAuth0', {email: data})
		.then((res) => res.data)
		.catch((err) => err.response.data.error)
		const res = await userPromise
		
		localStorage.setItem("userId", res.data.id)
		localStorage.setItem("token", res.data.token)
	
	}
	
}

export const sendTokenAction = (data) => async (dispatch) => {
	try {
		dispatch(sendToken(data))
	} catch (error) {
		console.error(error)
	}
}

export const updateUserAsync = (data, id, token) => async (dispatch) => {
	try {
		axios
			.post(`/useredit/${id}`, data, {
				// Endpoint to send files
				headers: {
					// Add any auth token here
					'content-type': 'multipart/form-data',
				},
			})
			.then((response) => dispatch(userUpdate(response.data.data)))
	} catch (error) {
		console.log(error)
	}
}
