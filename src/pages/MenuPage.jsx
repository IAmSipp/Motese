import React from 'react';
import { Logo } from '../components/logo.jsx';
import { Button } from '../components/button.jsx';
import { Link } from 'react-router-dom';

export const MenuPage = () => {
  return (
    <div className='w-screen flex flex-col items-center justify-center min-h-screen space-y-4'>
      <Logo size="96" />
      <Link to="/checkuser">
        <Button size="96" text="เริ่มเกม" />
      </Link>
      <Button size="96" text="ออกเกม" />
    </div>
  );
};

export default MenuPage;