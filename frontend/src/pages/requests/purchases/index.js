import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Container from '../../../containers/Container';
import TablePurchases from '../../../containers/tables/TablePurchases';
import { convertToTitle } from '../../../utilities';
import { getPurchases } from '../../../store/actions/requests';

export default function Purchases() {
	const dispatch = useDispatch();
	const { permissions, admin, id } = useSelector(
		(state) => state.users.currentUser
	);
	const { page, subpage } = useParams();
	const user = admin ? 'admin' : 'user';
	const canApprovePRs = permissions
		? permissions.find((p) => p.name === 'approvePRs')
			? true
			: false
		: false;

	const title = convertToTitle(subpage);
	const pages = [
		{ title: `All ${title}`, url: `/${user}/${page}/${subpage}` },
	];

	const allPurchases = useSelector((state) => state.requests.purchases);

	useEffect(() => {
		if (admin || canApprovePRs) {
			dispatch(getPurchases({ admin }));
		} else {
			dispatch(getPurchases({ admin, id }));
		}
	}, [admin, canApprovePRs, dispatch, id, permissions]);

	return (
		<>
			<Container pages={pages} title={title}>
				<TablePurchases data={allPurchases} />
			</Container>
		</>
	);
}
