import googleLogo from '../../assets/icons/GOOG.svg'
import './LoginExterno.css'
import { useAuth0 } from "@auth0/auth0-react";


export default function LoginExterno({ type }) {
	const { loginWithRedirect } = useAuth0();

	return (
		<button className='btnGoogle' onClick={() => loginWithRedirect()} type={type}>
			<img className='imgGoogle' src={googleLogo} alt='logo google' />
		</button>
	)
}
