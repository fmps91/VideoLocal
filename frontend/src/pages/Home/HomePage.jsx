import './Home.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { useAuth } from '../../context/AuthContext';


export const HomePage=()=>{ 
  
  const navigate = useNavigate();
  //const { login, loading, user,data,error } = useAuthStore();
  const { user, login, logout, loading, error } = useAuth();

  function upload(e){
    e.preventDefault()
    navigate("/file");
  }

  function listVideos(e){
    e.preventDefault()
    navigate("/videos/"+user._id);
  }
  console.log("este es desde el home: ",user)

  return (
    <div className="home">
      <h1 className="title">🎬 Plataforma de Videos</h1>
      
      <div className="card-container">
        <div className="card" onClick={upload}>
          <h2>Subir Video</h2>
          <p>Haz clic para subir un nuevo video.</p>
        </div>

        <div className="card" onClick={listVideos}>
          <h2>Ver Videos</h2>
          <p>Cargar y ver todos los videos disponibles.</p>
        </div>
      </div>
    </div>
  );

  

}