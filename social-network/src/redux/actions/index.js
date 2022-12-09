import { createAction } from "@reduxjs/toolkit"

export const CREATE_POST='CREATE_POST'


export const createPost = createAction(CREATE_POST)
createPost({ text: 'Buy milk' })