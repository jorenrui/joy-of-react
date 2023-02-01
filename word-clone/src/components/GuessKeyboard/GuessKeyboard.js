import React from "react";

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

function GuessKeyboard({ enteredKeys = {} }) {
  return (
    <div className="guess-keyboard">
      {KEYS.map((rowKeys, index) => (
        <div key={index} className="row">
          {rowKeys.map((key) => {
            const status = enteredKeys[key] ?? '';

            return (
              <div key={key} className={`cell ${status}`}>
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default GuessKeyboard;
