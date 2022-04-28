import { useState } from 'react';

const useWordle = (solution) => {
  const [ turn, setTurn ] = useState(0);
  const [ currentGuess, setCurrentGuess ] = useState('');
  const [ guesses, setGuesses ] = useState([]);
  const [ history, setHistory ] = useState(['hello', 'ninja']);
  const [ isCorrect, setIsCorrect ] = useState(false);

  // format a guess into an array of letter objects
  // each object will have a key and color properties
  const formatGuess = () => {
    console.log('formatting the guess - ', currentGuess);
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map(l => {
      return { key: l, color: 'grey' }
    });

    // find any green letters
    formattedGuess.forEach((l, i) => {
      if(solutionArray[i] === l.key) {
        formattedGuess[i].color = 'green';
        solutionArray[i] = null;
      }
    });

    // find any yellow letters
    formattedGuess.forEach((l, i) => {
      if(solutionArray.includes(l.key) && l.color !== 'green') {
        formattedGuess[i].color = 'yellow';
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  }

  // add new guess to state
  const addNewGuess = () => {}

  // handle keyup event
  const handleKeyup = ({ key }) => {

    if(key === 'Enter') {
      // add guess if turn is less than 5
      if(turn > 5) {
        console.log('you used all your guesses')
        return;
      }
      // no duplicate words
      if(history.includes(currentGuess)) {
        console.log('you already tried that word');
        return;
      }

      // make sure the word is five characters long
      if(currentGuess.length !== 5) {
        console.log('word must be 5 characters long');
        return;
      }
      formatGuess();
    }

    if(key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
      return;
    }
    
    if(/^[a-zA-Z]$/.test(key)) {
      if(currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key
        });
      }
    }
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