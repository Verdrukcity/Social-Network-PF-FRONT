import { createSlice } from '@reduxjs/toolkit'
import categoriesActions from '../actions/categoriesActions'

/**
 * estado global categorías
 */
const initialState = {
  name: [
    'música',
    'comida',
    'viajes',
    'idiomas',
    'comedia',
    'deportes',
    'mascotas',
    'filosofía',
    'académico',
    'tecnología',
    'naturaleza',
  ],
}

export const categories = createSlice({
  name: 'categories',
  initialState,

  reducers: {
    getAllCategories: (state) => {
      /**
       * traer todos las categorías
       */
      categoriesActions.getAllCategories(state)
    },
  },
})

/**
 * aquí se importan todos los actions y el reducer
 */
export const { getAllCategories } = categories.actions

export default categories.reducer
