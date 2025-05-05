
/* export const HomePage=()=>{ 
  
  return (
    <>
      <div className="home">
      <h1 className="title">🎬 Upload Video</h1>
      
    </div>
    </>
  )
} */
import React, { useState } from 'react';
import { FaFileUpload, FaPaperPlane } from 'react-icons/fa';
import './File.css'; // Importa el archivo de estilos
import { useAuth } from '../../context/AuthContext';

import { get, post } from "../../api/axios";

const FileUpload = () => {
  
  const [file, setFile] = useState(null);
  const [nspeakers, setNspeakers] = useState('');

  const { user, login, logout, loading, error } = useAuth();



  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    //formData.append('nspeakers', nspeakers);

    try {
      const response=await post('/api/video/upload/'+user.username, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  console.log("desde file: ",user)

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label className="form-label">
            <FaFileUpload /> Upload file:
            <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
          </label>

          

          <button type="submit" className="submit-button">
            <FaPaperPlane /> Upload!
          </button>
        </div>
      </form>
    </div>
  );
};

export default FileUpload;