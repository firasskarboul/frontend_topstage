import { React, useState, useEffect } from 'react';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineBars } from "react-icons/ai";

import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageParamsQuiz() {
  const Swal = require('sweetalert2');

  const [errorlist, setError] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [Questionlist, setQuestionlist] = useState([]);

  const [Testlist, setTestlist] = useState([]);



  //Ajouter Question

  /* const [questionInput,setQuestion] =useState({
      question:'',
      niveau:'',
      duree:'',
      titre:'',
      points:''
      
    });
    const handleInput = (e) => {
      e.persist();
      setQuestion({...questionInput,[e.target.name] : e.target.value})
  
    }
    const submitQuestion = (e) => {
      e.preventDefault();
      const data = {
        question:questionInput.question,
        niveau:questionInput.niveau,
        duree:questionInput.duree,
        titre:questionInput.titre,
        points:questionInput.points
      }
      axios.post('/api/question',data).then(res =>
        {
          if(res.data.status === 200) {
            swal("Success",res.data.message,"success");
            navigate('/service-de-formation/afficherQuestionReponse');
        
          }
        })
    } */

  //.Ajouter Question









  //Ajouter Test
  const [testInput, setTest] = useState({
    titre: '',
    departement: '',
    niveaustagiaire: '',
    niveautest: '',
    duree: '',
    note: '',


  });

  const handleInput = (e) => {
    e.persist();
    setTest({ ...testInput, [e.target.name]: e.target.value })

  }
  const submitTest = (e) => {
    e.preventDefault();
    /*  const formData = new FormData();
     formData.append('titre',testInput.titre);
     formData.append('departement',testInput.departement);
     formData.append('niveaustagiaire',testInput.niveaustagiaire);
     formData.append('niveautest',testInput.niveautest);
     formData.append('duree',testInput.duree);
     formData.append('note',testInput.note);
    */

    const data = {
      titre: testInput.titre,
      departement: testInput.departement,
      niveaustagiaire: testInput.niveaustagiaire,
      niveautest: testInput.niveautest,
      duree: testInput.duree,
      note: testInput.note
    }
    axios.post('/api/test', data).then(res => {

      if (res.data.status === 200) {
        Swal.fire("Success", res.data.message, "success");
        setTest({
          ...testInput,
          titre: '',
          departement: '',
          niveaustagiaire: '',
          niveautest: '',
          duree: '',
          note: '',
        });
        //navigate('/service-de-formation/afficherQuestionReponse');
        return loading;
        setError([]);
      }
      else if (res.data.status === 422) {
        Swal.fire("tous les champs sont requis", "", "error");
        setError(res.data.errors);
      }
    });

  }
  //.Ajouter Test







  //rechercher




  //Afficher Question 
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('/api/allquestion').then(res => {
      if (res.status === 200) {
        setQuestionlist(res.data.questions)
      }
      setLoading(false);
    });
  }, []);

  //Afficher Test
  useEffect(() => {
    axios.get('/api/test').then(res => {
      if (res.status === 200) {
        setTestlist(res.data.test)
      }
    });
  }, []);


  //////////////////////////////////confirmation

  const deleteDept = (e, id) => {
    const thisClicked = e.currentTarget;
    e.preventDefault();

    Swal.fire({
      title: 'Confirmer?',
      text: "Vous étes sur vous voulez supprimer département!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui,Supprimer!',
      cancelButtonText: 'Annuler',

    }).then((result) => {
      if (result.isConfirmed) {

        axios.delete(`api/supprimer-departement/${id}`).then(res => {
          if (res.data.status === 200) {
            Swal.fire("Succès", res.data.message, "success");
            thisClicked.closest("tr").remove();
            //<i className=" fas fa-trash-alt  text-danger"></i>
          }
          else {
            Swal.fire("Erreur", res.data.message, "error");
            // thisClicked.innerText ="Delete"
            //<i className=" fas fa-trash  text-danger"></i>
          }
        });

        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })
  }

  ///////////////////////.confirmation

  //Question
  var AfficherQuestion_HTMLTABLE = "";


  if (loading) {
    return <h5>Loading Q/A ...</h5>
  }
  else {
    AfficherQuestion_HTMLTABLE =
      Questionlist.filter(val => {
        if (searchTerm === "") {
          return val;
        } else if (val.question.toLowerCase().includes(searchTerm.toLowerCase()) || val.niveau.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      }).map((item, index) => {

        return (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.question}</td>
            <td>{item.niveau}</td>
            <td>{item.duree}</td>
            <td>{item.points}</td>
            {/* <td>
<a href="#"  key={item._id} data-toggle="modal" data-target="#exampleModalmodifier" ><i className="fas fa-pencil-alt  text-success"></i></a>  
        
         
</td>
 */}
            <td>
              <Link to={`/service-de-formation/modifier-question/${item._id}`}>
                <i className="fas fa-pencil-alt  text-success"></i></Link>
            </td>
          </tr>
        )
      });
  }




  //Test



  if (loading) {
    return <h5>Loading Q/A ...</h5>
  }
  else {
    var AfficherTest_HTMLTABLE = ""
    AfficherTest_HTMLTABLE =
      Testlist.filter(val => {
        if (searchTerm === "") {
          return val;
        } else if (val.niveautest.toLowerCase().includes(searchTerm.toLowerCase()) || val.niveaustagiaire.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      }).map((item, index) => {

        return (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.titre}</td>
            <td>{item.departement}</td>
            <td>{item.niveaustagiaire}</td>
            <td>{item.niveautest}</td>
            <td>{item.note}</td>
            <td>{item.duree}</td>
            <td><a href={`paramQuiz/${item._id}`}><AiOutlineBars size={25} color={'green'} /></a></td>
          </tr>
        )
      });
  }

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h3>Paramètres du test</h3>
            </div>


            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">


                <NavLink className={(ndata) => ndata.isActive && "active"} to='/service-de-formation/acceuil'>Acceuil</NavLink>  <span> / </span>
                <NavLink className={(ndata) => ndata.isActive && "active"} to='/service-de-formation/paramQuiz'>Paramètres du test</NavLink>

              </ol>
            </div>
          </div>
        </div>{/* /.container-fluid */}
      </section>



      {/* Paramétres Test */}






      <div className="container ">
        <div className="card mt-4">


          <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4  col-md-5 " style={{ marginLeft: "1cm", marginRight: "1cm", marginTop: "1cm" }}>
            <div class="input-group">
              <input type="search" placeholder="Que cherchez-vous?" aria-describedby="button-addon1" class="form-control border-0 bg-light"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}

              />
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>


          <div className="card-tools">
            <div className="form-inline float-right">

              <a href="#" className="btn btn-success btn-sm " data-toggle="modal" data-target="#z" style={{ marginRight: "1cm" }}> + Ajouter un Test</a>

            </div>

          </div>

          <br />




          <div className="card card-success" style={{ marginLeft: "1cm", marginRight: "1cm" }}>


            <div className="card-header">


              <h3 className="card-title">Tests</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>

            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Titre</th>
                    <th>Département</th>
                    <th>Niveau Stagiaire</th>
                    <th>Niveau Test</th>
                    <th>Note</th>
                    <th>Durée</th>
                    <th>Questions</th>
                  </tr>
                </thead>
                <tbody>


                  {AfficherTest_HTMLTABLE}



                </tbody>
              </table>


            </div>
          </div>
        </div>
      </div>

      {/* <div className="container ">
        <div className="card mt-4">


          <div class="p-1 bg-light rounded rounded-pill shadow-sm mb-4 col-md-5  " style={{ marginLeft: "1cm", marginRight: "1cm", marginTop: "1cm" }}>
            <div class="input-group">
              <input type="search" placeholder="Que cherchez-vous?" aria-describedby="button-addon1" class="form-control border-0 bg-light "
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}

              />
              <div class="input-group-append">
                <button id="button-addon1" type="submit" class="btn btn-link text-primary"><i class="fa fa-search"></i></button>
              </div>
            </div>
          </div>


          <div className="card-tools">
            <div className="form-inline float-right"> */}

      {/* <a href="#" className="btn btn-primary btn-sm " data-toggle="modal" data-target="#x" style={{marginRight:"1cm"}} > +créer question</a>  
<a href="#" className="btn btn-success btn-sm " data-toggle="modal" data-target="#y" style={{marginRight:"1cm"}}> +créer reponse</a>  
   */}

      {/* </div>

          </div>

          <br />







          <div className="card card-primary" style={{ marginLeft: "1cm", marginRight: "1cm" }}>


            <div className="card-header">


              <h3 className="card-title">Les questions</h3>
              <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>

            <div className="card-body p-0">
              <table className="table">
                <thead>
                  <tr>
                    <th>id question</th>
                    <th>question</th>
                    <th>niveau du difficulté</th>
                    <th>durée (s) </th>
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
      </div> */}










      {/* Créer Test----------------------------------------------------- */}
      {/* Afficher détails   */}
      <div>


        {/* Modal */}
        <div className="modal fade col-md-12" id="z" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog  ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="#exampleModalLabel">Ajouter Test</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">

                {/* body */}

                <div className="col-md-offset-3 col-md-12">
                  <form onSubmit={submitTest}>
                    <div className="row">



                      {/* Titre */}
                      <div className="wrap-input100   col-lg-12 mb-4 " >


                        <input className="input100" type="text" name="titre" placeholder="Titre du test" onChange={handleInput} value={testInput.titre} />
                        <span className="focus-input111" />
                        <span className="symbol-input111">

                        </span>


                      </div>



                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <select name="departement" id="inputDépartement" onChange={handleInput} value={testInput.departement} className="input100 border-0 " type="text" >

                          <option selected hidden>--Département--</option>

                          <option name="departement" >Marketing</option>
                          <option name="departement" >DSI</option>
                          <option name="departement" >commerciale</option>
                          <option name="departement" >projets et innovation</option>
                          <option name="departement" >finance</option>

                        </select>
                      </div>

                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <select name='niveaustagiaire' onChange={handleInput} value={testInput.niveaustagiaire} className="input100 border-0 ">
                          <option selected hidden>--Niveau d'étude--</option>
                          <option name="niveaustagiaire" value="bac">Bac</option>
                          <option name="niveaustagiaire" value="bts">BTS</option>
                          <option name="niveaustagiaire" value="licence">Licence</option>
                          <option name="niveaustagiaire" value="master">Master</option>
                          <option name="niveaustagiaire" value="ingénieur">cycle ingénieur</option>
                        </select>

                      </div>
                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <select name="niveautest" className="input100 border-0 " onChange={handleInput} value={testInput.niveautest} >
                          <option selected hidden>--Niveau--</option>
                          <option name="niveautest">facile</option>
                          <option name="niveautest">moyen</option>
                          <option name="niveautest">difficile</option>

                        </select>
                      </div>

                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <input name="duree" className="input100 border-0 " type="text" placeholder="Durée du Test en secondes" onChange={handleInput} value={testInput.duree} />
                      </div>

                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <input name="note" className="input100 border-0 " type="text" placeholder="Note" onChange={handleInput} value={testInput.note} />
                      </div>

                      {/* Cancel Button */}
                      <div className="form-group col-lg-6">
                        <button type="submit" className="login100-form-btn" style={{ color: 'white' }}>

                          Ajouter

                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* .Afficher détails   */}

      {/* Créer Test----------------------------------------------------- */}

    </>
  )
}

export default PageParamsQuiz
