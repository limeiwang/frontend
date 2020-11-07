;
(function($) {
    //压缩图片
    var zipImg = function(file, maxLen, callBack) {
        var img = new Image();
        var reader = new FileReader(); // 读取客户端上的文件
        reader.onload = function() {
            var url = reader.result; // 读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
            img.src = url; // reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
        };
        img.onload = function() {
            // 生成比例
            var width = img.width;
            var height = img.height;
            // 计算缩放比例
            var rate = 1;
            if (width >= height) {
                if (width > maxLen) {
                    rate = maxLen / width;
                }
            } else {
                if (height > maxLen) {
                    rate = maxLen / height;
                }
            };
            img.width = width * rate;
            img.height = height * rate;
            // 生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            var base64 = canvas.toDataURL('image/jpeg', 0.5).substring(22);
            callBack(base64);
        };
        reader.readAsDataURL(file);
    };
    //定义一个类插件
    $.extend({
        upload: function(opt) {
            //默认参数
            var def = {
                file: "#file",
                url: "upload.php",
                pic: ".img",
                maxSize: 2,
                maxLen: 3,
                error: null,
                success: null
            }
            settings = $.extend({}, def, opt);
            $(settings.file).on("change", function() {
                uploadImg(this, settings);
            });
        }
    });

    function uploadImg(fileObj, par) {
        var files = fileObj.files,
            name = files[0].name,
            size = files[0].size;
        //验证 ：格式，体积
        var reg = /(jpg|jpeg|png|gif)$/; //jpg|jpeg|png|gif
        if (!reg.test(name)) {
            par.error && par.error("请输入正确图片的格式")
        } else if (size > par.maxSize * 1024 * 1024) {
            par.error && par.error("请上穿小于" + par.maxSize + "M的文件");
        } else { //通过验证
            //显示 LOADING(添加)
            $('<li><img src=""><span class="close"></span></li>').prependTo(par.pic)
                //压缩图片
            zipImg(files[0], 320, function(img64) {
                $.ajax({
                    url: par.url,
                    type: "post",
                    data: { "img": img64 },
                    success: function(rs) {
                        var rs = JSON.parse(rs);
                        par.success && par.success(rs.url);
                        count(par);
                        del(par);
                    }
                });
            });
            //请求后台文件完成上传，成功后，前台在将上传后的图片显示到页面中
        }
    }

    function count(par) {
        //已上传数量
        var n = $(par.pic).find("li").length - 1;
        var sub = par.maxLen - n;
        $(par.r).text(n);
        $(par.sub).text(sub);
        if (sub <= 0) {
            $(par.pic).find("li:last").hide();
        } else {
            $(par.pic).find("li:last").show();
        }
    }

    function del(par) {
        $(par.pic).on("click", ".close", function() {
            $(this).parent().remove();
            count(par);
        })
    }
})(jQuery)