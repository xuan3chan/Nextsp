import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Login, AdminLayout } from './components'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/Dashboard" element={<AdminLayout/>} />
        <Route path='/Login' element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App