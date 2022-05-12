import React from 'react'
import {Routes , Route ,useParams , Outlet} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import StSideBar from '../components/StSideBar';

function StDashboard() {
  return (
    <>
         <Header/>
        {/* Content  */}
       <main className="content-wrapper">
            <Outlet />
      </main>
      <StSideBar/>
      <Footer/> 
    </>
  )
}

export default StDashboard
