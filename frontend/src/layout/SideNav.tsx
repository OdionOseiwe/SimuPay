import { ChevronDown, ChevronUp,User, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import UserProfile from "../Modals/User";
import { useState } from 'react';
import {useAuthStore,} from '../store/authstore'

function SideNav({ isOpen, onClose }:{isOpen:boolean, onClose: () => void}) {
  const [user, openUser] = useState(false)
  const {user:userInfo} = useAuthStore();
  
  return (
    <div 
      className={`bg-gray-200 p-4 w-64 min-h-screen fixed md:relative z-20 transition-transform transform
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <div className='flex justify-end p-2 md:hidden' onClick={onClose}>
        <X/>
      </div>
        <div className="flex items-center space-x-2 ">
            <p className="rounded-full bg-red-600 w-10 h-10 text-white flex justify-center items-center text-3xl font-light"><User/></p>
            <p className='font-light text-gray-600'>{userInfo.BusinessName}</p>
            <div onClick={()=>openUser(!user)}>
             {user ?<ChevronUp  size={15} className='text-blue-500 cursor-pointer'/> :<ChevronDown  size={15} className='text-blue-500 cursor-pointer'/>} 
            </div>

        </div>
            {
              user && <UserProfile/>
            }
      <div className='py-8 text-gray-500 text-xl flex flex-col space-y-2'>
        <NavLink 
        className={({ isActive }) => isActive ? 'bg-gray-400 text-black p-2 ' : ''} 
        to= {'/dashboard'}>Home</NavLink>
        <NavLink 
        className={({ isActive }) => isActive ? 'bg-gray-400 text-black p-2 ' : ''}  
        to= {'/transactions'}>Transactions</NavLink>
        <NavLink 
        className={({ isActive }) => isActive ? 'bg-gray-400 text-black p-2 ' : ''}  
        to ={'/links'}>Payment Links</NavLink>
        <NavLink 
        className={({ isActive }) => isActive ? 'bg-gray-400 text-black p-2 ' : ''}  
        to= {'/wallet'}>Wallet</NavLink>
      </div>
    </div>
  )
}

export default SideNav
