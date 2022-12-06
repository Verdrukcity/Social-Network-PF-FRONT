import React from 'react'
import arrowUp from '../../shared/assets/icons/arrow-up.png'
import addPost from '../../shared/assets/icons/plus.png'
import Header from '../Header/Header.js'
import './Home.css'

/*
  Home es el componente principal donde el usuario encuentra:
   • El header con los botones de navegación
   • Las publicaciones
   • Botón para crear publicación y subir al inicio
*/

export default function Home() {
  return (
    <div id='home'>
      <Header />
      <button id='btn-add-post'>
        <img
          className='icon add-post'
          src={addPost}
          alt='icon to create post'
        />
      </button>
      <button id='btn-go-up'>
        <img
          className='icon go-up'
          src={arrowUp}
          alt='icon to go up in the feed'
        />
      </button>
    </div>
  )
}
