import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/**
 * estado global países
 */
const initialState = {
  list: [],
}

export const countries = createSlice({
  name: 'countries',
  initialState,

  reducers: {
    /**
     * traer todos los países
     */
    getAllCountries: (state, action) => {
      /**
       * traer todos las categorías
       */
      state.list = [action.payload]
    },
  },
})

export const getAllCountriesAsync = () => async (dispatch) => {
  /**
   * TODO: consultar endpoint con todos los países
   */
  try {
    const response = await axios.get('http://127.0.0.1:3001/category')
    dispatch(getAllCountries(response.data.data))
  } catch (error) {
    console.log(error)
  }
}

/**
 * aquí se importan todos los actions y el reducer
 */

export const { getAllCountries } = countries.actions

export default countries.reducer
