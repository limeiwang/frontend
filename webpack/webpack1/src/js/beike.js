import Utils from './utils.js'
class findHouse extends utils {
    constructor() {
        super();
        // this.list = this.getElement('.list_box');
        this.init();
    }
    init() {
        this.getJson();
        console.log(1)
    }
    getJson() {
        this.ajax('http://localhost:8080/api').then(res=>{
            let result = JSON.parse(res);
            console.log(result);
        });
    }

}
export default findHouse;