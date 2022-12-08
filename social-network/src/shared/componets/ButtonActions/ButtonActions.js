import React from 'react'

export default function ButtonActions({type, action, id, content}) {

	return (
		<div>
			<button type={type} onClick={()=>action()} id={id} >{content}</button>
		</div>
	)
}