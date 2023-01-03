import React from "react";
import { logoutbtn } from "../../shared/assets/icons/all-icons";
import logoutcss from './Logout.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../../shared/components/loader/loader";

export default function Logout() {

    const {isAuthenticated, isLoading, logout} = useAuth0()

    const history = useHistory()
    // const [token, setToken] = useState({})

    const handleClick = (e) => {
        e.preventDefault()
        localStorage.clear()
        // localStorage.removeItem('token')
        // localStorage.removeItem('userId')
        logout()
        history.push('/reply/login')
    }


    if (isLoading) return <Loader></Loader>;
    return (
        <div className="logout-main-container">
            <img
                className="logout-container"
                type="button"
                src={logoutbtn}
                alt='logout'
                title="Cerrar sesion"
                onClick={handleClick}
            />
            <div className={logoutcss}></div>
        </div>
    )
}