import Box from '@mui/material/Box'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import * as React from 'react'
import './DialogCategories.css'

/*
  Este Dialog permite mostrar en un cuadro aparte las categorías
  que el usuario puede encontrar en la página para filtrar las
  publicaciones en su feed
*/

export default function ClickAway({ buttonContent }) {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen((prev) => !prev)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  const styles = {
    position: 'absolute',
    top: 40,
    right: 0,
    left: '-30vw',
    zIndex: 1,
    border: 'none',
    borderRadius: '25px',
    p: 1,
    width: '50vw',
    height: '40vh',
    bgcolor: '#D9D9D9',
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }}>
        <li type='button' onClick={handleClick}>
          {buttonContent}
        </li>
        {open ? (
          <Box className='box-style' sx={styles}>
            Aquí van a aparecer todas las categorías para ser filtradas
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  )
}
