import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

import Table from '../../components/Table';
import useTable from '../../hooks/useTable';
import { formatDate, fuzzySort } from '../../utilities';

const TableUsers = ({ data }) => {
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

	const { DebouncedInput, setGlobalFilter, globalFilter, table } = useTable({
		data,
		columns,
	});

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
				<Table table={table} />
			</div>
		</div>
	);
};

export default TableUsers;
