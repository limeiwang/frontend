import Utils from './utils.js'
class findHouse extends Utils{
    constructor() {
        super();
        this.list = this.getElement('.list_box');
        this.init();
    }
    init() {
        this.getJson();
    }
    getJson() {
        this.ajax('http://localhost:8080/api').then(res=>{
            let result = JSON.parse(res);
            var str = '';
            result.forEach(item => {
                str += `<dl>
                <dt>
                    <img src="./static/images/pic.jpg" alt="">
                </dt>
                <dd>
                    <h1>${item.title}</h1>
                    <h2>${item.description}</h2>
                    <h3><span>${item.price}万</span>${item.area}</h3>
                    <p><span>满两年</span><span>地铁</span><span>随时看房</span></p>
                </dd>
            </dl>`;
            });
            this.list.innerHTML = str;
        });
    }
}
export default findHouse;