import React from 'react'
import { Link } from 'react-router-dom'
import AboutPic from '../Assets/watermark-photos.webp'

const About = () => {
    return (
        <section className="bg-Off-white mt-10 md:mt-0 md:px-[5vw]">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-2xl xl:text-4xl">Your trusted watermark editor for creatives and businesses</h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">We make it simple to protect and brand your images effortlessly. From freelancers to large enterprises, our tool allows you to add text, logos, and customized watermarks in seconds ensuring your work stays uniquely yours.</p>
                    <Link to='/Editor' class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-Dark-royal-blue hover:bg-primary-800 focus:ring-4 focus:ring-primary-300">
                         Do Some Edits
                        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </Link>
                    {/* <Link to='/editor' className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-Vibrant-sky-blue border border-gray-300 rounded-lg hover:bg-Steel-blue focus:ring-4 focus:ring-gray-100">
                       Get started  
                    </Link> */}
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <img src={AboutPic} alt="mockup" />
                </div>
            </div>
        </section>
    )
}

export default About
