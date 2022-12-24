import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import { useTheme } from "@mui/material/styles";

import { useDispatch } from "react-redux";
import "./DialogUserUpdate.css";

//import { imgPhotoLoad } from "../../../assets/icons/all-icons";
import { DialogActions, Input } from "@mui/material";
import { getUserDetailAsync } from "../../../../redux/actions/postActions";
import { updateUserAsync } from "../../../../redux/actions/usersActions";
import ButtonActions from "../../ButtonActions/ButtonActions";
import bcrypt from "bcryptjs";
import Loader from "../../loader/loader";

import Swal from "sweetalert2";

import withReactContent from "sweetalert2-react-content";

export default function DialogUserUpdate({
	open,
	setOpen,
	innerContent,
	userDetail,
}) {
	/**
	 * hook para el dispatch
	 */
	const dispatch = useDispatch();

	/**array de strings provisional para las categorias */

	const categories = innerContent;

	const [file, fileSet] = React.useState();
	const theme = useTheme();
	const [userName, setUserName] = React.useState(userDetail.user_Name);
	const [userPassword, setUserPassword] = React.useState(userDetail.password);

	const [loader, setLoader] = useState(false);
	const id = localStorage.getItem("userId");
	const token = localStorage.getItem("token");
	useEffect(() => {
		dispatch(getUserDetailAsync(id));
	}, [dispatch]);

	const [ImageSelectedPrevious, setImageSelectedPrevious] =
		React.useState(null);

	const changeImage = (event) => {
		if (event.target.files[0] !== undefined) {
			let fileToUse = event.target.files[0];
			const reader = new FileReader();

			fileSet(fileToUse);

			reader.readAsDataURL(event.target.files[0]);

			reader.onload = (event) => {
				event.preventDefault();
				setImageSelectedPrevious(event.target.result); // le damos el binario de la imagen para mostrarla en pantalla
			};
		}
	};

	/**funciones para manejar los cambios  */
	/**funcion que maneja el estado de las categorias */
	const changeUserName = (event) => {
		event.preventDefault();
		let value = event.target.value;
		setUserName(value);
	};
	/* funcion que controla el text */
	const changeUserPassword = (event) => {
		event.preventDefault();
		let value = event.target.value;
		setUserPassword(value);
	};
	/*funcion que envia la data */
	const handleSubmit = async (e) => {
		e.preventDefault();
		let formData = new FormData();
		let hashedPassword = bcrypt.hashSync(userPassword, 10);
		formData.append(
			"user_Name",
			userName ? userName : userDetail.user_Name
		);
		formData.append(
			"password",
			userPassword ? hashedPassword : userDetail.password
		);
		if (!file) {
			formData.append("image_profil", userDetail.image_profil);
		} else {
			formData.append("imageProfile", file);
			if (userDetail.image_publi_id) {
				formData.append("image_publi_id", userDetail.image_publi_id);
			}
		}

		const MySwal = withReactContent(Swal);
		setOpen(false);
		MySwal.fire({
			position: "top-end",
			title: "Estas seguro?",
			text: "Puedes reactualizar tus datos si lo deseas!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, Actualizar!",
			target: true,
		}).then(async (result) => {
			if (result.isConfirmed) {
				//setOpen(true);
				setLoader(true);
				await dispatch(updateUserAsync(formData, id, token));
				setLoader(false);
				Swal.fire(
					"Actualizado!",
					"Tus datos han sido actualizados",
					"success"
				);
			}
			//window.location.reload();
		});
	};

	/**
	 * variables para que cuando el dialogo se abra menos de md se ponga en pantalla completa
	 */

	/**
	 * funcion para cerrar el dialog
	 */
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="responsive-dialog-title"
		>
			<div className="dialog-bg overflow-hidden">
				{loader && <Loader />}

				<DialogContent>
					<h2 className="text-center color-whie-reply">
						Actualiza tus datos!
					</h2>
					<div className="d-flex w-100 h-100 row">
						<div className="row col image-upload-wrap m-2 d-flex justify-content-center">
							<input
								type="file"
								name="multimedia"
								onChange={(e) => {
									changeImage(e);
								}}
								accept="image/* video/*"
								className="file-upload-input-user"
							/>

							<div className="d-flex justify-content-center">
								{ImageSelectedPrevious && (
									<img
										src={ImageSelectedPrevious}
										className="text-information-img img-fluid rounded-circle w-50 "
										alt="imagen para seleccionar"
									/>
								)}
								{!ImageSelectedPrevious && (
									<img
										src={userDetail.image_profil}
										className="text-information-img img-fluid rounded-circle w-50"
										alt="imagen seleccionada"
									/>
								)}
							</div>
						</div>
						<div className="col m-2 w-100 row row-cols-2 row-cols-lg-1 g-2 g-lg-3">
							<div
								key={userDetail.name}
								className="w-100 d-flex justify-content-start align-items-center "
							>
								<Input
									id="my-input"
									aria-describedby="my-helper-text"
									placeholder={
										userName
											? userName
											: userDetail.user_Name
									}
									onChange={changeUserName}
								/>
							</div>
							<div
								key={"changeUserPassword"}
								className="w-100 d-flex justify-content-start align-items-center "
							>
								<Input
									id="my-input"
									aria-describedby="my-helper-text"
									placeholder={"Contraseña"}
									onChange={changeUserPassword}
								/>
							</div>
						</div>
					</div>
					<p className="text-center">La imagen debe ser cuadrada</p>
					<DialogActions className="d-flex justify-content-center">
						<div className="">
							<ButtonActions
								action={handleSubmit}
								id={"buttonAction"}
								content={"Actualizar!"}
							/>
						</div>
					</DialogActions>
				</DialogContent>
			</div>
		</Dialog>
	);
}
