import {React,useState,useEffect} from 'react'
import { useNavigate,useParams ,Link, NavLink} from 'react-router-dom';
//import ErrorMessage from "../../src/ErrorMessage/ErrorMessage"
import {Button, Form, FormGroup} from 'react-bootstrap'

import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageModifierReponse() {

  const Swal = require('sweetalert2');
    const [reponseInput,setReponse] =useState([]);
  const navigate = useNavigate();
  const [image ,setRepimage] = useState([]);

  const params=useParams();
  
  
  const [ error , setError] =useState ([]);
 
  const handleImage = (e) => {
    setRepimage({image:e.target.files[0]});
  }
 
  useEffect(() => {
     
    const reponseId = params.id;
     
    axios.get(`api/reponse/${reponseId}`).then(res =>{
       if(res.data.status === 200 ){
        setReponse(res.data.reponse);
       }
       else if(res.data.status === 404){
        Swal.fire ("Error",res.data.message,"error");
         
       }
       
     });
  }, [params]);
 
 
  
 
  
 const handleInput = (e) => {
   e.persist();
  
   setReponse({ ...reponseInput , [e.target.name]: e.target.value})
 }
 
 
 const updateReponse = (e) => {
    e.preventDefault();
 
    const reponseId = params.id;
    const data = reponseInput;
    
 
 
 
    axios.put(`api/reponse/${reponseId}` , data).then( res => {
      if(res.data.status === 200){
        Swal.fire("Sucess" , res.data.message , "success");
        navigate('/service-de-formation/afficherQuestionReponse');
        
        setError([]);
 
      }
      else if(res.data.status === 422){
             setError(res.data.validation_errors);
             Swal.fire ("erreur dans champs" , " ", "error");
      }
      else if(res.data.status === 404){
        Swal.fire ("Error" , res.data.message , "error");
      
      }
    });
 
 
 }
 
 
 
return(
   <>
             
<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h3>Modifier Reponse</h3>
          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
          

<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/acceuil'>Acceuil</NavLink>  <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/modifier-reponse'>Modifier Reponse</NavLink>

            </ol>
          </div>
        </div>
      </div>{/* /.container-fluid */}
    </section>


    <br/>
      <div className="col-md-offset-3 col-md-10 mx-auto">
        <div className="form-container">
    {/* onSubmit={compteSubmit}       */}
<form onSubmit={updateReponse}>
  <div className="row">

   {/*Reponse image*/}         
   <div className="wrap-input100   col-lg-12 mb-4  form-group " >   
 <p className="text-secondary">Réponse image</p>
  <div className="frame">
     <div className="d-flex justify-content-center ">
         <div className="dropzone">
             <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon  " />
             <input  name='reptext'
              type="file" onChange={handleImage} required className="upload-input " />
        </div>
    </div> 
  </div>
  </div>

       {/*Reponse Text*/}
       <div className="wrap-input100   col-lg-12 mb-4" >
              <input className="input100"  name='reptext'
      type="text"
      placeholder='Réponse text'
      onChange={handleInput} value={reponseInput.reptext}

      required/>
              <span className="focus-input111" />
              <span className="symbol-input111">
            
              </span>
            
            </div>
            


         {/*Reponse image*/}
 {/*         <p style={{marginLeft:"0.5cm"}}  className="text-secondary">Réponse image</p>
         <div className="wrap-input100   col-lg-12 mb-4" >
              <input className="input100"  
      type="file" 
      name="image"
      onChange={handleImage}
      required/>
              <span className="focus-input111" />
              <span className="symbol-input111">
            
              </span>
            
            </div> */}


             {/*Reponse correcte*/}
         <div className="wrap-input100   col-lg-12 mb-4" >
              <input className="input100"   name="repcorrecte"
      type="text"
        placeholder='Réponse correcte'
      onChange={handleInput} value={reponseInput.repcorrecte}
      required/>
              <span className="focus-input111" />
              <span className="symbol-input111">
            
              </span>
            
            </div>

   





 
    {/* Cancel Button */}
    <br/>
    <div className="form-group col-lg-2 ">
   
          <button className="persb-btn">

           <Link to="/service-de-formation/afficherQuestionReponse"  style={{color: 'white'}}>
          Annuler
            </Link> 

          </button>
       
        </div>

    
        <div className="form-group col-lg-3 ">
          <button type="submit" className="login100-form-btn"  style={{color: 'white'}}>
            
          Modifier Reponse
         
          </button>
  </div>    
  
     </div>


</form>
   
        </div>
      </div>
   <br/><br/><br/> <br/><br/><br/> <br/>



   </>
)

 
}

export default PageModifierReponse