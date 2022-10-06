//this component displays instructions
// monster pictures generated from https://www.calculators.org/games/monster-constructor/

import { useRef, useState } from 'react';
import { condition, animalNames, zorbaIsMonsterOne } from './randomizedParameters';
import './Instructions.css'
import { textStyle, buttonStyle } from './dimensions';
import monster_one_small from './monster_one_small.png';
import monster_two_small from './monster_two_small.png';
import alien_enzyme from './alien_enzyme.jpg';
import cause_diagram from './cause diagram.png';
import effect_diagram from './effect diagram.png';
import noCor_diagram from './noCor diagram.png';
import Data from './Data';





const Instructions = (props) => {
    //keeps track of the current page
    const [trialNumber, setTrialNumber] = useState(0);

    //update the page number
    const incrementTrial = () => {
        setTrialNumber((a) => a + 1);
    }

    //the dimensions for some of the text
    const localTextStyle = {
        display: "flex",
        flexDirection: "column",
        //justifyContent: "center",
        alignItems: "center",
        textAlign: "left",
        //minHeight: "100vh",
        marginLeft: "10vw",
        marginRight: "10vw",
        fontSize: "20px",
    }

    //the props we will pass on to each page
    const tutorialProps = {
        setCurrentPhase: props.setCurrentPhase,
        incrementTrial: incrementTrial,
        localTextStyle: localTextStyle
    };



    //the list of pages
    const instructionTrials = [<Intro {...tutorialProps} />,
    <IntroTwo {...tutorialProps} />,
    <IntroThree {...tutorialProps} />,
    <IntroFour {...tutorialProps} />
    ];


    //display the current page
    return (
        instructionTrials[trialNumber]
    )

}

//the first page
const Intro = (props) => {
    return (
        <span style={textStyle}
        >
            <p style={{ color: "red" }}>(Please do not refresh the page during the study -- you would be unable to complete the experiment)</p>
            <br></br>
            <p>In this study, we will ask you to imagine that you are a scientist visiting an alien planet.</p>
            <p>You are studying the dietary habits of the animals living on that planet.

            </p>
            <p>You are interested in how much food an animal of a given species tends to eat.</p>


            <button style={buttonStyle} onClick={() => props.incrementTrial()}>click to continue</button>
            <br></br>
        </span>
    )
}

//the second page
const IntroTwo = (props) => {

    // text of explanations in the different conditions
    const explanationCause = <p>
        They have also discovered that the
        presence of XRD in an animal's blood can affect how much food it eats.
    </p>

    const explanationNoCor = <p>
        They have also concluded that there is probably no relationship between the presence
        of XRD in an animal's blood and how much food it eats.
    </p>

    const explanationEffect = <p>
        They have also discovered that the amound of food an animal eats can affect
        whether it has XRD in its blood.
    </p>

    // select text explaining causal relationship according to condition
    const effectExplanation = condition === "cause" ? explanationCause :
        condition === "effect" ? explanationEffect :
            condition === "noCor" ? explanationNoCor :
                null;

    // select image depicting causal relationship according to condition            
    const effectImage = condition === "cause" ?
        <img src={cause_diagram} style={{ width: "50vw" }} /> :
        condition === "effect" ? <img src={effect_diagram} style={{ width: "50vw" }} /> :
            condition === "noCor" ? <img src={noCor_diagram} style={{ width: "50vw" }} /> : null;

    return (
        <span style={textStyle}
        >
            <p>Your colleagues have discovered an enzyme called XRD
                that can be found in the blood of animals of many species.
            </p>

            <img src={alien_enzyme} style={{ width: "10vw" }} />

            {effectExplanation}
            {effectImage}

            <button style={buttonStyle} onClick={() => props.incrementTrial()}>click to continue</button>
            <br></br>
        </span>
    )
}


//the third page
const IntroThree = (props) => {

    // store answer to comprehension check
    const [response, setResponse] = useState("NA");
    const [counter, setCounter] = useState(0);

    // when participant clicks, store comprehension
    // answer and move to next page
    const handleClick = () => {
        Data.compCheck.push(response);
        console.log(Data);
        props.incrementTrial();
    }

    // text of explanations for each conditions

    const explanationCause = <p>
        In particular, the enzyme can decrease or increase an animal's appetite.<br></br><br></br>
        On days that an animal <span style={{ color: "green" }}>has XRD</span> in its blood, it eats <b>either</b> a very low <b>or</b> a very high amount of food.<br></br>

        On days that an animal <span style={{ color: "red" }}>does not have XRD</span> in its blood, it eats a moderate amount of food.
    </p>

    const explanationNoCor = <p>
        In particular, the enzyme does not increase nor decrease an animal's appetite<br></br><br></br>
        On days that an animal <span style={{ color: "green" }}>has XRD</span> in its blood,
        on average it eats a similar amount of food as on
        on days that it <span style={{ color: "red" }}>does not have XRD</span> in its blood.
        <br></br>
    </p>

    const explanationEffect = <p>
        In particular, eating extremely low or extremely high amounts of food can cause the presence of the enzyme.<br></br><br></br>
        On days that an animal eats <b>either</b> a very low <b>or</b> a very high amount of food, it then <span style={{ color: "green" }}>gets XRD</span> in its blood.<br></br>

        On days that an animal eats a moderate amount of food, <span style={{ color: "red" }}>it does not gets XRD</span> in its blood.
    </p>

    // select explanation based on condition
    const explanation = condition === "effect" ? explanationEffect :
        condition === "cause" ? explanationCause :
            condition === "noCor" ? explanationNoCor :
                null;

    //button to go to the next page
    const nextPageButton = counter > 0 ?
        <button style={buttonStyle} onClick={() => handleClick()}>click to continue</button> :
        "";

    // handle comprehension question
    const handleQuestion = (e) => {
        if (response == "NA") { setCounter((a) => a + 1) };
        setResponse(e.target.value);
    };

    return (

        <div className="page"
            style={textStyle}
        >
            <div //className="text" 
                style={props.localTextStyle}
            >
                {explanation}
                <br></br>
                <p>Please answer the following question to make sure that
                    you understand the previous information.

                </p>
                <form>
                    {/*a dropdown with options */}
                    <label for="relationship">What is the relationship between XRD and food consumption? </label>

                    <select name="relationshp" id="relationship" onChange={(e) => handleQuestion(e)}>
                        <option value="NA">  </option>
                        <option value="cause">XRD has an effect on food consumption</option>
                        <option value="effect">Food consumption has an effect on XRD</option>
                        <option value="noCor">There is probably no relationship between XRD and food consumption</option>
                    </select>
                </form>
                <br></br>
                {nextPageButton}
            </div>

        </div >

    )

}

// the fourth page
const IntroFour = (props) => {



    //when the participant clicks on 'draw', a button appears which allows him
    //to go to the next page
    const nextPageButton =
        <button style={buttonStyle} onClick={() => props.setCurrentPhase("test")}>click to continue</button>;

    const animalName = animalNames[0];
    const pic = animalName === "zorba" ? [monster_two_small, monster_one_small][zorbaIsMonsterOne] :
        (animalName === "yorgi" ? [monster_one_small, monster_two_small][zorbaIsMonsterOne] : null);
    //display the page
    return (

        <div className="page"
            style={textStyle}
        >
            <div //className="text" 
                style={props.localTextStyle}
            >
                <p>You decide to study the food consumption of an animal called the {animalName}.</p>
                <img style={{ width: "8vw" }} src={pic} />
                <p>You study the same {animalName} over 40 days.</p>


                {nextPageButton}
            </div>

        </div >

    )

}

//the fifth page (not implemented)
const IntroFive = (props) => {

    const animalName = animalNames[0];

    //when the participant clicks on 'draw', a button appears which allows him
    //to go to the next page
    const nextPageButton =
        <button style={buttonStyle} onClick={() => props.setCurrentPhase("test")}>click to start the task</button>;

    //display the page
    return (

        <div className="page"
            style={textStyle}
        >
            <div //className="text" 
                style={props.localTextStyle}
            >
                <p>Every day you collect two measurements about the {animalName}:
                    whether it has enzyme XRD in its bloodstream, and how much food it has eaten.</p>

                <p>You will see data collected on the {animalName} for each of 40 days.
                    Then we will ask you some simple questions about the animal.</p>
                <p>Please pay close attention to the data you observe!</p>
                {nextPageButton}
            </div>

        </div>




    )

}





export default Instructions;