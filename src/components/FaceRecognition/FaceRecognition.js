import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {
  const borderStyle = {
    top: box.topRow,
    right: box.rightCol,
    bottom: box.bottomRow,
    left: box.leftCol
  }

  return (
    <div className='center'>
      <div style={{marginTop:10, position:'relative'}}>
      <img id="inputImage" src={imageUrl} alt="" style={{paddingBottom: 20, width:500, height:'auto'}}/>
      <div className='bounding-box' style={borderStyle}></div>
      </div>
    </div>
  )
}

export default FaceRecognition