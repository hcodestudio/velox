import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	purchases: [],
};

export const requestsSlice = createSlice({
	name: 'requests',
	initialState,
	reducers: {
		savePurchaseRequest: (state, action) => {
			state.purchases = [...state.purchases, action.payload];
		},
	},
});

// Action creators are generated for each case reducer function
export const { savePurchaseRequest } = requestsSlice.actions;

export default requestsSlice.reducer;
