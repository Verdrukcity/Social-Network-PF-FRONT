import axios from 'axios'
import {
	getAllPosts,
	createPosts,
	getPostDetail,
	getDetailUser,
} from '../reducer/postsReducer'

//ETAS ACCIONES NO SIRVEN POR PROBLEMAS CON EL REDUCER

/**
 * exportamos un objeto que envía todas las acciones de los posts
 */

export const getAllPostsAsync = (data) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'auth-token': data,
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: data,
			},
		}

		const authPost = axios
			.get('http://127.0.0.1:3001/create', config)
			.then((res) => {
				console.log('RES: ', res)
				return res.data
			})
			.catch((err) => console.error('CATCH: ', err))

		const res = await authPost

		return dispatch(getAllPosts(res))
	} catch (error) {
		console.log('ERROR: ', error)
	}
}

export const getUserDetailAsync = () => (dispatch) => {
	try {
		axios
			.get(`http://127.0.0.1:3001/userDetail/6398a00319c81701a7084db6 `)
			.then((response) => dispatch(getDetailUser(response.data)))
	} catch (error) {
		console.log(error)
	}
}

export const CreatePostsAsync = (data) => (dispatch) => {
	try {
		axios
			.post('http://127.0.0.1:3001/create/6398a00319c81701a7084db6 ', data, {
				// Endpoint to send files
				headers: {
					// Add any auth token here
					'content-type': 'multipart/form-data',
				},
			})
			.then((response) => dispatch(createPosts(response.data.data)))
	} catch (error) {
		console.log(error)
	}
}

export const getPostDetailAsync = (postId) => async (dispatch) => {
	try {
		//Obtenemos el post buscado por id en la variable details
		const details = await axios.get(`http://127.0.0.1:3001/detail/${postId}`)

		//despachamos la accion
		dispatch(getPostDetail(details.data))
	} catch (error) {
		console.log(error)
	}
}
