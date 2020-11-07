class Utils{
    getElement(node) {
        return document.querySelector(node);
    }
    ajax(url, data = null, type = "GET") {
        return new Promise((resolve,reject) => {
            const xml = new XMLHttpRequest();
            const handlerCallback = () => {
                if (xml.readyState !== 4) return;
                if (xml.status == 200) {
                    resolve(xml.responseText);
                } else {
                    reject(new Error('not find!'));
                }
            }
            xml.open(type,url);
            xml.send(data);
            xml.onreadystatechange = handlerCallback;
        });
    }
}
export default Utils;