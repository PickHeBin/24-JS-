//  检测当前执行的文件是哪一个
delete __filename
delete __dirname

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

proxy_array = ['window', 'document', 'location', 'navigator', 'history', 'screen', 'aaa', 'target']
window = global
window.top = window
window.$_ts = []
window.addEventListener = function (res) {
    console.log('window中addEventListener获取的值：', res)
}
window.attachEvent = function (res) {
    console.log('window中attachEvent获取的值：', res)
}
window.XMLHttpRequest = function (res) {
    console.log('window中XMLHttpRequest获取的值：', res)
}
window.DOMParser = function (res) {
    console.log('window中DOMParser获取的值：', res)
}
window.localStorage={
    "__#classType": "localStorage",
    removeItem:function(res){console.log('window.removeItem:',res);},
    getItem:function(res){
        console.log('window.getItem:',res);
        if (res === '_$rc') {
            return 'FZyk8PJEjyyuJO_L4ro49r9S1e9DugNeL2MdvxoM4RnU8yeouOfSYTN8aTq'
        }
    },
    length:1
}
window.sessionStorage={length:0}
window.sessionStorage.getItem=function(res){console.log('window.getItem:',res);}
window.name = ''
window.indexedDB = {}
window.self = window
window.chrome = {
    "app": {
        "isInstalled": false,
        "InstallState": {
            "DISABLED": "disabled",
            "INSTALLED": "installed",
            "NOT_INSTALLED": "not_installed"
        },
        "RunningState": {
            "CANNOT_RUN": "cannot_run",
            "READY_TO_RUN": "ready_to_run",
            "RUNNING": "running"
        }
    }
}
window.open = function (res) {
    console.log('window中open获取的值：', res)
}
window.webkitRequestFileSystem = function (res) {
    console.log('window中webkitRequestFileSystem获取的值：', res)
}
// window.MutationObserver = function (res) {
//     console.log('window中MutationObserver获取的值：', res)
// }
window.clientInformation = {}
window.HTMLFormElement = function (res) {
    console.log('window中HTMLFormElement获取的值：', res)
}



meta={
    0:{
        httpEquiv:"Content-Type",
        content:"text/html; charset=utf-8"
    },
    1:{
        getAttribute:function(res){
            console.log('meta.getAttribute:',res);
            if (res=='r') {
                return 'm'
            }
        },
        content:"content_data",
        parentNode:{
            removeChild:function(res){
                console.log('meta.removeChild:',res);
            }
        }
    },
    length:2
}
script={
    0:{
        getAttribute:function(res){
            console.log('script.getAttribute:',res);
            if (res=='r') {
                return 'm'
            }
        },
        parentElement:{
            removeChild:function(res) {
                console.log('script.removeChild:',res);
            }
        }
    },
    1:{
        getAttribute:function(res){
            console.log('script.getAttribute:',res);
            if (res=='r') {
                return 'm'
            }
        },
        parentElement:{
            removeChild:function(res) {
                console.log('script.removeChild:',res);
            }
        }

    },
    length:2
}
i = {length:0}
div = {
    getElementsByTagName: function (res) {
        if (res === 'i') {
            return i
        }
    }
}

a={
    href: 'https://kscd.zking.com/app/vehicle/proposal/commonlogin?redirect=%2Findex'
}
// document


var v_saf;!function(){var n=Function.toString,t=[],i=[],o=[].indexOf.bind(t),e=[].push.bind(t),r=[].push.bind(i);function u(n,t){return-1==o(n)&&(e(n),r(`function ${t||n.name||""}() { [native code] }`)),n}Object.defineProperty(Function.prototype,"toString",{enumerable:!1,configurable:!0,writable:!0,value:function(){return"function"==typeof this&&i[o(this)]||n.call(this)}}),u(Function.prototype.toString,"toString"),v_saf=u}();


var v_new_toggle = true
var v_console_log = function(){if (!v_new_toggle){ v_console_logger.apply(this, arguments) }}
MutationObserver = v_saf(function MutationObserver(){if (!v_new_toggle){ throw TypeError("Illegal constructor") };})
Object.defineProperties(MutationObserver.prototype, {
  observe: {value: v_saf(function observe(){v_console_log("  [*] MutationObserver -> observe[func]", [].slice.call(arguments));})},
  [Symbol.toStringTag]: {value:"MutationObserver",writable:false,enumerable:false,configurable:true},
})

document = {
    createElement: function (res) {
        console.log('document中createElement获取的值：', res)
        if (res === 'div'){
            return div
        }
        if (res === 'a') {
            return a
        }
        if (res === 'form') {
            return {}
        }
    },
    appendChild: function (res) {
        console.log('document中appendChild获取的值：', res)

    },
    removeChild: function (res) {
        console.log('document中removeChild获取的值：', res)

    },
    getElementsByTagName: function (res) {
        console.log('document中getElementsByTagName获取的值：', res)
        if (res === 'script'){
            return script
        }
        if (res === 'meta'){
            return meta
        }
        if (res === 'base') {
            return {length:0}
        }
    },
    getElementById: function (res) {
        console.log('document中getElementById获取的值：', res)
        if (res ==='root-hammerhead-shadow-ui') {
            return null
        }
        else {
            return  null
        }
    },
    visibilityState: 'visible',
    documentElement: {},
    createExpression: function (res) {
        console.log('document中createExpression获取的值：', res)
        if (res === '//html'){
            return {}
        }
        else {
            return {}
        }
    },
    addEventListener: function (res) {
        console.log('document中addEventListener获取的值：', res)
    },
    cookie:'',
}
// location
location = {
    "ancestorOrigins": {},
    "href": "https://kscd.zking.com/app/vehicle/proposal/commonlogin?redirect=%2Findex",
    "origin": "https://kscd.zking.com",
    "protocol": "https:",
    "host": "kscd.zking.com",
    "hostname": "kscd.zking.com",
    "port": "",
    "pathname": "/app/vehicle/proposal/commonlogin",
    "search": "?redirect=%2Findex",
    "hash": ""
}

// navigator
navigator = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
    webkitPersistentStorage: {},
    languages: [
    "zh-CN",
    "zh"
],
    getBattery: function (res) {
        console.log('navigator中getBattery获取的值：', res)

    },
    connection: {},
    mimeTypes: {
    "0": {},
    "1": {},
     length: 2
}
}

setInterval=function(){}
setTimeout=function(){}
get_enviroment(proxy_array)
func_code


js_code




function get_cookie() {
    return document.cookie
}

console.log(document.cookie)

