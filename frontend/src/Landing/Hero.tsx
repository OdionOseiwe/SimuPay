import React from 'react'
import NavBar from '../layout/NavBar'
import {Link} from 'react-router-dom'

export default function Hero() {
    const heroColor={
        backgroundColor: '#f2f1ed',
    }
  return (
    <section id='Hero' className='min-h-screen'>
      <NavBar/>
        <div style={heroColor}  className='grid md:grid-cols-2 grid-cols-1 gap-5 items-center md:mx-20 mx-10 rounded-xl'>
            <div className='flex flex-col justify-center space-y-6 p-6'>
                <h1 className='md:text-4xl text-2xl md:font-bold font-semibold'>Take your business global in 5 minutes</h1>
                <p className='text-red-600 font-light'> SimuPay helps businesses in Africa get paid by anyone, anywhere in the world</p>
                <Link to={'/signup'} className='lg:w-6/12 md:w-8/12 text-center bg-red-600 rounded-lg py-2 text-white hover:scale-105 transition-all duration-300 hover:-translate-y-1'>Get Started</Link>
            </div>
            <div>
                <img className='w-11/12 bg-transparent' src="https://uploads-ssl.webflow.com/62e3c55a5fb057c5b2954338/62e3cb14af27806aedf19fc7_Rectangle.gif" alt="image" />
            </div>
        </div>
    </section>
  )
}
