import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function SubSidebar({ pages }) {
	const { location } = useHistory();

	return (
		<ul>
			{pages.map((page, idx) => (
				<li
					key={`subsidebar-${idx}`}
					className={`flex mb-2 px-24 py-8 rounded-8 ${
						page.url === location.pathname ? 'bg-white shadow' : ''
					}`}>
					<Link to={page.url} className="text-13 w-full">
						{page.title}
					</Link>
				</li>
			))}
		</ul>
	);
}
