import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {Elements,CardElement,useStripe,useElements} from '@stripe/react-stripe-js'
import "bootswatch/dist/lux/bootstrap.min.css"

const stripePromise=loadStripe("pk_test_51MEyrGDmJ76nV301LY38auCykppTQuCiIuFCfTqy63OJxi6jEAlHlcLO2LbEe1qgZUqHRSUyZw2gwM8g5qrg2I1H00gKjFjIH9")
//const stripeBack= new Strip("sk_test_51MEyrGDmJ76nV301pUGNCGjJEgoiyVA3hP3TORnqWLm9qCYzRZh9DtRyGeayF2albXGtTKjQI18jDIzht5t7Yy4q00hc6AcVCN")
const CheckOutForm=()=>{
    const stripe=useStripe();
    const elements=useElements();

    const handleSubmit=async (e)=>{
        e.preventDefault();

   const {error,paymentMethod} = await stripe.createPaymentMethod({

            type: 'card',
            card: elements.getElement(CardElement)
        });

        if(!error){

            console.log(paymentMethod)
            const ammount=50;        

            
        }
        

    }

    return (
   
        <form onSubmit={handleSubmit} className="card card-body">
                <div className='form-group'> 
                     <CardElement className='form-control'/>
                </div>
               
                <button className='btn btn-success'>pay</button>
        </form>
    
    )}

 const Pago =()=>{

    return(


        <Elements stripe={stripePromise}>
            
            <div className='row'>
                <div className='col-md-4 offset-md-4'>
                     <CheckOutForm/>
                </div>
            </div>

        </Elements>
    );



}

export default Pago