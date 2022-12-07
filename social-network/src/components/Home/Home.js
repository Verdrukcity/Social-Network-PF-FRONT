import React from "react";
import { arrowUp, plus } from "../../shared/assets/icons/all-icons";
import Header from "../Header/Header.js";
import ButtonActions from "../../shared/componets/ButtonActions/ButtonActions";
import "./Home.css";

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
  const addPost = (event) => {
    /*Esta funcion deberia agregar un post*/
  };

  const goToUp = (event) => {
    /*Esta funcion deberia llevarte al inicio de las publicaciones*/
  };

  return (
    <div id="home">
      <Header />

      <ButtonActions
        type="submit"
        action={addPost}
        id="btn-add-post"
        content={
          <img className="icon add-post" src={plus} alt="icon to create post" />
        }
      />
      <ButtonActions
        type={"submit"}
        action={goToUp}
        id={"btn-go-up"}
        content={
          <img
            className="icon go-up"
            src={arrowUp}
            alt="icon to go up in the feed"
          />
        }
      />
    </div>
  );
}