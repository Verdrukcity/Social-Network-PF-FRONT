import React from 'react'
import "./Card.css"
function Card(props) {
   const obj = {
        username:"compañero guerra",
        imgUser:"https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9pbWFnZXMuY29pbnRlbGVncmFwaC5jb20vaW1hZ2VzLzcxN19hSFIwY0hNNkx5OXpNeTVqYjJsdWRHVnNaV2R5WVhCb0xtTnZiUzkxY0d4dllXUnpMekl3TWpFdE1UQXZNRGxpWVRaaU1Ea3ROR00wTmkwMFlqUmtMV0ZsT0RFdFlUWTNOakpoWVdReE56QmhMbXB3Wnc9PS5qcGc=.jpg",
        img:"https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F679277%2Fshiba-inu-dogecoin-cryptocurrency-blockchain-network-getty.jpg&op=resize&w=700",
        text:"Hello, world!",
        comments:[],
    }
  return (
    <div id='cardContainer' className="m-5" >

        <div className='cardContainerContent'>
            <div>
                <img className='imgCard' src={props.img || obj.img}
                 alt='imagen perrito'></img>
            </div>
            <div>
                <div className='userInfo'>
                    <img className='userImgCard' src={props.userImg || obj.imgUser} alt= "perrito2"></img>
                    <p>{props.username || obj.username}</p>
                </div>    

                <div className='containerContentInfo'>
                    <p>{obj.text}</p>
                </div>
            </div>
        </div>

        <div className='coments'>
            <input className='inp' placeholder='Deja tu comentario  aqui'></input>
        </div>

   </div>     
  )
}

export default Card