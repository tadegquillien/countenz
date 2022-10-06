//these elements are randomly generated at the start of the experiment
//after being generated, they keep the same value throughout the experiment

import { shuffle } from './convenienceFunctions';


// the experimental condition: does XRD caused food consumption, is it the reverse, or
// is there no correlation between food consumption and enzyme?
export const condition = shuffle(["cause", "noCor", "effect"])[0];
console.log(condition);
// does the enzyme make food consumption more extreme or more moderate?
// (here for simplicity we always make it more extreme)
export const causalShape = shuffle(["extremizer"])[0];
console.log(causalShape);
// the possible amounts of food a creature can eat in a day
const amounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// the distribution of enzymes and food amounts
// list of enzyme absence / presence on any given day
const enzList = Array(20).fill(0).concat(Array(20).fill(1));
// distribution of food, in the presence [/absence] of the enzyme
const distEnzA = [4, 4, 2, 0, 0, 0, 0, 2, 4, 4];
// distribution of food, in the absence [/presence] of the enzyme 
const distEnzB = [0, 0, 2, 4, 4, 4, 4, 2, 0, 0];
// array with amount of food on each day (with enzyme)
const foodListEnzA = amounts.map((i) => {
    return (Array(distEnzA[i - 1]).fill(i))
}).flat();
// array with amount of food on each day (without enzyme)
const foodListEnzB = amounts.map((i) => {
    return (Array(distEnzB[i - 1]).fill(i))
}).flat();
// put the two arrays above in a meta-array
const metaList = [foodListEnzB, foodListEnzA];

// create an array of arrays. Each small array represents one day
// the first element is the presence of the enzyme, the second element
// is the number of berries eaten
const foodListCor = shuffle(Array.from(Array(enzList.length).keys()).map((i) => {
    let index = enzList[i];
    let enzyme = causalShape === "extremizer" ? index :
        (causalShape === "moderator" ? (1 - index) : null);
    return ([enzyme, metaList[index][i % 20]])
}));

// the same thing, but for the condition where there is no correlation 
// between enzyme and food consumption
const flatList = shuffle(metaList.flat());
const shuffledEnzList = shuffle(enzList);
const foodListNoCor = Array.from(Array(enzList.length).keys()).map((i) => {
    let index = shuffledEnzList[i];
    return ([index, flatList[i]])
});

// the actual amounts observed
export const actuals = shuffle([1, 5, 6, 10]);

export const lists = {
    "cause": foodListCor,
    "effect": foodListCor,
    "noCor": foodListNoCor
};

export const listLength = enzList.length;
export const listorder = shuffle(["cor", "noCor"]);
export const animalNames = [shuffle(["zorba", "yorgi"])[0]];
export const colors = shuffle(["red", "blue"]);
export const zorbaIsMonsterOne = (Math.random() > .5 ? 1 : 0);











