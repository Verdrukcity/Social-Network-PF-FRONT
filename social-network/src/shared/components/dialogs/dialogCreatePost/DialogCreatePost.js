import React, { useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useTheme } from '@mui/material/styles';


import { useDispatch, useSelector } from 'react-redux'
import './DialogCreatePost.css'
import { imgPhotoLoad } from '../../../assets/icons/all-icons';
import { createPost } from '../../../../redux/actions';

export default function DialogCreatePost({open, setOpen,changeImage, ImageSelectedPrevious}) {
 /**
  * hook para el dispatch
  */
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(createPost())
  },[dispatch])

  /**
   * variables para que cuando el dialogo se abra menos de md se ponga en pantalla completa
   */
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    /**
     * funcion para cerrar el dialog
     */
    const handleClose =()=>{
        setOpen(false);

    }

  return (
    <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className='dialog-bg'>
        <DialogContent>
             
        <div className='d-flex'>
          <div className='image-upload-wrap m-2'>
            <input type='file'
                    onChange={(e)=>{changeImage(e)}}
                    accept="image/*"
                    className='file-upload-input'
            />
              <div >
              <img src={imgPhotoLoad} className='text-information-img img-fluid' />
              </div>
            </div>

          <div className='m-2'>
            <div className='d-flex justify-content-start align-items-center'>
              <img src={imgPhotoLoad} className='profile-img' />
              <h3>Name</h3>
            </div>
            <div className=''>
              <input type='text' placeholder='Que piensas?' />
            </div>
          </div>

          </div>
          <div className='d-flex justify-content-center align-items-center'>
          
          </div>




        </DialogContent>
        

      </div>
      </Dialog>
  )
}
