import {Link} from 'react-router-dom'
function NavBar() {
    const nav = [
        'Home', 'Developer', 'Tools', 'Growth'
    ]
  return (
    <nav className='flex justify-between p-4'>
      <ol className='flex space-x-6 font-light my-2 mx-10'>
        <li className='text-red-600 font-bold cursor-pointer'>SimuPay</li>
        {
            nav.map((item, index)=>(
                <li key={index} className=' cursor-pointer hover:text-red-600 transition-all duration-200'> <a href={`#${item}`}>{item}</a> </li>
            ))
        }
        {/* <li className=' cursor-pointer hover:text-red-600 transition-all duration-200'>Home</li>
        <li className=' cursor-pointer hover:text-red-600 transition-all duration-200'>Company</li>
        <li className=' cursor-pointer hover:text-red-600 transition-all duration-200'>Tools</li>
        <li className='cursor-pointer hover:text-red-600 transition-all duration-200'>Product</li> */}
      </ol>
      <div className='flex space-x-8 mx-10'>
        <Link to = {'/login'} className=' bg-red-600 rounded-lg text-white px-4 py-2 hover:-translate-y-0.5 transition-all duration-300'>sign in</Link>
        <Link to = {'/signup'} className=' bg-red-600 rounded-lg text-white px-4 py-2 hover:-translate-y-0.5 transition-all duration-300'>Sign up</Link>
      </div>
    </nav>
  )
}

export default NavBar
