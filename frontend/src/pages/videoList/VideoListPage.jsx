import React, { useState } from 'react';

import { post } from "../../api/axios";
import { useParams } from 'react-router-dom';
//import VideoPlayer from '../../components/video';
import { useEffect } from 'react';
import "./VideoList.css"
import { Link } from 'react-router-dom';

export const VideoListPage=()=>{ 

    //const [name, setName] = useState('');
    const [videos, setVideos] = useState([]);
  
  
  const { name } = useParams();// <- name viene del navigate
  


  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await post('/api/video/filter', { name });
        console.log(data);

        setVideos(data.videos); // NO push, simplemente reemplazas
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
          <Link to={`/video/${video._id}`} key={video._id} className="VideoCard">
          
          
          <div className="video-info">
              <h3>{video.name}</h3>
              <p>{new Date(video.createdAt).toLocaleDateString()}</p>
          </div>
          </Link>
        
        ))

      :
      
      <p>No hay videos disponibles.</p>
      
      }
    </div>
  );
  
}