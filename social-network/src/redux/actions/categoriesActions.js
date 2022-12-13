/**
 * objeto de las acciones de los categories
 */
import axios from "axios"
import { getAllCategories } from "../reducer/categoriesReducer"


export const getAllCategoriesAsync = (data) => async (dispatch) => {
  try {
    const response = await axios.get('http://127.0.0.1:3001/category')
    dispatch(getAllCategories(response.data.data))
  } catch (error) {
    console.log(error)
  }
}

