import { combineReducers } from 'redux';
import users, { initialState as usersState } from './users';
import pages, { initialState as pagesState } from './pages';
import requests, { initialState as requestsState } from './requests';

export default combineReducers({
	pages,
	users,
	requests,
});

export const initialStates = {
	pagesState,
	usersState,
	requestsState,
};
