import axios from 'axios'
import {
	getAllUsersVerify,
} from '../reducer/adminReducer'
import {getAllPostsAsync} from './postActions.js'

export const getAllUsersVerifyAsync = (token) => async (dispatch) => {
	try {
		const response = await axios.get(`/usersverify?token=${token}`)
		dispatch(getAllUsersVerify(response.data))
	} catch (error) {
		console.log(error)
	}
}

export const updateUserStatus = (id, token) => async (dispatch) => {
	try {
		const response = await axios.post(`/admin?token=${token}`, {id: id})
		dispatch(getAllUsersVerifyAsync(token))
	} catch (error) {
		console.log(error)
	}
}

export const updatePostStatus = (id, token) => async (dispatch) => {
	try {
		const response = await axios.post(`/admin/post?token=${token}`, {id: id})
		dispatch(getAllPostsAsync(token))
	} catch (error) {
		console.log(error)
	}
}