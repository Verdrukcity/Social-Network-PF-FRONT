import React from 'react';
import ReactDOM from 'react-dom/client';
import indexcss from './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Provider } from 'react-redux';
import store from './redux/store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

      <React.StrictMode>
            <Auth0Provider
    domain="dev-n0tndfczuguai6qe.us.auth0.com"
    clientId="GZQnpYCVIozKYry5dgWdOnhnRMRX2yP6"
    redirectUri={window.location +"reply/home" || "http://localhost:3000/reply/home"}
  >
         <Provider store={store}>
            <BrowserRouter>
               <App prop={indexcss} />
            </BrowserRouter>
         </Provider>
      </Auth0Provider>
      </React.StrictMode>
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
