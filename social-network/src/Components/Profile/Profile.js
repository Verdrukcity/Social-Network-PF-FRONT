import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserDetailAsync } from "../../redux/actions/postActions";
import * as allIcons from "../../shared/assets/icons/all-icons";
import Card from "../../shared/components/Cards/Card";
import ButtonActions from "../../shared/components/ButtonActions/ButtonActions";
import DialogUserUpdate from "../../shared/components/dialogs/dialogUserUpdate/DialogUserUpdate";
import profilecss from "./Profile.css";
import Logout from "../Logout/Logout";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
	acountCreator,
	srtipeAccountLink,
	stripeAccountsConsult,
} from "../../redux/actions/pagoActions";

export default function Profile(props) {
	const MySwal = withReactContent(Swal);
	const id = localStorage.getItem("userId");
	const user = useSelector((state) => state.posts.userDetail);
	let token = localStorage.getItem('token')

	const [open, setOpen] = useState(false);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserDetailAsync(id));
	}, [dispatch, id]);

	let history = useHistory();

	const goTo = (e) => {
		history.push("/reply/home");
	};

	const userUpdate = (event) => {
		event.preventDefault();
		setOpen(true);
	};

	if (!token) {
		window.location = "/";
	}

	const pagoStripe = async () => {
		if (user.userStripe) {
			const pagoActivo = await dispatch(
				stripeAccountsConsult(user.userStripe)
			);

			if (pagoActivo.data.capabilities.card_payments === "inactive") {
				MySwal.fire({
					position: "center",
					icon: "question",
					title: "tu ususario no esta habilitado para pagos ! \n quieres habilitar tu cuenta de Stripe ?",
					showConfirmButton: true,
					showCancelButton: true,
				}).then(async (result) => {
					if (result.isConfirmed) {
						const linkStripe = await dispatch(
							srtipeAccountLink(user.userStripe)
						);

						window.open(linkStripe.data.url);
						MySwal.fire(
							"",
							"por favor completa tu inscripcion en la pagina de stripe, para habilitar pagos",
							"success"
						);
					} else if (result.dismiss === Swal.DismissReason.cancel) {
						MySwal.fire(
							"Cancelled",
							"Cuenta no habilitada",
							"error"
						);
						return;
					}
				});
			} else {
				MySwal.fire({
					position: "center",
					icon: "success",
					title: " cuentas con tu usuario de Stripe habilitado para pagos ",
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} else {
			MySwal.fire({
				position: "center",
				icon: "question",
				title: "no tienes ususario de Stripe ! \n quieres crear cuenta de Stripe ?",
				showConfirmButton: true,
				showCancelButton: true,
			}).then(async (result) => {
				if (result.isConfirmed) {
					const perfilStripe = await dispatch(acountCreator(id));
					const linkStripe = await dispatch(
						srtipeAccountLink(perfilStripe.data.id)
					);
					window.open(linkStripe.data.url);
					MySwal.fire(
						"Completado!",
						"tu perfil de Stripe ha sido creado, por favor continua tu inscripcion en la pagina de stripe para habilitar pagos",
						"success"
					);
				} else if (result.dismiss === Swal.DismissReason.cancel) {
					MySwal.fire("Cancelled", "Cuenta no creada", "error");
				}
			});
		}
	};
	return (
		<div className="profile-container row d-flex w-99 m-3 justify-content-center">
			<DialogUserUpdate
				open={open}
				setOpen={setOpen}
				innerContent={["categoriesArr"]}
				userDetail={user}
			/>
			<div className="col-5 d-flex justify-content-start w-50">
				<ButtonActions
					type="submit"
					action={goTo}
					id="all-icons-arrowBack"
					content={
						<img
							src={allIcons.arrowBack}
							className="all-icons-image"
							alt="icon-home"
						/>
					}
				/>
			</div>
			<div className="col-5 d-flex justify-content-end w-50 align-items-center">
				<Logout />
			</div>
			<div className="user-data col-10 row w-100 d-flex justify-content-center">
				<div className="col-10 d-flex justify-content-end">
					<ButtonActions
						className="user-update"
						type="submit"
						action={userUpdate}
						id="all-icons"
						content={
							<img className="user-update-image" src={allIcons.editData} alt="user-update" />
						}
					/>
				</div>
				<div className="row col-5 justify-content-center align-items-center">
					<div className="col-5 image_profil_container">
						<img
							src={user.image_profil || props.image_profil}
							alt="perfil"
							className="user-image"
						/>
					</div>
					<div className="col-5">
						<h3 className="">
							{user.user_Name || props.user_Name}
						</h3>
					</div>
				</div>
				<div className="profile-container-balance col-5 row d-flex align-items-center">
					<div className="col-10 row d-flex w-100 align-items-center">
						<p className="p-data col-5 w-75">Activa donaciones</p>
						<Link className="col-5 w-25" onClick={pagoStripe}>
							<img src={allIcons.cash} alt="cashicon" className="cash-icon" />
						</Link>
					</div>
					<div className="col-10 row d-flex w-100 align-items-center">
						<p className="p-data col-5 w-75">Accede a tu Stripe</p>
						<a
							href="https://dashboard.stripe.com/login"
							target="_blank"
							rel="noreferrer"
							alt="linkStripe"
							className="span-data col-5 w-25"
						>
							<img
								className="stripe-icon"
								src={allIcons.stripe}
								alt="stripe-icon"
							/>
						</a>
					</div>
				</div>
			</div>
			{user.contents?.filter((post) => post.status === true).length >
			0 ? (
				<h1 className="a-go-home row col-10 d-flew justify-content-center align-items-center text-aling-center mb-5">
					Your posts
				</h1>
			) : (
				<div className="row col-10 d-flew justify-content-center align-items-center text-aling-center">
					<h1 className="a-go-home row col-10 d-flew justify-content-center align-items-center text-aling-center">
						Aun no tienes post empieza a compartir{" "}
					</h1>
					<a
						className="a-go-home row col-10 d-flew justify-content-center align-items-center text-aling-center"
						href="/reply/home"
						alt="go-home"
					>
						Ir al Home
					</a>
				</div>
			)}
			<div className="container d-flex flex-column justify-content-center mt-10">
				{user.contents &&
					user.contents.map((data) => {
						if (data._id && data.status) {
							return (
								<Card
									key={data._id}
									id={data._id}
									userId={data.userId._id}
									text={data.text}
									img={data.multimedia}
									username={user.user_Name}
									userImg={user.image_profil}
									categories={data.category}
									comments={data.commentId}
									stripeId={data.userStripe}
									likes={data.likes}
									logedUser={id}
									resourseType={data.resourseType}
								/>
							);
						}
					})}
			</div>
		</div>
	);
}

Profile.defaultProps = {
	image_profil:
		"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
	user_Name: "User Default",
	follow: "1",
	followers: "100000",
	cashValue: "999",

	userPosts: [
		{
			_id: "6393c28d810999a485add515",
			text: "video naruto",
			multimedia:
				"http://res.cloudinary.com/dqtgfhui8/image/upload/v1670627980/red%20social_image/gk6kgotgezfii9jnkcrt.png",
			multimedia_id: "red social_image/gk6kgotgezfii9jnkcrt",
			type: "video",
			commentId: [],
			__v: 0,
		},
		{
			_id: "6393d2ba9e5c2f221dbc759d5",
			text: "tarea",
			multimedia:
				"http://res.cloudinary.com/dqtgfhui8/image/upload/v1670632120/red%20social_image/qdqubmzaouj0efckckhp.png",
			multimedia_id: "red social_image/qdqubmzaouj0efckckhp",
			type: "texto",
			commentId: [],
			__v: 0,
		},
		{
			_id: "6393d3499e5c2f221dbc75a35",
			text: "video",
			multimedia:
				"http://res.cloudinary.com/dqtgfhui8/image/upload/v1670632264/red%20social_image/lj1ex7yrbvgkt4usl1dh.png",
			multimedia_id: "red social_image/lj1ex7yrbvgkt4usl1dh",
			type: "xxxxxxx",
			commentId: [],
			__v: 0,
		},
		{
			_id: "6393e18cd84ad0f60088bb6b5",
			text: "nora",
			multimedia:
				"http://res.cloudinary.com/dqtgfhui8/image/upload/v1670635914/red%20social_image/gykddfeuy3effmfujiji.png",
			multimedia_id: "red social_image/gykddfeuy3effmfujiji",
			type: "xxxxxxx",
			commentId: [],
			__v: 0,
		},
		{
			_id: "6394060cc4d2a5ecb1ed20035",
			text: "asdasdaas",
			multimedia:
				"http://res.cloudinary.com/dqtgfhui8/image/upload/v1670645259/cfpxyangiqypluoxqhyk.png",
			multimedia_id: "cfpxyangiqypluoxqhyk",
			commentId: [],
			__v: 0,
		},
	],
};
