import React from "react";
import css from './PostDetail.css'

import { arrowUp } from "../../shared/assets/icons/all-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import {getPostDetailAsync, likePostAsync} from '../../redux/actions/postActions'
import {likeIcon} from '../../shared/assets/icons/all-icons'
import {DialogLikesList} from '../../shared/components/dialogs/dialogLikesList/DialogLikesList'


export default function PostDetail(props){
    const [postDetail, setPostDetail] = useState({
        profile: '',
        profileImg: '',
        description: '',
        postImg: '',
        categories: [],
        comments: []
    })

    const [open, setOpen] = useState(false)

    const dispatch = useDispatch() 

    //obtenemos el id por params para buscar el detail correpondiente
    const id = props.match.params.id;

    //dispatch para obtener el detalle
    useEffect(()=>{
        dispatch(getPostDetailAsync(id))
    },[dispatch,id])

    //traigo el detail del store
    const details = useSelector(state => state.posts.detail)

    
    //cuando este la info en el reducer, la traigo al componente
    useEffect(()=>{
        if (Object.keys(details).length){
            setPostDetail({
                profile: details.userId.user_Name,
                profileImg: details.userId.image_profil,
                description: details.post.text,
                postImg: details.post.multimedia,
                categories: details.post.category,
                comments: details.comments,
                isVideo: details.post.multimedia_id.includes("videos"),
                likes: details.post.likes
            })
        }
    }, [details])

    const handleLike = (postId, userLoged) => {
		dispatch(likePostAsync(postId, userLoged))
	}

    const seeLikes = (e)=>{
        e.preventDefault();
        setOpen(true)
    }

    return(
        
        <div className="bg-podt-detail p-2"> 
            <DialogLikesList open={open} setOpen={setOpen} innerContent={postDetail.likes}/>

            <div className="container mt-4 ">
                <div className="row">
                {/* primera columna con foto y cateogries */}
                <div className="col-8 ">
                    {!postDetail.isVideo ? <img className='imgCard' src={postDetail.postImg} alt='postImg'></img>:
                    <video className='imgCard' src={postDetail.postImg} alt= "video" controls width="320" height="240"/> }

                    {/* Aqui va a mapear las categories que contenga el post*/}
                    <div className=" mt-2 w-100 d-flex">
                         <p className="categorysimbol">#</p>
                         <div className="d-flex justify-content-start align-items-center w-100">
                            { postDetail.categories?postDetail.categories.map(                    
                                (categoria)=> <p className="category p-2 ms-2 me-2">{categoria}</p>
                                ):( <div><p >Sin categorias</p></div> )
                            } 
                         </div>
                    </div>
                </div>

                {/* segunda columna con user, texto de post y comentarios userandcomments */}
                <div className="col-4">
                    <div className="row">
                        <img className="col-4 userimg" alt="imagen perfil" src={postDetail.profileImg}></img>
                        <h3 className="col-8 username d-flex justify-content-center align-items-start">{postDetail.profile}</h3>
                    </div>
                    <div className="textpost mt-2">
                        <p className="">{postDetail.description}</p>
                    </div>
                    
                    <div className="textpost mt-2 mb-4">
                        <img
                            src={likeIcon}
                            className='icon-size'
                            alt='icon de likes'
                            onClick={(e) => {
                                handleLike(props.id, props.logedUser)
                            }}
                        />
                        <h4 className="username verlikes mt-2 mb-2" onClick={e => seeLikes(e)}>Ver likes</h4>
                    </div>
                    
                    <h4 className="username mt-2 mb-2">Comentarios</h4>
                    
                    <div className="comentscont">
                        {/* Aqui va a mapear los comentarios (esto es temporal) */}
                        { postDetail.comments.length?postDetail.comments.map(                    
                        (comment)=> { return(
                                <div className="comentcont">
                                    <div className="d-flex p-2 justify-content-start align-items-center">
                                        <img className="comentimg" alt="profile" src={comment.profileId.image_profil}></img>
                                        <h5 className="username ms-2 fs-6">{comment.profileId.user_Name}</h5>
                                    </div> 
                                    <div className="textcomment fs-6">
                                        <p className="textcomment fs-6">{comment.text}</p>
                                    </div>
                                </div> 
                                )                    
                        }
                        ):( <p className={css} >Sin comentarios</p>
                        )  } 
                    </div>
                </div>
                </div>
            </div>
            {/* imagen con la flecha para ir atras */}
            <Link to={`/reply/home`}>
                <img className='arrowback' alt="imagen flecha" src={arrowUp}/>
            </Link>
        
        </div>
    )
}