import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import _ from "lodash";

function PageNoterTravail() {



//Activer ou Désactiver
const [etatcheckbox,setEtatcheckbox]= useState([]);
 
//Activer ou Désactiver
const handleCheckbox = (e) => {
  e.preventDefault();
  
 
    //Désactiver
    setEtatcheckbox({ ...etatcheckbox,[e.target.name]:e.target.checked});
  
    console.log("Vous étes", etatcheckbox.etat);
  
 
}


   
    const[loading,setLoading] = useState(true);
    const[userlist,setUserlist] = useState([]);

    //rechercher
    const[searchTerm,setSearchTerm] = useState("");

    useEffect(()=> {
        axios.get('api/comptes').then(res=> {
          if(res.status ===200){
            setUserlist(res.data.user)
          }
          setLoading(false);
        });
    },[]);


var afficher_User_Table ="";

if(loading){
  return <h5>Loading Notes...</h5>
}
else{
   afficher_User_Table =
  userlist.filter(val =>{
    if(searchTerm === ""){
      return val;
    }else if( val.nom.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  }).map( (item , index) => {
    
     return(
           
           <tr key={item._id}>

              <td>{index+1}</td>
              {/* <td>{item.prenom}</td> */}
              <td>
              <a href="#" class="btn btn-primary btn-sm " data-toggle="modal" data-target="#exampleModal"><i class="fas fa-eye"></i></a>
              </td>
              


                 
      



            <td>

              <form>
              <div className="row"> 
              {/* travail deposé */}
              <div className="wrap-input100   col-lg-3   form-group" >
                    <input className="input100 mt-4" type="file"  name="tfile"     />
                   <span className="focus-input111" />
                 <span className="symbol-input111">
                   <i className=" fas fa-cloud-download-alt"  aria-hidden="true" />
                   </span> 
              </div>

              {/* message deposé */}


              {/* note envoyé */}
              <div className="wrap-input100   col-lg-3  form-group  ">
                    <input className="input100 mt-4" type="text"  name="note"    placeholder="Note" />
                    <span className="focus-input111" />
                 
              </div>
               {/* message envoyé */}
               <div className="wrap-input100   col-lg-4   form-group" >
                   <textarea className="input100" type="text"  name="description" placeholder="Description"  style={{height: '80px'}}/>
                   <span className="focus-input111" />
               </div>   

               <div className="  col-lg-2 mt-4  ">
               <button type="submit" className="login100-form-btn float form-group"> 
                   <Link to="#"  style={{color: 'white'}}>
                   Envoyer
                  </Link> 
               </button>
               </div>
             
               </div>
               </form>
              </td> 
         
           </tr> 
     )
  });
}







  return (
    <>
  
  <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">

          <div className="col-sm-6">
            <h3>Comptes</h3>
    

          </div>


          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
             {/*  <li className="breadcrumb-item">Acceuil</li>
              <li className="breadcrumb-item active">Comptes</li> */}

              


<NavLink className={(ndata) => ndata.isActive && "active" }  to='/encadrant/acceuil'>Acceuil </NavLink> <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/encadrant/noter-travail'>Notes</NavLink>


            
            
            </ol>
          </div>


        </div>
      </div>
    </section> 


    

  <div className="container ">
   <div className="card mt-4">
     <div className="card-header">
        
     <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
            <div class="input-group">
              <input type="search" placeholder="Que cherchez-vous?" aria-describedby="button-addon1" class="form-control border-0 bg-light"
               onChange={(e)=> {
                  setSearchTerm(e.target.value);
               }}
              
              />
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>

     {/* 
        <Link to="/coordinateur/ajouter-compte" className="btn btn-primary btn-sm float-right">
           <i className="fas fa-plus"> </i>Ajouter Compte</Link> 

 */}
     <div className="card-body mt-4"> 
         <br/>
         <table className="table table-striped projects ">
           <thead>
             <tr>
               <th>Stagiaire</th>
               <th>Détails</th>
               <th>Travail</th>
              
               
              
             </tr>
           </thead>

           <tbody >

                {afficher_User_Table}

           </tbody>
         </table>
            

     </div>

   </div>
  </div>

</div>









{/* Afficher détails   */}
<div>

  {/* Modal */}
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Détails</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">

  <div className="col-md-offset-3 col-md-12">
       <strong> Nom </strong> <br/>
       <strong>Prénom</strong>   <br/>
       <strong>Date de naissance</strong>  <br/>
       <strong> Email</strong><br/> 
       <strong>Cin ou Passport </strong><br/>
       <strong>Niveau étude</strong> <br/>
       <strong>Spécialite</strong><br/>
       <strong>Filiére</strong>  <br/>
       <strong>Adresse</strong><br/>
       <strong>Télephone</strong><br/>
       
       <strong>Type de stage:</strong> <br/>
       <strong>Nom département:</strong> <br/>
       <strong>CV</strong>
{/* 
       <form>
               {/* utilisateur matricule 
            <strong >Matricule Encadrant </strong> 
          <div className="wrap-input100   col-lg-6 mb-4" >
        <input className="input100" type="number" placeholder="Matricule" name="Matricule" />
          <span className="focus-input111" />
          <span className="symbol-input111">
            
          </span>
          </div>
       </form> */}
  </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
          {/* <button type="button" className="btn btn-primary">Save changes</button> */}
        </div>
      </div>
    </div>
  </div>
</div>

{/* .Afficher détails   */}
    </>
  )
}

export default PageNoterTravail
