import SideNav from '../layout/SideNav'
import { Menu, Loader } from 'lucide-react';
import {useState,useEffect} from 'react'
import {useTransactionStore} from "../store/transactionstore"


function TransactionsPage() {
  const {transactions,getUserTransactions, loading} = useTransactionStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // for mobile toggle

  const sent = transactions?.sent || [];
  const received = transactions?.received || [];

  // Merge sent and received transactions and sort them by newest first
  // numbers are sorted using this logic (a,b) => a - b
  
  const allTransactions = [...sent, ...received].sort((a,b)=> {
    return new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate()
  })  
  
  useEffect(()=>{
    getUserTransactions()
  }, [])

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages =  Math.ceil(allTransactions.length/itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = allTransactions.slice(startIndex, startIndex + itemsPerPage);

  const goToPage =(page:number) =>{
    if (page < 1 || page > totalPages) {
      return
    }
    setCurrentPage(page)
  }

  if(loading){
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={50} color="red" className="animate-spin" />
      </div>
    )
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

      {
          loading && (
            <div className="flex justify-center items-center h-screen">
              <Loader size={50} color="red" className="animate-spin" />
            </div>
          )     
        }
     <div className='flex flex-col px-8 py-5'>
        <h1 className='text-red-600 text-center text-2xl my-4'>Transactions</h1>
        
        { allTransactions.length != 0 ?
          <div>
            <table>
              <thead>
                   <tr className='py-8 px-4 bg-gray-300 '>
                     <td className="px-4 py-2  font-bold">Date</td>
                     <td className="px-4 py-2  font-bold">From</td>
                     <td className="px-4 py-2  font-bold">To</td>
                     <td className="px-4 py-2  font-bold">Amount</td>
                     <td className="px-4 py-2  font-bold">Transaction Type</td>
                     <td className="px-4 py-2  font-bold">Reference no</td>
                   </tr>
                </thead>
                <tbody>
                   {currentItems.map((currentItem)=>(
                     <tr className='hover:bg-gray-100'>
                       <td className="px-4 py-2  border-b border-gray-200 ">{new Date(currentItem.createdAt).toLocaleDateString('en-US')}</td>
                       <td className="px-4 py-2  border-b border-gray-200 ">{currentItem.from}</td>
                       <td className="px-4 py-2  border-b border-gray-200 ">{currentItem.to}</td>
                       <td className="px-4 py-2  border-b border-gray-200 ">{currentItem.amount}</td>
                       <td className="px-4 py-2  border-b border-gray-200 ">{currentItem.transactionType}</td>
                       <td className="px-4 py-2  border-b border-gray-200 "><span className='border-2 border-gray-600 shadow-lg cursor-pointer p-1 block'>{currentItem.reference}</span></td>
                     </tr>
                   ))  
                 
                   }
              </tbody>
            </table>
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>
            
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div> : 
          <div className='md:text-3xl text-xl text-center'>
            No transactions yet
          </div>
        }
        
      </div>
    </div>
  )
}

export default TransactionsPage
