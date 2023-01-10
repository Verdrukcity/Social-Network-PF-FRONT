import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comment: '',
}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        postComment: () => {
        }
    }
})

/**
 * aquí se exportan todos los reducer y las actions.
 * las countriesSlice.actions hay que importarlas desde las actions y las despachamos desde actions.
 */
export const { postComment } = commentSlice.actions
export default commentSlice.reducer