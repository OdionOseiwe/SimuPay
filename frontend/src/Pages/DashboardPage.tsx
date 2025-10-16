import SideNav from '../layout/SideNav'
import { CreditCard,ReceiptText,Receipt } from 'lucide-react';

function DashboardPage() {
  const payments =[
    {
      image:CreditCard,
      title:'Receive payment',
      message:'Create a payment link in just a few clicks and share the link with your customers no code required.',
      button:'create payment link'
    },
     {
      image:ReceiptText,
      title:'Create and send invoices',
      message:'Create and send professional invoices easily, get paid and track payment with simupay invoicing.',
      button:'coming soon...'
    },
    {
      image:Receipt,
      title:'Start selling online',
      message:'Create a free online store that helps you find customers, accept payments from anyone.',
      button:'coming soon...'
    },
  ]
  return (
    <div className='flex'>
     <SideNav/>
     <div className='grid grid-cols-3 px-10 gap-4  items-center'>
      {
        payments.map((payment, index)=>(
          <div className='w-70 h-70 border  border-gray-100 p-4'>
            <payment.image className='text-red-600'/>
            <p className='my-3 font-semibold'>{payment.title}</p>
            <p className='  text-gray-400 my-3'>{payment.message}</p>
            <button className='border-1 rounded-xs p-1 w-full'>{payment.button}</button>
          </div>
        ))
      }
     </div>
    </div>
  )
}

export default DashboardPage
