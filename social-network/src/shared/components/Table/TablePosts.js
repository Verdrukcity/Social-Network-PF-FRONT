import { useTheme } from '@table-library/react-table-library/theme'
import { getTheme } from '@table-library/react-table-library/baseline'
import { CompactTable } from '@table-library/react-table-library/compact'

// componente tabla que recibe columns y nodes (filas) ejemplo en Admin.js
export default function TablePosts({ columns, nodes }) {
	let data = { nodes }

	const theme = useTheme(getTheme())

	return <CompactTable columns={columns} data={data} theme={theme} />
}
