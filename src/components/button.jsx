import React from 'react'
import { sizeClasses } from './size';

export const Button = ({text, size}) => {
  return (
    <div>
        <button className={`
        text-black bg-yellow-100 w-${size} py-5
        hover:border-2 hover:bg-yellow-500 hover:border-pink-950`
        }>
            <h1 className='font-extrabold'>{text}</h1>
        </button>
    </div>
  )
}
