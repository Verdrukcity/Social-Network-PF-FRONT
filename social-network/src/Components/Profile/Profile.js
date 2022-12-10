import React from "react";
import * as allIcons from "../../shared/assets/icons/all-icons";
import Card from "../../shared/components/Cards/Card";
import './Profile.css'

export default function Profile(props) {
	return (
		<div className="profile-container" >
			<div className="profile-container-dates" >
				<div className="profile-container-user" >
					<img src={props.profileImage} alt="user-image" className="user-image" />
					<p >{props.username}</p>
				</div>
				<div className="profile-container-balance" >
					<div>
						<span>{`Follows: ${props.follows}`}</span>
						<span>{`Followers: ${props.followers}`}</span>
					</div>
					<div>
						<img src={allIcons.cash} alt="cash-image" />
						<p>{props.cashValue}</p>
					</div>
				</div>
			</div>
			<div className="profile-container-posts" >
				{props.userPosts.map((data) => {
					return (
						<Card
							key={data._id}
							id={data._id}
							text={data.text}
							img={data.multimedia}
							username={"UserName"}
							userImg={data.multimedia}
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
