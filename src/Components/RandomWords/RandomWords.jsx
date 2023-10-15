import {useState, useEffect} from 'react'

const RandomWords = () => {

  var count = 0
  useEffect(() => {
    setInterval(() => {
      setRandomWord(words[count % words.length])
      count = count + 1
    }, 2000)
  }, [count])

  const words = [
    'Game night?',
    'Late night at office?',
    'Hungry?',
    'Unexpected guests?',
    'Movie marathon?',
    'Cooking gone wrong?'
  ]

  const [randomWord, setRandomWord] = useState(null)

  return (
    <div>{randomWord && randomWord}</div>
  )
}

export default RandomWords