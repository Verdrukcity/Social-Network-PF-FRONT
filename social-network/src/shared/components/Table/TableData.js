import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { useState } from 'react'

// componente tabla que recibe columns y nodes (filas) ejemplo en Admin.js
export default function TableData({ columns, nodes }) {
	let data = { nodes }

	const theme = useTheme(getTheme())

	const [search, setSearch] = useState('')

	//! filtro para buscar por user_Name
	data = {
		nodes: data.nodes.filter((item) =>
			item.user_Name.toLowerCase().includes(search.toLowerCase())
		),
	}

	const handleSearch = (event) => {
		setSearch(event.target.value)
	}

	return (
		<>
			<label htmlFor='search'>
				Search by Username:&nbsp;
				<input id='search' type='text' value={search} onChange={handleSearch} />
			</label>
			<br />
			<CompactTable columns={columns} data={data} theme={theme} />
		</>
	)
}
