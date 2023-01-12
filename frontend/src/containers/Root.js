import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Tutorial from '../components/Tutorial';
import TutorialsList from '../components/TutorialsList';

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
			<Route path="/admin/:page" exact component={Pages} />
			<Route path="/admin/:page/:subpage" exact component={Pages} />
			<Route exact path={['/', '/tutorials']} component={TutorialsList} />
			<Route path="/tutorials/:id" component={Tutorial} />
		</Switch>
	);
}
