import React from 'react'

export default function ButtonActions({ type, action, id, content, styling }) {
	const handleClick = (event) => {
		event.preventDefault()
		action(event)
	}

	return (
		<>
			<button type={type} onClick={handleClick} id={id} style={styling}>
				{content}
			</button>
		</>
	)
}
