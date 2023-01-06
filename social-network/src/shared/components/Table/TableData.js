import { CompactTable } from '@table-library/react-table-library/compact'
import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { useState } from 'react'

const nodes = [
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'hola',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'hola',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'hola',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
	{
		id: '0',
		name: 'Shopping List',
		deadline: new Date(2020, 1, 15),
		type: 'TASK',
		isComplete: true,
		nodes: 3,
	},
]

const COLUMNS = [
	{ label: 'Task', renderCell: (item) => item.name },
	{
		label: 'Deadline',
		renderCell: (item) =>
			item.deadline.toLocaleDateString('en-US', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
			}),
	},
	{ label: 'Type', renderCell: (item) => item.type },
	{
		label: 'Complete',
		renderCell: (item) => item.isComplete.toString(),
	},
	{ label: 'Tasks', renderCell: (item) => item.nodes },
]

export default function TableData() {
	let data = { nodes }

	const theme = useTheme(getTheme())

	const [search, setSearch] = useState('')

	data = {
		nodes: data.nodes.filter((item) =>
			item.name.toLowerCase().includes(search.toLowerCase())
		),
	}

	const handleSearch = (event) => {
		setSearch(event.target.value)
	}

	return (
		<>
			<label htmlFor='search'>
				Search by Task:&nbsp;
				<input id='search' type='text' value={search} onChange={handleSearch} />
			</label>
			<br />
			<CompactTable columns={COLUMNS} data={data} theme={theme} />
		</>
	)
}
