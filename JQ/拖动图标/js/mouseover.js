$(function() {
    var lis = $(".ul_medLs_3[node-type='medalOfHidden']").find("li");
    var arr = [];
    position();

    function position() {

        lis.each(function() {
            arr.push($(this).offset());
        });
        $.each(arr, function(i, a) {
            lis.eq(i).css({
                position: "absolute",
                left: a.left + "px",
                top: a.top + -40 + "px"
            });
        });
    };
    lis.each(function() {
        $(this).on("mousedown", function(e) {
            var cur = $(this);
            var dPos = { //鼠标相对元素的位置
                x: e.offsetX,
                y: e.pageY - $(this).offset().top
            }

            $(document).on("mousemove", function(e) {
                var mPos = { //鼠标相对页面的位置
                    x: e.pageX,
                    y: e.pageY
                }
                cur.css({
                    position: "absolute",
                    left: mPos.x - dPos.x,
                    top: mPos.y - dPos.y - 40,
                    zIndex: 1
                });
                cur.m = mPos;
                siIn(cur);
            }).on("mouseup", function() {
                $(this).off("mousemove mouseup")
            });

        });
    });

    function siIn(cur) {
        var empty = $('.ul_medLs_3[node-type="medalOfShow"]>li:empty');
        //var $li = $('.ul_medLs_3[node-type="medalOfHidden"]').find("li");
        empty.each(function() {
            var l = $(this).offset().left,
                t = $(this).offset().top,
                x = cur.m.x,
                y = cur.m.y;
            if (x > l && x < (l + $(this).width()) && y > t && y < (t + $(this).height())) {
                cur.children().appendTo($(this));
                $(this).removeClass("empty");
                cur.remove()
                $(".ico_closeZ").show()
                lis.css("position", "static");
            }
        });
    }
});