
import './Navbar.css';
import React, { useState } from 'react';
import { BsPersonCircle } from "react-icons/bs";
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  const { user, login, logout, loading, error } = useAuth();

  const [input, setInput] = useState('');


  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(input); // manda el valor al padre
  };


  return (
    <nav className="navbar">

      <div className="link">
      <Link to={`/`} key={"session"} >
          <h1>MiYouTube</h1>
          </Link>
      </div>

      <div className="form">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Buscar videos..."
          />
          <button type="submit">Buscar</button>
        </form>
      </div>

      <div className="user">
        <BsPersonCircle size={40} />


        {user !== null ?
          <div>
            <h2>{user?.username}</h2>
            <details><summary>Options</summary>
              <div onClick={logout}>Cerrar sesion</div>
            </details>
          </div>
          :
          <div></div>
        }

      </div>

    </nav>
  );
};

export default Navbar;