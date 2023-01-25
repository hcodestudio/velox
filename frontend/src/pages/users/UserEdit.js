import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormNewUser from '../../components/forms/FormNewUser';
import { getUserById } from '../../store/actions/users';

export default function UserEdit() {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users);
	const { edit } = useSelector((state) => state.pages.current);
	const [user, setUser] = useState(null);

	useEffect(() => {
		dispatch(getUserById(edit)).then((data) => {
			const userGroups = users.userGroups.map((u) => {
				if (data.userGroups[0].includes(u.id)) {
					return u.id;
				}
				return false;
			});

			setUser({ ...data, userGroups });
		});
	}, [dispatch, edit, users.userGroups]);

	return (
		<div className="container mx-auto mt-30 px-15">
			{user ? <FormNewUser user={user} /> : ''}
		</div>
	);
}
