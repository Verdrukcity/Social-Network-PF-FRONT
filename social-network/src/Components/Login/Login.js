import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getAllUsersAsync } from '../../redux/actions/usersActions'
import { allUsersSelector } from '../../redux/reducer/usersReducer'
import { imgLogin } from '../../shared/assets/icons/all-icons'
import './Login.css'

/*
  Home es el componente principal donde el usuario encuentra:
   • El header con los botones de navegación
   • Las publicaciones
   • Botón para crear publicación y subir al inicio
*/

export default function Login() {
  const dispatch = useDispatch()

  const history = useHistory()
  const users = useSelector(allUsersSelector)

  const [datos, setDatos] = useState({
    userName: '',
    password: '',
  })
  const MySwal = withReactContent(Swal)

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    })
  }

  function checkLogin() {
    const usernames = users.map((u) => u.user_Name)

    if (!usernames.includes(datos.userName)) {
      MySwal.fire({
        title: <strong>Oops...</strong>,
        html: <i>El usuario no existe</i>,
        icon: 'error',
      })
    } else if (usernames.includes(datos.userName)) {
      MySwal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario logueado correctamente',
        showConfirmButton: false,
        timer: 1500,
      })
      history.push('/reply/home')
    }
  }

  useEffect(() => {
    dispatch(getAllUsersAsync())
  }, [dispatch])

  return (
    <div className='container-fluid bg container-flex-center'>
      <div className=' container-flex-center '>
        <img className='imgLogin' alt='imagen login' src={imgLogin}></img>
        <form className='formularioLogin'>
          <h1 className='replyTitle reply'>REPLY</h1>
          <div className='container-imputs-login'>
            <div className='campoFormularioLogin'>
              <input
                type='text'
                placeholder='UserName'
                className='formImput'
                onChange={handleInputChange}
                name='userName'></input>
            </div>
            <div className='campoFormularioLogin'>
              <input
                type='password'
                placeholder='Password'
                className='formImput'
                onChange={handleInputChange}
                name='password'></input>
            </div>
          </div>

          <div className='botonPadding'>
            <button type='submit' className='botonLogin' onClick={checkLogin}>
              Login
            </button>
          </div>

          <div className='registertext'>
            <p>
              if you don't have an account,{' '}
              <Link className='registerScreen' to={`/reply/register`}>
                register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
