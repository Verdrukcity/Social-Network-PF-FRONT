import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'

/*
  App se utiliza para navegar a las rutas necesarias en el frontend:
   • Home en la ruta '/'

   nota: se usa react-router-dom 5.2.0
*/

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
