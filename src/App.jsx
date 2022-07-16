import "./styles.css";
import { useEffect, useState } from "react";
import wordleWords from "./wordleWords.js";

const WORD_LENGTH = 5;

export default function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  // adding a score state
  const [score, setScore] = useState(0);

  useEffect(() => {
    const handleType = (event) => {
      if (isGameOver) {
        setGuesses(Array(6).fill(null));
        setSolution("");
        const getWord = async () => {
          const randomWord = await wordleWords[
            Math.floor(Math.random() * wordleWords.length)
          ];
          setSolution(randomWord.toLowerCase())
          }
        getWord();
        // needed code which is now on line 28
        setIsGameOver(false);
      }

      if (event.key === "Enter") {
        if (currentGuess.length !== 5) {
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val == null)] = currentGuess;
        setGuesses(newGuesses);
        setCurrentGuess("");

        const isCorrect = solution === currentGuess;
        if (isCorrect) {
          setScore(score + 1);
            if (window.confirm(`The word was '${solution.toUpperCase()}.'  Click 'OK' and then press enter to play again.`)) {
            // window.location.reload();
            // setGuesses(Array(6).fill(null));
            setIsGameOver(true);
          }
          
        }
        // begun working on functionality to support user not getting word correctly
        // const isWrong = (!solution) === currentGuess;
        console.log(guesses.length)
        console.log(guesses)
        console.log(guesses[guesses.length - 2])
        if (guesses[guesses.length - 2] !== null) {
          if (window.confirm(`Sorry!  The word was '${solution.toUpperCase()}.'  Click 'OK' and then press enter to start over.`)) {
            setIsGameOver(true);
        }
      }
    }

      if (event.key === "Backspace") {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (currentGuess.length >= 5) {
        return;
      }

      const isLetter = event.key.match(/^[a-z]{1}$/) != null;
      if (isLetter) {
        setCurrentGuess((oldGuess) => oldGuess + event.key);
      }
    };

    window.addEventListener("keydown", handleType);
    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, isGameOver, solution, guesses, score]);

  useEffect(() => {
    const getWord = async () => {
      const randomWord = await wordleWords[
        Math.floor(Math.random() * wordleWords.length)
      ];
      setSolution(randomWord.toLowerCase());
      // console.log(solution);
    };
    getWord();
  }, []);
  return (
      <div className="board">
        <div className="scoreboard">Score is: {score}</div>
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex((val) => val == null);
        return (
          <Line
            guess={isCurrentGuess ? currentGuess : guess ?? ""}
            isFinal={!isCurrentGuess && guess != null}
            solution={solution}
          />
        );
      })}
    </div>
  );
}

// line component
function Line({ guess, isFinal, solution }) {
  const tiles = [];
  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];
    let className = "tile";

    if (isFinal) {
      console.log(solution);
      if (char === solution[i]) {
        className += " correct";
      } else if (solution.includes(char)) {
        className += " close";
      } else {
        className += " incorrect";
      }
    }

    tiles.push(
      <div key={i} className={className}>
        {char}
      </div>
    );
  }
  return <div className="line">{tiles}</div>;
}

