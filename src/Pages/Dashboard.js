import React from 'react'
import Sidebar from '../Components/Sidebar'
import Appbar from '../Components/Appbar'
import Playground from '../Components/Playground'
import WatermarkEditor from '../Components/Playground'
import TestMark from '../Components/TestGround'


const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className='w-full flex items-center justify-center h-lvh md:mt-[70px]'>
        <Sidebar />
        <TestMark />
      </div>
    </div>
  )
}

export default Dashboard
