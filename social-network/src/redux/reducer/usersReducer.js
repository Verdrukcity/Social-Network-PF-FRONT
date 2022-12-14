import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    user: []
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        postUser: (state, action)=>{
            state.user = action.payload
        }
    }
})

export const {postUser} = userSlice.actions
export default userSlice.reducer