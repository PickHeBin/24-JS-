// function get_enviroment(proxy_array) {
//     for(var i=0; i<proxy_array.length; i++){
//         handler = '{\n' +
//             '    get: function(target, property, receiver) {\n' +
//             '        console.log("方法:", "get  ", "对象:", ' +
//             '"' + proxy_array[i] + '" ,' +
//             '"  属性:", property, ' +
//             '"  属性类型:", ' + 'typeof property, ' +
//             '"  属性值:", ' + 'target[property], ' +
//             '"  属性值类型:", typeof target[property]);\n' +
//             '        return target[property];\n' +
//             '    },\n' +
//             '    set: function(target, property, value, receiver) {\n' +
//             '        console.log("方法:", "set  ", "对象:", ' +
//             '"' + proxy_array[i] + '" ,' +
//             '"  属性:", property, ' +
//             '"  属性类型:", ' + 'typeof property, ' +
//             '"  属性值:", ' + 'target[property], ' +
//             '"  属性值类型:", typeof target[property]);\n' +
//             '        return Reflect.set(...arguments);\n' +
//             '    }\n' +
//             '}'
//         eval('try{\n' + proxy_array[i] + ';\n'
//         + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}catch (e) {\n' + proxy_array[i] + '={};\n'
//         + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}')
//     }
// }
// proxy_array = ['window','document','navigator','location']

delete __filename;
delete __dirname;
window = globalThis;
window.name = '$_YWTU=.vVfQFOW.e9FM_FHJ4ionks5z9jLraRRjuUWh6a9wmV&$_cDro=355&vdFm='
window.indexedDB = {}
window.openDatabase = function openDatabase(dbname,version,description,dbsize,dbcallback){
    debugger;
    return {
        version:version
    }
};
_window = {
    $_ts:[],
    // eval: function (str) {
    //     debugger;
    //     return globalThis.eval(str);
    // },
    webkitRequestFileSystem:function(type, size, successCallback, errorCallback){
        debugger;
        return {
            name: "http_www.fangdi.com.cn_0:Temporary",
            root: {
                fullPath: "/",
                isDirectory: true,
                isFile: false,
                name: ""
            }
        };
        // 理论上是按以下写法
        // return successCallback({
        //     name: "http_www.fangdi.com.cn_0:Temporary",
        //     root: {
        //         fullPath: "/",
        //         isDirectory: true,
        //         isFile: false,
        //         name: ""
        //     }
        // });
    }
}
var content = "gONly8HpM5vaMqWwpnCYB0PYeIkDf4Rb6IgT8DB3vfVIIzUqrZiAgDuVynE8UX.tUhxZhy02h8Z"

window.top = window
_xl = function (){
    console.log(arguments)
}
window.PointerEvent = _xl
location = {
    "ancestorOrigins": {},
    "href": "https://www.chinastock.com.cn/newsite/investor/subprimeAnnc.html",
    "origin": "https://www.chinastock.com.cn",
    "protocol": "https:",
    "host": "www.chinastock.com.cn",
    "hostname": "www.chinastock.com.cn",
    "port": "",
    "pathname": "/newsite/investor/subprimeAnnc.html",
    "search": "",
    "hash": ""
}
window.location = location
window.setTimeout = function setTimeout() {
    debugger;
    // x可能是方法也可能是文本
    // typeof (x) == "function" ? x() : undefined;
    // typeof (x) == "string" ? eval(x) : undefined;
    // 正确应该 生成UUID，并且保存到内存
    return 123;
};
window.setInterval = function setInterval() {
    debugger;
    // x可能是方法也可能是文本
    // typeof (x) == "function" ? x() : undefined;
    // typeof (x) == "string" ? eval(x) : undefined;
    // 正确应该 生成UUID，并且保存到内存
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
document = {
    characterSet:'UTF-8',
    charset:'UTF-8',
    // scripts: ['script','script']
}
div = {
    getElementsByTagName:function (val){
        if (val === 'i'){
            return {length:0}
        }
    }
}
form = {

}
a = {

}
createElement = function (val){
    console.log('调用createElement', val)
    if (val === 'div'){
        return div
    }
    if (val === 'form'){
        return form
    }
    if (val === 'a'){
        return a
    }
}
document.createElement = createElement
document.appendChild = _xl
document.removeChild = _xl
window.ActiveXObject = undefined
window.msCrypto = undefined
window.fetch = function fetch(){
    debugger;
    return {}
};
window.DOMParser = function () {
    return 123;
};
addEventListener = _xl
window.addEventListener = addEventListener
localStorage = {
    "$_YVTX": "WsE",
    "_$rc": "KPplDkeor7O7tjYkB7hL3tWm9UWL7Nn.7jzh_RGsED8_r9doCJttj7IkEfePaTzC21MiBh6..GmY1wOY6ReMAUHf0xze0dDEkAkFMPGgFvWziSjKsRrg13d.6jQj8aW.SAgZ19Fxa_hR0l4XezZASLAcEkW5dyK1ZIKFxbOWybsv511bY6pYMwIP_mRyh6FPeiQkQubej_qeROnDcvQSHTNfMChgLc9br0WLDDrp_ZNR08EPcm4Az1s0BqhAJQ.DWqqbVOkZX.cUMXsd42J4YUOMg1_LIpX9ZWK38sVQzpEpx8bTVtt6.N_w10.rryI2rmVDRwRtKz8XiOp3GoRc.JKpFpcze5QXp13zsqxPFP1yHPOCUl_S2IJzfIor9LW8cA2NMcYqTTw5v_peRH1FmbJPXAvaX4MkjBkkTLLfT.pD_N_ZArTe5fIyqlevrC.jhkNJn9VTXG6O1oTfDJaPrWnRD5TS0KDNCF6kt1Z1CIJUL7HtUjFxQmH.pylChSzFGPraYq9r9oO7WELlaiV4Vr0HZ1r5ar87ZWQeJIcnfjUW1ahsH7rCsgC2f9u5WUoKEWt1ar4EOhZ1HLt_yBHCWfwaF4W69pjsb0Qz5ogQ_q3JrzwWKd9LFEVZ.E6vn2FMqU.KhnJ1DIozgHjDTCIpSQPibHfvc7jDy08T.2NFykoqN6QcOqbu8.ONMyFWH9vg2gwzld38Wa2R8q2WykoExqHQams8IBBTpsAWmcq0x0rGS9JeikPRQ4zDCOKlKvvtgAEIPld_1viphbgb",
    "__#classType": "localStorage",
    "$_YWTU": "zZU9rDO4KSnYuc0AygQXOHjB9Mn4rPKWoUa4pL3lGs7"
}
getElementsByTagName = function (val){
    console.log('调用getElementsByTagName', val)
        return [
            {
                content:content,
                parentNode:{
                    removeChild:function (){}
                },
                parentElement : {
                     removeChild:function (){}
                }
            },
            {
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
    // 要扣代码 里面会有的
    console.log('getAttribute', arguments)
	if(val === 'r') {
		return 'm';
	}
}
navigator = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    languages: ["zh-CN", "zh"],
    appVersion: "5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
    webdriver: false,
    appName: "Netscape",
    vendor: "Google Inc.",
    connection:  {
        downlink: 10,
        effectiveType: "4g",
        rtt: 200,
        saveData: false,
    }
}
navigator.webkitPersistentStorage = {}
documentElement = _xl
document.documentElement = documentElement
getElementById = _xl
document.exitFullscreen = _xl
document.getElementById = getElementById
sessionStorage = localStorage
HTMLFormElement = function () {
    this.init();
    return this.json;
}
window.HTMLFormElement = HTMLFormElement
window.chrome = {};
// get_enviroment(proxy_array)

$_ts=window['$_ts'];if(!$_ts)$_ts={};$_ts.nsd=22424;$_ts.cd="qhldrpAlE13okPElxGEiEGWbqqVmxGQiEGA1qc3mxGEimP3qxGlaEaGlHc3ckPEkcaqbqc3rkf3hqkl3c13okPElcaqbr13ckf3dqc3rWcWxrcWhqc3mxGEika7qxGqbqAgKcaqbrn3lkGZhqc3cxGWimP3qEaLloc3MkPEkxGliEGEbrqgPrA7qWpGhxGQiEGAbr1Whrr7hqkZqxGlimG7qxGQbrqgKcaqbqP3kiS3bqcW2vGlTWqElWOK8E0qA28szDFc5B7otLgujyAjg.IMwXr3I8vn4Ne1kzHA4qaVurGArvnacKT2exOspRkEjJCmWQQ94W2rNImJ34kQaIlV9H2.awbeLhbfSMIEBMUmXFPfB_CeBtDSuFDCnMURLM27LEezNKOmpMllT4swmWUzlM0hA10p0W0lbiZYzwbfXtbN0ZbZBFvwjFc6awbeLhbfSMIEBMUmXF29zBlYNFVRnQ6IUAKpsiTpGFiQn1urKV0VONmfzQKyjtDd.MCZLMoJLMMxzwbfXtbN0ZbZBFvwjFmnnEYR6M0yMKJN2Q2YWIlr9N0eSKuY7UDcZiYfjwCNLhIrCMCGXFomzZPezQKyjtDd.MCZLMoJLMQWBEKauU6YV.2NPQ2Qn10saMCTGAKYYYHZfiYe7QCfz7bTCFDgjFvsnMnejwCNLhIrCMCGXFomzZ2gBxvwAFTUYVCgT12eHV7ysJ6gSRUpg7oEfH22LQK6nhCTSMbLLM5zBMnf7QCfz7bTCFDgjFvsnMTyyhbfSMIx8cAs3WbzT5V2uJuQeFC4nYoN7Y00dAB2CM0S2Wlq_jKe9WCSmMO82MbeeiCr1KeqgW9mgY9JCumR7YKJpHCODFm2.MmYLRzTfVOe6QYmlybyWWUwrsvX219g0FmwBwwWTpYwstkECjsxPWu3LMvt2MkNmYbW6iIwn3KyjtkECjsxPWu3LMvt2MmpnYYSEYFRlMoRNHVySuuwn1kJkJvMoVufnAYSaFBmNKbJswUE_nTY2YspPFD.hJmJ5hkquJjePJkq7MoQ_uVYiVkzip0M6K9SphkquJjePJkq7MoQrvGWcJqEoJADWF6waQOaTWj90WkA4JkaCNk7urqAaWuFB3OAlqsQnWygxWOA_JsVCNuW6JqEcWkDvJAWVtPStKTKjIZElc1Dt7BLHhaEKdwOsAU.zncQmvy0qra3lqGAfjPtJiWdpgL1K2OQ9_cMDxaxWtvISVjrITjiIOtjzTK58cOlSJsqaJt9_iaAkJaAh.uV4JOVSHkbNWGWBWoy58IR6p6A_3YJl4Ke_QYpx16bb1KSmAYmwQ7a48VQ6Ulw2elTlVCe.JqD8qaEaqGQ0qRZ0qBZTIcfGdCqBRKe0tDkzMPe2wDZL3deLhCROQPfOZ6WBRbzLtDtn3DxbhbY6Q.xGQoEXRKz77bruwcyPRUKnRCeLhbx.3.xvMoqX3bzPyPebIDQj3K4jhCYL3nNPMI0BRKz7tbxX_Pe2FCSntDM_31eOFCqLRXABRDSztbSz4Pe.woEjMoUehCNvM1NzMdQBFbN9tbTB41ejwC0jMvtnFKxChbS0R.xNQCm2tbynZK0BMbJaR16nFblLMb2OhIJPQnfBMCqzZ6W6tDeCR16uJCELM636hIJuRcfBMUEzZCSvtDeNQP6uFbgLM6R0hIJaFPfBwbmb7bSfMPyNR6bnMDpOhb2L34x7MClXFUrv7vJ_toxdRn6X3vqLQbmNh8yuMPfnwvQz4vJ6toxP3P6XQ6wZhvRjR.xuFbQXwbfL7vJa3cy6MK8nQvwZhvp2h8SXh6ROFnfuZ6YftorO3n67RvqLQoxPh8SPQ1fSF1fndDZBwCp5tohN3Pe6wKqLQXf9h6w4w1fTd6lBQDJZtoU6R1eaFCrPh8N7QURvFoqz_vz6toRn3P6LQDQLwoY6h8fawcf0Ibqz_KS23PySFCIgW1euM6qLwBJPh6JOQcfC4vqBIDr.tovXMPeZMvVL8Ixa8nf_wKGzybyBtoGjIbOXhCx0F1N0MIwawnf.wbVrvGWoKnRGJADFUcwMFA3qU.N9RAADK1r8_aWrJsLDrO1NqaET";if($_ts.lcd)$_ts.lcd();

require('./67111a74')
// "ts_js"

function get_cookie(){
    return document.cookie
}

console.log(document.cookie);
