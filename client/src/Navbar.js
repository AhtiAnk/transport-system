import React from 'react'

function Navbar() {
  return (
    <nav className="navbar navbar-light bg-primary">
        <div className="container-fluid">
            <a className="navbar-brand text-white" href="/">Kodu</a>
            <a className="btn btn-dark" href="/login">Logi sisse</a>
        </div>
    </nav>
  )
}

export default Navbar