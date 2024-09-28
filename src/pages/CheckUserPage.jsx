import React from 'react'
import { Button } from '../components/button.jsx'
import { Link } from 'react-router-dom'

export const CheckUserPage = () => {
  return (
    <div className='w-screen flex flex-col items-center justify-center min-h-screen space-y-4'>
        <Button size="2/3" text="เคยเล่นเกมนี้มาก่อน ใช้บัญชีผู้เล่นเดิมได้เลย!" />
        <Button size="2/3" text="ไม่เคยเล่นเกมนี้มาก่อน สมัครที่นี้เลย!" />
        <Link to="/">
            <Button size="2/3" text="กลับหน้าแรก" />    
        </Link>
    </div>
  )
}

export default CheckUserPage;