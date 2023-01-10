import { combineReducers } from 'redux';
import currentUser, { initialState as currentUserState } from './currentUser';
import tutorials, { initialState as tutorialState } from './tutorials';
import users, { initialState as usersState } from './users';

export default combineReducers({
	currentUser,
	tutorials,
	users,
});

export const initialStates = {
	currentUserState,
	tutorialState,
	usersState,
};
