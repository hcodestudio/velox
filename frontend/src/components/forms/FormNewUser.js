import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { AiFillWarning } from 'react-icons/ai';

import { Tab, Tabs, TabContent, TabPanel } from '../tabs';

import InputError from '../InputError';
import UserPermissions from '../UserPermissions';
import UserGroups from '../UserGroups';
import config from '../../config/userpermissions.json';
import { createUser } from '../../store/actions/users';
import { currentDateTime } from '../../utilities';

export default function UserNew({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const now = currentDateTime();
	const { permissions } = config;
	const { userGroups } = useSelector((state) => state.users);

	const [success, setSuccess] = useState(false);
	const [defaultValues, setDefaultValues] = useState(user);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (success) {
				history.push(`/admin/users`);
			}
		}, 1500);
		return () => clearTimeout(timer);
	}, [history, success]);

	useEffect(() => {
		if (user) {
			setDefaultValues(user);
		}
	}, [user]);

	const {
		formState: { errors },
		handleSubmit,
		register,
		watch,
	} = useForm({ defaultValues });

	const onSubmit = (formData) => {
		const requestor = userGroups.find((u) => u.handle === 'requestor');
		const groups = formData.userGroups.filter((u) => typeof u == 'string');

		const data = {
			...formData,
			dateCreated: now,
			dateUpdated: now,
			userGroups: groups.length ? groups : [requestor.id],
		};

		setSuccess(false);

		let res = null;

		if (Object.keys(defaultValues).length === 0) {
			// save user
			res = dispatch(createUser(data));
		} else {
			// update user
			// res = dispatch(createUser(data));
		}
		console.log({ data, defaultValues });
		// const res = dispatch(createUser(data));

		toast.promise(res, {
			loading: 'Saving user...',
			success: () => {
				setSuccess(true);
				return <p>Successfully added user.</p>;
			},
			error: <b>Could not add user.</b>,
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="flex items-center mb-20">
					<button
						type="submit"
						className="ml-auto text-14 px-14 py-7 bg-crimson text-white font-medium leading-snug rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">
						Save
					</button>
				</div>
				<div className="shadow bg-white rounded-8 overflow-hidden">
					<Tabs className="bg-linkwater-dark px-32 pt-8 h-48 shadow-sm">
						<Tab
							className="active px-12 flex items-center"
							tabId="account">
							Account
							{errors.username ||
							errors.email ||
							errors.confirmPassword ||
							errors.password ||
							errors.firstName ||
							errors.lastName ||
							errors.jobTitle ? (
								<AiFillWarning className="ml-3 text-crimson w-15 h-15" />
							) : (
								''
							)}
						</Tab>
						<Tab
							className="px-12 flex items-center"
							tabId="permissions">
							Permissions
						</Tab>
					</Tabs>
					<TabContent>
						<TabPanel className="show active" tabId="account">
							<div className="border-b border-porcelain">
								<div className="py-30 px-24">
									<h3 className="mb-8">Credentials</h3>
									<div className="flex mb-15">
										<div className="w-1/2 pr-8">
											<label
												htmlFor="username"
												className="w-1/3 ml-auto text-13 font-medium">
												Username
											</label>
											<input
												type="text"
												className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
												placeholder="Username"
												{...register('username', {
													required:
														'Username is required',
												})}
											/>
											<InputError
												error={errors.username}
											/>
										</div>
										<div className="w-1/2 pl-8">
											<label
												htmlFor="email"
												className="w-1/3 ml-auto text-13 font-medium">
												Email
											</label>
											<input
												type="text"
												className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
												placeholder="Email"
												{...register('email', {
													required:
														'Email is required',
													pattern: {
														value: /\S+@\S+\.\S+/,
														message:
															'Email is invalid',
													},
												})}
											/>
											<InputError error={errors.email} />
										</div>
									</div>
									<div className="flex mb-15">
										<div className="w-1/2 pr-8">
											<label
												htmlFor="password"
												className="w-1/3 ml-auto text-13 font-medium">
												Password
											</label>
											<input
												type="password"
												className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
												placeholder="Password"
												{...register('password', {
													required:
														'Password is required',
													minLength: {
														value: 8,
														message:
															'Password must have at least 8 characters',
													},
												})}
											/>
											<InputError
												error={errors.password}
											/>
										</div>
										<div className="w-1/2 pl-8">
											<label
												htmlFor="confirmPassword"
												className="w-1/3 ml-auto text-13 font-medium">
												Confirm Password
											</label>
											<input
												type="password"
												className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
												placeholder="Confirm Password"
												{...register(
													'confirmPassword',
													{
														required:
															'Confirm Password is required',

														validate: (val) => {
															if (
																watch(
																	'password'
																) !== val
															) {
																return 'Your passwords do not match';
															}
														},
													}
												)}
											/>
											<InputError
												error={errors.confirmPassword}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className="py-30 px-24">
								<div className="flex mb-15">
									<div className="w-1/2 pr-8">
										<label
											htmlFor="firstName"
											className="w-1/3 ml-auto text-13 font-medium">
											First Name
										</label>
										<input
											type="text"
											className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
											placeholder="First name"
											{...register('firstName', {
												required:
													'First name is required',
												pattern: {
													value: /^[a-z ,.'-]+$/i,
													message:
														'First name is invalid',
												},
											})}
										/>
										<InputError error={errors.firstName} />
									</div>
									<div className="w-1/2 pl-8">
										<label
											htmlFor="lastName"
											className="w-1/3 ml-auto text-13 font-medium">
											Last Name
										</label>
										<input
											type="text"
											className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
											placeholder="Last name"
											{...register('lastName', {
												required:
													'Last name is required',
												pattern: {
													value: /^[a-z ,.'-]+$/i,
													message:
														'Last name is invalid',
												},
											})}
										/>
										<InputError error={errors.lastName} />
									</div>
								</div>
								<div className="mb-10">
									<label
										htmlFor="jobTitle"
										className="w-1/3 ml-auto text-13 font-medium">
										Job Title
									</label>
									<input
										type="text"
										className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
										placeholder="Job Title"
										{...register('jobTitle', {
											required: 'Job Title is required',
											pattern: {
												value: /^[a-z ,.'-]+$/i,
												message: 'Job Title is invalid',
											},
										})}
									/>
									<InputError error={errors.jobTitle} />
								</div>
								<div className="mb-10">
									<label
										htmlFor="address"
										className="w-1/3 ml-auto text-13 font-medium">
										Complete Address
									</label>
									<input
										type="text"
										className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
										placeholder="Complete Address"
										{...register('address')}
									/>
									<InputError error={errors.address} />
								</div>
							</div>
						</TabPanel>

						<TabPanel tabId="permissions">
							<UserGroups
								className="border-b border-porcelain"
								register={register}
								groups={userGroups}
							/>
							<UserPermissions
								register={register}
								permissions={permissions}
							/>
						</TabPanel>
					</TabContent>
				</div>
			</form>
			<Toaster position="top-center" reverseOrder={false} />
		</>
	);
}
