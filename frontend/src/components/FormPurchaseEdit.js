import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { HiPlus, HiTrash } from 'react-icons/hi2';
import { AiFillLike } from 'react-icons/ai';

import { Tab, Tabs, TabContent, TabPanel } from './tabs';
import InputError from './InputError';
import { currentDateTime, convertToTitle, formatDate } from '../utilities';

import {
	approvePurchaseRequest,
	createPurchaseRequest,
	updatePurchase,
} from '../store/actions/requests';

export function FormPurchaseEdit({ defaultValues }) {
	const dispatch = useDispatch();
	const now = currentDateTime();
	const [totalCost, setTotalCost] = useState(null);

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

	function handleApproveRequest(status) {
		const data = {
			id,
			status,
			dateUpdated: now,
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

	return (
		<div className="flex items-start relative">
			<form
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				className="w-full mt-50">
				<div className="flex items-center mb-20 absolute right-0 top-0">
					<button
						type="submit"
						className="ml-auto text-14 px-14 py-7 bg-crimson text-white font-medium leading-snug rounded shadow-md hover:shadow-lg focus:bg-hoki-15 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">
						Save
					</button>
				</div>
				<div className="flex items-start w-full">
					<div className="shadow bg-white rounded-8 overflow-hidden mr-30 w-full">
						<Tabs className="bg-linkwater-dark px-32 pt-8 h-48 shadow-sm">
							<Tab className="active px-12" tabId="account">
								Content
							</Tab>
							<Tab className="px-12" tabId="permissions">
								Items
							</Tab>
						</Tabs>
						<TabContent>
							<TabPanel className="show active" tabId="account">
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
												})}
											/>
											<InputError
												error={errors.purpose}
											/>
										</div>
										<div className="mb-10">
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
												})}
											/>
											<InputError error={errors.vendor} />
										</div>
										<div className="mb-10">
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
												})}
											/>
											<InputError error={errors.terms} />
										</div>
										<div className="mb-10">
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
												})}
											/>
											<InputError
												error={errors.costCenter}
											/>
										</div>
									</div>
								</div>
							</TabPanel>
							<TabPanel tabId="permissions">
								<div className="border-b border-porcelain">
									<div className="py-30 px-24">
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
												<div className="w-10/100 px-5"></div>
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
																	}
																)}
															/>
															<InputError
																error={
																	errors.items &&
																	errors
																		.items[
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
																	errors
																		.items[
																		idx
																	]
																		? errors
																				.items[
																				idx
																		  ]
																				.quantity
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
																	errors
																		.items[
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
																		pattern:
																			{
																				value: /^[0-9]+\.?[0-9]?/,
																				message:
																					'Cost per Unit is invalid',
																			},
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
																	errors
																		.items[
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
																	}
																)}
															/>
														</div>
														<div className="w-10/100">
															{idx ? (
																<button
																	type="button"
																	className="flex items-center text-14 px-14 py-7 bg-hoki-15 text-black font-medium leading-snug rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out h-full max-h-36"
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
													</div>
												</div>
											))}
										</div>
									</div>
								</div>
							</TabPanel>
						</TabContent>
					</div>
				</div>
			</form>
			<div className="shadow bg-white rounded-8 overflow-hidden w-3/10 px-32 py-15 mt-50">
				<div className="flex items-center">
					<p className="w-1/2 font-semibold">Total </p>
					<div className="flex items-center w-1/2">
						<img
							src="/img/icon-peso.png"
							alt="Total cost"
							className="w-12 mr-5"
						/>
						{totalCost}
					</div>
				</div>
				<div className="flex items-center mt-15 text-14">
					<div className="w-1/2 font-semibold">Status</div>
					<div className="w-1/2">
						<span
							className={`font-bold uppercase text-14 ${
								getValues('status') === 'pending'
									? 'text-pomegranate'
									: 'text-emerald'
							}`}>
							{convertToTitle(getValues('status'))}
						</span>
					</div>
				</div>

				{getValues('status') === 'approved' ? (
					<>
						<div className="flex items-center mt-15 text-14">
							<div className="w-1/2 font-semibold">
								Approved By
							</div>
							<div className="w-1/2">
								{`${defaultValues.firstName} ${defaultValues.lastName}`}
							</div>
						</div>
						<div className="flex items-center mt-15 text-14">
							<div className="w-1/2 font-semibold">
								Date Approved
							</div>
							<div className="w-1/2">
								{`${formatDate(
									new Date(defaultValues.dateUpdated)
								)}`}
							</div>
						</div>
					</>
				) : (
					''
				)}
				{currentUser.admin ? (
					<>
						{getValues('status') === 'pending' ? (
							<>
								<div className="flex items-center mt-15 text-14">
									<div className="w-1/2 font-semibold">
										Actions
									</div>
									<div className="w-1/2">
										<button
											type="button"
											className="w-full text-13 px-6 py-8 bg-blue-600 text-white font-medium leading-snug rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
											onClick={() =>
												handleApproveRequest('approved')
											}>
											<AiFillLike className="mb-3 mr-5" />
											<span>Approve Request</span>
										</button>
									</div>
								</div>
							</>
						) : (
							''
						)}
					</>
				) : (
					''
				)}
			</div>
			<Toaster position="top-center" reverseOrder={false} />
		</div>
	);
}
