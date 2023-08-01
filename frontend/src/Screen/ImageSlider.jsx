/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  const images = [
    'https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlJTIwc3BhY2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    'https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?cs=srgb&dl=pexels-karl-solano-2883049.jpg&fm=jpg',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8dmlydHVhbCUyMG9mZmljZXxlbnwwfHwwfHw%3D&w=1000&q=80',
    'https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG9mZmljZSUyMGJ1aWxkaW5nfGVufDB8fDB8fHww&w=1000&q=80'
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="slider">
      <img
        src={images[currentSlide]}
        style={{ width: '330px', height: '500px',borderRadius:'10px' }}
      />
    </div>
  );
};

export default ImageSlider;