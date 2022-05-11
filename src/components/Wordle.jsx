import { useEffect } from "react";
import useWordle from "../hooks/useWordle";
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

const Wordle = ({ solution }) => {

  const { 
    currentGuess,
    handleKeyup,
    guesses,
    isCorrect,
    turn,
    usedKeys
  } = useWordle(solution);

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup);

    if(isCorrect) {
      window.removeEventListener('keyup', handleKeyup);
      console.log('You win!!!');      
    }

    if(turn > 5) {
      console.log('No more guesses');
      window.removeEventListener('keyup', handleKeyup);
    }

    return () => window.removeEventListener('keyup', handleKeyup);
  }, [handleKeyup, isCorrect]);

  // useEffect(() => {
  //   console.log(guesses, turn, isCorrect);
  // }, [guesses, turn, isCorrect])
  
  return (
    <div>
      <div>solution - {solution}</div>
      <div>current guess - {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys} />
      <Modal />
    </div>  
  )
}

export default Wordle;