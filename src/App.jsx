import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './paegs/Home'
import { About } from './paegs/About'
import SignIn from './paegs/SignIn'
import SignUp from './paegs/SignUp'
import Profile from './paegs/Profile'
import Header from './components/Header'
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

        < Route path='/' element={<Home />} />
        < Route path='/about' element={<About />} />
        < Route path='/sign-in' element={<SignIn />} />
        < Route path='/sign-up' element={<SignUp />} />
        < Route path='/profile' element={<Profile />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App