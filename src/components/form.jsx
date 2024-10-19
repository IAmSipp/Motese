import React from 'react';

export const Form = ({ 
  placeholder_text = 'Enter text', 
  name, 
  value, 
  onChange, 
  text_size='text-6xl', 
  text_color='text-black', 
  bg_color='bg-gray-400', 
  width='w-96',
  height='h-auto',
  py = 'py-2', 
  px = 'px-2', 
  rounded = 'rounded-xl', 
  placeholder_text_size = 'placeholder:text-xl', 
  placeholder_color = 'placeholder:text-gray-100',
}) => {
  return (
      <input 
        type="text" 
        placeholder={placeholder_text} 
        name={name}
        value={value}
        onChange={onChange}
        className={`
          ${text_size} 
          ${text_color} 
          ${bg_color} 
          ${width} 
          ${height} 
          ${px} 
          ${py} 
          ${rounded} 
          ${placeholder_text_size}
          ${placeholder_color}
        `}
      />
  );
};

export default Form;
