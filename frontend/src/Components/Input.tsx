import React from 'react'

type PropsTypes ={
    Icon?:any,
    placeholder:string,
    type: string
    name:string,
    value:string | number,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void

}

function Input({Icon, ...props}: PropsTypes) {
    return (
        <div className='flex items-center space-x-2 my-4'>
            <Icon/>
            <input className='text-gray-600 md:w-100 w-75 border border-gray-300  px-3 py-1 rounded-lg outline-none'{...props} required />
        </div>                
    )
}

export default Input
