import { useParams } from 'react-router-dom';

import SubLayout from '../../components/SubLayout';
import TableUsers from '../../components/tables/TableUsers';

import { convertToTitle } from '../../utilities';

export default function Users() {
	const { page } = useParams();

	const title = convertToTitle(page);
	const pages = [{ title: `All ${title}`, url: `/admin/${page}` }];

	return (
		<>
			<SubLayout pages={pages} title={title}>
				<TableUsers />
			</SubLayout>
		</>
	);
}
