import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

function SideNav() {
  return (
    <div className='bg-gray-200 p-4 w-50 min-h-screen'>
        <div className="flex items-center space-x-2">
            <p className="rounded-full bg-red-600 w-10 h-10 text-white text-center text-3xl font-light">O</p>
            <p className='font-light text-gray-600'>OdionTech</p>
            <ChevronDown size={15} className='text-blue-500'/>
        </div>
      <div className='py-8 text-gray-500 text-xl flex flex-col space-y-2'>
        <Link to= {'/dashboard'}>Home</Link>
        <Link to= {'/transactions'}>Transactions</Link>
        <Link to ={'/links'}>Payment Links</Link>
        <Link to= {'/wallet'}>Wallet</Link>
      </div>
    </div>
  )
}

export default SideNav
