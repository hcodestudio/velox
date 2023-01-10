import { useForm } from 'react-hook-form';

import InputError from '../../components/InputError';
import Tabsx from '../../components/tabs/Tabs';
import Tabs from '../../components/Tabs';

export default function CreateNewUser() {
	const defaultValues = {
		email: 'honey',
		firstName: 'honey',
		lastName: 'cariliman',
	};

	const {
		control,
		formState: { errors },
		handleSubmit,
		register,
	} = useForm({ defaultValues });

	const onSubmit = (data) => {
		console.log('onSubmit', data);
		// user controller: update user details
	};

	console.log({ errors });
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

				<div className="shadow bg-white py-30 px-24 rounded-8">
					<Tabs />
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
				</div>
			</form>
		</div>
	);
}
