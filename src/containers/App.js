import './App.css';
import React from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import SignIn from '../components/SignIn/SignIn';
import Registration from '../components/Registration/Registration';

const app = new Clarifai.App({
	apiKey: 'abd4009541f84f4f963d6d37541a9f0e',
});

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			input: '',
			imageUrl: '',
			box: {},
			route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        password: '',
        email: '',
        entries: 0,
        joined: ''
      }
		};
	}

	calculateFaceLocation = data => {
		const clarifaiFace =
			data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById('inputImage');
		const width = Number(image.width);
		const height = Number(image.height);

		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - clarifaiFace.right_col * width,
			bottomRow: height - clarifaiFace.bottom_row * height,
		};
	};

	displayFaceBox = box => {
		this.setState({ box: box });
	};

	onInputChange = e => {
		this.setState({ input: e.target.value });
	};

	onSubmit = () => {
		const inputField = document.getElementById('inputField');

		this.setState({ imageUrl: this.state.input });
		app.models
			.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
			.then(res => {
        if(res) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type' : 'application/json'} ,
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(res => res.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
        }
        this.displayFaceBox(this.calculateFaceLocation(res))
      }
        )
			.catch(err => console.error(err));
		inputField.value = '';
	};

	onRouteChange = route => {
    if(route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
		this.setState({ route: route });
	};

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        password: data.password,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

	render() {
    const {isSignedIn, imageUrl, route, box} = this.state

		const particlesOptions = {
			number: {
				value: 30,
				density: {
					enable: true,
					value_area: 800,
				},
			},
		};

		return (
			<div className='App'>
				<Particles params={particlesOptions} className='particles' />
				<Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
				{route === 'home' ? (
					<div>
						<Logo />
						<Rank name={this.state.user.name} entries={this.state.user.entries}/>
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onSubmit={this.onSubmit}
						/>
						<FaceRecognition
							box={box}
							imageUrl={imageUrl}
						/>
					</div>
				) : route === 'signin' ? (
					<SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
				) : (
					<Registration onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
				)}
			</div>
		);
	}
}

export default App;