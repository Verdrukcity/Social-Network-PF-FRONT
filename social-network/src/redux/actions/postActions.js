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
	const auth = await axios.get(`http://127.0.0.1:3001/create?token=${data}`)
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
		.get('http://127.0.0.1:3001/create', config)
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
			.get(`http://127.0.0.1:3001/userDetail/?id=${id}`)
			.then((response) => dispatch(getDetailUser(response.data)))
	} catch (error) {
		console.log(error)
	}
}

export const CreatePostsAsync = (data, id, token) => (dispatch) => {
	try {
		axios
			.post(`http://127.0.0.1:3001/create/${id}?token=${token}`, data, {
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

export const likePostAsync = (postId, usersLiked) => async (dispatch) => {
	console.log(usersLiked)
	try{
		const likeStatus = await axios.post(`http://127.0.0.1:3001/like/${postId}`, {usersLiked})
		dispatch(likePost(likeStatus.data))
	}
	catch(err){
		console.log(err)
	}
}
