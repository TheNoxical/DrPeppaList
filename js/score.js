/**
 * Numbers of decimal digits to round to
 */
const scale = 1;

// const minRank = JSON.parse("_list.json").length(); // Retrieves the array containing the list, and gets its length, which is the rank of the last level
let minRank;
fetch("./data/_list.json")
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        // console.log(data.length);
        minRank = data.length;
        // console.log(minRank);
    });

    const maxPoints = minRank / 2; // Points awarded for completing #1

/**
 * Calculate the score awarded when having a certain percentage on a list level
 * @param {Number} rank Position on the list
 * @param {Number} percent Percentage of completion
 * @param {Number} minPercent Minimum percentage required
 * @returns {Number}
 */
export function score(rank, percent, minPercent) {
    // if (rank > 150) {
    //     return 0;
    // }
    // if (rank > 75 && percent < 100) {
    //     return 0;
    // }

    // Old formula
    /*
    let score = (100 / Math.sqrt((rank - 1) / 50 + 0.444444) - 50) *
        ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    */
    // New formula (now old)
    // let score = (50.9926 * Math.pow(0.98053, rank));

    // New New Formula
    let curveConstant = Math.pow((1/maxPoints), (1/(minRank - 1)));
    let score = maxPoints * Math.pow(curveConstant, (rank - 1));

    // Dylan formula replace new one if it doesnt work
    /*
    score = score * ((percent - (minPercent - 1)) / (120 - (minPercent - 1)));
    */

    score = Math.max(0, score);

    if (percent != 100 && percent >= minPercent) {
        // Newest formula, slight exponential increase from 1/10 of the points for 50 to 1/4 at 99
        // Exponential growth isn't super fast though, so for the most part the ratio of points acts somewhat linearly still
        // score = ((1 / 10) * score) * Math.pow((10 / 4), ((percent - minPercent) / 49));
        score = score * ((percent - (minPercent - 1)) / (120 - (minPercent - 1)));
        // Return value modified to round to 2 decimal places now:
        return Math.round(score * 100) / 100;
        // return round(score - score / 3);
    }

    return Math.max(round(score), 1);
}

export function round(num) {
    if (!('' + num).includes('e')) {
        return +(Math.round(num + 'e+' + scale) + 'e-' + scale);
    } else {
        var arr = ('' + num).split('e');
        var sig = '';
        if (+arr[1] + scale > 0) {
            sig = '+';
        }
        return +(
            Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) +
            'e-' +
            scale
        );
    }
}
