import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { HiPlus, HiTrash } from 'react-icons/hi2';

import { Tab, Tabs, TabContent, TabPanel } from '../../../components/tabs';
import InputError from '../../../components/InputError';
import { currentDateTime } from '../../../utilities';
import { createPurchaseRequest } from '../../../store/actions/requests';

export default function PurchaseNew() {
	const { admin } = useSelector((state) => state.users.currentUser);

	const dispatch = useDispatch();
	const history = useHistory();
	const now = currentDateTime();

	const [success, setSuccess] = useState(false);
	const [totalCost, setTotalCost] = useState(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (success) {
				history.push(`/${admin ? 'admin' : 'user'}/dashboard`);
			}
		}, 3000);
		return () => clearTimeout(timer);
	}, [admin, history, success]);

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
	} = useForm({ defaultValues: { items: [{ ...defaultFields }] } });

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'items',
	});

	const onSubmit = (formData) => {
		setSuccess(false);

		const total = formData.items.reduce(
			(sum, { estimatedCost }) => sum + Number(estimatedCost),
			0
		);

		const data = {
			...formData,
			dateCreated: now,
			dateUpdated: now,
			subsidiaryId: null,
			vendorId: null,
			requestorId: 39,
			totalAmount: total.toFixed(2),
			paymentMethod: 'cash',
			receivedBy: null,
			approvedBy: null,
			budgetCategory: 'budgeted',
			status: 'pending',
		};

		const res = dispatch(createPurchaseRequest(data));

		toast.promise(res, {
			loading: 'Sending purchase request...',
			success: () => {
				setSuccess(true);
				return <p>Successfully sent purchase request.</p>;
			},
			error: <b>Could not send purchase request.</b>,
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

	return (
		<div className="container mx-auto mt-30">
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="flex items-center mb-20">
					<button
						type="submit"
						className="ml-auto text-14 px-14 py-7 bg-crimson text-white font-medium leading-snug rounded shadow-md hover:shadow-lg focus:bg-hoki-15 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">
						Save
					</button>
				</div>
				<div className="flex items-start">
					<div className="shadow bg-white rounded-8 overflow-hidden w-8/10 mr-30">
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
					<div className="shadow bg-white rounded-8 overflow-hidden w-2/10 px-32 py-15">
						<div className="flex items-center">
							<p className="w-1/2 font-semibold">Total </p>
							<p className="w-1/2">{totalCost}</p>
						</div>
					</div>
				</div>
			</form>
			<Toaster position="top-center" reverseOrder={false} />
		</div>
	);
}
