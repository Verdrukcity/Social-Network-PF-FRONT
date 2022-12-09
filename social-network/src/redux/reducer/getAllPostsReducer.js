import { createReducer } from "@reduxjs/toolkit";

const stateGetAllPosts = {
  getAllPosts: [],
};

/**
 * Este es el reducer que cree para hacer 
 * la logica de la peticion del back y así traer todos los posts
 */

const getAllPostsReducer = createReducer(stateGetAllPosts, (builder) => {
  builder.addCase("GET_ALL_POST", (state, action) => {
    state.getAllPosts.push(action.payload);
  });
});
export default getAllPostsReducer;