import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useState } from 'react'

function NavBar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean
  setIsSidebarOpen: (isSidebarOpen: boolean) => void
}) {
  const nav = ['Home', 'Developer', 'Tools', 'Growth']
  const [activeNav, setActiveNav] = useState('Home')

  return (
    <nav
      className={`md:relative fixed z-20 bg-white w-full md:flex md:justify-between p-4 transform transition-all
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <div
        className='flex justify-end p-2 md:hidden'
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <X />
      </div>

      <ol className='md:flex items-center space-x-6 font-light md:mx-10'>
        <li className='text-red-600 font-bold cursor-pointer'>SimuPay</li>

        {nav.map((item, index) => (
          <li
            key={index}
            onClick={() => setActiveNav(item)}
            className={`cursor-pointer px-3 py-2 rounded-md transition-all duration-200 
              ${activeNav === item ? 'bg-red-600 text-white' : 'hover:bg-red-100'}`}
          >
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ol>

      <div className='flex space-x-8 md:py-2 md:mx-10'>
        <Link
          to={'/login'}
          className='bg-red-600 rounded-lg text-white px-4 py-2 hover:-translate-y-0.5 transition-all duration-300'
        >
          Sign in
        </Link>
        <Link
          to={'/signup'}
          className='bg-red-600 rounded-lg text-white px-4 py-2 hover:-translate-y-0.5 transition-all duration-300'
        >
          Sign up
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
