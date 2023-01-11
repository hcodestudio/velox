import { useParams } from 'react-router-dom';

import Layout from '../components/Layout.js';
import Dashboard from './dashboard';
import Payments from './payments';
import Purchases from './purchases';
import Users from './users';
import Settings from './settings';

export default function Pages() {
	const { page } = useParams();
	let content = '';

	switch (page) {
		case 'dashboard':
			content = <Dashboard />;
			break;

		case 'users':
			content = <Users />;
			break;

		case 'payments':
			content = <Payments />;
			break;

		case 'purchases':
			content = <Purchases />;
			break;

		case 'settings':
			content = <Settings />;
			break;

		default:
			content = null;
	}

	return <Layout>{content}</Layout>;
}
