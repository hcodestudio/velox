import { useState, useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { HiPlus, HiTrash } from 'react-icons/hi2';
import { AiFillWarning } from 'react-icons/ai';
import {
	RiNumber1,
	RiNumber2,
	RiNumber3,
	RiNumber4,
	RiNumber5,
	RiNumber6,
	RiNumber7,
} from 'react-icons/ri';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import InputError from '../InputError';
import PaymentDetails from '../PaymentDetails';
import PaymentApprovalDetails from '../PaymentApprovalDetails';
import { Tab, Tabs, TabContent, TabPanel } from '../tabs';
import { currentDateTime, formatDate } from '../../utilities';
import {
	createPaymentRequest,
	updatePayment,
} from '../../store/actions/requests';

export function FormEditPayment({ payment }) {
	const dispatch = useDispatch();
	const now = currentDateTime();
	const [totalCost, setTotalCost] = useState(payment.totalAmount);
	const [defaultValues, setDefaultValues] = useState(payment);
	const [notice, setNotice] = useState(null);

	const history = useHistory();
	const currentUser = useSelector((state) => state.users.currentUser);
	const { page, subpage, id, edit } = useSelector(
		(state) => state.pages.current
	);
	const user = currentUser.admin ? 'admin' : 'user';

	const defaultFields = {
		description: '',
		quantity: '',
		uom: 'piece',
		costPerUnit: '',
		estimatedCost: '',
	};

	useEffect(() => {
		if (payment) {
			setDefaultValues(payment);
		}
	}, [payment]);

	const {
		formState: { errors },
		handleSubmit,
		register,
		setValue,
		getValues,
		control,
	} = useForm({
		defaultValues: {
			...defaultValues,
			dateRequired: new Date(defaultValues.dateRequired),
		},
	});

	const onSubmit = (formData) => {
		let data = {
			...formData,
			dateUpdated: now,
			dateRequired: currentDateTime(formData.dateRequired),
		};

		if (edit === 'new') {
			data.requestorId = currentUser.id;
			data.dateCreated = now;
		}

		let res;

		if (!id) {
			res = dispatch(createPaymentRequest(data));
		} else {
			res = dispatch(updatePayment(id, data));
		}

		toast.promise(res, {
			loading: `${id ? 'Updating' : 'Sending'} payment request...`,
			success: () => {
				setTimeout(() => {
					history.push(`/${user}/${page}/${subpage}`);
				}, 1500);
				return (
					<p>{`Successfully ${
						id ? 'updated' : 'sent'
					} payment request.`}</p>
				);
			},
			error: (
				<b>{`Could not ${id ? 'update' : 'send'} payment request.`}</b>
			),
		});
	};

	function updateEstimatedCost() {
		const totalAmount = getValues(`totalAmount`);

		if (totalAmount) {
			setTotalCost(parseFloat(totalAmount).toFixed(2));
		}
	}

	const iconMap = [
		RiNumber1,
		RiNumber2,
		RiNumber3,
		RiNumber4,
		RiNumber5,
		RiNumber6,
		RiNumber7,
	];

	const personnels = [
		'Recommending Approval',
		'Final Approval',
		'Accounting Associate',
		'Accounting Supervisor',
		'Disbursement Associate',
		'Cash Management Supervisor',
		'Manager',
	];

	// let isEditable = payment && payment.status === 'pending' && !notice ? true : false;
	let isEditable = !notice ? true : false;

	isEditable = edit === 'new' ? true : isEditable;

	return (
		<div className="flex items-start relative">
			<form
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				className="w-full mt-50">
				{isEditable && !notice ? (
					<div className="flex items-center mb-20 absolute right-0 top-0">
						<button
							type="submit"
							className="ml-auto text-14 px-14 py-7 bg-crimson text-white font-medium leading-snug rounded shadow-md hover:shadow-lg focus:bg-hoki-15 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">
							Save
						</button>
					</div>
				) : (
					''
				)}
				<div className="flex items-start w-full">
					<div className="shadow bg-white rounded-8 overflow-hidden mr-30 w-full">
						<Tabs className="bg-linkwater-dark px-32 pt-8 h-48 shadow-sm">
							<Tab className="active px-12" tabId="tabPurchase">
								Purchase
								{errors.purpose ||
								errors.terms ||
								errors.vendors ||
								errors.costCenter ? (
									<AiFillWarning className="ml-3 text-crimson w-15 h-15" />
								) : (
									''
								)}
							</Tab>
							{isEditable && edit !== 'new' ? (
								<Tab className="px-12" tabId="tabApproval">
									Approval History
								</Tab>
							) : (
								''
							)}
						</Tabs>
						<TabContent>
							<TabPanel
								className="show active"
								tabId="tabPurchase">
								<div className="border-b border-porcelain">
									<div className="py-30 px-24">
										<div className="mb-10">
											<label
												htmlFor="vendor"
												className="w-1/3 ml-auto text-13 font-semibold">
												Purpose
											</label>
											<textarea
												className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
												placeholder="Purpose"
												{...register('purpose', {
													required:
														'Purpose is required',
													disabled: !isEditable,
												})}
											/>
											<InputError
												error={errors.purpose}
											/>
										</div>
										<div className="flex mb-10 items-start">
											<div className="w-1/2 pr-5">
												<label
													htmlFor="vendor"
													className="w-1/3 ml-auto text-13 font-semibold">
													Payee
												</label>
												<input
													type="text"
													className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
													placeholder="Payee"
													{...register('payee', {
														required:
															'Payee is required',
														disabled: !isEditable,
													})}
												/>
												<InputError
													error={errors.payee}
												/>
											</div>
											<div className="w-1/2 pl-5">
												<label
													htmlFor="terms"
													className="w-1/3 ml-auto text-13 font-semibold">
													Requested By
												</label>
												<input
													type="text"
													className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
													placeholder="Requested By"
													{...register(
														'requestedBy',
														{
															required:
																'Requested By is required',
															disabled:
																!isEditable,
														}
													)}
												/>
												<InputError
													error={errors.requestedBy}
												/>
											</div>
										</div>
										<div className="flex mb-10 items-start">
											<div className="w-1/3 pr-5">
												<label
													htmlFor="totalAmount"
													className="w-1/3 ml-auto text-13 font-semibold">
													Total Amount
												</label>
												<input
													type="number"
													min="0"
													className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
													placeholder="Total Amount"
													{...register(
														'totalAmount',
														{
															required:
																'Total Amount is required',
															disabled:
																!isEditable,
														}
													)}
													onBlur={() =>
														updateEstimatedCost()
													}
												/>
												<InputError
													error={errors.totalAmount}
												/>
											</div>
											<div className="w-1/3 pr-5">
												<label
													htmlFor="terms"
													className="w-1/3 ml-auto text-13 font-semibold">
													Payment Method
												</label>

												<select
													className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
													placeholder="Payment Method"
													{...register(
														'paymentMethod',
														{
															required:
																'Payment Method is required',
															disabled:
																!isEditable,
														}
													)}>
													<option value="cash">
														Cash
													</option>
													<option value="fundTransfer">
														Fund Transfer
													</option>
													<option value="autoDebit">
														Auto Debit
													</option>
												</select>

												<InputError
													error={errors.paymentMethod}
												/>
											</div>
											<div className="w-1/3 pl-5">
												<label
													htmlFor="terms"
													className="w-1/3 ml-auto text-13 font-semibold">
													Date Required
												</label>
												<Controller
													render={({
														field: {
															onChange,
															value,
														},
													}) => (
														<DatePicker
															className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
															selected={value}
															onChange={(e) =>
																onChange(e)
															}
														/>
													)}
													name="dateRequired"
													control={control}
													rules={{
														required:
															'Date is required',
													}}
												/>
												<InputError
													error={errors.dateRequired}
												/>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
							<TabPanel tabId="tabApproval">
								<div className="border-b border-porcelain">
									<div className="py-30 px-24">
										<div className="flex items-center mb-20">
											<h3 className="w-1/2 pl-36">
												Personnel
											</h3>
											<h3 className="w-1/4 text-center">
												Status
											</h3>
											<h3 className="w-1/4 text-center">
												Date Approved
											</h3>
										</div>
										<ul className="text-14">
											{personnels.map(
												(personnel, idx) => {
													let NumberComponent =
														iconMap[idx];

													return (
														<li
															key={`approval-${idx}`}
															className="flex items-center border-b border-porcelain py-5">
															<div className="flex items-center w-1/2">
																<NumberComponent className="p-6 rounded-full bg-botticelli text-shuttlegray w-25 h-25 mr-12 text-16" />
																{personnel}
															</div>
															<div className="w-1/4 text-center">
																Pending
															</div>
															<div className="w-1/4 text-center">
																---
															</div>
														</li>
													);
												}
											)}
										</ul>
									</div>
								</div>
							</TabPanel>
						</TabContent>
					</div>
				</div>
			</form>

			<div className="w-3/10">
				<PaymentDetails
					{...defaultValues}
					total={totalCost}
					status={getValues('status')}
				/>
				<PaymentApprovalDetails
					{...defaultValues}
					total={totalCost}
					status={getValues('status')}
					notice={notice}
					setNotice={setNotice}
					isEditable={isEditable}
				/>
			</div>
			<Toaster position="top-center" reverseOrder={false} />
		</div>
	);
}
