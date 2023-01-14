import { useState, useEffect } from 'react';

import {
	getCoreRowModel,
	getFilteredRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFacetedMinMaxValues,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';

import { fuzzyFilter } from '../utilities';

export default function useAudioControl({ data, columns }) {
	const [columnFilters, setColumnFilters] = useState([]);
	const [globalFilter, setGlobalFilter] = useState('');

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

	const tableDefaults = {
		initialState: { pagination: { pageSize: 10 } },
		onColumnFiltersChange: setColumnFilters,
		onGlobalFilterChange: setGlobalFilter,
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
	};

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
		globalFilterFn: fuzzyFilter,
		...tableDefaults,
	});

	return {
		columnFilters,
		table,
		tableDefaults,
		globalFilter,
		setGlobalFilter,
		setColumnFilters,
		DebouncedInput,
	};
}
