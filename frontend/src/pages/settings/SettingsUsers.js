import { Link } from 'react-router-dom';
import { BsFillPeopleFill } from 'react-icons/bs';

export default function SettingsUsers() {
	return (
		<div className="p-30">
			<h2 className="text-18 mb-20">Settings hello</h2>
			<div className="bg-white shadow rounded-md overflow-hidden">
				<div className="py-30 px-24 border-b border-porcelain bg-white">
					<h3 className="text-18 mb-20">System</h3>
					<ul>
						<li className="list-item w-120">
							<Link
								to="/admin/settings/users"
								className="flex flex-col justify-center items-center text-14 text-riverbed">
								<BsFillPeopleFill className="w-40 h-40 mb-2" />
								Users
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
