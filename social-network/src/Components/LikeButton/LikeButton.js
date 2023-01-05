import React, { useState, useEffect } from 'react';
import { likeIcon, likeIconFilled } from '../../shared/assets/icons/all-icons'
import './LikeButton.css'
import { useDispatch } from 'react-redux';
import { likePostAsync } from '../../redux/actions/postActions';


const LikeButton = (props, postId, userLoged) => {

    const [isLike, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(props.likes.length)
    const [Icon, setIcon] = useState(likeIcon)
    const dispatch = useDispatch()

    function throttle(cb, delay) {
        let inThrottle;
        return (...args) => {
            if (inThrottle) return;
            inThrottle = true;
            cb(...args);
            setTimeout(() => {
                inThrottle = false;
            }, delay);
        };
    }

    const handleLike = (postId, userLoged) => {
        // setIsLiked(!isLike)
        dispatch(likePostAsync(postId, userLoged))
    }

    const throttleHandleLike = throttle(handleLike, 1200)

    useEffect(() => {
        setIcon(isLike ? likeIconFilled : likeIcon)
        setLikes(props.likes.length)
    })


    return (
        <div>

            <div className='d-flex  flex-column'>
                <img
                    src={Icon}
                    className='icon-size'
                    alt='icon de likes'
                    onClick={() => { throttleHandleLike(props.id, props.logedUser) }}
                />
                <p className='fw-bold m-0'>{likes}</p>
            </div>
        </div>
    )
};

export default LikeButton;