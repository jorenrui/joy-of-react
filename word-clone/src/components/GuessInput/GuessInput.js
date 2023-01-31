import React from "react";

function GuessInput({ onSubmit, disabled }) {
  const [guess, setGuess] = React.useState("");
  
  const handleChange = (evt) => {
    setGuess(evt.target.value.toUpperCase());
  };

  const submit = (evt) => {
    evt.preventDefault();

    if (guess.length < 2) {
      alert("Guess must be at least 2 characters long");
      return;
    }

    if (guess.length > 5) {
      alert("Guess must be at most 5 characters long");
      return;
    }

    onSubmit(guess);
    setGuess("");
  };

  return (
    <form className="guess-input-wrapper" onSubmit={submit}>
      <label htmlFor="guess-input">
        Enter guess:
      </label>
      <input
        id="guess-input"
        type="text"
        value={guess}
        onChange={handleChange}
        minLength={2}
        maxLength={5}
        required
        disabled={disabled}
      />
    </form>
  );
}

export default GuessInput;
