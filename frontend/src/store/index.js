import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import reducers, { initialStates } from './reducers';

const { currentUserState, tutorialState } = initialStates;

const initialState = {
	currentUser: { ...currentUserState },
	tutorials: [...tutorialState],
};

const middleware = [thunk];

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
