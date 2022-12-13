import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        post: () => {
        }
    }
})

/**
 * aquí se exportan todos los reducer y las actions.
 * las countriesSlice.actions hay que importarlas desde las actions y las despachamos desde actions.
 */
export const { post } = commentSlice.actions
export default commentSlice.reducer