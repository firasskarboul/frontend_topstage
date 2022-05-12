import React , { useEffect, useState } from 'react'
import { useNavigate ,Link , NavLink ,useParams} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import Swal from 'sweetalert2';


function PageModifierDepartement() {

  const Swal = require('sweetalert2');
  const navigate = useNavigate();

    //validation erreurs
    const [utiErrnomdept,setUtiErrnomdept]=useState(false);
    const [utiErrnomchefdept,setUtiErrnomchefdept]=useState(false);
    const [utiErrstrdept,setUtiErrstrdept]=useState(false);
    const [utiErrstrchefdept,setUtiErrstrchefdept]=useState(false);

  const params=useParams();
  
  const [ deptInput , setDept] =useState ([]);
  const [ error , setError] =useState ([]);
  const[loading,setLoading] = useState(true);
 
 
  useEffect(() => {
     
    const deptId = params.id;
     
    axios.get(`api/find-departement/${deptId}`).then(res =>{
       if(res.data.status === 200 ){
        setDept(res.data.dept);
       }
       else if(res.data.status === 404){
        Swal.fire ("Erreur",res.data.message,"error");
         navigate('/service-de-formation/afficher-departements');
       }
        setLoading(false);
     });
  }, [params]);
 
 
  
 
  
 const handleInput = (e) => {
   e.persist();
  
   setDept({ ... deptInput , [e.target.name]: e.target.value})

    //erreur nom dept
  
    if(deptInput.nom_dept.length < 2 || deptInput.nom_dept.length >20){
      setUtiErrnomdept(true)
     }
     else{
      setUtiErrnomdept(false)
     }
     
      //erreur nom chef dept

      if(deptInput.nom_chef_dept.length < 2 || deptInput.nom_chef_dept.length >20){
        setUtiErrnomchefdept(true)
       }
       else{
        setUtiErrnomchefdept(false)
       }
     
      //erreur étre string  dept
     if( !(deptInput.nom_dept.match('[a-z-A-Z]')) ) {  
      setUtiErrstrdept(true)
     }
     else{
      setUtiErrstrdept(false)
     }

        //erreur étre string dept
        if( !(deptInput.nom_chef_dept.match('[a-z-A-Z]')) ) {  
          setUtiErrstrchefdept(true)
         }
         else{
          setUtiErrstrchefdept(false)
         }
    
 }
 
 
 const updateDept = (e) => {
    e.preventDefault();
 
    const deptId = params.id;
    const data = deptInput;
 
 
 
    axios.put(`api/modifier-departement/${deptId}` , data).then( res => {
      if(res.data.status === 200){
        Swal.fire("Succès" , res.data.message , "success");
        navigate('/service-de-formation/afficher-departements');
        setError([]);
 
      }
       else if(res.data.status === 422){
             setError(res.data.validation_errors);
             Swal.fire("Erreur dans les champs" , "Vérifier les champs!", "error");
      }
      else if(res.data.status === 404){
        Swal.fire("Erreur" , res.data.message , "error");
       navigate('/service-de-formation/afficher-departements');
      }
    });
 
 }
 

 
 if(loading){
   return <h5>Loading Modifier Département...</h5>
 }





  return (
    <>
      
            
<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h3>Modifier Département</h3>
          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
          

<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/acceuil'>Acceuil</NavLink>  <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/modifier-departement'>Modifier Département</NavLink>

            </ol>
          </div>
        </div>
      </div>{/* /.container-fluid */}
    </section>


    <br/>
      <div className="col-md-offset-3 col-md-12">
        <div className="form-container">
    {/* onSubmit={compteSubmit}       */}
<form onSubmit={updateDept}>
  <div className="row">



   {/* Nom département */}
  {/* <div className="wrap-input100   col-lg-6 mb-4  validate-input" data-validate="Valid email is required: ex@abc.xyz">
          <input className="input100" type="text"  name="nom_dept"  onChange={handleInput} value={deptInput.nom_dept}  placeholder="Nom déparatement" />
          <span className="focus-input111" />
          <span className="symbol-input111">
            {/* <i className=" fas fa-building"  aria-hidden="true" />
          </span>

          {error.nom_dept ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />Vous devez choisir une Département!</span> :""}  

          {utiErrstrdept ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom dept est chaine de caractéres!</span> :""}  
          {utiErrnomdept ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom dept max20 caractéres!</span> :""}  
        </div>
        
    */}
    <div className="wrap-input100   col-lg-6 mb-4 " >
<select  name="nom_dept" onChange={handleInput} value={deptInput.nom_dept}  className="input100 border-0 " type="text" required >
  
       <option   selected hidden>--Nom département--</option>
       <option name="nom_dept" value="IT">IT</option>
    <option name="nom_dept" value="Marketing">Marketing</option>
    <option name="nom_dept" value="BI"> BI</option>
    <option name="nom_dept" value="Développement">Développement </option>
    <option name="nom_dept" value="DSI">DSI </option>
    <option name="nom_dept" value="Finance">Finance </option>

 </select>
 {error.nom_dept ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" />Vous devez choisir une Département!</span> :""}  

</div>

     {/* Nom Chef département */}
     <div className="wrap-input100   col-lg-6 mb-4  " >
          <input className="input100" type="text"  name="nom_chef_dept"    onChange={handleInput} value={deptInput.nom_chef_dept}  placeholder="Nom Chef déparatement"  required/>
          <span className="focus-input111" />
          <span className="symbol-input111">
            {/* <i className=" fas fa-user-tie"  aria-hidden="true" /> */}
          </span>
           {utiErrstrchefdept ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom chef est chaine de caractéres! </span> :""}  
          {utiErrnomchefdept ? <span className='text-danger txt00 '><i className="far fa-times-circle" aria-hidden="true" /> nom chef max 20 caractéres!</span> :""}  
         
        </div>
      


{/* Etat */}
<div className="wrap-input100   col-lg-6 mb-4 " >
<select  name="etat"  onChange={handleInput} value={deptInput.etat}  className="input100 border-0 " type="text" >
{/* <option  selected hidden>--Etat--</option> */}
  
        <option selected  name="etat"  value="Active">Activer</option>
        <option  name="etat"  value="Désactive">Désactiver</option> 
 </select>

        
          <span className="focus-input111" />
          <span className="symbol-input111">
            {/* <i className="fas fa-user-tie" aria-hidden="true" /> */}
          </span>
        </div>


 
    {/* Cancel Button */}
    <div className="wrap-input100   col-lg-6 mb-4 " ></div>
    <div className="form-group col-lg-2 ">
   
          <button className="persb-btn">

           <Link to="/service-de-formation/afficher-departements"  style={{color: 'white'}}>
          Annuler
            </Link> 

          </button>
       
        </div>

    
        <div className="form-group col-lg-3  ">
          <button type="submit" className="login100-form-btn"  style={{color: 'white'}}>
            
          Modifier Département
         
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

export default PageModifierDepartement
