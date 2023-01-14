import { Link } from 'react-router-dom';
import { HiPlus, HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import { MdOutlinePayments } from 'react-icons/md';

export default function AdminDashboard() {
	return (
		<div className="p-30">
			<h2 className="text-18 mb-20">Dashboard</h2>
			<div className="bg-white shadow rounded-md overflow-hidden">
				<div className="py-30 px-24 border-b border-porcelain bg-white">
					<h3 className="text-18 mb-20">Request</h3>
					<ul className="flex items-center">
						<li className="list-item w-200">
							<Link
								to="/admin/requests/purchases/new"
								className="flex flex-col justify-center items-center text-14 text-riverbed">
								<HiOutlineClipboardDocumentList className="w-50 h-50 mb-5" />
								<span className="flex items-center justify-center text-riverbed">
									<HiPlus className="mr-3" /> New Purchase
									Request
								</span>
							</Link>
						</li>
						<li className="list-item w-200">
							<Link
								to="/admin/requests/payments/new"
								className="flex flex-col justify-center items-center text-14 text-riverbed">
								<MdOutlinePayments className="w-50 h-50 mb-5" />
								<span className="flex items-center justify-center text-riverbed">
									<HiPlus className="mr-3" /> New Payment
									Request
								</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
