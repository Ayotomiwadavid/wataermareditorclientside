import React from 'react'
import Sidebar from '../Components/Sidebar'
import Appbar from '../Components/Appbar'
import Playground from '../Components/Playground'
import WatermarkEditor from '../Components/Playground'

const Dashboard = () => {
  return (
    <div>
      <Appbar />
      <div className='w-full flex items-center justify-center h-lvh md:mt-[70px]'>
        <Sidebar />
        <WatermarkEditor />
      </div>
    </div>
  )
}

export default Dashboard
