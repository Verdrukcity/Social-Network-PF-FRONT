import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import cardcss from './Card.css'
import { createComment } from '../../../redux/actions/commentsActions'
import { useDispatch } from 'react-redux'
import {
	likeIcon,
	likeIconFilled,
	payIcon,
	sendIcon,
	shareIcon,
} from '../../assets/icons/all-icons'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {
	chekout,
	stripeAccountsConsult,
} from '../../../redux/actions/pagoActions'
import { likePostAsync } from '../../../redux/actions/postActions'
// import LikeButton from "../../../Components/LikeButton/LikeButton";
import { Throttle } from 'react-throttle'

// the props we are going to use are:
// img, username, imgUser, text
//hacer un efecto para ir a details, cuando paso por sobre la foto que se haga una spmbra o se agrande un poco...

function Card(props) {
	const MySwal = withReactContent(Swal)
	const token = localStorage.getItem('token')
	const obj = {
		username: 'compañero guerra',
		imgUser:
			'https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9pbWFnZXMuY29pbnRlbGVncmFwaC5jb20vaW1hZ2VzLzcxN19hSFIwY0hNNkx5OXpNeTVqYjJsdWRHVnNaV2R5WVhCb0xtTnZiUzkxY0d4dllXUnpMekl3TWpFdE1UQXZNRGxpWVRaaU1Ea3ROR00wTmkwMFlqUmtMV0ZsT0RFdFlUWTNOakpoWVdReE56QmhMbXB3Wnc9PS5qcGc=.jpg',
		img: 'https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F679277%2Fshiba-inu-dogecoin-cryptocurrency-blockchain-network-getty.jpg&op=resize&w=700',
		text: 'Hello, world!',
	}
	const dispatch = useDispatch()
	const [input, setInput] = useState({
		text: '',
		profileId: `${props.logedUser}`,
	})
	const history = useHistory()
	const [stripe, setStripe] = useState(false)

	const verificarStripe = async () => {
		if (props.stripeId) {
			/*const pagoActivo = await dispatch(
				stripeAccountsConsult(props.stripeId)
			);

			if (pagoActivo.data.capabilities.card_payments === "active") {
				setStripe(true);
			}*/
			setStripe(true)
		}
	}

	const handleInputChange = (event) => {
		setInput({
			...input,
			[event.target.name]: event.target.value,
		})
	}
	const pagoStripe = async (event) => {
		event.preventDefault()
		const pagoActivo = await dispatch(stripeAccountsConsult(props.stripeId))
		if (pagoActivo.data.capabilities.card_payments === 'active') {
			let price = ''
			MySwal.fire({
				position: 'center',
				input: 'select',
				inputOptions: {
					1: '$1',
					5: '$5',
					10: '$10',
				},
				inputPlaceholder: 'Select donation ',
				icon: 'question',
				title: 'Cuanto deseas donar',
				showConfirmButton: true,
				showCancelButton: true,
			}).then(async (result) => {
				/* Read more about isConfirmed, isDenied below */
				if (result.isConfirmed) {
					if (result.value === '1') price = 'price_1MFR4BAFCTt3dg6N5rtauWLe'
					if (result.value === '5') price = 'price_1MFR8nAFCTt3dg6Nlc0bydXW'
					if (result.value === '10') price = 'price_1MFR9oAFCTt3dg6NIuUBD8gC'

					const data = {
						id: props.stripeId,
						price: price,
					}
					const respuestaPago = await dispatch(chekout(data))

					Swal.fire(
						'vas a realizar una donacion de $' +
						result.value +
						', Se te va a redireccionar a la pagina de pago!!'
					)
					window.open(respuestaPago.url)
				} else {
					Swal.fire('Donacion cancelada')
					return
				}
			})
		} else {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Parece que aún algo salio mal, el usuario aun no tiene todos los datos completos',
			})
		}
	}

	const [isLiked, setIsLiked] = useState(props.likes.some(e => e.usersLiked === props.logedUser))
	const [likes, setLikes] = useState(props.likes.length);

	const handleLike = (postId, userLoged) => {
		dispatch(likePostAsync(postId, userLoged, token))
	};

	useEffect(() => {
		setIsLiked(props.likes.some(e => e.usersLiked === props.logedUser))
		setLikes(props.likes.length);
		verificarStripe();
	}, [props, isLiked]);


	const handleSubmit = (e) => {
		e.preventDefault()

		MySwal.fire({
			position: 'center',
			icon: 'success',
			title: 'Comentario Posteado Correctamente',
			showConfirmButton: false,
			timer: 1500,
		})
		dispatch(createComment(input, props.id))
		setInput({
			text: '',
		})
		// history.push('/reply/home')
	}

	const [link, setLink] = useState(null)
	const urlToShare = `${window.location.origin}/reply/postdetail/${props.id}`

	const linkShare = async () => {
		console.log(props)
		try {
			const generatedLink = urlToShare // generate a link
			setLink(generatedLink)
			await navigator.clipboard.writeText(generatedLink)
		} catch (err) {
			console.error('Failed to copy link: ', err)
		}
		return Swal.fire({
			icon: 'success',
			title: 'Link copiado en el portapapeles',
			text: urlToShare,
		})
	}

	return (
		<div
			id='cardContainer'
			className='container p-0 mx-auto mb-4 w-auto h-auto col'
		>
			<div className='p-4 m-0 row'>
				<div className='container p-0 m-0'>
					<div className='row p-0 m-0'>
						<div className='col-6'>
							<div>
								{props.resourseType === 'image' ? (
									<img
										className='imgCard img-fluid'
										src={props.img || obj.img}
										alt='postImg'
									></img>
								) : (
									<iframe
										className=' imgCard'
										title='user video'
										src={props.img || obj.img}
										frameBorder='0'
										seamless
										allowFullScreen
									></iframe>
								)}
							</div>
						</div>

						<div className='col-6 '>
							<div className='col h-75 '>
								<div className='row-4'>
									<div className='d-flex justify-content-around align-items-center my-3'>
										<img
											className='userImgCard img-fluid'
											src={props.userImg || obj.imgUser}
											alt='userImg'
										></img>
										<p className='fs-3 fw-bold text-white m-0 me-3'>
											{props.username || obj.username}
										</p>
									</div>
								</div>
								<div className='row-4 containerContentInfo h-'>
									<p className='p-2 m-0 h-100'>{props.text || obj.text}</p>
								</div>
								<div className='row-2'>
									<a
										className='text-morecomments '
										href={`/reply/postdetail/${props.id}`}
									>
										Ver todos los comentarios...
									</a>
								</div>
							</div>

						</div>
					</div>

				</div>
			</div>
			<div className=' color-white ps-2 row'>
				<div className='d-flex justify-content-start align-items-center'>
					<p className='fs-1 fw-bold'>#</p>
					<div className='d-flex '>
						{props.categories?.map((e) => {
							return (
								<p className='m-2 p-2 text-center card-container-categories'>
									{e}{' '}
								</p>
							)
						})}
					</div>
				</div>
			</div>

			<div className='comments p-2 m-0 row'>
				<div className='row'>
					<div className='col-2 m-0 p-0'>
						<div className='d-flex flex-column justify-content-center align-items-center'>
							{/* <Throttle time='1200' handler='onClick'> */}
								<img
									className='icon-size d-flex  justify-content-center align-items-center me-0  p-0 m-0'
									src={isLiked ? likeIconFilled : likeIcon}
									alt='icon de likes'
									onClick={() => {
										handleLike(props.id, props.logedUser)
									}}
								/* alt='icon de likes'
								onClick={() => {
									handleLike(props.id, props.logedUser)
								}} */
								/>
							{/* </Throttle> */}
							<p className='fw-bold m-0'>{likes}</p>
						</div>
					</div>
					<div className='inp col-8 p-0 m-0'>
						<div className='d-flex '>
							<input
								className='inp text-start '
								value={input.text}
								name='text'
								placeholder='Escribe un comentario ...'
								onChange={handleInputChange}
							/>
							<img
								src={sendIcon}
								onClick={handleSubmit}
								className='curser-pointer-card m-2 icon-size'
								alt='icon de share'
							/>
						</div>
					</div>
					<div className=' col-2 p-0 m-0'>
						{stripe && (
							<img
								src={payIcon}
								onClick={pagoStripe}
								className='icon-size m-2'
								alt='icon de pay'
							/>
						)}
						<img
							src={shareIcon}
							onClick={linkShare}
							className='icon-size m-2'
							alt='icon de share'
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
// recordar que este link es para el detalle

export default Card
