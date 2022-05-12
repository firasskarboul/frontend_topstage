import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function Header() {
  const Swal = require('sweetalert2');
    const navigate = useNavigate();
//profile

//const [ userInput , setUser] =useState ([]);


/* useEffect(()=> {
  axios.get('api/profile').then(res=> {
    if(res.status ===200){
      setUser(res.user)
      // console.log(userInput._id)
     
      
    }
   
  });
},[]);
 */




//deconnexion


  const logoutSubmit = (e) =>{
    e.preventDefault();
  

    axios.post(`api/logout`).then(res =>{
           if(res.data.status === 200){
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            localStorage.removeItem('role');
            Swal.fire ("Succès" , res.data.message ,"success");
           navigate('/');
           }
    });
  }




  
  return (
    <>
     {/* Left navbar links */}
     <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <li className="nav-item d-none d-sm-inline-block">
        <Link to="/" className="nav-link">Home </Link> 
        </li>
         <ul className="navbar-nav ml-auto ">
       {/*  <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
        </li> */}
       
        <li className="nav-item">
 <button  onClick ={logoutSubmit}   className=" btn btn-secondary ">
                    <i className="fa-solid fa-cloud-exclamation"> </i>
                    Deconnexion
      </button>
 </li>

        <li className="nav-item float-end">
          <a className="nav-link" data-widget="fullscreen" href="#" role="button">
            <i className="fas fa-expand-arrows-alt" />
          </a>
        </li>

   
      </ul>
      <br/>

           
 
 
     
        
      {/*   <ul className="navbar-nav ml-auto">
  

  {userInput.nom ? <span>{userInput.nom}</span> : localStorage.getItem('auth_name')}  */}
       
    {/*         <div class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">{userInput.nom ? <span>{userInput.nom}</span> : localStorage.getItem('auth_name')} </a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="#">Mon Profile</a>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item"  onClick ={logoutSubmit} >Deconnexion</a>
    </div>
  </div>
      </ul> */}

  
    </nav>
    
    </>
  )
}

export default Header
