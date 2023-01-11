import { useEffect, useState, useReducer, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import {
	RxCaretDown,
	RxCaretUp,
	RxCaretRight,
	RxCaretLeft,
} from 'react-icons/rx';

import {
	Column,
	Table,
	useReactTable,
	ColumnFiltersState,
	getCoreRowModel,
	getFilteredRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFacetedMinMaxValues,
	getPaginationRowModel,
	sortingFns,
	getSortedRowModel,
	FilterFn,
	SortingFn,
	ColumnDef,
	flexRender,
	FilterFns,
} from '@tanstack/react-table';

import {
	RankingInfo,
	rankItem,
	compareItems,
} from '@tanstack/match-sorter-utils';

import { formatDate } from '../../utilities';
import { makeData, Person } from './makeData';

const fuzzyFilter = (row, columnId, value, addMeta) => {
	// Rank the item
	const itemRank = rankItem(row.getValue(columnId), value);

	// Store the itemRank info
	addMeta({
		itemRank,
	});

	// Return if the item should be filtered in/out
	return itemRank.passed;
};

const fuzzySort = (rowA, rowB, columnId) => {
	let dir = 0;

	// Only sort by rank if the column has ranking information
	if (rowA.columnFiltersMeta[columnId]) {
		dir = compareItems(
			rowA.columnFiltersMeta[columnId]
				? rowA.columnFiltersMeta[columnId].itemRank
				: null,
			rowB.columnFiltersMeta[columnId]
				? rowB.columnFiltersMeta[columnId].itemRank
				: null
		);
	}

	// Provide an alphanumeric fallback for when the item ranks are equal
	return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

// import TableRow from '../../components/tables/TableRow';
// import useTableUserColumns from '../../hooks/useTableUserColumns';
// import { fuzzyFilter } from '../../utilities';

function Filter({ column, table }) {
	const firstValue = table
		.getPreFilteredRowModel()
		.flatRows[0]?.getValue(column.id);

	const columnFilterValue = column.getFilterValue();

	const sortedUniqueValues = useMemo(
		() =>
			typeof firstValue === 'number'
				? []
				: Array.from(column.getFacetedUniqueValues().keys()).sort(),
		[column.getFacetedUniqueValues()]
	);

	return typeof firstValue === 'number' ? (
		<div>
			<div className="flex space-x-2">
				<DebouncedInput
					type="number"
					min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
					max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
					value={columnFilterValue?.[0] ?? ''}
					onChange={(value) =>
						column.setFilterValue((old) => [value, old?.[1]])
					}
					placeholder={`Min ${
						column.getFacetedMinMaxValues()?.[0]
							? `(${column.getFacetedMinMaxValues()?.[0]})`
							: ''
					}`}
					className="w-24 border shadow rounded"
				/>
				<DebouncedInput
					type="number"
					min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
					max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
					value={columnFilterValue?.[1] ?? ''}
					onChange={(value) =>
						column.setFilterValue((old) => [old?.[0], value])
					}
					placeholder={`Max ${
						column.getFacetedMinMaxValues()?.[1]
							? `(${column.getFacetedMinMaxValues()?.[1]})`
							: ''
					}`}
					className="w-24 border shadow rounded"
				/>
			</div>
			<div className="h-1" />
		</div>
	) : (
		<>
			<datalist id={column.id + 'list'}>
				{sortedUniqueValues.slice(0, 5000).map((value: any) => (
					<option value={value} key={value} />
				))}
			</datalist>
			<DebouncedInput
				type="text"
				value={columnFilterValue ?? ''}
				onChange={(value) => column.setFilterValue(value)}
				placeholder={`Search... (${
					column.getFacetedUniqueValues().size
				})`}
				className="w-36 border shadow rounded"
				list={column.id + 'list'}
			/>
			<div className="h-1" />
		</>
	);
}

// A debounced input react component
function DebouncedInput({
	value: initialValue,
	onChange,
	debounce = 500,
	...props
}) {
	const [value, setValue] = useState(initialValue);

	useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			onChange(value);
		}, debounce);

		return () => clearTimeout(timeout);
	}, [debounce, onChange, value]);

	return (
		<input
			{...props}
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
}

const TableUsers = ({ data }) => {
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState('');

	const columns = useMemo(
		() => [
			{
				accessorFn: (row) => `${row.firstName} ${row.lastName}`,
				id: 'fullName',
				header: 'Full Name',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
				filterFn: 'fuzzy',
				sortingFn: fuzzySort,
			},
			{
				accessorFn: (row) => `${row.jobTitle}`,
				id: 'jobTitle',
				header: 'Job Title',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
				filterFn: 'fuzzy',
				sortingFn: fuzzySort,
			},
			{
				accessorFn: (row) => `${formatDate(new Date(row.dateCreated))}`,
				id: 'dateCreated',
				header: 'Date Created',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
				filterFn: 'fuzzy',
				sortingFn: fuzzySort,
			},
		],
		[]
	);

	const table = useReactTable({
		data,
		columns,
		filterFns: {
			fuzzy: fuzzyFilter,
		},
		state: {
			columnFilters,
			globalFilter,
		},
		initialState: { pagination: { pageSize: 50 } },
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
		globalFilterFn: fuzzyFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		getFacetedMinMaxValues: getFacetedMinMaxValues(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: false,
	});

	useEffect(() => {
		const firstItem = table.getState().columnFilters[0];

		console.log({ firstItem });
	});

	// useEffect(() => {
	// 	const firstItem = table.getState().columnFilters[0];

	// 	if (table.getState().columnFilters[0]?.id === 'fullName') {
	// 		if (table.getState().sorting[0]?.id !== 'fullName') {
	// 			table.setSorting([{ id: 'fullName', desc: false }]);
	// 		}
	// 	}
	// 	console.log(table.getState().columnFilters);
	// }, [table.getState().columnFilters[0].id]);

	const rowLength = table.getPrePaginationRowModel().rows.length;
	const pageIndex = table.getState().pagination.pageIndex + 1;
	const pageSize = table.getState().pagination.pageSize;

	return (
		<div className="w-full ml-20">
			<div className="flex items-center mb-20">
				<div className="w-full">
					<DebouncedInput
						value={globalFilter ?? ''}
						onChange={(value) => setGlobalFilter(String(value))}
						className="px-24 py-9 font-lg shadow w-full h-35 rounded-md"
						placeholder="Search"
					/>
				</div>
				<Link
					to={'/admin/users/new'}
					className="flex items-center ml-auto bg-crimson text-white rounded-md text-14 px-14 py-7 w-120 ml-10">
					<AiOutlinePlus className="text-secondary group-hover:hidden mr-5" />
					New user
				</Link>
			</div>
			<div className="p-2">
				<div className="h-2" />
				<div className="shadow bg-white rounded-8 overflow-hidden">
					<table className="w-full">
						<thead className="bg-linkwater-dark px-32 pt-8 h-48 shadow-sm">
							{table.getHeaderGroups().map((headerGroup) => (
								<tr key={headerGroup.id} className="text-left">
									{headerGroup.headers.map((header) => {
										return (
											<th
												className="px-24 py-8 text-14"
												key={header.id}
												colSpan={header.colSpan}>
												{header.isPlaceholder ? null : (
													<>
														<div
															{...{
																className:
																	header.column.getCanSort()
																		? 'cursor-pointer select-none flex items-center'
																		: '',
																onClick:
																	header.column.getToggleSortingHandler(),
															}}>
															{flexRender(
																header.column
																	.columnDef
																	.header,
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
															}[
																header.column.getIsSorted()
															] ?? null}
														</div>
													</>
												)}
											</th>
										);
									})}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map((row) => {
								return (
									<tr
										key={row.id}
										className="border-b border-porcelain py-3">
										{row.getVisibleCells().map((cell) => {
											return (
												<td
													key={cell.id}
													className="px-24 py-8 text-14">
													{flexRender(
														cell.column.columnDef
															.cell,
														cell.getContext()
													)}
												</td>
											);
										})}
									</tr>
								);
							})}
						</tbody>
					</table>
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
				</div>
			</div>
		</div>
	);
};

export default TableUsers;
