import http from '../http-common';

const getAll = () => {
	return http.get('/purchases');
};

const get = (id) => {
	return http.get(`/purchases/${id}`);
};

const create = (data) => {
	return http.post('/purchases', data);
};

const update = (id, data) => {
	return http.put(`/purchases/${id}`, data);
};

const remove = (id) => {
	return http.delete(`/purchases/${id}`);
};

const removeAll = () => {
	return http.delete(`/purchases`);
};

const findByTitle = (title) => {
	return http.get(`/purchases?title=${title}`);
};

const RequestService = {
	getAll,
	get,
	create,
	update,
	remove,
	removeAll,
	findByTitle,
};

export default RequestService;
