import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import LandingPage from './Components/LandingPage/LandingPage'
import PostDetail from './Components/PostDetail/PostDetail'
import Profile from './Components/Profile/Profile'
import Pago from './Components/Stripe/Pago'
import axios from 'axios'


//axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.baseURL = "https://social-network-pf-back-production.up.railway.app"

/*
  App se utiliza para navegar a las rutas necesarias en el frontend:
   • Home en la ruta '/'
   nota: se usa react-router-dom 5.2.0
*/

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <div className='App'>
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/reply/home' component={Home} />
            <Route exact path='/reply/register' component={Register}></Route>
            <Route exact path='/reply/Login' component={Login}></Route>
            <Route exact path='/reply/postdetail/:id' component={PostDetail} />
            <Route exact path='/reply/profile' component={Profile} />
            <Route exact path='/reply/pago' component={Pago} />
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
