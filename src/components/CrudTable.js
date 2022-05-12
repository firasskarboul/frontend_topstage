import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import _ from "lodash";

function CrudTable() {



//Activer ou Désactiver
//const [etatcheckbox,setEtatcheckbox]= useState([]);
 
//Activer ou Désactiver
/* const handleCheckbox = (e) => {
  e.preventDefault();
  
 
    //Désactiver
    setEtatcheckbox({ ...etatcheckbox,[e.target.name]:e.target.checked});
  
    console.log("Vous étes", etatcheckbox.etat);
  
 
} */


   
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
  //return <h5>Loading Comptes...</h5>
  return <div className="d-flex justify-content-center ">
  <h2 >Loading...</h2>
</div>
}
else{
  //etat
  var UtiEtat = '';
   afficher_User_Table =
  userlist.filter(val =>{
    if(searchTerm === ""){
      return val;
    }else if( val.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||val.prenom.toLowerCase().includes(searchTerm.toLowerCase())) {
      return val;
    }
  }).map( (item , index) => {
    
    //etat
    if(item.etat == 'Active'){
    UtiEtat = <i className=" fas fa-user-check  text-success"></i>
   
    //UtiEtat = 'vous Active';
    }
    else if(item.etat == 'Désactive'){
     UtiEtat =<i className=" fas fa-user-alt-slash  text-danger"> </i>
   
      //UtiEtat = 'vous Désactive';
    }
     return(
           
           <tr key={item._id}>

              <td>{index+1}</td>
              <td>{item.nom}</td>
              <td>{item.prenom}</td>
              <td>{item.email}</td>
              <td>{item.numTel}</td>
            
              <td>{item.matricule}</td>
              <td>{item.departement}</td>
              <td  className="btn btn-primary btn-sm p-0 rounded-pill mt-2">{item.role}</td> 
               <td>{UtiEtat}</td>

              
             
                {/* <td>{item.password}</td>  */}
               {/* <td>{item.etat == '1'? "you active" :  "you inactive" }</td>  */}
               
               {/* <td>{item.etat == true ?<i className=" fas fa-user-alt-slash  text-danger"></i>:  <i className=" fas fa-user-check  text-success"></i> }</td> 
                */}
              <td>
                 <Link to={`/coordinateur/modifier-compte/${item._id}`}>
                   <i className="fas fa-pencil-alt  text-success"></i></Link>
              </td>

          


                {/*  <td>  
                   
                <i className=" fas fa-user-alt-slash  text-danger"></i>
                   <i className=" fas fa-user-check  text-primary"></i>
 */}
               


             {/* <form onSubmit={handleCheckbox}>
                   Activer ou Désactiver checkbox etat "désactiver ou activer utilisateur" à cocher  
             <div className='col-md-6 mt-4'>
                <div className='form-check'>
               <input type="checkbox"  name="etat" onChange={ handleCheckbox} defaultChecked={etatcheckbox.etat === "inactive" ? true : false }  className="form-check-input"/>
                  <p  className='text-secondary form-check-label ' ><i className=" fas fa-user-alt-slash  text-danger"></i></p>
                </div>
              </div> 
            defaultChecked={etatcheckbox === 'inactive' ? true : false } 
               <button type="submit" className="btn btn-danger btn-sm float-right">Désactiver</button> 
           </form>
         

              </td>   */}
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

              


<NavLink className={(ndata) => ndata.isActive && "active" }  to='/coordinateur/acceuil'>Acceuil </NavLink> <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/coordinateur/afficher-tous'>Comptes</NavLink>


            
            
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

     
    {/*     <Link to="/coordinateur/ajouter-compte" className="btn btn-primary btn-sm float-right">
           <i className="fas fa-plus"> </i>Ajouter Compte</Link> 
 */}

     <div className="card-body mt-4"> 
         <br/>
         <table className="table table-striped projects ">
           <thead>
             <tr>
               <th>ID</th>
               <th>Nom</th>
               <th>Prénom</th>
               <th>Email</th>
               <th>NumTél</th>
               {/* <th>Date naissance</th> */}
              
               <th>Matricule</th> 
               <th>Département</th>
               <th>Rôle</th> 
               <th>Etat</th>
              
                {/* <th>Mot de passe </th> */}
               {/* <th>Etat</th>  */}
              
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

<br/><br/><br/><br/><br/><br/>
    </>
  )
}

export default CrudTable
