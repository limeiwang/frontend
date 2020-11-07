;
(function($) {
    $.extend({
        game: function() {
            $.getJSON("data.json", function(rs) {
                render(rs);
                clicks(rs);
                search(rs);
            });
        }
    });
    //渲染
    function render(data) {
        $.each(data, function(k, v) { //k是键值 y是键值
            $(`<li><label for="${k}"><input id="${k}" type="checkbox">${v.tit}</label></li>`).appendTo($(".uls"));
            readerFn(v.item);
        });
    }
    //点击
    function clicks(data) {
        $(".uls").on("click", "input", function() {
            $(".right").empty();
            $(".search1").val("");
            var cek = $(".uls").find(":checked");
            if (cek.length == 0) {
                $.each(data, function(k, v) { //k是键值 y是键值
                    readerFn(v.item);
                });
            } else {
                cek.each(function(i) {
                    readerFn(data[this.id].item);
                });
            }
        });
    }

    function readerFn(data) {
        $.each(data, function(i, z) {
            $(`<dl>
                <dt><img src="img/${z.url}" alt=""></dt>
                <dd>${z.tit}</dd>
            </dl>`).appendTo(".right");
        });
    }

    function search(data) {
        $(".search1").on("input", function() {
            $(".right").empty();
            $(".uls").find(":checked").prop("checked", false);
            var val = $.trim($(this).val());
            if (val == "") { //为空显示全部
                $.each(data, function(k, v) { //k是键值 y是键值
                    readerFn(v.item);
                });
            } else { //不为空模糊查询
                for (var k in data) {
                    data[k].item.forEach(function(i) {
                        if (i.tit.indexOf(val) > -1) {
                            $(`<dl>
                                <dt><img src="img/${i.url}" alt=""></dt>
                                <dd>${i.tit}</dd>
                            </dl>`).appendTo(".right");
                        }
                    });

                }
            }
        })
    }

})(jQuery);