import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import InputError from '../../components/InputError';
import { login, saveUserSession } from '../../store/actions/users';

export default function Login() {
	const history = useHistory();
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.users.currentUser);
	const defaultValues = {};

	const [showError, setShowError] = useState(false);

	useEffect(() => {
		if (currentUser.id) {
			if (currentUser.admin) {
				history.push('/admin/dashboard');
			} else {
				history.push('/user/dashboard');
			}
		}
	});

	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm({ defaultValues });

	const onSubmit = (formData) => {
		dispatch(login(formData))
			.then((data) => {
				if (!data) {
					setShowError(true);
					setTimeout(() => {
						setShowError(false);
					}, 1000);
				} else {
					saveUserSession(data);
					history.push('/admin/dashboard');
				}
			})
			.catch((e) => console.log('error login'));
	};

	return (
		<div className="container mx-auto max-w-3/5">
			<section className="h-screen">
				<div className="container px-6 py-12 h-full">
					<div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
						<div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0 py-40">
							<img
								src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
								className="w-full"
								alt="Phone"
							/>
						</div>
						<div className="md:w-8/12 lg:w-5/12 lg:ml-20">
							<h1 className="text-center text-40 mb-30 leading-tight">
								Velox Energy Purchase & Payment Request Portal
							</h1>
							<form onSubmit={handleSubmit(onSubmit)} noValidate>
								<div className="mb-10">
									<input
										type="text"
										className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
										placeholder="Email or username"
										{...register('email', {
											required:
												'Email or username is required',
										})}
									/>
									<InputError error={errors.email} />
								</div>

								<div className="mb-10">
									<input
										type="password"
										className="form-control block w-full px-9 py-6 font-normal text-gray-700 bg-linkwater-light shadow rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-5 text-16"
										placeholder="Password"
										{...register('password', {
											required: 'Password is required',
										})}
									/>
									<InputError error={errors.password} />
								</div>

								<button
									type="submit"
									className="inline-block px-7 py-8 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
									onClick={() => handleSubmit()}>
									Sign in
								</button>
								{showError && (
									<InputError
										error={{
											message:
												'Incorrect username/password',
										}}
									/>
								)}
							</form>
							<p className="text-sm font-semibold mt-2 pt-1 mb-0">
								Don't have an account?
								<Link
									to="/register"
									className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-1">
									Register
								</Link>
							</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
