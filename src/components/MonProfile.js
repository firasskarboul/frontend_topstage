import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate  ,useParams } from 'react-router-dom'; 
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function MonProfile() {

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



   
   




    
 




  /*   useEffect(()=> {
      
        axios.get('api/profile').then(res=> {
          if(res.status === 200) {
            //if(res.valid){
              setUserInput(res.user);
                //console.log(res.user)
           // }
          
 
          }
          setLoading(false);
        });
    },[]);
 */

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
  







    if(loading){
        return <h5>Loading Profile...</h5>
      }




    
      

      else if(userInput.role === 'encadrant' || userInput.role === 'chef_dept' ||userInput.role === 'service_formation'  ){
   
          return(
       

        <>











            <section className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1>Profile</h1>
      </div>
   
    </div>
  </div>
</section>





{/* Test */}









{/* Main content */}

<div className="container-fluid">
<div className="row">

<div className="col-md-12">
 <div className="card">

   <div className="card-header p-2">
     <ul className="nav nav-pills">
       <li className="nav-item"><a className="nav-link" href="#activity" data-toggle="tab">Profile</a></li>
       <li className="nav-item"><a className="nav-link " href="#timeline" data-toggle="tab">Modifier</a></li>
     </ul>
   </div>{/* /.card-header */}


   <div className="card-body">
     <div className="tab-content">



 {/* profile  utilisateur   */}




<section className="content tab-pane" id="activity">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12 ">
       
        <div className="card card-primary card-outline">
          <div className="card-body box-profile">
            <div className="text-center">
              {/* <img className="profile-user-img img-fluid img-circle" src="../../dist/img/user4-128x128.jpg" alt="User profile picture" /> */}
            </div>
            <h3 className="profile-username text-center mb-5 text-secondary"> {userInput.nom} {userInput.prenom}</h3>
           
            


           <div className="row">
               <div className="col-md-6">

           <ul className="list-group list-group-unbordered mb-3">
           <li className="list-group-item">
                <b className="text-dark">Nom et Prénom</b> <a className="float-right text-secondary">{userInput.nom} {userInput.prenom}</a>
              </li>
              <li className="list-group-item">
                <b className="text-dark">Email</b> <a className="float-right text-secondary"> {userInput.email}</a>
              </li>
              <li className="list-group-item">
                <b className="text-dark">Num Télephone</b> <a className="float-right  text-secondary">{userInput.numTel}</a>
              </li>
           
            </ul>



               </div>

               <div className="col-md-6">

               <ul className="list-group list-group-unbordered mb-3">
              <li className="list-group-item">
                <b className="text-dark">Matricule</b> <a className="float-right  text-secondary">{userInput.matricule}</a>
              </li>
              <li className="list-group-item ">
                <b className="text-dark">Role</b> <a className="float-right  text-secondary">{userInput.role}</a>
              </li>

              <li className="list-group-item ">
                <b className="text-dark">Date naissance</b> <a className="float-right  text-secondary">{userInput.datenaissance}</a>
              </li>
              <li className="list-group-item ">
                <b className="text-dark">Password</b> <a className="float-right  text-secondary">{userInput.password}</a>
              </li>
        
            </ul>
                   
               </div>


           </div>

 
          </div>
       
        </div>
       
      </div></div></div></section>

{/* end profile */}






{/* modifier profile */}

       {/* /.tab-pane */}
       <div className="tab-pane" id="timeline">
         <form  onSubmit={updatProfile} className="form-horizontal">
           <div className="form-group row">
             <label htmlFor="inputName" className="col-sm-2 col-form-label text-dark">Nom</label>
             <div className="col-sm-10">
               <input  type="text" className=" form-control bg-light" id="inputName" placeholder="Nom" name="nom"   onChange={handleInput} value={userInput.nom} />
             </div>
           </div>
           <div className="form-group row">
             <label htmlFor="inputEmail" className="col-sm-2 col-form-label text-dark">Prénom</label>
             <div className="col-sm-10">
               <input type="text" className="form-control  bg-light" id="inputEmail" placeholder="Prénom"  name="prenom" onChange={handleInput} value={userInput.prenom}  />
             </div>
           </div>
           <div className="form-group row">
             <label htmlFor="inputName2" className="col-sm-2 col-form-label text-dark"  >Email</label>
             <div className="col-sm-10">
               <input type="text" className="form-control  bg-light" id="inputName2" placeholder="Email" name="email" onChange={handleInput} value={userInput.email} />
             </div>
           </div> 
           <div className="form-group row">
             <label htmlFor="inputName2" className="col-sm-2 col-form-label text-dark">Num Télephone</label>
             <div className="col-sm-10">
               <input type="text" className="form-control  bg-light" id="inputName2" placeholder="Num Télephone" name="numTel"   onChange={handleInput} value={userInput.numTel}  />
             </div>
           </div>
          
           <div className="form-group row">
             <label htmlFor="inputSkills" className="col-sm-2 col-form-label text-dark">Date naissance</label>
             <div className="col-sm-10"> 
               <input type="date" className="form-control  bg-light" id="inputSkills" placeholder="Date naissance"  name="datenaissance" onChange={handleInput} value={userInput.datenaissance} />
             </div>
           </div>

           <div className="form-group row">
             <label htmlFor="inputSkills" className="col-sm-2 col-form-label text-dark">Matricule</label>
             <div className="col-sm-10">
               <input type="text" className="form-control  bg-light" id="inputSkills" placeholder="Matricule" name="matricule"  onChange={handleInput} value={userInput.matricule} />
             </div>
           </div>



          
           <div className="form-group row">
             <div className="offset-sm-2 col-sm-10">
               <button type="submit" className="btn btn-primary">Modifier</button>
             </div>
           </div>
         </form>
       </div>
       {/* /.tab-pane */}
{/* end modifier profile */}




     </div>
  
   </div>
 </div>

</div>

</div>

</div>





{/* end Test */}


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>


</>
          )
      }

 






 // stagiaire

else{
    return(
 

  <>







<section className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1>Profile</h1>
      </div>

    </div>
  </div>
</section>





{/* Test */}









{/* Main content */}

<div className="container-fluid">
<div className="row">

<div className="col-md-12">
 <div className="card">

   <div className="card-header p-2">
     <ul className="nav nav-pills">
       <li className="nav-item"><a className="nav-link" href="#activity" data-toggle="tab">Profile</a></li>
       <li className="nav-item"><a className="nav-link" href="#timeline" data-toggle="tab">Modifier</a></li> 
     </ul>
   </div>{/* /.card-header */}


   <div className="card-body">
     <div className="tab-content">


 {/* profile     */}




<section className="content tab-pane"  id="activity">
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-12 ">
       
        <div className="card card-primary card-outline">
          <div className="card-body box-profile">
            <div className="text-center">
            
            </div>
            <h3 className="profile-username text-center mb-5 text-secondary"> {userInput.name} {userInput.prenom}</h3>
           
            


           <div className="row">
               <div className="col-md-6">

           <ul className="list-group list-group-unbordered mb-3">
           <li className="list-group-item">
                <b className="text-dark">Email</b> <a className="float-right text-secondary">{userInput.email}</a>
              </li>
              <li className="list-group-item">
                <b className="text-dark">Num CIN</b> <a className="float-right text-secondary">{userInput.cin}</a>
              </li>
              <li className="list-group-item">
                <b className="text-dark">Date naissance</b> <a className="float-right  text-secondary">{userInput.datenaissance}</a>
              </li>
              <li className="list-group-item">
                <b className="text-dark">Num Télephone</b> <a className="float-right  text-secondary">{userInput.telephone}</a>
              </li>
           
            </ul>



               </div>

               <div className="col-md-6">

               <ul className="list-group list-group-unbordered mb-3">
              <li className="list-group-item">
                <b className="text-dark">Adresse</b> <a className="float-right  text-secondary">{userInput.adresse}</a>
              </li>
              <li className="list-group-item ">
                <b className="text-dark">Niveau d'étude</b> <a className="float-right  text-secondary">{userInput.niveauetude}</a>
              </li>

              <li className="list-group-item ">
                <b className="text-dark">Spécialité</b> <a className="float-right  text-secondary">{userInput.specialite}</a>
              </li>
        
              <li className="list-group-item ">
                <b className="text-dark">Filiére</b> <a className="float-right  text-secondary">{userInput.filiere}</a>
              </li>
        
            </ul>
                   
               </div>


           </div>

          
          </div>
       
        </div>
       
      </div></div></div></section>

{/* end profile */}






{/* modifier profile */}

       {/* /.tab-pane */}
      <div className="tab-pane" id="timeline">
         <form className="form-horizontal">
           <div className="form-group row">
             <label htmlFor="inputName" className="col-sm-2 col-form-label text-dark">Nom</label>
             <div className="col-sm-10">
               <input  type="text" className=" form-control bg-light" id="inputName"  name="name"   onChange={handleInput} value={userInput.name} placeholder="Nom" />
             </div>
           </div>
           <div className="form-group row">
             <label htmlFor="inputEmail" className="col-sm-2 col-form-label text-dark">Prénom</label>
             <div className="col-sm-10">
               <input type="text" className="form-control  bg-light" id="inputEmail" name="prenom"   onChange={handleInput} value={userInput.prenom} placeholder="Prénom" />
             </div>
           </div>
           <div className="form-group row">
             <label htmlFor="inputName2" className="col-sm-2 col-form-label text-dark">Email</label>
             <div className="col-sm-10">
               <input type="email" className="form-control  bg-light" id="inputName2" name="email"   onChange={handleInput} value={userInput.email} placeholder="Email" />
             </div>
           </div>
           <div className="form-group row">
             <label htmlFor="inputName2" className="col-sm-2 col-form-label text-dark">Num CIN</label>
             <div className="col-sm-10">
               <input type="text" className="form-control  bg-light" id="inputName2" name="cin"   onChange={handleInput} value={userInput.cin} placeholder="Num Télephone" />
             </div>
           </div>
           <div className="form-group row">
             <label htmlFor="inputName2" className="col-sm-2 col-form-label text-dark">Date naissance</label>
             <div className="col-sm-10">
               <input type="text" className="form-control  bg-light" id="inputName2" name="datenaissance"   onChange={handleInput} value={userInput.datenaissance} placeholder="Date naissance" />
             </div>
           </div>
          
          
           <div className="form-group row">
             <label htmlFor="inputSkills" className="col-sm-2 col-form-label text-dark">Num Télephone</label>
             <div className="col-sm-10"> 
               <input type="text" className="form-control  bg-light" id="inputSkills" name="numtel"   onChange={handleInput} value={userInput.numtel} placeholder="Num Télephone" />
             </div>
           </div>

           <div className="form-group row">
             <label htmlFor="inputSkills" className="col-sm-2 col-form-label text-dark">Adresse</label>
             <div className="col-sm-10">
               <input type="text" className="form-control  bg-light" id="inputSkills" name="adresse"   onChange={handleInput} value={userInput.adresse} placeholder="Adresse" />
             </div>
           </div>

           <div className="form-group row">
             <label htmlFor="inputSkills" className="col-sm-2 col-form-label text-dark">Niveau d'étude</label>
             <div className="col-sm-10">
               <input type="text" className="form-control  bg-light" id="inputSkills" name="niveauetude"   onChange={handleInput} value={userInput.niveauetude}  placeholder="Niveau d'étude" />
             </div>
           </div>

           <div className="form-group row">
             <label htmlFor="inputSkills" className="col-sm-2 col-form-label text-dark">Spécialité</label>
             <div className="col-sm-10">
               <input type="text" className="form-control  bg-light" id="inputSkills" name="specialite"   onChange={handleInput} value={userInput.specialite} placeholder="Spécialité" />
             </div>
           </div>

           <div className="form-group row">
             <label htmlFor="inputSkills" className="col-sm-2 col-form-label text-dark">Filiére</label>
             <div className="col-sm-10">
               <input type="text" className="form-control  bg-light" id="inputSkills"  name="filiere"   onChange={handleInput} value={userInput.filiere} placeholder="Filiére" />
             </div>
           </div>



          
           <div className="form-group row">
             <div className="offset-sm-2 col-sm-10">
               <button type="submit" className="btn btn-primary">Modifier</button>
             </div>
           </div>
         </form>
       </div> 
       {/* /.tab-pane */}
{/* end modifier profile */}




     </div>
  
   </div>
 </div>

</div>

</div>

</div>























{/* end Test */}

<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>


      
</>
    )
}


}

export default MonProfile
