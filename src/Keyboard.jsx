import { useEffect } from "react"
import { useState } from "react"

export default function Keyboard () {
const [letters, setLetters] = useState(null)

useEffect(() => {
  const getLetters = async () => {
    const chosenLetter = await wordleWords[
      Math.floor(Math.random() * wordleWords.length)
    ];
    setSolution(randomWord.toLowerCase())
    }
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