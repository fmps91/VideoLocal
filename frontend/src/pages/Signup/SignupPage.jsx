import React, { useState } from 'react';
import './Signup.css';

export const SignupPage=()=> {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registrando usuario:', form);
    alert(`Registrado como ${form.name}`);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Crear Cuenta</h2>
        
        <label>
          Nombre completo
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        
        <label>
          Correo electrónico
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        
        <label>
          Contraseña
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
