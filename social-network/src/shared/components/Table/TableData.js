import { useState } from 'react'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { CompactTable } from '@table-library/react-table-library/compact'
import { usePagination } from '@table-library/react-table-library/pagination'

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

	const pagination = usePagination(data, {
		state: {
			page: 0,
			size: 10,
		},
		onChange: onPaginationChange,
	})

	function onPaginationChange(action, state) {
		console.log(action, state)
	}

	return (
		<>
			<label htmlFor='search'>
				Búsqueda por usuario:&nbsp;
				<input id='search' type='text' value={search} onChange={handleSearch} />
			</label>
			<br />
			<CompactTable
				columns={columns}
				data={data}
				theme={theme}
				pagination={pagination}
			/>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<span>Usuarios en total: {data.nodes.length}</span>
				<span>
					Filas por pagina:{' '}
					{pagination.state.getPageBoundaries(data.nodes).start}
					{'-'}
					{pagination.state.getPageBoundaries(data.nodes).end}
					{' de '}
					{data.nodes.length}{' '}
					<button
						type='button'
						disabled={pagination.state.page === 0}
						onClick={() => pagination.fns.onSetPage(0)}
					>
						{'|<'}
					</button>
					<button
						type='button'
						disabled={pagination.state.page === 0}
						onClick={() => pagination.fns.onSetPage(pagination.state.page - 1)}
					>
						{'<'}
					</button>
					<button
						type='button'
						disabled={
							pagination.state.page + 1 ===
							pagination.state.getTotalPages(data.nodes)
						}
						onClick={() => pagination.fns.onSetPage(pagination.state.page + 1)}
					>
						{'>'}
					</button>
					<button
						type='button'
						disabled={
							pagination.state.page + 1 ===
							pagination.state.getTotalPages(data.nodes)
						}
						onClick={() =>
							pagination.fns.onSetPage(
								pagination.state.getTotalPages(data.nodes) - 1
							)
						}
					>
						{'>|'}
					</button>
				</span>
			</div>
		</>
	)
}
