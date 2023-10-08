import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './components'
import Auth from './views/Auth'
import { LoginForm, RegisterFrom } from './components';
import Homepage from './container/Homepage';

const App = () => {
  return (
    <>   
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path='/login' element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterFrom/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
