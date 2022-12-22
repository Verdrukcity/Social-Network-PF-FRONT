import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getAllCategoriesAsync } from '../../redux/actions/categoriesActions'
import * as allIcons from '../../shared/assets/icons/all-icons'
import ButtonActions from '../../shared/components/ButtonActions/ButtonActions'
import DialogCategories from '../../shared/components/dialogs/dialogCategories/DialogCategories.js'
import { activeRoundedButton } from '../../shared/assets/globals'
import './Header.css'

/**
 * Header  con botones funcionales, aun falta agregar algunos pero así va:
 * ° Ya funciona el mapeo y trae los datos del back
 * Estamos usando un botón global que está en shared/components (ButtonActions)
 * ° Tenemos el add post que ejecuta el agregar posts..
 * ° Tenemos el botón de home que te regresa al home, este solo hace un push al history
 * ° El botón de trend debería llevar/traer a los posts con más likes o similar...
 * ° El botón de explore debería llevar/traer a los nuevos posts o usuarios...
 * ° El botón de profile debería llevar a un nuevo componente que muestra el perfil del usuario..
 */

export default function Header({
	filterByCategory,
	innerContent,
	orderByLikes,
	activeCategories,
}) {
	const dispatch = useDispatch()

	let history = useHistory()

	useEffect(() => {
		dispatch(getAllCategoriesAsync())
	}, [dispatch])

	const [activeTrend, setActiveTrend] = useState(false)

	const goTo = (event) => {
		switch (event.target.alt) {
			case 'icon-trend':
				// history.push("/reply/trend");
				// Debería traer los trends o enviar donde estén
				orderByLikes()
				setActiveTrend(!activeTrend)
				break
			case 'icon-explore':
				// history.push("/reply/explore");
				// Debería traer los nuevos(users o posts) o enviar donde estén
				break
			case 'icon-profile':
				history.push('/reply/profile')
				break
			default:
				//Falta tener en cuenta el id del user...
				history.push('/reply/home')
				break
		}
	}

	return (
		<div id='header-component'>
			<ul id='icons-container'>
				<li id='icon-home'>
					<ButtonActions
						type='submit'
						action={goTo}
						id='all-icons'
						content={<img src={allIcons.home} alt='icon-home' />}
					/>
				</li>
				<li id='icon-trend'>
					<ButtonActions
						type='submit'
						action={goTo}
						id='all-icons'
						styling={activeTrend ? activeRoundedButton : {}}
						content={<img src={allIcons.trend} alt='icon-trend' />}
					/>
				</li>
				<li id='icon-explore'>
					<ButtonActions
						type='submit'
						action={goTo}
						id='all-icons'
						content={<img src={allIcons.explore} alt='icon-explore' />}
					/>
				</li>
				<li id='icon-categories'>
					<DialogCategories
						filterByCategory={filterByCategory}
						id='icon-categories'
						buttonContent={
							<img src={allIcons.categories} alt='icon-categories' />
						}
						innerContent={innerContent}
						activeCategories={activeCategories}
					/>
				</li>

				<li id='icon-profile'>
					<ButtonActions
						type='submit'
						action={goTo}
						id='all-icons'
						content={<img src={allIcons.profile} alt='icon-profile' />}
					/>
				</li>
			</ul>
		</div>
	)
}
