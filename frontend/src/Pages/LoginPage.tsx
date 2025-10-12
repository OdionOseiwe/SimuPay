import Input from '../Components/Input'
import {Mail, Lock} from 'lucide-react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div className='min-h-screen flex flex-col m-auto mt-20 items-center'>
        <h1 className='text-2xl text-red-600 font-semibold'>SimuPay</h1>
        <div className='px-10 py-5 flex items-center bg-gray-100 rounded-xl flex-col  my-10'>
            <h2 className='text-xl font-bold mt-5 '>Welcome back</h2>
            <p className='text-gray-500 mt-3 '>Please enter your details.</p>
          <div className='mt-10 mb-6'>
            <form action="">
                <Input Icon={Mail} placeholder='enter your email' type='email' />
                <Input Icon={Lock} placeholder='password' type='password' />
                <button className='w-full md:text-xl mt-6 cursor-pointer bg-red-600 rounded-lg py-2 text-white hover:scale-105 transition-all duration-300 hover:-translate-y-1'>sign in</button>

            </form>
          </div>
          <p className='self-start'>Don't have an account? <Link to={'/signup'} className='text-red-600'>Sign up</Link></p>
            
        </div>
    </div>
   
  )
}

export default LoginPage
