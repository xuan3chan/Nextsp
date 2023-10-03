import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './components'
import Auth from './views/Auth'

const App = () => {
  return (
    <>   
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            exact
            path="/login"
            element={<Auth/>}
          />
          <Route
            exact
            path="/register"
            render={props => <Auth {...props} authRoute='register'/>} 
          />
        </Routes>
      </Router>
    </>
  )
}

export default App