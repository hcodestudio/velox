import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RxCaretRight } from 'react-icons/rx';

import { convertToTitle } from '../utilities';

export default function Crumbs() {
	const { page, subpage } = useSelector((state) => state.pages.current);

	const crumbs = subpage ? (
		<ul>
			<li>
				<Link
					to={`/admin/${page}`}
					className="text-13 w-full flex items-center text-shuttlegray">
					{convertToTitle(page)}
					<RxCaretRight />
				</Link>
			</li>
		</ul>
	) : null;

	return crumbs;
}
