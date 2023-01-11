import { useSelector } from 'react-redux';

import Users from './Users';
import NewUser from './NewUser';

export default function SettingsPages() {
	const { subpage } = useSelector((state) => state.pages.current);

	switch (subpage) {
		case undefined:
			return <Users />;

		case 'new':
			return <NewUser />;

		default:
			return null;
	}
}
