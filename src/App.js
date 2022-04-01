import React from 'react';
import './App.css';
import Dice from './Dice';
import {nanoid} from 'nanoid';

const lowestFromStorage = localStorage.getItem("score") || "0";

function App() {
  const [dice, setDice] = React.useState(getDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [numRolls, setNumRolls] = React.useState(0);
  const [lowestRolls, setLowestRolls] = React.useState(parseInt(lowestFromStorage));

  function generateNewDice() {
    return {
      value: Math.floor(Math.random() * 6) +1,
      isHeld: false,
      id: nanoid()
    }
  }

  function getDice() {
    const numArray = [];
    for (let i = 0; i < 10; i++) {
      numArray.push(generateNewDice())
    }
    return numArray;
  };

  function rollDice() {
    if(tenzies){
      setTenzies(false);
      setDice(getDice());
      setNumRolls(0);
    } else {
        setNumRolls(prevRolls => prevRolls + 1);
        setDice(prevDice => prevDice.map(dice => {
        return dice.isHeld ? dice : generateNewDice()
      }));
    }
  };

  function holdDice(id) {
    setDice(prevDice => prevDice.map(dice => {
      return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
    }));
  };

  React.useEffect(function(){
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allMatch = dice.every(die => die.value === firstValue);
    if(allHeld && allMatch) {
      setTenzies(true)
    }
  }, [dice])

  React.useEffect(function() {
    if(tenzies){
      const currentLowest = lowestRolls;
      numRolls < currentLowest || currentLowest === 0 ? localStorage.setItem("score", numRolls) : localStorage.setItem("score", currentLowest)
      setLowestRolls(parseInt(localStorage.getItem("score")))
      }
  }, [tenzies])

  const diceElements = dice.map(
    (die, index) => <
      Dice key={index} 
            value={die.value} 
            isHeld={die.isHeld} 
            id={die.id} 
            holdDice={() => holdDice(die.id)}/>
  )

  return (
    <main>
      <div class="container">
        <h1>Terry's Tenzies</h1>
        {tenzies ? <h2 className="tenzies-message">YOU HAVE TENZIES</h2> : <p className="instruction">Keep rolling until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>}
        <div className="game-container">
          <div class="scores-container">
            <div className="number-rolls">
              <p className='rolls-title'>Number of Rolls</p>
              <p className='rolls-score'>{numRolls}</p>
            </div>
            <div className="best-rolls">
              <p className='rolls-title'>Least Rolls</p>
              <p className='rolls-score'>{lowestRolls}</p>
            </div>
          </div>
          <div className="dice-container">
            {diceElements}
          </div>
        </div>
        <button className="roll-dice-btn" onClick={rollDice}>{tenzies ? "RESTART" : "ROLL DICE"}</button>
      </div>
    </main>
  );
}

export default App;
