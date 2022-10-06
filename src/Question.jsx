
// This component displays the questions asked about each animal
// after the observation phase


import { useState, useRef } from 'react';
import { animalNames, condition } from "./randomizedParameters";
import { textStyle, buttonStyle } from './dimensions';
import { sum, shuffle } from './convenienceFunctions';
import { colors, zorbaIsMonsterOne } from './randomizedParameters';
import './Question.css';
import Data from "./Data";
import monster_one_enzyme from './monster_one_with_enzyme.png';
import monster_one_noEnzyme from './monster_one_without_enzyme.png';
import monster_two_enzyme from './monster_two_with_enzyme.png';
import monster_two_noEnzyme from './monster_two_without_enzyme.png';

// this component generates a picture of the berries
// the animal has eaten
const Circles = (props) => {
    const r = 20;
    const randomXjitter = useRef(Math.random());
    const randomYjitter = useRef(Math.random());
    const OneToTen = useRef(shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));
    var circleBoolean = OneToTen.current.map((i) => {
        return (i < props.actualNumber ? 1 : 0);
    });
    let circles = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        let color = circleBoolean[i] ? colors[props.animalNumber] : "white";
        return (
            <circle
                cx={(120 * i + (r + 10) + (.5 - randomXjitter.current) * 20) % props.svgWidth}
                cy={20 * i + (r + 10) + (.5 - randomYjitter.current) * 20} r={r} fill={color}
            />
        )
    });
    return (circles)
}

// the component that displays the question

const Question = (props) => {

    // this function controls the initial value of the sliders
    // which is a function of the counterfactual premise
    const generateInitial = (numberOfBerries) => {
        let value = numberOfBerries > 5.5 ?
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {

                return (i < numberOfBerries ? 50 : 0)

            }
            ) :
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {

                return (i > numberOfBerries ? 50 : 0)

            }
            )
        return (value);
    };

    // this function initializes which sliders we count as 
    // already having been clicked on at the start of a trial
    // (we don't want participants to click on sliders that do not 
    // conform to the counterfactual premise)
    const generateInitialClicks = (numberOfBerries) => {
        let value = numberOfBerries > 5.5 ?
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                return (i < numberOfBerries ? 0 : 1)
            }
            ) :
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                return (i > numberOfBerries ? 0 : 1)
            }
            )
        return (value);
    }

    const generateInitialVisibilities = (numberOfBerries) => {
        let value = numberOfBerries > 5.5 ?
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                return (i < numberOfBerries ? "visible" : "hidden")
            }
            ) :
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                return (i > numberOfBerries ? "visible" : "hidden")
            }
            )
        return (value);
    }

    // this array will store the slider values
    const [response, setResponse] = useState(generateInitial(props.actualNumber));
    // this array keeps track of which sliders have been clicked on
    const [clicked, setClicked] = useState(generateInitialClicks(props.actualNumber));
    // this array controls which sliders should be visible
    const [visibilities, setVisibilities] = useState(generateInitialVisibilities(props.actualNumber));
    // text for the next-page button
    const buttontext = (props.mode === "counterfactual" | props.mode === "conditionalDistribution") ? "next" :
        (props.animalNumber < (animalNames.length - 1) ? "click to go to the next animal" :
            "click to go to the next phase");
    const nextButton = sum(clicked) > (response.length - 1) ? <button style={buttonStyle} onClick={() => handleClick()}>{buttontext}</button> : "(please move all the relevant sliders before going to the next page)";


    // dimensions for the svg containing the berries
    const svgWidth = 300;
    const svgHeight = 300;


    // submit the answers and go to the next screen
    const handleClick = () => {
        // record data
        Data.responses.push({
            "animalName": props.animalName,
            "ratings": response,
            "actualAmount": props.actualNumber,
            "trainingSequence": props.list,
            "question": props.mode,
            "testNumber": props.testNumber
        })
        console.log(Data);
        // advance to next page

        if (props.mode === "counterfactual") {
            // if next page is a counterfactual question, initialize 
            // sliders accordingly
            if (props.testNumber < props.tests.length - 3) {
                let initial = generateInitial(props.nextActual)
                setResponse(initial);
                setVisibilities(generateInitialVisibilities(props.nextActual));
            }
            // else set all sliders to the same value
            else { 
                setResponse([...Array(10).fill(50)]) 
                setVisibilities(["visible", "visible","visible", "visible",
                "visible", "visible","visible", "visible","visible", "visible"]);
            }

            setClicked(generateInitialClicks(props.nextActual));
            
            window.scrollTo(0, 0);
            props.setTestNumber((i) => i + 1)
        }
        if (props.mode === "conditionalDistribution") {
            setResponse([...Array(10)].fill(50));
            setClicked([...Array(10)].fill(0));
            window.scrollTo(0, 0);
            props.setTestNumber((i) => i + 1)
        }
        if (props.mode === "conditionalDistributionOff") {
            props.setAnimalNumber((i) => i + 1);
            props.setTestNumber(0);
        }

    };

    // make the sliders
    const sliders = <div class="rotate">{[...Array(10).keys()].map((i) => {
        return (<div>
            {i + 1}<span> berries</span>{i === 9 ? <span>&nbsp;</span> : <span> &nbsp; </span>}
            <input style={{visibility: visibilities[i]}} onChange={(e) => handleSlider(e, i)}
                type="range" min="1" max="100"
                value={response[i]} className="slider" id={i} />
        </div>

        )
    })}</div>

    // function that registers that a slider has been clicked on
    const updateClicked = (id) => {
        const newCs = [...Array(clicked.length).keys()].map((i) => {
            return (
                id === i ? 1 : clicked[i]
            )
        });
        setClicked(newCs)
    }


    // controls what happens when the participant moves a slider
    const handleSlider = (e, id) => {

        const proposal = [...Array(response.length).keys()].map((i) => {
            // if the slider's current value is 0, keep it at 0
            let newValue = response[id] === 0 ? 0 : e.target.valueAsNumber;
            return (
                // update the slider's value
                i === id ? newValue : response[i]
            )
        })
        // register that we clicked on that slider
        updateClicked(id);
        // update sliders register
        setResponse(proposal);

    };

    const sliderDiv = <div class="slidecontainer">
        {sliders}
    </div>

    const lessOrMore = (props.actualNumber < 6) ? "more" : "less";
    const textCounterfactual = <div>
        <svg style={{ marginLeft: '5vw' }} width={svgWidth} height={svgHeight} id={"id"} >
            <Circles animalNumber={props.animalNumber} actualNumber={props.actualNumber}
                svgWidth={svgWidth} />

        </svg>
        <p>On another day you see the {props.animalName} eat <b>{props.actualNumber}</b> berries.
            You have not tested whether it has enzyme XRD in its blood or not.</p>

        <p>If the {props.animalName} had eaten <b>{lessOrMore} than {props.actualNumber} berries</b> on that day,
            how many berries do you think it would have eaten?</p>
        <p>Please use the slider next to each number to indicate how much you agree
            that the {props.animalName} would have eaten that number of berries.
        </p>
        {sliderDiv}

    </div>

    // decide which monster picture to display
    const picMonsterEnzyme = zorbaIsMonsterOne ? (
        props.animalName === "zorba" ? monster_one_enzyme : monster_two_enzyme) :
        (props.animalName === "zorba" ? monster_two_enzyme : monster_one_enzyme);

    const picMonsterNoEnzyme = zorbaIsMonsterOne ? (
        props.animalName === "zorba" ? monster_one_noEnzyme : monster_two_noEnzyme) :
        (props.animalName === "zorba" ? monster_two_noEnzyme : monster_one_noEnzyme);


    const picEnzyme = props.mode === "conditionalDistribution" ? <img style={{ width: "10vw" }}
        src={picMonsterEnzyme} /> :
        (props.mode === "conditionalDistributionOff" ? <img style={{ width: "10vw" }} src={picMonsterNoEnzyme} /> : null);


    const subtextEffect = [<span>has it eaten</span>, <span>to have eaten</span>];
    const subtextCause = [<span>does it eat</span>, <span>to eat</span>];
    const subtext = condition === "effect" ? subtextEffect :
    subtextCause;

    const textConditional = <div>
        <div>{picEnzyme}</div>
        <p>In general, when the {props.animalName} <b>has the XRD enzyme in its blood</b>, how many berries {subtext[0]}? </p>

        <p>Please use the slider next to each number to indicate to what extent
            the {props.animalName} is likely {subtext[1]} that amount of berries when it has <b>the XRD enzyme</b> in its blood.
        </p>
        {sliderDiv}
    </div>

    const textConditionalOff = <div>
        <div>{picEnzyme}</div>
        <p>In general, when the {props.animalName} <b>does NOT have the XRD enzyme</b> in its blood, how many berries {subtext[0]}? </p>

        <p>Please use the slider next to each number to indicate to what extent
            the {props.animalName} is likely {subtext[1]} that amount of berries when it has <b>no XRD enzyme</b> in its blood.
        </p>
        {sliderDiv}
    </div>

    const text = props.mode === "counterfactual" ? textCounterfactual :
        (props.mode === "conditionalDistribution" ? textConditional :
            props.mode === "conditionalDistributionOff" ? textConditionalOff : null);


    return (<div style={textStyle}>
        {text}<br></br><br></br>
        {nextButton}
        <span>&nbsp;</span>
    </div>)
}

export default Question;







// normalize so that slider values sum to 100 [not implemented]
//const normalize = (id) => {
    // this function creates a vector that will help us compute
    // the sum of the values of all other sliders
    // const filter = (vector, index)=>{
    //     return([...Array(vector.length).keys()].map((i)=>{
    //         return(i === index ? 0 : vector[i])
    //     }))
    // };
    // // adjust slider values. 
    // const newRs = [...Array(response.length).keys()].map((i)=>{
    //     return(
    //         id===i ? response[i] : (response[i])/(sum(filter(response,id))+1)*(100-response[id])
    //     )
    // });
    // console.log(sum(newRs));
    // console.log(newRs);
    // setResponse(newRs);
//}