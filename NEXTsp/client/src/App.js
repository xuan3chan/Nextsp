<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './components'
import { LoginForm, RegisterFrom} from './components';
import Homepage from './components/layout/homepage/Homepage';

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
=======
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
>>>>>>> acb5fc1242f1d654e0cb74ff11ff2c4fdba1e50e
