import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import Table from '../../components/tables/Table';
import useTable from '../../hooks/useTable';
import { formatDate, fuzzySort, convertToTitle } from '../../utilities';

const TablePurchases = ({ data }) => {
	const { page, subpage } = useParams();
	const { admin } = useSelector((state) => state.users.currentUser);
	const user = admin ? 'admin' : 'user';

	const columns = useMemo(
		() => [
			{
				accessorFn: (row) => (
					<Link
						to={`/${user}/${page}/${subpage}/edit/${row.id}`}
						className="text-blue-600 hover:underline">{`${row.purpose}`}</Link>
				),
				id: 'purpose',
				header: 'Purpose',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
				filterFn: 'fuzzy',
				sortingFn: fuzzySort,
			},
			{
				accessorFn: (row) => `${row.terms}`,
				id: 'terms',
				header: 'Terms',
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
				filterFn: 'fuzzy',
				sortingFn: fuzzySort,
			},
			{
				accessorFn: (row) =>
					row.admin ? `${row.firstName} ${row.lastName}` : null,
				id: 'requestorId',
				header: (row) => (row.admin ? 'Requested By' : null),
				cell: (info) => info.getValue(),
				footer: (props) => props.column.id,
				filterFn: 'fuzzy',
				enableHiding: true,
				sortingFn: fuzzySort,
			},
			{
				accessorFn: (row) => `${convertToTitle(row.status)}`,
				id: 'status',
				header: 'Status',
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
					to={`/${user}/${page}/${subpage}/new`}
					className="flex items-center ml-auto bg-crimson text-white rounded-md text-14 px-14 py-7 w-150 ml-10">
					<AiOutlinePlus className="text-secondary group-hover:hidden mr-5" />
					New Purchase
				</Link>
			</div>
			<div className="p-2">
				<div className="h-2" />
				<Table table={table} />
			</div>
		</div>
	);
};

export default TablePurchases;
