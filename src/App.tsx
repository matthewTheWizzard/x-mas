import { useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Create } from './pages/create/create';
import { Games } from './pages/games/games';
import { Game } from './pages/game/game';
import './App.css'
import { Edit } from './pages/edit/edit';

export const Navigation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [volume, setVolume] = useState(0.1); // Initial volume
  const audioRef = useRef(new Audio('/xmas.mp3'));

  // Set initial volume
  audioRef.current.volume = volume;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => console.error('Audio play error:', error));
    }

    setIsPlaying(!isPlaying);
  };

  // Handle audio end
  audioRef.current.onended = () => {
    setIsPlaying(false);
  };

  const handleVolumeChange = (event: any) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <nav className="navigation">
      <a href="/create">Create</a>
      <a href="/">Games</a>
      <div
        className="play-button-container"
        onMouseEnter={() => setShowVolumeControl(true)}
        onMouseLeave={() => setShowVolumeControl(false)}
      >
        <button onClick={togglePlay} className="play-button">
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        {showVolumeControl && (
          <input
            type="range"
            className="volume-slider"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
        <Navigation />
      <Routes>
        <Route path="/" element={<Games />} />
        <Route path="/create" element={<Create />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
