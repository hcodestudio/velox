import { BsCircleFill } from 'react-icons/bs';

import { convertToTitle, formatDate } from '../utilities';

export default function PurchaseDetails(props) {
	const {
		total,
		status,
		requestor,
		dateUpdated,
		dateCreated,
		purchaseNumber,
	} = props;

	const statusColor =
		status === 'approved'
			? 'text-junglegreen'
			: status === 'processing'
			? 'text-hotcinnamon'
			: status === 'pending'
			? 'text-white border border-black-70 rounded-full'
			: 'text-crimson2';

	return (
		<div className="shadow bg-linkwater-dark rounded-8 overflow-hidden w-full py-5 mt-50 text-14">
			<div className="flex items-center border-b border-botticelli px-32 py-10">
				<p className="w-3/5 font-semibold">Total </p>
				<div className="flex items-center w-2/5">
					<img
						src="/img/icon-peso.png"
						alt="Total cost"
						className="w-12 mr-5"
					/>
					{total}
				</div>
			</div>
			<div className="flex items-center border-b border-botticelli px-32 py-10">
				<div className="w-3/5 font-semibold">Status</div>
				<div className="w-2/5 flex items-center">
					<BsCircleFill className={`${statusColor} text-10 mr-10`} />
					<span className="text-14">{convertToTitle(status)}</span>
				</div>
			</div>

			<div className="flex items-center px-32 py-10 border-b border-botticelli">
				<div className="w-3/5 font-semibold">Requested by</div>
				<div className="w-2/5">{requestor}</div>
			</div>

			{dateCreated && (
				<div
					className={`flex items-center px-32 py-10 ${
						status === 'approved'
							? 'border-b border-botticelli'
							: ''
					}`}>
					<div className="w-3/5 font-semibold">Date Requested</div>
					<div className="w-2/5">{`${formatDate(
						new Date(dateCreated)
					)}`}</div>
				</div>
			)}

			{status === 'approved' && (
				<>
					<div className="flex items-center px-32 py-10">
						<div className="w-3/5 font-semibold">Date Approved</div>
						<div className="w-2/5">
							{`${formatDate(new Date(dateUpdated))}`}
						</div>
					</div>
					<div className="flex items-center px-32 py-10">
						<div className="w-3/5 font-semibold">P.O. Number</div>
						<div className="w-2/5">{`${purchaseNumber}`}</div>
					</div>
				</>
			)}
		</div>
	);
}
