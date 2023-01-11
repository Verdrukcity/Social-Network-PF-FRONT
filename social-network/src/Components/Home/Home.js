import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	getAllPostsAsync,
	getUserDetailAsync,
} from '../../redux/actions/postActions'
import {
	allPostsSelector,
	findBy,
	getByCategory,
	orderByLikes,
} from '../../redux/reducer/postsReducer'
import { arrowUp, plus, logo } from '../../shared/assets/icons/all-icons'
import ButtonActions from '../../shared/components/ButtonActions/ButtonActions'
import Card from '../../shared/components/Cards/Card'
import DialogCreatePost from '../../shared/components/dialogs/dialogCreatePost/DialogCreatePost'
import Header from '../Header/Header.js'
import { useAuth0 } from '@auth0/auth0-react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import home from './Home.css'
import Loader from '../../shared/components/loader/loader'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
/*
  Home es el componente principal donde el usuario encuentra:
   • El header con los botones de navegación
   • Las publicaciones (la ruta es /reply)
   • Botón para crear publicación y subir al inicio
  Se realizó la importación del componente ButtonActions, 
  este tiene un botón de forma global funcional,
  el mismo ejecuta una acción que le pasas por props,
  también se le puede establecer el estilo (aquí usamos el id)
  y el tipo, que no es demasiado relevante, pero funciona!!
*/

export default function Home() {
	/**
	 * estado local para abrir y cerrar el dialog del create
	 */
	const { user, isAuthenticated, isLoading, logout } = useAuth0()
	const [loading, setLoading] = useState(true)
	const [open, setOpen] = useState(false)
	const posts = useSelector(allPostsSelector)
	// const token = useSelector(tokenSelector)
	let token = localStorage.getItem('token')
	let categories = useSelector((state) => state.categories.name)
	let userDetail = useSelector((state) => state.posts.userDetail)
	let id = window.localStorage.getItem('userId')

	const categoriesArr = categories?.map((c) => c.category)

	const dispatch = useDispatch()
	/**
	 * Dispatch y useEffect para traer todos los posts del back
	 */

	const [actualPosts, setActualPosts] = useState()

	const [arePost, setArePost] = useState(true)

	useEffect(() => {
		setActualPosts(posts)
		if (actualPosts) setLoading(false)
		posts.length ? setArePost(true) : setArePost(false)

		if (isAuthenticated && !isLoading && user && !token) {
			// auth0 function
			const asincronous = async () => {
				await axios
					.post('/authuserAuth0', user)
					.then((res) => res.data)
					.then((res) => {
						if (res.data && res.message) {
							localStorage.setItem('userId', res.data.id)
							localStorage.setItem('token', res.data.token)
							token = localStorage.getItem('token')
							id = localStorage.getItem('userId')
							setLoading(false)
						}
						if (res.message === 'Usuario logueado y creado correctamente') {
							Swal.fire(
								'¡Buen trabajo!',
								`Tu usuario es: "${user.nickname}" y tu contraseña "${user.email}" si deseas cambiarlos
						dirigete a tu perfil`,
								'success'
							)
						}
					})
					.then(() => {
						dispatch(getAllPostsAsync(token))
					})
					.catch((err) =>
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Parece que aún algo salio mal',
						}).then((responce) => {
							if (responce.isConfirmed) {
								localStorage.clear()
								logout({ returnTo: window.location.origin })
							}
						})
					)
			}
			asincronous()
		}
	}, [posts, isAuthenticated, user, isLoading, logout, token])

	useEffect(() => {
		/**me traigo todos los posts */

		if (token && !isAuthenticated) dispatch(getAllPostsAsync(token))

		/**me traigo el detalle del usuario */
		if (id) dispatch(getUserDetailAsync(id))

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, id, isAuthenticated, token])

	const ref = useRef(null)

	// FILTER BY CATEGORIES

	/*
	 * filterByCategory hace el dispatch de un estado con los categories activos
	 */

	const [activeCategories, setActiveCategories] = useState(new Set())

	function filterByCategory(e) {
		const { id } = e.target

		// preguntar por id y agregar o elimina la categoría del estado

		activeCategories.has(id)
			? setActiveCategories(
					(prev) => new Set([...prev].filter((x) => x !== id))
			  )
			: setActiveCategories(
					(activeCategories) => new Set([...activeCategories, id])
			  )
	}

	useEffect(() => {
		// si hay elementos activos despacha una acción de filtrado
		if (activeCategories.size === 0) {
			if (token) dispatch(getAllPostsAsync(token))
		} else {
			dispatch(getByCategory(Array.from(activeCategories)))
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, activeCategories, token])

	// END FILTER BY CATEGORIES

	// Order likes

	function fnOrderByLikes() {
		dispatch(orderByLikes())
		goToUp()
	}

	// SEARCHBAR

	const searchRef = useRef('')

	function handleSearchBarChange(e) {
		searchRef.current = e.target.value
		dispatch(findBy(e.target.value))
		goToUp()
	}

	function deleteFindText() {
		searchRef.current = ''
		dispatch(getAllPostsAsync(token))
		goToUp()
	}

	const addPost = (event) => {
		/*Esta función debería agregar un post*/
		event.preventDefault()
		setOpen(true)
	}

	const goToUp = (event) => {
		/*Esta función debería llevarte al inicio de las publicaciones*/
		ref.current?.scrollIntoView({ behavior: 'smooth' })
	}
	if (isLoading || loading || !actualPosts || !posts) return <Loader></Loader>

	if (!token && !isAuthenticated) {
		return Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Parece que aún algo salio mal, no has iniciado sesion',
		}).then((response) => {
			if (response.isConfirmed) {
				localStorage.clear()
				window.location = '/'
			}
		})
	}

	if (userDetail.status === false) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'Parece que aún algo salio mal, tu usuario ha sido desactivado',
		}).then((response) => {
			if (response.isConfirmed) {
				window.location = '/'
			}
		})
	}

	if (userDetail.role === 'admin') {
		window.location = '/reply/admin'
	}
	// const [token, setToken] = useState({})

	return (
		<div>
			<div ref={ref} id='home' className='mt-2'>
				<Link to={'/'}>
					<img
						src={logo}
						alt='logo reply'
						className='fixed-top d-none d-md-inline-flex ms-4 mt-4'
					/>
				</Link>

				<Header
					deleteFindText={deleteFindText}
					findByText={searchRef.current}
					handleSearchBarChange={handleSearchBarChange}
					filterByCategory={filterByCategory}
					orderByLikes={fnOrderByLikes}
					innerContent={categoriesArr}
					activeCategories={activeCategories}
				/>
				<DialogCreatePost
					open={open}
					setOpen={setOpen}
					innerContent={categoriesArr}
					userDetail={userDetail}
					className={home}
				/>

				<div className='container d-flex flex-column justify-content-center mt-10'>
					<section
						className={!arePost ? '' : 'd-none'}
						style={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-around',
							width: '100%',
							height: '80vh',
						}}
					>
						<h2 style={{ fontWeight: 'bold', textAlign: 'center' }}>
							No encontramos ningún post
						</h2>
						<img
							src={logo}
							alt='logo reply'
							style={{ width: '90px', height: 'auto', margin: '0 auto' }}
						/>
						<h4 style={{ textAlign: 'center' }}>
							Puedes crear un post único con estas categorías
						</h4>
					</section>

					{actualPosts &&
						posts.map((data) => {
							return (
								<Card
									key={data._id}
									id={data._id}
									userId={data.userId._id}
									text={data.text}
									img={data.multimedia}
									username={data.userId.user_Name}
									userImg={data.userId.image_profil}
									categories={data.category}
									comments={data.commentId}
									stripeId={data.userId.userStripe}
									likes={data.likes}
									logedUser={id}
									resourseType={data.resourseType}
									token={token}
								/>
							)
						})}
				</div>
				<div>
					<ButtonActions
						type='submit'
						action={addPost}
						id='btn-add-post'
						content={
							<img
								className='icon add-post'
								src={plus}
								alt='icon to create post'
							/>
						}
					/>
					<ButtonActions
						type={'submit'}
						action={goToUp}
						id={'btn-go-up'}
						content={
							<img
								className='icon go-up'
								src={arrowUp}
								alt='icon to go up in the feed'
							/>
						}
					/>
				</div>
			</div>
		</div>
	)
}
