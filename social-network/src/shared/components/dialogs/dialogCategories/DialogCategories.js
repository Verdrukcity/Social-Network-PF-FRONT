import { useState } from 'react'
import Box from '@mui/material/Box'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import * as React from 'react'
import dialogcss from './DialogCategories.css'
import { activeRoundedButton, categoryBox } from '../../../assets/globals'

/*
  Este Dialog permite mostrar en un cuadro aparte las categorías
  que el usuario puede encontrar en la página para filtrar las
  publicaciones en su feed
*/

export default function ClickAway({
	buttonContent,
	innerContent,
	filterByCategory,
	activeCategories,
}) {
	const activeCategoriesArr = [...activeCategories]

	const [open, setOpen] = useState(false)
	const [activeCategory, setActiveCategory] = useState(false)

	const handleClick = () => {
		setActiveCategory(!activeCategory)
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
						open || activeCategories.size > 0
							? activeRoundedButton
							: { border: 'none', backgroundColor: '#ff8d00' }
					}
				>
					{buttonContent}
				</button>
				{open ? (
					<Box sx={categoryBox}>
						<p className='categories-title'>Categorías destacadas</p>
						<section className='d-flex flex-wrap'>
							{innerContent?.map((inner) => (
								<button
									id={inner}
									className='button-inner'
									onClick={filterByCategory}
								>
									{inner}
								</button>
							))}
						</section>
						<section className='d-flex flex-wrap'>
							{activeCategoriesArr?.map((category) => (
								<span className='badge text-bg-light mx-2 mt-4'>
									{category}
								</span>
							))}
						</section>
						<div className={dialogcss}></div>
					</Box>
				) : null}
			</Box>
		</ClickAwayListener>
	)
}
