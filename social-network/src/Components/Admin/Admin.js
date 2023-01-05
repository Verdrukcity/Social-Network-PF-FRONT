import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserDetailAsync } from "../../redux/actions/postActions";
import * as allIcons from "../../shared/assets/icons/all-icons";
import Card from "../../shared/components/Cards/Card";
import ButtonActions from "../../shared/components/ButtonActions/ButtonActions";
import DialogUserUpdate from "../../shared/components/dialogs/dialogUserUpdate/DialogUserUpdate";
import profilecss from "./Admin.css";
import Logout from "../Logout/Logout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
	acountCreator,
	srtipeAccountLink,
} from "../../redux/actions/pagoActions";

export default function Admin(props) {
	return (
		<div className="admin-container">
			<div className="admin-information">
				<h1 className="admin-welcome">
					Bienenid@ al dashboard del {props.role}
				</h1>
				<div className="admin-data">
					<h4 className="admin-username">
						Username: {props.username}
					</h4>
					<h4 className="admin-role">Role: {props.role}</h4>
				</div>
			</div>
			<div class="table-responsive|table-responsive-sm|table-responsive-md|table-responsive-lg|table-responsive-xl">
				<table class="table table-striped|table-dark|table-bordered|table-borderless|table-hover|table-sm">
					<caption>List of users</caption>
					<thead class="thead-dark|thead-light">
						<tr>
							<th scope="col">#</th>
							<th scope="col">ID</th>
							<th scope="col">Username</th>
							<th scope="col">Estado</th>
							<th scope="col">Publicaciones</th>
							<th scope="col">Desactivar</th>
						</tr>
					</thead>
					<tbody>
						{props.users &&
							props.users.map((user) => {
								return (
									<tr>
										<th scope="row">1</th>
										<td>{user._id}</td>
										<td>{user.username}</td>
										<td>{user.active}</td>
										<td>Publicaciones</td>
										<td>Activo</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			{/*<div className="admin-options">
				<div className="users">
					<h3>Usuarios</h3>
					{props.users &&
						props.users.map((user) => {
							return (
								<div className="user">
									<div className="user-col-one">
										<img
											className="user-userImage"
											src={user.userImage}
											alt="userImage"
										/>
										<div className="user-col-one-two">
											<p className="user-id">
												ID: {user._id}
											</p>
											<p className="user-username">
												Username: {user.username}
											</p>
										</div>
									</div>
									<div className="user-col-two">
										<p className="user-col-two-data">
											Post cuantity: {user.postCuantity}
										</p>
										<p className="user-col-two-data">
											Activo: {user.active}
										</p>
										<p className="user-col-two-data">
											Role: {user.role}
										</p>
										<p className="user-col-two-data">
											Follow: {user.follow}
										</p>
										<p className="user-col-two-data">
											Followers: {user.followers}
										</p>
									</div>
								</div>
							);
						})}
				</div>
				<div className="posts">
					<h3>Publicaciones</h3>
					{props.usersPosts &&
						props.usersPosts.map((post) => {
							return (
								<div className="post">
									<img
										className="post-userImage"
										src={post.userImage}
										alt="userImage"
									/>
									<p className="post-id">ID: {post._id}</p>
									<p className="post-username">
										Username: {post.username}
									</p>
									<p className="post-title">
										Title: {post.title}
									</p>
									<img
										className="post-multimedia"
										src={post.multimedia}
										alt="postImage"
									/>
									<p className="post-description">
										Description: {post.description}
									</p>
									<p className="post-type">
										Tipo: {post.type}
									</p>
									<p className="post-comentCuantity">
										Cantidad de comentarios:{" "}
										{post.commentCuantity}
									</p>
									<p className="post-active">
										Activo: {post.active}
									</p>
								</div>
							);
						})}
				</div>
			</div>*/}
		</div>
	);
}

Admin.defaultProps = {
	username: "User Admin",
	role: "Admin",

	users: [
		{
			_id: "5add5156393c28d810999a48",
			username: "Andres",
			userImage:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			postCuantity: 3,
			active: "true",
			follow: 2,
			followers: 1,
			role: "user",
		},
		{
			_id: "28d810999a485add5156393c",
			username: "Francisco",
			userImage:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			postCuantity: 6,
			active: "true",
			follow: 2,
			followers: 2,
			role: "user",
		},
		{
			_id: "485a6393c28d810999add515",
			username: "Alvaro",
			userImage:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			postCuantity: 1,
			active: "false",
			follow: 1,
			followers: 2,
			role: "user",
		},
	],

	usersPosts: [
		{
			_id: "6393c28d810999a485add515",
			username: "Andres",
			userImage:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			title: "Lisa",
			description: "Fondo de pantralla de Lisa",
			multimedia:
				"https://www.pngfind.com/pngs/m/72-729136_iphone-fondos-de-pantalla-hd-png-download.png",
			multimedia_id: "red social_image/gk6kgotgezfii9jnkcrt",
			type: "texto",
			commentCuantity: 1,
			active: "true",
			__v: 0,
		},
		{
			_id: "6393c28d810999a485add515",
			username: "Andres",
			userImage:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			title: "Spiderman",
			description: "Miles Morales",
			multimedia:
				"https://www.tuexperto.com/wp-content/uploads/2022/01/paginas-descargar-fondos-de-pantalla.jpg",
			multimedia_id: "red social_image/gk6kgotgezfii9jnkcrt",
			type: "texto",
			commentCuantity: 1,
			active: "true",
			__v: 0,
		},
		{
			_id: "93c28d810999a485add51563",
			username: "Andres",
			userImage:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			title: "Paisaje",
			description: "Fondo full HD",
			multimedia: "https://fondosmil.com/fondo/11761.jpg",
			multimedia_id: "red social_image/gk6kgotgezfii9jnkcrt",
			type: "texto",
			commentCuantity: 1,
			active: "true",
			__v: 0,
		},
		{
			_id: "28d810999a485add5156393c",
			username: "Alvaro",
			userImage:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			title: "Olas",
			description: "Buen fondo de pantalla",
			multimedia:
				"https://www.xtrafondos.com/wallpapers/resoluciones/20/ola-de-colores_2560x1440_6815.jpg",
			multimedia_id: "red social_image/gk6kgotgezfii9jnkcrt",
			type: "texto",
			commentCuantity: 1,
			active: "true",
			__v: 0,
		},
		{
			_id: "0999a485add5156393c28d81",
			username: "Francisco",
			userImage:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			title: "Paisaje",
			description: "Paisaje con planetas",
			multimedia: "https://fondosmil.com/fondo/31390.jpg",
			multimedia_id: "red social_image/gk6kgotgezfii9jnkcrt",
			type: "texto",
			commentCuantity: 1,
			active: "true",
			__v: 0,
		},
		{
			_id: "5add5156393c28d810999a48",
			username: "Francisco",
			userImage:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			title: "Planeta",
			description: "Planeta tierra de lejos",
			multimedia:
				"http://www.solofondos.com/wp-content/uploads/2015/12/descargar-fondos-de-pantalla-gratis-4.jpg",
			multimedia_id: "red social_image/gk6kgotgezfii9jnkcrt",
			type: "texto",
			commentCuantity: 1,
			active: "true",
			__v: 0,
		},
		{
			_id: "156393c28d810999a485add5",
			username: "Francisco",
			userImage:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			title: "Montañas",
			description: "En hombre viendo las montañas",
			multimedia:
				"https://blog.orange.es/wp-content/uploads/sites/4/2019/08/Photo.jpg",
			multimedia_id: "red social_image/gk6kgotgezfii9jnkcrt",
			type: "texto",
			commentCuantity: 1,
			active: "true",
			__v: 0,
		},
		{
			_id: "6add51393c28d810999a4855",
			username: "Francisco",
			userImage:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			title: "Bosque",
			description: "Los pinos no tienen hojas",
			multimedia:
				"https://d500.epimg.net/cincodias/imagenes/2019/10/17/lifestyle/1571308099_533301_1571308258_sumario_normal.jpg",
			multimedia_id: "red social_image/gk6kgotgezfii9jnkcrt",
			type: "texto",
			commentCuantity: 1,
			active: "true",
			__v: 0,
		},
		{
			_id: "9a485a6393c28d81099dd515",
			username: "Francisco",
			userImage:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			title: "Cielo",
			description: "En la noche con estrellas",
			multimedia:
				"https://i.pinimg.com/originals/d2/70/63/d270631b6488b420a548bf7e952772ae.jpg",
			multimedia_id: "red social_image/gk6kgotgezfii9jnkcrt",
			type: "texto",
			commentCuantity: 1,
			active: "true",
			__v: 0,
		},
		{
			_id: "8d810999a485add6393c2515",
			username: "Francisco",
			userImage:
				"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
			title: "Minecraft",
			description: "Con RTX",
			multimedia:
				"https://www.movilzona.es/app/uploads-movilzona.es/2022/07/fondos-de-pantalla-movil-minecraft.jpg",
			multimedia_id: "red social_image/gk6kgotgezfii9jnkcrt",
			type: "texto",
			commentCuantity: 1,
			active: "true",
			__v: 0,
		},
	],
};
