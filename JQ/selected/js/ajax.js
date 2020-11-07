function ajax(opt) {
    //设置默认值
    var type = opt.type || "get",
        async = typeof opt.async == "undefined" ? true : opt.async;
    //四大步
    var xhr = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHttp");
    xhr.open(type, opt.url, async);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            opt.success && opt.success(xhr.responseText);
        } else {
            opt.error && opt.error();
        }
    }
    xhr.send(null);
}