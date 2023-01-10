import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

export default function TableUsers() {
	return (
		<div className="w-full">
			<div className="flex items-center">
				<Link
					to={'/admin/users/new'}
					className="flex items-center ml-auto bg-crimson text-white rounded-md text-14 px-14 py-7">
					<AiOutlinePlus className="text-secondary group-hover:hidden mr-5" />
					New user
				</Link>
			</div>
		</div>
	);
}
