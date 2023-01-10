import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar() {
	return (
		<nav className="navbar navbar-expand navbar-dark bg-dark">
			<Link to={'/'} className="navbar-brand">
				Velox Enery Automated Purchase System (VEAPS)
			</Link>
			<div className="navbar-nav mr-auto">
				<li className="nav-item">
					<Link to={'/tutorials'} className="nav-link">
						Tutorials
					</Link>
				</li>
				<li className="nav-item">
					<Link to={'/add'} className="nav-link">
						Add
					</Link>
				</li>
			</div>
		</nav>
	);
}
