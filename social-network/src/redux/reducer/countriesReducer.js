import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

/**
 * estado global países
 */
const initialState = {
  list: [],
}

// REDUCER

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
      state.list = action.payload
    },
  },
})

// ACTIONS

export const getAllCountriesAsync = () => async (dispatch) => {
  /**
   * TODO: consultar endpoint con todos los países
   */
  try {
    const response = await axios.get('https://restcountries.com/v3/all')

    const countriesName = response.data.map((country) => country.name.common)

    dispatch(getAllCountries(countriesName))
  } catch (error) {
    console.log(error)
  }
}

// USE SELECTOR
export const allCountries = (state) => state.countries.list

/**
 * aquí se importan todos los actions y el reducer
 */

export const { getAllCountries } = countries.actions

export default countries.reducer
