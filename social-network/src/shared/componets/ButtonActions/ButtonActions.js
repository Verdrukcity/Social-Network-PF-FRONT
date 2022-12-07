import React from 'react'

export default function ButtonActions({type, action, id, content}) {

	const handleClick = (event) => {
		event.preventDefault();
		action()
	}

	return (
		<div>
			<button type={type} onClick={handleClick} id={id} >{content}</button>
		</div>
	)
}