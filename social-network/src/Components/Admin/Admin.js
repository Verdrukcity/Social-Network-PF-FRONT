import React, { useEffect, useState } from 'react'
import TableData from '../../shared/components/Table/TableData'
import TablePosts from '../../shared/components/Table/TablePosts'
import { useDispatch, useSelector } from 'react-redux'
import { allUsersVerifySelector } from '../../redux/reducer/adminReducer'
import {
	getAllPostsAsync,
	getUserDetailAsync,
} from '../../redux/actions/postActions'
import {
	getAllUsersVerifyAsync,
	updateUserStatus,
	updatePostStatus,
} from '../../redux/actions/adminActions'
import { allPostsSelector } from '../../redux/reducer/postsReducer'
import Switch from '@mui/material/Switch'
import { list } from '../../shared/assets/icons/all-icons'
import Swal from 'sweetalert2'
import DialogTablePost from '../../shared/components/dialogs/dialogTablePost/dialogTablePost'
import Logout from '../Logout/Logout'

export default function Admin() {
	const allUsers = useSelector(allUsersVerifySelector)
	const users = allUsers.filter((user) => user.role !== 'admin')
	const token = localStorage.getItem('token')
	let userDetail = useSelector((state) => state.posts.userDetail)
	const id = window.localStorage.getItem('userId')

	const [open, setOpen] = useState(false)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllUsersVerifyAsync(token))
		dispatch(getAllPostsAsync(token))
		dispatch(getUserDetailAsync(id))
	}, [dispatch, token])

	if (!token) {
		window.location = '/'
	}

	if (userDetail.role === 'user') {
		window.location = '/reply/home'
	}

	const userStatusUpdate = (event, id) => {
		event.preventDefault()
		dispatch(updateUserStatus(id, token))
	}

	const [userData, setUserData] = useState('')

	// Columnas requeridas en la tabla @table-library
	const columns = [
		{ label: 'id', renderCell: (item) => item._id, resize: true },
		{
			label: 'usuario',
			renderCell: (item) => item.user_Name,
			resize: true,
		},
		{ label: 'correo', renderCell: (item) => item.email, resize: true },
		{
			label: 'publicaciones',
			renderCell: (item) => (
				<button
					className='btn btn-light btn-sm text-lowercase w-100'
					onClick={() => {
						setOpen(true)
						setUserData(item._id)
					}}
				>
					<img src={list} alt='list detail' width='40px' />
				</button>
			),
			resize: true,
		},
		{
			label: 'estado',
			renderCell: (item) => (
				<Switch
					checked={item.status}
					onChange={(event) => userStatusUpdate(event, item._id)}
					color='warning'
				/>
			),
		},
	]

	return (
		<div>
			{userDetail?.role === 'admin' ? (
				<div
					className='bg-warning text-dark bg-opacity-50'
					style={{ height: '100vh' }}
				>
					<div className='container pt-3 bg-light'>
						<DialogTablePost open={open} setOpen={setOpen} userId={userData} />

						<header className='text-center my-4'>
							<h1>Bienenid@ al dashboard de administrador</h1>
							<Logout />
						</header>
						<section className='p-4 my-5 text-wrap'>
							<TableData columns={columns} nodes={users} />
						</section>
					</div>
				</div>
			) : (
				<div></div>
			)}
		</div>
	)
}
