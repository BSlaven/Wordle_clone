import { useInsertionEffect, useState } from 'react';

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
  const handleKeyup = ({ key }) => {

    if(key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }
    
    if(/^[a-zA-Z]$/.test(key)) {
      if(currentGuess.length <5) {
        setCurrentGuess((prev) => {
          return prev + key
        });
      }
    }
    console.log(key);
    
  }

  return {
    turn,
    currentGuess,
    guesses,
    isCorrect,
    handleKeyup
  }
}

export default useWordle;