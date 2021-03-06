import React from 'react'

export default props => (
  <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <p className="navbar-brand" style={{marginTop: 10}}>Clarion Group Sales</p>
      <button onClick={props.sign} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="sign-in-alt">{props.user || 'Log In'}</span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
            <a className="nav-link" href=""><span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
        <span className="badge badge-pill badge-success">secured server</span>
        </li>
        <li className="nav-item">
            
        </li>
        <li className="nav-item">
            
        </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
        {/* <input className="form-control mr-sm-2" type="Password" placeholder="password"/> */}
        <button className="btn btn-secondary my-2 my-sm-0" onClick={props.sign}>{props.user || 'Log In'}</button>
        </form>
      </div>
    </nav>
          
  </div>
)