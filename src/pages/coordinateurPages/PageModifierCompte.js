import React , { useEffect, useState} from 'react'
import { useNavigate ,Link, NavLink ,useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageModifierCompte() {

const Swal = require('sweetalert2');


const navigate = useNavigate();


 //validation erreurs
 const [utiErrnom,setUtiErrnom]=useState(false);
 const [utiErrprenom,setUtiErrprenom]=useState(false);
 const [utiErremail,setUtiErremail]=useState(false);
 const [utiErrtelephone,setUtiErrtelephone]=useState(false);
 const [utiErrmtpasse,setUtiErrmtpasse]=useState(false);

 const [utiErrstrn,setUtiErrstrn]=useState(false);
 const [utiErrstrp,setUtiErrstrp]=useState(false);


 
const handleInput = (e) => {
  e.persist();
 
  setUser({ ... userInput , [e.target.name]: e.target.value})

  //Désactiver
 // setCheckbox({ ...checkbox,[e.target.name]:e.target.checked});


   //erreur étre string  ... 
   if( !userInput.nom.match('[a-zA-Z]') ) {  
    setUtiErrstrn(true)
   }
   else{
    setUtiErrstrn(false)
   }

    //erreur étre string  ... 
    if( !userInput.prenom.match('[a-zA-Z]')) {  
      setUtiErrstrp(true)
     }
     else{
      setUtiErrstrp(false)
     }
      


  //erreur nom 

 if(userInput.nom.length < 2 || userInput.nom.length >20){
  setUtiErrnom(true)
 }
 else{
  setUtiErrnom(false)
 }
 
//erreur prénom
 if(userInput.prenom.length < 2  || userInput.prenom.length >20){
  setUtiErrprenom(true)
 }
 else{
  setUtiErrprenom(false)
 }

 //erreur e-mail
 if(!userInput.email.includes('@')){
  setUtiErremail(true)
 }
 else{
  setUtiErremail(false)
 }


 
 //erreur telephone

 if( !(userInput.numTel.match('[0-9]{7}')) ) {  
  setUtiErrtelephone(true)
 }
 else{
  setUtiErrtelephone(false)
 }

    //erreur mot de passe 
    if(userInput.password.length <4  ){
      setUtiErrmtpasse(true)
     }
     else{
      setUtiErrmtpasse(false)
     }

 

                 
       
}

 

//Activer ou Désactiver
const [checkbox,setCheckbox]= useState([]);


 const params=useParams();
 
 const [ userInput , setUser] =useState ([]);
 const [ error , setError] =useState ([]);

 const[loading,setLoading] = useState(true);


 useEffect(() => {
    
   const userId = params.id;
    
   axios.get(`api/comptes/${userId}`).then(res =>{
      if(res.data.status === 200 ){
       setUser(res.data.user);
      }
      else if(res.data.status === 404){
        Swal.fire("Error",res.data.message,"error");
        navigate('/coordinateur/afficher-tous');
      }
       setLoading(false);
    });
 }, [params]);


 

 

//Activer ou Désactiver
/* const handleCheckbox = (e) => {
  e.persist();
  setCheckbox({ ...checkbox,[e.target.name]:e.target.checked});
}
 */








const updateUser = (e) => {
   e.preventDefault();

   const userId = params.id;
   const data = userInput;
   
   //Activer ou Désactiver
   /* FormData.append('etat',checkbox.etat ? 'inactive': 'active'); //activer ou désactiver un utilisateur
 */


   axios.put(`api/comptes/${userId}` , data).then( res => {
     if(res.data.status === 200){
       Swal.fire("Succès" ,res.data.message , "success");
       navigate('/coordinateur/afficher-tous');
       setError([]);

     }
     else if(res.data.status === 422){
            setError(res.data.validation_errors);
            Swal.fire("Erreur dans les champs" , "Vérifier les champs!", "error");
     }
     else if(res.data.status === 404){
      Swal.fire("Error" , res.data.message , "error");
      navigate('/coordinateur/afficher-tous');
     }
   });




}








if(loading){
  return <h5>Loading Modifier Compte...</h5>
}

  return (
    <>



<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h3>Modifier Compte</h3>
          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
        
              <NavLink className={(ndata) => ndata.isActive && "active" }  to='/coordinateur/acceuil'>Acceuil</NavLink>  <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/coordinateur/modifier-compte'>Modifier Compte</NavLink>
            </ol>
          </div>
        </div>
      </div>
    </section>


    <br/>








      <div className="col-md-offset-3 col-md-12">
        <div className="form-container">
        <form onSubmit={updateUser}>
<div className="row">



{/* First Name */}
 <div className="wrap-input100   col-lg-6 mb-4  " >
      <input className="input100" type="text"  name="nom"  onChange={handleInput} value={userInput.nom}  placeholder="Nom" required />
      <span className="focus-input111" />
      <span className="symbol-input111">
        {/* <i className="fas fa-user"  aria-hidden="true" /> */}
      </span>
      {utiErrstrn? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom est chaine de caractéres! </span> :""}  
      {utiErrnom ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom entre 3 et 20 caractéres!</span> :""}  
         
    </div>
 











{/* Last Name */}
<div className="wrap-input100   col-lg-6 mb-4  " >
      <input className="input100" type="text"  name="prenom"  onChange={handleInput} value={userInput.prenom}  placeholder="Prénom" required/>
      <span className="focus-input111" />
      <span className="symbol-input111">
        {/* <i className="fas fa-user"  aria-hidden="true" /> */}
      </span>
       
     {utiErrstrp ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> prénom est chaine de caractéres!  </span> :""}  
     {utiErrprenom ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />prénom entre 3 et 20 caractéres!</span> :""}  
        
    </div>
  

 {/* Email Address */}
 <div className="wrap-input100   col-lg-6 mb-4  " >
      <input className="input100" type="text"  name="email"  onChange={handleInput} value={userInput.email}  placeholder="Email" required />
      <span className="focus-input111" />
      <span className="symbol-input111">
        {/* <i className="fas fa-envelope"  aria-hidden="true" /> */}
      </span>
      {utiErremail ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> email doit contenir symbol @ </span> :""}  

    </div>
  





{/* Phone Number */}

<div className="wrap-input100   col-lg-6 mb-4  ">
      <input className="input100" type="tel"  name="numTel"  onChange={handleInput} value={userInput.numTel}  placeholder="Num Telephone" required />
      <span className="focus-input111" />
      <span className="symbol-input111">
        {/* <i className="fas fa-phone-alt"  aria-hidden="true" /> */}
      </span>

      {utiErrtelephone ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />le numéro de télephone doit contenir 8 chiffres </span> :""}  

    </div>
 




  
{/* Date*/}
<div className="wrap-input100   col-lg-6 mb-4 ">
      <input className="input100" type="date"  name="datenaissance"  onChange={handleInput} value={userInput.datenaissance}  placeholder="Date naissance" required />
      <span className="focus-input111" />
      <span className="symbol-input111">
        {/* <i className="fas fa-calendar"  aria-hidden="true" /> */}
      </span>
    </div>
 


  


{/* Matricule */}

<div className="wrap-input100   col-lg-6 mb-4  ">
      <input className="input100" type="text"  name="matricule"  onChange={handleInput} value={userInput.matricule}  placeholder="Matricule" required />
      <span className="focus-input111" />
      <span className="symbol-input111">
        {/* <i className=" fas fa-clone" aria-hidden="true" /> */}
      </span>
    </div>
 







 {/* Role */}
 <div className="wrap-input100   col-lg-6 mb-4  " >
<select  name="role"  onChange={handleInput} value={userInput.role}  className="input100 border-0 " type="text">
<option   selected hidden>--Rôle--</option>
        
  
        <option  name="role"  value="encadrant">Encadrant</option>
        <option  name="role"  value="chef_dept">Chef département</option> 
        <option  name="role"   value="service_formation"> Service formation</option>
 </select>

        
          <span className="focus-input111" />
          <span className="symbol-input111">
            {/* <i className="fas fa-user-tie" aria-hidden="true" /> */}
          </span>
        </div>

  {/* Nom département */}
      
  <div className="wrap-input100   col-lg-6 mb-4 " >
<select  name="departement" onChange={handleInput} value={userInput.departement}   className="input100 border-0 " type="text" >
  
       <option   selected hidden>--Nom département--</option>
  
        <option  name="departement"  value="Marketing">Marketing</option>
        <option  name="departement" value="BI">BI</option> 
        <option  name="departement"  value="Développement"> Développement</option>
 </select>
</div>

 
{/* Etat */}
<div className="wrap-input100   col-lg-12 mb-4 " >
<select  name="etat"  onChange={handleInput} value={userInput.etat}  className="input100 border-0 " type="text" >
{/* <option  selected hidden>--Etat--</option> */}
  
        <option selected  name="etat"  value="Active">Activer</option>
        <option  name="etat"  value="Désactive">Désactiver</option> 
 </select>

        
          <span className="focus-input111" />
          <span className="symbol-input111">
            {/* <i className="fas fa-user-tie" aria-hidden="true" /> */}
          </span>
        </div>



{/* Password */}
<div className="wrap-input100   col-lg-6 mb-4  " >
      <input className="input100" type="text"  name="password"  onChange={handleInput} value={userInput.password}  placeholder="Mot de passe" required/>
      <span className="focus-input111" />
      <span className="symbol-input111">
        <i className=" fas fa-lock"  aria-hidden="true" />
      </span>

     {utiErrmtpasse? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />le mot de passe doit contenir au minimum  5 caractères </span> :""}   
     
    </div>
  






{/* Password Confirmation */}
 <div className="wrap-input100   col-lg-6 mb-4  " >
      <input className="input100" type="text"  name="password_confirmation"  onChange={handleInput} value={userInput.password_confirmation}  placeholder="Confirmer Mot de passe" required/>
      <span className="focus-input111" />
      <span className="symbol-input111">
        {/* <i className=" fas fa-lock"  aria-hidden="true" /> */}
      </span>

    
      {error.password? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> vous devez Confirmer le mot de passe</span> :""}  

    </div> 


 

  {/* Activer ou Désactiver checkbox etat "désactiver ou activer utilisateur" à cocher  */}
{/*   <div className='col-md-6 mt-4'>
                <div className='form-check'>
                  <input name='etat' onChange={handleCheckbox} defaultChecked={checkbox.etat === 'inactive' ? true : false } className="form-check-input" id='flexCheckChecked' type='checkbox' />
                 <label className='text-danger form-check-label '> désactiver cet utilisateur</label> 
                  <p  className='text-secondary form-check-label ' >désactiver cet utilisateur</p>
                </div>
              </div> */}





              {/* <div className='col-md-6 mt-4'>
                <div className='form-check'>
                  <input name='etat' onChange={handleInput} defaultChecked={userInput.etat === 'inactive' ? true : false }  className="form-check-input" id='flexCheckChecked' type='checkbox' />
                   <label className='text-danger form-check-label '> désactiver cet utilisateur</label>
                  <p  className='text-secondary form-check-label ' >désactiver cet utilisateur</p>
                </div>
              </div> */}


{/* Cancel Button */}

<div className="form-group col-lg-2">

      <button className="persb-btn">

       <Link to="/coordinateur/afficher-tous" style={{color: 'white'}}>
      Annuler
        </Link> 

      </button>
   
    </div>





<div className="form-group col-lg-3 ">
      <button type="submit" className="login100-form-btn">
        
      Modifier Compte
     
      </button>
    </div>



</div>
</form>







         
        </div>
      </div>
   <br/>

     

   </>
  )
}

export default PageModifierCompte
