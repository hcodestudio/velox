import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	userGroup: 'admin',
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setFirstLoad: (state, action) => {
			state.firstLoad = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setFirstLoad } = usersSlice.actions;

export default usersSlice.reducer;
