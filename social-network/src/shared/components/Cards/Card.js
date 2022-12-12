import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import "./Card.css"
import { createComment } from '../../../redux/reducer/postsReducer'
import { useDispatch } from 'react-redux'
// the props we are going to use are:
// img, username, imgUser, text
//hacer un efecto para ir a details, cuando paso por sobre la foto que se haga una spmbra o se agrande un poco...

function Card(props) {
    const obj = {
        username: "compañero guerra",
        imgUser: "https://images.cointelegraph.com/images/1434_aHR0cHM6Ly9pbWFnZXMuY29pbnRlbGVncmFwaC5jb20vaW1hZ2VzLzcxN19hSFIwY0hNNkx5OXpNeTVqYjJsdWRHVnNaV2R5WVhCb0xtTnZiUzkxY0d4dllXUnpMekl3TWpFdE1UQXZNRGxpWVRaaU1Ea3ROR00wTmkwMFlqUmtMV0ZsT0RFdFlUWTNOakpoWVdReE56QmhMbXB3Wnc9PS5qcGc=.jpg",
        img: "https://g.foolcdn.com/image/?url=https%3A%2F%2Fg.foolcdn.com%2Feditorial%2Fimages%2F679277%2Fshiba-inu-dogecoin-cryptocurrency-blockchain-network-getty.jpg&op=resize&w=700",
        text: "Hello, world!",

    }
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        text:'',
        profileId: `${props.userId}`
    })
    const history = useHistory()

    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Comentario posteado con éxito')
        dispatch(createComment(input, props.id))
        //console.log('reset input..')
        setInput({
            text:'',
        })
        history.push('/reply/home')

    };

    return (
        <div id='cardContainer' className="m-5" >

            <div className='cardContainerContent'>
                <div>
                    <img className='imgCard' src={props.img || obj.img}
                        alt='postImg'></img>
                    <p className= 'd-flex containerCategories'>
                        # {props.categories?.map((e)=>{
                            return(
                                <p className='me-2'>{e} </p>
                            )
                        })}
                        </p>
                </div>
                <div>
                    <div className='userInfo'>
                        <img className='userImgCard' src={props.userImg || obj.imgUser} alt="userImg"></img>
                        <p>{props.username || obj.username}</p>
                    </div>

                    <div className='containerContentInfo'>
                        <p>{props.text || obj.text}</p>
                    </div>
                    <div>
                    </div>
                </div>
            </div>

            <div className='comments'>
                <input className='inp' value={input.text} name='text' placeholder='Deja tu comentario  aqui' onChange={handleInputChange}></input>
                <button className='commentBtn' onClick={handleSubmit}>Comentar</button>
            </div>
            <a href={`/reply/postdetail/${props.id}`}>Ver todos los comentarios</a>

        </div>
    )
}

export default Card