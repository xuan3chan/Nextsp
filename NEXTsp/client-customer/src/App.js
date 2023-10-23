<<<<<<< HEAD
import React, { useEffect } from 'react';
=======
import React from 'react';
>>>>>>> d41284d94d63dd98856c2c8e2e05f4c90e7e900c
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Landing } from './components'
import { LoginForm, RegisterFrom} from './components';
import Homepage from './container/Homepage';
import Collection from '../src/container/Collections/Collection'
<<<<<<< HEAD
import CollectionLaptop  from '../src/container/Collections/CollectionLaptop'
import CollectionPc  from '../src/container/Collections/CollectionPC'
import CollectionGear from '../src/container/Collections/CollectionGear'
import CollectionAccessory from '../src/container/Collections/CollectionAccessory'
import { LoadingProvider } from './components/LoadingContext';
const App = () => {

  return (   
    <Router>
    <LoadingProvider>
    <Routes>
      <Route path="/Homepage" element={<Homepage />} />
      {/* <Route path="/Homepage/laptop" element={<SloganListSection/>} /> */}
      <Route path="/" element={<Landing />} />
      <Route path='/login' element={<LoginForm/>}/>
      <Route path="/register" element={<RegisterFrom/>} />
      <Route path='/collection' element={<Collection/>}/>
      <Route path='/collection/laptop' element={<CollectionLaptop/>}/>
      <Route path='/collection/PC' element={<CollectionPc/>}/>
      <Route path='/collection/LinhKien' element={<CollectionGear/>}/>
      <Route path='/collection/PhuKien' element={<CollectionAccessory/>}/>
    </Routes>
    </LoadingProvider>
=======
import laptop  from '../src/container/Collections/CollectionLaptop'
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
        <Route path='/collection/laptop' element={<Collection/>}/>
      </Routes>
>>>>>>> d41284d94d63dd98856c2c8e2e05f4c90e7e900c
    </Router>
  )
}

export default App;
