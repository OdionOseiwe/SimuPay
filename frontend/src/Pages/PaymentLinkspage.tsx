import SideNav from '../layout/SideNav'
import { Copy } from 'lucide-react';
import {useState} from 'react'

type Payment ={
    creatorId: string,
    walletId:string,
    paymentName : string,
    minimumAmountForPayment: string,
    paymentDescription: string,
    paymentLink: string,
    paymentRef:string,
    createdAt: string
}

function PaymentLinkspage() {
    const randomDate = () => {
        const daysAgo = Math.floor(Math.random() * 90);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return date.toISOString();
    };

    const payments: Payment[]= [
      {
        creatorId: "creator_101",
        walletId: "wallet_8472",
        paymentName: "Monthly Subscription mgmvncvjnjhvbknmnjmxhnbxkchjiod",
        minimumAmountForPayment: "25.00",
        paymentDescription: "  Recurring payment for monthly premium plan accessRecurring payment for monthly premium plan accessRecurring payment for monthly premium plan accessRecurring payment for monthly premium plan accessRecurring payment for monthly premium plan access.",
        paymentLink: "https://pay.example.com/subscription-premium",
        paymentRef: "REF82549888888888888888888883",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_204",
        walletId: "wallet_6721",
        paymentName: "Event Ticket Purchase",
        minimumAmountForPayment: "45.50",
        paymentDescription: "Payment for concert ticket on December 15th.",
        paymentLink: "https://pay.example.com/ticket-concert",
        paymentRef: "REF128593",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_332",
        walletId: "wallet_9983",
        paymentName: "E-book Purchase",
        minimumAmountForPayment: "9.99",
        paymentDescription: "Purchase payment for 'Mastering Web3 Development'.",
        paymentLink: "https://pay.example.com/ebook-web3",
        paymentRef: "REF457261",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_510",
        walletId: "wallet_1425",
        paymentName: "Online Course Access",
        minimumAmountForPayment: "59.00",
        paymentDescription: "Full access to React + TypeScript Bootcamp.",
        paymentLink: "https://pay.example.com/course-react",
        paymentRef: "REF692084",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_678",
        walletId: "wallet_2749",
        paymentName: "Freelance Project Payment",
        minimumAmountForPayment: "120.00",
        paymentDescription: "Initial payment for UI/UX design project.",
        paymentLink: "https://pay.example.com/project-uiux",
        paymentRef: "REF384712",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_895",
        walletId: "wallet_3508",
        paymentName: "Software License Renewal",
        minimumAmountForPayment: "79.99",
        paymentDescription: "Annual renewal for software development toolkit.",
        paymentLink: "https://pay.example.com/license-renewal",
        paymentRef: "REF958213",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_417",
        walletId: "wallet_7320",
        paymentName: "Donation Support",
        minimumAmountForPayment: "15.00",
        paymentDescription: "Support independent open-source development.",
        paymentLink: "https://pay.example.com/donate-open-source",
        paymentRef: "REF472310",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_903",
        walletId: "wallet_1042",
        paymentName: "Consultation Fee",
        minimumAmountForPayment: "60.00",
        paymentDescription: "Payment for 1-hour business consultation session.",
        paymentLink: "https://pay.example.com/consult-session",
        paymentRef: "REF319574",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_276",
        walletId: "wallet_5824",
        paymentName: "Membership Upgrade",
        minimumAmountForPayment: "35.50",
        paymentDescription: "Upgrade from Basic to Gold Membership tier.",
        paymentLink: "https://pay.example.com/membership-upgrade",
        paymentRef: "REF826945",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_541",
        walletId: "wallet_9301",
        paymentName: "Product Purchase",
        minimumAmountForPayment: "22.75",
        paymentDescription: "Payment for physical product: Smart Water Bottle.",
        paymentLink: "https://pay.example.com/product-bottle",
        paymentRef: "REF164208",
        createdAt: randomDate()
      },
       {
        creatorId: "creator_101",
        walletId: "wallet_8472",
        paymentName: "Monthly Subscription",
        minimumAmountForPayment: "25.00",
        paymentDescription: "Recurring payment for monthly premium plan access.",
        paymentLink: "https://pay.example.com/subscription-premium",
        paymentRef: "REF825493",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_204",
        walletId: "wallet_6721",
        paymentName: "Event Ticket Purchase",
        minimumAmountForPayment: "45.50",
        paymentDescription: "Payment for concert ticket on December 15th.",
        paymentLink: "https://pay.example.com/ticket-concert",
        paymentRef: "REF128593",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_332",
        walletId: "wallet_9983",
        paymentName: "E-book Purchase",
        minimumAmountForPayment: "9.99",
        paymentDescription: "Purchase payment for 'Mastering Web3 Development'.",
        paymentLink: "https://pay.example.com/ebook-web3",
        paymentRef: "REF457261",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_510",
        walletId: "wallet_1425",
        paymentName: "Online Course Access",
        minimumAmountForPayment: "59.00",
        paymentDescription: "Full access to React + TypeScript Bootcamp.",
        paymentLink: "https://pay.example.com/course-react",
        paymentRef: "REF692084",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_678",
        walletId: "wallet_2749",
        paymentName: "Freelance Project Payment",
        minimumAmountForPayment: "120.00",
        paymentDescription: "Initial payment for UI/UX design project.",
        paymentLink: "https://pay.example.com/project-uiux",
        paymentRef: "REF384712",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_895",
        walletId: "wallet_3508",
        paymentName: "Software License Renewal",
        minimumAmountForPayment: "79.99",
        paymentDescription: "Annual renewal for software development toolkit.",
        paymentLink: "https://pay.example.com/license-renewal",
        paymentRef: "REF958213",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_417",
        walletId: "wallet_7320",
        paymentName: "Donation Support",
        minimumAmountForPayment: "15.00",
        paymentDescription: "Support independent open-source development.",
        paymentLink: "https://pay.example.com/donate-open-source",
        paymentRef: "REF472310",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_903",
        walletId: "wallet_1042",
        paymentName: "Consultation Fee",
        minimumAmountForPayment: "60.00",
        paymentDescription: "Payment for 1-hour business consultation session.",
        paymentLink: "https://pay.example.com/consult-session",
        paymentRef: "REF319574",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_276",
        walletId: "wallet_5824",
        paymentName: "Membership Upgrade",
        minimumAmountForPayment: "35.50",
        paymentDescription: "Upgrade from Basic to Gold Membership tier.",
        paymentLink: "https://pay.example.com/membership-upgrade",
        paymentRef: "REF826945",
        createdAt: randomDate()
      },
      {
        creatorId: "creator_541",
        walletId: "wallet_9301",
        paymentName: "Product Purchase",
        minimumAmountForPayment: "22.75",
        paymentDescription: "Payment for physical product: Smart Water Bottle.",
        paymentLink: "https://pay.example.com/product-bottle",
        paymentRef: "REF164208",
        createdAt: randomDate()
      }
    ];

    const [copied, setCopied] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(payments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = payments.slice(startIndex, startIndex + itemsPerPage);

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
                        <td className="px-4 py-2 ">{payment.createdAt}</td>
                  
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
            </div>   
        </div>
    </div>
  )
}

export default PaymentLinkspage
