import React from 'react';
// import './SignIn.css';
import { Form, Button } from 'react-bootstrap';

class Registration extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			name: '',
		};
	}

	onNameChange = e => {
		this.setState({ name: e.target.value });
	};

	onEmailChange = e => {
		this.setState({ email: e.target.value });
	};

	onPasswordChange = e => {
		this.setState({ password: e.target.value });
	};

	onSubmitSignIn = () => {
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({
				email: this.state.email,
				password: this.state.password,
        name: this.state.name
			}),
		})
			.then(res => res.json())
			.then(user => {
				if (user.id) {
          this.props.loadUser(user)
					this.props.onRouteChange('home');
				}
			});
	};
	render() {
		const { onRouteChange } = this.props;
		const { onNameChange, onEmailChange, onPasswordChange } = this;

		return (
			<div className='center'>
				<div className='form'>
					<h3>Register</h3>

					<Form.Group className='mb-3 w-75'>
						<Form.Label>Name</Form.Label>
						<Form.Control
							className='input'
							type='text'
							placeholder='Enter Name...'
							id='Name'
							onChange={onNameChange}
							required
						/>
					</Form.Group>

					<Form.Group className='mb-3 w-75'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							className='input'
							type='email'
							placeholder='Enter Email...'
							id='email'
							onChange={onEmailChange}
							required
						/>
					</Form.Group>

					<Form.Group className='mb-3 w-75'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							className='input'
							type='password'
							placeholder='Enter Password...'
							id='password'
							onChange={onPasswordChange}
							required
						/>
					</Form.Group>

					<Button
						className='sign-in-btn'
						variant='primary'
						type='submit'
						onClick={this.onSubmitSignIn}>
						Register
					</Button>
				</div>
			</div>
		);
	}
}
export default Registration;
