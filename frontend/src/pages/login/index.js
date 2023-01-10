import { useHistory } from 'react-router-dom';

export default function Login() {
	const history = useHistory();

	function handleSubmit() {
		history.push('/admin/dashboard');
	}

	return (
		<>
			<h1 className="text-center text-30">
				Velox Enery Automated Purchase System
			</h1>

			<section className="h-screen">
				<div className="container px-6 py-12 h-full">
					<div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
						<div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
							<img
								src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
								className="w-full"
								alt="Phone"
							/>
						</div>
						<div className="md:w-8/12 lg:w-5/12 lg:ml-20">
							<form>
								<div className="mb-6">
									<input
										type="text"
										className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										placeholder="Email address"
									/>
								</div>

								<div className="mb-6">
									<input
										type="password"
										className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
										placeholder="Password"
									/>
								</div>

								<button
									type="submit"
									className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
									onClick={() => handleSubmit()}>
									Sign in
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
