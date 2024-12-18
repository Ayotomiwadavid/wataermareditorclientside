import React from 'react'
import Logo from '../Assets/Logo.png'
import { Link } from 'react-router-dom'
import Button from './Formfields/Button'

const Appbar = () => {
  return (
    <main className='w-full z-50 flex items-center justify-between px-[15px] md:px-[5vw] fixed top-0 bg-Deep-navy-blue py-2 md:py-4 shadow-2xl'>
      <aside className='flex items-center justify-center'>
        <img src={Logo} alt='logo' className='w-9 h-9 md:w-12 md:h-12' />
        <h1 className='font-bold capitalize text-md md:text-xl text-Pure-white'>StreamMark</h1>
      </aside>
      <section className='flex items-center justify-center gap-5'>
        <Link to='/editor/edit'>
          <Button buttonType='primary' buttonValue='Add a mark' />
        </Link>
        {/* <Link to='/auth'>
        <Button buttonType='secondary' buttonValue='login'/>
        </Link> */}
      </section>
    </main>
  )
}

export default Appbar
