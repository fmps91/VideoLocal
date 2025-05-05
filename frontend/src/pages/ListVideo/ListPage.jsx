

import React, { useEffect, useState } from 'react';
import { get } from '../../api/axios';
import VideoCard from '../../components/videocard/VideoCard';
import './List.css';
import { useParams } from 'react-router-dom';


export const ListPage = () => {
  const [videos, setVideos] = useState([]);

  const { id } = useParams();// <- name viene del navigate

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await get('/api/video/list/'+id);
        console.log("response: ",response)
        setVideos(response.data.videos);
      } catch (err) {
        console.error('Error al cargar videos:', err);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="video-list-container">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};