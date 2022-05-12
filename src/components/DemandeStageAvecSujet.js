import React , { useState} from 'react'
import { useNavigate ,Link , NavLink} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function DemandeStageAvecSujet() {

  const Swal = require('sweetalert2');

    const navigate = useNavigate();
  
     //validation erreurs
     const [ error , setError] =useState ([]);


    const [ userInput , setUser] =useState ({
      //  niveauetude: '',
        typestage:'',
        nom_dept:'', 
        cinoupassport_demande:'', 
        error_list:[],
     
      
     
      });
     
      const handleInput = (e) => {
        e.persist();
       
        setUser({ ...userInput , [e.target.name]: e.target.value})
     
      }     

   
       
 const [ filedata , setFiledata] = useState([]);

 /* 
  const handleChange = (file) =>{
    setFiledata(file[0]);
   };
  */
 
   const handleFile  = (e) =>{
     setFiledata({ cv: e.target.files[0]});
    }
 

      const demandeSubmit = (e) => {
        e.preventDefault();
      
      
        const data = {
          //niveauetude:userInput.niveauetude,
          typestage:userInput.typestage,
          nom_dept:userInput.nom_dept,
          cinoupassport_demande:userInput.cinoupassport_demande,
          cv:filedata.cv,
          
          }
      
      
       
           axios.post('api/ajouter-demande-stage', data).then(res =>{
                if(res.data.status === 200){
                  Swal.fire ("Succès" , res.data.message , "success");
                  navigate('/pre-test');
                  setError([]);
                  
                 }
              
                else if(res.data.status === 400){
                  setError(res.data.validation_errors);
                  Swal.fire("Erreur" , " Vous devez remplir tous les champs","error");
           }
         
      
        });
     
      
      }
      

  return (
    <>







<div className="mx-auto form-container col-md-offset-3 col-md-8 ">
      
      <form  onSubmit={demandeSubmit}>
        
        
<div className="row">


   <div className="wrap-input100   col-lg-12 mb-4  ">
          <input className="input100" type="number"  name="cinoupassport_demande"  onChange={handleInput} value={userInput.cinoupassport_demande}  placeholder="  Num CIN ou Passport" />
          <span className="focus-input111" />
          <span className="symbol-input111">
            <i className=" fas fa-address-card"  aria-hidden="true" />
          </span>
         
        </div>

{/* 
<div className="wrap-input100   col-lg-12 mb-4  " >
<select name="niveauetude"  onChange={handleInput} value={userInput.niveauetude}  className="input100 border-0 " type="text" >

    <option selected hidden>--Niveau d'étude--</option>
    <option name="niveauetude" value="Licence">Licence</option>
    <option name="niveauetude" value="Mastére">Mastére</option>
    <option name="niveauetude" value="Ingénieurie">Ingénieurie</option>

 </select>
<span className="focus-input111" />
<span className="symbol-input111">
<i className=" fas fa-book-reader" aria-hidden="true" />
</span>
</div> */}




<div className="wrap-input100   col-lg-12 mb-4  " >
<select  name="typestage"  onChange={handleInput} value={userInput.typestage} className="input100 border-0 " type="text" >
<option  selected hidden>--Type de stage--</option>
    <option name="typestage" value="PFE">PFE</option> 
    <option name="typestage" value="Pérfectionnement">Pérfectionnement</option>
    {/* <option name="typestage" value="Observation">Observation</option> */}
 </select>
<span className="focus-input111" />
<span className="symbol-input111">
<i className="fas fa-user-graduate" aria-hidden="true" />
</span>
</div>




<div className="wrap-input100   col-lg-12 mb-4  " >
<select name="nom_dept" onChange={handleInput} value={userInput.nom_dept} className="input100 border-0 " type="text" >
<option   selected hidden>--Nom Département--</option>
<option name="nom_dept" value="IT">IT</option>
    <option name="nom_dept" value="Marketing">Marketing</option>
    <option name="nom_dept" value="BI"> BI</option>
    <option name="nom_dept" value="Développement">Développement </option>
    <option name="nom_dept" value="DSI">DSI </option>
    <option name="nom_dept" value="Finance">Finance </option>

 </select>
<span className="focus-input111" />
<span className="symbol-input111">
<i className=" fas fa-building"  aria-hidden="true" />
</span>
</div>


 

       {/*Cv */}
{/*  <div className="wrap-input100   col-lg-12 mb-4  form-group " >
          <input className="input100 mt-4" type="file"  name="cv"  onChange={handleFile}   />
          <span className="focus-input111" />
          <span className="symbol-input111">
           <i className=" fas fa-cloud-upload-alt "  aria-hidden="true" />
          </span>
       
        </div>  */}


<div className="wrap-input100   col-lg-12 mb-4  form-group " >   
<p className="text-center   text-secondary"> Déposer votre CV</p>
     
   <div className="frame">
      <div className="d-flex justify-content-center ">
       
          <div className="dropzone">
              <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon  " />
              <input type="file" name="cv"  onChange={handleFile}  className="upload-input " />
         </div>
     </div> 


  </div>
</div>
       







     <div className="container-login100-form-btn col-md-6 ">
          <button type="submit" className="login100-form-btn">
          Envoyer
          </button>
        </div>


{/* 
        <div className="container-login100-form-btn col-md-6 ">
        <Link  to="#" className="login100-form-btn" style={{color: 'white'}}>Envoyer</Link>
        </div>
  */}
     

        <div className="container-login100-form-btn col-md-6 ">
        <Link  to="/" className="login100-form-btn" style={{color: 'white'}}>Annuler</Link>
        </div>
 
 

 </div>

      </form>
   </div>





































































 {/*  <section className="content"> */}
{/*

                
<div className="form-group">                       
  <select name="niveauetude"  onChange={handleInput} value={userInput.niveauetude}  className="form-control"  >
    <option disabled selected>--Niveau d'étude--</option>
    <option name="niveauetude" value="Licence">Licence</option>
    <option name="niveauetude" value="Mastére">Mastére</option>
    <option name="niveauetude" value="Ingénieurie">Ingénieurie</option>
  </select>     
 </div>



<div className="form-group">                       
  <select name="typestage"  onChange={handleInput} value={userInput.typestage} className="form-control"   >
    <option disabled selected>--Type de stage--</option>
    <option name="typestage" value="PFE">PFE</option>
    <option name="typestage" value="Pérfectionnement">Pérfectionnement</option>
    <option name="typestage" value="Observation">Observation</option>
  </select>     
 </div>

 <div  className="form-group">           
  <select name="nom_dept" onChange={handleInput} value={userInput.nom_dept} className="form-control" >
    <option disabled selected>--Nom Département--</option>
    <option name="nom_dept" value="IT">IT</option>
    <option name="nom_dept" value="Marketing">Marketing</option>
    <option name="nom_dept" value="BI"> BI</option>
    <option name="nom_dept" value="Développement web">Développement web</option>
  </select>
</div>

 
        
      <div className="btn btn-primary btn-sm float-left waves-effect waves-light">
      <i className="fas fa-upload" />
    <span>   Votre CV   </span>
        <input type="file"  name="cv" onChange={handleInput} value={userInput.cv}  />
      </div>
   
  





              </div>
              
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">Envoyer</button>
              </div>
            </form>
          </div>
         
       </div>
        </div>
   </div>  */}
   {/* </section> */}
    </>
  )
}

export default DemandeStageAvecSujet
