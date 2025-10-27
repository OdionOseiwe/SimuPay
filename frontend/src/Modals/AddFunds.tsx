import { WalletMinimal } from 'lucide-react';

export default function AddFunds() {
  return (
      <div className="inset-0 absolute top-30 left-10/12 w-1/6 h-2/6 flex flex-col items-center py-6 px-4 text-gray-700  bg-white rounded-2xl shadow-2xl  
        transform transition-all duration-700 ease-in-out">
        <WalletMinimal size={50} className='bg-transparent text-clip text-red-600'/>
        <h1 className=" text-xs mt-3">Add Money to your Wallet</h1>
        <form action="" className='flex flex-col w-full mt-4'>
            <input
            className="text-gray-600 text-xs border border-gray-300  p-2 rounded-lg outline-none"
            // onChange={}
            placeholder="enter amount to be added to wallet"
            type="number"
            value={''}
            name="amount"
            required
            />
            <button className='self-center w-4/6 mt-8 cursor-pointer  bg-red-600 rounded-lg py-2 text-white hover:scale-105 transition-all duration-300 hover:-translate-y-1'>Add Funds</button>           
        </form>

      </div>
  )
}