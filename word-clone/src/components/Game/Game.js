import React from 'react';

import { range, sample } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { WORDS } from '../../data';
import GuessInput from '../GuessInput/GuessInput';
import { checkGuess } from '../../game-helpers';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guesses, setGuesses] = React.useState(range(0, 6).map(_ => []));
  const [tries, setTries] = React.useState(0);

  const addGuess = (guess) => {
    if (tries >= NUM_OF_GUESSES_ALLOWED) {
      alert("Sorry, you run out of tries. You lose.");
      return;
    }

    const updatedGuesses = [...guesses];
    updatedGuesses[tries] = checkGuess(guess, answer);
    setGuesses(updatedGuesses);
    setTries(tries + 1);
  };

  return (
    <>
      <div className="guess-results">
        {range(0, 6).map((row) => {
          const guess = guesses[row] ?? [];

          return (
            <p key={row} className="guess">
              {range(0, 5).map((col) => {
                if (!guess[col])
                  return <span key={col} className="cell" />;
                
                return (
                  <span key={col} className={`cell ${guess[col].status}`}>
                    {guess[col].letter}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>
      <GuessInput onSubmit={addGuess} />
    </>
  );
}

export default Game;
