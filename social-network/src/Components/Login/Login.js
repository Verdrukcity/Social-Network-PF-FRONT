import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as allIcons from '../../shared/assets/icons/all-icons'
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
import ButtonActions from '../../shared/components/ButtonActions/ButtonActions'
import './Login.css'
import LoginExterno from '../../shared/components/ButtonLogin/LoginExterno'
import { useAuth0 } from "@auth0/auth0-react";
import Loader from '../../shared/components/loader/loader.js'

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
	const {isAuthenticated, isLoading} = useAuth0();

	

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, errorMessage])

	if (isLoading) return <Loader></Loader>;
	if(isAuthenticated) history.push("/reply/home");
	return (
		<div className='container-fluid bg container-flex-center'>
			<div className=' container-flex-center '>
				<ButtonActions
					type='submit'
					action={() => history.push('/')}
					id='all-icons-arrowBack'
					content={
						<img
							src={allIcons.arrowBack}
							className='all-icons-image'
							alt='icon-return'
						/>
					}
				/>
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
						<button
							type='submit'
							className='btnLogin mx-3'
							onClick={handleLogin}
						>
							Login
						</button>
						<LoginExterno type={'button'}  />
					</div>

					<div className='registerText'>
						<p>
							Si aún no tienes una cuenta,{' '}
							<Link className='registerScreen' to={`/reply/register`}>
								regístrate aquí
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	)
}
