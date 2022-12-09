import React from "react";
import { home, landingPage } from "../../shared/assets/icons/all-icons";
import './LandingPage.css'

/**
 * Agregue un alt a la imagen (landingPage) para evitar un warning de compilacion
 */

export default function LandingPage() {
    return (
        <main className=".container" >

            <div className="containerButtons">
            <div>
                    <p className="fontLandingO">REPLY</p>
                </div>
                <a id="button" href='/reply/register'>
                    Register
                </a>
                <a id="button" href='/reply/login'>
                    Login
                </a>
                <a id="button"  href="/reply/home">
                    <img src={home} alt="home" />
                </a>
            </div>
            <div className="containerFont">
                
                <div className="containerEres">
                    <p className="fontLandingN">Eres lo que publicas</p>
                </div>
                <div>
                        <img id="landingPage" src={landingPage} />
                </div>

            </div>




        </main>
    )

}