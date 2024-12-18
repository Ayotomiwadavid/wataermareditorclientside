import React from 'react'
import Appbar from '../Components/Appbar'
import Hero from '../Components/Hero'
import About from '../Components/About'
import Review from '../Components/Review'
import Faq from '../Components/Faq'
import Footer from '../Components/Footer'

const Landing = () => {
  return (
    <div className='flex overflow-x-hidden flex-col items-center justify-start w-full bg-Off-white'>
      <Appbar />
      <Hero />
      <About />
      <Review />
      <Faq />
      <Footer />
    </div>
  )
}

export default Landing
