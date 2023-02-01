import React from "react";
import { GAME_STATUS } from "../Game";

function RestartButton(props) {
  return (
    <button
      type="button"
      className="restart-button"
      {...props}
    >
      Restart
    </button>
  )
}

function GuessBanner({ gameStatus, tries, answer, restart }) {
  if (gameStatus === GAME_STATUS.playing)
    return null;

  if (gameStatus === GAME_STATUS.win) {
    return (
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in
          <strong> {tries} guess(es)</strong>.
        </p>
        <RestartButton onClick={restart} />
      </div>
    );
  }

  return (
    <div className="sad banner">
      <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
      <RestartButton onClick={restart} />
    </div>
  );
}

export default GuessBanner;
