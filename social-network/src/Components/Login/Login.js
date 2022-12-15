import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { authUserAsync } from '../../redux/actions/usersActions'
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

	const sweetAlert = withReactContent(Swal)

	const handleInputChange = (event) => {
		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		})
	}

	function handleLogin(e) {
		e.preventDefault()

		if (errorMessage.length) {
			sweetAlert.fire({
				title: <strong>Oops...</strong>,
				html: <i>{message}</i>,
				icon: 'error',
			})
		} else {
			history.push('/reply/home')
		}
	}

	useEffect(() => {
		setErrorMessage(message)
	}, [dispatch, message])

	useEffect(() => {
		dispatch(authUserAsync(datos))
	}, [dispatch, datos])

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
