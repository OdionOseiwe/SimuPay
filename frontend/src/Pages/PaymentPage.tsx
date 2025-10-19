import Input from '../Components/Input'
import {Mail, User,Coins} from 'lucide-react'
import { useState } from 'react'
function PaymentPage() {
    const [formData, setFormData] = useState({
        email:'',
        fullname:'',
        amount:'',
    })
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]:value}))
    }
  return (
    <div className='min-h-screen flex flex-col m-auto items-center bg-slate-900 p-10 '>
        <h1 className='text-gray-400 text-2xl font-semibold pb-6'>TechOdion Enterprice</h1>
        <h3 className='text-gray-400 font-extralight text-lg pb-6'>Payment for acceptance fees</h3>
        <div className=' w-2/6 bg-white p-8 rounded-2xl shadow-2xl ' >
        <form action="">

            <Input onChange={handleChange} Icon={User} type='text' name='fullname' placeholder='Full Name' value={formData.fullname} />
            <Input onChange={handleChange} Icon={Mail} type='email' name='email' placeholder='Email' value={formData.email} />
            <Input onChange={handleChange} Icon={Coins} type='number' name='amount' placeholder='Amount' value={formData.amount} />
            <p className="text-xs text-gray-500 mt-1">
                Amount should be above <span className="font-semibold"> 10000 Naira</span> 
            </p>
            <button type='submit' className="w-full md:text-xl mt-6 cursor-pointer bg-red-600 rounded-lg py-2 text-white hover:scale-105 transition-all duration-300 hover:-translate-y-1">
                Pay now
            </button>
        </form>
        </div>
    </div>
  )
}

export default PaymentPage
