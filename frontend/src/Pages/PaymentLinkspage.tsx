import SideNav from '../layout/SideNav'
import { Copy } from 'lucide-react';
import {useState, useEffect} from 'react'
import {usePaymentStore} from "../store/paymentstore"

function PaymentLinkspage() {
  const {getAllPaymentLinks,links} = usePaymentStore()

    useEffect(()=>{
      getAllPaymentLinks()
    }, [])
    
    const [copied, setCopied] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(links.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = links.slice(startIndex, startIndex + itemsPerPage);

    const handleCopy = (link:string) => {
      navigator.clipboard.writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
    };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };


  return (
    <div className='flex z-1 '>
        <SideNav/>
        <div className='p-8'>
            <div className='flex justify-between mb-8'>
                <h1>Payment links</h1>
                <button className="bg-red-600 text-white rounded-xs py-1 px-4">
                    new payment Link
                </button>
            </div>
            {
              links.length != 0 ? 
              <div className="">
              <table className="min-w-full">
                <thead className="bg-gray-300 py-2">
                  <tr>
                    <th className="px-4 py-2 ">payment name</th>
                    <th className="px-4 py-2 ">Amount</th>
                    <th className="px-4 py-2 ">description</th>
                    <th className="px-4 py-2 ">paymentLink</th>
                    <th className="px-4 py-2 ">paymentRef</th>
                    <th className="px-4 py-2 ">createdAt</th>

                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((payment, index) => (
                    <tr key={index} className="border-b border-b-gray-300 hover:bg-gray-100">
                      <td className="px-4 py-2 max-w-50  truncate">{payment.paymentName}</td>
                      <td className="px-4 py-2 ">{payment.minimumAmountForPayment}</td>
                      <td 
                        className="px-4 py-2  max-w-xs truncate" 
                        title={payment.paymentDescription} // hover full decription shows
                      >
                        {payment.paymentDescription}
                      </td>
                        <td className="px-4 py-2 ">
                            <a className='border-2 border-gray-600 p-1' href={payment.paymentLink} >
                                preview page
                            </a>
                            <button className='text-xs px-1' onClick={()=>handleCopy(payment.paymentLink)}>
                                <Copy size={15}/>
                                {copied ? "Copied!" : "Copy"}
                            </button>
                            </td>
                        <td className="px-4 py-2 max-w-3 truncate">{payment.paymentRef}</td>
                        <td className="px-4 py-2 ">{new Date(payment.createdAt).toLocaleDateString('en-US')}</td>
                  
                    </tr>
                  ))}
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
            </div>  : 
            <h1 className='text-3xl text-center'>
              no payment links created yet
            </h1>
            }
            
        </div>
    </div>
  )
}

export default PaymentLinkspage
