import { createSlice } from '@reduxjs/toolkit'

/**
 * estado global países
 */
const initialState = {
  list: [{ username: 'hola42', password: 'hola42' }],
}

// REDUCERS
export const usersSlice = createSlice({
  name: 'users',
  initialState,

  reducers: {
    /**
     * traer todos los países
     */
    getAllUsers: (state, action) => {
      /**
       * traer todos los usuarios
       */
      state.list = action.payload
    },
  },
})

// USE SELECTOR
export const allUsers = (state) => state.users.list

/**
 * aquí se exportan todos los reducer y las actions.
 * las usersSlice.actions hay que importarlas desde las actions y las despachamos desde actions.
 */
export const { getAllUsers } = usersSlice.actions

export default usersSlice.reducer
