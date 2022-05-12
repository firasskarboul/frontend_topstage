import {React,useState,useEffect } from 'react';
import {useNavigate , NavLink } from 'react-router-dom';
import axios from 'axios';

import swal from 'sweetalert';
// import ErrorMessage from "../../src/ErrorMessage/ErrorMessage"
// import PageConsulterQuestion from './PageConsulterQuestion';

 function ParamQuiz() {
   const navigate=useNavigate();
   const[Testlist,setTestlist] = useState([]);
  const [testInput,setTest] =useState({
    titre:'',
    departement:'',
    niveaustagiaire:'',
    niveautest:'',
    duree:'',
    note:'',
   
    
  });
  const [errorlist,setError] = useState([]);
  useEffect(() => {
    axios.get('/api/test').then(res=>{
      if(res.status === 200) {
        setTestlist(res.data.test)
}
});
},[]);
var AfficherTest_HTMLTABLE = "";
AfficherTest_HTMLTABLE= 
Testlist.map((item,index) => {
       
          return (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.titre}</td>
              <td>{item.departement}</td>
              <td>{item.niveaustagiaire}</td>
              <td>{item.niveautest}</td>
              <td>{item.note}</td>
              <td>{item.duree}</td>
  

           </tr>
              
                )
                
              
        
       
              });
          

           
              var AfficherQuestion_HTMLTABLE = "";
              AfficherQuestion_HTMLTABLE= 
              Testlist.map((Testlist,index)=> (
                <tr key={index} >
             
                <td>{Testlist.questions}</td>
                
                </tr>
              ))
               
              
                         
          
 
  const handleInput = (e) => {
    e.persist();
    setTest({...testInput,[e.target.name] : e.target.value})

  }
  const submitTest = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titre',testInput.titre);
    formData.append('departement',testInput.departement);
    formData.append('niveaustagiaire',testInput.niveaustagiaire);
    formData.append('niveautest',testInput.niveautest);
    formData.append('duree',testInput.duree);
    formData.append('note',testInput.note);

    axios.post('/api/test',formData).then(res=>{

     if(res.data.status === 200) {
       swal("Success",res.data.message,"success");
       setTest({...testInput,
         titre:'',
         departement:'',
         niveaustagiaire:'',
         niveautest:'',
         duree:'',
         note:'',
      });
       setError([]);
     }
     else if(res.data.status === 422) {
       swal("tous les champs sont requis","","error");
       setError(res.data.errors);
     }
    });
  
  }

 


       
    
    
  
     return (
     <div>
    



                
<section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h3>Paramètres du test</h3>
          </div>

          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
          

<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/acceuil'>Acceuil</NavLink>  <span> / </span>
<NavLink className={(ndata) => ndata.isActive && "active" }  to='/service-de-formation/paramQuiz'>Paramètres du test</NavLink>

            </ol>
          </div>
        </div>
      </div>{/* /.container-fluid */}
    </section>



<div className='content-wrapper mx-auto container col-md-10' style={{marginRight:"1cm",marginLeft:"7cm" ,textAlign : "left"}}>
    <div className="card card-info">
<div className="card-header">
<h3 className="card-titre">Paramètres du test</h3>
</div>
</div>





<form  onSubmit={submitTest} action className="form-inline" id="test_form">
  <div className="form-group">
  <input name="titre" type="text"  className="form-control" placeholder="Titre du test" onChange={handleInput} value={testInput.titre} style={{marginRight:"0.25cm",marginLeft:"0.25cm"}} />
  <small className='text-danger'> {errorlist.titre} </small>
  </div>
  <div className="form-group">    
  
  <select name="departement" id="inputDépartement" className="form-control custom-select" onChange={handleInput} value={testInput.departement}  style={{marginRight:"0.25cm",marginLeft:"0.25cm"}}>
  <option disabled>Select département</option>
                <option name="departement" >Marketing</option>
                <option name="departement" >DSI</option>
                <option name="departement" >commerciale</option>
                <option name="departement" >projets et innovation</option>
                <option name="departement" >finance</option>

  </select> 
  <small className='text-danger'> {errorlist.departement} </small>
  </div>

  <div className="form-group"> 
  <select name='niveaustagiaire' id="inputNiveau" className="form-control custom-select  mt-10" onChange={handleInput} value={testInput.niveaustagiaire} style={{marginRight:"0.25cm",marginLeft:"0.25cm"}}>
                <option disabled>Select one</option>
                <option name="niveaustagiaire" value="bac">Bac</option>
                <option name="niveaustagiaire" value="bts">BTS</option>
                <option name="niveaustagiaire" value="licence">Licence</option>
                <option name="niveaustagiaire" value="master">Master</option>
                <option name="niveaustagiaire" value="ingénieur">cycle ingénieur</option>
              </select>
              <small className='text-danger'> {errorlist.niveaustagiaire} </small>
  </div>
  <div className='form-group'>
  <select name="niveautest" id="inputLevel" className="form-control custom-select"  onChange={handleInput} value={testInput.niveautest} style={{marginRight:"0.25cm",marginLeft:"0.25cm"}}>
                <option disabled>Select one</option>
                <option name="niveautest">facile</option>
                <option name="niveautest">moyen</option>
                <option name="niveautest">difficile</option>
               
              </select>
              <small className='text-danger'> {errorlist.niveautest} </small>
              </div>
              <div className="form-group"> 
              <input name="duree" type="text" className="form-control" placeholder="Durée du test en secondes" onChange={handleInput} value={testInput.duree} style={{marginRight:"0.25cm",marginLeft:"0.25cm"}}/>
              <small className='text-danger'> {errorlist.duree} </small>
                </div>
        

        <br/>
                <div className="form-group" style={{marginLeft: "0.25cm",marginRight: "0.25cm"}}>

<input name="note" type="text" className="form-control" placeholder="La Note" onChange={handleInput} value={testInput.note} />
<small className='text-danger'> {errorlist.note} </small>
</div>
</form>
<div className='card-footer' style={{marginTop:"0.5cm"}}>
<button type="submit"  className="btn btn-info"  style={{marginTop:"0.25cm"}} >Enregistrer</button>
<button type="submit" className="btn btn-warning float-right text-white" onClick={() => { navigate("/service-de-formation/acceuil");}} style={{marginTop:"0.25cm"}}>Annuler</button>
</div>

<section className="content">
     
        <div className="card-header">
            
      
        {/*   
          <div className="card-tools">
      <div className="form-inline">
   
          <button  className="btn btn-primary btn-sm"  > +créer question
    

   
  </button>
  <button className="btn btn-success btn-sm" style={{marginLeft:"0.25cm"}} > +créer réponse
    
    
  </button>
          
         
          
          
  
  
  </div>
    

   
      </div> */}
    
     
  
        
      </div>
      
      </section>
      
  <div className="card card-info" style={{marginLeft:"0.21cm",marginRight:"0.21cm",marginTop:"1cm"}}>
    <div className="card-header">
      <h3 className="card-titre">Critères de test</h3>
      <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse" titre="Collapse">
          <i className="fas fa-minus" />
        </button>
      </div>
    </div>
    <div className="card-body p-0">
      <table className="table">
        <thead>
          <tr>
            <th> id test</th>
           
            <th>titre</th>
            <th>departement</th>
            <th>niveaustagiaire</th>
            <th>niveautest</th>
            <th>note</th>
            <th>duree</th>
          
            
            <th />
          </tr>
        </thead>
        <tbody>
        
        {AfficherTest_HTMLTABLE}
         
        </tbody>
        </table>
        
</div>
<div className="card-header bg-primary">
      <h3 className="card-titre">Questions</h3>
      <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse" titre="Collapse">
          <i className="fas fa-minus" />
        </button>
      </div>
    </div>
<div  className="card-body p-0">
      <table className="table">
        <thead>
          <tr>
          
           
            <th>id question</th>
            <th>question</th>
            <th>niveau</th>
            <th>duree</th>
            <th>points</th>
           
            
            <th />
          </tr>
        </thead>
        <tbody>
        
        {AfficherQuestion_HTMLTABLE}
         
        </tbody>
        </table>
        
</div>
</div>

</div>

</div>


    
    
    
 
     )
 }
 
     
export default ParamQuiz