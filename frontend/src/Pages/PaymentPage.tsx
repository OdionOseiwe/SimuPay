import Input from '../Components/Input'
import {Mail, User,Coins} from 'lucide-react'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTransactionStore } from '../store/transactionstore'
import { usePaymentStore } from '../store/paymentstore'

function PaymentPage() {
    const paymentReference = useParams()
    
    const {payWithPaymentLink,loading} = useTransactionStore();
    const {getPaymentByRef, paymentDetails} = usePaymentStore()
    const [formData, setFormData] = useState({
        fromEmail:'',
        from:'',
        amount:0,
        paymentRef: paymentReference.paymentRef
    })    

    useEffect(()=>{
        getPaymentByRef(paymentReference.paymentRef)
    }, [])

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]:value}))
    }

    console.log(formData);
    
    const handlePay = async(e:React.FormEvent) =>{
        e.preventDefault();
        try {
            await payWithPaymentLink({...formData});
            toast.success("Payment successful", {duration:10000});
        } catch (error:any) {
            console.log("error", error);
            toast.error(error.response.data.msg || "Error while paying" , {duration:10000})
        }
    }

  return (
    <div className='min-h-screen flex flex-col m-auto items-center bg-slate-900 p-10 '>
        <h1 className='text-gray-400 text-2xl font-semibold pb-6'>{paymentDetails?.paymentName}</h1>
        <h3 className='text-gray-400 font-extralight text-lg pb-6'>{paymentDetails?.paymentDescription}</h3>
        <div className=' bg-white md:p-8 p-4 rounded-2xl shadow-2xl ' >
        <form onSubmit={handlePay} action="">

            <Input onChange={handleChange} Icon={User} type='text' name='from' placeholder='Business Name' value={formData.from} />
            <Input onChange={handleChange} Icon={Mail} type='email' name='fromEmail' placeholder='Email' value={formData.fromEmail} />
            <Input onChange={handleChange} Icon={Coins} type='number' name='amount' placeholder='Amount' value={formData.amount} />
            <p className="text-xs text-gray-500 mt-1">
                Amount should be above <span className="font-semibold"> {paymentDetails?.minimumAmountForPayment} Naira</span> 
            </p>
            <button disabled={loading} type='submit' className="w-full md:text-xl mt-6 cursor-pointer bg-red-600 rounded-lg py-2 text-white hover:scale-105 transition-all duration-300 hover:-translate-y-1">
                {loading ? 'processing...' : 'Pay Now'}
            </button>
        </form>
        </div>
    </div>
  )
}

export default PaymentPage
