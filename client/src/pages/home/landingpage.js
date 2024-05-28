import React from 'react'
import Navbar from '../../components/Navbar'
import Header from './homeComponents/Header/Header'
import Card from './homeComponents/card/Card'
import Career from './homeComponents/career/Career'
import About from './homeComponents/about/About'
import Contact from './homeComponents/contact/Contact'
import Footer from '../../components/footer/Footer'
// import LoginPage from '../loginpage/loginpage'

const landingpage = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <Card/>
        <Career/>
        <About/>
        <Contact/>
        <Footer/>
        {/* <LoginPage/> */}
    </div>
  )
}

export default landingpage;