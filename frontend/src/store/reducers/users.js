import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
	currentUser: {},
	users: [],
	userGroups: [],
	userPermissions: [],
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload;
		},
		saveUser: (state, action) => {
			state.users = [...state.users, action.payload];
		},
		saveUsers: (state, action) => {
			state.users = [...action.payload];
		},
	},
});

// Action creators are generated for each case reducer function
export const { setCurrentUser, saveUser, saveUsers } = usersSlice.actions;

export default usersSlice.reducer;
