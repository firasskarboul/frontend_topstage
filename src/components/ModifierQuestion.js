import {React,useState,useEffect} from 'react'
import { useNavigate,useParams } from 'react-router-dom';
// import ErrorMessage from "../../src/ErrorMessage/ErrorMessage"
import {Button, Form, FormGroup} from 'react-bootstrap'

import axios from 'axios';
import swal from 'sweetalert';

function ModifierQuestion() {

  const navigate = useNavigate();

  const params=useParams();
  
  const [ questionInput , setQuestion] =useState ([]);
  const [ error , setError] =useState ([]);
 
 
 
  useEffect(() => {
     
    const questionId = params.id;
     
    axios.get(`api/question/${questionId}`).then(res =>{
       if(res.data.status === 200 ){
        setQuestion(res.data.question);
       }
       else if(res.data.status === 404){
         swal("Error",res.data.message,"error");
         
       }
       
     });
  }, [params]);
 
 
  
 
  
 const handleInput = (e) => {
   e.persist();
  
   setQuestion({ ... questionInput , [e.target.name]: e.target.value})
 }
 
 
 const updateQuestion = (e) => {
    e.preventDefault();
 
    const questionId = params.id;
    const data = questionInput;
    
 
 
 
    axios.put(`api/question/${questionId}` , data).then( res => {
      if(res.data.status === 200){
        swal("Sucess" , res.data.message , "success");
        
        setError([]);
 
      }
      else if(res.data.status === 422){
             setError(res.data.validation_errors);
             swal("erreur dans champs" , " ", "error");
      }
      else if(res.data.status === 404){
       swal("Error" , res.data.message , "error");
      
      }
    });
 
 
 }
 
 
 
return(
  <div>
  <Form onSubmit={updateQuestion}>
    <Form.Group style={{marginBottom:"0.25cm"}}>
      <Form.Label>Question</Form.Label>
      <Form.Control
      name="question"
        as="textarea"
        
        onChange={handleInput} value={questionInput.question}
        rows={3}
        />
    </Form.Group>
    <Form.Group controlId="formBasicSelect" style={{marginBottom:"0.25cm"}}>
        <Form.Label>Niveau de difficulté</Form.Label>
        <Form.Control
          as="select"
          name="niveau"
          onChange={handleInput} value={questionInput.niveau}
        >
           <option>sélectionner un niveau </option> 
           <option name="niveau" value="facile">facile</option>
           <option name='niveau' value="moyen">moyen</option>
           <option name='niveau' value="difficile">difficile</option>
        </Form.Control>
      </Form.Group>
      <Form.Group style={{marginBottom:"0.25cm"}}>
      <Form.Label>Durée en secondes</Form.Label>
      <Form.Control
      name='duree'
      type="text"
     
      onChange={handleInput} value={questionInput.duree}
      required
      />
    </Form.Group>
    <Form.Group style={{marginBottom:"0.25cm"}}>
      <Form.Label>Titre</Form.Label>
      <Form.Control
      name='titre'
      type="text"
     
      onChange={handleInput} value={questionInput.titre}

      required
      />
    </Form.Group>
   
    <Form.Group style={{marginBottom:"0.25cm"}}>
      <Form.Label>Points</Form.Label>
      <Form.Control
      name='points'
      type="text"
      
      onChange={handleInput} value={questionInput.points}

      required
      />
    </Form.Group>
    <div className="wrap-input100   col-lg-12 mb-4 " >
<select  name="etat"  onChange={handleInput} value={questionInput.etat}  className="input100 border-0 " type="text" >
{/* <option  selected hidden>--Etat--</option> */}
  
        <option selected  name="etat"  value="active">Activer</option>
        <option  name="etat"  value="désactivé">Désactiver</option> 
 </select>

        
          <span className="focus-input111" />
          <span className="symbol-input111">
            <i className="fas fa-user-tie" aria-hidden="true" />
          </span>
        </div>
    <Button  variant="success" type='submit' block>
      mettre à jour
    </Button>
  </Form>
</div>

)

 
}

export default ModifierQuestion