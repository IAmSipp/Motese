import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/button.jsx';
import { Form } from '../components/form.jsx';
import { useUser } from '../contexts/UserContext.jsx';

export const LoginPage = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate = useNavigate();
  const { storeUserInfo } = useUser();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await fetch(
        `https://ap-southeast-1.aws.data.mongodb-api.com/app/motese-aqvfblf/endpoint/GetUser?username=${username}&password=${password}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const result = await response.json();
      if (response.ok) {
        setErrorMessage('');
        setSubmitMessage('เข้าสู่ระบบแล้ว...');
        storeUserInfo(result); // Store user info in context

        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      } else {
        setErrorMessage(result.error);
        setSubmitMessage('');
      }
    } catch (error) {
      setErrorMessage("เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ โปรดลองอีกครั้ง");
      setSubmitMessage('');
    }
  };

  return (
    <div className='w-screen h-screen flex flex-col'>
      <div className='flex items-start w-full p-2'>
        <Link to="/checkuser">
          <Button width="w-52" text="ย้อนกลับ" text_size="text-4xl"/>    
        </Link>
      </div>

      <div className='flex flex-col items-center justify-center w-full p-2 h-[100%]'>
        <div className='flex flex-col space-y-3 items-center justify-center bg-purple-950 w-6/12 h-36 rounded-t-3xl'>
          <h1 className='text-6xl text-center w-full px-5 text-white'>เข้าสู่ระบบ</h1>
          {errorMessage && <h1 className="text-red-500 text-2xl">{errorMessage}</h1>} 
          {submitMessage && <h1 className="text-green-500 text-2xl">{submitMessage}</h1>}
        </div>
        <div className='flex flex-col space-y-6 items-center justify-center bg-gray-200 w-6/12 h-80 py-4 rounded-b-3xl'>
          <div className='flex flex-col items-center w-full'>
            <h1 className='text-4xl text-center w-full px-4 text-black'>ใส่ชื่อของคุณ</h1>
            <Form
              placeholder="ใส่ชื่อของคุณ"
              text_size="text-3xl"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          
          <div className='flex flex-col items-center w-full'>
            <h1 className='text-4xl text-center w-full px-4 text-black'>ใส่รหัสของคุณ (ตัวเลข 4 หลัก)</h1>
            <Form
              placeholder="ใส่รหัสของคุณ"
              text_size="text-3xl"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          
          <Button 
            text="ยืนยัน" 
            text_color='text-white' 
            text_size='text-3xl' 
            bg_color='bg-purple-950' 
            py='p-1' 
            width='w-80'
            heigh='h-10'
            rounded='rounded-3xl'
            hover='hover:bg-purple-600 hover:border-pink-950'
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
