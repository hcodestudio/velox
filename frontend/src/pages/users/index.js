import { useSelector } from 'react-redux';

import Users from './Users';
import UserNew from './UserNew';

export default function SettingsPages() {
	const { subpage } = useSelector((state) => state.pages.current);

	switch (subpage) {
		case undefined:
			return <Users />;

		case 'new':
			return <UserNew />;

		default:
			return null;
	}
}
