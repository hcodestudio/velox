import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function SubLayout({ children, title, pages }) {
	const { location } = useHistory();

	return (
		<div className="flex min-h-screen p-30">
			<div className="flex w-full">
				<div className="w-300 h-full">
					<div className="w-full justify-center">
						<h1 className="py-8 px-24 font-bold text-18">
							{title}
						</h1>
						<div className="py-10 mt-10">
							<ul>
								{pages.map((page, idx) => (
									<li
										key={`subsidebar-${idx}`}
										className={`flex mb-2 px-24 py-8 rounded-8 ${
											page.url === location.pathname
												? 'bg-white shadow'
												: ''
										}`}>
										<Link
											to={page.url}
											className="text-13 w-full">
											{page.title}
										</Link>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
				{children}
			</div>
		</div>
	);
}
