import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllCategoriesAsync } from "../../redux/reducer/categoriesReducer";
import ButtonActions from "../../shared/components/ButtonActions/ButtonActions";
import * as allIcons from "../../shared/assets/icons/all-icons";
import DialogCategories from "../../shared/components/dialogs/dialogCategories/DialogCategories.js";
import "./Header.css";

/**
 * Header  con botones funcionales, aun falta agregar algunos pero así va:
 * ° Ya funciona el mapeo y trae los datos del back
 * Estamos usando un boton global que está en shared/components (ButtonActions)
 * ° Tenemos el add post que ejecuta el agregar posts..
 * ° Tenemos el boton de home que te regresa al home, este solo hace un push al hitory
 * ° El boton de trend debería llevar/traer a los posts con más likes o similar...
 * ° El boton de explore debería llevar/traer a los nuevos posts o usuarios...
 * ° El boton de profile debería llevar a un nuevo componente que muestra el perfil del usuario..
 */

export default function Header() {
  const dispatch = useDispatch();

  let categories = useSelector((state) => state.categories.name);
  let history = useHistory();

  useEffect(() => {
    dispatch(getAllCategoriesAsync());
  }, [dispatch]);

  const goTo = (event) => {
    switch (event.target.alt) {
      case "icon-trend":
        // history.push("/reply/trend");
        // Deberia traer los trends o enviar donde esten 
        break;
      case "icon-explore":
        // history.push("/reply/explore");
        // Deberia traer los nuevos(users o posts) o enviar donde esten
        break;
      case "icon-profile":
        history.push("/reply/profile");
        break;
      default:
        //Falta tener en cuenta el id del user...
        history.push("/reply/home");
        break;
    }
  };

  return (
    <div id="header-component">
      <ul id="icons-container">
        <li id="icon-home">
          <ButtonActions
            type="submit"
            action={goTo}
            id="all-icons"
            content={<img src={allIcons.home} alt="icon-home" />}
          />
        </li>
        <li id="icon-trend">
          <ButtonActions
            type="submit"
            action={goTo}
            id="all-icons"
            content={<img src={allIcons.trend} alt="icon-trend" />}
          />
        </li>
        <li id="icon-explore">
          <ButtonActions
            type="submit"
            action={goTo}
            id="all-icons"
            content={<img src={allIcons.explore} alt="icon-explore" />}
          />
        </li>
        <DialogCategories
          id="icon-categories"
          buttonContent={
            <img src={allIcons.categories} alt="icon-categories" />
          }
          innerContent={categories[0]?.map((c) => c.category)}
        />
        <li id="icon-profile">
          <ButtonActions
            type="submit"
            action={goTo}
            id="all-icons"
            content={<img src={allIcons.profile} alt="icon-profile" />}
          />
        </li>
      </ul>
    </div>
  );
}
