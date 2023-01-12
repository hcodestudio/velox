import { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
	class HOC extends Component {
		componentDidMount() {
			var session = localStorage.getItem('velox-usersession');

			if (!this.props.currentUser.id && !session) {
				this.props.history.push('/');
			}
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	return withRouter(connect(mapStateToProps)(HOC));
};

const mapStateToProps = ({ users }) => {
	return {
		currentUser: users.currentUser,
	};
};

export default withAuth;
