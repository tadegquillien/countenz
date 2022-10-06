//the main page

//the experiment has the following structure:

//-consent form
//-instructions
//-training phase: the participant plays ten rounds of the game, in order
//  to get familiar with the game
//-transition
//-test phase: the participant observes the outcome of a round of the game
//  played by a fictitious player, and answers questions about the causal strength
//  of the colored balls drawn by that player
//-demographics
//-end

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ConsentForm from './ConsentForm';
import TestPhase from './TestPhase';
import Instructions from './Instructions';
import Demographics from './Demographics';
import Ending from './Ending';
import ProlificId from './ProlificId';


import reportWebVitals from './reportWebVitals';



const Root = () => {
  //keeps track of the current phase
  const [currentPhase, setCurrentPhase] = useState("prolificId");


  //the structure of the study:
  //this code displays a page, in function of the current phase,
  //and of the trial number within that phase
  return (
    currentPhase === "prolificId" ? <ProlificId setCurrentPhase={setCurrentPhase} /> :
      currentPhase === "consentForm" ? <ConsentForm setCurrentPhase={setCurrentPhase} /> :
        currentPhase === "instructions" ? <Instructions
          setCurrentPhase={setCurrentPhase} /> :
          currentPhase === "test" ? <TestPhase setCurrentPhase={setCurrentPhase} /> :
            currentPhase === "demographics" ? <Demographics setCurrentPhase={setCurrentPhase} /> :
              currentPhase === "ending" ? <Ending /> :
                <p>{currentPhase}</p>
  )
}

//display the experiment
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



// }