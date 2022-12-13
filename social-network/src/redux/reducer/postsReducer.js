import { createSlice } from '@reduxjs/toolkit'

/**
 * estado global de los posts
 */
const initialState = {
  posts: [],
  created: {},
  comments: [],
  detail: {},
  userDetail:[]
}

// REDUCERS
export const postSlice = createSlice({
  name: 'post',
  initialState,

  reducers: {
    getAllPosts: (state, action) => {
      /**
       * llamo a la acción de todos los posts
       */
      state.posts = [action.payload]
    },
    createPosts: (state, action) => {
      /**
       * llamo a la accion de todos los posts
       */
      state.created = [action.payload]
    },
    getPostDetail: (state, action) => {
      state.detail = action.payload
    },
    getDetailUser: (state, action) => {
      state.userDetail = [action.payload]
    },
    getByCategory: (state, action) => {
      const notNullPosts = state.posts.length ? state.posts[0] : state.posts
      
      const filterCategories = notNullPosts.filter((post) =>
        action.payload.every((filter) => post.category.includes(filter))
      )
      state.posts = [filterCategories]
    },
  },
})

/**
 * aquí se exportan todos los reducer y las actions.
 * las countriesSlice.actions hay que importarlas desde las actions y las despachamos desde actions.
 */
export const { getAllPosts, getByCategory,createPosts, getPostDetail, getDetailUser } = postSlice.actions

export default postSlice.reducer
