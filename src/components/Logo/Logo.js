import React from 'react'
import Tilt from 'react-tilt'
import brain from './brain-logo.png'
import './Logo.css'

const Logo = () => {
	return (
    <div className="logo-container">
      <Tilt className="Tilt" options={{max: 50}} style={{height: 150, width: 150}}>
        <div className="Tilt-inner"><img src={brain} alt="brain-logo" /></div>
        <p>SmartBrain</p>
      </Tilt>
    </div>
	);
};

export default Logo