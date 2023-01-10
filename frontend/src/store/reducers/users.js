import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	users: [],
	userGroups: [],
	userPermissions: [],
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		saveUser: (state, action) => {
			state.users = [...state.users, ...action.payload];
		},
		saveUsers: (state, action) => {
			state.users = [...action.payload];
		},
	},
});

// Action creators are generated for each case reducer function
export const { saveUser, saveUsers } = usersSlice.actions;

export default usersSlice.reducer;
