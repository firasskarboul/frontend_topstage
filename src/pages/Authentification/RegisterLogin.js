import React , { useState} from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';



function RegisterLogin() {


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
  const [stgErrstr,setStgErrstr]=useState(false);
    //Register
   const [ registerInput , setRegister] =useState ({
     name: '',
     prenom: '',
     datenaissance:'',
     email: '',
     cin:'', 
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
     }
  */

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
   
     if(!(registerInput.cin.match('[0-9]{7}')) ){
      setStgErrcin(true)
     }
     else{
      setStgErrcin(false)
     }

     //erreur telephone
   
     if( !(registerInput.telephone.match('[0-9]{7}')) ) {  
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
      setStgErrstr(true)
     }
     else{
      setStgErrstr(false)
     }




     
  }







  const registerSubmit = (e) => {
    e.preventDefault();

    const data = {
      name:registerInput.name,
      prenom:registerInput.prenom,
      datenaissance:registerInput.datenaissance,
      email:registerInput.email,
      cin:registerInput.cin,
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
                   swal ("Success" , res.data.message);
                   navigate('/etudiant/acceuil');
                }
               
       else{
                setRegister({...registerInput  , error_list : res.data.validation_errors});
                
             
            } 

    });
  });
  
}









  //Login

  
  const handleInputLogin = (e) => {
     e.persist();

     //Login
    setLogin({ ... loginInput , [e.target.name]: e.target.value});

  }



  const [ loginInput , setLogin] =useState ({
    
    email: '',
    password:'',
    error_list :[],
  
 
  });

 const loginSubmit = (e) => {
   e.preventDefault();


   const data = {
    
     email:loginInput.email,
     password:loginInput.password,
     
   }


/*    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('api/login', data).then(res =>{
           if(res.data.status === 201){
               localStorage.setItem('auth_token' , res.data.access_token);
               localStorage.setItem('auth_name' , res.data.username);
              swal ("Success" , res.data.message);
              navigate('/etudiant/acceuil');
           }
           else if(res.data.status === 401){
            swal ("Warning" , res.data.message , "warning");
           }
              
           else{
              setLogin({...loginInput  , error_list : res.data.validation_errors});
           }

   });
 }); */
 
  }

  return (
    <>
      
     
     
       






    


       <div className="container-login100  ">




   {/*login*/}

 {/*  
  
  <div className="wrap-login103  col-md-3 ">


  

   

      <form onSubmit={loginSubmit} >
        
        <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
          <input className="input100" type="email" name="lemail"  onChange={handleInputLogin} value={loginInput.lemail}  placeholder="Email" />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-envelope" aria-hidden="true" />
          </span>
        </div>
        {loginInput.error_list.lemail ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />{loginInput.error_list.lemail}  </span> :""} 

        <div className="wrap-input100 validate-input" data-validate="Password is required">
          <input className="input100" type="password" name="lpassword"  onChange={handleInputLogin} value={loginInput.lpassword}  placeholder="Password" />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
        </div>


    
     

      
 
   <div className="container-login100-form-btn ">
          <button type="submit" className="login100-form-btn">
            
          Connecter
         
          </button>
        </div>
        <br/>
    
      
        <div className="text-center p-t-136">
        
          <Link to="/reset-password"  className="txt2">
          Mot de passe oublié
            </Link> 
        </div>



   



      </form> 
    </div>



<br/> 

 */}



{/* register */}





    <div className="wrap-login101  ">
     <form onSubmit={registerSubmit}>
        
  <div className="row"> 
 
<div className="col-lg-6">
 
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0vb3iHMKIqZ0oqJgug_B0OdoHiQkwFCZecZ9ljMJ7xw8eG34iqq45GTc71cP0b1XvcA&usqp=CAU" alt="IMG" />


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
  {stgErrstr ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom doit étre une chaine de caractéres!!!</span> :""}  
  {stgErrnom ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom doit étre entre 3 et 20 caractéres!!!</span> :""}  

  
  
       

        <div className="wrap-input100 validate-input" >
          <input className="input100" type="text" name="prenom" onChange={handleInput} value={registerInput.prenom} placeholder="Prénom" required/>
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fas fa-user" aria-hidden="true" />
          </span>
        </div>
        {/* {registerInput.error_list.prenom ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />{registerInput.error_list.prenom}  </span> :""}  */}
        {stgErrstr ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom doit étre une chaine de caractéres!!!</span> :""}  
     
        {stgErrprenom ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />nom doit étre entre 3 et 20 caractéres!!!</span> :""}  
        

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


        <div className="wrap-input100 validate-input">
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
        </div>
       {/* {stgErrcin ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> le numéro de cin doit contenir 8 chiffres </span> :""}   */}


  



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
          <input className="input100" type="number" name="telephone" onChange={handleInput} value={registerInput.telephone} placeholder="Télephone" required/>
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
       {stgErrmtpasse? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />le mot de passe doit dépasser les 5 caractères </span> :""}  

         
        
   

      

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

        
           
       
      
        <div className="text-center p-t-136">
          <a className="txt2" href="#">
         
            <i className="fa fa-long-arrow-right m-l-5" aria-hidden="true" />
          </a>
        </div>   
        
        
        
        </div>


 <div className="container-login100-form-btn ">
          <button type="submit" className="login100-form-btn">
            
            S'inscrire
         
          </button>
        </div>

 
 
   </div>     
 
 
    
      </form>
    </div>


















  </div>






 
    </>
  );
}


export default RegisterLogin;
