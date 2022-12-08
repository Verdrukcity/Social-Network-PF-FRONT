import React, {Fragment, useState} from 'react';
import Select from 'react-select'
import { SelectDatepicker } from 'react-select-datepicker';
import "./Register.css"
import { useHistory } from 'react-router-dom'
const Register = () => {

    const history= useHistory();


    const [datos, setDatos] = useState({
        userName: '',
        email: '',
        name:'',
        lastName:'',
        birthDate:new Date(),
        country:'',
        password:'',
        confirmPassword:'',

    })
    const [estiloInput, setEstiloInput] = useState('formImput');
    const options = [
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Venezuela', label: 'Venezuela' },
  { value: 'Peru', label: 'Peru' },
  { value: 'Chile', label: 'Chile' },
  { value: 'Uruguay', label: 'Uruguay' },
]

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
        alert("Usuario creado correctamente");
  
        history.push('/reply/home')
    }

    const onDateChange = (value)=>{
         setDatos({
                            ...datos,
                            ["birthDate"] : value
                     })

    }

    const confirmacionPassword= (event)=>{
            setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
        if(datos.password!==event.target.value)
         setEstiloInput('formImputMal')
        if(datos.password===event.target.value)
         setEstiloInput('formImput')
        

    }
    return (
        <Fragment>
           
            
            <form className="formulario" onSubmit={enviarDatos}>
                
                <h1 className='titulo'>Reply</h1>
            
                <div className="campoFormulario">
                    <input type="text" placeholder="UserName" className="formImput" onChange={handleInputChange} name="userName"></input>
                </div>
                <div className="campoFormulario">
                    <input type="text" placeholder="Email" className="formImput" onChange={handleInputChange} name="email"></input>
                </div>
                   <div className="campoFormulario">
                    <input type="text" placeholder="Name" className="formImput" onChange={handleInputChange} name="name"></input>
                </div>
                <div className="campoFormulario">
                    <input type="text" placeholder="LastName" className="formImput" onChange={handleInputChange} name="lastName"></input>
                </div>
                <div className="campoFormulario">
                    <input type="password" placeholder="Password" className="formImput" onChange={handleInputChange} name="password"></input>
                </div>
                <div className="campoFormulario">
                    <input type="password" placeholder="Confirm Password" className={estiloInput} onChange={confirmacionPassword} name="confirmPassword"></input>
                </div>
               <div className='selectFormulario'>
                    

               </div>
               
                <div className='selectFormulario'>
                    <SelectDatepicker
                    selectedDate={datos.birthDate}
                    onDateChange={(value)=>onDateChange(value)}
                    />
                     <Select className='country'
                        options={options}
                        value={datos.country}
                        onChange={ 
                            (value)=>setDatos({
                            ...datos,
                            ["country"] : value
                     })}
                />

                </div>
                <div className='botonPadding'>
                    <button type="submit" className="botonRegister">Register</button>
                </div>
                  
                
            </form>
           
        </Fragment>
    );
}
 
export default Register;