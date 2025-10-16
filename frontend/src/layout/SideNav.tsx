import { ChevronDown } from 'lucide-react';

function SideNav() {
  return (
    <div className='bg-gray-200 p-4 w-50 min-h-screen'>
        <div className="flex items-center space-x-2">
            <p className="rounded-full bg-red-600 w-10 h-10 text-white text-center text-3xl font-light">O</p>
            <p className='font-light text-gray-600'>OdionTech</p>
            <ChevronDown size={15} className='text-blue-500'/>
        </div>
      <ol className='py-8 text-gray-500 text-2xl flex flex-col space-y-2'>
        <li>Home</li>
        <li>Transactions</li>
        <li>Payment links</li>
        <li>Wallet</li>
      </ol>
    </div>
  )
}

export default SideNav
