import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import _ from "lodash";
import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageConsulterQuestionReponse() {


  const Swal = require('sweetalert2');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [Questionlist, setQuestionlist] = useState([]);

  const [Reponselist, setReponselist] = useState([]);



  //Ajouter Question

  const [questionInput, setQuestion] = useState({
    question: '',
    niveau: '',
    duree: '',
    titre: '',
    points: ''

  });
  const handleInput = (e) => {
    e.persist();
    setQuestion({ ...questionInput, [e.target.name]: e.target.value })

  }
  const submitQuestion = (e) => {
    e.preventDefault();
    const data = {
      question: questionInput.question,
      niveau: questionInput.niveau,
      duree: questionInput.duree,
      titre: questionInput.titre,
      points: questionInput.points
    }
    axios.post('/api/question', data).then(res => {
      if (res.data.status === 200) {
        Swal.fire("Success", res.data.message, "success");
        navigate('/service-de-formation/afficherQuestionReponse');
        // document.getElementById('Question_form').reset();
      }
    })
  }
  //.Ajouter Question



  //Ajouter Reponse

  const [repInput, setReponse] = useState({
    reptext: '',
    repcorrecte: '',
  });

  const [image, setRepimage] = useState([]);
  const [errorlist, setError] = useState([]);

  const handleInputa = (e) => {
    e.persist();
    setReponse({ ...repInput, [e.target.name]: e.target.value })
  }
  const handleImage = (e) => {
    setRepimage({ repimage: e.target.files[0] });
  }
  const submitReponse = (e) => {
    e.preventDefault();
    /* const formData = new FormData();
     formData.append('repimage',image.repimage);
     formData.append('reptext',repInput.reptext);
     formData.append('repcorrecte',repInput.repcorrecte);*/

    const data = {

      reptext: repInput.reptext,
      repcorrecte: repInput.repcorrecte,
      repimage: image.repimage,

    }

    axios.post('/api/reponse ', data).then(res => {

      if (res.data.status === 200) {
        Swal.fire("Success", res.data.message, "success");
        setReponse({
          ...repInput,
          reptext: '',
          repcorrecte: '',
        });
        navigate('/service-de-formation/afficherQuestionReponse');
        setError([]);
      }
      else if (res.data.status === 422) {
        Swal.fire("tous les champs sont requis", "", "error");
        setError(res.data.errors);
      }
    });
  }



  //.Ajouter Reponse







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



  useEffect(() => {
    axios.get('/api/reponse').then(res => {
      if (res.data.status === 200) {
        setReponselist(res.data.reponses)
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
  var AfficherReponse_HTMLTABLE = "";

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




  //Reponse



  if (loading) {
    return <h5>Loading Q/A ...</h5>
  }
  else {
    AfficherReponse_HTMLTABLE = ""
    AfficherReponse_HTMLTABLE =
      Reponselist.filter(val => {
        if (searchTerm === "") {
          return val;
        } else if (val.reptext.toLowerCase().includes(searchTerm.toLowerCase()) || val.repcorrecte.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      }).map((item, index) => {

        return (
          <tr key={item._id}>
            <td>{index + 1}</td>
            <td><img style={{ height: "90px", width: "120px" }} src={`http://127.0.0.1:8000/${item.repimage}`} alt="repimage" /></td>
            <td>{item.reptext}</td>
            <td>{item.repcorrecte}</td>

            {/* <td> <a className="btn btn-info btn-sm" ><i className="fas fa-pencil-alt"> </i> </a></td> */}
            {/* <td> <a className="btn btn-danger btn-sm" ><i className="fas fa-trash"> </i></a></td>

        <td><a href="#"  key={item._id} data-toggle="modal" data-target="#exampleModalmodifier" ><i className="fas fa-pencil-alt  text-success"></i></a> </td>
 */}
            <td>
              <Link to={`/service-de-formation/modifier-reponse/${item._id}`}>
                <i className="fas fa-pencil-alt  text-success"></i></Link>
            </td>
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
              <h3>Question-Reponse</h3>


            </div>


            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">





                <NavLink className={(ndata) => ndata.isActive && "active"} to='/service-de-formation/acceuil'>Acceuil </NavLink> <span> / </span>
                <NavLink className={(ndata) => ndata.isActive && "active"} to='/service-de-formation/afficherQuestionReponse'>Question-Reponse</NavLink>




              </ol>
            </div>


          </div>
        </div>
      </section>






      <div className="container ">
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
            <div className="form-inline float-right">

              <a href="#" className="btn btn-primary btn-sm " data-toggle="modal" data-target="#x" style={{ marginRight: "1cm" }} > +créer question</a>
              <a href="#" className="btn btn-success btn-sm " data-toggle="modal" data-target="#y" style={{ marginRight: "1cm" }}> +créer reponse</a>


            </div>

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
      </div>



      {/* Reponse */}






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




          <br />




          <div className="card card-success" style={{ marginLeft: "1cm", marginRight: "1cm" }}>


            <div className="card-header">


              <h3 className="card-title">Les Reponse</h3>
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
                    <th>id rép</th>
                    <th>réponse image</th>
                    <th>réponse text</th>
                    <th>réponse correcte?</th>

                    <th />
                  </tr>
                </thead>
                <tbody>


                  {AfficherReponse_HTMLTABLE}



                </tbody>
              </table>


            </div>
          </div>












        </div>
      </div>









      {/* Créer Question--------------------------------------------------  */}

      {/* Afficher détails  exampleModal */}
      <div>


        {/* Modal */}
        <div className="modal fade col-md-12" id="x" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog  ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Ajouter Question</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">

                {/* body */}

                <div className="col-md-offset-3 col-md-12">
                  <form onSubmit={submitQuestion}  >
                    <div className="row">


                      {/*Question*/}
                      <div className="wrap-input100   col-lg-12 mb-4" >
                        <input className="input100" type="textarea" name="question" placeholder="Taper question"
                          onChange={handleInput} value={questionInput.question}
                          rows={3} required />
                        <span className="focus-input111" />
                        <span className="symbol-input111">

                        </span>

                      </div>


                      {/*Niveau de difficulté*/}
                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <select name="niveau"
                          onChange={handleInput} value={questionInput.niveau} className="input100 border-0 " type="text" >
                          <option selected hidden>--Niveau-- </option>
                          <option name="niveau" value="facile">facile</option>
                          <option name='niveau' value="moyen">moyen</option>
                          <option name='niveau' value="difficile">difficile</option>
                        </select>
                        <span className="focus-input111" />
                        <span className="symbol-input111">

                        </span>
                      </div>


                      {/*Durée */}
                      <div className="wrap-input100   col-lg-12 mb-4" >
                        <input className="input100" name='duree'
                          type="text"
                          placeholder='Durée de la question'
                          onChange={handleInput} value={questionInput.duree}
                          required />
                        <span className="focus-input111" />
                        <span className="symbol-input111">

                        </span>

                      </div>


                      {/*Titre */}
                      <div className="wrap-input100   col-lg-12 mb-4" >
                        <input className="input100"
                          name='titre'
                          type="text"
                          placeholder='Titre du test'
                          onChange={handleInput} value={questionInput.titre}

                          required />
                        <span className="focus-input111" />
                        <span className="symbol-input111">

                        </span>

                      </div>

                      {/*Points */}
                      <div className="wrap-input100   col-lg-12 mb-4" >
                        <input className="input100"
                          name='points'
                          type="text"
                          placeholder='Points du question'
                          onChange={handleInput} value={questionInput.points}

                          required />
                        <span className="focus-input111" />
                        <span className="symbol-input111">

                        </span>

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


      {/*.Créer Question--------------------------------------------------  */}




      {/* Créer Reponse----------------------------------------------------- */}
      {/* Afficher détails   */}
      <div>


        {/* Modal */}
        <div className="modal fade col-md-12" id="y" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog  ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="#exampleModalLabel">Ajouter Reponse</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">

                {/* body */}

                <div className="col-md-offset-3 col-md-12">
                  <form onSubmit={submitReponse}  >
                    <div className="row">




                      {/*Reponse image*/}
                      {/*    <p style={{marginLeft:"0.5cm"}}  className="text-secondary">Réponse image</p>
        <div className="wrap-input100   col-lg-12 mb-4" >
              <input className="input100"  name='reptext'
      type="file" 
     
      onChange={handleImage}
      required/>
              <span className="focus-input111" />
              <span className="symbol-input111">
            
              </span>
            
            </div>
 */}

                      {/*Reponse image*/}
                      <div className="wrap-input100   col-lg-12 mb-4  form-group " >
                        <p className="text-secondary">Réponse image</p>
                        <div className="frame">
                          <div className="d-flex justify-content-center ">
                            <div className="dropzone">
                              <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon  " />
                              <input name='reptext'
                                type="file" onChange={handleImage} required className="upload-input " />
                            </div>
                          </div>
                        </div>
                      </div>





                      {/*Reponse Text*/}
                      <div className="wrap-input100   col-lg-12 mb-4" >
                        <input className="input100" name='reptext'
                          type="text"
                          placeholder='Réponse text'
                          onChange={handleInputa} value={repInput.reptext}

                          required />
                        <span className="focus-input111" />
                        <span className="symbol-input111">

                        </span>

                      </div>



                      {/*Reponse correcte*/}
                      <div className="wrap-input100   col-lg-12 mb-4" >
                        <input className="input100" name="repcorrecte"
                          type="text" placeholder='Réponse correcte' onChange={handleInputa} value={repInput.repcorrecte} required />
                        <span className="focus-input111" />
                        <span className="symbol-input111">

                        </span>

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

      {/* Créer Reponse----------------------------------------------------- */}
    </>
  )
}

export default PageConsulterQuestionReponse
