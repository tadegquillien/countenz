// the test phase. For each animal, food data are displayed and a question is asked.

import { useState } from 'react';
import { animalNames, lists } from './randomizedParameters';
import { textStyle, buttonStyle } from './dimensions';
import TestAnimal from "./TestAnimal";

const TestPhase = (props) => {

   const [ animalNumber, setAnimalNumber ] = useState(0);
  
  //generate the trials of the Test phase
  var animals = animalNames.map((i) => {
    return (
        <TestAnimal animalName = {i} animalNumber={animalNumber}  
        setAnimalNumber = {setAnimalNumber}  />
    )
  })
  
  return(
    //cycle through all animals and then get to the demographics phase
    (animalNumber + 1) > animalNames.length ?
    props.setCurrentPhase("demographics") :
    animals[animalNumber]
  )

};

export default TestPhase;