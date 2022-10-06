// this component displays the food data and asks the counterfactual question
// for a given animal

import { useState } from 'react';
import { lists, actuals, listLength, condition } from "./randomizedParameters";

import Transition from './Transition';
import TestDisplay from './TestDisplay';
import Question from './Question';



const TestAnimal = (props) => {

  //keep track of the current trial
  const [testNumber, setTestNumber] = useState(0);
  //increment the trial number
  const incrementTest = (integer) => setTestNumber(integer + 1);

  // the animal name and the test ids
  const animalName = props.animalName;
  const test_ids = Array.from(Array(listLength).keys());

  // select the relevant distribution
  const list = condition === "cause" ? lists.cause :
    condition === "effect" ? lists.effect :
      condition === "noCor" ? lists.noCor : null;

  // [the below lines of code is if we need to adjust the distribution
  // within-subject]
  // const list = listorder[props.animalNumber] === "cor" ? lists.cor :
  //   listorder[props.animalNumber] === "noCor" ? lists.noCor : NaN;

  // create the test trials 
  var tests = test_ids.map((i) => {
    return (
      <TestDisplay
        list={list}
        animalName={animalName} incrementTest={incrementTest}
        animalNumber={props.animalNumber} testNumber={testNumber} />
    )
  })

  // add a transition screen
  tests.unshift(<Transition animalName={animalName} testNumber={testNumber}
    incrementTest={incrementTest} />);

  const counterfactualQuestions = [...Array(actuals.length).keys()].map((i) => {
    return (<Question list={list} setAnimalNumber={props.setAnimalNumber}
      animalNumber={props.animalNumber} animalName={props.animalName}
      setTestNumber={setTestNumber} mode={"counterfactual"} actualNumber={actuals[i]}
      testNumber={testNumber} tests={tests}
      nextActual={i < actuals.length - 1 ? actuals[i + 1] : null} />)
  })
  counterfactualQuestions.map((i) => {
    tests.push(i)
  });
  //tests.push(counterfactualQuestions);
  // tests.push(<Question list={list} setAnimalNumber={props.setAnimalNumber}
  //   animalNumber={props.animalNumber} animalName={props.animalName}
  //   setTestNumber={setTestNumber} mode={"counterfactual"} />);

  tests.push(<Question list={list} setAnimalNumber={props.setAnimalNumber}
    animalNumber={props.animalNumber} animalName={props.animalName}
    setTestNumber={setTestNumber} mode={"conditionalDistribution"}
    testNumber={testNumber} tests={tests} />)

  tests.push(<Question list={list} setAnimalNumber={props.setAnimalNumber}
    animalNumber={props.animalNumber} animalName={props.animalName}
    setTestNumber={setTestNumber} mode={"conditionalDistributionOff"}
    testNumber={testNumber} tests={tests} />)

  // cycle through trials
  return (tests[testNumber])

};

export default TestAnimal;