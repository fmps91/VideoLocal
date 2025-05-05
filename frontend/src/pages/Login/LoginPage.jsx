import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';
import useAuthStore from '../../store/authStore';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import{ useContext } from 'react';
import { post } from "../../api/axios";

export function LoginPage() {

  const [form, setForm] = useState({ username: '', password: '' });

  const { login, error, loading } = useAuth();
  /* const ctx = useContext(MyContext);

  const { valor,setValor } = ctx; */

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("username: ",form.username)
    
   //await login(form.username, form.password);
   /* const data=await post('/api/auth/login', { "username":form.username, "password":form.password });
   setValor(data.data)  */
    //console.log(data.data)
    await login(form.username, form.password);
    
    navigate("/");
  };

  /* return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      {user && <p>Bienvenido, {user.name}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Cargando...' : 'Entrar'}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div> 
  ); */
  
  
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <div className="input-group">
          <FaUser className="input-icon" />
          <input
            type="text"
            name="username"
            placeholder="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Entrar</button>
      </form>
    </div> 
  );

  
}
