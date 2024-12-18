import React from 'react'
import { motion } from 'framer-motion';
import Reviews from './ReviewData';

const Review = () => {
    const repeatedReviews = [...Reviews, ...Reviews];
    return (
        <main className='w-full px-[15px] flex flex-col py-5 items-center justify-center md:px-5'>
            <div className="w-full flex flex-col items-center justify-center">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Testimonials</h2>
                <p className="mb-8 font-light text-center text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">Hear what our users have to say about their experience with us.</p>
            </div>

            <motion.div
                initial={{ x: '100%' }} // Start from right side
                animate={{ x: '-100%' }} // Move to the left side
                transition={{
                    duration: 150,
                    ease: 'linear',
                    repeat: Infinity, // Make it loop indefinitely
                }}
                style={{ display: 'flex', gap: '20px', whiteSpace: 'nowrap', 'justify-content': 'center', 'align-items': "center" }}
            >

            {repeatedReviews.map((review, index) => (
                <section key={index} className="bg-white w-fit flex-shrink-0 overflow-hidden whitespace-normal">
                    <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                        <figure className="max-w-screen-md mx-auto">
                            <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
                            </svg>
                            <blockquote className=''>
                                <p className="bg-white w-[300px] flex-shrink-0 overflow-hidden whitespace-normal">{review.content}</p>
                            </blockquote>
                            <figcaption className="flex items-center justify-center mt-6 space-x-3">
                                <div className="flex items-center divide-x-2 divide-gray-500">
                                    <div className="pr-3 font-medium text-gray-900">{review.writer}</div>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                </section>
            ))}

            </motion.div>

        </main>

    )
}

export default Review
