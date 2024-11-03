import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/button.jsx';
import { Form } from '../components/form.jsx';
import { useUser } from '../contexts/UserContext.jsx';

export const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', password1: '', password2: '' });
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
    const { username, password1, password2 } = formData;
    const passwordPattern = /^\d{4}$/;

    if (!passwordPattern.test(password1)) {
      setErrorMessage('รหัสผ่านต้องเป็นตัวเลข 4 หลัก');
      setSubmitMessage('');
      return;
    }

    if (password1 !== password2) {
      setErrorMessage('รหัสผ่านไม่ตรงกัน โปรดลองอีกครั้ง');
      setSubmitMessage('');
      return;
    }

    const data = { username, password: password1 };

    try {
      const response = await fetch(
        'https://ap-southeast-1.aws.data.mongodb-api.com/app/motese-aqvfblf/endpoint/PostUser',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setErrorMessage('');
        setSubmitMessage(result.message);
        storeUserInfo(result.user);

        setTimeout(() => {
          navigate('/checkuser');
        }, 2000);
      } else {
        setErrorMessage(result.error);
        setSubmitMessage('');
      }
    } catch (error) {
      setErrorMessage('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์ โปรดลองอีกครั้ง');
      setSubmitMessage('');
    }
  };

  return (
    <div className='w-screen h-screen flex flex-col bg-[#7077a1]'>
      <div className="flex items-start w-full p-2 xl:h-[15%] 2xl:h-[10%]">
        <Link to="/checkuser">
          <Button width="xl:w-72 2xl:w-96" text="ย้อนกลับ" text_size="xl:text-5xl 2xl:text-6xl" />
        </Link>
      </div>

      <div className='flex flex-col items-center justify-center w-full p-2 h-full font-semibold'>
        <div className='flex flex-col space-y-3 items-center justify-center bg-orange-500 xl:w-6/12 xl:h-1/6 
        2xl:w-6/12 2xl:h-[25%] rounded-t-3xl'>
          <h1 className='xl:text-6xl 2xl:text-8xl text-center w-full px-5 text-white'>สมัครสมาชิก</h1>
          {errorMessage && <h1 className="text-red-500 xl:text-2xl 2xl:text-3xl font-semibold">{errorMessage}</h1>}
          {submitMessage && <h1 className="text-green-500xl:text-2xl 2xl:text-3xl font-semibold">{submitMessage}</h1>}
        </div>
        <div className='flex flex-col space-y-3 items-center justify-center bg-gray-200 xl:w-6/12 xl:h-4/6 
        2xl:w-6/12 2xl:h-6/6 py-4 rounded-b-3xl'>
          <div className='flex flex-col items-center w-full'>
            <h1 className='xl:text-4xl 2xl:text-6xl text-center w-full px-4 text-black 2xl:my-3'>ใส่ชื่อของคุณ</h1>
            <Form
              placeholder_text="ใส่ชื่อของคุณ"
              text_size="xl:text-3xl 2xl:text-5xl font-semibold"
              placeholder_text_size='xl:placeholder:text-2xl 2xl:placeholder:text-5xl'
              name="username"
              width='w-4/6'
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>

          <div className='flex flex-col items-center w-full'>
            <h1 className='xl:text-4xl 2xl:text-6xl text-center w-full px-4 text-black 2xl:my-3'>ใส่รหัสผ่านของคุณ (ตัวเลข 4 หลัก)</h1>
            <Form
              placeholder_text="ใส่รหัสผ่านของคุณ"
              text_size="xl:text-3xl 2xl:text-5xl font-semibold"
              placeholder_text_size='xl:placeholder:text-2xl 2xl:placeholder:text-5xl'
              width='w-4/6'
              name="password1"
              value={formData.password1}
              onChange={handleInputChange}
            />
          </div>

          <div className='flex flex-col items-center w-full'>
            <h1 className='xl:text-4xl 2xl:text-6xl text-center w-full px-4 text-black 2xl:my-3'>ยืนยันรหัสผ่านของคุณ</h1>
            <Form
              placeholder_text="ยืนยันรหัสของคุณ"
              text_size="xl:text-3xl 2xl:text-5xl font-semibold"
              placeholder_text_size='xl:placeholder:text-2xl 2xl:placeholder:text-5xl'
              name="password2"
              width='w-4/6'
              value={formData.password2}
              onChange={handleInputChange}
            />
          </div>

          <Button
            text="สมัครสมาชิก"
            text_color='text-white'
            text_size='text-3xl'
            bg_color='bg-orange-500'
            py='p-1'
            width='w-80'
            heigh='h-10'
            rounded='rounded-3xl'
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;