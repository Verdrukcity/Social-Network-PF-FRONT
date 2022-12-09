import React from 'react'
import * as allIcons from '../../shared/assets/icons/all-icons'
import DialogCategories from '../../shared/components/dialogs/dialogCategories/DialogCategories.js'
import './Header.css'

/*
Componente del header con los iconos establecidos, 
el tag <img/> se pude modificar y/o agregar luego por el tag <Link></Link>
de React-Router
*/

export default function Header() {
  return (
    <div id='header-component'>
      <ul id='icons-container'>
        <li id='icon-home'>
          <img src={allIcons.home} alt='icon-home' />
        </li>
        <li id='icon-trend'>
          <img src={allIcons.trend} alt='icon-trend' />
        </li>
        <li id='icon-explore'>
          <img src={allIcons.explore} alt='icon-explore' />
        </li>
        <li id='icon-categories'>
          <DialogCategories
            buttonContent={
              <img src={allIcons.categories} alt='icon-categories' />
            }
          />
        </li>
        <li id='icon-profile'>
          <img src={allIcons.profile} alt='icon-profile' />
        </li>
      </ul>
    </div>
  )
}
