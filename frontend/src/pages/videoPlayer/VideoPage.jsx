import React, { useState } from 'react';

import { get, post } from "../../api/axios";
import { useParams } from 'react-router-dom';
//import VideoPlayer from '../../components/video';
import "./Video.css"
import VideoPlayer from '../../components/VideoPlayer';

export const VideoPage=()=>{
  
  /* const { id } = useParams();
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('ID de video no proporcionado');
      setLoading(false);
      return;
    }

    // Configura la fuente del video directamente
    const videoUrl = `http://tu-servidor-backend/videos/${id}`;
    
    // Opcional: Verificar disponibilidad del video
    const checkVideo = async () => {
      try {
        await axios.head(videoUrl);
        setLoading(false);
      } catch (err) {
        setError('Video no disponible');
        setLoading(false);
      }
    };

    checkVideo();

    // Configurar el elemento video cuando esté disponible
    if (videoRef.current) {
      videoRef.current.src = videoUrl;
    }

    return () => {
      // Limpieza
      if (videoRef.current) {
        videoRef.current.src = '';
      }
    };
  }, [id]);

  if (loading) return <div>Cargando reproductor...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        controls
        autoPlay
        muted
        width="100%"
        onError={() => setError('Error al cargar el video')}
      >
        <source src={`http://localhost:3000/api/video/read/'${id}`} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
    </div>
  ); */


  /* const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await get('http://localhost:3000/api/videos');
        setVideos(response.data);
        console.log(response)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <div>Cargando videos...</div>;
  
  return (
    <div className="video-app">
      <div className="video-list">
        <h2>Lista de Videos</h2>
        <ul>
          {videos.map(video => (
            <li key={video.id} onClick={() => setSelectedVideo(video)}>
              <img src={video.thumbnail} alt={video.title} />
              <span>{video.title}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="video-player">
        <h2>{selectedVideo?.title || 'Selecciona un video'}</h2>
        {selectedVideo && (
          <video
            controls
            autoPlay
            key={selectedVideo.id}
            style={{ width: '100%', maxHeight: '500px' }}
          >
            <source src={selectedVideo.url} type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </video>
        )}
      </div>
    </div>
  ); */

  const { id } = useParams();

  const [videoId, setVideoId] = useState(null)

  //setVideoId(id)
  function playVideo(e, videoId){
    e.preventDefault()
    setVideoId(videoId)
  }

  return (
    <div className="App">
      {id && <VideoPlayer videoId={id} ></VideoPlayer>} <br />
      {/* <button onClick={(e)=>{playVideo(e, id)}}>Play Video 1</button>
      <button onClick={(e)=>{playVideo(e, '2')}}>Play Video 2</button>
      <button onClick={(e)=>{playVideo(e, '6813ad4f2e8b843c190f03b6')}}>Play Video 3</button> */}
    </div>
  );


  /* const { id } = useParams();
  
  const videoRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(null); // Inicializa como null en lugar de string vacía
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const response = await get('/api/video/read/'+id, {
          responseType: 'blob', // Asegúrate de que esto esté configurado
        });

        console.log("response: ",response)

        if (!(response.data instanceof Blob)) {
          throw new Error('La respuesta no es un Blob válido');
        }

        const videoObjectURL = URL.createObjectURL(response.data);
        setVideoUrl(videoObjectURL);
      } catch (err) {
        console.error('Error cargando el video:', err);
        setError('No se pudo cargar el video');
      } finally {
        setIsLoading(false);
      }
    };

    loadVideo();

    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, []);

  if (isLoading) return <div>Cargando video...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
    
      {videoUrl && (
        <video
          ref={videoRef}
          controls
          width="100%"
          src={videoUrl} // Ahora src nunca será una string vacía
          autoPlay
          muted
        >
          Tu navegador no soporta videos HTML5.
        </video>
      )}
    </div>
  ); */


    

  
  /* 
  const { id } = useParams();// <- name viene del navigate
  
  
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await get('/api/video/read/'+id);
        console.log(data);

        setVideo(data.videos); // NO push, simplemente reemplazas
        console.log(data);
      } catch (error) {
        console.error('Error cargando videos:', error);
      }
    };

    fetchVideos();
  }, [name]); 
  
  //console.log("video "+data)
  return (
    <div id="Videos">
      {videos.length !== 0 ?
        //"./upload/user11745729140144-830296601.mp4"
        videos.map((video) => (
          <div className="VideoCard" key={video._id}>
          
          <div className="video-info">
              <h3>{video.name}</h3>
              <p>{new Date(video.createdAt).toLocaleDateString()}</p>
          </div>
      </div>
        
        ))

      :
      
      <p>No hay videos disponibles.</p>
      
      }
    </div>
  ); */

  /* return (
    <div >
      <h1>Reproductor de Video Local</h1>
      
      <video
        src="/videos/01.mp4" // Ruta relativa al "public"
        controls
        width="600"
      
      />
    </div>
  ); */
  
  }