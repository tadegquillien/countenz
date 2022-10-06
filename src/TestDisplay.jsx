// this component controls the display of the food data on a given day.

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { textStyle, buttonStyle } from './dimensions';
import { colors, zorbaIsMonsterOne, condition } from './randomizedParameters';
import { shuffle } from './convenienceFunctions';
import monster_one_enzyme from './monster_one_with_enzyme.png';
import monster_one_noEnzyme from './monster_one_without_enzyme.png';
import monster_two_enzyme from './monster_two_with_enzyme.png';
import monster_two_noEnzyme from './monster_two_without_enzyme.png';



// generate the berries to be displayed onscreen
const Circles = (props) => {
  // dimensions of the box containing berries
  const svgWidth = 300;
  const svgHeight = 300;
  // diameter of a berry
  const r = 20;
  // number of berries and presence of the enzyme
  const number = props.list[props.testNumber - 1][1];
  //const circleOrder = useRef(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
  // const noiseVector = useRef([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
  //   return (Math.random())
  // }));

  var circleBoolean = props.circleOrder.map((i) => {
    return (i < number ? 1 : 0);
  });
  let circles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
    let color = circleBoolean[i] ? colors[props.animalNumber] : "white";
    return (
      <circle
        cx={(120 * i + (r + 10) + (.5 - props.noise[i]) * 20) % svgWidth}
        cy={20 * i + (r + 10) + (.5 - props.noise[i]) * 20} r={r} fill={color}
      />
    )
  });
  return (circles)
}
// we want to make it such that in the 'effect' condition the berries appear before the enzyme

const TestDisplay = (props) => {

  // the noise we add to the berries' position
  const [noise, setNoise] = useState([Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
  Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
  // randomize the order of berries on screen
  const [circleOrder, setCircleOrder] = useState(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));

  // the next page button. 
  const Button = (props) => {
    const [isShown, setIsShown] = useState(false);
    const handleClick = () => {
      setIsShown(false);
      setNoise([Math.random(), Math.random(), Math.random(), Math.random(), Math.random(),
      Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
      setCircleOrder(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
      if (condition !== "effect") { setBerriesShown(false) }
      if (condition === "effect") { setEnzymeShown(false) }
      props.incrementTest(props.testNumber);
    };
    useEffect(() => {
      const timer = setTimeout(() => {
        if (condition !== "effect") {
          setBerriesShown(true);
        }
        if (condition === "effect") {
          setEnzymeShown(true);
        }
      }, 500);
      return () => clearTimeout(timer);
    }, [handleClick]);
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsShown(true);
      }, 500);
      return () => clearTimeout(timer);
    }, [handleClick]);



    return (isShown ? <button style={buttonStyle}
      onClick={() => handleClick()}>Next</button> : "")
  };

  // control when elements are displayed
  const [berriesShown, setBerriesShown] = useState(condition != "effect" ? false : true);
  const [enzymeShown, setEnzymeShown] = useState(condition === "effect" ? false : true);

  // dimensions of the box containing berries
  const svgWidth = 300;
  const svgHeight = 300;
  // diameter of a berry
  const r = 20;
  // number of berries and presence of the enzyme
  const number = props.list[props.testNumber - 1][1];
  const enzyme = props.list[props.testNumber - 1][0];

  // decide which monster picture to display
  const picMonsterEnzyme = zorbaIsMonsterOne ? (
    props.animalName === "zorba" ? monster_one_enzyme : monster_two_enzyme) :
    (props.animalName === "zorba" ? monster_two_enzyme : monster_one_enzyme);

  const picMonsterNoEnzyme = zorbaIsMonsterOne ? (
    props.animalName === "zorba" ? monster_one_noEnzyme : monster_two_noEnzyme) :
    (props.animalName === "zorba" ? monster_two_noEnzyme : monster_one_noEnzyme);


  const picEnzyme = enzymeShown ?
    (enzyme ? <img style={{ float: 'left', width: "10vw" }}
      src={picMonsterEnzyme} /> :
      <img style={{ float: 'left', width: "10vw" }} src={picMonsterNoEnzyme} />) :
    <img style={{ float: 'left', width: "10vw" }} src={picMonsterNoEnzyme} />;



  const berriesPicture = berriesShown ?
    <Circles animalNumber={props.animalNumber}
      list={props.list} testNumber={props.testNumber} noise={noise}
      circleOrder={circleOrder} /> : "";
  const berriesText = berriesShown ? <span style={{ color: "black" }}>ate <b>{number} </b>berries</span> :
    <span style={{ color: "white" }}>ate <b>{number} </b>berries</span>

  const enzymeText = enzymeShown ? <span>had <b>{enzyme ? "" : " no trace of"} XRD enzyme</b> in its blood</span> :
    <span style={{ color: "white" }}>had <b>{enzyme ? "" : " no trace of"} XRD enzyme</b> in its blood</span>;

  // decide which text to display on top and which to display in the middle
  const topText = condition !== "effect" ?
    enzymeText :
    condition === "effect" ? <span>{berriesText}</span> : null;

  const middleText = condition === "effect" ?
    enzymeText :
    condition !== "effect" ? <span>{berriesText}</span> : null;


  return (<div style={textStyle}>
    <p>On day number {props.testNumber}, the {props.animalName} {topText}, and</p>
    <p>{middleText}</p>
    <span>
      {picEnzyme}
      <svg style={{ float: 'left', marginLeft: '5vw' }} width={svgWidth} height={svgHeight} id={"id"} >
        {berriesPicture}

      </svg>
    </span>
    <Button incrementTest={props.incrementTest}
      testNumber={props.testNumber} />
  </div>)
};

export default TestDisplay;



