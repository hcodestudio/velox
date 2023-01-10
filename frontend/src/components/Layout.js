import { useHistory } from 'react-router-dom';

import Sidebar from './Sidebar';
import TopNav from './TopNav';

export default function Layout({ children }) {
	const { location } = useHistory();

	return location.pathname !== '/' ? (
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
