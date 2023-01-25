import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiFillDashboard } from 'react-icons/ai';
import { IoIosCopy } from 'react-icons/io';
import { FaCog } from 'react-icons/fa';
import { BsFillPeopleFill } from 'react-icons/bs';
import { HiClipboardDocumentList } from 'react-icons/hi2';
import { MdPayments } from 'react-icons/md';

export default function Sidebar() {
	const { page, subpage } = useParams();
	const { admin } = useSelector((state) => state.users.currentUser);
	const role = admin ? 'admin' : 'user';

	const items = [
		{
			title: 'Dashboard',
			url: `/${role}/dashboard`,
			show: true,
			icon: <AiFillDashboard className="mr-2 w-25 h-16" />,
		},
		{
			title: 'Users',
			url: `/${role}/users`,
			show: admin ? true : false,
			icon: <BsFillPeopleFill className="mr-2 w-25 h-16" />,
		},
		{
			title: 'Requests',
			url: `#`,
			show: true,
			icon: <IoIosCopy className="mr-2 w-25 h-16" />,
			childLinks: [
				{
					title: 'Purchases',
					url: `/${role}/requests/purchases`,
					show: true,
					icon: (
						<HiClipboardDocumentList className="mr-2 w-25 h-16" />
					),
				},
				{
					title: 'Payments',
					url: `/${role}/requests/payments`,
					show: true,
					icon: <MdPayments className="mr-2 w-25 h-16" />,
				},
			],
		},
		{
			title: 'Settings',
			url: `/${role}/settings`,
			show: admin ? true : false,
			icon: <FaCog className="mr-2 w-25 h-16" />,
		},
	];

	const showItems = items.filter((item) => item.show);

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
						{showItems.map((item) => (
							<li key={`sidebar-${item.title}`} className="mb-2">
								<Link
									to={item.url}
									className={`flex items-center text-13 w-full px-14 py-8 rounded-8 hover:bg-ebonyclay ${
										item.url === `/${role}/${page}`
											? 'bg-ebonyclay'
											: ''
									}`}>
									<span>{item.icon}</span>
									<span>{item.title}</span>
								</Link>
								{item.childLinks ? (
									<ul className="mt-2">
										{item.childLinks.map((c) => (
											<li
												key={`sidebar-child-${c.title}`}
												className={`mb-2 rounded-8  ${
													c.url === `/${role}/${page}`
														? 'bg-ebonyclay'
														: ''
												}`}>
												<Link
													to={c.url}
													className={`flex items-center text-13 w-full px-28 py-8 rounded-8 hover:bg-ebonyclay ${
														c.url ===
														`/${role}/${page}/${subpage}`
															? 'bg-ebonyclay'
															: ''
													}`}>
													<span>{c.icon}</span>{' '}
													<span>{c.title}</span>
												</Link>
											</li>
										))}
									</ul>
								) : (
									''
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
