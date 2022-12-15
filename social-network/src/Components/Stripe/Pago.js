import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {Elements,CardElement,useStripe,useElements, PaymentElement} from '@stripe/react-stripe-js'
import "bootswatch/dist/lux/bootstrap.min.css"
import {
  confirmacionPagosAsync
} from '../../redux/actions/pagoActions'
import { useDispatch, useSelector } from 'react-redux'

const stripePromise=loadStripe("pk_test_51MEyrGDmJ76nV301LY38auCykppTQuCiIuFCfTqy63OJxi6jEAlHlcLO2LbEe1qgZUqHRSUyZw2gwM8g5qrg2I1H00gKjFjIH9")
//const stripeBack= new Strip("sk_test_51MEyrGDmJ76nV301pUGNCGjJEgoiyVA3hP3TORnqWLm9qCYzRZh9DtRyGeayF2albXGtTKjQI18jDIzht5t7Yy4q00hc6AcVCN")
const CheckOutForm=()=>{
    const stripe=useStripe();
    const elements=useElements();
    const dispatch = useDispatch()
    const handleSubmit=async (e)=>{
        e.preventDefault();

   const {error,paymentMethod} = await stripe.createPaymentMethod({

            type: 'card',
            card: elements.getElement(CardElement)
        });

        if(!error){

            
            const amount=50;        

            const respuesta=await dispatch(confirmacionPagosAsync({id:paymentMethod.id,amount:amount}))
             console.log(respuesta)
        }
        

    }

    return (
   
        <form onSubmit={handleSubmit} className="card card-body">
            
                <div className='form-group'> 
                <img  width="200" height="200" src="https://www.bancodeoccidente.com.co/wps/wcm/connect/banco-de-occidente/11e8dbea-4f62-4272-8ca7-72995437e64b/pagar-tarjeta.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_PQ441IO0LGGB20ANDOHIQE20P6-11e8dbea-4f62-4272-8ca7-72995437e64b-nCQYeII"></img>
                     <CardElement className='form-control'/>
                     
                </div>
               
                <button className='btn btn-success'>pay</button>
        </form>
    
    )}

 const Pago =()=>{


    
 
    return(


        <Elements stripe={stripePromise}  >
            
            <div className='row'>
                <div className='col-md-4 offset-md-4'>
                     <CheckOutForm/>
                </div>
            </div>

        </Elements>
    );



}

export default Pago