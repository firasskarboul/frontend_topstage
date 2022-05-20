import React, { useState } from 'react'
import { useNavigate, Link, NavLink, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import axios from 'axios';
function PageDeposerRapport() {

  const [selectedFile, setSelectedFile] = useState(null)
  const Swal = require('sweetalert2');
  const navigate = useNavigate();

  function handleChange(event) {
    setSelectedFile(event.target.files[0])
  }

  function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData()
    formData.append('file', selectedFile)
    // const config = {
    //   'headers': {
    //     'content-type': 'multipart/form-data'
    //   }
    // }


    axios.post('/api/deposer-rapport/627d5b04e5f5056c8205ef83', formData)
      .then((response) => {
        console.log(response.data)
        // if (res.data.status === 200) {
        //   Swal.fire("Succès", res.data.message, "success");
        //   // navigate('/stagiaire/acceuil');
        // }

        // else if (res.data.status === 400) {
        //   Swal.fire("Erreur", res.data.message, "error");
        // }
      }).catch(error => {
        console.log(error)
      })
  }

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

                <NavLink className={(ndata) => ndata.isActive && "active"} to='/stagiaire/acceuil'>Acceuil</NavLink>  <span> / </span>
                <NavLink className={(ndata) => ndata.isActive && "active"} to='/stagiaire/deposer-rapport'>Déposer Rapport</NavLink>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <br />


      <div className="col-md-offset-3 col-md-12">
        <div className="form-container">
          <div className="wrap-input100 col-lg-12 mb-4 form-group " >
            <p className="text-center text-secondary">{selectedFile === null ? "Déposer votre Rapport" : selectedFile.name}</p>

            {/* <form onSubmit={handleSubmit}>
                <h1>React File Upload</h1>
                <input type="file" onChange={handleChange} />
                <button type="submit" >Upload</button>
              </form> */}

            <div className="frame">
              <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center ">
                  <div className="dropzone">
                    <img src="http://100dayscss.com/codepen/upload.svg" className="upload-icon" />
                    <input type="file" onChange={handleChange} className="upload-input" />
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  <div className="form-group col-lg-2  ">

                    <button type="submit" className="login100-form-btn">
                      {/* <Link to="#" style={{ color: 'white' }}> */}
                      Déposer
                      {/* </Link> */}
                    </button>

                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PageDeposerRapport



