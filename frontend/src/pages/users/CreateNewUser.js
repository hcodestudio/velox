import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

import InputError from '../../components/InputError';
import { Tab, Tabs, TabContent, TabPanel } from '../../components/tabs';
import { createUser } from '../../store/actions/users';
import { currentDateTime } from '../../utilities';

export default function CreateNewUser() {
	const dispatch = useDispatch();
	const history = useHistory();
	const defaultValues = {};
	const now = currentDateTime();

	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (success) {
				history.push(`/admin/users`);
			}
		}, 3000);
		return () => clearTimeout(timer);
	}, [history, success]);

	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm({ defaultValues });

	const onSubmit = (formData) => {
		setSuccess(false);

		const data = { ...formData, dateCreated: now, dateUpdated: now };
		const res = dispatch(createUser(data));

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
		<div className="container mx-auto mt-30">
			<form onSubmit={handleSubmit(onSubmit)} noValidate>
				<div className="flex items-center mb-20">
					<h1 className="text-18 font-medium">Register a new user</h1>
					<button
						type="submit"
						className="ml-auto text-14 px-14 py-7 bg-crimson text-white font-medium leading-snug rounded shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out">
						Save
					</button>
				</div>

				<div className="shadow bg-white rounded-8 overflow-hidden">
					<Tabs className="bg-linkwater-dark px-32 pt-8 h-48 shadow-sm">
						<Tab className="active px-12" tabId="account">
							Account
						</Tab>
						<Tab className="px-12" tabId="permissions">
							Permissions
						</Tab>
					</Tabs>
					<TabContent>
						<TabPanel
							className="show active py-30 px-24"
							tabId="account">
							<div className="mb-10">
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
										required: 'First name is required',
										pattern: {
											value: /^[a-z ,.'-]+$/i,
											message: 'First name is invalid',
										},
									})}
								/>
								<InputError error={errors.firstName} />
							</div>
							<div className="mb-10">
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
										required: 'Last name is required',
										pattern: {
											value: /^[a-z ,.'-]+$/i,
											message: 'Last name is invalid',
										},
									})}
								/>
								<InputError error={errors.lastName} />
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
									htmlFor="email"
									className="w-1/3 ml-auto text-13 font-medium">
									Email
								</label>
								<input
									type="text"
									className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
									placeholder="Email"
									{...register('email', {
										required: 'Email is required',
										pattern: {
											value: /\S+@\S+\.\S+/,
											message: 'Email is invalid',
										},
									})}
								/>
								<InputError error={errors.email} />
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
							<div className="mb-10">
								<label
									htmlFor="address"
									className="w-1/3 ml-auto text-13 font-medium">
									Department
								</label>
								<select
									{...register('gender')}
									className="block px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16">
									<option value="female">female</option>
									<option value="male">male</option>
								</select>
							</div>
						</TabPanel>
						<TabPanel tabId="permissions">
							<div className="border-b border-porcelain">
								<div className="py-30 px-24">
									<h2 className="text-18 font-medium mb-20">
										User Groups
									</h2>
									<label className="text-14 flex items-center">
										<input
											{...register('userGroup')}
											type="checkbox"
											value="A"
										/>
										<span className="ml-5">A</span>
									</label>
									<label className="text-14 flex items-center">
										<input
											{...register('userGroup')}
											type="checkbox"
											value="B"
										/>
										<span className="ml-5">B</span>
									</label>
									<label className="text-14 flex items-center">
										<input
											{...register('userGroup')}
											type="checkbox"
											value="C"
										/>
										<span className="ml-5">C</span>
									</label>
								</div>
							</div>
							<div className="py-30 px-24">
								<h2 className="text-18 font-medium mb-20">
									Permissions
								</h2>
								<label className="text-14 flex items-center font-bold">
									<input
										{...register('admin')}
										type="checkbox"
										value="1"
									/>
									<span className="ml-5">Admin</span>
								</label>
							</div>
						</TabPanel>
					</TabContent>
				</div>
			</form>
			<Toaster position="top-center" reverseOrder={false} />
		</div>
	);
}
