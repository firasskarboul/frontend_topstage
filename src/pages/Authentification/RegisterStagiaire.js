
import React , { useState} from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';


function RegisterStagiaire() {
  const Swal = require('sweetalert2');
//
const [etatcheckbox,setEtatcheckbox]= useState([]);

const handleCheckbox = (e) => {
  e.preventDefault();
  
 
    //Désactiver
    setEtatcheckbox({ ...etatcheckbox,[e.target.name]:e.target.checked});
  
    console.log("Vous étes", etatcheckbox.etat);
  
 
}




//



    const navigate = useNavigate();

    //validation erreurs
    // const [stgErrvide,setStgErrvide]=useState(false);
    const [stgErrnom,setStgErrnom]=useState(false);
    const [stgErrprenom,setStgErrprenom]=useState(false);
    const [stgErremail,setStgErremail]=useState(false);
    const [stgErrcin,setStgErrcin]=useState(false);
    const [stgErrtelephone,setStgErrtelephone]=useState(false);
    const [stgErrmtpasse,setStgErrmtpasse]=useState(false);
    const [stgErrconfmtpasse,setStgErrconfmtpasse]=useState(false);
    const [stgErrstrn,setStgErrstrn]=useState(false);
    const [stgErrstrp,setStgErrstrp]=useState(false);

    const [ error , setError] =useState ([]);
      //Register
     const [ registerInput , setRegister] =useState ({
       name: '',
       prenom: '',
       datenaissance:'',
       email: '',
       cinoupassport_stagiaire:'', 
       niveauetude:'', 
       specialite:'',
       filiere:'',
       adresse:'',
       telephone:'',
       password:'',
       password_confirmation:'',
       error_list :[],
      
     
    
     });
  
   
  
  
  
  
  
  
    const handleInput = (e) => {
       e.persist();
       //Register
       setRegister({ ... registerInput , [e.target.name]: e.target.value})
  
  
      //champ vide
     /*  if(registerInput.nam<=1)
       {
          setStgErrvide(true)
       }
       else
       {
           setStgErrvide(false)
       } */
    
  
      //erreur nom 
  
       if(registerInput.name.length < 2 || registerInput.name.length >20){
        setStgErrnom(true)
       }
       else{
        setStgErrnom(false)
       }
       
      //erreur prénom
       if(registerInput.prenom.length < 2  || registerInput.prenom.length >20){
        setStgErrprenom(true)
       }
       else{
        setStgErrprenom(false)
       }
  
       //erreur e-mail
       if(!registerInput.email.includes('@')){
        setStgErremail(true)
       }
       else{
        setStgErremail(false)
       }
  
  
       //erreur cin
     
     /*   if(!(registerInput. cinoupassport_stagiaire.match('[0-9]{7}')) ){
        setStgErrcin(true)
       }
       else{
        setStgErrcin(false)
       } */
  
       //erreur telephone
     
       if( !(registerInput.telephone.match('[0-9]{7}' )) ) {  
        setStgErrtelephone(true)
       }
       else{
        setStgErrtelephone(false)
       }
  
        //erreur mot de passe 
        if(registerInput.password.length <4  ){
          setStgErrmtpasse(true)
         }
         else{
          setStgErrmtpasse(false)
         }
  
          //erreur confirmation  mot de passe !!!!!
        if(registerInput.password_confirmation === registerInput.password){
          setStgErrconfmtpasse(false)
         }
         else{
          setStgErrconfmtpasse(true)
         }
  
  
       //erreur étre numérique cin/telephone
     
     /*   if (!registerInput.telephone.match([0-9])) {
        setStgErrnumtelephone(true)
      }
      else{
       setStgErrnumtelephone(false)
      } */
  
  
  
       //erreur étre string  ... 
       if( !(registerInput.name.match('[a-z-A-Z]')) ) {  
        setStgErrstrn(true)
       }
       else{
        setStgErrstrn(false)
       }

          //erreur étre string  ... 
          if( !(registerInput.prenom.match('[a-z-A-Z]')) ) {  
            setStgErrstrp(true)
           }
           else{
            setStgErrstrp(false)
           }
      
  
  
  
  
       
    }
  
  
  
  
  
  
  
    const registerSubmit = (e) => {
      e.preventDefault();
  
      const data = {
        name:registerInput.name,
        prenom:registerInput.prenom,
        datenaissance:registerInput.datenaissance,
        email:registerInput.email,
        cinoupassport_stagiaire:registerInput.cinoupassport_stagiaire,
        //passport: registerInput.passport,
        niveauetude:registerInput.niveauetude,
        specialite:registerInput.specialite,
        filiere:registerInput.filiere,
        adresse:registerInput.adresse,
        telephone:registerInput.telephone,
        password:registerInput.password,
        password_confirmation:registerInput.password_confirmation,
  
        }
  
      
  
  
      axios.get('/sanctum/csrf-cookie').then(response => {
         axios.post('api/register-stagiaire', data).then(res =>{
              if(res.data.status === 200){
                  localStorage.setItem('auth_token' , res.data.access_token);
                  localStorage.setItem('auth_name' , res.data.name);
              }
                
              if( res.data.password === res.data.password_confirmation){
                Swal.fire("Succès" , res.data.message , "success");
               // navigate('/etudiant/acceuil');
                     navigate('/login-stagiaire');
                    
                  }
                 
        else if(res.data.status === 422){
          Swal.fire("Erreur" , res.data.message , "error");
                  setRegister({...registerInput  , error_list : res.data.validation_errors});
              }  
  

        
        //  else {
        //     Swal.fire("Erreur" , res.data.message , "error");
        //          setError(res.data.uni_errors);
        //        // setRegister({...registerInput  , error_list : res.data.validation_errors});
              
        //     } 
      });
    });
    
  }
  
  
























  var afficher_champ="";
  if(etatcheckbox.etat){
  afficher_champ =
   
           <>
            <div className="wrap-input100 validate-input" >
            <input className="input100" type="number" min="0"   name="cinoupassport_stagiaire" onChange={handleInput} value={registerInput.cinoupassport_stagiaire} placeholder="Num Passport" required/>
            <span className="focus-input100" />
            <span className="symbol-input100">
              <i className="fas fa-atlas"  aria-hidden="true" />
            </span>
          </div>
         {/* {stgErrcin ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> le numéro de cin doit contenir 8 chiffres </span> :""}   */}
  
           
           </>
        
             
          
  }else {
   afficher_champ =
    <>
   
    <div className="wrap-input100 validate-input">
    <input className="input100" type="number"  min="0"  name="cinoupassport_stagiaire" onChange={handleInput} value={registerInput.cinoupassport_stagiaire} placeholder="Num Cin" required/>
    <span className="focus-input100" />
    <span className="symbol-input100">
      <i className=" fas fa-address-card"  aria-hidden="true" />
    </span>
    {error.cinoupassport_stagiaire? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />Cin Déjà existe!</span> :""}  

  </div>
  {/* {stgErrcin ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> le numéro de cin doit contenir 8 chiffres </span> :""}   */}
  </>
  }







  return (
    <>
          {/* <div className="container-login100  "> */}
           
    <div className="wrap-login101 border ">
     <form onSubmit={registerSubmit}>
        
  <div className="row"> 
 
<div className="col-lg-6">
 
        <img src="../../dist/img/topnetStage.png"  className="brand-image img-circle col-lg-11"/>


        <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="name"  onChange={handleInput} value={registerInput.name}  placeholder="Nom" required />
            
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fas fa-user" aria-hidden="true" />
          </span>
        </div>
    {/* {nameError ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />vous devez remplir le champ!!!</span> :""}  */}
    {/* {registerInput.error_list.name ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />{registerInput.error_list.name}  </span> :""}  */}
   
    {/* {stgErrvide ? <span>vous de</span> : ""} */}
  {stgErrstrn ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom est chaine de caractéres! <br/></span> :""}  
  {stgErrnom ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom entre 3 et 20 caractéres!</span> :""}  

  
  
       

        <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="prenom" onChange={handleInput} value={registerInput.prenom} placeholder="Prénom" required/>
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fas fa-user" aria-hidden="true" />
          </span>
        </div>
        {/* {registerInput.error_list.prenom ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />{registerInput.error_list.prenom}  </span> :""}  */}
        {stgErrstrp ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> prénom est chaine de caractéres! <br/></span> :""}  
        {stgErrprenom ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />prénom entre 3 et 20 caractéres!</span> :""}  
        

        <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="email" onChange={handleInput} value={registerInput.email}  placeholder="Email" />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-envelope" aria-hidden="true" />
          </span>
        </div>
       {stgErremail ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> email doit contenir symbol @ </span> :""}  

        <div className="wrap-input100 validate-input" >
          <input className="input100" type="date" name="datenaissance" onChange={handleInput} value={registerInput.datenaissance} placeholder="Date de naissance" required />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fas fa-calendar"  aria-hidden="true" />
          </span>
        </div>
        {/* {registerInput.error_list.datenaissance ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />{registerInput.error_list.datenaissance}  </span> :""}  */}



    {/* <div className="wrap-input100 validate-input">
          <input className="input100" type="number" name="cin" onChange={handleInput} value={registerInput.cin} placeholder="Num Cin" required/>
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className=" fas fa-address-card"  aria-hidden="true" />
          </span>
        </div>
       {stgErrcin ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> le numéro de cin doit contenir 8 chiffres </span> :""}  


       <div className="wrap-input100 validate-input" >
          <input className="input100" type="number" name="passport" onChange={handleInput} value={registerInput.passport} placeholder="Num Passport" required/>
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fas fa-atlas"  aria-hidden="true" />
          </span>
        </div> */}
       {/* {stgErrcin ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> le numéro de cin doit contenir 8 chiffres </span> :""}   */}
 
   
   
   {/* Test */}

  {/*  <div className="d-flex justify-content-center">
   <input type="checkbox"  name="etat" onChange={ handleCheckbox} defaultChecked={etatcheckbox.etat}  className="form-check-input"/>
   <p>je suis un étranger</p>
   </div> 
 */}
   <div className="form-group form-check">
    <input type="checkbox"  name="etat" onChange={ handleCheckbox} defaultChecked={etatcheckbox.etat}   class="form-check-input" id="exampleCheck1" />
    <label className="form-check-label text-secondary" for="exampleCheck1">je suis un étranger</label>
  </div>


      {afficher_champ} 






     {/*   <div className="wrap-input100 validate-input" >
          <input className="input100" type="number" name="passport" onChange={handleInput} value={registerInput.passport} placeholder="Num Passport" required/>
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fas fa-atlas"  aria-hidden="true" />
          </span>
        </div> */}
       {/* {stgErrcin ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> le numéro de cin doit contenir 8 chiffres </span> :""}   */}

   {/* .Test */}
  



{/*         
<div>
  <div className="form-check form-check-inline ">
    <input className="form-check-input" type="radio" name="num" id="cin" onChange={handleradio}  value="Num Cin"  />
    <label className="form-check-label txt21" htmlFor="cin">Num CIN</label>
  </div>
  <div className="form-check form-check-inline">
    <input className="form-check-input" type="radio" name="num" id="passport" onChange={handleradio} value="Num Passport" />
    <label className="form-check-label txt21" htmlFor="passport">Num Passport</label>
  </div>
</div>


<div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
    <input className="input100" type="text" name="numCP"  onChange={handleInput} value={registerInput.numCP}  placeholder="Num CIN / Passport" />
    <span className="focus-input100" />
    <span className="symbol-input100">
    <i className="far fa-id-card" aria-hidden="true" />
    </span>
 </div>
         */}







</div> <div className="col-lg-6">
<br/> <br/><br/>
     <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="niveauetude" onChange={handleInput} value={registerInput.niveauetude} placeholder="Niveau d'étude" required />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fas fa-user-graduate" aria-hidden="true" />
          </span>
        </div>
        {/* {registerInput.error_list.niveauetude ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />{registerInput.error_list.niveauetude}  </span> :""}  */}



        
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="specialite"onChange={handleInput} value={registerInput.specialite}  placeholder="Spécialité" required />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className=" fas fa-book-reader" aria-hidden="true" />
          </span>
        </div>
        {/* {registerInput.error_list.specialite? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />{registerInput.error_list.specialite}  </span> :""}  */}


        
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="filiere" onChange={handleInput} value={registerInput.filiere} placeholder="Filiére" required/>
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className=" fas fa-book-open" aria-hidden="true" />
          </span>
        </div>
        {/* {registerInput.error_list.filiere? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />{registerInput.error_list.filiere}  </span> :""}  */}

         


              
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="adresse" onChange={handleInput} value={registerInput.adresse} placeholder="Adresse" required/>
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="  fas fa-map-marked-alt" aria-hidden="true" />
          </span>
        </div>
        {/* {registerInput.error_list.adresse? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />{registerInput.error_list.adresse}  </span> :""}  */}


      
        <div className="wrap-input100 validate-input" >
          <input className="input100" type="number" min="0"  name="telephone" onChange={handleInput} value={registerInput.telephone} placeholder="Télephone" required/>
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="  fas fa-phone-alt" aria-hidden="true" />
          </span>
        </div>

        {stgErrtelephone ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />le numéro de télephone doit contenir 8 chiffres </span> :""}  

         


        <div className="wrap-input100 validate-input" >
          <input className="input100" type="password" name="password" onChange={handleInput} value={registerInput.password}  placeholder="Mot de passe" required/>
         
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
        </div>
       {stgErrmtpasse? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />le mot de passe doit contenir au minimum  5 caractères </span> :""}  

         
        
   

      

        <div className="wrap-input100 validate-input" >
          <input className="input100" type="password" name="password_confirmation"  onChange={handleInput} value={registerInput.password_confirmation} placeholder="Confirmer Mot de passe" required />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
       </div>  
       {stgErrconfmtpasse? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> vous devez Confirmer le mot de passe</span> :""}  

 
{/*  
   <div className="container-login100-form-btn ">
          <button type="submit" className="login100-form-btn">
            
            S'inscrire
         
          </button>
        </div> */}

        
           
       
      
      {/*   <div className="text-center p-t-136">
          <a className="txt2" href="#">
         
            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
          </a>
        </div>    */}
        
        
 <div className="container-login100-form-btn ">
          <button type="submit" className="login100-form-btn">
            
            S'inscrire
         
          </button>
          <br/> <br/>
          <div className="text-center p-t-136 ">
          <Link to="/login-stagiaire" className="text-decoration-none" >  j'ai déjà un compte , connecter</Link>  
          </div>
   </div>

        
        </div>



   

 
 
   </div>     
 
 
    
      </form>
    </div>


















  {/* </div> */}





      
    </>
  )
}

export default RegisterStagiaire
