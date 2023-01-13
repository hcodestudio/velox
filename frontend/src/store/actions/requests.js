import RequestService from '../../services/RequestService';

import { savePurchaseRequest } from '../reducers/requests';

export const createPurchaseRequest = (data) => async (dispatch) => {
	try {
		const res = await RequestService.create(data);

		dispatch(savePurchaseRequest(res.data));

		return Promise.resolve(res.data);
	} catch (err) {
		return Promise.reject(err);
	}
};
