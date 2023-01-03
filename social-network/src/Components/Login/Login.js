import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
	authUserAsync,
	sendTokenAction,
} from '../../redux/actions/usersActions'
import { messageSelector } from '../../redux/reducer/usersReducer'
import { imgLogin } from '../../shared/assets/icons/all-icons'
import './Login.css'

/*
  Login comprueba el usuario y contraseña enviando el siguiente objeto:
	 * data: {
	 *   userName : nombre de usuario (string),
	 *   password: contraseña del usuario(string)
	 * }
	Respondiendo con la respuesta del selector message en un sweet alert
*/

export default function Login() {
	const dispatch = useDispatch()
	const history = useHistory()

	const message = useSelector(messageSelector)

	const [datos, setDatos] = useState({
		userName: '',
		password: '',
	})

	const [errorMessage, setErrorMessage] = useState('')
	const [clickLogin, setClickLogin] = useState(false)

	const sweetAlert = withReactContent(Swal)

	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		},
	})

	const handleInputChange = (event) => {
		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		})
	}

	// TODO : Separar el onclick del sweetAlert con el mensaje

	function handleLogin(e) {
		e.preventDefault()

		setClickLogin(!clickLogin)
		dispatch(authUserAsync(datos))
	}

	useEffect(() => {
		setErrorMessage(message)
	}, [message])

	useEffect(() => {
		// Se revisa y envía el error en el if e ingresa en el else
		if (message.length) {
			sweetAlert.fire({
				title: <strong>Oops...</strong>,
				html: <i>{errorMessage}</i>,
				icon: 'error',
			})
		} else if (message.message) {
			Toast.fire({
				icon: 'success',
				title: 'El usuario ingresó correctamente',
			})

			// Si el usuario ingresa sin problemas guardamos el token
			const isLogged = message.data.token
			if (isLogged) localStorage.setItem('token', isLogged)
			const token = localStorage.getItem('token')
			localStorage.setItem('userId', message.data.id)
			dispatch(sendTokenAction(token))

			history.push('/reply/home')
		}
	}, [dispatch, errorMessage, clickLogin, message, Toast, history, sweetAlert])

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
						<button type='submit' className='btnLogin' onClick={handleLogin}>
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
