import http from '../http-common';

const getAll = () => {
	return http.get('/payments/all');
};

const getAllById = (id) => {
	return http.get(`/payments/all/${id}`);
};

const get = (id) => {
	return http.get(`/payments/${id}`);
};

const getItems = (id) => {
	return http.get(`/payments/items/${id}`);
};

const create = (data) => {
	return http.post('/payments/new', data);
};

const update = (id, data) => {
	return http.put(`/payments/edit/${id}`, data);
};

const remove = (id) => {
	return http.delete(`/payments/${id}`);
};

const approve = (id, data) => {
	return http.put(`/payments/approve/${id}`, data);
};

const removeAll = () => {
	return http.delete(`/purchases`);
};

const findByTitle = (title) => {
	return http.get(`/purchases?title=${title}`);
};

const PurchaseService = {
	getAll,
	getAllById,
	get,
	getItems,
	create,
	update,
	remove,
	removeAll,
	findByTitle,
	approve,
};

export default PurchaseService;
