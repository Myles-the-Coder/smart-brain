import React from 'react';
import './ImageLinkForm.css';
import { InputGroup, FormControl, Button, Container } from 'react-bootstrap';

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
	return (
		<Container className='main-container center'>
			<p className='1'>
				{'This Magic Brain will detect faces in your pictures. Give it a try'}
			</p>

			<InputGroup className='mb-3 input-group' onChange={onInputChange}>
				<FormControl
        id="inputField"
					placeholder='Enter Image URL...'
					aria-label='Image-url'
					aria-describedby='basic-addon2'
				/>
				<Button variant='secondary' id='button-addon2' onClick={onSubmit}>
					Detect Faces
				</Button>
			</InputGroup>
		</Container>
	);
};

export default ImageLinkForm;
