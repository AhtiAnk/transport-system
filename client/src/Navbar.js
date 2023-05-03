import React from 'react'

function Navbar({loginStatus, setLoginStatus}) {

    const logOutClicked = () => {
        setLoginStatus(false);
        sessionStorage.removeItem("isLoggedIn");
    };

    return (
        <nav className="navbar navbar-light bg-dark position-absolute w-100">
            <div className="container-fluid">
                <div>
                    <a className="navbar-brand text-white navLink" href="/">Avaleht </a>
                    {loginStatus && <a className="navbar-brand text-white navLink" href="/admin">Hoonete muutmine</a>}
                </div>
                {loginStatus ?
                    <a className="btn btn-primary" href="/" onClick={logOutClicked}>Logi välja</a>
                    : 
                    <a className="btn btn-primary" href="/login">Logi sisse</a>
                }
            </div>
        </nav>
    )
}

export default Navbar