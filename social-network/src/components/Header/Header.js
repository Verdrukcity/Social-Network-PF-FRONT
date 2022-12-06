import React from 'react'
import "./Header.css"

/*
Componente del header con los iconos establecidos, 
el tag <a></a> se pude modificar luego por el tag <Link></Link>
de React-Router
*/

export default function Header() {
  return (
    <div>
      <ul>
        <li id='icon-home'>
          <a href="" className="icon-home" ></a>
        </li>
        <li id='icon-trend'>
          <a href="" className="icon-trend" ></a>
        </li>
        <li id='icon-explore'>
          <a href="" className="icon-explore" ></a>
        </li>
        <li id='icon-categories'>
          <<a href="" className="icon-categories" ></a>
        </li>
        <li id='icon-profile'>
          <a href="" className="icon-profile" ></a>
        </li>
      </ul>
    </div>
  )
}
