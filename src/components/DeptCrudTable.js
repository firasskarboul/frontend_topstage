import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import _ from "lodash";
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function DeptCrudTable() {


    
  
   const[loading,setLoading] = useState(true);
   const[deptlist,setDeptlist] = useState([]);

   //rechercher
   const[searchTerm,setSearchTerm] = useState("");

   useEffect(()=> {
      axios.get('api/afficher-departements').then(res=> {
         if(res.status ===200){
           setDeptlist(res.data.dept) //user 
         }
         setLoading(false);
       }); 
   },[]);






   //
  /* const deleteDept = (e, id) => {
      e.preventDefault();

   const thisClicked = e.currentTarget;
   thisClicked.innerText = "Effacé";

 


  axios.delete(`api/supprimer-departement/${id}`).then(res =>{
       if(res.data.status === 200){
        swal("Sucess" , res.data.message , "success"); 
        thisClicked.closest("tr").remove();
        <i className=" fas fa-trash-alt  text-danger"></i>
       }
       else{
        swal("Error" , res.data.message , "Error");
        // thisClicked.innerText ="Delete"
        <i className=" fas fa-trash  text-danger"></i>
       }
  });

 } */
//

//////////////////////////////////confirmation
const Swal = require('sweetalert2');
const deleteDept = (e ,id) => {
  const thisClicked = e.currentTarget;
  e.preventDefault();

  Swal.fire({
    title: 'Confirmer?',
    text: "Vous étes sur vous voulez supprimer département!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui,Supprimer!',
    cancelButtonText: 'Annuler',

  }).then((result) =>  {
    if (result.isConfirmed) {
      
      axios.delete(`api/supprimer-departement/${id}`).then(res =>{
        if(res.data.status === 200){
          Swal.fire("Succès" , res.data.message , "success"); 
         thisClicked.closest("tr").remove();
         //<i className=" fas fa-trash-alt  text-danger"></i>
        }
        else{
          Swal.fire("Erreur" , res.data.message , "error");
         // thisClicked.innerText ="Delete"
         //<i className=" fas fa-trash  text-danger"></i>
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

///////////////////////.confirmation


var afficher_Dept_Table ="";

if(loading){
 return <h5>Loading Départements...</h5>
}
else{
    //etat
    var DeptEtat = '';
  afficher_Dept_Table =
 deptlist.filter(val =>{
   if(searchTerm === ""){
     return val;
   }else if( val.nom_dept.toLowerCase().includes(searchTerm.toLowerCase())) {
     return val;
   }
 }).map( (item , index) => {
     
   
    //etat-------
    if(item.etat == 'Active'){
   
        DeptEtat =  <button type="button" className="btn btn-success btn-sm  rounded-pill " ><i className="fas fa-check "></i>{item.etat}</button> 
      
        }
        else if(item.etat == 'Désactive'){
     
          DeptEtat =  <button type="button" className="btn btn-danger btn-sm rounded-pill" ><i className="fas  fas fa-ban "></i>{item.etat}</button> 
        
        }
    return(
          
          <tr key={item._id}>

             <td>{index+1}</td>
             <td>{item.nom_dept}</td>
             <td>{item.nom_chef_dept}</td>
             
             <td>
                <Link to={`/service-de-formation/modifier-departement/${item._id}`}>
                  <i className="fas fa-pencil-alt  text-success"></i></Link>
             </td>
          {/*    <td>  
                  <i onClick={ (e) => deleteDept(e , item._id)}  className=" fas fa-trash  text-danger"></i>
             </td>
 */}
             <td>{DeptEtat}</td>
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
            <h3>Départements</h3>
    

          </div>


          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            

              


<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/acceuil'>Acceuil </NavLink> <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/afficher-departements'>Départements</NavLink>


            
            
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

     
        {/*   <Link to="/service-de-formation/ajouter-departement" className="btn btn-primary btn-sm float-right">
           <i className="fas fa-plus"> </i>Ajouter Département</Link> 
    */}

     <div className="card-body mt-4"> 
         <br/>
         <table className="table table-striped projects ">
           <thead>
             <tr>
               <th>ID</th>
               <th>Nom Département</th>
               <th>Nom Chef Département</th>
             </tr>
           </thead>

           <tbody >

                {afficher_Dept_Table}

           </tbody>
         </table>
            

     </div>

   </div>
  </div>

</div>

<br/><br/><br/><br/><br/><br/><br/>




    </>
  )
}

export default DeptCrudTable
