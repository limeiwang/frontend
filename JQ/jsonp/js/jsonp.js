$(function(){
    $(".keyword").on("input",function(){
        if($(this).val() !==""){
            $.getJSON("http://suggestion.baidu.com/su?wd="+$(this).val()+"&cb=?",function(data){
                showResult(data);
            })
        }
    });
    function showResult(json){
        $(".list").show();
        if(json.s.length > 0){
            $(".list").empty();
            json.s.forEach(function(item,i){
                $("<li><a href='http://www.baidu.com/s?wd="+item+"'>"+item+"</a></li>").appendTo(".list");
            });
        }else{
            $(".list").html("<li>没有查询到相关结果</li>");
        }
    }
});