import http from '../http-common';

const getAll = () => {
	return http.get('/purchases/all');
};

const getAllById = (id) => {
	return http.get(`/purchases/all/${id}`);
};

const get = (id) => {
	return http.get(`/purchases/${id}`);
};

const getItems = (id) => {
	return http.get(`/purchases/items/${id}`);
};

const create = (data) => {
	return http.post('/purchases/new', data);
};

const update = (id, data) => {
	return http.put(`/purchases/edit/${id}`, data);
};

const remove = (id) => {
	return http.delete(`/purchases/${id}`);
};

const approve = (id, data) => {
	return http.put(`/purchases/approve/${id}`, data);
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
