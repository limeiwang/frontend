module.exports.randomSelect = function(arr, num) {

    // for (var i = 0; i < num; i++) {
    //     arr.push(random(10, 100))
    // }
    // return arr.sort(function(a, b) { return a - b });

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    while (arr.length < num) {
        var rand = random(1, 6);
        if (arr.indexOf(rand) == -1) {
            arr.push(rand)
        }
    }
    return arr;


}