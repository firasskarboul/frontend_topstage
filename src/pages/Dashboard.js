import React from 'react'

import { Routes, Route, useParams, Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SideBar from '../components/SideBar';



function Dashboard() {


  return (
    <>
      <Header />
      {/* Content  */}
      <main className="content-wrapper">
        <Outlet />
      </main>
      <SideBar />
      <Footer />
      {/* 

      <Header/>
      <div className="content-wrapper">
       {/* Content 
            
             {pageId}

       </div>
      <SideBar/>
      <Footer/> */}
    </>
  )
}

export default Dashboard
