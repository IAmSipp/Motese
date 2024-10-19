import React from 'react';
import { text_size_class } from './size';

export const Button = ({ 
  text="ข้อความ", text_size='6xl', 
  text_color='black', bg_color='yellow-100', 
  width='96', py='4',
  onClick
}) => {
  const text_size_format = text_size_class[text_size];

  return (
    <div>
      <button
        className={`text-${text_color} 
        bg-${bg_color} w-${width} py-${py} 
        hover:border-2 hover:bg-yellow-500 hover:border-pink-950`}
        onClick={onClick}
      >
        <h1 className={`font-extrabold ${text_size_format}`}>{text}</h1>
      </button>
    </div>
  );
};
