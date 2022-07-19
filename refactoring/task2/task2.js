const drawRating1 = (vote) => {
    if (vote < 0 || vote > 100) {
        return "Рейтинг должен быть в диапозоне от 0 до 100";
    }
    if (vote < 21) {
        return '★☆☆☆☆';
    }
    if (vote < 41) {
        return '★★☆☆☆';
    }
    if (vote < 61) {
        return '★★★☆☆';
    }
    if (vote < 81) {
        return '★★★★☆';
    }

    return '★★★★★';
}
console.log('===1')
console.log(drawRating1(0)); // ★☆☆☆☆
console.log(drawRating1(1)); // ★☆☆☆☆
console.log(drawRating1(50)); // ★★★☆☆
console.log(drawRating1(99)); // ★★★★★

//______________
const drawRating2 = (vote) => {
    const filledStars = Math.max(Math.ceil(vote / 20), 1);
    const emptyStars = 5 - filledStars;
    return '★'.repeat(filledStars) + '☆'.repeat(emptyStars);
}

console.log('===2')
console.log(drawRating2(0)); // ★☆☆☆☆
console.log(drawRating2(1)); // ★☆☆☆☆
console.log(drawRating2(50)); // ★★★☆☆
console.log(drawRating2(99)); // ★★★★★