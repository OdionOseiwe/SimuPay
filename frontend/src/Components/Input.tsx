import React from 'react'

type PropsTypes ={
    Icon?:any,
    placeholder:string,
    type: string
}

function Input({Icon, ...props}: PropsTypes) {
    return (
        <div className='flex items-center space-x-2 my-4'>
            <Icon/>
            <input className='text-gray-600 w-100 border border-gray-300  px-3 py-1 rounded-l outline-none'{...props} required />
        </div>                
    )
}

export default Input
