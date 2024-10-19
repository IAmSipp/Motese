import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/button.jsx';
import { Form } from '../components/form.jsx';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState, // Keep the existing values
      [name]: value, // Update the specific field
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length !== 4 || isNaN(formData.password)) {
      setErrorMessage('รหัสควรมีแค่ตัวเลข 4 ตัว');
      console.log(errorMessage);
    } else {
      console.log('เข้าสู่ระบบแล้ว..', formData);
      setErrorMessage('');
    }
  };

  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='flex items-start w-full p-2 h-[10%]'>
        <Link to="/checkuser">
          <Button width="6" text="ย้อนกลับ" text_size="4xl"/>    
        </Link>
      </div>

      <div className='flex flex-col items-center justify-center w-full p-2 h-[95%]'>
        <div className='flex items-center justify-center bg-purple-900 w-6/12 h-28 rounded-t-3xl'>
          <h1 className='text-6xl text-center w-full px-5 text-white'>เข้าสู่ระบบ</h1>
        </div>
        <div className='flex flex-col space-y-6 items-center justify-center bg-gray-200 w-6/12 h-80 py-4 rounded-b-3xl'>
          <div className=' flex flex-col items-center w-full'>
            <h1 className='text-4xl text-center w-full px-4 text-black'>ใส่ชื่อของคุณ</h1>
            <Form
              placeholder="ใส่ชื่อของคุณ"
              size="96"
              text_size="3xl"
              name="username"
              value={formData.username || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className=' flex flex-col items-center w-full'>
            <h1 className='text-4xl text-center w-full px-4 text-black'>ใส่รหัสของคุณ (ตัวเลข 4 หลัก)</h1>
            <Form
              placeholder="ใส่รหัสของคุณ"
              size="96"
              text_size="3xl"
              name="password"
              value={formData.password || ''}
              onChange={handleInputChange}
            />
          </div>
          
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <Button 
            text="ยืนยัน" 
            text_color='white' 
            text_size='4xl' 
            bg_color='purple-900' 
            py='1' 
            width='80' 
            hover_bg_color='yellow-500' 
            hover_border_color='pink-950'
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
