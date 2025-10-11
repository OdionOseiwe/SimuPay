import React from 'react'
import Hero from '../Components/Hero'
import GrowWithSimu from '../Components/GrowWithSimu'
import SimuTools from '../Components/SimuTools'
import Footer from "../Components/Footer"

function HomePage() {
  return (
    <div>
      <Hero/>
        <SimuTools/>
      {/* <GrowWithSimu/> */}
      <Footer/>
    </div>
  )
}

export default HomePage
