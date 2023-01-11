import { useSelector } from 'react-redux';

import Settings from './Settings';
import SettingsUsers from './SettingsUsers';

export default function SettingsPages() {
	const { subpage } = useSelector((state) => state.pages.current);

	switch (subpage) {
		case undefined:
			return <Settings />;

		case 'users':
			return <SettingsUsers />;

		default:
			return null;
	}
}
