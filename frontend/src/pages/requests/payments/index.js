import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Container from '../../../containers/Container';
import TablePayments from '../../../containers/tables/TablePayments';
import { convertToTitle } from '../../../utilities';
import { getPayments } from '../../../store/actions/requests';

export default function Payments() {
	const dispatch = useDispatch();
	const { permissions, admin, id } = useSelector(
		(state) => state.users.currentUser
	);
	const { page, subpage } = useParams();
	const user = admin ? 'admin' : 'user';
	const canApproveRFPs = permissions
		? permissions.find((p) => p.name === 'approveRFPs')
			? true
			: false
		: false;

	const title = convertToTitle(subpage);
	const pages = [
		{ title: `All ${title}`, url: `/${user}/${page}/${subpage}` },
	];

	const allPayments = useSelector((state) => state.requests.payments);

	useEffect(() => {
		if (admin || canApproveRFPs) {
			dispatch(getPayments({ admin }));
		} else {
			dispatch(getPayments({ admin, id }));
		}
	}, [admin, canApproveRFPs, dispatch, id, permissions]);

	return (
		<>
			<Container pages={pages} title={title}>
				<TablePayments data={allPayments} />
			</Container>
		</>
	);
}
