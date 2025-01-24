import React from 'react'
import Logo from '../Assets/Logo.png'
import { Link, useLocation} from 'react-router-dom'
import Button from './Formfields/Button'

const Appbar = () => {

  const {pathname} = useLocation();

  console.log(pathname);
  
  return (
    <main className='w-full z-50 flex items-center justify-between px-[15px] md:px-[5vw] fixed top-0 bg-Deep-navy-blue py-2 md:py-4 shadow-2xl'>
      <aside className='flex items-center justify-center'>
        <img src={Logo} alt='logo' className='w-9 h-9 md:w-12 md:h-12' />
        <h1 className='font-bold capitalize text-md md:text-xl text-Pure-white'>Yougurd Editor</h1>
      </aside>
      <section className={pathname === '/editor' ? 'hidden items-center justify-center gap-5': 'flex items-center justify-center gap-5'}>
        <Link to='/editor'>
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
