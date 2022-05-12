import React from 'react'

function Page404() {
  return (
    <>


  {/* Main content */}

  <br/><br/> <br/><br/><br/><br/><br/><br/>
  <section className="content ">
    <div className="error-page">
      <h2 className="headline text-warning"> 404</h2>
      <div className="error-content">
        <h3><i className="fas fa-exclamation-triangle text-warning" /> Oops! Page not found.</h3>
        <p>
          We could not find the page you were looking for.
          
        </p>
        <form className="search-form">
          <div className="input-group">
            <input type="text" name="search" className="form-control" placeholder="Search" />
            <div className="input-group-append">
              <button type="submit" name="submit" className="btn btn-warning"><i className="fas fa-search" />
              </button>
            </div>
          </div>
          {/* /.input-group */}
        </form>
     
      </div>
      {/* /.error-content */}
    </div>
    {/* /.error-page */}
  </section>
 

    </>
  )
}

export default Page404
