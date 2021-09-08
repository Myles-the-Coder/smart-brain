import React from 'react';
import './SignIn.css';
import { Form, Button } from 'react-bootstrap';

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (e) => {
    this.setState({signInEmail: e.target.value})
  }

  onPasswordChange = (e) => {
    this.setState({signInPassword: e.target.value})
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.id) {
        this.props.loadUser(data)
        this.props.onRouteChange('home')
      }
    })
  }

  render() {
  
  const {onRouteChange} = this.props
  const {onEmailChange, onPasswordChange, onSubmitSignIn} = this
  
	return (
		<div className='center'>
			<div className='form'>
				<h3>Sign In</h3>
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
					onClick={onSubmitSignIn}>
					Sign In
				</Button>

				<h6 className='pt-3 sign-up' onClick={() => onRouteChange('register')}>Register</h6>
			</div>
		</div>
	);
};
}
export default SignIn;
