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
		savePurchases: (state, action) => {
			state.purchases = [...action.payload];
		},
		setPurchaseStatus: (state, action) => {
			const idx = state.purchases.findIndex(
				(p) => p.id === Number(action.payload.id)
			);

			getPurchaseByIdx(state, idx).status = action.payload.status;
		},
	},
});

export const getPurchaseByIdx = (state, idx) => state.purchases[idx] ?? {};

// Action creators are generated for each case reducer function
export const { savePurchaseRequest, savePurchases, setPurchaseStatus } =
	requestsSlice.actions;

export default requestsSlice.reducer;
