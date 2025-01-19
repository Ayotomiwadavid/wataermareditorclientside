import React from 'react'
import Landing from './Pages/Landing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notfound from './Pages/Notfound';
import Dashboard from './Pages/Dashboard';


const App = () => {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/editor" element={<Dashboard />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  )
}

export default App
