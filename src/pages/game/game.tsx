import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Game = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [currentRound, setCurrentRound] = useState(0);

  useEffect(() => {
    const savedGames = JSON.parse(localStorage.getItem('games') || '[]');
    const foundGame = savedGames.find((g) => g.id === id);
    setGame(foundGame || null);
  }, [id]);

  if (!game) return <div className="container">Game not found!</div>;

  const round = game.rounds[currentRound];

  return (
    <div className="container">
      <h1>{game.name}</h1>
      <h2>Round {currentRound + 1}</h2>
      <p>{round.question}</p>
      <div className="answers">
        {round.answers.map((answer, index) => (
          <div
            key={index}
            className={`answer ${answer.revealed ? 'revealed' : ''}`}
            onClick={() => {
              const updatedGame = { ...game };
              updatedGame.rounds[currentRound].answers[index].revealed =
                !answer.revealed;
              setGame(updatedGame);
            }}
          >
            <div className="answer-inner">
              <div className="front">{index + 1}</div>
              <div className="back">{answer.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="controls">
        <button
          onClick={() => setCurrentRound((prev) => Math.max(prev - 1, 0))}
          disabled={currentRound === 0}
        >
          Previous Round
        </button>
        <button
          onClick={() => setCurrentRound((prev) => Math.min(prev + 1, game.rounds.length - 1))}
          disabled={currentRound === game.rounds.length - 1}
        >
          Next Round
        </button>
      </div>
    </div>
  );
};
