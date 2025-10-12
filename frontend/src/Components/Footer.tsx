import React from 'react'
import {HandCoins,Linkedin, Github,Twitter} from 'lucide-react'

function Footer() {
  return (
    <div className='bg-gray-900 text-gray-400 mt-20 '>
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl m-auto p-4 py-8'>
        <div className=''>
            <div className='flex items-center gap-2'>
                <p className='text-xl font-bold'>Simupay</p>
                <HandCoins/>
            </div>
            <p className='font-semibold mt-3'>About Simupay</p>
            <p className='font-light mt-3'>
              Simupay app  helps businesses in Africa get paid by anyone, anywhere in the world
            </p>

            <div className='flex mt-10'>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                <Twitter size={18} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                <Linkedin size={18} className="text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-200">
                <Github size={18} className="text-white" />
              </a>
                  
            </div>
            
        </div>
        <div>
          <h1 className='font-semibold text-xl mb-3'>Contact</h1>
          <p className='font-light'>
            support@Simupay.xyz
          </p>
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='font-semibold text-xl mb-3 '>Quick Links</h1>
          <a href="#Hero">Home</a>
          <a href="#Tools">Tools</a>
          <a href="#Growth">Growth</a>
          <a href="#">Developer</a>
        </div>
        <div>
          <h1 className='font-semibold text-xl mb-3'>Legal</h1>
          <p>Terms of Serve</p>
          <p>Privacy Policy</p>
        </div>
      </div>
      <div className='py-10 text-gray-500  text-center border-t-1 border-gray-700'>
        Copyright © 2025 Simupay 

      </div>
    </div>
   
  )
}

export default Footer
