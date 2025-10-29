import Input from '../Components/Input'
import {Mail, Lock,Eye,EyeOff} from 'lucide-react'
import { Link ,useNavigate} from 'react-router-dom'
import {useAuthStore,} from '../store/authstore'
import { useState } from 'react'
import toast from 'react-hot-toast';

type formType ={
  email:string,
  password:string,
}

function LoginPage() {
  const {login, isLoading, checkAuth} = useAuthStore();
  const navigate = useNavigate();
  const [eye, setEye] = useState<Boolean>(false)
  const [formData, setFormData] = useState<formType>({
    email:'',
    password:'',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlelogin = async(e: React.FormEvent)=>{
    try {
      e.preventDefault()
      await login(formData.email, formData.password)
      navigate("/dashboard");
      toast.success("welcome here",{ duration: 10000 });
    } catch (error:any) {
      console.log('error loging in ', error);
      toast.error(error.response.data.msg || error.message || "An Error occured",{ duration: 10000 });
    }
  }
  return (
    <div className='min-h-screen flex flex-col m-auto mt-20 items-center'>
        <h1 className='text-2xl text-red-600 font-semibold'>SimuPay</h1>
        <div className='px-10 py-5 flex items-center bg-gray-100 rounded-xl flex-col  my-10'>
            <h2 className='text-xl font-bold mt-5 '>Welcome back</h2>
            <p className='text-gray-500 mt-3 '>Please enter your details.</p>
            
          <div className='mt-10 mb-6'>
            <form action="" onSubmit={handlelogin}>
                <Input onChange={handleChange} Icon={Mail} placeholder='enter your email' type='email' value={formData.email} name= 'email' />
                <div className='flex items-center'>
                    <Input onChange={handleChange}  Icon={Lock} placeholder='password' type={eye ? 'text': 'password'} value={formData.password} name= 'password' /> 
                    {
                      <span className='relative right-10' onClick={()=>setEye(!eye)}>{eye ? <Eye/> : <EyeOff/>}</span>
                    }
                </div>
                
                <button className='w-full md:text-xl mt-6 cursor-pointer bg-red-600 rounded-lg py-2 text-white hover:scale-105 transition-all duration-300 hover:-translate-y-1'>{isLoading ? "signing in...": "sign in"}</button>
            </form>
          </div>
          <p className='self-start'>Don't have an account? <Link to={'/signup'} className='text-red-600'>Sign up</Link></p>
            
        </div>
    </div>
   
  )
}

export default LoginPage
