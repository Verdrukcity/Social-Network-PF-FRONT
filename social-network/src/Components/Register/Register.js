import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { SelectDatepicker } from 'react-select-datepicker'
import { allCountries } from '../../redux/reducer/countriesReducer'
import { getAllCountriesAsync } from '../../redux/actions/countriesActions'
import './Register.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { createUser } from '../../redux/actions/usersActions'
import bcrypt from 'bcryptjs';



const Register = () => {
  const MySwal = withReactContent(Swal)
  const dispatch = useDispatch()
  const history = useHistory()

  /*
   * countries consume del API de países todos los nombres
   * retorna como value/label el array de objetos options
   */

  const countries = useSelector(state=> state.countries.list)

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
    //   setBotonSubmits(true)
    // else setBotonSubmits(false)

    if (event.target.name === 'email') {
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
          position: 'top-end',
          icon: 'error',
          title: ('no se permiten numeros en el  ' + event.target.name),
          showConfirmButton: false,
          timer: 1500
        });

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
        timer: 1500
      });
    }
    else {
      //de country solo necesito el id para que lo busque en la db, y el birthdate era un objeto y necesita un string

      //encripta contraseña
      let hashedPass = bcrypt.hashSync(datos.password, 10)
      
      //objeto enviado para la creacion de usuario
      let userToCreate = {
        user_Name: datos.user_Name,
        name: datos.name,
        lastname: datos.lastname,
        email: datos.email,
        country: datos.country.value ,
        birthdate: datos.birthdate.toString(), 
        password: hashedPass
      }
      
      dispatch(createUser(userToCreate))

      MySwal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Usuario creado Correctamente',
        showConfirmButton: false,
        timer: 1500,
      });
      history.push('/reply/login')
    }
  }

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
      <div className='container-fluid container-flex-center bg'>
        <form className='formulario container-flex-center' onSubmit={enviarDatos}>
          <h1 className='replyTitle adjust-repli-size'>Reply</h1>
          <div className='container-flex-center container-imputs-register'>
            <div className='container-form-register'>
              <input
                type='text'
                placeholder='UserName'
                value={datos.user_Name}
                className='formImput'
                onChange={handleInputChange}
                name='user_Name'></input>
            </div>
            <div className='container-form-register'>
              <input
                type='text'
                placeholder='Email'
                value={datos.email}
                className={estiloEmail}
                onChange={handleInputChange}
                name='email'></input>
            </div>
            <div className='container-form-register'>
              <input
                type='text'
                placeholder='Name'
                value={datos.name}
                className='formImput'
                onChange={handleInputChange}
                name='name'></input>
            </div>
            <div className='container-form-register'>
              <input
                type='text'
                placeholder='LastName'
                value={datos.lastname}
                className='formImput'
                onChange={handleInputChange}
                name='lastname'></input>
            </div>
            <div className='container-form-register'>
              <input
                type='password'
                placeholder='Password'
                value={datos.password}
                className='formImput'
                onChange={handleInputChange}
                name='password'></input>
            </div>
            <div className='container-form-register'>
              <input
                type='password'
                placeholder='Confirm Password'
                value={datos.confirmPassword}
                className={estiloInput}
                onChange={confirmacionPassword}
                name='confirmPassword'></input>
            </div>
            <div className='selectFormulario'></div>

          </div>

          <div className='selectFormulario'>
            <SelectDatepicker className='select-date-register form-select'
              selectedDate={datos.birthdate}
              onDateChange={(value) => onDateChange(value)}
            />
            <label  className='labelPais'>Pais</label>
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
          <div className='botonPadding'>
            <button
              type='submit'
              className='botonLogin'
              /*disabled={botonSubmit}*/>
              Register
            </button>
          </div>
          
        </form>
      </div>

    </Fragment>
  )
}

export default Register
