import Box from '@mui/material/Box'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import * as React from 'react'
import './DialogCategories.css'

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
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: '1px solid',
    p: 1,
    bgcolor: 'background.paper',
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative' }}>
        <li type='button' onClick={handleClick}>
          {buttonContent}
        </li>
        {open ? (
          <Box className='box-style' sx={styles}>
            Click me, I will stay visible until you click outside.
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  )
}
