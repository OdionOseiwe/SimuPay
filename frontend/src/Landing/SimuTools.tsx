import {Link, Power, CircleCheckBig} from 'lucide-react';

function SimuTools() {
    const Tools=[
        {
            logo:Power,
            heading:"Payment Buttons",
            text:"Create seamless payment experiences for your customer, just at the tap of a button."
        },
        {
            logo:Link,
            heading:"Payment Links",
            text:"Create shareable links to request payments from customers worldwide."
        },
        {
            logo:CircleCheckBig,
            heading:"Payment Checkout",
            text:"Easily collect payments from your customers, anywhere. There, one less thing to worry about."
        },
    ]
  return (
    <section id="Tools" className='text-center md:mx-20 mx-10'>
      <h1 className='md:text-4xl text-2xl font-bold mb-5'>Accept payments and grow your business with our tools</h1>
      <p className='text-red-600 font-light mb-15'>Powerful business tools to give you and your business, lightning speed access to your money and payouts.</p>
      <div className='grid lg:grid-cols-3 gap-10 md:grid-cols-2 grid-cols-1'>
        {
            Tools.map((tool)=>(
                <div className=''>
                    <tool.logo className='mx-auto' size={40}/>
                    <h2 className='text-2xl font-bold my-4'>{tool.heading}</h2>
                    <p className=''>{tool.text}</p>
                </div>
            ))
        }
      </div>
      <div className='md:my-20 my-10 grid md:grid-cols-2 grid-cols-1 gap-5'>
        <div>
            <img src= '../../SimuToolsImage.svg' alt="" />
        </div>
        <div className='flex flex-col justify-center space-y-6'>
            <h1 className='md:text-4xl text-2xl font-bold '>
                All-in-one pricing to cater for your business growth
            </h1>
            <p className=''>Integrate the power of crypto for your business with our flexible pricing and low transaction fees, without breaking the bank.</p>
            <p className='text-red-600'>coming soon...</p>
        </div>
      </div>
     
    </section>
  )
}

export default SimuTools
