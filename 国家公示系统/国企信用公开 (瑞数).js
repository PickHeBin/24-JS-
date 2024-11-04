delete __dirname
delete __filenam

 // 添加 他会导致返回 400
// document.__webdriver_evaluate = function (res) {
//     console.log('document中的exitFullscreen接受的值:', res)
// }


content='content_code'
function get_enviroment(proxy_array) {
    for (var i = 0; i < proxy_array.length; i++) {
        handler = '{\n' +
            '    get: function(target, property, receiver) {\n' +
            '        console.log("方法:", "get  ", "对象:", ' +
            '"' + proxy_array[i] + '" ,' +
            '"  属性:", property, ' +
            '"  属性类型:", ' + 'typeof property, ' +
            // '"  属性值:", ' + 'target[property], ' +
            '"  属性值类型:", typeof target[property]);\n' +
            '        return target[property];\n' +
            '    },\n' +
            '    set: function(target, property, value, receiver) {\n' +
            '        console.log("方法:", "set  ", "对象:", ' +
            '"' + proxy_array[i] + '" ,' +
            '"  属性:", property, ' +
            '"  属性类型:", ' + 'typeof property, ' +
            // '"  属性值:", ' + 'target[property], ' +
            '"  属性值类型:", typeof target[property]);\n' +
            '        return Reflect.set(...arguments);\n' +
            '    }\n' +
            '}'
        eval('try{\n' + proxy_array[i] + ';\n'
            + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}catch (e) {\n' + proxy_array[i] + '={};\n'
            + proxy_array[i] + '=new Proxy(' + proxy_array[i] + ', ' + handler + ')}')
    }
}
proxy_array = ['window', 'document', 'location', 'navigator', 'history', 'screen']

//  window 补环境的位置
window = global;
window.top = window;
window.ActiveXObject=undefined
// window.__proto__ = window.prototype; // 暂时还未检测原型链

window.addEventListener = function (res1, res2,res3,) {
    console.log('window中的addEventListener接受的值:', res1, res2,res3)
}
setInterval = function () {}
setTimeout = function () {}

// 这是document的环境
div = {
    getElementsByTagName: function (res) {
        console.log('div中的getElementsByTagName接受的值:', res)
        if (res == "i"){
            return {length: 0}
        }
    },
    length: 0
}
script = {
    "0": {
        getAttribute: function (res) {
            if (res === "r") {
                return "m"
            }
        },
        parentElement: {
            removeChild: function (res) {
                console.log(res)
            }
        }
    },
    "1": {
        getAttribute: function (res) {
            if (res === "r") {
                return "m"
            }
        },
        parentElement: {
            removeChild: function (res) {
                console.log(res)
            }
        }
    },
    // length: 2   // 不要加长度
}
meta = [
    {
        "http_equiv":"Content-Type",
        getAttribute: function (res) {
            console.log('meta中getAttribute接收到的参数为：', res)
            if (res === "r") {
                return "m"
            }
        },
        content: 'text/html; charset=utf-8'
    },
    {
        "http_equiv":"Content-Type",
        getAttribute: function (res) {
            console.log('meta中getAttribute接收到的参数为：', res)
            if (res === "r") {
                return "m"
            }
        },
        content: content,
        parentNode: {
            removeChild: function (res) {
                console.log('meta中parentNode中removeChild所接受的参数为：')
            }
        }
    }
]
base = {
    length: 0
}

document = {
    createElement: function (res) {
        console.log('document中的createElement接受的值:', res)
        if (res == "div"){
            return div
        } else {
            return []
        }
    },
    getElementsByTagName: function (res) {
        console.log('document中的getElementsByTagName接受的值:', res)
        if (res == "script"){
            return script
        } else if (res == "meta"){
            return meta
        } else if (res == "base"){
            return base
        }
    },
    getElementById: function (res) {
        console.log('document中的getElementById接受的值:', res)
        if (res=='root-hammerhead-shadow-ui') {
            return null
        }
    },
    addEventListener: function (res) {
        console.log('document中的addEventListener接受的值:', res)
    },
    appendChild: function (res) {
        console.log('document中的appendChild接受的值:', res)
    },
    removeChild: function (res) {
        console.log('document中的removeChild接受的值:', res)
    },
    documentElement: {
        addEventListener: function (res) {
            console.log('documentElement中的addEventListener接受的值:', res)
        }
    },
    createExpression:function(res){
        console.log('document.createExpression:',res);
        if (res=='//html') {
            return {}
        }
    },
    cookie:'',
}

navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0",
} // navigator 未检测

location = {
    "ancestorOrigins": {},
    "href": "https://www.gsxt.gov.cn/index",
    "origin": "https://www.gsxt.gov.cn",
    "protocol": "https:",
    "host": "www.gsxt.gov.cn",
    "hostname": "www.gsxt.gov.cn",
    "port": "",
    "pathname": "/index",
    "search": "",
    "hash": ""
}


get_enviroment(proxy_array)

// _$bw[_$fn]


'ts_code'


'functo_code'


function rs6(){
    return document.cookie;
}


console.log(rs6())



