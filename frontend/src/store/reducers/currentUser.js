import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	userGroup: 'admin',
};

export const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		setFirstLoad: (state, action) => {
			state.firstLoad = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setFirstLoad } = currentUserSlice.actions;

export default currentUserSlice.reducer;
