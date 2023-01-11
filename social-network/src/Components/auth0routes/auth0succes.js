import React from 'react'
import { succes } from '../../shared/assets/icons/all-icons'
import "./auth0Succes.css"
import { useAuth0 } from '@auth0/auth0-react'
import Loader from '../../shared/components/loader/loader'


const Auth0succes = () => {
    const {isAuthenticated, isLoading, user} =useAuth0();
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if(!isLoading && !id && !token){
        if(!isAuthenticated ){
        window.location = "/"
        return <Loader></Loader>;}
    } else {
        if(id || token || isAuthenticated){
            // Aqui puedes meter tu dispatch
            // En user.email esta el email del sujeto por si lo necesitas pero solo funciona si esta autenticado con auth0
            console.log(user)
        }
    }
    if(isLoading) return <Loader></Loader>;
  return (
    <div className='container-fluid'>
        <div className='d-flex container-flex-center p-5 flex-column mt-5 auth0-container fonts' >
            <h1>Tu pago fue procesado de manera exitosa</h1>
            <img src={succes} alt= "succesGif"></img>
            <p className=''>Si tienes alguna duda por favor ponte en contacto con nosotros <b>social.reply.team@gmail.com</b></p>
            <button className='btnLogin' onClick={()=> window.location  = '/reply/home'}> Home</button>
        </div>
    </div>
  )
}

export default Auth0succes