import axios from 'axios'
import {
	getAllUsersVerify,
} from '../reducer/adminReducer'


export const getAllUsersVerifyAsync = (token) => async (dispatch) => {
	try {
		const response = await axios.get(`/usersverify?token=${token}`)
		dispatch(getAllUsersVerify(response.data))
	} catch (error) {
		console.log(error)
	}
}
