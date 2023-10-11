import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './components'
import { LoginForm, RegisterFrom} from './components';
import Homepage from './components/homepage/Homepage';

const App = () => {
  return (
    <div>   
      <Router>
        <Routes>
          <Route path="/index" element={<Homepage />} />
          <Route path="/Homepage" element={<Landing />} />
          <Route path="/" element={<Landing />} />
          <Route path='/login' element={<LoginForm/>}/>
          <Route path="/register" element={<RegisterFrom/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
