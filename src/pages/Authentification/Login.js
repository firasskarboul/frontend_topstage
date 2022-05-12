import React , { useState} from 'react'
import { useNavigate ,Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function Login() {

  const Swal = require('sweetalert2');
  const navigate = useNavigate();

   //validation erreurs
   const [utiErremail,setUtiErremail]=useState(false);
   const [utiErrmtpasse,setUtiErrmtpasse]=useState(false);



   //fois
   const [count, setCount] = useState(0);

   const incrementCount = () => {
    setCount(count + 1);
    console.log(count)
  };


   //Login

   const [ loginInput , setLogin] =useState ({
    
    email: '',
    password:'',
    error_list:[],
  
 
  });
  const handleInput = (e) => {
    e.persist();
    //Login
    setLogin({ ... loginInput , [e.target.name]: e.target.value})


    
       //erreur e-mail
       if(!loginInput.email.includes('@')){
        setUtiErremail(true)
       }
       else{
        setUtiErremail(false)
       }
  
        //erreur mot de passe 
        if(loginInput.password.length <4  ){
          setUtiErrmtpasse(true)
         }
         else{
          setUtiErrmtpasse(false)
         }
  
 

    
 }


 const loginSubmit = (e) => {
   e.preventDefault();


   const data = {
    
     email:loginInput.email,
     password:loginInput.password,
     
     
   }


   axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('api/login', data).then(res =>{
           if(res.data.status === 200){

         
              localStorage.setItem('auth_token' , res.data.access_token);
               localStorage.setItem('auth_name' , res.data.username);
               localStorage.setItem('auth_lastname' , res.data.lastname);
           
               localStorage.setItem('role' , res.data.role);
              
               Swal.fire ("Succès" , res.data.message , "success");
            

              
              if(res.data.role === 'encadrant'){
                navigate('/encadrant/acceuil');
              }
              else if(res.data.role === 'chef_dept'){
                navigate('/chef-departement/acceuil');
              }
              else if(res.data.role === 'service_formation'){
                navigate('/service-de-formation/acceuil');
              }
             /*  else{
                navigate('/');
              } */
              else if(res.data.role === 'coordinateur'){
                navigate('/coordinateur/acceuil');
              }


            
             } 
          
          
           else if(res.data.status === 401){
            Swal.fire ("" , res.data.message , "warning");
            if( count>3){
                Swal.fire ("" , "réinitialiser votre mot de passe", "warning");
                 navigate('/U-forgot');
            }

          }
         


          else if(res.data.status === 402){
            Swal.fire ("" , res.data.message , "error");
          } 
         
          /*  else{
           
            swal("Error",res.data.message);
              setLogin({...loginInput  , error_list :res.data.validation_errors});
            
           } */

   });
 });
 
  }

  return (
    <>
       
{/*   <div className="container-login100">

<div className="row"> */}

        <div className="wrap-login102">
      <form onSubmit={loginSubmit}>
        
        <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
          <input className="input100" type="text"  name="email"  onChange={handleInput} value=  {loginInput.email}  placeholder="Email" />
         
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-envelope" aria-hidden="true" />
           
         
           

          </span>
        </div>
        {utiErremail ? <span className='text-warning txt00 '><i className="far fa-times-circle" aria-hidden="true" /> email doit contenir symbol @ </span> :""}  

        

        <div className="wrap-input100 validate-input" data-validate="Password is required">
          <input className="input100" type="password" name="password"  onChange={handleInput} value={loginInput.password}  placeholder="Password" />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-lock" aria-hidden="true" />
          </span>
        </div>
        {utiErrmtpasse ? <span className='text-warning txt00 '><i className="far fa-times-circle" aria-hidden="true" />le mot de passe doit contenir au minimum  5 caractères </span> :""}  


        <div className="container-login100-form-btn ">
          <button type="submit" className="login100-form-btn" onClick={incrementCount} >
            
          Connecter
         
          </button>
        </div>

 
        <br/>

        <div className="text-center p-t-136">
        <Link to="/U-forgot"  className="text-decoration-none">  Oublier le mot de passe ?</Link>  
        </div>



      </form>
    </div>
     
{/*     </div>


</div> */}

    </>
  )
}

export default Login
