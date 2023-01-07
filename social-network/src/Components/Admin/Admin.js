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
		{ label: 'id', renderCell: (item) => item._id },
		{ label: 'username', renderCell: (item) => item.user_Name },
		{
			label: 'status',
			renderCell: (item) => item.status.toString(),
		},
		{ label: 'email', renderCell: (item) => item.email },
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
				<section className='p-4 my-5'>
					<TableData columns={columns} nodes={users} />
				</section>
			</div>
		</div>
	)
}
