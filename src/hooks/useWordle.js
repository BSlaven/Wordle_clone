import { useState } from 'react';

const useWordle = (solution) => {
  const [ turn, setTurn ] = useState(0);
  const [ currentGuess, setCurrentGuess ] = useState('');
  const [ guesses, setGuesses ] = useState([]);
  const [ history, setHistory ] = useState([]);
  const [ isCorrect, setIsCorrect ] = useState(false);

  // format a guess into an array of letter objects
  // each object will have a key and color properties
  const formatGuess = () => {}

  // add new guess to state
  const addNewGuess = () => {}

  // handle keyup event
  const handleKeyup = () => {}
}

export default useWordle;