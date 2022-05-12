import React from 'react'
import { Link  } from 'react-router-dom';

function Deconnexion() {
  return (
    <>
     
    <div className="hold-transition lockscreen">
    <br/>
   {/* Automatic element centering */}
   <div className="lockscreen-wrapper">
    {/*  <div className="lockscreen-logo">
     <br/>
       <a href="../../index2.html"><b>Admin</b>LTE</a>
     </div>

     <div className="lockscreen-name">John Doe</div> */}
     <br/> <br/>  <br/> <br/> <br/> <br/>
     <div className="lockscreen-item">
       {/* lockscreen image */}
       <div className="lockscreen-image">
         <img src="../../dist/img/topnet.jpg" alt="TopStage" />
       </div>
       {/* /.lockscreen-image */}
       {/* lockscreen credentials (contains the form) */}
       <form className="lockscreen-credentials">
         <div className="input-group">
           <input type="password" className="form-control" placeholder="password" />
           <div className="input-group-append">
             <button type="button" className="btn">
             <Link to="/">
               <i className="fas fa-arrow-right text-muted" />
               </Link><br/>
             </button>
           </div>
         </div>
       </form>
       {/* /.lockscreen credentials */}
     </div>
     {/* /.lockscreen-item */}
     <div className="help-block text-center text-warning">
       Enterer votre mot de passe pour déconnecter
     </div>
   {/*   <div className="text-center">
       
       <Link to="/login">Ou sign in avec un autre compte</Link><br/>
     </div> */}

<br/>
     <div className="lockscreen-footer text-center text-secondary">
       Copyright © 2014-2021<br/>
       All rights reserved
     </div>
   </div>
   <br/><br/><br/><br/><br/> <br/> 
 </div>
 {/* /.center */}
 
     </>
  )
}

export default Deconnexion