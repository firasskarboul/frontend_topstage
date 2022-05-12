import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageConsulterSujetStage() {
   

  //rechercher
  const[searchTerm,setSearchTerm] = useState("");
  const[loading,setLoading] = useState(true);
  const[sujetlist,setSujetlist] = useState([]);



//afficher sujets stages
  useEffect(()=> {
     axios.get('api/afficher-sujets-stages').then(res=> {
        if(res.status ===200){
          setSujetlist(res.data.sujetStage) 
        }
        setLoading(false);
      }); 
  },[]);
  



  
//supprimer sujet
/*  const supprimerSujet = (e , id) => {
  e.preventDefault();
  const thisClicked = e.currentTarget;
  axios.delete(`api/supprimer-sujet/${id}`).then(res=>{
       if(res.data.status === 200){

         swal("Success", res.data.message ,"success");
         thisClicked.closest("tr").remove();
   
       }
         else if(res.data.status === 404){
        swal("Error", res.data.message ,"error");
       } 
  });
}  
 */
const Swal = require('sweetalert2');
const confirmer = (e ,id) => {
  
  const thisClicked = e.currentTarget;
  e.preventDefault();

  Swal.fire({
    title: 'Confirmer?',
    text: "Vous étes sur vous voulez supprimer sujet!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui,Supprimer!',
    cancelButtonText: 'Annuler',

  }).then((result) =>  {
    if (result.isConfirmed) {
      
      axios.delete(`api/supprimer-sujet/${id}`).then(res=>{
           if(res.data.status === 200){
    
             Swal.fire("Succès", res.data.message ,"success")
             thisClicked.closest("tr").remove();
       
           }
             else if(res.data.status === 404){
            swal("Erreur", res.data.message ,"error");
           } 
      });

      // Swal.fire(
      //   'Deleted!',
      //   'Your file has been deleted.',
      //   'success'
      // )
    }
  })
 
}

  
 

if(loading){
 return <h5>Loading Sujets de Stages...</h5>
}
else{
  var SujetEtat = '';
  // var StuEtat = '';
 var afficher_Sujet_Cards ="";
  afficher_Sujet_Cards =
  sujetlist.filter(val =>{
    if(searchTerm === ""){
      return val;
    }else if( val.sujet.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  }).map( (item , index) => {
    
      //etat-------
      if(item.etatsujet == 'Publié'){
      //  SujetEtat =  <p  className="btn btn-success btn-sm p-1 rounded-pill mt-4 float-left ">{item.etatsujet}</p>
        SujetEtat =  <button type="button" className="btn btn-success " ><i className="fas fa-check "></i>{item.etatsujet}</button> 
      
        }
        else if(item.etatsujet == 'Dépublié'){
          //SujetEtat = <p  className="btn btn-danger btn-sm p-1 rounded-pill mt-4 float-left ">{item.etatsujet}</p>
          SujetEtat =  <button type="button" className="btn btn-danger " ><i className="fas  fas fa-ban "></i>{item.etatsujet}</button> 
        
        }




        //status sujet--------
    /*     if(item.stusujet == 'Active'){
         
         StuEtat =  <button type="button" className="btn btn-success " ><i className="fas fa-check "></i></button> 
        
          }
          else if(item.stusujet == 'Désactive'){
          
          StuEtat =  <button type="button" className="btn btn-danger " ><i className="fas  fas fa-ban "></i></button> 
            
          } */
        
     return(
         <>
<tr key={item._id} className="col-md-offset-3 col-md-6">
         {/* Card 1 */}
{/* <div className="col-md-offset-3 col-md-6" >  */}
<div className="card card-primary bg-light" >
  <div className="card-header">
  
  </div>
  <div className="card-body"    >
    
  
  {/* <strong><i className="  fas fa-copy" />Durée</strong> <i className=" fas fa-code" />*/}


  <strong>Durée</strong>
      <p>{item.periode} mois</p>

    <strong>Sujet{index+1}</strong>
      <p>{item.sujet}</p>
  
  
    <strong>Technologies:</strong>
      <p className="text-uppercase">{item.technologies}</p>

    
    
  
     
  
  
      {/* <strong><i className="fas fa-file-alt" />Description:</strong>
      <p>...</p> */}
  
 
    
 






{/* Afficher détails   */}
<div>
  {/* Button trigger modal */}
  
  <div className="text-right py-0 align-middle">
<div class="btn-group btn-group-sm ">
                        {/* <a href="#" class="btn btn-info" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-eye"></i></a> */}
                        {/* <a href="#" class="btn btn-danger" ><i class="fas fa-trash"></i></a>  */}
                       

                        
</div></div>

{/* 
<i className="fas fa-file-alt" /> 
<i className=" fas fa-code" />
<i className=" fas fa-code" />
<i className="  fas fa-copy" />
<i className="fas fa-file-alt" />

*/}

  {/* Modal */}
  <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Sujet{index+1} En Détails</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">
        <strong className="text-secondary"> Etat Sujet  </strong>{item.etatsujet} <br/><br/>
        <strong className="text-secondary"> Période  </strong>{item.periode}/ mois <br/><br/>
        <strong className="text-secondary"> Date Début  </strong>{item.datedebut} <br/><br/>
        <strong className="text-secondary"> Type Stage  </strong>{item.typestage} <br/><br/>
        <strong className="text-secondary"> Département </strong>{item.nom_dept} <br/><br/>
        <strong className="text-secondary"> Matricule </strong>{item.matricule_sj} <br/><br/>
        <strong className="text-secondary">Sujet{index+1} </strong>{item.sujet} <br/><br/>
        <strong className="text-secondary "> Technologies  </strong> {item.technologies} <br/><br/>
        <strong className="text-secondary"> Description</strong>{item.description} <br/><br/>
      
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary text-uppercase" data-dismiss="modal">Fermer</button>
          {/* <button type="button" className="btn btn-primary">Save changes</button> */}
        </div>
      </div>
    </div>
  </div>
</div>

{/* .Afficher détails   */}































{/* Button  */}
<div>
  
  
  <div className="text-right py-0 align-middle">
<div class="btn-group btn-group-sm ">
                       
                       <Link to="#" class="btn btn-info" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-eye"></i></Link>
                        < Link to={`/encadrant/modifier-sujet/${item._id}`}   class="btn btn-primary" ><i class="fas fa-pencil-alt"></i></Link>
                        {/* <Link to="#" class="btn btn-danger" ><i class="fas fa-ban"></i></Link>  */}
                        {/* <Link to="#" class="btn btn-success" > <i class="fas fa-chevron-circle-down"></i></Link>  */}
                        {/* <Link to="#" class="btn btn-danger" ><i class="fas fa-trash"></i></Link>  */}
                        {/* <button type="button" className="btn btn-danger" onClick={ (e) =>supprimerSujet(e ,item._id)}><i className="fas fa-trash  confirmer"></i></button> */}
                        {/* <button type="button" className="btn btn-danger " onClick= { (e) => confirmer(e ,item._id)} ><i className="fas fa-trash "></i></button> */}

                        {/* {StuEtat} */}
                        {SujetEtat}
                   
</div></div>



</div>

</div>
</div>
{/* </div> */}
{/* .Card 1 */}
         
         
</tr>
         </>
     )
  });

}



return (
  <>
         <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">

          <div className="col-sm-6">
            <h3>Sujets Stages</h3>
 
          </div>


          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            

              


<NavLink className={(ndata) => ndata.isActive && "active" }  to='/encadrant/acceuil'>Acceuil </NavLink> <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/encadrant/afficher-sujets-stages'>Sujets Stages</NavLink>


            
            
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
          <Link to="/encadrant/ajouter-sujet-stage" className="btn btn-primary btn-sm float-right mb-2 ">
           <i className="fas fa-plus"> </i>Ajouter Sujet</Link> 
       */}


    <div className="row container "> 
 
    {afficher_Sujet_Cards}
    </div>
<br/><br/><br/><br/><br/><br/><br/>


</div>
</div>
    </div>




   
  </>
)
















}
export default PageConsulterSujetStage
