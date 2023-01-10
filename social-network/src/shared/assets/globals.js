export const activeRoundedButton = {
	backgroundColor: '#cf4b2e',
	borderRadius: '50%',
	width: '40px',
	height: '40px',
	border: 'none',
}

export const categoryBox = {
	'position': 'absolute',
	'top': 50,
	'right': -100,
	'zIndex': 1,
	'border': 'none',
	'borderRadius': '25px',
	'p': 1,
	'padding': '10px 30px',
	'width': '400px',
	'height': 'auto',
	'textAlign': 'left',
	'backgroundColor': '#D9D9D9',
	'boxShadow':
		'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
	'@media (max-width:780px)': {
		width: '400px',
		padding: '10px 30px',
		left: -260,
	},
	'@media (min-width:1200px)': {
		width: '600px',
		padding: '15px 75px',
		left: -400,
	},
}

export const searchBox = {
	'position': 'absolute',
	'top': 50,
	'left': -280,
	'borderRadius': '25px',
	'padding': '10px 40px',
	'width': '600px',
	'height': 'auto',
	'textAlign': 'center',
	'backgroundColor': '#D9D9D9',
	'boxShadow':
		'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
	'@media (max-width:1200px)': {
		left: -175,
		width: '400px',
	},
}

export const modalBox = {
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'white',
	p: 4,
}
