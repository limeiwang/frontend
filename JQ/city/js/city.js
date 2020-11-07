function City(opt){
    //实力属性
    this.data = opt.data
    this.pro = document.getElementById(opt.pro);
    this.city = document.getElementById(opt.city);
    this.district = document.getElementById(opt.district);
    //调用方法
    this.init();
}
City.prototype = {
    constructor:City,
    //初始化方法init
    init: function(){
        var that = this;
        this.renderProvince();
        //点击省,select绑定change
        this.pro.onchange = function(){
            //获取选中项 select.value
            if(!this.value) return;
            that.renderCity(that.data[this.value].c);
        };
        //点击二级
        this.city.onclick = function(){
            var pVal = that.pro.value;//选中省的value
            var cVal = this.value;//选中市的value
            //判断有没有三级区县
            var data = that.data[pVal].c[cVal].a;
            if(!data){//没有三级区县
                that.district.innerHTML = '<option value="">区</option>';
                return;
            }
            that.renderDistrict(data);
        }

    },
    //渲染省
    renderProvince: function(){
        var that = this;
        this.data.map(function(obj,i){
            //创建option
            var node = new Option(obj.p,i);
            that.pro.add(node);
        });
    },
    //渲染二级城市
    renderCity: function(data){
        //渲染对应二级城市
        //再添加之前清空
        this.city.innerHTML = "";
        data.map(function(obj,idx){
            //创建option  new Option
            var node = new Option(obj.n,idx)
            //通过add()添加到select
            this.city.add(node);
        })
    },
    renderDistrict: function(data){
        this.district.innerHTML = "";
        data.map(function(obj,idx){
            //创建option  new Option
            var node = new Option(obj.s,idx)
            //通过add()添加到select
            this.district.add(node);
        })
    }
}