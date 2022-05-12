import React from 'react'

function Page403() {
  return (
    <>
<br/><br/> <br/><br/><br/><br/><br/><br/>
<section className="content">
  <div className="error-page">
    <h2 className="headline text-danger">403</h2>
    <div className="error-content">
      <h3><i className="fas fa-exclamation-triangle text-danger" /> Oops! Something went wrong.</h3>
      <p>
        We will work on fixing that right away.
        
      </p>
      <form className="search-form">
        <div className="input-group">
          <input type="text" name="search" className="form-control" placeholder="Search" />
          <div className="input-group-append">
            <button type="submit" name="submit" className="btn btn-danger"><i className="fas fa-search" />
            </button>
          </div>
        </div>
        {/* /.input-group */}
      </form>
    </div>
  </div>
  {/* /.error-page */}
</section>

    </>
  )
}

export default Page403
