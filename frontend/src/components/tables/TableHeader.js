import { RxCaretDown, RxCaretUp } from 'react-icons/rx';
import { flexRender } from '@tanstack/react-table';

export default function TableHeader({ header }) {
	return (
		<th
			className="px-24 py-8 text-14"
			key={header.id}
			colSpan={header.colSpan}>
			{header.isPlaceholder ? null : (
				<>
					<div
						{...{
							className: header.column.getCanSort()
								? 'cursor-pointer select-none flex items-center'
								: '',
							onClick: header.column.getToggleSortingHandler(),
						}}>
						{flexRender(
							header.column.columnDef.header,
							header.getContext()
						)}
						{{
							asc: (
								<span className="pl-5">
									<RxCaretUp />
								</span>
							),
							desc: (
								<span className="pl-5">
									<RxCaretDown />
								</span>
							),
						}[header.column.getIsSorted()] ?? null}
					</div>
				</>
			)}
		</th>
	);
}
