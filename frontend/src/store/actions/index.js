import axios from 'axios';

export const normalAction = (payload, type) => {
	return { type, payload };
};

export const promisedAction = (payload, type) => (dispatch) => {
	dispatch({ type, payload });
	return Promise.resolve();
};

export const postAction = (formData, callback) => () => {
	axios
		.post(formData.get('action'), formData)
		.then((response) => {
			callback(response);
		})
		.catch((error) => {
			console.log(error);
		});
};
