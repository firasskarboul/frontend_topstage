import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';
function HHome() {

  const navigate = useNavigate();

    const logoutSubmit = (e) => {
      e.preventDefault();

      axios.post(`api/logout`).then(res => {
          if(res.data.status ===200){
            localStorage.removeItem('auth_token' );
            localStorage.removeItem('auth_name');
            swal ("Success" , res.data.message);
            navigate('/');
          }
      });
    }












   var AuthButtons = '';
   if(!localStorage.getItem('auth_token'))
   {
      AuthButtons = (
        <ul className="navbar-nav">
        <li className="nav-item">    
             <button className="nav-link btn btn-primary float-left">
                    <i className="fa-solid fa-cloud-exclamation"> </i>
                    Connecter
              </button>
     </li>
      </ul>
      )
   }
   else
   {
      AuthButtons = (
        <ul className="navbar-nav">
        <li className="nav-item">    
        <button   onClick ={logoutSubmit} className="nav-link btn btn-danger float-left">
                       <i className="fa-solid fa-cloud-exclamation"> </i>
                       Deconnecter
         </button>
        </li>
</ul>
      )
   }




  return (
    <>


{/* <nav className="navbar navbar-expand-lg   shadow sticky-top"  >
  <ul className="navbar-nav">
  <li>
     <Link to="/encadrant/acceuil">Dashboard Encadrant------ </Link>
     </li>
     <li>
         <Link to="/chef-departement/acceuil">Dashboard Chef departement------</Link>
     </li>
     <li>
         <Link to="/service-de-formation/acceuil">Dashboard Service de formation------</Link>
     </li>
     <li>
         <Link to="/stagiaire/acceuil">Dashboard Stagiaire------</Link>
     </li>


    {AuthButtons}
    
  </ul>

</nav> */}


<br/><br/>


<section className="ftco-section container">
 
   
  
 
    <nav className="navbar navbar-expand-lg ftco_navbar ftco-navbar-light  bg-dark  rounded" id="ftco-navbar">
      <div className="container">
        <a className="navbar-brand" href="index.html">  Topnet stages</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="fa fa-bars" /> Menu
        </button>
        <div className="collapse navbar-collapse" id="ftco-nav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item"><a href="#" className="nav-link">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link">About</a></li>
            <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
          Stagiaire
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Register</a>
          <a class="dropdown-item" href="#">Login</a>
        </div>
      </li>

      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
          Utilisateur
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Login</a>
       
        </div>
      </li>

          </ul>
        </div>
      </div>
    </nav>
 

 
</section>



    </>
  )
}

export default HHome
