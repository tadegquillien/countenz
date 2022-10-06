//randomly shuffles an array
export const shuffle = (unshuffled) => {
    const new_array = unshuffled.map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);
    return new_array;

}

// element-wise vector addition
export const addvector = (a, b) => {
    return a.map((e, i) => e + b[i]);
}

// element-wise vector subtraction
export const subtractvector = (a, b) => {
    return a.map((e, i) => e - b[i]);
}

// element-wise vector multiplication
export const multiplyvector = (a, b) => {
    return a.map((e, i) => e * b[i]);
}

// computes the sum of all elements in an array
export const sum = function (vector) {
    return (vector.reduce((previous, i) => previous + i, 0))
};

//a function computing the mode of an array
export const mostCommon = (arr) => {

    let arr_copy = arr.map((i) => {
        return (i)
    })
    return arr_copy.sort((a, b) =>
        arr_copy.filter(v => v === a).length
        - arr_copy.filter(v => v === b).length
    ).pop();
}

//computes the number of elements in an array, if one eliminated the duplicates
const sizeUnique = (array) => {
    return ([...new Set(array)].length)
}

//order elements in an array by their frequencies
export const orderByFrequency = (arr) => {
    let arr_copy = arr.map((i) => {
        return (i)
    });
    let arr_to_fill = Array.from(Array(sizeUnique(arr_copy)).keys());
    return (arr_to_fill.map((i) => {
        let mode = mostCommon(arr_copy);
        arr_copy = arr_copy.filter((a) => a != mode);
        return (mode);
    }))

}


export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}