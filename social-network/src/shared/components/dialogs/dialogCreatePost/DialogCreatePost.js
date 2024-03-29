import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'

import { useTheme } from '@mui/material/styles'

import { useDispatch } from 'react-redux'
import dialogcss from './DialogCreatePost.css'

import { imgPhotoLoad } from '../../../assets/icons/all-icons'

import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import { DialogActions, TextareaAutosize } from '@mui/material'
import {
	CreatePostsAsync,
	getAllPostsAsync,
	getUserDetailAsync,
} from '../../../../redux/actions/postActions'
import ButtonActions from '../../ButtonActions/ButtonActions'
import Loader from '../../loader/loader'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function getStyles(name, categoryName, theme) {
	return {
		fontWeight:
			categoryName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	}
}

export default function DialogCreatePost({
	open,
	setOpen,
	innerContent,
	userDetail,
}) {
	/**
	 * hook para el dispatch
	 */
	const dispatch = useDispatch()

	/**array de strings provisional para las categorias */

	const categories = innerContent

	const [file, fileSet] = React.useState()
	const theme = useTheme()
	const [categoryName, setCategory] = React.useState([])
	const [textArea, SetTextArea] = React.useState('')

	const [loader, setLoader] = useState(false)
	const id = localStorage.getItem('userId')
	const token = localStorage.getItem('token')
	useEffect(() => {
		dispatch(getUserDetailAsync(id))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, id])

	const [ImageSelectedPrevious, setImageSelectedPrevious] = React.useState(null)

	const [IsVideo, setIsVideo] = React.useState(false)
	/**
	 * funcion para traer y setear la imagen del input
	 */

	const changeImage = (e) => {
		if (e.target.files[0] !== undefined) {
			let fileToUse = e.target.files[0]
			const reader = new FileReader()
			if (e.target.files[0].type === 'video/mp4') {
				setIsVideo(true)
			}
			fileSet(fileToUse)

			reader.readAsDataURL(e.target.files[0])

			reader.onload = (e) => {
				e.preventDefault()
				setImageSelectedPrevious(e.target.result) // le damos el binario de la imagen para mostrarla en pantalla
			}
		}
	}

	/**funciones para manejar los cambios  */
	/**funcion que maneja el estado de las categorias */
	const handleChange = (event) => {
		const {
			target: { value },
		} = event
		setCategory(
			// On autofill we get a stringified value.
			value
		)
	}
	/* funcion que controla el text */
	const hanldeChangeText = (e) => {
		e.preventDefault()
		let value = e.target.value
		SetTextArea(value)
	}

	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		},
	})

	/*funcion que envia la data */
	const handleSubmit = async (e) => {
		e.preventDefault()
		let formData = new FormData()
		formData.append('text', textArea)

		for (var i = 0; i < categoryName.length; i++) {
			formData.append('category', categoryName[i])
		}
		formData.append('multimedia', file)

		const MySwal = withReactContent(Swal)
		setOpen(false)
		MySwal.fire({
			position: 'center',
			title: 'Nuevo post',
			text: 'Confirma para crear un post',
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, Post!',
			target: true,
		}).then(async (result) => {
			if (result.isConfirmed) {
				setOpen(true)
				setLoader(true)
				await dispatch(CreatePostsAsync(formData, id, token))
				dispatch(getAllPostsAsync())
				setLoader(false)
				Toast.fire({
					position: 'top-end',
					title: 'Publicación creada exitosamente',
					icon: 'success',
				})
			}
		})
	}

	/**
	 * variables para que cuando el dialogo se abra menos de md se ponga en pantalla completa
	 */

	/**
	 * funcion para cerrar el dialog
	 */
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='responsive-dialog-title'
		>
			<div className='dialog-bg overflow-hidden'>
				{loader && <Loader />}

				<DialogContent>
					<h2 className='text-center color-whie-reply'>Crea tu publicacion!</h2>
					<div className='d-flex w-100 h-100 '>
						<div className='image-upload-wrap m-2'>
							<input
								type='file'
								name='multimedia'
								allo
								onChange={(e) => {
									changeImage(e)
								}}
								accept='image/* video/*'
								className='file-upload-input'
							/>

							<div>
								{ImageSelectedPrevious && !IsVideo && (
									<img
										src={ImageSelectedPrevious}
										className='text-information-img img-fluid'
										alt='imagen para seleccionar'
									/>
								)}
								{!ImageSelectedPrevious && !IsVideo && (
									<img
										src={imgPhotoLoad}
										className='text-information-img img-fluid'
										alt='imagen seleccionada'
									/>
								)}
								{IsVideo && (
									<video
										className='text-information-img img-fluid'
										src={ImageSelectedPrevious}
										alt='video'
										controls
										width='320'
										height='240'
									/>
								)}
							</div>
						</div>

						<div className='m-2 w-100 d-flex flex-column'>
							{
								<div
									key={userDetail.name}
									className='w-100 d-flex justify-content-start align-items-center '
								>
									<img
										src={userDetail.image_profil}
										className='profile-img'
										alt='imagen de perfil'
									/>
									<h3 className=' ms-2 color-whie-reply'>
										{userDetail.user_Name}
									</h3>
								</div>
							}

							<div className=' w-100  bg-input p-2 mt-2 border-radius-30 align-items-stretch p-2'>
								<TextareaAutosize
									className='dialog-input p-2 w-100 color-whie-reply'
									aria-label='minimum height'
									minRows={3}
									maxRows={6}
									placeholder='Agrega tu comentario aqui!'
									onChange={hanldeChangeText}
								/>
							</div>
						</div>
					</div>
					<div className='d-flex justify-content-center align-items-center'>
						<FormControl sx={{ m: 1, width: 300 }}>
							<InputLabel id='demo-multiple-chip-label'>Categorias</InputLabel>
							<Select
								labelId='demo-multiple-chip-label'
								id='demo-multiple-chip'
								multiple
								value={categoryName}
								onChange={handleChange}
								input={<OutlinedInput id='select-multiple-chip' label='Chip' />}
								renderValue={(selected) => (
									<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
										{selected.map((value) => (
											<Chip key={value} label={value} />
										))}
									</Box>
								)}
							>
								{categories?.map((name) => (
									<MenuItem
										key={name}
										value={name}
										style={getStyles(name, categoryName, theme)}
									>
										{name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>

					<DialogActions className='d-flex justify-content-center'>
						<div className={dialogcss}>
							<ButtonActions
								action={handleSubmit}
								id={'buttonAction'}
								content={'Crear'}
							/>
						</div>
					</DialogActions>
				</DialogContent>
			</div>
		</Dialog>
	)
}
