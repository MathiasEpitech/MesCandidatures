import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-black" data-bs-theme="dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          Mes Candidatures
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item px-2">
              <a className="nav-link active" href="/">
                Home
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item px-2">
              <a className="nav-link" href="//ajouter">
                Ajouter une Candidature
              </a>
            </li>

            <li className="nav-item px-2">
              <a className="nav-link" href="//ajouter">
                Ajouter un Suivi
              </a>
            </li>

            {/* <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Separated link</a>
          </div>
        </li> */}
          </ul>
          <form className="d-flex">
            <input
              className="form-control bg-light text-black me-sm-2"
              type="search"
              placeholder="Search"
            />
            <a className="btn btn-secondary my-2 my-sm-0" type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
            </a>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
