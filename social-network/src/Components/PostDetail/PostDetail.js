import React from "react";
import './PostDetail.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { arrowUp } from "../../shared/assets/icons/all-icons";
import { Link } from "react-router-dom";


export default function PostDetail(props){

    const id = props.match.params.id;
    //dispatch de post

    const perfil="UserName Prueba"
    const descripcion="   Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ab ad in molestias consequatur"
                        +" Nostrum, sint. Accusamus harum nisi beatae praesentium magnam temporibus atque incidunt eum esse aperiam." 
                        +   " Perferendis, praesentium.";
    const imagenPost="https://nextluxury.com/wp-content/uploads/halo-tv-series.png"
    const categorias=["category 1","category 2","category 3","category 3"]    
    const comentarios=[{usuario:"alberto123", imagen:"https://b.rgbimg.com/users/a/al/alfi007/300/sEPfDia.jpg", textoComentario:"magnifico"},
                        {usuario:"Gonzalo96", imagen:"https://b.rgbimg.com/users/a/al/alfi007/300/sEPfDia.jpg", textoComentario:"perdi mi tiepo con este post "},
                        {usuario:"Iclacreyo", imagen:"https://b.rgbimg.com/users/a/al/alfi007/300/sEPfDia.jpg", textoComentario:"gracias por la informacion"},
                    {usuario:"Iclacreyo", imagen:"https://b.rgbimg.com/users/a/al/alfi007/300/sEPfDia.jpg", textoComentario:"gracias por la informacion"},
                {usuario:"Iclacreyo", imagen:"https://b.rgbimg.com/users/a/al/alfi007/300/sEPfDia.jpg", textoComentario:"gracias por la informacion"},]

    return(
        
        <div className="container-fluid"> 

            <div className="row secondCont">
                
                {/* primera columna con foto y cateogries */}
                <div className="col-8">
                    <img className="postImg" src={imagenPost}/>

                    {/* Aqui va a mapear las categories que contenga el post (esto es temporal)*/}
                    <div className="categoriescont">
                         <p className="categorysimbol">#</p>
                          { categorias.length!==0?categorias.map(                    
                        (categoria)=> <p className="category">{categoria}</p>
                        ):( <div><p >Sin categorias</p>
                          </div> )

               

          } 
                    </div>
                </div>

                {/* segunda columna con user, texto de post y comentarios */}
                <div className="col userandcomments">
                    <div className="row">
                        <img className="col-2 userimg" src="https://b.rgbimg.com/users/a/al/alfi007/300/sEPfDia.jpg"></img>
                        <h3 className="col username">{perfil} {id}</h3>
                    </div>
                    <div className="textpost">
                        <p className="row">{descripcion}
                          
                        </p>
                    </div>

                    
                    <div className="listaComentarios">
                        {/* Aqui va a mapear los comentarios (esto es temporal) */}

                        { comentarios.length!==0?comentarios.map(                    
                        (comentario)=> { return(
                              <div className="textComent">
                                <div className="row">
                                    <img className="col-2 userimg" src={comentario.imagen}></img>
                                    <p className="">{comentario.usuario}</p>
                                </div> 
                            
                                <p className="">{comentario.textoComentario}</p>
                            
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