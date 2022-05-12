import React , { useEffect, useState } from 'react'
import { useNavigate ,Link , NavLink ,useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


function SResetPassword (){
  
  const params=useParams();
  const [ passInput , setPass] =useState ([]);

  const handleInput = (e) => {
    e.persist();
   
    setPass({ ... passInput , [e.target.name]: e.target.value})
  } 
  

  
 const resetPass = (e) => {
  e.preventDefault();

  

  const data = {
    token:params.token,
    email:passInput.email,
    password:passInput.password,
    password_confirmation:passInput.password_confirmation
  };

  //const token= params.id;

  axios.post(`api/s-reset-password`,data).then( res => {
    if(res.data.status === 200){
      swal("Sucess" , res.data.message , "success");
     // navigate('/service-de-formation/afficher-departements');
      //setError([]);

    }
     else {
           //setError(res.data.validation_errors);
           swal("erreur " , " ", "error");
    }
   
  });

}

  return (
    <>

<div className="wrap-login102">
<form onSubmit={resetPass} className="login100-form validate-form" >

<div className="wrap-input100 validate-input" >
  <input className="input100" type="email" name="email" onChange={handleInput} value={passInput.email}  placeholder="votre email" />
  <span className="focus-input100" />
  <span className="symbol-input100">
    <i className="fa fa-envelope" aria-hidden="true" />
  </span>
</div>

<div className="wrap-input100 validate-input" >
  <input className="input100" type="password" name="password" onChange={handleInput} value={passInput.password}  placeholder="nouveau mot de passe" />
  <span className="focus-input100" />
  <span className="symbol-input100">
    <i className="fa fa-lock" aria-hidden="true" />
  </span>
</div>

<div className="wrap-input100 validate-input" >
  <input className="input100" type="password"  name="password_confirmation" onChange={handleInput} value={passInput.password_confirmation}  placeholder="confirmer nouveau mot de passe"  />
  <span className="focus-input100" />
  <span className="symbol-input100">
    <i className="fa fa-lock" aria-hidden="true" />
  </span>
</div>



<div className="container-login100-form-btn">
  <button type="submit" className="login100-form-btn">

   Changer Mot de passe 
   
  </button>
</div>




</form>
    </div>

    </>
  )
}

export default SResetPassword
