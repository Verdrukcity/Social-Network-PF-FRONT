import React from "react";
import './PostDetail.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { arrowUp } from "../../shared/assets/icons/all-icons";


export default function PostDetail(){
    return(
        
        <div className="container-fluid"> 

            <div className="row secondCont">
                
                {/* primera columna con foto y cateogries */}
                <div className="col-8">
                    <img className="postImg" src="https://nextluxury.com/wp-content/uploads/halo-tv-series.png"/>

                    {/* Aqui va a mapear las categories que contenga el post (esto es temporal)*/}
                    <div className="categoriescont">
                        <p className="categorysimbol">#</p>
                        <p className="category">category 1</p>
                        <p className="category">category 2</p>
                        <p className="category">category 3</p>
                    </div>
                </div>

                {/* segunda columna con user, texto de post y comentarios */}
                <div className="col userandcomments">
                    <div className="row">
                        <img className="col-2 userimg" src="https://b.rgbimg.com/users/a/al/alfi007/300/sEPfDia.jpg"></img>
                        <h3 className="col username">Perfil</h3>
                    </div>
                    <div className="textpost">
                        <p className="row">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates ab ad in molestias consequatur!
                            Nostrum, sint. Accusamus harum nisi beatae praesentium magnam temporibus atque incidunt eum esse aperiam.
                            Perferendis, praesentium.
                        </p>
                    </div>
                    <div className="row gy-3">
                        {/* Aqui va a mapear los comentarios (esto es temporal) */}
                        <p>coment 1</p>
                        <p>coment 2</p>
                        <p>coment 3</p>
                    </div>
                </div>

            </div>

            {/* imagen con la flecha para ir atras */}
            <img className='arrowback' src={arrowUp}/>
        
        </div>
    )
}