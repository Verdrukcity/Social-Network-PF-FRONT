import getAllPosts from '../reducer/postsReducer'
import axios from "axios";


//ETAS ACCIONES NO SIRVEN POR PROBLEMAS CON EL REDUCER

/**
 * exportamos un objeto que envia todas las acciones de los posts
 */
/*
export const getAllPostsAsync = (data) => async (dispatch) => {
      try {
         const response = await axios.get("http://127.0.0.1:3001/create");
         dispatch(getAllPosts(response.data));
      } catch (error) {
         console.log(error);
      }
   }
*/