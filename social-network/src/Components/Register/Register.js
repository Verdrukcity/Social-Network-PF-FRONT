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
    const [botonSubmit, setotBonSubmits] = useState(true)
    const [estiloInput, setEstiloInput] = useState('formImput');
    const [estiloEmail, setEstiloEmail] = useState('formImput');
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
         if(datos.userName===""||datos.email===""||datos.name===""||datos.lastName===""||datos.country===""||datos.password===""||datos.confirmPassword==="")
         setotBonSubmits(true)
         else setotBonSubmits(false)

        
       if(event.target.name=== "email")
        {
              if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(event.target.value)){
             setEstiloEmail('formImput')
            } else {
             setEstiloEmail('formImputMal')
            }

        }

        if(event.target.name=== "name" || event.target.name=== "lastName" )
        {
            var entrada=event.target.value;
            entrada=entrada.slice(-1);
            
                if (/^[0-9]$/.test(entrada)){
                    alert("no se permiten numeros en el  "+ event.target.name);
                    return;
                }



        }
       


        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    const enviarDatos = (event) => {
        event.preventDefault()


        if(datos.userName===""||datos.email===""||datos.name===""||datos.lastName===""||datos.country===""||datos.password===""||datos.confirmPassword==="")
        alert("faltan campos por llenar");
        else
        {alert("Usuario creado correctamente");
          history.push('/reply/login')}
       }

    const onDateChange = (value)=>{
         setDatos({
                            ...datos,
                            ["birthDate"] : value
                     })

    }
    /*paises habiamos queddo en tenerlo cableado y despues hacer una ruta para los paises, en el de categorias tendriasmos unas por default y que el usuario pueda buscarlo con un input select */
    /* */



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
        <div className="container-fluid container-flex-center bg">
           
            
            <form className="formulario container-flex-center " onSubmit={enviarDatos}>
                
                <h1 className='replyTitle'>Reply</h1>
            <div className='container-flex-center container-imputs-register'>
                <div className="container-form-register">
                    <input type="text" placeholder="UserName" value={datos.userName} className="formImput" onChange={handleInputChange} name="userName"></input>
                </div>
                <div className="container-form-register">
                    <input type="text" placeholder="Email" value={datos.email} className={estiloEmail} onChange={handleInputChange} name="email"></input>
                </div>
                <div className="container-form-register">
                    <input type="text" placeholder="Name" value={datos.name} className="formImput" onChange={handleInputChange} name="name"></input>
                </div>
                <div className="container-form-register">
                    <input type="text" placeholder="LastName" value={datos.lastName} className="formImput" onChange={handleInputChange} name="lastName"></input>
                </div>
                <div className="container-form-register">
                    <input type="password" placeholder="Password" value={datos.password} className="formImput" onChange={handleInputChange} name="password"></input>
                </div>
                <div className="container-form-register">
                    <input type="password" placeholder="Confirm Password" value={datos.confirmPassword} className={estiloInput} onChange={confirmacionPassword} name="confirmPassword"></input>
                </div>
               <div className='selectFormulario'></div>
            </div>
                <div className='selectFormulario'>
                    <div className=''>
                       <SelectDatepicker className='select-date-register form-select'
                    selectedDate={datos.birthDate}
                    onDateChange={(value)=>onDateChange(value)}
                    />
                    <label for="pais" className='labelPais'>Pais</label>
                     <Select name='pais' className='country'
                        options={options}
                        value={datos.country}
                        onChange={ 
                            (value)=>setDatos({
                            ...datos,
                            ["country"] : value
                     })}
                /> 
                    </div>
                    

                </div>
                <div className='botonPadding'>
                    <button type="submit" className="botonLogin" disabled={botonSubmit}>Register</button>
                </div>
                  
                
            </form>
           
        </div>
    );
}
 
export default Register;