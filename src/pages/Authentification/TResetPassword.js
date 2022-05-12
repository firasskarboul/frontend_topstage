import React, { Component } from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert';


class TResetPassword extends Component {
 
  state = {};
   params= useParams();
   
  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      token: this.$params.id,
      password:this.password,
      password_confirmation:this.password_confirmation
    };


    /* axios.post(`api/reset-password/${data.token}`,data).then(
      res => {
        console.log(res);
        swal("vérifier votre email" , " ", "success");
        this.setState({
         reset:true
       
        })
       
      }

    ).catch(
      err => {
        console.log(err)
        swal("erreur..." , " ", "error");
      }
    )
  }; */

  axios.post(`api/reset-password/${data.token}`,data).then( res => {
    if(res.data.status === 200 ){
      swal("Succes",res.data.message,"sucess");
    }else{
      swal("Error",res.data.message,"error");
    }
     
    }

  )};


render() {
    
    
  
    return (

 

<>
 

<div className="wrap-login102">
<form  className="login100-form validate-form"  onSubmit={this.handleSubmit}>

<div className="wrap-input100 validate-input" >
  <input className="input100" type="password" name="password" placeholder="mot de passe" onChange={(e) =>this.password = e.target.value} />
  <span className="focus-input100" />
  <span className="symbol-input100">
    <i className="fa fa-envelope" aria-hidden="true" />
  </span>
</div>

<div className="wrap-input100 validate-input" >
  <input className="input100" type="password"  name="password_confirmation"  placeholder="confirmer mot de passe" onChange={(e) =>this.password_confirmation = e.target.value} />
  <span className="focus-input100" />
  <span className="symbol-input100">
    <i className="fa fa-envelope" aria-hidden="true" />
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
}

export default TResetPassword