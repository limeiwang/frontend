$(function() {
    var lis = $('.ul_medLs_3[node-type="medalOfHidden"]').find("li");
    var tlis = $('.ul_medLs_3[node-type="medalOfShow"]').find("li");
    var remove = $('.ico_closeZ').find("a");
    remove.on("click", function() {
        $(this).parents("li").addClass("empty");
        $(this).parents(".img_show").remove();
    })
    lis.on("click", function() {
        console.log($('.empty')[0])
        var that = $(this);
        if ($('.empty')[0]) {
            $(this).find(".img_show").appendTo($(".empty")[0]);
            $(".empty").eq(0).removeClass("empty");
            $(this).remove();
        }
    });
});