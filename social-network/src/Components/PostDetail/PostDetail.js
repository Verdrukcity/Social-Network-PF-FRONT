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
    },[])

    //traigo el detail del store
    const details = useSelector(state => state.posts.detail)

    
    //cuando este la info en el reducer, la traigo al componente
    useEffect(()=>{
        
        //este if es cochino, pero si no lo hacia me rompía, perdonchi
        if (Object.keys(details).length){
            
            setPostDetail({
                profile: details.userId[0].user_Name,
                profileImg: details.userId[0].image_profil,
                description: details.post.text,
                postImg: details.post.multimedia,
                categories: details.post.category,
                comments: details.comment
            })
        }
    }, [details])

    return(
        
        <div className="container-fluid"> 

            <div className="row secondCont">
                
                {/* primera columna con foto y cateogries */}
                <div className="col-8">
                    <img className="postImg" src={postDetail.postImg}/>

                    {/* Aqui va a mapear las categories que contenga el post (esto es temporal)*/}
                    <div className="categoriescont">
                         <p className="categorysimbol">#</p>
                          { postDetail.categories.length!==0?postDetail.categories.map(                    
                        (categoria)=> <p className="category">{categoria}</p>
                        ):( <div><p >Sin categorias</p>
                          </div> )

               

          } 
                    </div>
                </div>

                {/* segunda columna con user, texto de post y comentarios */}
                <div className="col userandcomments">
                    <div className="row">
                        <img className="col-2 userimg" src={postDetail.profileImg}></img>
                        <h3 className="col username">{postDetail.profile}</h3>
                    </div>
                    <div className="textpost">
                        <p className="row">{postDetail.description}</p>
                    </div>

                    <h4>Coments</h4>
                    <div className="comentscont">
                        
                        {/* Aqui va a mapear los comentarios (esto es temporal) */}
                        
                        { postDetail.comments.length!==0?postDetail.comments.map(                    
                        (comment)=> { return(
                                <div className="textComent">
                                    <div className="row">
                                        <img className="col-2 userimg" src={comment.user.image_profil}></img>
                                        <p className="col">{comment.user.user_Name}</p>
                                    </div> 
                            
                                    <p className="">{comment.comment.text}</p>
                            
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
                <img className='arrowback' src={arrowUp}/>
            </Link>
        
        </div>
    )
}