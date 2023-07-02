import React from 'react'

const GalleryPhoto = ({ id, image, name, onChange }) => {
  return (
    <div className='gallery-photo'>
      <div className='gallery-photo__container'><img src={`${process.env.REACT_APP_AWS_URL}/${image}`} alt={name}></img></div>

      <div id={id} data-side='left' className='arrow arrow-left' onClick={onChange}>
        <span className="fas fa-arrow-left"></span>
      </div>
      <div id={id} data-side='right' className='arrow arrow-right' onClick={onChange}>
        <span className="fas fa-arrow-right"></span>
      </div>
    </div>
  )
}

export default GalleryPhoto