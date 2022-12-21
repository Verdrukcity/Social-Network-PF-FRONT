import { createSlice, current } from '@reduxjs/toolkit'

/**
 * estado global de los posts
 */
const initialState = {
	posts: [],
	allPost: [],
	created: {},
	comments: [],
	detail: {},
	userDetail: {},
	like: {},
}

// REDUCERS
export const postSlice = createSlice({
	name: 'post',
	initialState,

	reducers: {
		getAllPosts: (state, action) => {
			/**
       * llamo a la acción de todos los posts
        state allPost es una referencia a todos los post para ser usado en el filtro de categorías
       */

			state.allPost = action.payload
			state.posts = action.payload
		},
		createPosts: (state, action) => {
			/**
			 * llamo a la acción de todos los posts
			 */
			state.created = [action.payload]
		},
		getPostDetail: (state, action) => {
			state.detail = action.payload
		},
		getDetailUser: (state, action) => {
			state.userDetail = action.payload
		},
		getByCategory: (state, action) => {
			const notNullPosts = state.allPost

			const filterCategories = notNullPosts.filter((post) =>
				action.payload.every((filter) => post.category.includes(filter))
			)

			state.posts = filterCategories
		},
		likePost: (state, action) => {
			state.like = action.payload
			console.log(state.like)
		}
	},
})

/**
 * aquí se exportan todos los reducer y las actions.
 * las countriesSlice.actions hay que importarlas desde las actions y las despachamos desde actions.
 */
export const {
	getAllPosts,
	getByCategory,
	createPosts,
	getPostDetail,
	getDetailUser,
	likePost,
} = postSlice.actions

export default postSlice.reducer
