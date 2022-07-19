import { useEffect, useState } from "react";

export default function Keyboard () {
const [letters, setLetters] = useState(null)

useEffect(() => {
  const getLetters = async () => {
    const chosenLetter = await letters[
      letters[i]
    ];
    setLetters(letters[i].toLowerCase())
    };
  getLetters();
}, [])

  return (
    <div className="keyboard">
      {letters && letters.map((l) => {
        return (
          <div key={l.key}>{l.key}</div>
        )
      })}
    </div>
  )
}