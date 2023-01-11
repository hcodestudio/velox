import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import SubLayout from '../../components/SubLayout';
import TableUsers from '../../containers/tables/TableUsers';
import { getUsers } from '../../store/actions/users';
import { convertToTitle } from '../../utilities';

export default function Users() {
	const { page } = useParams();
	const dispatch = useDispatch();

	const allUsers = useSelector((state) => state.users.users);

	console.log({ allUsers });
	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const title = convertToTitle(page);
	const pages = [{ title: `All ${title}`, url: `/admin/${page}` }];

	return (
		<>
			<SubLayout pages={pages} title={title}>
				<TableUsers data={allUsers} />
			</SubLayout>
		</>
	);
}
