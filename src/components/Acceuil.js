/* import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
 */

import React from 'react'
function Acceuil() {

 /*  const navigate = useNavigate();
  const logoutSubmit = (e) =>{
    e.preventDefault();

    axios.post('/api/logout').then(res =>{
           if(res.data.status === 200){
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
           swal ("Success" , res.data.message);
           navigate('/etudiant/acceuil');
           }
    });
  } */
  return (
    <>
  {/*    <button  onClick ={logoutSubmit}   className="btn btn-secondary float-left">
                    <i className="fa-solid fa-cloud-exclamation"> </i>
                    Deconnexion
      </button> */}
             
    <br/><br/><br/>
       <div className="col-12 col-sm-12 col-md-12 d-flex align-items-stretch flex-column">
  <div className="card bg-light d-flex flex-fill">
    <div className="card-header text-muted border-bottom-0">
      Digital Strategist
    </div>
    <div className="card-body pt-0">
      <div className="row">
        <div className="col-7">
        <br/><br/><br/>
          <h2 className="lead"><b>Nicole Pearson</b></h2>
          <p className="text-muted text-sm"><b>About: </b> Web Designer / UX / Graphic Artist / Coffee Lover </p>
          <ul className="ml-4 mb-0 fa-ul text-muted">
            <li className="small"><span className="fa-li"><i className="fas fa-lg fa-building" /></span> Address: Demo Street 123, Demo City 04312, NJ</li>
            <li className="small"><span className="fa-li"><i className="fas fa-lg fa-phone" /></span> Phone #: + 800 - 12 12 23 52</li>
          </ul>
        </div>
        <div className="col-3 text-center">
          <img src="../../dist/img/topnetStage.png" alt="user-avatar" className="img-circle img-fluid" />
        </div>
      </div>
    </div>
    <div className="card-footer">
      <div className="text-right">
        <br/>
      </div>
    </div>
  </div>
</div>
<br/><br/>
         
 
    
    </>
  )
}

export default Acceuil
