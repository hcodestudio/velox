import UserService from '../../services/UserService';

import { saveUser, saveUsers, setCurrentUser } from '../reducers/users';

export const login = (data) => async (dispatch) => {
	try {
		const res = await UserService.auth(data);

		dispatch(saveUser(res.data));

		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

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

export const saveUserSession = (userData) => {
	localStorage.setItem(`velox-usersession`, JSON.stringify(userData));
};

export const removeUserSession = () => (dispatch) => {
	localStorage.removeItem(`velox-usersession`);
	dispatch(setCurrentUser({}));
};
