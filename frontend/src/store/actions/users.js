import UserService from '../../services/UserService';

import {
	saveUser,
	saveUsers,
	saveUserGroups,
	setCurrentUser,
} from '../reducers/users';

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
		const res = await UserService.getAll('users');

		dispatch(saveUsers(res.data));
	} catch (err) {
		console.log(err);
	}
};

export const getUserGroups = () => async (dispatch) => {
	try {
		const res = await UserService.getAll('usergroups');

		dispatch(saveUserGroups(res.data));
	} catch (err) {
		console.log(err);
	}
};

export const getUserById = (id) => async () => {
	try {
		const res = await UserService.get(id);

		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const saveUserSession = (userData) => {
	localStorage.setItem(`velox-usersession`, JSON.stringify(userData));
};

export const removeUserSession = () => (dispatch) => {
	localStorage.removeItem(`velox-usersession`);
	dispatch(setCurrentUser({}));
};
