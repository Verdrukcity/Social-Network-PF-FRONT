import React, { useState } from "react";
import { logout } from "../../shared/assets/icons/all-icons";
import './Logout.css'
import { sendTokenAction } from "../../redux/actions/usersActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";

export default function Logout() {

    const history = useHistory()
    const [token, setToken] = useState({})

    const handleClick = (e) => {
        e.preventDefault()
        sendTokenAction(null)
        history.push('/reply/login')
    }


    return (
        <div className="logout-main-container">
            <img
                className="logout-container"
                type="button"
                src={logout}
                alt='logout'
                title="Cerrar sesion"
                onClick={handleClick}
            />
        </div>
    )
}