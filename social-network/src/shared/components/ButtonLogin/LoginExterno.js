import googleLogo from '../../assets/icons/GOOG.svg'
import './LoginExterno.css'

export default function LoginExterno({ type, click }) {
	return (
		<button className='btnGoogle' onClick={click} type={type}>
			<img className='imgGoogle' src={googleLogo} alt='logo google' />
		</button>
	)
}
