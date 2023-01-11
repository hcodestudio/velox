import { combineReducers } from 'redux';
import tutorials, { initialState as tutorialState } from './tutorials';
import users, { initialState as usersState } from './users';
import pages, { initialState as pagesState } from './pages';

export default combineReducers({
	tutorials,
	pages,
	users,
});

export const initialStates = {
	tutorialState,
	pagesState,
	usersState,
};
