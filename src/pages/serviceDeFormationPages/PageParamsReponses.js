import { React, useState, useEffect } from 'react';
import { useNavigate, useParams, NavLink, Link } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineBars } from "react-icons/ai";

import swal from 'sweetalert';
import Swal from 'sweetalert2';

function PageParamsReponses() {
  const Swal = require('sweetalert2');
  const questionId = useParams().id;
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
    niveaustagiaire: '',
    duree: '',
    note: '',


  });

  const handleInput = (e) => {
    e.persist();
    setTest({ ...testInput, [e.target.name]: e.target.value })

  }
  const submitReponses = (e) => {
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
      id_question: questionId,
      repcorrecte: testInput.niveaustagiaire,
      reptext: testInput.duree,
      // repimage: testInput.note
    }
    axios.post('/api/reponse', data).then(res => {

      if (res.data.status === 200) {
        Swal.fire("Success", res.data.message, "success");
        setTest({
          ...testInput,
          titre: '',
          niveaustagiaire: '',
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
  const [repType, setRepType] = useState(null);

  useEffect(() => {
    axios.get(`/api/reponse-question/${questionId}`).then(res => {
      if (res.status === 200) {
        setQuestionlist(res.data.reponses)
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
      text: "Vous ??tes sur vous voulez supprimer d??partement!",
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
            Swal.fire("Succ??s", res.data.message, "success");
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
        } else if (val.repimage.toLowerCase().includes(searchTerm.toLowerCase()) || val.reptext.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val;
        }
      }).map((item, index) => {

        return (
          <tr key={item._id}>
            <td>{item._id}</td>
            <td>{item.repimage}</td>
            <td>{item.reptext}</td>
            <td>{item.repcorrecte}</td>
            {/* <td>{questionId}</td> */}
            {/* <td>
<a href="#"  key={item._id} data-toggle="modal" data-target="#exampleModalmodifier" ><i className="fas fa-pencil-alt  text-success"></i></a>  
        
         
</td>
 */}
            <td>
              <Link to={`/service-de-formation/modifier-question/${item._id}`}>
                <i size={25} className="fas fa-pencil-alt  text-success"></i></Link>
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
            <td><a href=''><AiOutlineBars size={25} color={'green'} /></a></td>
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
              <h3>Param??tres des r??ponses</h3>
            </div>


            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">


                <NavLink className={(ndata) => ndata.isActive && "active"} to='/service-de-formation/acceuil'>Acceuil</NavLink>  <span> / </span>
                <NavLink className={(ndata) => ndata.isActive && "active"} to='/service-de-formation/paramQuiz'>Param??tres du test</NavLink>

              </ol>
            </div>
          </div>
        </div>{/* /.container-fluid */}
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

              <a href="#" className="btn btn-primary btn-sm " data-toggle="modal" data-target="#z" style={{ marginRight: "1cm" }} > + Ajouter une r??ponse</a>
              {/* <a href="#" className="btn btn-success btn-sm " data-toggle="modal" data-target="#y" style={{ marginRight: "1cm" }}> +cr??er reponse</a> */}

            </div>

          </div>

          <br />

          <div className="card card-primary" style={{ marginLeft: "1cm", marginRight: "1cm" }}>


            <div className="card-header">


              <h3 className="card-title">R??ponses</h3>
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
                    <th>R??ponse Image</th>
                    <th>R??ponse Texte</th>
                    <th>R??ponse Correcte?</th>
                    <th>Modifier</th>
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










      {/* Cr??er Test----------------------------------------------------- */}
      {/* Afficher d??tails   */}
      <div>


        {/* Modal */}
        <div className="modal fade col-md-12" id="z" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog  ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="#exampleModalLabel">Ajouter une r??ponse</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">??</span>
                </button>
              </div>
              <div className="modal-body">

                {/* body */}

                <div className="col-md-offset-3 col-md-12">
                  <form onSubmit={submitReponses}>
                    <div className="row">



                      {/* R??ponse */}


                      <div className="wrap-input100   col-lg-12 mb-4 " >
                        <select name='niveaustagiaire' onChange={handleInput} value={testInput.niveaustagiaire} className="input100 border-0 ">
                          <option selected hidden>--Correcte?--</option>
                          <option name="niveaustagiaire" value={true}>Oui</option>
                          <option name="niveaustagiaire" value={false}>Non</option>
                        </select>

                      </div>

                      <div className='wrap-input100   col-lg-12 mb-4'>
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <input type='radio' id='repText' name='rep' onClick={() => setRepType(0)} />
                            <p style={{ marginLeft: 5 }}>R??ponse Texte</p>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <input type='radio' id='repImage' name='rep' onClick={() => setRepType(1)} />
                            <p style={{ marginLeft: 5 }}>R??ponse Image</p>
                          </div>
                        </div>
                      </div>

                      {
                        repType === 0 ?
                          <div className="wrap-input100 col-lg-12 mb-4 ">
                            <input name="duree" className="input100 border-0 " type="text" placeholder="R??ponse" onChange={handleInput} value={testInput.duree} />
                          </div>
                          : repType === 1 ?
                          <div className="wrap-input100 col-lg-12 mb-4">
                            <input name="note" className="input100 border-0 " type="file" onChange={handleInput} value={testInput.note} />
                          </div>
                          : null
                      }





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

      {/* .Afficher d??tails   */}

      {/* Cr??er Test----------------------------------------------------- */}

    </>
  )
}

export default PageParamsReponses
