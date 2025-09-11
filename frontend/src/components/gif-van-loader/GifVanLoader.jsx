import './GifVanLoader.css';

const GIFVanLoader = () => {
  return (
    <div className="gif-loader-container">
      <img
        src="/loader.gif"
        alt="Moving Van"
        className="gif-loader-image"
      />
      <p className="gif-loader-text">
        Loading your adventure...
      </p>
    </div>
  );
};

export default GIFVanLoader;