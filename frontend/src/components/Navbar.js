import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{background:'linear-gradient(90deg, #6610f2,#6f42c1)'}}>
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/home">iNotebook</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
              <Link className="btn btn-outline-light" to="/signup">Signup</Link>
            </form>
          ) : (
            <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

