import React from 'react'

import {Routes , Route ,useParams , Outlet} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChSideBar from '../components/ChSideBar';

function ChDashboard() {
  return (
    <>
        <Header/>
        {/* Content  */}
       <main className="content-wrapper">
            <Outlet />
      </main>
      <ChSideBar/>
      <Footer/> 
    </>
  )
}

export default ChDashboard
