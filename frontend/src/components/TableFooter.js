import { RxCaretRight, RxCaretLeft } from 'react-icons/rx';

export default function TableFooter({ table }) {
	const rowLength = table.getPrePaginationRowModel().rows.length;
	const pageIndex = table.getState().pagination.pageIndex + 1;
	const pageSize = table.getState().pagination.pageSize;

	return (
		<div className="bg-linkwater-dark flex items-center gap-2 px-24 py-10">
			<button
				className="border border-linkwater-light rounded p-1 mr-2"
				onClick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}>
				<RxCaretLeft />
			</button>
			<button
				className="border rounded p-1"
				onClick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}>
				<RxCaretRight />
			</button>
			<span className="flex items-center gap-1 pl-10">
				{`1-${
					pageSize < rowLength
						? pageSize * pageIndex > rowLength
							? rowLength
							: pageSize * pageIndex
						: rowLength
				} of ${rowLength} users`}
			</span>
		</div>
	);
}
