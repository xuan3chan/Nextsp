import React, { useState, useEffect } from 'react';

const OrderTracker = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate progress (replace with your actual tracking logic)
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 10 : 100));
    }, 1000); // Update every 1 second (adjust as needed)

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div
        style={{
          border: '1px solid #ccc',
          height: '30px',
          position: 'relative',
          width: '50%',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            backgroundColor: '#4CAF50',
            height: '100%',
            width: `${progress}%`,
            position: 'absolute',
            transition: 'width 0.3s ease',
          }}
        ></div>
      </div>
      <div style={{ marginTop: '10px' }}>{`${progress}% Completed`}</div>
    </div>
  );
};

export default OrderTracker;
