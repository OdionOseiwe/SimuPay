import { useEffect, useState } from 'react';
import SideNav from '../layout/SideNav'
import AddFunds from '../Modals/AddFunds';
import {useWalletStore} from "../store/walletstore"
import toast from "react-hot-toast";
import { Menu } from 'lucide-react';

function WalletPage() {
  const [openFundsModals, setOpenFundsModals] = useState(false);
  const {balance,getWalletBalance,transferToWallet,withdrawFromWallet,transferLoading, withdrawalloading} = useWalletStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // for mobile toggle
  const [transferFormData, setTransferFormData] = useState({
    userName:'',
    amount:0
  })

  const [withdrawFormData, setWithdrawFormData] = useState({
    amount:0,
    bankName:'',
    accountName:'',
    accountNumber:0,
    description:'',

  })    

  const onChangeTransferData = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name,value} = e.target
    setTransferFormData((prev) => ({...prev, [name]:value}))
  }

  const onChangeWithdrawData = (e:React.ChangeEvent<HTMLInputElement>) =>{
    const {name,value} = e.target
    setWithdrawFormData((prev) => ({...prev, [name]:value}))
  }

  useEffect(() =>{
    getWalletBalance();
  }, [])

  const transfer = async(e:React.FormEvent) =>{
    e.preventDefault();
    try{
      await transferToWallet({...transferFormData});
      toast.success("Transfer successful",{ duration: 10000 });
       setTransferFormData({
        userName:'',
        amount:0
      })
    }catch(error:any){
      console.log("error Transfer", error);
      toast.error(error?.response?.data?.msg || "Error transfering funds")
    }
  }

  const withdraw = async(e:React.FormEvent) =>{
    e.preventDefault();
    try{
      await withdrawFromWallet({...withdrawFormData})
      setWithdrawFormData({
        accountNumber:0,
        bankName:'',
        accountName:'',
        description:'',
        amount:0
      })
      toast.success("withdrawal successful",{ duration: 10000 });
    }catch(error:any){
      console.log("error Transfer", error);
      toast.error(error.response.data.msg || error.message  || "Error Withdrawing funds")
    }
  }

  return (
    <div className='flex z-1'>
      <div className="md:hidden py-4 pl-2" 
          onClick={() => setIsSidebarOpen(true)}>
        <Menu size={30} color="red"  />
      </div>
      <SideNav
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
        {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-1 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
      <div className='py-6 md:px-12 px-3 w-full'>
        <div className='rounded-2xl flex justify-between p-6 shadow-lg items-center'>
          <div>
              <p className=' md:text-2xl text-xl font-semibold text-gray-500'>
                &#x20A6; {balance.toLocaleString()}
              </p>
              <p className='text-gray-400 font-light text-lg'>
                Available Balance
              </p>
          </div>
          
            <button onClick={()=> setOpenFundsModals(!openFundsModals)} className="md:px-8 px-4 md:text-xl mt-6 cursor-pointer bg-red-600 rounded-lg py-2 text-white transition-all duration-300 hover:-translate-y-1">
              + Fund Wallet
            </button>        
        </div>
        {
          openFundsModals && <AddFunds/>
        }
        <div className='grid lg:grid-cols-2 gap-10'>
          <div className='mt-14' >
            <h2 className='bg-red-600 p-4 rounded-t-xl text-white text-xl font-semibold'  >Withdraw Funds</h2>
            <form onSubmit={withdraw} className='flex flex-col p-8 rounded-b-xl border border-gray-300' action="">
              <label htmlFor="" className='mb-1'>account number</label>
              <input
                className="text-gray-600 w-full  mb-4 border border-gray-300  px-3  py-3 rounded-lg outline-none"
                onChange={onChangeWithdrawData}
                placeholder="account number"
                type="text"
                value={withdrawFormData.accountNumber}
                name="accountNumber"
                required
              />
              <label htmlFor="" className='mb-1'>Bank</label>
              <input
                className="text-gray-600 w-full  mb-4 border border-gray-300  px-3  py-3 rounded-lg outline-none"
                onChange={onChangeWithdrawData}
                placeholder=" Bank name"
                type="text"
                value={withdrawFormData.bankName}
                name="bankName"
                required
              />
              <label htmlFor="" className='mb-1'>account Name</label>
              <input
                className="text-gray-600 w-full  mb-4 border border-gray-300  px-3  py-3 rounded-lg outline-none"
                onChange={onChangeWithdrawData}
                placeholder=" Account Name"
                type="text"
                value={withdrawFormData.accountName}
                name="accountName"
                required
              />
              <label htmlFor="" className='mb-1'>amount</label>
              <input
                className="text-gray-600 w-full  mb-4 border border-gray-300  px-3  py-3 rounded-lg outline-none"
                onChange={onChangeWithdrawData}
                placeholder=" amount"
                type="text"
                value={withdrawFormData.amount}
                name="amount"
                required
              />
              <label htmlFor="" className='mb-1'>description</label>
              <input
                className="text-gray-600 w-full  mb-4 border border-gray-300  px-3  py-3 rounded-lg outline-none"
                onChange={onChangeWithdrawData}
                placeholder="description"
                type="text"
                value={withdrawFormData.description}
                name="description"
                required
              />
              <button className='w-full md:text-xl mt-6 cursor-pointer bg-red-600 rounded-lg py-2 text-white hover:scale-105 transition-all duration-300 hover:-translate-y-1'>{withdrawalloading ? "withdrawing":"withdraw"}</button>           
            </form>
          </div>
          <div className='flex flex-col mt-14'>
            <h2 className='bg-red-600 p-4 rounded-t-xl text-white text-xl font-semibold'  >Transfer Funds</h2>
            <form onSubmit={transfer} action="" className='flex flex-col p-10 rounded-b-xl border border-gray-300' >
              <label htmlFor="" className='mb-1'>Business Name</label>
              <input
                className="text-gray-600 w-full border border-gray-300 mb-4  px-3  py-3 rounded-lg outline-none"
                onChange={onChangeTransferData}
                placeholder="Business Name"
                type="text"
                value={transferFormData.userName}
                name="userName"
                required
              /> 
             <label htmlFor="" className='mb-1'>amount</label>
              <input
                className="text-gray-600 w-full border border-gray-300 mb-4  px-3  py-3 rounded-lg outline-none"
                onChange={onChangeTransferData}
                placeholder="amount"
                type="number"
                value={transferFormData.amount}
                name="amount"
                required
              />   
              <button className='w-full md:text-xl mt-6 cursor-pointer bg-red-600 rounded-lg py-2 text-white hover:scale-105 transition-all duration-300 hover:-translate-y-1'>{transferLoading ? "transferring": "transfer"}</button>           
            </form>
              
          </div>
        </div>
      </div>
    </div>
  )
}

export default WalletPage
