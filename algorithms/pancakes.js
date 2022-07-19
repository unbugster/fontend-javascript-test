const makePancakes = (pans, pancake) => {
    return (Math.ceil(pancake * 2 / pans) + ' minutes(iterations)');
}

console.log(makePancakes(2, 3))
console.log(makePancakes(1, 3))
console.log(makePancakes(2, 5))
