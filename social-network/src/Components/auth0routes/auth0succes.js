import React, { useEffect } from 'react'
import { succes } from '../../shared/assets/icons/all-icons'
import "./auth0Succes.css"
import { useAuth0 } from '@auth0/auth0-react'
import Loader from '../../shared/components/loader/loader'
import { getUserDetailAsync } from '../../redux/actions/postActions'
import { useDispatch, useSelector } from 'react-redux'
import {succesPaymentMail} from '../../redux/actions/pagoActions'


const Auth0succes = () => {
    const {isAuthenticated, isLoading, user} =useAuth0();
    const id = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const dispatch = useDispatch()
    const userData = useSelector(state => state.posts.userDetail)

    useEffect(()=>{
        if(!isLoading && !id && !token){
            if(!isAuthenticated ){
            window.location = "/"
            return <Loader></Loader>;}
        } else {
            if(id || token || isAuthenticated){
                dispatch(getUserDetailAsync(id))
            }
        }
        
    },[dispatch])

    const handleClick = () => {
        dispatch(succesPaymentMail(userData.email))
        window.location = '/reply/home'
    }
    
    if(isLoading) return <Loader></Loader>;
  return (
    <div className='container-fluid'>
        <div className='d-flex container-flex-center p-5 flex-column mt-5 auth0-container fonts' >
            <h1>Tu pago fue procesado de manera exitosa</h1>
            <img src={succes} alt= "succesGif"></img>
            <p className=''>Si tienes alguna duda por favor ponte en contacto con nosotros <b>social.reply.team@gmail.com</b></p>
            <button className='btnLogin' onClick={()=> handleClick()}> Home</button>
        </div>
    </div>
  )
}

export default Auth0succes