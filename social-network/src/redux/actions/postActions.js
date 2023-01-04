import axios from 'axios'
import {
	getAllPosts,
	createPosts,
	getPostDetail,
	getDetailUser,
	likePost,
} from '../reducer/postsReducer'

//ETAS ACCIONES NO SIRVEN POR PROBLEMAS CON EL REDUCER

/**
 * exportamos un objeto que envía todas las acciones de los posts
 */

export const getAllPostsAsync = (data) => async (dispatch) => {
	const auth = await axios.get(`/create?token=${data}`)
	console.log('m traigo todos')
	return dispatch(getAllPosts(auth.data.data))
}

/* export const getAllPostsAsync = (data) => async (dispatch) => {
	const config = {
		headers: {
			'auth-token': data,
			'Content-type': 'application/json; charset=UTF-8',
			'Authorization': `Bearer: ${data}`,
		},
	}

	const authPost = axios
		.get('/create', config)
		.then((res) => {
			return res.data
		})
		.catch((err) => console.error('CATCH: ', err))

	const res = await authPost

	return dispatch(getAllPosts(res.data))
} */

export const getUserDetailAsync = (id) => (dispatch) => {
	try {
		axios
			.get(`/userDetail/?id=${id}`)
			.then((response) => dispatch(getDetailUser(response.data)))
	} catch (error) {
		console.log(error)
	}
}

export const CreatePostsAsync = (data, id, token) => (dispatch) => {
	try {
		axios
			.post(`/create/${id}?token=${token}`, data, {
				// Endpoint to send files
				headers: {
					// Add any auth token here
					'content-type': 'multipart/form-data',
				},
			})
			.then((response) => {
				dispatch(createPosts(response.data.data))
				dispatch(getAllPostsAsync(token))
			})
	} catch (error) {
		console.log(error)
	}
}

export const getPostDetailAsync = (postId) => async (dispatch) => {
	try {
		//Obtenemos el post buscado por id en la variable details
		const details = await axios.get(`/detail/${postId}`)

		//despachamos la accion
		dispatch(getPostDetail(details.data))
	} catch (error) {
		console.log(error)
	}
}

export const likePostAsync = (postId, usersLiked) => async (dispatch) => {
	try {
		const likeStatus = await axios.post(
			`/like/${postId}`,
			{ usersLiked }
		)
		dispatch(likePost(likeStatus.data))
	} catch (err) {
		console.log(err)
	}
}
