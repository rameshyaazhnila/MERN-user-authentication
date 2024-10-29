import React from 'react'

const Input = ({IconComponent,iconStyle,...props}) => {
  return (
    <div className='relative mb-6'>
        <div className='absolute inset-y-0 left-0 pointer-events-none flex items-center'>
          <IconComponent size={41} className={iconStyle}/>
        </div>
        <input className='w-full pl-10 py-1.5 text-black text-xl border border-green-700 rounded-lg bg-opacity-50 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder:text-gray-500' {...props}/>
    </div>
  )
}

export default Input






