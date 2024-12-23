import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Create = () => {
  const [name, setName] = useState('');
  const [rounds, setRounds] = useState([{ question: '', answers: [] }]);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate()

  const addRound = () => {
    setRounds([...rounds, { question: '', answers: [] }]);
    setCurrentPage(rounds.length); // Переключаемся на новый раунд
  };

  const removeRound = () => {
    if (rounds.length > 1) {
      const updatedRounds = [...rounds];
      updatedRounds.splice(currentPage, 1);
      setRounds(updatedRounds);
      setCurrentPage((prev) => Math.max(prev - 1, 0)); // Переключаемся на предыдущий раунд
    }
  };

  const saveGame = () => {
    if (!name) return alert('Please enter a game name');
    const savedGames = JSON.parse(localStorage.getItem('games') || '[]');
    const newGame = { id: Date.now().toString(), name, rounds };
    localStorage.setItem('games', JSON.stringify([...savedGames, newGame]));
    alert('Game saved!');
    setName('');
    setRounds([{ question: '', answers: [] }]);
    setCurrentPage(0);
    navigate('/')
  };

  const addAnswer = () => {
    const updatedRounds = [...rounds];
    // @ts-ignore
    updatedRounds[currentPage].answers.push({ text: '', revealed: false });
    setRounds(updatedRounds);
  };

  const removeAnswer = (answerIndex: number) => {
    const updatedRounds = [...rounds];
    updatedRounds[currentPage].answers.splice(answerIndex, 1);
    setRounds(updatedRounds);
  };

  return (
    <div className="container">
      <h1>Create Game</h1>
      <input
        placeholder="Game Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="round-container">
        <h2>Round {currentPage + 1}</h2>
        <input
          placeholder="Question"
          value={rounds[currentPage].question}
          onChange={(e) => {
            const updatedRounds = [...rounds];
            updatedRounds[currentPage].question = e.target.value;
            setRounds(updatedRounds);
          }}
        />
        <div>
          {rounds[currentPage].answers.map((answer, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <input
                placeholder={`Answer ${index + 1}`}
                    // @ts-ignore
                value={answer.text}
                onChange={(e) => {
                  const updatedRounds = [...rounds];
                      // @ts-ignore
                  updatedRounds[currentPage].answers[index].text = e.target.value;
                  setRounds(updatedRounds);
                }}
                style={{ flex: 1, marginRight: '10px' }}
              />
              <button onClick={() => removeAnswer(index)}>Remove Answer</button>
            </div>
          ))}
          <button onClick={addAnswer}>+ Add Answer</button>
        </div>
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 0}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
        >
          Previous
        </button>
        {rounds.map((_, index) => (
          <button
            key={index}
            className={currentPage === index ? 'active' : ''}
            onClick={() => setCurrentPage(index)}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={addRound} style={{ marginLeft: '10px' }}>
          + Add Round
        </button>
      </div>

      {rounds.length > 1 && (
        <button
          onClick={removeRound}
          style={{
            marginTop: '20px',
            backgroundColor: 'red',
            color: 'white',
          }}
        >
          Remove Current Round
        </button>
      )}

      <button onClick={saveGame} style={{ marginTop: '20px' }}>
        Save Game
      </button>
    </div>
  );
};
