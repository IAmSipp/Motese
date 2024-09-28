import React from 'react';
import { sizeClasses, textSizeClasses } from './size';

export const Form = ({ placeholder, name, size, text_size }) => {
  return (
    <div>
      <input 
        type="text" 
        placeholder={placeholder} 
        name={name}
        className={`text-black text-${text_size} border-0 rounded-xl bg-gray-300 px-3 py-1 w-${size}`}
      />
    </div>
  );
}

export default Form;
