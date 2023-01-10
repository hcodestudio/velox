import { useParams } from 'react-router-dom';

import Layout from '../components/Layout.js';
import CreateNewUser from './users/CreateNewUser';

export default function Pages() {
	const { page, subpage } = useParams();
	let content = '';

	switch (page) {
		case 'users':
			if (subpage === 'new') {
				content = <CreateNewUser />;
			}

			break;

		default:
			content = null;
	}

	return <Layout>{content}</Layout>;
}
