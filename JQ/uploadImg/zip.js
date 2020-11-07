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