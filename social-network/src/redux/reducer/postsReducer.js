import { createReducer } from "@reduxjs/toolkit"

const statePost={
    posts:[]
}

 const postReducer = createReducer(statePost, (builder) => {
    builder
      .addCase('CREATE_POST', (state, action) => {
        // "mutate" the array by calling push()
        state.posts.push(action.payload)
      })

})
export default postReducer