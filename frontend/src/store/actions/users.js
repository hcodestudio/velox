import UserService from '../../services/UserService';

import { saveUser, saveUsers } from '../reducers/users';

export const createUser = (data) => async (dispatch) => {
	try {
		const res = await UserService.create(data);

		dispatch(saveUser(res.data));

		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const getUsers = () => async (dispatch) => {
	try {
		const res = await UserService.getAll();

		dispatch(saveUsers(res.data));
	} catch (err) {
		console.log(err);
	}
};
