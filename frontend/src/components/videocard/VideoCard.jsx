import React from 'react';
import './VideoCard.css';

const VideoCard = ({ video }) => {
  return (
    <div className="video-card">
      <video className="video-player" controls>
        <source src={`http://localhost:3000/api/video/read/${video._id}`} type={video.type} />
        Your browser does not support the video tag.
      </video>
      <div className="video-info">
        <h3>{video.name}</h3>
        <p>Tipo: {video.type}</p>
        <p>Subido: {new Date(video.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default VideoCard;