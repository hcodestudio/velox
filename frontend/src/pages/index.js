import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from '../components/Layout.js';
import DashboardAdmin from './dashboard/admin';
import DashboardUser from './dashboard/user';
import Requests from './requests';
import Users from './users';
import Settings from './settings';

export default function Pages() {
	const currentUser = useSelector((state) => state.users.currentUser);
	const { page } = useParams();

	let content = '';

	switch (page) {
		case 'dashboard':
			if (currentUser.admin) {
				content = <DashboardAdmin />;
			} else {
				content = <DashboardUser />;
			}
			break;

		case 'users':
			content = <Users />;
			break;

		case 'requests':
			content = <Requests />;
			break;

		case 'settings':
			content = <Settings />;
			break;

		default:
			content = null;
	}

	return <Layout>{content}</Layout>;
}
