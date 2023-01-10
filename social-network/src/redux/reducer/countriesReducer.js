import { createSlice } from '@reduxjs/toolkit'

/**
 * estado global países
 */
const initialState = {
  list: [],
}

// REDUCERS
export const countriesSlice = createSlice({
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


// USE SELECTOR
export const allCountries = (state) => state.countries.list

/**
 * aquí se exportan todos los reducer y las actions.
 * las countriesSlice.actions hay que importarlas desde las actions y las despachamos desde actions.
 */
export const { getAllCountries } = countriesSlice.actions

export default countriesSlice.reducer
