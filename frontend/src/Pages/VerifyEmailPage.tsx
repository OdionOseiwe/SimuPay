import Input from '../Components/Input'
import {ShieldCheck, RefreshCw} from 'lucide-react'
import { useState } from 'react'
import {useAuthStore,} from '../store/authstore'
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'



function VerifyEmailPage() {
  const [code , setCode] = useState<string>('')
  const {verifyEmail, isLoading} = useAuthStore();
  const navigate = useNavigate()

    const handleVerifyEmail = async(e:React.ChangeEvent<HTMLInputElement>)=>{
      e.preventDefault();
      try {
        await verifyEmail(code)
        navigate('/login');
        toast.success("email verified",{ duration: 10000 });
      } catch (error) {
       console.log('error verifying email ', error);
       toast.error(error.message,{ duration: 10000 });
      }
    }

  return (
    <div className='min-h-screen flex w-2/6 flex-col m-auto mt-20 items-center'>
        <div className='px-10 py-5 flex items-center bg-gray-100 rounded-xl flex-col  my-10'>
            <h1 className='md:text-2xl text-xl font-semibold'>Verify your Email Address</h1>
            <p className='text-gray-500 mt-3 '>A verification code has been sent to your email</p>
            <div className='mt-10 mb-6'>
                <p>Please Check your inbox and enter the verification code below to verify your email address. The code will expire in 2 minutes</p>
                <form action="">
                    <Input Icon={ShieldCheck}  placeholder='enter code' type='number'name='code' value={code} onChange={(e)=>setCode(e.target.value)}/>
                    <button onClick={(e)=> handleVerifyEmail(e)} className='w-full md:text-xl  mt-6 cursor-pointer bg-red-600 rounded-lg py-2 text-white hover:scale-105 transition-all duration-300 hover:-translate-y-1'>{isLoading ? "verifying email ":"verify"}</button>
                </form>
            </div> 
            <a href="" className='text-red-600 flex self-start space-x-2'><RefreshCw/> <span>Resend code</span> </a>       
        </div>
    </div>
   
  )
}

export default VerifyEmailPage
