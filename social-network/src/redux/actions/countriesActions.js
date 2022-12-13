import axios from "axios";
import { getAllCountries } from '../reducer/countriesReducer'

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
