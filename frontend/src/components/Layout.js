import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { updateCurrentPage } from '../store/reducers/pages';
import { setCurrentUser } from '../store/reducers/users';
import withAuth from '../hoc/withAuth';

function Layout({ children }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const params = useParams();

	useEffect(() => {
		const session = localStorage.getItem('velox-usersession');
		if (session) {
			dispatch(setCurrentUser(JSON.parse(session)));
		}
	}, [dispatch]);

	useEffect(() => {
		dispatch(updateCurrentPage(params));
	}, [dispatch, params]);

	return history.pathname !== '/' ? (
		<div className="bg-linkwater flex min-h-screen">
			<div className="flex w-full">
				<Sidebar />
				<div className="w-full">
					<TopNav />
					{children}
				</div>
			</div>
		</div>
	) : (
		children
	);
}

export default withAuth(Layout);
