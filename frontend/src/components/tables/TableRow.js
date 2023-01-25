import { flexRender } from '@tanstack/react-table';

export default function TableRow({ row }) {
	return (
		<tr key={row.id} className="border-b border-porcelain py-3">
			{row.getVisibleCells().map((cell) => {
				return (
					<td key={cell.id} className="px-24 py-8 text-14">
						{flexRender(
							cell.column.columnDef.cell,
							cell.getContext()
						)}
					</td>
				);
			})}
		</tr>
	);
}
