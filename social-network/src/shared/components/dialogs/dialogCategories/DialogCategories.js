import Box from '@mui/material/Box'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import * as React from 'react'
import './DialogCategories.css'
import { activeRoundedButton } from '../../../assets/globals'

/*
  Este Dialog permite mostrar en un cuadro aparte las categorías
  que el usuario puede encontrar en la página para filtrar las
  publicaciones en su feed
*/

export default function ClickAway({
	buttonContent,
	innerContent,
	filterByCategory,
}) {
	const [open, setOpen] = React.useState(false)
	const [activeCategory, setActiveCategory] = React.useState(false)

	const handleClick = () => {
		setActiveCategory(!activeCategory)
		setOpen((prev) => !prev)
	}

	const handleClickAway = () => {
		setOpen(false)
	}

	const styles = {
		position: 'absolute',
		top: 50,
		right: -270,
		zIndex: 1,
		border: 'none',
		borderRadius: '25px',
		p: 1,
		padding: '15px 70px',
		width: '50vw',
		height: 'auto',
		textAlign: 'left',
		bgcolor: '#D9D9D9',
		boxShadow:
			'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
	}

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<Box sx={{ position: 'relative' }}>
				<button
					type='button'
					onClick={handleClick}
					style={
						activeCategory
							? activeRoundedButton
							: { border: 'none', backgroundColor: '#ff8d00' }
					}
				>
					{buttonContent}
				</button>
				{open ? (
					<Box sx={styles}>
						<h3 className='categories-title'>Categorías destacadas</h3>
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
					</Box>
				) : null}
			</Box>
		</ClickAwayListener>
	)
}
