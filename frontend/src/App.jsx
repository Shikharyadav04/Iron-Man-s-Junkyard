import React from 'react'
import {Routes ,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Buy from './pages/Buy'
import End from './components/End'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Register from './pages/register'
import Admin from './pages/Admin'
import Coustomer from './pages/Customer'
import NotFound from './pages/NotFound'
import Feedback from './pages/Feedback'
import Dealer from './pages/Dealer'



const App = () => {
  return (
    <div className=' sm:px-[5vw] md:px-[7vw] lg:px-[0vw]' style={{ fontFamily: 'Roboto, sans-serif', fontWeight: 300 }}>
      <Navbar />
     
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/buy' element={<Buy/>} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/admin/dashboard' element={<Admin/>}/>
        <Route path='/customer/dashboard' element={<Coustomer/>}/> 
        <Route path='/feedback' element={<Feedback/>}/>
        <Route path='/dealer/dashboard' element={<Dealer/>}/>
        <Route path='*' element={<NotFound/>}/> 
        
        
        
      </Routes>
      <End/>

    
    </div>
  )
}

export default App