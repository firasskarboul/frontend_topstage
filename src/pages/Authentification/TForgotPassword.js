import React, { Component }  from 'react'
import { Link  } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';


class TForgotPassword extends Component{




  state= {};
  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email:this.email
    };
    axios.post('api/forgot-password',data).then(res =>{
    if(res.status ===200){
      swal("vérifier votre email" , " ", "success");
    }
    else{
      swal("erreur...." , " ", "error");
    }
    }
    )
  };

  render() {
    

   

  return (
    <>
   
  {/* <div className="container-login100"> */}
        <div className="wrap-login102">
      <form  className="login100-form validate-form"  onSubmit={this.handleSubmit}>
     
      
        <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
          <input className="input100" type="email" name="email" placeholder="Email" onChange={(e) =>this.email = e.target.value} />
          <span className="focus-input100" />
          <span className="symbol-input100">
            <i className="fa fa-envelope" aria-hidden="true" />
          </span>
        </div>



        <div className="container-login100-form-btn">
          <button type="submit" className="login100-form-btn">

           Envoyer 
           
          </button>
        </div>

        <br/>
        <div className="text-center p-t-136">
        <Link to="/login" className="text-decoration-none" >Connecter</Link>  
        </div>
      </form>
    </div>

{/* </div> */}
    
</>
    )
  }
}
export default TForgotPassword
