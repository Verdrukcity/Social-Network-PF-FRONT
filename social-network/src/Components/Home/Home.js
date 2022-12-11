import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllPostsAsync,
  getByCategory,
} from '../../redux/reducer/postsReducer'
import { arrowUp, plus } from '../../shared/assets/icons/all-icons'
import ButtonActions from '../../shared/components/ButtonActions/ButtonActions'
import Card from '../../shared/components/Cards/Card'
import DialogCreatePost from '../../shared/components/dialogs/dialogCreatePost/DialogCreatePost'
import Header from '../Header/Header.js'

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
  const posts = useSelector((state) => state.posts.posts[0])

  const dispatch = useDispatch()
  /**
   * Dispatch y useEffect para traer todos los posts del back
   */
  useEffect(() => {
    dispatch(getAllPostsAsync())
  }, [dispatch])

  /**
   *
   * estado local para recibir la imagen
   */
  const [ImageSelectedPrevious, setImageSelectedPrevious] = React.useState(null)

  const changeImage = (e) => {
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader()

      reader.readAsDataURL(e.target.files[0])

      reader.onload = (e) => {
        e.preventDefault()
        setImageSelectedPrevious(e.target.result) // le damos el binario de la imagen para mostrarla en pantalla
      }
    }
  }

  // FILTER BY CATEGORIES

  const [active, setActive] = React.useState({})

  const filterByCategory = (e) => {
    let { id, style } = e.target

    if (active[id]) {
      setActive({
        ...active,
        [id]: false,
      })
    } else {
      setActive({
        ...active,
        [id]: true,
      })
    }

    active[id] ? (style.color = 'white') : (style.color = 'black')
  }

  /* 
    TODO: mostrar todos los post cuando se quiten los filtros
    // si todas las categorías están en false/undefined en active cargar allPost
    • cuando quite el focus en el categories deberían mantenerse el estilo
  */

  React.useEffect(() => {
    /*
     * Array de categorías extraídas del objeto active
     */
    function getCategories(obj) {
      const activeCategories = new Set()

      for (const key in obj) {
        obj[key] ? activeCategories.add(key) : activeCategories.delete(key)
      }

      return Array.from(activeCategories)
    }

    const categoryFilter = getCategories(active)

    categoryFilter.length > 0
      ? dispatch(getByCategory(categoryFilter))
      : dispatch(getAllPostsAsync())
  }, [dispatch, active])

  // END FILTER BY CATEGORIES

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
      <Header filterByCategory={filterByCategory} />
      <DialogCreatePost open={open} setOpen={setOpen} />
      <div className='row justify-content-center mt-10'>
        {posts &&
          posts.map((data) => {
            return (
              <Card
                key={data._id}
                id={data._id}
                text={data.text}
                img={data.multimedia}
                username={'UserName'}
                userImg={data.multimedia}
              />
            )
          })}
      </div>
      <div>
        <ButtonActions
          type='submit'
          action={addPost}
          id='btn-add-post'
          content={
            <img
              className='icon add-post'
              src={plus}
              alt='icon to create post'
            />
          }
        />
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
      </div>
    </div>
  )
}
