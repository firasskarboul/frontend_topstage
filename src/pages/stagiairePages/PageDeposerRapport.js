import React , { useState} from 'react'
import { useNavigate ,Link, NavLink ,useParams} from 'react-router-dom';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios from 'axios';
function PageDeposerRapport() {

  const Swal = require('sweetalert2');
  const navigate = useNavigate();

  const [ travailInput , setTravail] =useState ({
    description: '',
  });
 
  const handleInput = (e) => {
    e.persist();
   
    setTravail({ ...travailInput , [e.target.name]: e.target.value})
  }

      
  
 const [ filedata , setFiledata] = useState([]);

/* 
 const handleChange = (file) =>{
   setFiledata(file[0]);
  };
 */

  const handleFile  = (e) =>{
    setFiledata({ rfile:e.target.files[0]});
   }


  
   const travailSubmit = (e) => {
    e.preventDefault();
    
    const data = {
       rfile:filedata.rfile,
       //description:travailInput.description,

      } 
  /*  const formData= new FormData();
    formData.append('tfile' ,filedata.tfile);
    formData.append('description' , travailInput.description); 
 */
    axios.post('api/deposer-rapport', data).then(res =>{
                  if(res.data.status === 200){
                    Swal.fire("Succès" , res.data.message ,"success");
                   navigate('/stagiaire/acceuil');
                  }
      
                 else if(res.data.status === 400){
                  Swal.fire("Erreur" , res.data.message ,"error");
      //            //setDept({...deptInput  , error_list : res.data.validation_errors});
                 }
           
        
      });


   }







// const submitData = (e) => {
//     e.preventDefault();
  
  
//     const formData= new FormData();
//     formData.append('tfile' ,filedata.tfile);
   
    
//         axios.post('api/deposer-travail', formData).then(res =>{
//              if(res.data.status === true){
//               swal ("Success" , res.data.message);
//               //navigate('/service-de-formation/afficher-departements');
//              }

//           else if(res.data.status === false){
//             swal ("Error" , res.data.message);
//            //setDept({...deptInput  , error_list : res.data.validation_errors});
          
//        }
     
  
//     });



//     /* axios.post('api/deposer-travail', formData)
//     .then((res) => {   
//       console.log("response" , res);
//     })
//     .catch((e) => {
//       console.log("faillure" , e);
//     }); */
  



//   } 



  return (
    <>



<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h3>Déposer Rapport</h3>
          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
        
              <NavLink className={(ndata) => ndata.isActive && "active" }  to='/stagiaire/acceuil'>Acceuil</NavLink>  <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/stagiaire/deposer-rapport'>Déposer Rapport</NavLink>
            </ol>
          </div>
        </div>
      </div>
    </section>
    <br/>


     <div className="col-md-offset-3 col-md-12">
        <div className="form-container"> 
    <form onSubmit={travailSubmit}>
      {/* <div className="form-group col-md-12 mb-4" >
        <input  type="file" name="tfile"   onChange={handleFile}  className="form-control rounded-pill bg-light "/> 
        </div>  */}
        
   {/*Rapport */}
{/* <div className="wrap-input100   col-lg-12 mb-4  form-group" >
          <input className="input100 mt-4" type="file"  name="rfile"  onChange={handleFile}   />
          <span className="focus-input111" />
          <span className="symbol-input111">
           <i className=" fas fa-cloud-upload-alt "  aria-hidden="true" />
        
          </span>
       
        </div>   */}
 
 <div className="wrap-input100   col-lg-12 mb-4  form-group " >   
 <p className="text-center   text-secondary"> Déposer votre Rapport</p>
   <div className="frame">
      <div className="d-flex justify-content-center ">
          <div className="dropzone">
              <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon  " />
              <input type="file" name="rfile"  onChange={handleFile}  className="upload-input " />
         </div>
     </div> 

     <div className="d-flex justify-content-center">
     <div className="form-group col-lg-2  "> 

          <button type="submit" className="login100-form-btn   ">
          

            <Link to="#"  style={{color: 'white'}}>
            Déposer
            </Link> 
          </button>
          
          </div>
    </div>

  </div>
</div>






 {/*Description */}
{/*  <div className="wrap-input100   col-lg-12 mb-4  form-group" >
          <textarea className="input100" type="text"  name="description"  onChange={handleInput}  value={travailInput.description} placeholder="Description"  style={{height: '80px'}}/>
          <span className="focus-input111" />
          <span className="symbol-input111">
            <i className=" fas fa-file-alt"  aria-hidden="true" /> 
          </span>
       
        </div> */}
{/*        
       <button  type="submit" className="btn btn-primary btn-md mt-4 rounded-pill" >Déposer</button> */}
        {/*  <div className="form-group col-lg-2 ">
          <button type="submit" className="login100-form-btn">
            <Link to="#"  style={{color: 'white'}}>
            Déposer
            </Link> 
          </button>
          <br/><br/>
          </div>
  */}
 
    </form>
       </div>
    </div> 

    <br/><br/><br/>  <br/>
    </>
  )
}

export default PageDeposerRapport



