import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	current: {},
};

export const pagesSlice = createSlice({
	name: 'pages',
	initialState,
	reducers: {
		updateCurrentPage: (state, action) => {
			state.current = { ...action.payload };
		},
	},
});

// Action creators are generated for each case reducer function
export const { updateCurrentPage } = pagesSlice.actions;

export default pagesSlice.reducer;
