import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';

import { currentDateTime } from '../utilities';
import { approvePurchaseRequest } from '../store/actions/requests';

export default function PurchaseApprovalDetails(props) {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.users.currentUser);
	const { id } = useSelector((state) => state.pages.current);

	const { status, approvals, notice, setNotice, isEditable } = props;
	const { admin, permissions, userGroups } = currentUser;
	const userGroup = userGroups && userGroups.length ? userGroups[0] : null;
	const role = userGroup ? userGroup.name : null;

	const [nextApprover, setNextApprover] = useState(null);

	console.log({ props });
	const canApprovePRs = permissions
		? permissions.find((p) => p.name === 'approvePRs')
			? true
			: false
		: false;

	const approvers = useMemo(
		() => [
			{ handle: 'recommendingApproval', name: 'Recommending Approval' },
			{ handle: 'finalApproval', name: 'Final Approval' },
			{ handle: 'accountingAssociate', name: 'Accounting Associate' },
			{ handle: 'accountingSupervisor', name: 'Accounting Supervisor' },
			{ handle: 'disbursementAssociate', name: 'Disbursement Associate' },
			{
				handle: 'cashManagementSupervisor',
				name: 'Cash Management Supervisor',
			},
			{ handle: 'manager', name: 'Manager' },
		],
		[]
	);

	useEffect(() => {
		if (
			status !== 'approved' &&
			nextApprover &&
			nextApprover.handle !== userGroup.handle
		) {
			setNotice(
				<p className="inline">
					{`This request still needs to be reviewed and approved by the`}
					<span className="font-medium text-hotcinnamon">
						{` ${nextApprover.name}`}
					</span>
					{`.`}
				</p>
			);
		} else {
			setNotice(null);
		}
	}, [nextApprover, setNotice, status, userGroup.handle]);

	useEffect(() => {
		if (approvals && approvals.length && userGroup.handle !== 'requestor') {
			const lastApprover = approvals[approvals.length - 1];

			const lastApproverIdx = approvers.findIndex(
				(approver) => approver.handle === lastApprover.groupHandle
			);

			console.log({ lastApproverIdx });

			if (Number(lastApproverIdx) + 1 < approvers.length) {
				setNextApprover(approvers[Number(lastApproverIdx) + 1]);
			} else {
				setNextApprover(approvers[approvers.length - 1]);
			}
		}

		if (!approvals.length) {
			setNextApprover(approvers[0]);
		}
	}, [approvals, approvers, userGroup.handle]);

	function handleRequest(status) {
		const stat =
			status !== 'rejected'
				? userGroup.handle !== 'manager'
					? 'processing'
					: 'approved'
				: status;

		const data = {
			id,
			status: stat,
			dateCreated: currentDateTime(),
			approver: currentUser.id,
			approverRole: userGroup.handle,
		};

		const res = dispatch(approvePurchaseRequest(id, data));

		toast.promise(res, {
			loading: `Updating purchase request...`,
			success: () => {
				setTimeout(() => {
					window.location.reload(false);
				}, 1500);
				return <p>{`Successfully updated purchase request.`}</p>;
			},
			error: <b>{`Could not update purchase request.`}</b>,
		});
	}

	const editable =
		status !== 'approved' &&
		nextApprover &&
		nextApprover.handle === userGroup.handle
			? true
			: isEditable;

	return (
		<div className="px-32 py-10 mt-20">
			{editable && (admin || canApprovePRs) ? (
				<>
					<div className="mb-15 flex items-center">
						<span className="font-semibold ">Actions</span>
						<span className="ml-6 font-light text-14 ">{`(as ${role})`}</span>
					</div>
					<div className="flex items-start">
						<button
							type="button"
							className="w-full text-13 px-6 py-8 bg-blue-600 text-white font-medium leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center justify-center mb-5 mr-6"
							onClick={() => handleRequest('approved')}>
							<AiFillLike className="mb-3 mr-5" />
							<span>Approve</span>
						</button>
						<button
							type="button"
							className="w-full text-13 px-6 py-8 bg-crimson text-white font-medium leading-snug rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center justify-center ml-6"
							onClick={() => handleRequest('rejected')}>
							<AiFillDislike className="mb-3 mr-5" />
							<span>Reject</span>
						</button>
					</div>
				</>
			) : (
				''
			)}

			{notice ? (
				<div className="">
					<BsFillInfoCircleFill className="inline mr-5 pb-3" />
					{notice}
				</div>
			) : (
				''
			)}
		</div>
	);
}
