import React from "react";
import { home, landingPage } from "../../shared/assets/icons/all-icons";
import './LandingPage.css'

export default function LandingPage (){
    return (
        <main id='background'>
            <div id="reply-title">REPLY</div>
            <div id="text-eres-lo-que-publicas">Eres lo que publicas</div>
            <img
                id="image-lp"
                src={landingPage}
            />
            <a id="box-login" href='/reply/register'>Register
            </a>
            <a id="box-login" href='/reply/login'>Login
            </a>
            <a id="box-home" href="/reply/home">
                <img
                    src={home}
                    id="img-home"
                    alt="home"
                />
            </a>
        </main>
    )

}