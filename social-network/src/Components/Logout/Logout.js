import React from "react";
import { logout } from "../../shared/assets/icons/all-icons";
import logoutcss from './Logout.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Logout() {

    const history = useHistory()
    // const [token, setToken] = useState({})

    const handleClick = (e) => {
        e.preventDefault()
        localStorage.clear()
        // localStorage.removeItem('token')
        // localStorage.removeItem('userId')
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