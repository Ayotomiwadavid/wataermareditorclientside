import React from 'react'

const Button = ({buttonValue, buttonType}) => {
  return (
    <button className={ buttonType === 'primary' ? 'w-[100px] md:w-[150px] h-[45px] rounded-md bg-Vibrant-sky-blue text-Pure-white text-base md:text-lg capitalize': 'w-[100px] md:w-[150px] h-[45px] rounded-md bg-Steel-blue text-Pure-white text-base md:text-lg capitalize'}>
    {buttonValue}
    </button>
  )
}

export default Button
