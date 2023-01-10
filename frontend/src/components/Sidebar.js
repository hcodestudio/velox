import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Sidebar() {
	const { page } = useParams();

	const items = [
		{ title: 'Dashboard', url: `/admin/dashboard` },
		{ title: 'Users', url: `/admin/users` },
		{ title: 'Purchases', url: `/admin/purchases` },
		{ title: 'Payments', url: `/admin/payments` },
	];

	console.log({ page });

	return (
		<div className="w-300 bg-oxfordblue h-full text-white">
			<div className="w-full justify-center">
				<div className="flex items-center bg-mineshaft-dark py-10 px-15">
					<a href="/">
						<span className="text-18 font-semibold text-white">
							VELOX
						</span>
						<span className="text-18 uppercase font-light text-white-70">
							ENERGY
						</span>
					</a>
				</div>
				<div className="py-10 px-15 mt-30">
					<ul>
						{items.map((item) => (
							<li
								key={`sidebar-${item.title}`}
								className={`flex mb-2 px-14 py-8 rounded-8 ${
									item.url === `/admin/${page}`
										? 'bg-ebonyclay'
										: ''
								}`}>
								<Link to={item.url} className="text-13 w-full">
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
