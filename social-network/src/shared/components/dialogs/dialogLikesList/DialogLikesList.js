import React from "react";
import Dialog from '@mui/material/Dialog'
import './DialogLikesList.css'

export function DialogLikesList({open, setOpen, innerContent}){

    const handleClose = ()=>{
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
            <div className="dialog-bg">
                <h2 className="likesTitle">Dieron like:</h2>
                {innerContent && innerContent.map(like => <div className="userLike">
                    <img src={like.image_profil} alt={like.user_Name} className='userImg'/>
                    <h4 className="userName">{like.user_Name}</h4>
                </div>)}
            </div>
        </Dialog>
    )
}