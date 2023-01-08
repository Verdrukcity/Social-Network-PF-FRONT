import React, { useEffect } from 'react'
import TableData from '../../shared/components/Table/TableData'
import { useDispatch, useSelector } from 'react-redux'
import { allUsersVerifySelector } from '../../redux/reducer/adminReducer'

import { getAllUsersVerifyAsync } from '../../redux/actions/adminActions'

export default function Admin() {
	const users = useSelector(allUsersVerifySelector)
	const token = localStorage.getItem('token')

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getAllUsersVerifyAsync(token))
	}, [dispatch, token])

	// Columnas requeridas en la tabla @table-library
	const columns = [
		{ label: 'id', renderCell: (item) => item._id, resize: true },
		{ label: 'username', renderCell: (item) => item.user_Name, resize: true },
		{
			label: 'status',
			renderCell: (item) => {
				return item.status ? (
					<span className='badge text-bg-success'>activo</span>
				) : (
					<span className='badge text-bg-danger'>desactivado</span>
				)
			},
			resize: true,
		},
		{ label: 'email', renderCell: (item) => item.email, resize: true },
		{
			label: 'posts',
			renderCell: (item) => (
				<button className='btn btn-light btn-sm text-lowercase'>
					los posts van aquí
				</button>
			),
			resize: true,
		},

		// TODO: Aquí va la acción que cambia el estado del usuario
		{
			label: 'acciones',
			renderCell: (item) => {
				return item.status ? (
					<button type='button' class='btn btn-danger btn-sm text-lowercase'>
						Desactivar
					</button>
				) : (
					<button type='button' class='btn btn-success btn-sm text-lowercase'>
						Activar
					</button>
				)
			},
		},
	]

	return (
		<div
			className='bg-warning text-dark bg-opacity-50'
			style={{ height: '100vh' }}
		>
			<div className='container pt-3 bg-light'>
				<header className='text-center my-4'>
					<h1>Bienenid@ al dashboard de administrador</h1>
				</header>
				<section className='p-4 my-5 text-wrap'>
					<TableData columns={columns} nodes={users} />
				</section>
			</div>
		</div>
	)
}
