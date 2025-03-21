import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const [token, , removeToken] = useCookies(['mytoken']); // Removed SetToken
  const navigate = useNavigate();

  const logoutBtn = () => {
    removeToken('mytoken'); // ✅ Corrected cookie removal
    navigate('/'); // ✅ Redirect user to login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Welcome to Blog</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={logoutBtn}>Log out</button> {/* ✅ Changed to button for accessibility */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
