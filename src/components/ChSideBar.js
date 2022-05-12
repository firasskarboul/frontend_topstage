
import axios from 'axios';
import React, { useEffect, useState } from 'react'

import ChSideList from './ChSideList';


function ChSideBar() {

  //profile

const [ userInput , setUser] =useState ([]);


useEffect(()=> {
  axios.get('api/profile').then(res=> {
    if(res.status ===200){
      setUser(res.data.user.original)
      // console.log(userInput._id)
     
      
    }
   
  });
},[]);

  return (
    <>
       {/* Main Sidebar Container */}
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="../../index3.html" className="brand-link">
        <img src="../../dist/img/topnet.jpg" alt="TopStage" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
        <span className="brand-text font-weight-light">TopStage</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
          </div>
          <div className="info">
            <a href="#" className="d-block">{userInput.nom ? <span>{userInput.nom}</span> : localStorage.getItem('auth_name')}</a>
          </div> 
          
        </div> 
        <ChSideList/>
      </div>
    
       
    </aside>
       {/* . Main Sidebar Container */}

    </>
  )
}

export default ChSideBar