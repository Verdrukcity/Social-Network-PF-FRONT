import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../redux/reducer/categoriesReducer'
import * as allIcons from '../../shared/assets/icons/all-icons'
import DialogCategories from '../../shared/components/dialogs/dialogCategories/DialogCategories.js'
import './Header.css'

/*
Componente del header con los iconos establecidos, 
el tag <img/> se pude modificar y/o agregar luego por el tag <Link></Link>
de React-Router
*/

export default function Header() {
  const dispatch = useDispatch()

  const categories = useSelector((state) => state.categories.name)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [dispatch])

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
        <DialogCategories
          id='icon-categories'
          buttonContent={
            <img src={allIcons.categories} alt='icon-categories' />
          }
          innerContent={categories}
        />
        <li id='icon-profile'>
          <img src={allIcons.profile} alt='icon-profile' />
        </li>
      </ul>
    </div>
  )
}
