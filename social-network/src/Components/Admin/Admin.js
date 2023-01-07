import React, { useEffect } from 'react'
import TableData from '../../shared/components/Table/TableData'
import { useDispatch, useSelector } from 'react-redux'
import { allUsersVerifySelector } from '../../redux/reducer/adminReducer'

import { getAllUsersVerifyAsync } from '../../redux/actions/adminActions'

export default function Admin(props) {
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
		<div className='container'>
			<div className='admin-information'>
				<h1 className='admin-welcome'>
					Bienenid@ al dashboard del {props.role}
				</h1>
				<div className='admin-data'>
					<h4 className='admin-username'>Username: {props.username}</h4>
					<h4 className='admin-role'>Role: {props.role}</h4>
				</div>
			</div>
			<TableData columns={columns} nodes={users} />
		</div>
	)
}
