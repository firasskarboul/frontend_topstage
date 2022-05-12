import React from 'react'
import { Link  } from 'react-router-dom';
function SideList() {
  return (
    
    <>
 
   
    {/* Sidebar Menu */}
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            
   
          

                
               <li className="nav-item">
                  <Link to="/coordinateur/acceuil">
                    <i class="nav-icon  fas fa-window-maximize"></i>
                    Acceuil
                  </Link>
                </li><br/>

                <li className="nav-item">
                  <Link to="/coordinateur/profile">
                  <i class="nav-icon   fas fa-user-cog"></i>
                    Profil
                  </Link>
                </li><br/>

                <li className="nav-item">
                  <Link to="/coordinateur/afficher-tous">
                    <i class="nav-icon  fas fa-clipboard-list"></i>
                    Consulter Utilisateurs
                  </Link>
                </li><br/>
                
                <li className="nav-item">
                  <Link to="/coordinateur/ajouter-compte">
                    <i class="nav-icon  fas fa-plus-circle"></i>
                    Ajouter Compte
                  </Link>
                </li><br/>

             
          {/*       <li className="nav-item">
                  <Link to="/deconnexion">
                    <i class="nav-icon  fas fa-ban"></i>
                    Deconnexion
                  </Link>
                </li><br/> */}

                
               

                
      </ul>
    </nav>
    {/* /.sidebar-menu */}
    </>
   
  )
}

export default SideList
