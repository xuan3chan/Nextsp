import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './components'
import { LoginForm, RegisterFrom} from './components';
import Homepage from './container/Homepage';
import Collection from './container/Collection'
const App = () => {
  return (   
    <Router>
      <Routes>
        <Route path="/Homepage" element={<Homepage />} />
        {/* <Route path="/Homepage/laptop" element={<SloganListSection/>} /> */}
        <Route path="/" element={<Landing />} />
        <Route path='/login' element={<LoginForm/>}/>
        <Route path="/register" element={<RegisterFrom/>} />
        <Route path='/collection' element={<Collection/>}/>
      </Routes>
    </Router>
  )
}

export default App;
