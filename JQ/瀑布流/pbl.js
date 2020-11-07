$(function() {
    var win = $(window).width(); //视口的宽
    var pin = $(".pin").innerWidth(); //每张图的宽
    var lei = win / pin;
    console.log(lei)
})