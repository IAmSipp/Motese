import React from 'react';

export const Button = ({ 
  text="ข้อความ", 
  text_size='text-6xl', 
  text_color='text-black', 
  bg_color='bg-yellow-100', 
  width='w-96', 
  height='h-auto',
  py='py-4', 
  rounded='rounded-xl',
  hover = 'hover:bg-yellow-500 hover:border-2 hover:border-pink-950',
  onClick 
}) => {
  return (
    <button
      className={`${text_size} ${text_color} ${bg_color} ${width} ${height} ${py} ${rounded} ${hover}`}
      onClick={onClick}
    >
      <h1 className={`text-center font-extrabold ${text_size}`}>{text}</h1>
    </button>
  );
};
