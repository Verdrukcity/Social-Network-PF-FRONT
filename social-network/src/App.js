import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import LandingPage from './Components/LandingPage/LandingPage'
import PostDetail from './Components/PostDetail/PostDetail'
import Profile from './Components/Profile/Profile'
import Admin from './Components/Admin/Admin'
import Pago from './Components/Stripe/Pago'
import axios from 'axios'
import auth0succes from './Components/auth0routes/auth0succes'
import auth0Fail from './Components/auth0routes/auth0Fail'

// axios.defaults.baseURL = "http://localhost:3001"
axios.defaults.baseURL = 'https://reply-back-end-deploy.onrender.com'

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
						<Route exact path='/reply/admin' component={Admin} />
						<Route exact path='/reply/pago' component={Pago} />
						<Route exact path='/reply/pago/succes/' component={auth0succes} />
						<Route exact path='/reply/pago/fail/' component={auth0Fail} />
					</Switch>
				</div>
			</BrowserRouter>
		</React.Fragment>
	)
}

export default App
