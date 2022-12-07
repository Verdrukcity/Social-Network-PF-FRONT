import React, {Fragment, useState} from 'react';
import { arrowUp, plus } from '../../shared/assets/icons/all-icons'
import Header from '../Header/Header.js'
import './Login.css'
import { useHistory, Link } from 'react-router-dom'

/*
  Home es el componente principal donde el usuario encuentra:
   • El header con los botones de navegación
   • Las publicaciones
   • Botón para crear publicación y subir al inicio
*/

export default function Login() {

    const history= useHistory();
    const [datos, setDatos] = useState({
        userName: '',
        password:'',
       
    })

      const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault()
        console.log(datos)
        alert("Usuario creado correctamente");
  
        history.push('/reply/home')
    }
  return (
    <div >
      <form className="formularioLogin" onSubmit={enviarDatos}>
                
                <h1 className='tituloLogin'>Reply</h1>
            
                <div className="campoFormularioLogin">
                    <input type="text" placeholder="UserName" className="formImput" onChange={handleInputChange} name="userName"></input>
                </div>
                <div className="campoFormularioLogin">
                    <input type="password" placeholder="Password" className="formImput" onChange={handleInputChange} name="password"></input>
                </div>
                 
                         
                <div className='botonPadding'>
                    <button type="submit" className="botonLogin">Login</button>
                </div>
                  
                  <div className='registertext'>
                <p> if you don't have an account,  <Link className="registerScreen" to={`/reply/registere`}><a> register here</a></Link> </p>
                
                </div>
            </form>

    
    </div>
  )
}
