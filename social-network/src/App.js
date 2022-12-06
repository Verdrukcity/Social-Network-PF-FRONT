import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import Home from './components/Home/Home'

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
