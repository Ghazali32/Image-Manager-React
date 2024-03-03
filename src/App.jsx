import { useEffect, useState } from 'react'
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import {Home} from './pages/Home'
function App() {
  



  return (
    <div className='w-11/12 h-screen'>
      <Router>
        <Routes>
          <Route path = '/' element = {<SignUp></SignUp>}></Route>
          <Route path = '/signin' element = {<SignIn></SignIn>}></Route>
          <Route path = '/home' element = {<Home></Home>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
