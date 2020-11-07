function Menu(opt) {

    this.ul = document.querySelector(opt.wrap);
    this.init();
}
Menu.prototype = {
    constructor: Menu,
    init: function() {
        var that = this;
        ajax({
            url: "data.json",
            async: "get",
            success: function(v) {
                that.render(JSON.parse(v));
            }
        })
    },
    render: function(json) {
        var keys = Object.keys(json);
        var that = this;
        keys.forEach(function(k, i) {
            var arr = json[k] instanceof Array ? json[k] : json[k].option;
            var select = that.ul.querySelector('select[name=' + k + ']');
            arr.forEach(function(obj, j) {
                var text = obj.name || obj.text;
                var opt = new Option(text, j);
                select.add(opt);
            });
            select.onchange = function() {
                this.previousElementSibling.innerText = this.options[this.selectedIndex].innerHTML;
                //console.log(this.options[this.selectedIndex].innerHTML)
                var a = this.parentNode.nextElementSibling;

                if (this.options[this.selectedIndex].innerHTML == "请选择") {
                    a.style.visibility = "hidden";
                } else {
                    that.submenu(arr[this.value].option, a);
                }
            }
        });
    },
    submenu: function(data, section) {
        section.style.visibility = "visible";
        var sub = section.querySelector("select");
        sub.innerHTML = '<option>请选择</option>';
        data.forEach(function(obj, i) {
            var txt = obj.name || obj.text,
                opt = new Option(txt, i);
            sub.add(opt);
        });
        sub.onchange = function() {
            this.previousElementSibling.innerText = this.options[this.selectedIndex].innerHTML;
            //console.log(this.options[this.selectedIndex].innerHTML)

        }
    }
}