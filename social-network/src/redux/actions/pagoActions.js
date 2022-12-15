import axios from "axios"
import { confirmarPago } from "../reducer/pagoReducer"


export const confirmacionPagosAsync = (data) => async (dispatch) => {
  try {
    const respuesta = await axios
       .post('http://127.0.0.1:3001/pago ', data, {
         // Endpoint to send files
         headers: {
           // Add any auth token here
           'content-type': 'multipart/form-data',
         },
       })
       console.log(respuesta.data)
      // dispatch(confirmarPago(response.data.data))
      const confirmacion=respuesta.data;
       return confirmacion;
  } catch (error) {
    console.log(error)
  }
}