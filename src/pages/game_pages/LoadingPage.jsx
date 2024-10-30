import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-[#7077a1] z-50">
      <div className="w-full h-full flex items-center justify-center text-white text-6xl">กำลังโหลด...</div>
    </div>
  );
};

export default LoadingScreen;
