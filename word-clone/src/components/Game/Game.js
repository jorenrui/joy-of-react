import React from 'react';

import { sample } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { WORDS } from '../../data';
import { checkGuess } from '../../game-helpers';
import GuessInput from '../GuessInput/GuessInput';
import GuessResult from '../GuessResult/GuessResult';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

const GAME_STATUS = {
  playing: "playing",
  win: "win",
  lose: "lose",
};

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [tries, setTries] = React.useState(0);
  const [gameStatus, setGameStatus] = React.useState(GAME_STATUS.playing);

  const addGuess = (guess) => {
    if (gameStatus !== GAME_STATUS.playing) {
      alert("The game is already done. Refresh the tab to play again.");
      return;
    }

    if (tries >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus(GAME_STATUS.lose);
      return;
    }

    const updatedGuesses = [...guesses];
    const result = checkGuess(guess, answer);
    updatedGuesses[tries] = result;
    setGuesses(updatedGuesses);
    setTries(tries + 1);

    const isCorrect = result.every((letter) => letter.status === "correct");
    if (isCorrect)
      setGameStatus(GAME_STATUS.win);
  };

  return (
    <>
      <GuessResult guesses={guesses} />
      <GuessInput onSubmit={addGuess} disabled={gameStatus !== GAME_STATUS.playing} />
    </>
  );
}

export default Game;
