import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
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

import InputError from '../InputError';
import PurchaseDetails from '../PurchaseDetails';
import PurchaseApprovalDetails from '../PurchaseApprovalDetails';
import { Tab, Tabs, TabContent, TabPanel } from '../tabs';
import { currentDateTime } from '../../utilities';
import {
	createPurchaseRequest,
	updatePurchase,
} from '../../store/actions/requests';

export function FormEditPurchase({ purchase }) {
	const dispatch = useDispatch();
	const now = currentDateTime();
	const [totalCost, setTotalCost] = useState(null);
	const [defaultValues, setDefaultValues] = useState(purchase);
	const [notice, setNotice] = useState(null);

	const history = useHistory();
	const currentUser = useSelector((state) => state.users.currentUser);
	const { page, subpage, id } = useSelector((state) => state.pages.current);
	const user = currentUser.admin ? 'admin' : 'user';

	const defaultFields = {
		description: '',
		quantity: '',
		uom: 'piece',
		costPerUnit: '',
		estimatedCost: '',
	};

	const {
		formState: { errors },
		handleSubmit,
		register,
		setValue,
		getValues,
		control,
	} = useForm({
		defaultValues,
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'items',
	});

	useEffect(() => {
		if (id && defaultValues) {
			const items = defaultValues.items;
			const total = items
				.reduce(
					(sum, { estimatedCost }) => sum + Number(estimatedCost),
					0
				)
				.toFixed(2);

			setTotalCost(total);
		}
	}, [defaultValues, id]);

	useEffect(() => {
		if (purchase) {
			setDefaultValues(purchase);
		}
	}, [purchase]);

	const onSubmit = (formData) => {
		const data = {
			...formData,
			dateUpdated: now,
		};

		let res;

		if (!id) {
			res = dispatch(createPurchaseRequest(data));
		} else {
			res = dispatch(updatePurchase(id, data));
		}

		toast.promise(res, {
			loading: `${id ? 'Updating' : 'Sending'} purchase request...`,
			success: () => {
				setTimeout(() => {
					history.push(`/${user}/${page}/${subpage}`);
				}, 1500);
				return (
					<p>{`Successfully ${
						id ? 'updated' : 'sent'
					} purchase request.`}</p>
				);
			},
			error: (
				<b>{`Could not ${id ? 'update' : 'send'} purchase request.`}</b>
			),
		});
	};

	function handleOnBlurCostPerUnit(idx) {
		const field = `items[${idx}].costPerUnit`;
		const cost = parseFloat(getValues(field));

		if (cost) {
			setValue(field, cost.toFixed(2));
			updateEstimatedCost(idx);
		}
	}

	function updateEstimatedCost(idx) {
		const quantity = getValues(`items[${idx}].quantity`);
		const cost = getValues(`items[${idx}].costPerUnit`);

		if (quantity && cost) {
			const estimatedCost = parseFloat(cost * quantity).toFixed(2);

			setValue(`items[${idx}].estimatedCost`, estimatedCost);

			const items = getValues('items');
			const total = items
				.reduce(
					(sum, { estimatedCost }) => sum + Number(estimatedCost),
					0
				)
				.toFixed(2);

			setTotalCost(total);
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

	const isEditable =
		purchase && purchase.status === 'pending' && !notice ? true : false;

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
							{isEditable ? (
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
											<div className="w-2/5">
												<label
													htmlFor="vendor"
													className="w-1/3 ml-auto text-13 font-semibold">
													Vendor
												</label>
												<input
													type="text"
													className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
													placeholder="Vendor"
													{...register('vendor', {
														required:
															'Vendor is required',
														disabled: !isEditable,
													})}
												/>
												<InputError
													error={errors.vendor}
												/>
											</div>
											<div className="w-2/5 px-10">
												<label
													htmlFor="terms"
													className="w-1/3 ml-auto text-13 font-semibold">
													Cost Center
												</label>
												<input
													type="text"
													className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
													placeholder="Cost Center"
													{...register('costCenter', {
														required:
															'Cost Center is required',
														disabled: !isEditable,
													})}
												/>
												<InputError
													error={errors.costCenter}
												/>
											</div>
											<div className="w-1/5">
												<label
													htmlFor="terms"
													className="w-1/3 ml-auto text-13 font-semibold">
													Terms (in months)
												</label>
												<input
													type="number"
													min="0"
													className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
													placeholder="Terms"
													{...register('terms', {
														required:
															'Terms is required',
														disabled: !isEditable,
													})}
												/>
												<InputError
													error={errors.terms}
												/>
											</div>
										</div>
									</div>
								</div>
								<div className="py-30 px-24">
									{isEditable ? (
										<div className="flex items-center mb-20">
											<button
												type="submit"
												className="flex items-center text-14 px-14 py-7 bg-crimson text-white font-medium leading-snug rounded shadow-md hover:shadow-lg focus:bg-crimson-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
												onClick={() =>
													append({ ...defaultFields })
												}>
												<HiPlus className="mr-3" />
												Add Item
											</button>
										</div>
									) : (
										''
									)}
									<div className="border-b-2 border-porcelain mb-10">
										<div className="flex pb-3 text-14 font-semibold">
											<div className="w-2/5 px-5">
												Description
											</div>
											<div className="w-10/100 px-5">
												Quantity
											</div>
											<div className="w-10/100 px-5">
												UOM
											</div>
											<div className="w-15/100 px-5">
												Cost per Unit
											</div>
											<div className="w-15/100 px-5">
												Estimated Cost
											</div>
											<div className="w-15/100 px-5"></div>
										</div>
									</div>
									<div>
										{fields.map((item, idx) => (
											<div
												className="mb-10"
												key={item.id}>
												<div className="flex -mx-5">
													<div className="w-2/5 px-5">
														<input
															type="text"
															className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-16"
															placeholder=""
															{...register(
																`items[${idx}].description`,
																{
																	required:
																		'Description is required',
																	disabled:
																		!isEditable,
																}
															)}
														/>
														<InputError
															error={
																errors.items &&
																errors.items[
																	idx
																]
																	? errors
																			.items[
																			idx
																	  ]
																			.description
																	: {}
															}
														/>
													</div>
													<div className="w-10/100 px-5">
														<input
															type="number"
															min="0"
															className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-16"
															placeholder=""
															{...register(
																`items[${idx}].quantity`,
																{
																	required:
																		'Quantity is required',
																	disabled:
																		!isEditable,
																}
															)}
															onBlur={() =>
																updateEstimatedCost(
																	idx
																)
															}
														/>
														<InputError
															error={
																errors.items &&
																errors.items[
																	idx
																]
																	? errors
																			.items[
																			idx
																	  ].quantity
																	: {}
															}
														/>
													</div>
													<div className="w-10/100 px-5">
														<select
															{...register(
																`items[${idx}].unitOfMeasure`,
																{
																	required:
																		'OUM is required',
																	disabled:
																		!isEditable,
																}
															)}
															className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-16 h-36">
															<option value="piece">
																piece
															</option>
															<option value="pack">
																pack
															</option>
														</select>
														<InputError
															error={
																errors.items &&
																errors.items[
																	idx
																]
																	? errors
																			.items[
																			idx
																	  ]
																			.unitOfMeasure
																	: {}
															}
														/>
													</div>
													<div className="w-15/100 px-5">
														<input
															type="number"
															step="0.00"
															min="0"
															className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-16"
															placeholder=""
															{...register(
																`items[${idx}].costPerUnit`,
																{
																	required:
																		'Cost per Unit is required',
																	pattern: {
																		value: /^[0-9]+\.?[0-9]?/,
																		message:
																			'Cost per Unit is invalid',
																	},
																	disabled:
																		!isEditable,
																}
															)}
															onBlur={() =>
																handleOnBlurCostPerUnit(
																	idx
																)
															}
														/>
														<InputError
															error={
																errors.items &&
																errors.items[
																	idx
																]
																	? errors
																			.items[
																			idx
																	  ]
																			.costPerUnit
																	: {}
															}
														/>
													</div>
													<div className="w-15/100 px-5">
														<input
															readOnly={true}
															className="block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-dark shadow rounded transition ease-in-out m-0 text-16 outline-none focus:outline-none focus:border-0"
															placeholder=""
															{...register(
																`items[${idx}].estimatedCost`,
																{
																	required: true,
																	disabled:
																		!isEditable,
																}
															)}
														/>
													</div>
													{isEditable ? (
														<div className="w-15/100">
															{idx ? (
																<button
																	type="button"
																	className="flex items-center text-14 px-14 py-7 bg-hoki-15 text-black font-medium leading-snug rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out h-full max-h-36 w-full justify-center"
																	onClick={() =>
																		remove(
																			idx
																		)
																	}>
																	<HiTrash className="mr-3" />
																	Remove
																</button>
															) : null}
														</div>
													) : (
														''
													)}
												</div>
											</div>
										))}
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
				<PurchaseDetails
					{...defaultValues}
					total={totalCost}
					status={getValues('status')}
				/>

				<PurchaseApprovalDetails
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
