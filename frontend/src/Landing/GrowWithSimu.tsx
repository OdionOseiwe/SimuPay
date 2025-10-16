import React from 'react'
import { Globe, Wallet,WalletMinimal } from 'lucide-react';


function GrowWithSimu() {
    const growths=[
        {
            logo:WalletMinimal,
            heading:"Accept payments",
            text:"Receive payments from your customers. Get paid the way you choose."
        },
        {
            logo:Wallet,
            heading:"Business Wallet",
            text:"Get equiped with a secure wallet to accept and manage your money in one place."
        },
        {
            logo:Globe,
            heading:"Global Payout",
            text:"Don’t just get paid, easily withdraw your earnings whenever you want it."
        },
    ]
  return (
    <section id="Growth" className='text-center md:my-30 my-20 md:mx-20 mx-10'>
      <h1 className='md:text-4xl text-2xl font-bold mb-5'>Grow with SimuPay</h1>
      <p className='text-red-600 font-light mb-15'>SimuPay does not only help you to accept payments, we are here to open your business up to the world.</p>
      <div className='grid lg:grid-cols-3 gap-10 md:grid-cols-2 grid-cols-1'>
        {
            growths.map((grow)=>(
                <div className='bg-red-50 hover:bg-red-100 rounded-xl py-10 px-6 transition-all duration-200'>
                    <grow.logo className='mx-auto' size={40}/>
                    <h2 className='text-2xl font-bold my-4'>{grow.heading}</h2>
                    <p className=''>{grow.text}</p>
                </div>
            ))
        }
      </div>
     
    </section>
  )
}

export default GrowWithSimu
