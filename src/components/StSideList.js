import React from 'react'
import { Link  } from 'react-router-dom';
function StSideList() {
  return (
    <>
      
    {/* Sidebar Menu */}
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            
   
          

        <li className="nav-item">
                  <Link to="/stagiaire/acceuil">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Acceuil
                  </Link>
                </li><br/>

                <li className="nav-item">
                  <Link to="/stagiaire/profile">
                    <i class="nav-icon   fas fa-user-cog"></i>
                    Profil
                  </Link>
                </li><br/>

                <li className="nav-item">
                  <Link to="/stagiaire/deposer-travail">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Déposer Votre Travail
                  </Link>
                </li><br/>
                
                
               


                <li className="nav-item">
                  <Link to="/stagiaire/deposer-rapport">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Déposer Le Rapport
                  </Link>
                </li><br/>
                
                <li className="nav-item">
                  <Link to="/stagiaire/deposer-bilan">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Déposer Le Bilan
                  </Link>
                </li><br/>
       





       
      </ul>
    </nav>
    {/* /.sidebar-menu */}
    </>
  )
}

export default StSideList