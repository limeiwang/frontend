(function($) {
    $.extend({
        broad: function() {
            $("#txt").on("input", function() {
                var val = this.value.length;
                $("#sum").html(40 - (val * 1));
                if ($("#sum").html() <= 0) {
                    $("#sum").css({ color: "red" })
                    $("#sum").html("0");

                }
            });
            $(".lis").on("click", "li", function() {
                $(".lis").find("img").removeClass("opac")
                $(this).find("img").addClass("opac")
            });
            $("#btn").on("click", function() {
                if ($("#name").get(0).value) {
                    if ($("#txt").get(0).value) {

                        $(`<dl class="create">
                        <dt><img src="img/1.png"></dt>
                        <dd>
                            <p>${$("#name").get(0).value}：<span>${$("#txt").get(0).value}</span></p>
                            <p><b>07月05日 15:14</b><a class="remove" href="###">删除</a></p>
                        </dd>
                    </dl>`).appendTo($(".box"));
                        $(".create").hover(function() {
                            $(this).css({ background: "#ddd" });
                            $(".remove").css({ display: "block" });
                        }, function() {
                            $(this).css({ background: "#fff" });
                            $(".remove").css({ display: "none" });
                        });
                        $(".remove").on("click", function() {
                            $(this).parents("dl").remove()
                        })
                    } else {
                        alert("请输入内容")
                    }
                } else {
                    alert("请输入名称")
                }
            })

        }
    });
})(jQuery);