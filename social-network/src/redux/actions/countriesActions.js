import axios from "axios";
import { getAllCountries } from '../reducer/countriesReducer'

export const getAllCountriesAsync = () => async (dispatch) => {
    /**
     * TODO: consultar endpoint con todos los países
     */
    try {
        const response = await axios.get('/maps')

        //por cada pais un objeto con nombre e id para buscar en la db
        let countriesName = response.data.data.map((country) => ({
            name: country.name,
            id: country._id
        }))
        
        //ordena alfabeticamente
        countriesName = countriesName.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0
        })
        

        dispatch(getAllCountries(countriesName))
    } catch (error) {
        console.log(error)
    }
}
