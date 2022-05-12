import React from 'react'
import { Link  } from 'react-router-dom';

function ESideList() {
  return (
    <>
       
   
    {/* Sidebar Menu */}
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

           
        <li className="nav-item">
                  <Link to="/encadrant/acceuil">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Acceuil
                  </Link>
                </li><br/>

                <li className="nav-item">
                  <Link to="/encadrant/profile">
                    <i class="nav-icon   fas fa-user-cog"></i>
                    Profil
                  </Link>
                </li><br/>
                 
        <li className="nav-item">
                  <Link to="/encadrant/ajouter-sujet-stage">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Ajouter Sujet 
                  </Link>
                </li><br/>    
                


                <li className="nav-item">
                  <Link to="/encadrant/afficher-sujets-stages">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Afficher Sujets 
                  </Link>
                </li><br/>   

                
                <li className="nav-item">
                  <Link to="/encadrant/noter-travail">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Noter
                  </Link>
                </li><br/>  
                
                <li className="nav-item">
                  <Link to="/encadrant/calendrier">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Calendrier
                  </Link>
                </li><br/>  

                
            

      </ul>
    </nav>
    {/* /.sidebar-menu */}
    </>
  )
}

export default ESideList
