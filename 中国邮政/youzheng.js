delete __filename;
delete __dirname;
// delete Buffer
// delete GLOBAL;
// delete SharedArrayBuffer;
// delete VMError;
// delete root;

// 由于使用navigator.__defineGetter__("getBattery",func); 所以就相当于只有get没有set的其他特性均为true的存取描述符；因此不能直接赋值undefine；
// 所以我们先删除，是navigator没有getBattery属性，然后再重新赋值，避免navigator.getBattery用到原型链上的getBattery；

// delete process
// const {createCanvas} = require('canvas')
// const canvas = createCanvas(200, 200);
window = global;
document = {
    characterSet:'UTF-8',
    charset:'UTF-8',
    scripts: ['script','script'],
    visibilityState:"visible"
}
div = {
    getElementsByTagName:function (val){
        if (val === 'i'){
            return {length:0}
        }
    }
}
script = {
    getElementsByTagName:function (val){
        console.log(1111, val)
        return {}
    }
}
base = {
    getElementsByTagName:function (val){
        console.log(2222, val)
        return {}
    }
}
form = {

}
a = {

}
meta = {
    getElementsByTagName:function (val){
        console.log('meta', val)
        return {}
    }
}
_xl = function (){
}
addEventListener = _xl
createElement = function (val){
    console.log('createElement----->', val)
    if (val === 'div'){
        return div
    }
    if (val === 'form'){
        return form
    }
    if (val === 'a'){
        return a
    }
    if (val === 'script'){
        return script
    }
    if (val === 'base'){
        return base
    }
    if (val === 'canvas'){
        return canvas
    }
}
document.createElement = createElement
document.appendChild = _xl
document.removeChild = _xl
getElementsByTagName = function (val){
    console.log('getElementsByTagName--->', val)
    return [

        {   base:base,
            script:script,
            content:content,
            parentNode:{
                removeChild:function (){}
            },
            parentElement : {
                removeChild:function (){}
            }
        },
        {
            base:base,
            script:script,
            content:content,
            parentNode:{
                removeChild:function (){}
            },
            parentElement : {
                removeChild:function (){}
            }
        }
    ]
}
document.getElementsByTagName = getElementsByTagName
document.addEventListener = addEventListener
document.attachEvent = undefined
Object.prototype.getAttribute = function (val){
    // console.log('getAttribute', arguments)
    if(val === 'r') {
        return 'm';
    }
}
location = {
    "ancestorOrigins": {},
    "href": "https://wcjs.sbj.cnipa.gov.cn/home",
    "origin": "https://wcjs.sbj.cnipa.gov.cn",
    "protocol": "https:",
    "host": "wcjs.sbj.cnipa.gov.cn",
    "hostname": "wcjs.sbj.cnipa.gov.cn",
    "port": "",
    "pathname": "/home",
    "search": "",
    "hash": ""
}
window.top = window
window.self = window
// window.globalStorage = undefined
// window.msCrypto = undefined
// window.ActiveXObject = undefined
// window.execScript = undefined
// window.MSBlobBuilder = undefined
window.name = ""
// window.orientation = undefined
// window.innerHeight =222
// window.iframe = 0
// window.TEMPORARY = 0
// window.outerHeight =864
// window.innerWidth = 1474
// window.outerWidth = 1474
// window.showModalDialog = undefined
// window.CollectGarbage = undefined
// window.msCrypto = undefined
window.ActiveXObject = undefined
window.DOMParser = function (){
    return 123;
}
window.addEventListener = addEventListener
window.webkitRequestFileSystem = function (){}
window.PointerEvent = _xl
window.setTimeout = function setTimeout() {
    debugger;
    // x�����Ƿ���Ҳ�������ı�
    // typeof (x) == "function" ? x() : undefined;
    // typeof (x) == "string" ? eval(x) : undefined;
    // ��ȷӦ�� ����UUID�����ұ��浽�ڴ�
    return 123;
};
window.setInterval = function setInterval() {
    debugger;
    // x�����Ƿ���Ҳ�������ı�
    // typeof (x) == "function" ? x() : undefined;
    // typeof (x) == "string" ? eval(x) : undefined;
    // ��ȷӦ�� ����UUID�����ұ��浽�ڴ�
    return 123;
};
window.XMLHttpRequest = function () {
    debugger;
    return {
        onabort: null,
        onerror: null,
        onload: null,
        onloadend: null,
        onloadstart: null,
        onprogress: null,
        onreadystatechange: mull,
        ontimeout: null,
        readyState: 0,
        response: "",
        responseText: "",
        responseType: "",
        responseURL: "",
        responseXML: null,
        status: 0,
        statusText: "",
        timeout: 0,
        toString: function () {
            return 'function XMLHttpRequest() { [native code] }'
            // return "function toString() { [native code] }"
        }
    }
};
window.location = location
window.chrome = {};
// canvas.style = {display:''}
// localStorage = {
//     "message": "country",
//     "$_YVTX": "Wq",
//     "mailStatus": "a",
//     "id": "[\"9858638312956\"]",
//     "flag": "1",
//     "__#classType": "localStorage",
//     "person_info": "",
//     "capcode": "fe28bf0ca3aa482fbd94160a0378c08f20240318",
//     "queryLog": "{\"success\":true,\"value\":{\"domesticMailResultDtoList\":[{\"resCode\":\"true\",\"resMsg\":\"查询结果正常返回！\",\"resObj\":[{\"traceNo\":\"9858638312956\",\"opTime\":\"07:01\",\"opCode\":\"5\",\"opName\":\"已揽收\",\"opDesc\":\"咸阳市，中国邮政 已收取快件\",\"opOrgProvName\":\"陕西省\",\"opOrgCity\":\"咸阳市\",\"opOrgCode\":\"71200124\",\"opOrgName\":\"咸阳市渭城镇揽投部\",\"operatorNo\":\"7120012420246\",\"operatorName\":\"王航\",\"operatorPhone\":\"18668611117\",\"gis\":\"108.7686280,34.3684360\",\"notes\":\"\",\"arrivalCity\":\"北京市\",\"timeLimit\":\"\",\"productName\":\"快递包裹\",\"bubbleTime\":\"2024-03-13 07:01\",\"isOne\":\"false\",\"traceType\":\"国内\",\"promisedArrivalTime\":\"\",\"opStateCode\":\"203\",\"opStateName\":\"收寄计费信息\",\"logo\":\"邮政\"},{\"traceNo\":\"9858638312956\",\"opTime\":\"17:18\",\"opCode\":\"6\",\"opName\":\"运送中\",\"opDesc\":\"咸阳市，快件已在【咸阳市渭城镇揽投部】完成分拣，准备发出\",\"opOrgProvName\":\"陕西省\",\"opOrgCity\":\"咸阳市\",\"opOrgCode\":\"71200124\",\"opOrgName\":\"咸阳市渭城镇揽投部\",\"nextOrgName\":\"陕西省西安邮区中心草滩包件车间\",\"nextOrgCode\":\"71000550\",\"operatorNo\":\"7120010316620\",\"operatorName\":\"万苗\",\"gis\":\"108.7686280,34.3684360\",\"notes\":\"揽收扫描配发\",\"arrivalCity\":\"北京市\",\"timeLimit\":\"\",\"productName\":\"快递包裹\",\"bubbleTime\":\"2024-03-13 17:18\",\"isOne\":\"false\",\"traceType\":\"国内\",\"promisedArrivalTime\":\"\",\"opStateCode\":\"345\",\"opStateName\":\"揽收扫描配发\",\"logo\":\"邮政\"},{\"traceNo\":\"9858638312956\",\"opTime\":\"17:31\",\"opCode\":\"6\",\"opName\":\"运送中\",\"opDesc\":\"咸阳市，快件离开【咸阳市渭城镇揽投部】，正在发往【陕西省西安邮区中心草滩包件车间】\",\"opOrgProvName\":\"陕西省\",\"opOrgCity\":\"咸阳市\",\"opOrgCode\":\"71200124\",\"opOrgName\":\"咸阳市渭城镇揽投部\",\"nextOrgName\":\"陕西省西安邮区中心草滩包件车间\",\"nextOrgCode\":\"71000550\",\"operatorNo\":\"7120010316620\",\"operatorName\":\"万苗\",\"gis\":\"108.7686280,34.3684360\",\"notes\":\"揽投发运\",\"transportType\":\"1\",\"arrivalCity\":\"北京市\",\"timeLimit\":\"\",\"productName\":\"快递包裹\",\"bubbleTime\":\"2024-03-13 17:31\",\"isOne\":\"false\",\"traceType\":\"国内\",\"promisedArrivalTime\":\"\",\"opStateCode\":\"305\",\"opStateName\":\"揽投发运/封车\",\"logo\":\"邮政\"},{\"traceNo\":\"9858638312956\",\"opTime\":\"18:17\",\"opCode\":\"6\",\"opName\":\"运送中\",\"opDesc\":\"西安市，快件到达【陕西省西安邮区中心草滩包件车间】\",\"opOrgProvName\":\"陕西省\",\"opOrgCity\":\"西安市\",\"opOrgCode\":\"71000550\",\"opOrgName\":\"陕西省西安邮区中心草滩包件车间\",\"operatorNo\":\"XTZD\",\"operatorName\":\"系统自动\",\"gis\":\"108.8283230,34.3588910\",\"notes\":\"人工供包扫描\",\"arrivalCity\":\"北京市\",\"timeLimit\":\"\",\"productName\":\"快递包裹\",\"bubbleTime\":\"2024-03-13 18:17\",\"isOne\":\"false\",\"traceType\":\"国内\",\"promisedArrivalTime\":\"\",\"opStateCode\":\"954\",\"opStateName\":\"邮件到达处理中心\",\"logo\":\"邮政\"},{\"traceNo\":\"9858638312956\",\"opTime\":\"2024-03-13 21:11\",\"opCode\":\"6\",\"opName\":\"运送中\",\"opDesc\":\"西安市，快件离开【陕西省西安邮区中心草滩包件车间】，正在发往下一站\",\"opOrgProvName\":\"陕西省\",\"opOrgCity\":\"西安市\",\"opOrgCode\":\"71000550\",\"opOrgName\":\"陕西省西安邮区中心草滩包件车间\",\"nextOrgName\":\"北京市综合邮件处理中心大平面\",\"nextOrgCode\":\"10110300\",\"operatorNo\":\"02603103\",\"operatorName\":\"马仙\",\"gis\":\"108.8283230,34.3588910\",\"notes\":\"封车\",\"transportType\":\"1\",\"arrivalCity\":\"北京市\",\"timeLimit\":\"\",\"productName\":\"快递包裹\",\"bubbleTime\":\"2024-03-13 21:11\",\"isOne\":\"false\",\"traceType\":\"国内\",\"promisedArrivalTime\":\"\",\"opStateCode\":\"389\",\"opStateName\":\"处理中心封车\",\"logo\":\"邮政\"},{\"traceNo\":\"9858638312956\",\"opTime\":\"2024-03-14 23:54\",\"opCode\":\"6\",\"opName\":\"运送中\",\"opDesc\":\"北京市，快件到达【北京市综合快件处理中心大平面】\",\"opOrgProvName\":\"北京市\",\"opOrgCity\":\"北京市\",\"opOrgCode\":\"10110300\",\"opOrgName\":\"北京市综合邮件处理中心大平面\",\"operatorNo\":\"XTZD\",\"operatorName\":\"系统自动\",\"gis\":\"116.4608870,39.7375320\",\"notes\":\"分拣机供包扫描\",\"arrivalCity\":\"北京市\",\"timeLimit\":\"\",\"productName\":\"快递包裹\",\"bubbleTime\":\"2024-03-14 23:54\",\"isOne\":\"false\",\"traceType\":\"国内\",\"promisedArrivalTime\":\"\",\"opStateCode\":\"954\",\"opStateName\":\"邮件到达处理中心\",\"logo\":\"邮政\"},{\"traceNo\":\"9858638312956\",\"opTime\":\"01:22\",\"opCode\":\"6\",\"opName\":\"运送中\",\"opDesc\":\"北京市，快件离开【北京市综合快件处理中心大平面】，正在发往下一站\",\"opOrgProvName\":\"北京市\",\"opOrgCity\":\"北京市\",\"opOrgCode\":\"10110300\",\"opOrgName\":\"北京市综合邮件处理中心大平面\",\"nextOrgName\":\"北京市东城区直投中心揽投部\",\"nextOrgCode\":\"10000107\",\"operatorNo\":\"1011030040029\",\"operatorName\":\"(陇原)侯超\",\"gis\":\"116.4608870,39.7375320\",\"notes\":\"封车\",\"transportType\":\"1\",\"arrivalCity\":\"北京市\",\"timeLimit\":\"\",\"productName\":\"快递包裹\",\"bubbleTime\":\"2024-03-15 01:22\",\"isOne\":\"false\",\"traceType\":\"国内\",\"promisedArrivalTime\":\"\",\"opStateCode\":\"389\",\"opStateName\":\"处理中心封车\",\"logo\":\"邮政\"},{\"traceNo\":\"9858638312956\",\"opTime\":\"02:27\",\"opCode\":\"6\",\"opName\":\"运送中\",\"opDesc\":\"北京市，快件到达【北京市东城区直投中心揽投部】\",\"opOrgProvName\":\"北京市\",\"opOrgCity\":\"北京市\",\"opOrgCode\":\"10000107\",\"opOrgName\":\"北京市东城区直投中心揽投部\",\"operatorNo\":\"XTZD\",\"operatorName\":\"系统自动\",\"gis\":\"116.4260425,39.9072015\",\"notes\":\"分拣机供包扫描\",\"arrivalCity\":\"北京市\",\"timeLimit\":\"\",\"productName\":\"快递包裹\",\"bubbleTime\":\"2024-03-15 02:27\",\"isOne\":\"false\",\"traceType\":\"国内\",\"promisedArrivalTime\":\"\",\"opStateCode\":\"954\",\"opStateName\":\"邮件到达处理中心\",\"logo\":\"邮政\"},{\"traceNo\":\"9858638312956\",\"opTime\":\"06:20\",\"opCode\":\"6\",\"opName\":\"运送中\",\"opDesc\":\"北京市，快件离开【北京市东城区直投中心揽投部】，正在发往下一站\",\"opOrgProvName\":\"北京市\",\"opOrgCity\":\"北京市\",\"opOrgCode\":\"10000107\",\"opOrgName\":\"北京市东城区直投中心揽投部\",\"nextOrgName\":\"北京市东城区东四揽投部\",\"nextOrgCode\":\"10001010\",\"operatorNo\":\"00072082\",\"operatorName\":\"王刚\",\"gis\":\"116.4260425,39.9072015\",\"notes\":\"封车\",\"transportType\":\"1\",\"arrivalCity\":\"北京市\",\"timeLimit\":\"\",\"productName\":\"快递包裹\",\"bubbleTime\":\"2024-03-15 06:20\",\"isOne\":\"false\",\"traceType\":\"国内\",\"promisedArrivalTime\":\"\",\"opStateCode\":\"389\",\"opStateName\":\"处理中心封车\",\"logo\":\"邮政\"},{\"traceNo\":\"9858638312956\",\"opTime\":\"08:52\",\"opCode\":\"6\",\"opName\":\"运送中\",\"opDesc\":\"北京市，快件到达【北京市东城区东四揽投部】\",\"opOrgProvName\":\"北京市\",\"opOrgCity\":\"北京市\",\"opOrgCode\":\"10001010\",\"opOrgName\":\"北京市东城区东四揽投部\",\"operatorNo\":\"00070429\",\"operatorName\":\"施涛\",\"gis\":\"116.4183760,39.9240180\",\"notes\":\"\",\"arrivalCity\":\"北京市\",\"timeLimit\":\"\",\"productName\":\"快递包裹\",\"bubbleTime\":\"2024-03-15 08:52\",\"isOne\":\"false\",\"traceType\":\"国内\",\"promisedArrivalTime\":\"\",\"opStateCode\":\"306\",\"opStateName\":\"揽投解车\",\"logo\":\"邮政\"},{\"traceNo\":\"9858638312956\",\"opTime\":\"08:57\",\"opCode\":\"11\",\"opName\":\"派送中\",\"opDesc\":\"北京市，快件正在派送中，请耐心等待，保持电话畅通，准备签收，如有疑问请电联快递员【施涛，电话:13501298504】或揽投部【电话:010-65285540】，投诉请致电11183。\",\"opOrgProvName\":\"北京市\",\"opOrgCity\":\"北京市\",\"opOrgCode\":\"10001010\",\"opOrgName\":\"北京市东城区东四揽投部\",\"operatorNo\":\"00070429\",\"operatorName\":\"施涛\",\"operatorPhone\":\"13501298504\",\"gis\":\"116.4183760,39.9240180\",\"notes\":\"\",\"arrivalCity\":\"北京市\",\"timeLimit\":\"\",\"deliveryUserPhone\":\"13501298504\",\"deliveryUserName\":\"施涛\",\"productName\":\"快递包裹\",\"bubbleTime\":\"2024-03-15 08:57\",\"isOne\":\"false\",\"traceType\":\"国内\",\"promisedArrivalTime\":\"\",\"opStateCode\":\"702\",\"opStateName\":\"投递邮件接收-下段\",\"logo\":\"邮政\"},{\"traceNo\":\"9858638312956\",\"opTime\":\"2024-03-15 12:42\",\"opCode\":\"18\",\"opName\":\"已签收\",\"opDesc\":\"北京市，您的快件已代签收【家门口】，如有疑问请电联快递员【施涛，电话:13501298504】。连接美好，无处不在，感谢您使用中国邮政，期待再次为您服务。\",\"opOrgProvName\":\"北京市\",\"opOrgCity\":\"北京市\",\"opOrgCode\":\"10001010\",\"opOrgName\":\"北京市东城区东四揽投部\",\"operatorNo\":\"00070429\",\"operatorName\":\"施涛\",\"operatorPhone\":\"13501298504\",\"gis\":\"116.4183760,39.9240180\",\"notes\":\"已签收,家门口\",\"arrivalCity\":\"北京市\",\"timeLimit\":\"\",\"deliveryUserPhone\":\"13501298504\",\"deliveryUserName\":\"施涛\",\"delivererCity\":\"咸阳市\",\"receiverCity\":\"北京市\",\"delivererProvince\":\"陕西省\",\"receiverProvince\":\"北京市\",\"productName\":\"快递包裹\",\"timeDifference\":\"耗时2天5小时\",\"bubbleTime\":\"2024-03-15 12:42\",\"signForTime\":\"false\",\"isOne\":\"false\",\"traceType\":\"国内\",\"storageName\":\"已签收\",\"promisedArrivalTime\":\"\",\"deliverState\":\"161\",\"opStateCode\":\"704\",\"opStateName\":\"投递结果反馈-妥投\",\"logo\":\"邮政\",\"receiptFlag\":\"\",\"oneBillFlag\":\"0\",\"detailOpTime\":\"2024-03-15 12:42:20\",\"detailOpOrgName\":\"北京市东城区东四揽投部\",\"detailOperatorName\":\"施涛\",\"businessUni\":\"速递\",\"ecommerceNo\":\"\",\"transferType\":\"1\"}],\"courierInfoDto\":{\"name\":\"王航\",\"phone\":\"18668611117\",\"deliveryUserCode\":\"7120012420246\"},\"postman\":{\"name\":\"施涛\",\"phone\":\"13501298504\",\"deliveryUserCode\":\"00070429\"}}],\"senderLatitude\":\"34.367705\",\"receiverLatitude\":\"39.92017\",\"senderLongitude\":\"108.671436\",\"receiverLongitude\":\"116.43142\"},\"message\":\"[\\\"1\\\",\\\"a\\\"]\"}",
//     "current": "0",
//     "_$rc": "N5GvQCPK6tE.yPJcruPtA.MvL6ZThVAFERYFOcNutf4GELVXCq6YlpyWhLEnulShrORWEK8VWbDeMsqli4rzOekAITUzToeaoyM7BYG5wsAH_IO5twdTP2_7ajQmeTg52hRfLgd7rGQHJxdPaJpG_iE03HN2w3RINyExB6byYIxwNIUynm.UM0bFP0L9bUlhAOQZTjyxOIMutEA6iPAmpJ2CxY8gMz6iV1E77NwRmpJlxYDB5.F587VtOmKr.Cpn2BkQCGSvtNSq4SOh4_sgaLPy4NDnvF39yvB26trcCKHQMC.zkl3qDhNJm7Sc_vfEcpGb2CIIV3iUZGb.yJuGndemlxoQN18keEOtVt6twobI3Qwz_m62dJS2Zkvff1NaHU2CXCGQYi.0tYpFShxLkNg8.Yfb_eV0HNf0lH8gnAismyFqxWT.g.rBwZDWeDyzxoCB_9n24ulr5JpApcKm4uqgRJ5KnxcKwRjpMV4KEzEM9tpM3F6OvcQ7DULpyMzwMTKmXqoe5nR5KxhQPDdh69O9R4YuKVv3USnxVCbpy0J5xkPbbuYijj052nMnI.GUt8sq6QaLwxyZzTmxr5QEVn9fGzCHEeJ.0.9jJ.sKHgZuq3rB4wdiG.OAE1dva7fWDXQZIX7a_2TFVP7PcbES_tyZBJjrwrnxKQbqL.a1PlZ.NX56SPQ8iS22iw1w16MUqRYTWWPLK.40r41TE8KsnqcWXtuG85hnwtV6xPwGCCPd.5GybVvVC7Z9u9HOox8WiWZpuG",
//     "phone": "",
//     "$_YWTU": "uLQjrzV6DR0sURAjed5zOb1_ZTVHrYXHSXGLgqG3wtZ"
// }
navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion:"5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    webdriver: false,
    connection: {
        downlink: 10,
        effectiveType: "4g",
        onchange: null,
        rtt: 50,
        saveData: false,
    },
    // cpuClass:"x86",
    platform:"Win32",
    language:"zh-CN",
    languages:['zh-CN', 'zh', 'en', 'zh-TW'],
    userAgent:"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    vendor:"Google Inc.",
    getBattery:function (){
        return 'getBattery() { [native code] }'
    },
    standalone:undefined

}
navigator.webkitPersistentStorage = {}
// navigator.battery = undefined
history = {
    length:2,
    scrollRestoration:"auto",
    state:null,
    replaceState:function (){
        return 'replaceState() { [native code] }'
    }
}
window.history = history
screen = {}
window.screen = screen
window.fetch = function fetch(){
    debugger;
    return {}
};
window.Request = _xl
window.indexedDB = {}
documentElement = {
    addEventListener: addEventListener,
    style:{}
}
document.documentElement = documentElement
getElementById = _xl
document.exitFullscreen = _xl
document.getElementById = getElementById
HTMLFormElement = function () {
    this.init();
    return this.json;
}
window.HTMLFormElement = HTMLFormElement
window.openDatabase = function openDatabase(dbname,version,description,dbsize,dbcallback){
    debugger;
    return {
        version:version
    }
};
window.devicePixelRatio = 1
document.createEvent = function (){
    return {}
}
// document.body = {scrollLeft:0, scrollTop:0, clientLeft:0, clientTop:0}
document.createExpression = function (){}
// delete navigator.getBattery;
// navigator.getBattery = undefined;
//
// window.clientInformation = navigator;

window = new Proxy(window, {
    set(target, property, value, receiver) {
        console.log("设置属性set window", property, typeof value);
        return Reflect.set(...arguments);
    },
    get(target, property, receiver) {
        console.log("获取属性get window", property, typeof target[property]);
        return target[property]
    }
});
document = new Proxy(document, {
    set(target, property, value, receiver) {
        console.log("设置属性set document", property, typeof value);
        return Reflect.set(...arguments);
    },
    get(target, property, receiver) {
        console.log("获取属性get document", property, typeof target[property]);
        return target[property]
    }
});
navigator = new Proxy(navigator, {
    set(target, property, value, receiver) {
        console.log("设置属性set navigator", property, typeof value);
        return Reflect.set(...arguments);
    },
    get(target, property, receiver) {
        console.log("获取属性get navigator", property, typeof target[property]);
        return target[property]
    }
});
location = new Proxy(location, {
    set(target, property, value, receiver) {
        console.log("设置属性set location", property, typeof value);
        return Reflect.set(...arguments);
    },
    get(target, property, receiver) {
        console.log("获取属性get location", property, typeof target[property]);
        return target[property]
    }
});
history = new Proxy(history, {
    set(target, property, value, receiver) {
        console.log("设置属性set history", property, typeof value);
        return Reflect.set(...arguments);
    },
    get(target, property, receiver) {
        console.log("获取属性get history", property, typeof target[property]);
        return target[property]
    }
});
screen = new Proxy(screen, {
    set(target, property, value, receiver) {
        console.log("设置属性set screen", property, typeof value);
        return Reflect.set(...arguments);
    },
    get(target, property, receiver) {
        console.log("获取属性get screen", property, typeof target[property]);
        return target[property]
    }
});
// canvas = new Proxy(canvas, {
//     set(target, property, value, receiver) {
//         console.log("设置属性set canvas", property, typeof value);
//         return Reflect.set(...arguments);
//     },
//     get(target, property, receiver) {
//         console.log("获取属性get canvas", property, typeof target[property]);
//         return target[property]
//     }
// });
form =  new Proxy(form, {
    set(target, property, value, receiver) {
        console.log("设置属性set form", property, typeof value);
        return Reflect.set(...arguments);
    },
    get(target, property, receiver) {
        console.log("获取属性get form", property, typeof target[property]);
        return target[property]
    }
});
meta = new Proxy(meta, {
    set(target, property, value, receiver) {
        console.log("设置属性set meta", property, typeof value);
        return Reflect.set(...arguments);
    },
    get(target, property, receiver) {
        console.log("获取属性get meta", property, typeof target[property]);
        return target[property]
    }
});
var content = "arg1_content";

"ts_js";

"arg2_js";


function get_cookie(){
    return document.cookie;
}
console.log(get_cookie())
