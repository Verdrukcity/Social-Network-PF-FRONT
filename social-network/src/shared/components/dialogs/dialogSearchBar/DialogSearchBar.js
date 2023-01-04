import * as React from 'react'
import './DialogSearchBar.css'
import { useState } from 'react'
import Box from '@mui/material/Box'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import { activeRoundedButton, searchBox } from '../../../assets/globals'

/*
  Este Dialog permite mostrar en un cuadro aparte las categorías
  que el usuario puede encontrar en la página para filtrar las
  publicaciones en su feed
*/

export default function ClickAway({ buttonContent, handleSearchBarChange }) {
	const [open, setOpen] = useState(false)

	const handleClick = () => {
		setOpen((prev) => !prev)
	}

	const handleClickAway = () => {
		setOpen(false)
	}

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Box sx={{ position: 'relative' }}>
				<button
					type='button'
					onClick={handleClick}
					style={
						open
							? activeRoundedButton
							: { border: 'none', backgroundColor: '#ff8d00' }
					}
				>
					{buttonContent}
				</button>
				{open ? (
					<Box sx={searchBox}>
						<p className='categories-title'>Busca un usuario</p>
						<input
							className='navbar-input-search'
							type='text'
							placeholder='Nombre de usuario'
							onChange={handleSearchBarChange}
						/>
					</Box>
				) : null}
			</Box>
		</ClickAwayListener>
	)
}
