import "./PreTest.css"
import "./Form.css" 
import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, Select } from "@material-ui/core";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";





function Pretest() {

      const navigate=useNavigate();
      

      const[preInput,setpre] = useState({
          email:"",
          cinoupassport_stagiaire:"",
          niveauetude:"",
          error_list:[],
      });

      const handleInput = (e) => {
          e.persist();
          setpre({...preInput, [e.target.name]: e.target.value})
      }

const submitPre = (e) => {
    e.preventDefault();
     const data ={
         email:preInput.email,
         cinoupassport_stagiaire:preInput.cinoupassport_stagiaire,
         niveauetude:preInput.niveauetude,
     }
     axios.get('/sanctum/csrf-cookie').then(response => {
    
        axios.post('api/identifier/stage',data).then(res => {
        if(res.data.status === 200) {
         swal("Success",res.data.message,"success");
         navigate("/quiz");
         document.getElementById('STAG_FORM').reset();
        }
        else if(res.data.status === 400) {
          setpre({...preInput, error_list:res.data.errors});
        }
        });
       });
      }

  return (
    <div>
        
        <div className="">
  {/* <img src="https://image.freepik.com/free-vector/purple-background-with-neon-frame_52683-34124.jpg"  class="bgimg " alt="">*/} 
  <div className="quizC">
    <div className="leftside">
      <img src="../../dist/img/quiz.png" className="quiz" alt="quiz" />
    </div>
    <div className="rightside">
      <form onSubmit={submitPre} id="STAG_FORM">
        <h1>passer</h1>
        <h2>test psychotechnique</h2>
        <p>Email</p>
        <input type="email" className="inputbox" name="email" required  onChange={handleInput} value={preInput.email} />
        <span>{preInput.error_list.email}</span>
        <p>Num Cin ou Passport</p>
        <input type="text" className="inputbox" name="cinoupassport_stagiaire" id="cinoupassport_stagiaire" required onChange={handleInput} value={preInput.cinoupassport_stagiaire}  />
        <span>{preInput.error_list.cinoupassport_stagiaire}</span>
        <p>niveau d'étude</p>
        <select className="inputbox" name="niveauetude" onChange={handleInput} value={preInput.niveauetude} id="niveauetude" required>
          <option value>--Sélectionner un niveau de stagiaire--</option>
          <option name="niveauetude" value="bac">Bac</option>
          <option name="niveauetude" value="BTS">BTS</option>
          <option name="niveauetude" value="Licence">Licence</option>
          <option name="niveauetude" value="Master">Master</option>
          <option name="niveauetude" value="ingénieur">ingénieur</option>
        </select>
        <span>{preInput.error_list.niveauetude}</span>
        
        <p />
        <button type="submit" className="button">enregistrer</button>
      </form>
    </div>
  </div>
</div>

    </div>
  )
}

export default Pretest
