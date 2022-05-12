import React from 'react'
import { Link  } from 'react-router-dom';
function SSideList() {
  return (
    <>
      
    {/* Sidebar Menu */}
    <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            
   
          

        <li className="nav-item">
                  <Link to="/service-de-formation/acceuil">
                  <i class="nav-icon  fas fa-window-maximize"></i>
                    Acceuil
                  </Link>
                </li><br/>

                

                <li className="nav-item">
                  <Link to="/service-de-formation/profile">
                    <i class="nav-icon   fas fa-user-cog"></i>
                    Profil
                  </Link>
                </li><br/>

                

                <li className="nav-item">
                  <Link to="/service-de-formation/ajouter-departement">
                  <i class="nav-icon  fas fa-plus-circle"></i>
                    Ajouter Département
                  </Link>
                </li><br/>
                <li className="nav-item">
                  <Link to="/service-de-formation/afficher-departements">
                  <i class="nav-icon  fas fa-clipboard-list"></i>
                    Afficher Départements
                  </Link>
                </li><br/>
                

                {/* <li className="nav-item">
                  <Link to="/service-de-formation/afficher-demandes-stages">
                  <i class="nav-icon  fas fa-clipboard-list"></i>
                    Afficher Demandes de stages
                  </Link>
                </li><br/>

  
                <li className="nav-item">
                  <Link to="/service-de-formation/afficherQuestionReponse">
                  <i class="nav-icon  fas fa-clipboard-list"></i>
                    Afficher Question/Reponse
                  </Link>
                </li><br/> */}

                <li className="nav-item">
                  <Link to="/service-de-formation/paramQuiz">
                  <i class="nav-icon  fas fa-clipboard-list"></i>
                     Gestion des tests
                  </Link>
                </li><br/>

              
                
              
                


            
            
       
      </ul>
    </nav>
    {/* /.sidebar-menu */}
    </>
  )
}

export default SSideList
