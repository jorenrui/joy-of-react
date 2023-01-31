import React from "react";
import { range } from "../../utils";

function GuessResult({ guesses }) {
  return (
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
  );
}

export default GuessResult;
