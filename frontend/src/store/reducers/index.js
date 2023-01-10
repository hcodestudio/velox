import { combineReducers } from 'redux';
import currentUser, { initialState as currentUserState } from './currentUser';
import tutorials, { initialState as tutorialState } from './tutorials';

export default combineReducers({
	currentUser,
	tutorials,
});

export const initialStates = {
	currentUserState,
	tutorialState,
};
