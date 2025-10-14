import Input from '../Components/Input'
import {Mail, Lock, User} from 'lucide-react'
import { Link ,useNavigate} from 'react-router-dom'
import {useAuthStore,} from '../store/authstore'
import { useState } from 'react'
import toast from 'react-hot-toast';

type formType ={
  email:string,
  password:string,
  BusinessName:string,
}


function SignUpPage() {
  const {signUp, isLoading} = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formType>({
    email:'',
    password:'',
    BusinessName:''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSignUp = async(e: React.ChangeEvent<HTMLInputElement>)=>{
    try {
      e.preventDefault()
      await signUp(formData.email, formData.password, formData.BusinessName)
      navigate('/verify-email');
      toast.success("code sent to your email",{ duration: 10000 });
    } catch (error) {
      console.log('error signin up ', error);
      toast.error(error.message,{ duration: 10000 });
    }
  }
  return (
    <div className='min-h-screen flex flex-col m-auto mt-20 items-center'>
        <h1 className='text-2xl text-red-600 font-semibold'>SimuPay</h1>
        <div className='px-10 py-5 flex items-center bg-gray-100 rounded-xl flex-col  my-10'>
            <h2 className='text-xl font-bold mt-5 '>Create your account</h2>
            <p className='text-gray-500 mt-3 '>Please fill in the form to create an account.</p>
          <div className='mt-10 mb-6'>
            <form action="">
                <Input  Icon={Mail} placeholder='enter your email' type='email' name='email' value={formData.email} onChange={handleChange}/>
                <Input Icon={User} placeholder='enter Business Name' type='text' name='BusinessName' value={formData.BusinessName} onChange={handleChange}/>
                <Input Icon={Lock} placeholder='password' type='password' name='password' value={formData.password} onChange={handleChange} />
                <button onClick={(e)=>handleSignUp(e)} className='w-full md:text-xl mt-6 cursor-pointer bg-red-600 rounded-lg py-2 text-white hover:scale-105 transition-all duration-300 hover:-translate-y-1'>{isLoading ? "signin up": "create account"}</button>
            </form>
          </div>
          <p className='self-start'>Have an account? <Link to={'/login'} className='text-red-600'>Log in</Link></p>
            
        </div>
    </div>
   
  )
}

export default SignUpPage
