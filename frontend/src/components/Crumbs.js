import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RxCaretRight } from 'react-icons/rx';

import { convertToTitle } from '../utilities';

export default function Crumbs() {
	const { admin } = useSelector((state) => state.users.currentUser);
	const { page, subpage, edit } = useSelector((state) => state.pages.current);
	const user = admin ? 'admin' : 'user';

	const crumbs = subpage ? (
		<ul className="flex items-center">
			<li>
				<Link
					to={`/${user}/${page}`}
					className="text-13 w-full flex items-center text-shuttlegray">
					{convertToTitle(page)}
					<RxCaretRight />
				</Link>
			</li>
			{subpage && subpage !== 'new' ? (
				<li>
					<Link
						to={`/${user}/${page}/${subpage}${
							edit ? `/${edit}` : ''
						}`}
						className="text-13 w-full flex items-center text-shuttlegray">
						{convertToTitle(subpage)}
						<RxCaretRight />
					</Link>
				</li>
			) : (
				''
			)}
		</ul>
	) : null;

	return crumbs;
}
