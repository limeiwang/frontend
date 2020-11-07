$(window).on("load", function() {
    var lei = 0;
    var pics = [{ "src": "40.jpg" }, { "src": "41.jpg" }, { "src": "42.jpg" }, { "src": "43.jpg" }, { "src": "44.jpg" }, { "src": "45.jpg" }, { "src": "46.jpg" }, { "src": "47.jpg" }, { "src": "48.jpg" }, { "src": "49.jpg" }, { "src": "50.jpg" }, { "src": "51.jpg" }, { "src": "52.jpg" }, { "src": "53.jpg" }, { "src": "54.jpg" }, { "src": "55.jpg" }, { "src": "56.jpg" }, { "src": "57.jpg" }, { "src": "58.jpg" }, { "src": "59.jpg" }, { "src": "60.jpg" }, { "src": "61.jpg" }, { "src": "62.jpg" }, { "src": "63.jpg" }, { "src": "64.jpg" }, { "src": "65.jpg" }, { "src": "40.jpg" }, { "src": "41.jpg" }, { "src": "42.jpg" }, { "src": "43.jpg" }, { "src": "44.jpg" }, { "src": "45.jpg" }, { "src": "46.jpg" }, { "src": "47.jpg" }, { "src": "48.jpg" }, { "src": "49.jpg" }, { "src": "50.jpg" }, { "src": "51.jpg" }, { "src": "52.jpg" }, { "src": "53.jpg" }, { "src": "54.jpg" }, { "src": "55.jpg" }, { "src": "56.jpg" }, { "src": "57.jpg" }, { "src": "58.jpg" }, { "src": "59.jpg" }, { "src": "60.jpg" }, { "src": "61.jpg" }, { "src": "62.jpg" }, { "src": "63.jpg" }, { "src": "64.jpg" }, { "src": "65.jpg" }]
    init();
    scroll();

    function init() {
        var win = $(window).width(); //视口的宽
        var pin = $(".pin").eq(0).innerWidth(); //每张图的宽
        lei = Math.floor(win / pin);
        $("#main").width(pin * lei);
        waterfall();
    }

    function scroll() {
        $(window).on("scroll", function() {
            var lastPic = $(".pin").last(),
                sTop = $(this).scrollTop() + $(this).height(),
                top = lastPic.position().top + lastPic.innerHeight() / 3;
            if (sTop > top) {
                $(`<div class="pin">
                    <div class="box">
                        <img src="./images/${pics[0].src}" />
                    </div>
                </div>`).appendTo("#main");
                pics.shift();
                waterfall();
            }
        })
    }

    function waterfall() {
        var arr = [];

        $(".pin").each(function(i) {
            if (i < lei) { //第一行
                arr.push($(this).innerHeight());
            } else { //以下行
                var min = Math.min.apply(Math, arr),
                    mIdx = $.inArray(min, arr),
                    l = $(".pin").eq(mIdx).position().left;
                $(this).css({
                    "position": "absolute",
                    "left": l,
                    "top": min
                });
                //更改最小高低 = 原有值+当前值
                arr[mIdx] += $(this).innerHeight();
            }
        });

    }
})