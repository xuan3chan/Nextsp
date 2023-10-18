import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Login, AdminLayout } from './components'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLayout/>} />
        <Route path='/Login' element={<Login/>} />
        {/* <Route path="/Dashboard" element={<Dashboard/>} /> */}
      </Routes>
    </Router>
  )
}

export default App