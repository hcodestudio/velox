import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Pages from '../pages';
import Login from '../pages/login';
import Register from '../pages/register';
import { setCurrentUser } from '../store/reducers/users';

export default function Root() {
	const dispatch = useDispatch();

	useEffect(() => {
		const session = localStorage.getItem('velox-usersession');
		if (session) {
			dispatch(setCurrentUser(JSON.parse(session)));
		}
	}, [dispatch]);

	return (
		<Switch>
			<Route exact path="/" component={Login} />
			<Route exact path="/register" component={Register} />
			<Route path="/:user/:page" exact component={Pages} />
			<Route path="/:user/:page/:subpage" exact component={Pages} />
			<Route path="/:user/:page" exact component={Pages} />
			<Route path="/:user/:page/:subpage" exact component={Pages} />
			<Route path="/:user/:page/:subpage/:edit" exact component={Pages} />
			<Route
				path="/:user/:page/:subpage/:edit/:id"
				exact
				component={Pages}
			/>
		</Switch>
	);
}
