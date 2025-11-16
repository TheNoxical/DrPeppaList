/**
 * Numbers of decimal digits to round to
 */
const scale = 2;

// const minRank = JSON.parse("_list.json").length(); // Retrieves the array containing the list, and gets its length, which is the rank of the last level
const list = fetch("./data/_list.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.length);
    });
console.log(list);

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
    let score = (50.9926 * Math.pow(0.98053, rank));

    // New New Formula
    // let curveConstant = Math.pow((1/50), (1/minRank));
    // let score = 100 * Math.pow(curveConstant, rank);

    score = Math.max(0, score);

    if (percent != 100) {
        score = score * ((percent - (minPercent - 1)) / (120 - (minPercent - 1)));
        return score;
        // return round(score - score / 3);
    }

    return Math.max(round(score), 0);
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
