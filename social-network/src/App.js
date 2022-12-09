import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import LandingPage from './components/LandingPage/LandingPage'
import PostDetail from './components/PostDetail/PostDetail'

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
          </Switch>
        </div>
      </BrowserRouter>
    </React.Fragment>
  )
}

export default App
