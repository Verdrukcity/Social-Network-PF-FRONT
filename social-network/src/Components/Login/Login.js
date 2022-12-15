import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
	getAllUsersAsync,
	authUserAsync,
} from '../../redux/actions/usersActions'
import {
	messageSelector,
} from '../../redux/reducer/usersReducer'
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

	const message = useSelector(messageSelector)

	const [datos, setDatos] = useState({
		userName: '',
		password: '',
	})
	const sweetAlert = withReactContent(Swal)

	const handleInputChange = (event) => {
		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		})
	}

	function checkLogin(e) {
		e.preventDefault()

		//const usernames = users.map((u) => u.user_Name)

		dispatch(authUserAsync(datos))

		console.log(message)

		sweetAlert.fire({
			title: <strong>Oops...</strong>,
			html: <i>{message}</i>,
			icon: 'error',
		})

		/* 		if (!usernames.includes(datos.userName)) {
			sweetAlert.fire({
				title: <strong>Oops...</strong>,
				html: <i>{message}</i>,
				icon: 'error',
			})
		} else if (usernames.includes(datos.userName)) {
			sweetAlert.fire({
				position: 'center ',
				icon: 'success',
				title: 'El usuario ingresó correctamente',
				showConfirmButton: false,
				timer: 1500,
			})
			history.push('/reply/home')
		} */
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
					<div className='container-inputs-login'>
						<div className='campoFormularioLogin'>
							<input
								type='text'
								placeholder='UserName'
								className='formInput'
								onChange={handleInputChange}
								name='userName'
							></input>
						</div>
						<div className='campoFormularioLogin'>
							<input
								type='password'
								placeholder='Password'
								className='formInput'
								onChange={handleInputChange}
								name='password'
							></input>
						</div>
					</div>

					<div className='btnPadding'>
						<button type='submit' className='btnLogin' onClick={checkLogin}>
							Login
						</button>
					</div>

					<div className='registerText'>
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
