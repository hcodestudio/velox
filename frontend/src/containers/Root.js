import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Tutorial from '../components/Tutorial';
import TutorialsList from '../components/TutorialsList';

import Pages from '../pages';
import Login from '../pages/login';

export default function Root() {
	return (
		<Switch>
			<Route exact path="/" component={Login} />
			<Route path="/admin/:page" exact component={Pages} />
			<Route path="/admin/:page/:subpage" exact component={Pages} />
			<Route exact path={['/', '/tutorials']} component={TutorialsList} />
			<Route path="/tutorials/:id" component={Tutorial} />
		</Switch>
	);
}
