import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
/* import {
  getAllPostsAsync,
  getByCategory,
  getUserDetailAsync,
} from '../../redux/reducer/postsReducer' */
import {
  getAllPostsAsync,
  getUserDetailAsync,
} from '../../redux/actions/postActions'
import { getByCategory } from '../../redux/reducer/postsReducer'
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
  const posts = useSelector((state) => state.posts.posts)
  let categories = useSelector((state) => state.categories.name)

  let userDetail = useSelector((state) => state.posts.userDetail)

  const categoriesArr = categories?.map((c) => c.category)

  const dispatch = useDispatch()
  /**
   * Dispatch y useEffect para traer todos los posts del back
   */

  useEffect(() => {
    /**me traigo todos los posts */
    dispatch(getAllPostsAsync())
    /**me traigo el detalle del usuario */
    dispatch(getUserDetailAsync())
  }, [dispatch])

  const ref = useRef(null)

  // FILTER BY CATEGORIES

  /*
   * filterByCategory hace el dispatch de un estado con los categories activos
   */

  const [activeCategories, setActiveCategories] = useState(new Set())

  function filterByCategory(e) {
    const { id } = e.target

    // preguntar por id y agregar o elimina la categoría del estado
    activeCategories.has(id)
      ? setActiveCategories(
          (prev) => new Set([...prev].filter((x) => x !== id))
        )
      : setActiveCategories(
          (activeCategories) => new Set([...activeCategories, id])
        )
  }

  useEffect(() => {
    // si hay elementos activos despacha una acción de filtrado
    activeCategories.size === 0
      ? dispatch(getAllPostsAsync())
      : dispatch(getByCategory(Array.from(activeCategories)))
  }, [dispatch, activeCategories])

  // END FILTER BY CATEGORIES

  const addPost = (event) => {
    /*Esta función debería agregar un post*/
    event.preventDefault()
    setOpen(true)
  }

  const goToUp = (event) => {
    /*Esta función debería llevarte al inicio de las publicaciones*/
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={ref} id='home' className='mt-2'>
      <Header
        filterByCategory={filterByCategory}
        innerContent={categoriesArr}
      />
      <DialogCreatePost
        open={open}
        setOpen={setOpen}
        innerContent={categoriesArr}
        userDetail={userDetail}
      />
      <div className='container d-flex flex-column justify-content-center mt-10'>
        {posts &&
          posts.map((data) => {
            return (
              <Card
                key={data._id}
                id={data._id}
                userId={data.userId._id}
                text={data.text}
                img={data.multimedia}
                username={data.userId.user_Name}
                userImg={data.userId.image_profil}
                categories={data.category}
                comments={data.commentId}
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
