import React, { useEffect } from 'react';

import { sample } from '../../utils';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { WORDS } from '../../data';
import { checkGuess } from '../../game-helpers';
import GuessInput from '../GuessInput/GuessInput';
import GuessResult from '../GuessResult/GuessResult';
import GuessKeyboard from '../GuessKeyboard/GuessKeyboard';
import GuessBanner from '../GuessBanner/GuessBanner';

// Pick a random word on every pageload.
const generateAnswer = () => sample(WORDS);

export const GAME_STATUS = {
  playing: "playing",
  win: "win",
  lose: "lose",
};

function Game() {
  const [answer, setAnswer] = React.useState(generateAnswer);
  const [guesses, setGuesses] = React.useState([]);
  const [enteredKeys, setEnteredKeys] = React.useState({});
  const [tries, setTries] = React.useState(0);
  const [gameStatus, setGameStatus] = React.useState(GAME_STATUS.playing);

  const addGuess = (guess) => {
    if (gameStatus !== GAME_STATUS.playing) {
      alert("The game is already done. Refresh the tab to play again.");
      return;
    }

    const result = checkGuess(guess, answer);
    
    const updatedGuesses = [...guesses];
    updatedGuesses[tries] = result;
    setGuesses(updatedGuesses);

    const updatedEnteredKeys = { ...enteredKeys };
    for (const key of result)
      updatedEnteredKeys[key.letter] = key.status;
    setEnteredKeys(updatedEnteredKeys);

    const totalTries = tries + 1;
    setTries(totalTries);

    const isCorrect = result.every((letter) => letter.status === "correct");
    if (isCorrect)
      setGameStatus(GAME_STATUS.win);
    else if (totalTries >= NUM_OF_GUESSES_ALLOWED)
      setGameStatus(GAME_STATUS.lose);
  };

  const restart = () => {
    setAnswer(generateAnswer());
    setEnteredKeys({});
    setGuesses([]);
    setTries(0);
    setGameStatus(GAME_STATUS.playing);
  };

  useEffect(() => {
    // To make debugging easier, we'll log the solution in the console.
    console.info({ answer });
  }, [answer]);

  return (
    <>
      <GuessResult guesses={guesses} />
      <GuessInput onSubmit={addGuess} disabled={gameStatus !== GAME_STATUS.playing} />
      <GuessKeyboard enteredKeys={enteredKeys} />
      <GuessBanner gameStatus={gameStatus} tries={tries} answer={answer} restart={restart} />
    </>
  );
}

export default Game;
