import http from '../http-common';

const auth = (data) => {
	return http.post('/users/auth', data);
};

const getAll = (type) => {
	return http.get(`/users/all-${type}`);
};

const get = (id) => {
	return http.get(`/users/${id}`);
};

const create = (data) => {
	return http.post('/users', data);
};

const update = (id, data) => {
	return http.put(`/users/${id}`, data);
};

const remove = (id) => {
	return http.delete(`/users/${id}`);
};

const removeAll = () => {
	return http.delete(`/users`);
};

const findByTitle = (title) => {
	return http.get(`/users?title=${title}`);
};

const UserService = {
	auth,
	getAll,
	get,
	create,
	update,
	remove,
	removeAll,
	findByTitle,
};

export default UserService;
