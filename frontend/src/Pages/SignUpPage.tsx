import { useState } from 'react'
import Input from '../Components/Input'
import { Mail, Lock, User, EyeOff, Eye } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authstore'
import toast from 'react-hot-toast'

type formType = {
  email: string
  password: string
  BusinessName: string
}

function SignUpPage() {
  const { signUp, isLoading } = useAuthStore()
  const navigate = useNavigate()
  const [eye, setEye] = useState<Boolean>(false)
  const [formData, setFormData] = useState<formType>({
    email: '',
    password: '',
    BusinessName: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    const { email, password, BusinessName } = formData

    // Check if any field is empty
    if (!email || !password || !BusinessName) {
      toast.error('Please fill in all fields', { duration: 5000 })
      return
    }

    // Check password length
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long', { duration: 5000 })
      return
    }

    // Check password complexity: must contain both letters and numbers
    const hasLetter = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)

    if (!hasLetter || !hasNumber) {
      toast.error('Password must contain both letters and numbers', { duration: 5000 })
      return
    }

    try {
      await signUp(email, password, BusinessName)
      toast.success('Code sent to your email', { duration: 5000 })
      navigate('/verify-email')
    } catch (error: any) {
      console.log('Error signing up:', error)
       toast.error(error.response.data.msg || error.message || "An Error occured", { duration: 5000 })
    }
  }

  return (
    <div className="min-h-screen flex flex-col m-auto mt-20 items-center">
      <h1 className="text-2xl text-red-600 font-semibold">SimuPay</h1>
      <div className="px-10 py-5 flex items-center bg-gray-100 rounded-xl flex-col my-10">
        <h2 className="text-xl font-bold mt-5">Create your account</h2>
        <p className="text-gray-500 mt-3">Please fill in the form to create an account.</p>

        <div className="mt-10 mb-6 w-full">
          <form onSubmit={handleSignUp}>
            <Input
              Icon={Mail}
              placeholder="Enter your email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              Icon={User}
              placeholder="Enter Business Name"
              type="text"
              name="BusinessName"
              value={formData.BusinessName}
              onChange={handleChange}
            />
            <div>
               <div className='flex items-center'>
                    <Input onChange={handleChange}  Icon={Lock} placeholder='password' type={eye ? 'text': 'password'} value={formData.password} name= 'password' /> 
                    {
                      <span className='relative right-10' onClick={()=>setEye(!eye)}>{eye ? <Eye/> : <EyeOff/>}</span>
                    }
                </div>
              <p className="text-xs text-gray-500 mt-1">
                Password must be at least <span className="font-semibold">6 characters</span> long and contain both
                <span className="font-semibold"> letters</span> and <span className="font-semibold">numbers</span>.
              </p>
            </div>
            <button
              type="submit"
              className="w-full md:text-xl mt-6 cursor-pointer bg-red-600 rounded-lg py-2 text-white hover:scale-105 transition-all duration-300 hover:-translate-y-1"
            >
              {isLoading ? 'Signing up...' : 'Create Account'}
            </button>
          </form>
        </div>

        <p className="self-start">
          Have an account? <Link to="/login" className="text-red-600">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUpPage
