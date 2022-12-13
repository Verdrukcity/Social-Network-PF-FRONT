import React from "react";
import { landingPage } from "../../shared/assets/icons/all-icons";
import './LandingPage.css'

/**
 * Agregue un alt a la imagen (landingPage) para evitar un warning de compilacion
 */

export default function LandingPage() {
    return (
        <main className="container-fluid bg" >

            <div className="container-{breakpoint} d-flex justify-content-between align-items-center">
                <div>
                    <p className="fontLandingO ">REPLY</p>
                </div>
                <div className="d-flex">
                    <a id="button" href='/reply/register'>
                    Register
                </a>
                <a id="button" href='/reply/login'>
                    Login
                </a>
                </div>
                
               
            </div>
            <div className="container-{breakpoint} d-flex justify-content-evenly">
                
                <div className="containerEres">
                    <p className="fontLandingN">Eres lo que <br></br>publicas.</p>
                </div>
                <div>
                        <img  id="landingPage" alt="imagen landingpage" src={landingPage} />
                </div>

            </div>
 
        </main>
    )

}