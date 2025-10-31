import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="text-xl text-gray-200">Loading log data...</div>
    </div>
  );
};

export default LoadingState;