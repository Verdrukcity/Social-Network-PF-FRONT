import React, { useEffect } from "react";
import TableData from "../../shared/components/Table/TableData";
import { useDispatch, useSelector } from "react-redux";
import { allUsersVerifySelector } from "../../redux/reducer/adminReducer";
import {
	getAllPostsAsync,
	getUserDetailAsync,
} from "../../redux/actions/postActions";
import {
	getAllUsersVerifyAsync,
	updateUserStatus,
	updatePostStatus,
} from "../../redux/actions/adminActions";
import { allPostsSelector,} from '../../redux/reducer/postsReducer'
import Switch from "@mui/material/Switch";

export default function Admin() {
	const allUsers = useSelector(allUsersVerifySelector);
	const users = allUsers.filter((user) => user.role !== "admin");
	const allPost = useSelector(allPostsSelector);
	const token = localStorage.getItem("token");

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllUsersVerifyAsync(token));
		dispatch(getAllPostsAsync(token));
	}, [dispatch, token]);

	const userStatusUpdate = (event, id) => {
		event.preventDefault();
		dispatch(updateUserStatus(id, token));
	};
	const postStatusUpdate = (event, id) => {
		event.preventDefault();
		dispatch(updatePostStatus(id, token));
	};

	// Columnas requeridas en la tabla @table-library
	const columns = [
		{ label: "id", renderCell: (item) => item._id, resize: true },
		{
			label: "username",
			renderCell: (item) => item.user_Name,
			resize: true,
		},
		{ label: "email", renderCell: (item) => item.email, resize: true },
		{
			label: "posts",
			renderCell: (item) => (
				/*<button className="btn btn-light btn-sm text-lowercase">
					los posts van aquí
				</button>*/
				<Switch
					checked={item.status}
					onChange={(event) =>
						postStatusUpdate(event, "63bc2660987c4d54d439e15d")
					}
					color="warning"
				/>
			),
			resize: true,
		},
		{
			label: "status",
			renderCell: (item) => {
				return item.status ? (
					<span className="badge text-bg-success">activo</span>
				) : (
					<span className="badge text-bg-danger">desactivado</span>
				);
			},
			resize: true,
		},

		// TODO: Aquí va la acción que cambia el estado del usuario
		{
			label: "acciones",
			renderCell: (item) => (
				<Switch
					checked={item.status}
					onChange={(event) => userStatusUpdate(event, item._id)}
					color="warning"
				/>
			),
		},
	];

	return (
		<div
			className="bg-warning text-dark bg-opacity-50"
			style={{ height: "100vh" }}
		>
			<div className="container pt-3 bg-light">
				<header className="text-center my-4">
					<h1>Bienenid@ al dashboard de administrador</h1>
				</header>
				<section className="p-4 my-5 text-wrap">
					<TableData columns={columns} nodes={users} />
				</section>
			</div>
		</div>
	);
}
