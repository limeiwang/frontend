//组合式。构造函数。原型
function Tab(opt){
    var box = document.getElementById(opt.ele)
    this.lis = Array.prototype.slice.call(box.querySelectorAll(".menu>li")); //找所以菜单
    this.con = box.querySelectorAll(".con section");//所有得内容块
    this.container = box.querySelector(".container");
    this.type = opt.type;
    console.log(this.con);

    this.init();
}
Tab.prototype = {
    constructor:Tab,
    //初始化方法
    init:function(){
        this.bindEvent();
    },
    //绑定事件方法
    bindEvent:function(){
        var that = this;
        this.lis.map(function(menu,i){
            menu["on"+that.type] = function(){
                that.change(i);
            }
        })
        // for(var i=0;i< this.lis.length;i++){
        //     this.lis[i].onclick = function(){
        //         alert(9)
        //     }
        // }
    },
    //切换方法
    change:function(idx){
        //动态获取一个内容块的高度
        var h = this.con[0].offsetHeight;
        console.log(h);
        var b = idx * h;
        //当鼠标经过那个菜单将对应的内容块显示。通过菜单下标找到对应的内容块 显示 = -idx + 高度
        this.container.style.transform = "translate3d(0,-"+ b +"px,0)";
        //this.container.style.webkitTransition = "transform 1s linear";
        this.lis.map(function(a){
            a.className = "";
        })
        this.lis[idx].className = "active";
    }
}