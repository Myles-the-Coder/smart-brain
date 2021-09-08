import React from 'react';
import { Button } from 'react-bootstrap';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	const navStyle = {
		display: 'flex',
		justifyContent: 'flex-end',
		padding: '10px',
		cursor: 'pointer',
	};
	if (isSignedIn) {
		return (
			<nav style={navStyle}>
				<Button className='btn' onClick={() => onRouteChange('signout')}>
					Sign Out
				</Button>
			</nav>
		);
	} else {
		return (
			<nav style={navStyle}>
				<Button className='btn' onClick={() => onRouteChange('signin')}>
					Sign In
				</Button>
				<Button className='btn' onClick={() => onRouteChange('register')}>
					Register
				</Button>
			</nav>
		);
	}
};

export default Navigation;
