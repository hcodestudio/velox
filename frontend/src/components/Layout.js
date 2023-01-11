import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { updateCurrentPage } from '../store/reducers/pages';

export default function Layout({ children }) {
	const { pathname } = useHistory();
	const params = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateCurrentPage(params));
	}, [dispatch, params]);

	return pathname !== '/' ? (
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
