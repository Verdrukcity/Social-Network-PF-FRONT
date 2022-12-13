import React from "react";
import { landingPage } from "../../shared/assets/icons/all-icons";
import './LandingPage.css'

/**
 * Agregue un alt a la imagen (landingPage) para evitar un warning de compilacion
 */

export default function LandingPage() {
    return (
        <main className="container-fluid contenedor-landing-main " >

            <div className="container d-flex justify-content-center align-items-center containerHeader">
                <div className="container">
                    <h1 className="replyTitle">REPLY</h1>
                </div>
                <div className="container container-flex-center">
                    <a type="button" className="font butons-landing bx-shadow" href='/reply/register'>
                    Register
                </a>
                <a type="button" className="font butons-landing bx-shadow" href='/reply/login'>
                    Login
                </a>
                </div>
                
               
            </div>
            <div className="container-fluid container-flex-center container-img-eres">
                
                <div className="container">
                    <p className="font-landing">Eres lo que <br></br>publicas.</p>
                </div>
                <div className="container">
                        <img  className="img-fluid landing-img" alt="imagen landingpage" src={landingPage} />
                </div>

            </div>
 
        </main>
    )

}