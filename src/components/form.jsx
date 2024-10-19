import React from 'react';

export const Form = ({ placeholder, name, size, text_size, value, onChange }) => {
  return (
    <div>
      <input 
        type="text" 
        placeholder={placeholder} 
        name={name}
        value={value}
        onChange={onChange}
        className={`text-black text-${text_size} border-0 rounded-xl bg-gray-400 px-3 py-1 w-${size} placeholder-gray-100`}
      />
    </div>
  );
}

export default Form;
