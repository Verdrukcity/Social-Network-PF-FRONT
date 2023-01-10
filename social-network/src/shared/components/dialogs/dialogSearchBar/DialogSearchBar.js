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

export default function ClickAway({
	findByText,
	buttonContent,
	deleteFindText,
	handleSearchBarChange,
}) {
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
						open || findByText
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
							className='navbar-input-search my-2'
							type='text'
							placeholder='Nombre de usuario'
							onChange={handleSearchBarChange}
						/>
						<br />
						{findByText && (
							<>
								<em className='mx-2'>{findByText}</em>
								<button
									type='button'
									className='btn btn-outline-danger btn-sm'
									onClick={deleteFindText}
								>
									x
								</button>
							</>
						)}
					</Box>
				) : null}
			</Box>
		</ClickAwayListener>
	)
}
