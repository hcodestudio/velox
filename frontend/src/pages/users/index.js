import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserGroups } from '../../store/actions/users';

import Users from './Users';
import UserEdit from './UserEdit';
import UserNew from './UserNew';

export default function UserPages() {
	const dispatch = useDispatch();
	const { subpage } = useSelector((state) => state.pages.current);

	console.log({ subpage });
	useEffect(() => {
		dispatch(getUserGroups());
	}, [dispatch]);

	switch (subpage) {
		case undefined:
			return <Users />;

		case 'new':
			return <UserNew />;

		case 'edit':
			return <UserEdit />;
		default:
			return null;
	}
}
