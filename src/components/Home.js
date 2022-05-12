import React from 'react'
import {Routes , Route ,useParams ,Link, Outlet} from 'react-router-dom';

function Home() {
  return (
    <>

    





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
            <li className="nav-item"> <Link to="/" className="nav-link">Home</Link> </li>
            <li className="nav-item"><a href="#" className="nav-link">About</a></li>

            <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
          Dashboard
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <Link to="/service-de-formation/acceuil" className="dropdown-item txt2" >Service de formation</Link> 
        <Link to="/chef-departement/acceuil" className="dropdown-item txt2" >Chef de département</Link> 
        <Link to="/encadrant/acceuil" className="dropdown-item txt2" >Encadrant</Link> 
        <Link to="/stagiaire/acceuil" className="dropdown-item txt2" >Stagiaire</Link> 
        </div>
      </li>


            <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
          Stagiaire
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <Link to="/register-stagiaire" className="dropdown-item txt2" >Register</Link> 
        <Link to="/login-stagiaire" className="dropdown-item txt2" >Login</Link> 
        </div>
      </li>

      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-expanded="false">
          Utilisateur
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <Link to="/login" className="dropdown-item txt2" >Login</Link> 
       
        </div>
      </li>

          </ul>
        </div>
      </div>
    </nav>
 



</section>


            <Outlet />
     
      
    </>
  )
}

export default Home
