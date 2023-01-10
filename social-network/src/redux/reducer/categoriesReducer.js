import { createSlice } from '@reduxjs/toolkit'

/**
 * estado global categorías
 */
const initialState = {
  name: [],
}

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,

  reducers: {
    getAllCategories: (state, action) => {
      /**
       * traer todos las categorías
       */
      state.name = action.payload
    },
  },
})

/**
 * aquí se exportan todos los reducer y las actions.
 * las countriesSlice.actions hay que importarlas desde las actions y las despachamos desde actions.
 */
export const { getAllCategories } = categoriesSlice.actions

export default categoriesSlice.reducer
