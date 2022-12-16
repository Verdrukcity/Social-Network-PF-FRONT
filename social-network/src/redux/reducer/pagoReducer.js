import { createSlice } from '@reduxjs/toolkit'

/**
 * estado global categorías
 */
const initialState = {
  name: [],
}

export const pagoSlice = createSlice({
  name: 'pago',
  initialState,

  reducers: {
    confirmarPago: (state, action) => {
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
export const { confirmarPago } = pagoSlice.actions

export default pagoSlice.reducer