import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserDetailAsync } from "../../redux/reducer/postsReducer";
import * as allIcons from "../../shared/assets/icons/all-icons";
import Header from "../Header/Header";
import Card from "../../shared/components/Cards/Card";
import ButtonActions from "../../shared/components/ButtonActions/ButtonActions";
import "./Profile.css";

export default function Profile(props) {
	const user = useSelector((state) => state.posts.userDetail[0]);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserDetailAsync());
	}, [dispatch]);

	let history = useHistory();

	const goTo = () => {
		history.push("/reply/home");
	};

	return (
		<div className="profile-container">
			<div className="goToHome">
				<ButtonActions
					type="submit"
					action={goTo}
					id="all-icons"
					content={<img src={allIcons.arrowUp} alt="icon-home" />}
				/>
			</div>
			<div className="profile-container-dates">
				<div className="profile-container-user">
					<img
						src={user ? user[0].image_profil : props.profileImage}
						alt="user-image"
						className="user-image"
					/>

					<h3>{user && user[0].user_Name}</h3>
				</div>
				<div className="profile-container-balance">
					<div className="profile-container-ff">
						<span>
							Follows: <p>{props.follows}</p>
						</span>
						<span>
							Followers: <p>{props.followers}</p>
						</span>
					</div>
					<div className="profile-container-ff" >
						<img src={allIcons.cash} alt="cash-image" />
						<span>
							Your balance: <p>$ {props.cashValue}</p>
						</span>
					</div>
				</div>
			</div>
			<h1>Your posts</h1>
			<div className="profile-container-posts">
				{user &&
					user[0].contents.map((data) => {
						return (
							<Card
								key={data._id}
								id={data._id}
								userId={data.userId}
								text={data.text}
								img={data.multimedia}
								username={user[0].user_Name}
								userImg={user[0].image_profil}
								categories={data.category}
								comments={data.commentId}
							/>
						);
					})}
			</div>
		</div>
	);
}

Profile.defaultProps = {
	profileImage:
		"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
	username: "User Default",
	follows: "1",
	followers: "100000",
	cashValue: "1000000",
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
