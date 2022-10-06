import { textStyle, buttonStyle } from './dimensions';
import { animalNames, condition } from "./randomizedParameters";

// this component is called at the end of the instruction phase
const Transition = (props) => {

    const handleClick = () => {
        props.incrementTest(props.testNumber);
    }
    // in the 'effect' condition we want to display information about 
    // the food consumption first; in the other conditions we want to display
    // information about the enzyme first
    const foodText = <span>how much food it has eaten</span>;
    const enzymeText = <span>whether it has enzyme XRD in its bloodstream</span>
    const firstText = condition === "effect" ? foodText :
        condition !== "effect" ? enzymeText : null;
    const secondText = condition === "effect" ? enzymeText :
        condition !== "effect" ? foodText : null;

    const animalName = animalNames[0];
    const text = <div style={textStyle}>
        <p>Every day you collect two measurements about the {animalName}: {firstText},
            and {secondText}.</p>

        <p>You will see data collected on the {animalName} for each of 40 days.
            Then we will ask you some simple questions about the animal.</p>
        <p>Please pay close attention to the data you observe!</p>
        <button style={buttonStyle} onClick={() => handleClick()}>Next</button>
    </div>;

    // const text = <div style={textStyle}>
    //     <p>You will now see data about a new animal: a {props.animalName}.</p>
    //     <p>On each page, you will see information about how much food the {props.animalName} ate on a given day.
    //         In total you will see data for each of 40 consecutive days.
    //     </p>
    //     <button style={buttonStyle} onClick={() => handleClick()}>Next</button>
    // </div>;
    return (text);


};

export default Transition;