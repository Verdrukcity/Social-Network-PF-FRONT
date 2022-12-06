import React from 'react'
import Header from '../Header/Header.js'

/*
  Home es el componente principal donde el usuario encuentra:
   • El header con los botones de navegación
   • Las publicaciones
   • Botón para crear publicación y subir al inicio
*/

export default function Home() {
  return (
    <div>
      <Header />
      <button>+</button>
    </div>
  )
}
