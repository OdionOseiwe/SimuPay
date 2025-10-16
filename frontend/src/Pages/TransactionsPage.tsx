import SideNav from '../layout/SideNav'
import { Copy } from 'lucide-react';
import {useState} from 'react'

type Transaction ={
    Date: string,
    from:string, //Email
    to : string, 
    amount: string,
    transactionType: string,
    reference: string,
}


function TransactionsPage() {

  const transactions: Transaction[] = [
  {
    Date: "2025-10-15T14:32:00Z",
    from: "alice@example.com",
    to: "bob@example.com",
    amount: "120.50",
    transactionType: "Transfer",
    reference: "TXN-001-A1B2C3",
  },
  {
    Date: "2025-10-15T16:10:00Z",
    from: "charlie@example.com",
    to: "david@example.com",
    amount: "75.00",
    transactionType: "Payment",
    reference: "TXN-002-D4E5F6",
  },
  {
    Date: "2025-10-14T10:45:00Z",
    from: "emma@example.com",
    to: "frank@example.com",
    amount: "200.00",
    transactionType: "Withdrawal",
    reference: "TXN-003-G7H8I9",
  },
  {
    Date: "2025-10-13T09:00:00Z",
    from: "grace@example.com",
    to: "helen@example.com",
    amount: "500.25",
    transactionType: "Deposit",
    reference: "TXN-004-J1K2L3",
  },
  {
    Date: "2025-10-12T11:30:00Z",
    from: "ivan@example.com",
    to: "julia@example.com",
    amount: "320.00",
    transactionType: "Transfer",
    reference: "TXN-005-M4N5O6",
  },
  {
    Date: "2025-10-12T18:22:00Z",
    from: "kate@example.com",
    to: "liam@example.com",
    amount: "150.75",
    transactionType: "Payment",
    reference: "TXN-006-P7Q8R9",
  },
  {
    Date: "2025-10-11T08:15:00Z",
    from: "mike@example.com",
    to: "nina@example.com",
    amount: "1000.00",
    transactionType: "Deposit",
    reference: "TXN-007-S1T2U3",
  },
  {
    Date: "2025-10-11T20:10:00Z",
    from: "oliver@example.com",
    to: "paul@example.com",
    amount: "250.00",
    transactionType: "Transfer",
    reference: "TXN-008-V4W5X6",
  },
  {
    Date: "2025-10-10T07:50:00Z",
    from: "quinn@example.com",
    to: "rose@example.com",
    amount: "180.60",
    transactionType: "Payment",
    reference: "TXN-009-Y7Z8A9",
  },
  {
    Date: "2025-10-09T12:05:00Z",
    from: "sam@example.com",
    to: "tina@example.com",
    amount: "400.00",
    transactionType: "Withdrawal",
    reference: "TXN-010-B1C2D3",
  },
];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(transactions.length/itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = transactions.slice(startIndex, startIndex + itemsPerPage)

  const goToPage =(page:number) =>{
    if (page < 1 || page > totalPages) {
      return
    }
    setCurrentPage(page)
  }

  return (
    <div className='flex z-1'>
     <SideNav/>
     <div className='flex flex-col px-8 py-5'>
        <h1 className='text-red-600 text-center text-2xl my-4'>Transactions</h1>
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
               { currentItems.map((currentItem)=>(
                 <tr className='hover:bg-gray-100'>
                   <td className="px-4 py-2  border-b border-gray-200 ">{currentItem.Date}</td>
                   <td className="px-4 py-2  border-b border-gray-200 ">{currentItem.amount}</td>
                   <td className="px-4 py-2  border-b border-gray-200 ">{currentItem.from}</td>
                   <td className="px-4 py-2  border-b border-gray-200 ">{currentItem.to}</td>
                   <td className="px-4 py-2  border-b border-gray-200 ">{currentItem.transactionType}</td>
                   <td className="px-4 py-2  border-b border-gray-200 ">{currentItem.reference}</td>
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
      </div>
    </div>
  )
}

export default TransactionsPage
