import TableHeaderGroup from './TableHeaderGroup';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import TableFooter from './TableFooter';

export default function Table({ table }) {
	return (
		<div className="shadow bg-white rounded-8 overflow-hidden">
			<table className="w-full">
				<thead className="bg-linkwater-dark px-32 pt-8 h-48 shadow-sm">
					{table.getHeaderGroups().map((headerGroup, idx) => (
						<TableHeaderGroup
							group={headerGroup}
							key={`header-grp-${idx}`}>
							{headerGroup.headers.map((header, idx) => (
								<TableHeader
									header={header}
									key={`header-${idx}`}
								/>
							))}
						</TableHeaderGroup>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row, idx) => (
						<TableRow row={row} key={`row-${idx}`} />
					))}
				</tbody>
			</table>
			<TableFooter table={table} />
		</div>
	);
}
