import React from 'react';

const Video = () => {
  return (
    <div className="video">
      {/* Les images importées depuis la balise IMG sont accessibles dans "public" */}
      <video
        className="card-video videoObject-video"
        poster="https://woody.cloudly.space/app/uploads/saintnazaire/2021/05/thumbs/saint-nazaire-vues-aeriennes-port-pontarnaud-drean-1920x1080.jpg"
        style={{
          height: '100%',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'auto',
          minHeight: '100%',
          minWidth: '100%',
          maxWidth: 'none',
        }}
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="https://woody.cloudly.space/app/uploads/saintnazaire/2020/06/clip-vido-destination-saint-nazaire-renversante-30-secondes--sans-gnrique-ni-son.mp4" type="video/mp4" />
        {/* Ajoutez des sources supplémentaires pour les différents formats de vidéos si nécessaire */}
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Video;