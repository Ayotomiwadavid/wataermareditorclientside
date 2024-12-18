import React from 'react'
import Logo from '../Assets/Logo.png'

const Footer = () => {
    return (
        <footer className="p-4 bg-white md:p-8 lg:p-10 w-full">
            <div className="mx-auto max-w-screen-xl text-center">
                <aside className='flex items-center justify-center'>
                    <img src={Logo} alt='logo' className='w-7 h-7 md:w-12 md:h-12' />
                    <h1 className='font-bold capitalize text-xl text-Dark-royal-blue'>StreamMark</h1>
                </aside>
                <p className="my-6 text-gray-500 dark:text-gray-400">Your trusted watermark editor for creatives and businesses</p>
                <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">Premium</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6 ">Campaigns</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">Blog</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">Affiliate Program</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">FAQs</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">Contact</a>
                    </li>
                </ul>
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">StreamMark™</a>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer
