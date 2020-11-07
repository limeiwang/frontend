console.log("a");
(function() {
    return console.log("hollow word");
})()

function a() {
    //排序
    var arr = [3, 9, 6, 7, 1, 5];
    console.log(arr.sort());
    //求最大值
    console.log(Math.max.apply(Math, arr));
    //去重
    var arr1 = [1, 2, 3, 2, 4, 3, 4, 5, 1, 2];
    var a = arr1.filter(function(val, i, arrAy) {
        return arrAy.indexOf(val) === i;
    })
    console.log(a);
}
a();