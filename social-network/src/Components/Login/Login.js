import React, { useState} from 'react';
import './Login.css'
import { useHistory, Link } from 'react-router-dom'
import { imgLogin } from '../../shared/assets/icons/all-icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
    const MySwal = withReactContent(Swal)

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

         if(datos.userName===""||datos.password==="")
       {
          MySwal.fire({
                      title: <strong>Oops...</strong>,
                      html: <i>Faltan campos por llenar!</i>,
                      icon: 'error',
                      
                    })

       }
        else
        {MySwal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Usuario logueado correctamente',
                  showConfirmButton: false,
                  timer: 1500
                });
          history.push('/reply/home')}
        
  
        
    }
  return (
    <div className='container-fluid bg container-flex-center'>
      <div className=' container-flex-center '>
        <img className='imgLogin' alt='imagen login' src={imgLogin}></img>
       <form className="formularioLogin" onSubmit={enviarDatos}>
                
                <h1 className='replyTitle reply'>REPLY</h1>
            
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
                <p> if you don't have an account,  <Link className="registerScreen" to={`/reply/register`}><a> register here</a></Link> </p>
                
                </div>
            </form> 
      </div>
      

    
    </div>
  )
}
