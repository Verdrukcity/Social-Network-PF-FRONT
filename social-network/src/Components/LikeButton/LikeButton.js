import React, { useState, useEffect } from 'react';
import { likeIcon, likeIconFilled } from '../../shared/assets/icons/all-icons'
import './LikeButton.css'
import { useDispatch } from 'react-redux';
import { likePostAsync } from '../../redux/actions/postActions';


const LikeButton = (props) => {

    const [isLike, setIsLiked] = useState(false);
    const [Icon, setIcon] = useState(likeIcon)
    const dispatch = useDispatch()

    const handleLike = (postId, userLoged) => {
        setIsLiked(!isLike);
        dispatch(likePostAsync(postId, userLoged))
    };

    useEffect(() => {
        setIcon(isLike ? likeIconFilled : likeIcon)
        // const Icon = isLike ? likeIconFilled : likeIcon

    })


    return (
        <div className='d-flex  flex-column'>
            <img
                src={likeIconFilled}
                className='icon-size'
                alt='icon de likes'
                onClick={(e) => {
                    handleLike(props.id, props.logedUser)
                }}
            />
            <p className='fw-bold m-0'>{props.likes.length}</p>
        </div>
    );
};

export default LikeButton;