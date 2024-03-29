import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';
import store from './store';
import Root from './containers/Root';
import './index.css';

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<Route component={Root} />
		</Router>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
