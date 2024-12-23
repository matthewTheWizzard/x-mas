import React, { useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Create } from './pages/create/create';
import { Games } from './pages/games/games';
import { Game } from './pages/game/game';
import './App.css'
import { Edit } from './pages/edit/edit';

export const Navigation = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('/xmas.mp3')); // Создаём единственный экземпляр Audio
  audioRef.current.volume = 0.5;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((error) => console.error('Audio play error:', error));
    }

    setIsPlaying(!isPlaying);
  };

  // Обрабатываем завершение воспроизведения
  audioRef.current.onended = () => {
    setIsPlaying(false); // Сбрасываем состояние, когда музыка закончилась
  };

  // Обрабатываем загрузку аудио
  audioRef.current.oncanplay = () => {
    console.log('Audio ready to play!');
  };

  return (
    <nav className="navigation">
      <a href="/create">Create</a>
      <a href="/">Games</a>
      <button onClick={togglePlay} className="play-button">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
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
