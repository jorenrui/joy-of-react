import React from 'react';

import { sample } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { WORDS } from '../../data';
import { checkGuess } from '../../game-helpers';
import GuessInput from '../GuessInput/GuessInput';
import GuessResult from '../GuessResult/GuessResult';
import GuessBanner from '../GuessBanner/GuessBanner';

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

export const GAME_STATUS = {
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

    const updatedGuesses = [...guesses];
    const result = checkGuess(guess, answer);
    updatedGuesses[tries] = result;
    setGuesses(updatedGuesses);

    const totalTries = tries + 1;
    setTries(totalTries);

    const isCorrect = result.every((letter) => letter.status === "correct");
    if (isCorrect)
      setGameStatus(GAME_STATUS.win);
    else if (totalTries >= NUM_OF_GUESSES_ALLOWED)
      setGameStatus(GAME_STATUS.lose);
  };

  return (
    <>
      <GuessBanner gameStatus={gameStatus} tries={tries} answer={answer} />
      <GuessResult guesses={guesses} />
      <GuessInput onSubmit={addGuess} disabled={gameStatus !== GAME_STATUS.playing} />
    </>
  );
}

export default Game;
