import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { src: '/img/helmet.png', matched: false },
  { src: '/img/potion.png', matched: false },
  { src: '/img/ring.png', matched: false },
  { src: '/img/scroll.png', matched: false },
  { src: '/img/shield.png', matched: false },
  { src: '/img/sword.png', matched: false },
];

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, SetChoiceOne] = useState(null);
  const [choiceTwo, SetChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);

    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? SetChoiceTwo(card) : SetChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((cards) => {
          return cards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    SetChoiceOne(null);
    SetChoiceTwo(null);
    setTurns(turns + 1);
    setDisabled(false);
  };

  return (
    <div className='App'>
      <h1>Memory game</h1>

      <button onClick={shuffleCards}>New game</button>

      <div className='card-grid'>
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
