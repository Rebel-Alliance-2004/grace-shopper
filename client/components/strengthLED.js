import React from 'react';

const StrengthLED = ({ color, threshhold, strength }) => {
  const calculateOpacity = () => {
    if (strength >= threshhold) {
      return 1;
    }
    return 0.2
  }
  return (
    <div
      style={
        {
          width: '30px',
          height: '20px',
          backgroundColor: color,
          margin: '1em 0.2em 0',
          opacity: calculateOpacity()
        }
      }
    />
  );
}

export default StrengthLED;