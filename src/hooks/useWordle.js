import { useState } from 'react';

const useWordle = (solution) => {
  const [ turn, setTurn ] = useState(0);
  const [ currentGuess, setCurrentGuess ] = useState('');
  const [ guesses, setGuesses ] = useState([...Array(6)]);
  const [ history, setHistory ] = useState([]);
  const [ isCorrect, setIsCorrect ] = useState(false);
  const [ usedKeys, setUsedKeys ] = useState({});

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
  const addNewGuess = (formattedGuess) => {
    if(currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses(prevGuesses => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory(prevHistory => {
      return [...prevHistory, currentGuess];
    });

    setTurn(prevTurn => prevTurn + 1);

    setUsedKeys(prev => {
      let newKeys = { ...prev };
      formattedGuess.forEach((letter) => {
        const currentColor = newKeys[letter.key];
        if(letter.color === 'green') {
          newKeys[letter.key] = 'green';
          return;
        }
        if(letter.color === 'yellow' && currentColor !== 'green') {
          newKeys[letter.key] = 'yellow';
          return;
        }
        if(letter.color === 'grey' && currentColor !== 'green' && currentColor !== 'yellow') {
          newKeys[letter.key] = 'grey';
          return;
        }
      })
      return newKeys;
    });

    setCurrentGuess('');
  }

  // handle keyup event
  const handleKeyup = ({ key }) => {

    if(key === 'Enter') {
      // add guess if turn is less than 5
      if(turn > 5) {
        return;
      }
      // no duplicate words
      if(history.includes(currentGuess)) {
        return;
      }

      // make sure the word is five characters long
      if(currentGuess.length !== 5) {
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
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
    handleKeyup,
    usedKeys
  }
}

export default useWordle;