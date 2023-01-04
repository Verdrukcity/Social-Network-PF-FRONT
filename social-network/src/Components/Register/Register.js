import React, { Fragment, useEffect, useState } from 'react'
import * as allIcons from '../../shared/assets/icons/all-icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import Select from 'react-select'
import { SelectDatepicker } from 'react-select-datepicker'
import { getAllCountriesAsync } from '../../redux/actions/countriesActions'
import registercss from './Register.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createUser } from '../../redux/actions/usersActions'
import * as bcrypt from 'bcryptjs'
import ButtonActions from '../../shared/components/ButtonActions/ButtonActions'
import LoginExterno from '../../shared/components/ButtonLogin/LoginExterno'
import {
	errorSelector,
	userCreatedSelector,
} from '../../redux/reducer/usersReducer'
// import { crearUsuario } from '../EmailConfirmation/EmailConfirmation'

export const Toast = Swal.mixin({
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

const Register = () => {
	const MySwal = withReactContent(Swal)
	const dispatch = useDispatch()
	const history = useHistory()

	/*
	 * countries consume del API de países todos los nombres
	 * retorna como value/label el array de objetos options
	 */

	const countries = useSelector((state) => state.countries.list)
	const error = useSelector(errorSelector)
	const userCreated = useSelector(userCreatedSelector)

	//el value será el id, que necesitamos, y el label lo que muestra el select
	const options = countries.map((country) => {
		return {
			value: country.id,
			label: country.name,
		}
	})

	const [datos, setDatos] = useState({
		user_Name: '',
		email: '',
		name: '',
		lastname: '',
		birthdate: new Date(),
		country: '',
		password: '',
		confirmPassword: '',
	})
	// const [botonSubmit, setBotonSubmits] = useState(true)
	const [estiloInput, setEstiloInput] = useState('formImput')
	const [estiloEmail, setEstiloEmail] = useState('formImput')

	useEffect(() => {
		dispatch(getAllCountriesAsync())
	}, [dispatch])

	const handleInputChange = (event) => {
		if (
			datos.user_Name === '' ||
			datos.email === '' ||
			datos.name === '' ||
			datos.lastname === '' ||
			datos.country === '' ||
			datos.password === '' ||
			datos.confirmPassword === ''
		)
			if (event.target.name === 'email') {
				//   setBotonSubmits(true)
				// else setBotonSubmits(false)

				if (
					/^([\da-z_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/.test(event.target.value)
				) {
					setEstiloEmail('formImput')
				} else {
					setEstiloEmail('formImputMal')
				}
			}

		if (event.target.name === 'name' || event.target.name === 'lastname') {
			var entrada = event.target.value
			entrada = entrada.slice(-1)

			if (/^[0-9]$/.test(entrada)) {
				MySwal.fire({
					// position: 'top-end',
					position: 'center',
					icon: 'error',
					title: 'no se permiten numeros en el  ' + event.target.name,
					showConfirmButton: false,
					timer: 1500,
				})

				return
			}
		}

		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		})
	}

	const enviarDatos = (event) => {
		event.preventDefault()

		if (
			datos.user_Name === '' ||
			datos.email === '' ||
			datos.name === '' ||
			datos.lastName === '' ||
			datos.country === '' ||
			datos.password === '' ||
			datos.confirmPassword === ''
		) {
			MySwal.fire({
				icon: 'error',
				title: 'faltan campos por llenar',
				showConfirmButton: false,
				timer: 1500,
			})
		} else {
			//de country solo necesito el id para que lo busque en la db, y el birthdate era un objeto y necesita un string
			// crearUsuario(datos.email, datos.password)

			//encripta contraseña
			let hashedPass = bcrypt.hashSync(datos.password, 10)

			//objeto enviado para la creacion de usuario
			let userToCreate = {
				user_Name: datos.user_Name,
				name: datos.name,
				lastname: datos.lastname,
				email: datos.email,
				country: datos.country.value,
				birthdate: datos.birthdate.toString(),
				password: hashedPass,
			}

			dispatch(createUser(userToCreate))
		}
	}

	// Mensaje y redirección al crear un usuario
	useEffect(() => {
		if (userCreated && datos.user_Name === userCreated.user_Name) {
			Toast.fire({
				icon: 'success',
				title: 'Usuario registrado correctamente',
			})

			history.push('/reply/login')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userCreated])

	// Mensaje de error del backend al crear un usuario
	useEffect(() => {
		if (error.length > 0) {
			MySwal.fire({
				title: <strong>Oops...</strong>,
				html: <i>{error}</i>,
				icon: 'error',
			})
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, error])

	const onDateChange = (value) => {
		setDatos({
			...datos,
			birthdate: value,
		})
	}
	/*paises habiamos queddo en tenerlo cableado y despues hacer una ruta para los paises, en el de categorias tendriasmos unas por default y que el usuario pueda buscarlo con un input select */
	/* */

	const confirmacionPassword = (event) => {
		setDatos({
			...datos,
			[event.target.name]: event.target.value,
		})
		if (datos.password !== event.target.value) setEstiloInput('formImputMal')
		if (datos.password === event.target.value) setEstiloInput('formImput')
	}

	return (
		<Fragment>
			<div className='container-fluid container-flex-center'>
				<ButtonActions
					type='submit'
					action={() => history.push('/')}
					id='all-icons-arrowBack'
					content={
						<img
							src={allIcons.arrowBack}
							className='all-icons-image'
							alt='icon-home'
						/>
					}
				/>
				<form
					className='formulario container-flex-center'
					onSubmit={enviarDatos}
				>
					<h1 className='replyTitle adjust-repli-size'>Reply</h1>
					<div className='container-flex-center container-imputs-register'>
						<div className='container-form-register'>
							<input
								type='text'
								placeholder='Nombre de usuario'
								value={datos.user_Name}
								className='formImput'
								onChange={handleInputChange}
								name='user_Name'
							></input>
						</div>
						<div className='container-form-register'>
							<input
								type='text'
								placeholder='Correo'
								value={datos.email}
								className={estiloEmail}
								onChange={handleInputChange}
								name='email'
							></input>
						</div>
						<div className='container-form-register'>
							<input
								type='text'
								placeholder='Nombre'
								value={datos.name}
								className='formImput'
								onChange={handleInputChange}
								name='name'
							></input>
						</div>
						<div className='container-form-register'>
							<input
								type='text'
								placeholder='Apellido'
								value={datos.lastname}
								className='formImput'
								onChange={handleInputChange}
								name='lastname'
							></input>
						</div>
						<div className='container-form-register'>
							<input
								type='password'
								placeholder='Contraseña'
								value={datos.password}
								className='formImput'
								onChange={handleInputChange}
								name='password'
							></input>
						</div>
						<div className='container-form-register'>
							<input
								type='password'
								placeholder='Confirma tu contraseña'
								value={datos.confirmPassword}
								className={estiloInput}
								onChange={confirmacionPassword}
								name='confirmPassword'
							></input>
						</div>
						<div className='selectFormulario'></div>
					</div>

					<label className='labelPais'>Fecha de nacimiento</label>

					<div className='selectFormulario'>
						<SelectDatepicker
							hideLabels
							selectedDate={datos.birthdate}
							onDateChange={(value) => onDateChange(value)}
						/>
						<label className='labelPais'>Nacionalidad</label>
						<Select
							className='country'
							options={options}
							value={datos.country}
							onChange={(value) =>
								setDatos({
									...datos,
									country: value,
								})
							}
						/>
					</div>
					<section>
						<button
							type='submit'
							className='btnRegister my-3 mx-3'
							/*disabled={botonSubmit}*/
						>
							Regístrate
						</button>
						<LoginExterno type={'button'} click={() => alert('auth0')} />
					</section>
					<div className='registerText'>
						<p>
							Si ya tienes una cuenta,{' '}
							<Link className='registerScreen' to={`/reply/login`}>
								ingresa aquí
							</Link>
						</p>
					</div>
				</form>
			</div>
		</Fragment>
	)
}

export default Register
