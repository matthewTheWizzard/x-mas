import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './games.css'

export const Games = () => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedGames = JSON.parse(localStorage.getItem('games') || '[]');
    setGames(savedGames);
  }, []);

  return (
    <div className="container">
      <h1>Games</h1>
      <ul className="games-list">
        {games.map((game) => (
          <li key={game.id} className="game-item">
            <Link to={`/game/${game.id}`} className="game-link">
              {game.name}
            </Link>
            <button onClick={() => navigate(`/edit/${game.id}`)} className="edit-button">
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};