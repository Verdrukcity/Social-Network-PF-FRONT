import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { arrowUp, plus } from '../../shared/assets/icons/all-icons'
import ButtonActions from '../../shared/components/ButtonActions/ButtonActions'
import Card from '../../shared/components/Cards/Card'
import DialogCreatePost from '../../shared/components/dialogs/dialogCreatePost/DialogCreatePost'
import Header from '../Header/Header.js'
import {getAllPosts} from '../../redux/actions'
import './Home.css'

/*
  Home es el componente principal donde el usuario encuentra:
   • El header con los botones de navegación
   • Las publicaciones (la ruta es /reply)
   • Botón para crear publicación y subir al inicio

  Se realizó la importacion del componente ButtonActtions, 
  este tiene un boton de forma global funcional,
  el mismo ejecuta una accion que le pasas por props,
  tambien se le puede establecer el estilo (aquí usamos el id)
  y el tipo, que no es demasiado relevante, pero funciona!!
*/

export default function Home() {
  /**
   * estado local para abrir y cerrar el dialog del create
   */
  const [open, setOpen] = useState(false)



  const dispatch = useDispatch();
  /**
   * Dispatch y useEffect para traer todos los posts del back 
   */
  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  /**
   * 
   * estado local para recibir la imagen  
   */
  const [ImageSelectedPrevious, setImageSelectedPrevious] = React.useState(null);

  const changeImage = (e) => {
    console.log(e.target.files);
    if (e.target.files[0] !== undefined) {
      
      const reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);

      reader.onload = (e) => {
        e.preventDefault();
        setImageSelectedPrevious(e.target.result); // le damos el binario de la imagen para mostrarla en pantalla
      };
    }
  };


  const addPost = (event) => {
    /*Esta funcion deberia agregar un post*/
    event.preventDefault()
    setOpen(true)
  }

  const goToUp = (event) => {
    /*Esta funcion deberia llevarte al inicio de las publicaciones*/
  }

  return (
    <div id='home'>
      <Header />

      <ButtonActions
        type='submit'
        action={addPost}
        id='btn-add-post'
        content={
          <img className='icon add-post' src={plus} alt='icon to create post' />
        }
      />
      <DialogCreatePost open={open} setOpen={setOpen} changeImage={changeImage} ImageSelectedPrevious={ImageSelectedPrevious} />
      <ButtonActions
        type={'submit'}
        action={goToUp}
        id={'btn-go-up'}
        content={
          <img
            className='icon go-up'
            src={arrowUp}
            alt='icon to go up in the feed'
          />
        }
      />
      <Card></Card>
    </div>
  )
}

