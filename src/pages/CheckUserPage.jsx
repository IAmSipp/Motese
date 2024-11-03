import React from 'react'
import { Button } from '../components/button.jsx'
import { Link } from 'react-router-dom'

export const CheckUserPage = () => {
  return (
    <div className='w-screen flex flex-col items-center justify-center min-h-screen space-y-4 bg-[#7077a1]'>
        <Link to="/login">
          <Button width="2/3" text="เคยเล่นเกมนี้มาก่อน ใช้บัญชีผู้เล่นเดิมได้เลย!" />
        </Link>
        <Link to="/register">
          <Button width="2/3" text="ไม่เคยเล่นเกมนี้มาก่อน สมัครที่นี้เลย!" />
        </Link>
        <Link to="/">
            <Button width="2/3" text="กลับหน้าแรก" />    
        </Link>
    </div>
  )
}

export default CheckUserPage;