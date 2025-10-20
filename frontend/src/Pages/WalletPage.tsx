import { useState } from 'react';
import SideNav from '../layout/SideNav'
import AddFunds from '../Modals/AddFunds';

function WalletPage() {
  const [openFundsModals, setOpenFundsModals] = useState(false);

  return (
    <div className='flex z-1'>
     <SideNav/>
      <div className='py-6 px-12 w-full'>
        <div className='rounded-2xl flex justify-between bg-red-50 p-6 shadow-lg items-center'>
          <div>
              <p className='text-2xl font-semibold text-gray-500'>
                &#x20A6; {0.00}
              </p>
              <p className='text-gray-400 font-light text-lg'>
                Available Balance
              </p>
          </div>
          
            <button onClick={()=> setOpenFundsModals(!openFundsModals)} className="px-8 md:text-xl mt-6 cursor-pointer bg-red-600 rounded-lg py-2 text-white transition-all duration-300 hover:-translate-y-1">
              + Fund Wallet
            </button>        
        </div>
        {
          openFundsModals && <AddFunds/>
        }
        <div className='grid lg:grid-cols-2 gap-10'>
          <div className='mt-14' >
            <h2 className='bg-red-600 p-4 rounded-t-xl text-white text-xl font-semibold'  >Withdraw Funds</h2>
            <form className='flex flex-col p-8 rounded-b-xl border border-gray-300' action="">
              <label htmlFor="" className='mb-1'>account number</label>
              <input
                className="text-gray-600 w-full  mb-4 border border-gray-300  px-3  py-3 rounded-lg outline-none"
                // onChange={}
                placeholder="account number"
                type="text"
                value={''}
                name="accountNumber"
                required
              />
              <label htmlFor="" className='mb-1'>Bank</label>
              <input
                className="text-gray-600 w-full  mb-4 border border-gray-300  px-3  py-3 rounded-lg outline-none"
                // onChange={}
                placeholder=" Bank name"
                type="text"
                value={''}
                name="bankName"
                required
              />
              <label htmlFor="" className='mb-1'>account Name</label>
              <input
                className="text-gray-600 w-full  mb-4 border border-gray-300  px-3  py-3 rounded-lg outline-none"
                // onChange={}
                placeholder=" Account Name"
                type="text"
                value={''}
                name="accountName"
                required
              />
              <label htmlFor="" className='mb-1'>amount</label>
              <input
                className="text-gray-600 w-full  mb-4 border border-gray-300  px-3  py-3 rounded-lg outline-none"
                // onChange={}
                placeholder=" amount"
                type="text"
                value={''}
                name="amount"
                required
              />
              <label htmlFor="" className='mb-1'>description</label>
              <input
                className="text-gray-600 w-full  mb-4 border border-gray-300  px-3  py-3 rounded-lg outline-none"
                // onChange={}
                placeholder="description"
                type="text"
                value={''}
                name="amount"
                required
              />
              <button className='w-full md:text-xl mt-6 cursor-pointer bg-red-600 rounded-lg py-2 text-white hover:scale-105 transition-all duration-300 hover:-translate-y-1'>withdraw</button>           
            </form>
          </div>
          <div className='flex flex-col mt-14'>
            <h2 className='bg-red-600 p-4 rounded-t-xl text-white text-xl font-semibold'  >Transfer Funds</h2>
            <form action="" className='flex flex-col p-10 rounded-b-xl border border-gray-300' >
              <label htmlFor="" className='mb-1'>User Name</label>
              <input
                className="text-gray-600 w-full border border-gray-300 mb-4  px-3  py-3 rounded-lg outline-none"
                // onChange={}
                placeholder="User name"
                type="text"
                value={''}
                name="userName"
                required
              /> 
             <label htmlFor="" className='mb-1'>amount</label>
              <input
                className="text-gray-600 w-full border border-gray-300 mb-4  px-3  py-3 rounded-lg outline-none"
                // onChange={}
                placeholder="amount"
                type="number"
                value={''}
                name="amount"
                required
              />   
              <button className='w-full md:text-xl mt-6 cursor-pointer bg-red-600 rounded-lg py-2 text-white hover:scale-105 transition-all duration-300 hover:-translate-y-1'>Transfer</button>           
            </form>
              
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletPage
