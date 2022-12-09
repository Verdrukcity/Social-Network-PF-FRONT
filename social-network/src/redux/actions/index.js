import { createAction } from "@reduxjs/toolkit"

export const CREATE_POST='CREATE_POST'
export const GET_ALL_POST = 'GET_ALL_POST'


export const createPost = createAction(CREATE_POST)
createPost({ text: 'Buy milk' })

//Añadí el getAllPost para luego traer los post del back
export const getAllPosts = createAction(GET_ALL_POST)
getAllPosts({ text: 'Traer todos los posts'})