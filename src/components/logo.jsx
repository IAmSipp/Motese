import React from 'react'
import { sizeClasses } from './size';

export const Logo = ({ size }) => {
  return (
    <div>
        <img src="../../public/Images/Motese Logo.png" alt="" className={`w-${size}`}/>
    </div>
  )
}
