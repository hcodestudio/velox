import PurchaseService from '../../services/PurchaseService';

import {
	savePurchaseRequest,
	savePurchases,
	setPurchaseStatus,
} from '../reducers/requests';

export const createPurchaseRequest = (data) => async (dispatch) => {
	try {
		const res = await PurchaseService.create(data);

		dispatch(savePurchaseRequest(res.data));

		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const getPurchases = (data) => async (dispatch) => {
	try {
		let res;

		if (data.admin) {
			res = await PurchaseService.getAll();
		} else {
			res = await PurchaseService.getAllById(data.id);
		}

		dispatch(savePurchases(res.data));
	} catch (err) {
		console.log(err);
	}
};

export const getItemsByPurchaseId = (id) => async (dispatch) => {
	try {
		const res = await PurchaseService.getItems(id);

		return Promise.resolve(res.data);
	} catch (err) {
		console.log(err);
	}
};

export const getPurchaseById = (id) => async (dispatch) => {
	try {
		const res = await PurchaseService.get(id);

		return Promise.resolve(res.data);
	} catch (err) {
		console.log(err);
	}
};

export const updatePurchase = (id, data) => async (dispatch) => {
	try {
		const res = await PurchaseService.update(id, data);

		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const approvePurchaseRequest = (id, data) => async (dispatch) => {
	try {
		const res = await PurchaseService.approve(id, data);

		dispatch(setPurchaseStatus(data));

		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};
