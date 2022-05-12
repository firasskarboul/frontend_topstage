import axios from 'axios';
import React, { Component }  from 'react'


 class UForgotPassword extends Component  {
   state= {};
  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email:this.email
    };
    axios.post('api/forgot',data).then(
      res => {
       this.setState({
         message: res.data.message,
         cls: 'success'
       })
      }
    ).catch(
      err => {
      this.setState({
        message: err.response.data.message,
        cls:'danger'
      })
      }
    )
  };
  render() {
    let message = '';

    if(this.state.message) {
      const cls = 'alert alert-'+this.state.cls;
      message = (
        <div className={cls} role="alert">
          {this.state.message}
        </div>
      )
    }
    return (
   <div className='row justify-content-md-center'>
  <div className="login-box  row justify-content-md-center">
    <div className="login-logo">
      <a href="/forgot"><b>mot de passe oublié ?</b> </a>
    </div>
    <div className="card">
      <div className="card-body login-card-body">
        <p className="login-box-msg"> Veuillez entrer votre e-mail pour récuppérer votre compte. </p>
        <form onSubmit={this.handleSubmit}>
          {message}
          <div className="input-group mb-3">
            <input type="email" name="email"  className="form-control" placeholder="Email" onChange={(e) =>this.email = e.target.value}  />
          
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-envelope" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <button type="submit" className="btn btn-primary btn-block">envoyer</button>
            </div>
          </div>
        </form>
        <p className="mt-3 mb-1">
          <a href="/login">Login</a>
        </p>
        <p className="mb-0">
          
        </p>
      </div>
    </div>
  </div>
</div>

    )
  }
}


export default UForgotPassword