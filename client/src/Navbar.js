import React from 'react'

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-dark position-absolute w-100">
        <div className="container-fluid">
            <a className="navbar-brand text-white" href="/">Avaleht</a>
            <a className="btn btn-primary" href="/login">Logi sisse</a>
        </div>
    </nav>
  )
}

export default Navbar