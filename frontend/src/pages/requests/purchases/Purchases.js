import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Container from '../../../containers/Container';
import TablePurchases from '../../../containers/tables/TablePurchases';
import { convertToTitle } from '../../../utilities';
import { getPurchases } from '../../../store/actions/requests';

export default function Purchases() {
	const dispatch = useDispatch();
	const { admin, id } = useSelector((state) => state.users.currentUser);
	const { page, subpage } = useParams();
	const user = admin ? 'admin' : 'user';

	const title = convertToTitle(subpage);
	const pages = [
		{ title: `All ${title}`, url: `/${user}/${page}/${subpage}` },
	];

	const allPurchases = useSelector((state) => state.requests.purchases);

	useEffect(() => {
		dispatch(getPurchases({ admin, id }));
	}, [admin, dispatch, id]);

	return (
		<>
			<Container pages={pages} title={title}>
				<TablePurchases data={allPurchases} />
			</Container>
		</>
	);
}
