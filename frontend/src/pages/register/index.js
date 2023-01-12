import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

import InputError from '../../components/InputError';
import IconSpinner from '../../components/IconSpinner';
import { createUser } from '../../store/actions/users';
import { currentDateTime } from '../../utilities';

export default function Register() {
	const history = useHistory();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const now = currentDateTime();

	const {
		formState: { errors },
		handleSubmit,
		register,
		watch,
	} = useForm();

	const onSubmit = (formData) => {
		setLoading(true);

		const data = {
			...formData,
			dateCreated: now,
			dateUpdated: now,
			admin: 0,
		};

		dispatch(createUser(data))
			.then((user) => {
				setTimeout(() => {
					// save user data to local storage
					setLoading(false);
					toast.success(<p>Successfully registered!</p>);
				}, 1500);
				setTimeout(() => {
					setLoading(false);
					toast.success(<p>Successfully registered!</p>);

					history.push('/');
				}, 3000);
			})
			.catch(() => {
				setLoading(false);
				toast.error(<p>There is an error encountered</p>);
			});
	};

	return (
		<div
			className="containerx mx-auto min-w-500 py-30"
			style={{ maxWidth: '748px' }}>
			<Link
				to="/"
				className="flex items-center hover:text-blue-600 mb-15">
				<BsArrowLeft className="mr-5" />
				Login
			</Link>
			<h1 className="text-32 font-medium pb-2">Register</h1>
			<form
				onSubmit={handleSubmit(onSubmit)}
				noValidate
				className=" mt-15">
				<div className="border border-porcelain shadow rounded-md">
					<div className="border-b border-porcelain">
						<div className="py-30 px-24">
							<div className="mb-10">
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
										required: 'Username is required',
									})}
								/>
								<InputError error={errors.username} />
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
									htmlFor="password"
									className="w-1/3 ml-auto text-13 font-medium">
									Password
								</label>
								<input
									type="password"
									className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
									placeholder="Password"
									{...register('password', {
										required: 'Password is required',
										minLength: {
											value: 8,
											message:
												'Password must have at least 8 characters',
										},
									})}
								/>
								<InputError error={errors.password} />
							</div>
							<div className="mb-10">
								<label
									htmlFor="confirmPassword"
									className="w-1/3 ml-auto text-13 font-medium">
									Confirm Password
								</label>
								<input
									type="password"
									className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
									placeholder="Confirm Password"
									{...register('confirmPassword', {
										required:
											'Confirm Password is required',

										validate: (val) => {
											if (watch('password') !== val) {
												return 'Your passwords do not match';
											}
										},
									})}
								/>
								<InputError error={errors.confirmPassword} />
							</div>
						</div>
					</div>
					<div className="py-30 px-24">
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
						<button
							type="submit"
							className={`h-40 flex items-center mt-20 justify-center px-7 py-8 text-white font-medium text-sm leading-snug uppercase rounded transition duration-150 ease-in-out w-full ${
								loading
									? 'border border-blue-600'
									: 'shadow-md bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg'
							}`}
							onClick={() => handleSubmit()}>
							{loading ? (
								<IconSpinner className={'fill-blue-600'} />
							) : (
								'Register'
							)}
						</button>
					</div>
				</div>
			</form>
			<Toaster />
		</div>
	);
}
