import React from "react";
import { GAME_STATUS } from "../Game";

function GuessBanner({ gameStatus, tries, answer }) {
  if (gameStatus === GAME_STATUS.playing)
    return null;

  if (gameStatus === GAME_STATUS.win) {
    return (
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in
          <strong> {tries} guess(es)</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="sad banner">
      <p>Sorry, the correct answer is <strong>{answer}</strong>.</p>
    </div>
  );
}

export default GuessBanner;
