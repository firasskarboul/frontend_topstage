import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate  ,useParams ,Link} from 'react-router-dom'; 

function TProfile() {




    const Swal = require('sweetalert2');
    const navigate = useNavigate();
  
    const params=useParams();
      const[loading,setLoading] = useState(true);
      //const[userprofile,setUserprofile] = useState([]);
  
    //  const [ profileInput , setProfile] =useState ([]);
  
    const [userInput , setUserInput] =useState ([]);
  
      const [ error , setError] =useState ([]);
  
      //const[toroute,setToroute] = useState([]);
     // const[torouteprofile,setTorouteprofile] = useState([]);


     useEffect(()=> {
        axios.get('api/profile').then(res=> {
          //if(res.status ===200){
             setUserInput(res.data.user.original)
         // }
          setLoading(false);
        });
    },[]);
  
  
      //test changer 
      
      //const [nom, setName] = useState(); 
  
  
      const handleInput = (e) => {
        e.persist();
       
        setUserInput({ ... userInput , [ e.target.name]: e.target.value})
      }    
  
      const updatProfile = (e) => {
        e.preventDefault();
        // let userObj = { displayName: nom };
   
  
        const data = userInput;
       
  
        axios.put('api/modifier-profile' , data ).then(res=> {
          if(res.status ===200){
            Swal.fire("Succès" , res.data.message , "success");
            
          }
          else if(res.data.status === 422){
            setError(res.data.validation_errors);
            Swal.fire("Erreur dans les champs" , " Vérifier les champs!", "error");
     }
         
        }); 
   
       
  
      };





      const updatProfileStagiaire = (e) => {
        e.preventDefault();
        // let userObj = { displayName: nom };
   
  
        const data = userInput;
       
  
        axios.put('api/modifier-profile-stagiaire' , data ).then(res=> {
          if(res.status ===200){
            Swal.fire("Succès" , res.data.message , "success");
            
          }
          else if(res.data.status === 422){
            setError(res.data.validation_errors);
            Swal.fire("Erreur dans les champs" , " Vérifier les champs!", "error");
     }
         
        }); 
   
       
  
      };
    
      
    if(loading){
        return <h5>Loading Profile...</h5>
      }
      else if(userInput.role === 'encadrant' || userInput.role === 'chef_dept' ||userInput.role === 'service_formation'||userInput.role === 'coordinateur'  ){
  return (
    <>
      
          
<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h3>Profil</h3>

           

          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
          

            </ol>
          </div>
        </div>
      </div>
    </section>


    <br/>
      <div className="col-md-offset-3 col-md-9  mx-auto "  >
        <div className="form-container ">
   
<form  >
            <div className="float-left">
            </div>
            <h3 className="profile-username  mb-5 text-secondary "> {userInput.nom} {userInput.prenom}</h3>
           
            


           <div className="row">
               <div className="col-md-6">

           <ul className="list-group list-group-unbordered mb-3">
           <li >
              <p>  Nom et Prénom </p> <a className=" text-secondary">{userInput.nom} {userInput.prenom}</a>
              </li>
              <li>
                <p >Email</p> <a className=" text-secondary"> {userInput.email}</a>
              </li>
              <li >
                <p >Num Télephone</p> <a className=" text-secondary">{userInput.numTel}</a>
              </li>
           
           </ul>



               </div> 

               <div className="col-md-6">

               <ul className="list-group list-group-unbordered mb-3">
              <li>
                <p > Matricule</p> <a className="text-secondary">{userInput.matricule}</a>
              </li>
              <li>
                <p >Role</p> <a className="text-secondary">{userInput.role}</a>
              </li>

              <li>
                <p >Date naissance</p> <a className="text-secondary">{userInput.datenaissance}</a>
              </li>
        
            </ul>
                   
               </div>


           </div>
   

    {/* Cancel Button */}
    

    <br/>
        <div className="form-group col-lg-3 ">
      
          <a href="#" className="login100-form-btn  "  data-toggle="modal" data-target="#exampleModal" style={{color: 'white'}}>Modifier</a>  
          Modifier
         
       </div>
  <br/>
    


</form>
   
        </div>
      </div>
      <br/><br/>












{/* Afficher détails   */}
<div>


  {/* Modal */}
  <div className="modal fade col-md-12" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog  ">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Modifier Profil</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div className="modal-body">

{/* body */}

        <div className="col-md-offset-3 col-md-12">
     {/*    <div className="form-container"> */}
  
<form  onSubmit={updatProfile}  >
  <div className="row">




 
     {/* utilisateur */}
     <div className="wrap-input100   col-lg-6 mb-4" >
          <input className="input100" type="text"  placeholder="Nom" name="nom"   onChange={handleInput} value={userInput.nom} />
          <span className="focus-input111" />
          <span className="symbol-input111">
        
          </span>
        
        </div>
             {/* utilisateur */}
     <div className="wrap-input100   col-lg-6 mb-4" >
          <input className="input100" type="text" placeholder="Prénom"  name="prenom" onChange={handleInput} value={userInput.prenom} />
          <span className="focus-input111" />
          <span className="symbol-input111">
         
          </span>
        
        </div>
             {/* utilisateur */}
     <div className="wrap-input100   col-lg-6 mb-4" >
          <input className="input100" type="email"   placeholder="Email" name="email" onChange={handleInput} value={userInput.email}/>

        </div>

        {/* utilisateur */}
     <div className="wrap-input100   col-lg-6 mb-4" >
          <input className="input100" type="number"  placeholder="Num Télephone" name="numTel"   onChange={handleInput} value={userInput.numTel}  />
          <span className="focus-input111" />
          <span className="symbol-input111">
          
          </span>
        
        </div>
             {/* utilisateur */}
     <div className="wrap-input100   col-lg-6 mb-4" >
          <input className="input100" type="date"  placeholder="Date naissance"  name="datenaissance" onChange={handleInput} value={userInput.datenaissance} />
          <span className="focus-input111" />
          <span className="symbol-input111">
           
          </span>
        
        </div>

          {/* utilisateur */}
          <div className="wrap-input100   col-lg-6 mb-4" >
          <input className="input100" type="number" placeholder="Matricule" name="matricule"  onChange={handleInput} value={userInput.matricule} />
          <span className="focus-input111" />
          <span className="symbol-input111">
            
          </span>
        
        </div>

     {/* utilisateur */}
        <div className="wrap-input100   col-lg-6 mb-4 " >
<select name="role"   onChange={handleInput} value={userInput.role}   className="input100 border-0 " type="text" >
  
       <option   selected hidden>--Rôle--</option>
  
       <option  name="role"  value="coordinateur">coordinateur</option>
       <option  name="role"  value="encadrant">Encadrant</option>
        <option  name="role"  value="chef_dept">Chef département</option> 
        <option  name="role"   value="service_formation"> Service formation</option>
 </select>
</div>
 





 
    {/* Cancel Button */}
    
  

    
        <div className="form-group col-lg-6">
          <button type="submit" className="login100-form-btn"  style={{color: 'white'}}>
            
          Modifier
         
          </button>
  </div>    
  
     </div>


</form>
   
     {/*    </div> */}
      </div>



      {/* body */}



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





      //Stagiaire----------------------------------------------

      else{
        return (
          <>
            
                
      <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h3>Profil</h3>
      
                 
      
                </div>
      
                
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                
      
                  </ol>
                </div>
              </div>
            </div>
          </section>
      
      
          <br/>
            <div className="col-md-offset-3 col-md-9  mx-auto "  >
              <div className="form-container ">
         
      <form  >
                  <div className="float-left">
                  </div>
                  <h3 className="profile-username  mb-5 text-secondary "> {userInput.name} {userInput.prenom}</h3>
                 
                  
      
      
                 <div className="row">
                     <div className="col-md-6">
      
                 <ul className="list-group list-group-unbordered mb-3">
                 <li >
                    <p>  Email</p> <a className=" text-secondary">{userInput.email}</a>
                    </li>
                    <li>
                      <p >Num Cin/Passport</p> <a className=" text-secondary"> {userInput.cinoupassport_stagiaire}</a>
                    </li>
                    <li >
                      <p >Date naissance</p> <a className=" text-secondary">{userInput.datenaissance}</a>
                    </li>
                 
                    <li>
                      <p > Num Télephone</p> <a className="text-secondary">{userInput.telephone}</a>
                    </li>
                 </ul>
      
      
      
                     </div> 
      
                     <div className="col-md-6">
      
                     <ul className="list-group list-group-unbordered mb-3">
                   
                    <li>
                      <p >Adresse</p> <a className="text-secondary">{userInput.adresse}</a>
                    </li>
      
                    <li>
                      <p >Niveau d'étude</p> <a className="text-secondary">{userInput.niveauetude}</a>
                    </li>

                    <li>
                      <p >Spécialité</p> <a className="text-secondary">{userInput.specialite}</a>
                    </li>

                    <li>
                      <p >Filiére</p> <a className="text-secondary">{userInput.filiere}</a>
                    </li>
              
                  </ul>
                         
                     </div>
      
      
                 </div>
         
      
          {/* Cancel Button */}
          
      
          <br/>
              <div className="form-group col-lg-3 ">
            
                <a href="#" className="login100-form-btn  "  data-toggle="modal" data-target="#exampleModal" style={{color: 'white'}}>Modifier</a>  
                Modifier
               
             </div>
        <br/>
          
      
      
      </form>
         
              </div>
            </div>
            <br/><br/>
      
      
      
      
      
      
      
      
      
      
      
      
      {/* Afficher détails   */}
      <div>
      
      
        {/* Modal */}
        <div className="modal fade col-md-12" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog  ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modifier Profil</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
      
      {/* body */}
      
              <div className="col-md-offset-3 col-md-12">
           {/*    <div className="form-container"> */}
        
      <form onSubmit={updatProfileStagiaire }  >
        <div className="row">
      
      
      
      
       
           {/* utilisateur */}
           <div className="wrap-input100   col-lg-6 mb-4" >
                <input className="input100" type="text"  placeholder="Nom" name="name"   onChange={handleInput} value={userInput.name} />
                <span className="focus-input111" />
                <span className="symbol-input111">
              
                </span>
              
              </div>
                   {/* utilisateur */}
           <div className="wrap-input100   col-lg-6 mb-4" >
                <input className="input100" type="text" placeholder="Prénom"  name="prenom" onChange={handleInput} value={userInput.prenom} />
                <span className="focus-input111" />
                <span className="symbol-input111">
               
                </span>
              
              </div>
                   {/* utilisateur */}
           <div className="wrap-input100   col-lg-6 mb-4" >
                <input className="input100" type="email"   placeholder="Email" name="email" onChange={handleInput} value={userInput.email}/>
      
              </div>
      
              {/* utilisateur */}
           <div className="wrap-input100   col-lg-6 mb-4" >
                <input className="input100" type="number"  placeholder="Num Télephone" name="telephone"   onChange={handleInput} value={userInput.telephone}  />
                <span className="focus-input111" />
                <span className="symbol-input111">
                
                </span>
              
              </div>
                   {/* utilisateur */}
           <div className="wrap-input100   col-lg-6 mb-4" >
                <input className="input100" type="date"  placeholder="Date naissance"  name="datenaissance" onChange={handleInput} value={userInput.datenaissance} />
                <span className="focus-input111" />
                <span className="symbol-input111">
                 
                </span>
              
              </div>
      
                {/* utilisateur */}
                <div className="wrap-input100   col-lg-6 mb-4" >
                <input className="input100" type="text" placeholder="Adresse" name="adresse"  onChange={handleInput} value={userInput.adresse} />
                <span className="focus-input111" />
                <span className="symbol-input111">
                  
                </span>
              
              </div>

                {/* utilisateur */}
                <div className="wrap-input100   col-lg-6 mb-4" >
                <input className="input100" type="text" placeholder="Niveau d'étude" name="niveauetude"  onChange={handleInput} value={userInput.niveauetude} />
                <span className="focus-input111" />
                <span className="symbol-input111">
                  
                </span>
              
              </div>
                {/* utilisateur */}
                <div className="wrap-input100   col-lg-6 mb-4" >
                <input className="input100" type="text" placeholder="Spécialite" name="specialite"  onChange={handleInput} value={userInput.specialite} />
                <span className="focus-input111" />
                <span className="symbol-input111">
                  
                </span>
              
              </div>

                   {/* utilisateur */}
                   <div className="wrap-input100   col-lg-6 mb-4" >
                <input className="input100" type="text" placeholder="Filiére" name="filiere"  onChange={handleInput} value={userInput.filiere} />
                <span className="focus-input111" />
                <span className="symbol-input111">
                  
                </span>
              
              </div>
      

      
      
      
      
      
       
          {/* Cancel Button */}
          
        
      
          
              <div className="form-group col-lg-6">
                <button type="submit" className="login100-form-btn"  style={{color: 'white'}}>
                  
                Modifier
               
                </button>
        </div>    
        
           </div>
      
      
      </form>
         
           {/*    </div> */}
            </div>
      
      
      
            {/* body */}
      
      
      
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
}

export default TProfile
