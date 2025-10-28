import {useAuthStore} from '../store/authstore'
import toast from 'react-hot-toast'
import { useNavigate} from 'react-router-dom'


export default function UserProfile() {
  const {logout, user} = useAuthStore();
    const navigate = useNavigate();

  const handleLogout = async()=>{
    try {
      await logout();
      toast.success('Logged out sucessfully', {duration:10000});
      navigate('/login');
    } catch (error) {
      toast.error('Error: Try again', {duration:10000});
    }
  }
  return (
      <div className="inset-0 absolute top-6 w-1/6 h-2/6 pt-4  m-8 text-gray-700  bg-white rounded-2xl shadow-2xl  
        transform transition-all duration-700 ease-in-out">
        <h1 className=" text-center text-xl font-semibold">{user.BusinessName}</h1>
        <h3 className="pb-4 text-center text-xs font-extralight">{user.email}</h3>
        <div className="font-light">
          <h3 className="border-t border-t-gray-300 pl-3 py-2 hover:bg-gray-200 transition-all duration-300 cursor-pointer">User Id: <span>123456</span></h3>
          <h3 className=" pl-3 py-2 hover:bg-gray-200 transition-all duration-300 cursor-pointer">Developer Guide</h3>
          <h3 className=" pl-3 py-2 hover:bg-gray-200 transition-all duration-300 cursor-pointer">Support</h3>
          <h3 onClick={handleLogout} className="font-semibold border-t border-t-gray-300 pl-3 py-3  hover:bg-gray-200 transition-all duration-300 cursor-pointer">logout</h3>
        </div>
      </div>
  )
}