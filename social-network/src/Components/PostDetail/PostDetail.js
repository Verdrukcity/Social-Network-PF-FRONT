import React from "react";
import './PostDetail.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { arrowUp } from "../../shared/assets/icons/all-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from "react";
import {getPostDetailAsync} from '../../redux/reducer/postsReducer'


export default function PostDetail(props){
    const [postDetail, setPostDetail] = useState({
        profile: '',
        profileImg: '',
        description: '',
        postImg: '',
        categories: [],
        comments: []
    })
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
            console.log(details)
            setPostDetail({
                profile: details.userId.user_Name,
                profileImg: details.userId.image_profil,
                description: details.post.text,
                postImg: details.post.multimedia,
                categories: details.post.category,
                comments: details.comments
            })
        }
    }, [details])

    return(
        
        <div className="container-fluid bg-podt-detail"> 

            <div className="row secondCont">
                
                {/* primera columna con foto y cateogries */}
                <div className="col-8">
                    <img className="postImg" alt="imagen-detail" src={postDetail.postImg}/>

                    {/* Aqui va a mapear las categories que contenga el post (esto es temporal)*/}
                    <div className="categoriescont">
                         <p className="categorysimbol">#</p>
                          { postDetail.categories?postDetail.categories.map(                    
                        (categoria)=> <p className="category">{categoria}</p>
                        ):( <div><p >Sin categorias</p>
                          </div> )

               

          } 
                    </div>
                </div>

                {/* segunda columna con user, texto de post y comentarios */}
                <div className="col userandcomments">
                    <div className="row">
                        <img className="col-2 userimg" alt="imagen perfil" src={postDetail.profileImg}></img>
                        <h3 className="col username">{postDetail.profile}</h3>
                    </div>
                    <div className="textpost">
                        <p className="row">{postDetail.description}</p>
                    </div>

                    <h4>Coments</h4>
                    <div className="comentscont">
                        
                        {/* Aqui va a mapear los comentarios (esto es temporal) */}
                        
                        { postDetail.comments.length?postDetail.comments.map(                    
                        (comment)=> { return(
                                <div className="comentcont">
                                    <div className="row">
                                        <img className="col-2 comentimg" src={comment.profileId.image_profil}></img>
                                        <h5 className="col username">{comment.profileId.user_Name}</h5>
                                    </div> 
                                    <div className="textcomment">
                                        <p className="">{comment.text}</p>
                                    </div>
                                </div> 
                                )                    
                        }
                        ):( <p >Sin comentarios</p>
                        )  } 
                    
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