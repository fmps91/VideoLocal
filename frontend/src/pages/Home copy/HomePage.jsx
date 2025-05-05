import './Home.css';

export const HomePage=()=>{ 
  const videos = [
    {
      id: 1,
      title: 'Aprende React en 10 minutos',
      thumbnail: 'https://i3.ytimg.com/vi/Ke90Tje7VS0/maxresdefault.jpg',
    },
    {
      id: 2,
      title: 'Curso de CSS desde cero',
      thumbnail: 'https://i3.ytimg.com/vi/yfoY53QXEnI/maxresdefault.jpg',
    },
    {
      id: 3,
      title: '¿Qué es JavaScript?',
      thumbnail: 'https://i3.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg',
    },
    {
      id: 4,
      title: 'Node.js en la práctica',
      thumbnail: 'https://i3.ytimg.com/vi/TlB_eWDSMt4/maxresdefault.jpg',
    },
    {
      id: 5,
      title: 'TypeScript en 20 minutos',
      thumbnail: 'https://i3.ytimg.com/vi/BwuLxPH8IDs/maxresdefault.jpg',
    },
  ];
  
  return (
    <div className="home">
      <h1 className="title">🎬 Plataforma de Videos</h1>
      <div className="video-grid">
        {videos.map((video) => (
          <div className="video-card" key={video?.id}>
            <img src={video?.thumbnail} alt={video.title} />
            <h2>{video?.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );

}