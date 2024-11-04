// 第1个加载     window 和 memory 这2个是框架中是最重要的  !!!!!!!!!!!!!!!!!!
//加载全局window变量
try{
    window = global;
}catch{
    window = this;
}
//JSON.stringify([window.byd++,_$$3,_$i6],function(k,v){if(!Array.isArray(v) && typeof(v)=='object'){return v+''}else{return v}})
// 全局存储器
memory  = {
    'setProxy': false,                                       // 是否进行代理(代理的对象是补的环境对象的每一个对象)
    'setLog':true,                                          // 是否输出 set捕获的日志
    'getLog': true,                                          // 是否输出 get捕获的日志
    'setDebugger': false,                                    // 是否断点 set捕获
    'getDebugger':false,                                     // 是否断点 get捕获
    'funTostringDebugger':false,                             // 函数tostring检测  正常代码谁toString啊
    'callFunDebugger': false,                                // 调用了补的函数是否断点
    'node':[],                                               // 存放运行中window的undefined变量  最后直接去node遍历里面输出是否undefined 突破node检测
    'nodes':{},                                              // 存放undefined
    'order':0,                                               // 日志的输出排序号码 (便于查看位置)
    'log':0,                                                 // 插桩输出序号定位
    'passOrder':0 ,                                          // 跳过低于这个序号的代理断点
    'random':false,                                            // hook随机数
    'timestamp': false,                              // hooks时间戳
    'data':{},                                               // 存放本地模拟的对象
    'cookies': {},                                           // 存放cookie
    'EventListener':{},                                      // 存放事件
    'attachEvent': {},                                       // 存放事件
    'create_element': {},                                    // 存放创建dom的元素方法
    'objects': {},                                           // 存放一些对象
    'domElement' : {'body':{}},                              // 存放html的dom层级关系
    'promise':{},
    'tree':{},
    'neihe_data': "Google Inc. (NVIDIA)",
    'xianka_data': "ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Laptop GPU Direct3D11 vs_5_0 ps_5_0, D3D11)",
    'userAgent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    'canvas_toDataURL': 'data:image/png;base64,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',
    'canvas_toDataUrl_1':'data:image/png;base64,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',
    'SupportedExtensions':["ANGLE_instanced_arrays","EXT_blend_minmax","EXT_color_buffer_half_float","EXT_float_blend","EXT_frag_depth","EXT_shader_texture_lod","EXT_texture_compression_bptc","EXT_texture_compression_rgtc","EXT_texture_filter_anisotropic","EXT_sRGB","OES_element_index_uint","OES_fbo_render_mipmap","OES_standard_derivatives","OES_texture_float","OES_texture_float_linear","OES_texture_half_float","OES_texture_half_float_linear","OES_vertex_array_object","WEBGL_color_buffer_float","WEBGL_compressed_texture_astc","WEBGL_compressed_texture_etc","WEBGL_compressed_texture_etc1","WEBGL_compressed_texture_s3tc","WEBGL_compressed_texture_s3tc_srgb","WEBGL_debug_renderer_info","WEBGL_depth_texture","WEBGL_draw_buffers","WEBGL_lose_context","WEBGL_multi_draw"],
    'plugins' : ["PDF Viewer","Chrome PDF Viewer","Chromium PDF Viewer","Microsoft Edge PDF Viewer","WebKit built-in PDF"],
    'author': '莉夏',
    'QQ': '897969970',
    'Bilibili': '莉夏宝贝儿'
};

// 突破node检测  应用在python的execjs
memory.delete = function(obj,prop){delete prop || Object.defineProperty(obj,prop, {get:function() {return undefined;}})};
node_obj = ['global','Buffer'];  // 这里用上面的node  在最后运行代码结束时拿出来node填充的进行替换  在vm2运行这个不用搞
node_obj.map((x)=>{memory.delete(window,x)});


if(memory.random){Math.random = function(){return memory.random}}
if(memory.timestamp){
    first_time = memory.timestamp//new Date().getTime();
    ttt = 0;
    console.log('第1次的时间戳:' + first_time)
    Date.prototype.getTime = function() {
        return first_time
    }
    ;
    Date.now = function() {
        ttt++;
        console.log('第'+ttt+'次的时间戳',first_time + ttt);
        return first_time + ttt
    }
    ;
    let Date_ = Date;
    Date = function() {
        ttt++
        console.log('第'+ttt+'次的时间戳',first_time + ttt)
        return new Date_(first_time + ttt)
    }
}


// index = 0
// times = [1692977016620,1692977016620,1692977016620,1692977016626,1692977016626,1692977016646,1692977016786,1692977016786,1692977020230,1692977020230,1692977020275,1692977021202,1692977021202,1692977021203,1692977021203,1692977021234,1692977021234,1692977021234,1692977021240,1692977022024,1692977022024,1692977022708];
// Date.prototype.getTime = function (){
//     return times[index++]
// };



// Date.prototype.getTime_ = Date.prototype.getTime;times=[];Date.prototype.getTime = function (){let a = this.getTime_();console.log(a);times.push(a);return a};
// Date.now_ = Date.now;Date.now = function(){let v = this.now_();console.log(v);return v}
// 记录时间戳

;
// 第2个加载 环境构建工具

// 调用后给对象挂上代理
memory.proxy = function(name){
    let paramObj = memory.data[name] || window[name]
    if(memory.setProxy == false)return paramObj
    const handler1 = {
        set(obj, prop, value) {
            if(memory.setLog){
                if(typeof(value) == 'function'){
                    caocao = 'function'
                }else{
                    caocao = obj[prop]
                }
                console.log('方法 : set\t序号 : '+ (++memory.order) + '\t对象 : '+obj.lixia + '\t属性 : ',prop,'\t值 : ',value)
            }
            if(memory.setDebugger && memory.passOrder<=memory.order){debugger}
            return Reflect.set(...arguments)
        },
        get(obj, prop){
            if(obj.lixia=='window'){return obj[prop]}
            if(memory.getLog){
                if(typeof(obj[prop]) == 'function'){
                    caocao = 'function'
                }else{
                    caocao = obj[prop]
                }
                console.log('方法 : get\t序号 : ' + (++memory.order) + '\t对象 : ' + obj.lixia + '\t属性 : ' , prop ,'\t值 : ', caocao)
            }
            if(obj.lixia=='window' && obj[prop]==undefined){memory.node.push(prop)};
            if(obj[prop]==undefined){memory.nodes[obj.lixia]? memory.nodes[obj.lixia].push(prop):memory.nodes[obj.lixia]=[],memory.nodes[obj.lixia].push(prop)}
            if(memory.getDebugger && memory.passOrder<=memory.order){debugger}
            return obj[prop]

        }};
    return new Proxy(paramObj, handler1);
};


// 调用后方法tostring保护
memory.protect = (function() {
    "use strict";
    //原函数
    const $toString = Function.toString;
    const myFunction_toString_symbol = Symbol('('.concat('',')_',(Math.random() + '').toString(36)));
    //自定义函数
    const myTostring = function(){
        if(memory.funTostringDebugger){debugger}

        // return '=this;=this,=module;=module,arguments'
        return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);
    };
    function set_native(func,key,value){
        Object.defineProperty(func,key,{
            "enumerable":false,
            "configurable":true,
            "writable":true,
            "value":value
        })
    }
    delete Function.prototype['toString']; //删除原型是toString
    set_native(Function.prototype,"toString",myTostring);
    set_native(Function.prototype.toString,myFunction_toString_symbol,"function toString() { [native code] }");
    function protect(func,name){
        if(typeof(func) == 'function'){
            if(name){
                set_native(func,myFunction_toString_symbol,'function '+name+'() { [native code] }')
            }
            else{
                set_native(func,myFunction_toString_symbol,'function '+func.name+'() { [native code] }')
            }
        }};
    return protect
})();

// 调用后对象的名字改变
memory.rename = function (target,name){
    Object.defineProperties(target,{
        [Symbol.toStringTag]:{
            value:name,
            configurable:true
        }
    })
};

// 设置对象为不可枚举    模拟浏览器的那些灰色暗淡的变量名
memory.NO_enumerable = function(obj,pro){
    Object.defineProperty(obj,pro,{
        enumerable:false
    })
};

// 设置原型上面获取为异常 实例上面获取正常
memory.pro_thr = function(obj,pro,name){
    let throw_fun = function(){
        throw new TypeError('Illegal constructor')
    };memory.protect(throw_fun,name)
    Object.defineProperty(obj, pro, {
        enumerable: true, // 不可枚举
        configurable: false, // 不可改写
        get:throw_fun,
        set:undefined
    })
}

// 调用后组成对象原型链
memory.make_chain = function(target,obj){
    let fff;
    if(obj){
        first = obj;
        fff = 0;
        memory.rename(obj,target[0])
    }else{
        firstName = target[0]
        first = memory.data[firstName] || window[firstName] || memory.create_element[firstName];
        first.lixia = firstName;
        memory.rename(first,target[1]); //先把对象的名字改变  如: window的名字为 Window
        fff = 1
    }
    first.chain = target;
    for(let i=0;i<target.length-1;i++){
        let nextName = target[i + fff];
        let second = window[nextName] || memory.data[nextName];
        // 要么对象构造  要么函数构造
        if(typeof second == "object"){
            memory.rename(second,nextName);
            first.__proto__ = second;
        }else if(typeof second == "function"){
            memory.rename(second.prototype,nextName);
            first.__proto__ = second.prototype;
        }else{
            // 这种情况只能是获取到的是 undefined
            throw new TypeError('原型链的组成时没有在全局window或者全局缓存找到该变量:'+nextName);
        }
        first = first.__proto__;
    }
};

// 调用后会创建一个挂了代理的对象
memory.createProxyObject = function(name,obj){
    if(obj){
        memory.data[name] = obj;
    }else{
        memory.data[name] = {};
    }
    memory.data[name].lixia = name;
    memory.rename(memory.data[name],name)
    return memory.proxy(name)
}

// 深拷贝
memory.deepCopy = function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    };
    memory.make_chain(p.chain,c)
    return c;
};


// 浅拷贝
memory.extendCopy = function extendCopy(p) {
    var c = {};
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
    memory.make_chain(p.chain,c);
    return c;
};


// dom标签构建
memory.domStr = function domStr(x){
    let caocao = '<'+x.lixia;
    if(x.class){
        caocao += ' class="'+x.class+'"'
    }
    if(x.id && x.id != "50000000"){
        caocao += ' id="'+x.id+'"'
    }
    caocao += '>'
    if(x.content){
        caocao += x.content;
    }

    if(x.childNodes && x.childNodes.length){
        for(let sx of x.childNodes){
            caocao += domStr(sx,obj);
        }
    };
    caocao += '</'+x.lixia+'>';
    if(x.siblingNode && x.siblingNode.length){
        for(let sx of x.siblingNode){
            caocao += domStr(sx);
        }
    };
    return caocao;
};


memory.domForObj = function domForObj(a,y){
    for(let x of a.childNodes){
        if(x.id == y){
            return x
        }
        if(x.childNodes.length>0){
            let caocao = domForObj(x,y)
            if(caocao){
                return caocao
            }
        }

    }
};

memory.domForObj_2 = function domForObj(a,y){
    for(let x of a.childNodes){
        if(x == y){
            return a
        }
        if(x.childNodes.length>0){
            let caocao = domForObj(x,y)
            if(caocao){
                return caocao
            }
        }

    }
};


// 字符串转dom对象
memory.str_to_dom = function str_to_dom() {
    function xx(a) {
        let num = 0
            , index = 0
            , list = []
            , index_ = 0
            , str = ''
            , result = [];
        for (let i = 0; i < a.length; i++) {
            if (a[i] == '<') {
                num += 1
            }
            if (a[i] == '>') {
                num -= 1
                if (num == 0) {
                    list.push(a.slice(index, i + 1));
                    index = i + 1
                }
            }
        }
        ;for (let i of list) {
            str += i
            if (i.indexOf('/') == -1) {
                index_ += 1
            } else {
                index_ -= 1
                if (index_ == 0) {
                    if (str != '') {
                        result.push(str)
                        str = ''
                    }
                }
            }
        }
        return result
    }
    ;
    function wtx(ax) {
        tagName = /<(\w+)/.exec(ax)[1];
        text = />(.*)</.exec(ax);
        obj = []
        obj.push(['content', text[1]])
        let aa = ax.split('=');
        for(let i=0;i<aa.length;i++){
            let a = aa[i]
            value = /["'](.*?)["']/.exec(a);
            if(!value){continue}
            v = value[1];
            let b = aa[i-1];
            key =  / (\w+)/.exec(b);
            k = key[1]
            obj.push([k,v])
        }

        return {
            'tagName': tagName,
            'property': obj
        }
    }

    function zzz(data) {
        let result = []
        for (let x of data) {
            let tt = 0;
            for (let i of x) {
                if (i == '/') {
                    tt += 1
                }
            }
            if (tt == 1) {
                let caocao = wtx(x);
                caocao.childNode = []
                result.push(caocao)
            } else {
                let nex = />(.*)</.exec(x)[1];
                let nn = x.replace(nex, '')
                let caocao = wtx(nn)
                let xen = xx(nex);
                caocao.childNode = zzz(xen);
                result.push(caocao)
            }
        }
        return result
    }
    ;function xyz(z) {
        dataa = xx(z);
        a1 = zzz(dataa)
        return a1
    }
    ;return xyz
}();

memory.get_style_name = function(a){
    let b = '';
    for(let x=0;x<a.length;x++){
        if(a[x]=='-'){
            x++
            b = b + a[x].toUpperCase()
        }else{
            b = b + a[x]
        }
    }
    return b
}

// dom元素添加到对象子节点
memory.dom_create = function dom_create(obj,domEle){
    for(let i of domEle){
        let z = document.createElement(i.tagName);
        for(let j of i.property){
            if(j[0]=='style'){
                for(let x of j[1].split(';')){
                    let kkk = x.split(':');
                    z.style[memory.get_style_name(kkk[0])] = kkk[1];
                }
            }else{
                z.setAttribute(j[0],j[1])
            }
        };
        obj.appendChild(z);
        if(i.childNode.length>0){
            memory.dom_create(z,i.childNode)
        }
    };
}

// 16进制转rgb值
memory.colorRgb = function colorRgb(string) {
    let sColor = string.toLowerCase()
    let sColorChange = []
    for (let i=1; i<7; i+=2) {
        sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));
    }
    return 'rgb('+sColorChange.join(',')+')'
}


memory.ArrElementCount = function(data) {
    let map = {};
    for (let i = 0; i < data.length; i++) {
        let ai = data[i];
        if (!map[ai]) {
            map[ai] = 1;
        } else {
            map[ai]++;
        }
    }
    return map
}


memory.setTime = function() {
    let Date_ = Date;
    let times = []
    Date = function() {
        let time;
        if (times.length > 0) {
            time = times[0];
        } else {
            time = new Date_().getTime();
            times.push(time);
        }
        return new Date_(time)
    }
    Date.now = function(){
        let time;
        if (times.length > 0) {
            time = times[0];
        } else {
            time = new Date_().getTime();
            times.push(time);
        }
        return time
    }
    Date.parse = Date_.parse;
    Date.prototype = Date_.prototype;
    return function(timestamp){times[0]=timestamp}
}


memory.hookArray = function hookArray(target, index) {
    return new Proxy(target,{
        set(target, property, value) {
            if (property === (index + "")) {
                debugger
            }
            console.log(`setArray index->${property} = ${value}`);
            target[property] = value;
        },
        get(target, property) {
            if (property === (index + "")) {
                debugger
            }
            let result = target[property];
            try {
                console.log(`getArray index->${property} = ${result}`);
            } catch (e) {}
            return result;
        },
        deleteProperty(target, property) {
            console.log(`deleteArray index->${property}`);
            delete target[property];
        }
    });
}


memory.filter_obj = function filter_obj(x,y,z){
    let result = [];
    let xxxx = function(obj,pros,pro){
        let keys;
        let count = 0;
        if(Array.isArray(pros)){
            keys = pros;
            for(let key of pros){
                for(let value of obj.sx || Object.values(obj)){
                    if(value == key){count++}
                }
            }
        }else{
            keys = Object.keys(pros)
            for(let key of keys){
                if(obj[key] == pros[key]){count++}
            }
        }
        if(keys.length <= count){result.push(obj)};
        if(obj[pro]){
            if(Array.isArray(obj[pro])){
                for(let i of obj[pro]){
                    xxxx(i,pros,pro)
                }
            }
            else{
                xxxx(obj[pro],pros,pro)
            }
        }
    }
    if(Array.isArray(x)){
        for(let i of x){
            xxxx(i,y,z)
        }
    }
    else{
        xxxx(x,y,z)
    }
    return result
}


memory.filter_obj2 = function filter_obj2(htmlNode,tj){
    return memory.filter_obj(htmlNode.childNodes,tj,'childNodes')
}

memory.hookDomGet = function(paramObj,pros){
    paramObj.sx = []
    // (function() {
    //     'use strict';
    //     Object.defineProperty(caocao, pro, {
    //         set: function(val) {
    //             console.log('设置',pro,'值',val)
    //             return Reflect.set(...arguments)
    //         },
    //         get: function(){
    //             let a1;
    //             if(window==this){
    //                 a1 = memory.filter_obj2(this.document,[pro]);
    //             }else{
    //                 a1 = memory.filter_obj2(this,[pro]);
    //             }
    //             if(a1.length>1){
    //                 return a1
    //             }else if(a1.length==undefined){
    //                 return undefined
    //             }else{
    //                 return a1[0]
    //             }
    //         }});
    // })();
    const handler1 = {
        set(obj, prop, value) {
            obj.sx.push(value)
            return Reflect.set(...arguments)
        },
        get(obj, prop){
            // debugger
            if(!pros.includes(prop)){
                return obj[prop]
            }
            let a1;
            if(obj.lixia=='window'){
                a1 = memory.filter_obj2(obj.document,[prop]);
            }else{
                a1 = memory.filter_obj2(obj,[prop]);
            }
            if(a1.length>1){
                return a1
            }else if(a1.length==undefined){
                return undefined
            }else{
                return a1[0]
            }
        }};
    return new Proxy(paramObj, handler1);
};
memory.objects.RTCPeerConnection = memory.createProxyObject('RTCPeerConnection');

memory.objects.RTCPeerConnection.localDescription = {
    "sdp":"v=0\r\no=- 627758748607417531 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=msid-semantic: WMS\r\nm=application 1961 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 117.152.145.34\r\na=candidate:3539891574 1 udp 2113937151 a3198269-2c6e-4adc-828e-b7f9c949277d.local 49812 typ host generation 0 network-cost 999\r\na=candidate:842163049 1 udp 1677729535 117.152.145.34 1961 typ srflx raddr 0.0.0.0 rport 0 generation 0 network-cost 999\r\na=ice-ufrag:/CYr\r\na=ice-pwd:QRs0Mo7A0ouqDBYDlcvDSjPQ\r\na=ice-options:trickle\r\na=fingerprint:sha-256 BC:AC:D1:9B:EC:2F:F1:47:B5:EF:6D:2F:1A:E3:B6:9F:2B:76:07:CF:32:90:9F:B0:33:A6:90:63:F9:25:45:59\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
    "type":"offer"
};
memory.objects.RTCPeerConnection.createDataChannel = function createDataChannel(x){
    return memory.createProxyObject(x)
};memory.protect(memory.objects.RTCPeerConnection.createDataChannel);

memory.objects.RTCPeerConnection.createOffer = function createOffer(x){
    return {
        'candidate':{
            address: "a3198269-2c6e-4adc-828e-b7f9c949277d.local",
            candidate: "candidate:3539891574 1 udp 2113937151 a3198269-2c6e-4adc-828e-b7f9c949277d.local 55154 typ host generation 0 ufrag gcmS network-cost 999",
            component: "rtp",
            foundation: "3539891574",
            port: 55154,
            priority: 2113937151,
            protocol: "udp",
            relatedAddress: null,
            relatedPort: null,
            sdpMLineIndex: 0,
            sdpMid: "0",
            tcpType: "",
            type: "host",
            usernameFragment: "gcmS",
        },
        'then':function(x){
            memory.promise['3'] = x;
            return memory.createProxyObject('createOffer');
        }
    }
};memory.protect(memory.objects.RTCPeerConnection.createOffer);

memory.objects.RTCPeerConnection.setLocalDescription = function setLocalDescription(x){
    return {'then':function(){debugger}}

};memory.protect(memory.objects.RTCPeerConnection.setLocalDescription);






;
window.length = 0; //内嵌了页面frame
window.onselectionchange = null;
window.onresize = null;
window.onmessage = null;
window.onerror = null;
window.outerHeight = 816;
window.innerHeight = 0;
window.outerWidth = 1536;
window.innerWidth = 0;
window.name = ""

window.locationbar = memory.createProxyObject('BarProp');
window.locationbar.visible = true;
window.menubar = memory.createProxyObject('BarProp');
window.menubar.visible = true;
window.personalbar = memory.createProxyObject('BarProp');
window.personalbar.visible = true;
window.scrollbars = memory.createProxyObject('BarProp');
window.scrollbars.visible = true;
window.statusbar = memory.createProxyObject('BarProp');
window.statusbar.visible = true;
window.toolbar = memory.createProxyObject('BarProp');
window.toolbar.visible = true;
window.devicePixelRatio = 1.25;


window.performance = memory.createProxyObject('performance');
window.indexedDB = {

};
window.indexedDB.open = function open(){
    return memory.createProxyObject('IDBFactory')
};memory.protect(window.indexedDB.open);

window.chrome =  memory.createProxyObject('chrome');

window.chrome.csi = function csi(){

};memory.protect(window.chrome.csi);

window.chrome.app = memory.createProxyObject('app');
window.chrome.app.isInstalled = false;
window.chrome.app.RunningState = {
    CANNOT_RUN: "cannot_run",
    READY_TO_RUN: "ready_to_run",
    RUNNING: "running"
};
window.chrome.app.InstallState = {
    DISABLED: "disabled",
    INSTALLED: "installed",
    NOT_INSTALLED: "not_installed"
}


window.clientInformation = {
    appCodeName: memory.userAgent.split('/')[0],
    appName: "Netscape",
    appVersion: memory.userAgent.split('/').slice(1).join('/'),
    bluetooth:  memory.createProxyObject('bluetooth'),
    clipboard: memory.createProxyObject('clipboard'),
    cookieEnabled: true,
    deviceMemory: 8,
    hardwareConcurrency: 12,
    keyboard: memory.createProxyObject('keyboard'),
    language: "zh-CN",
    languages: ["zh-CN","zh"],
    locks:  memory.createProxyObject('locks'),
    onLine: true,
    platform: "Win32",
    product: "Gecko",
    productSub: "20030107",
    userAgent: memory.userAgent,
    vendor: "Google Inc.",
    vendorSub: "",
    webdriver:false,
    wakeLock:memory.createProxyObject('wakeLock'),
    usb:memory.createProxyObject('usb')
};memory.proxy('clientInformation')



window.openDatabase = function openDatabase(){
    if(memory.callFunDebugger){debugger}
    return {version: "",transaction:function(){}}
};memory.protect(window.openDatabase);


window.FileReader = function FileReader(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.FileReader);

window.webkitRequestFileSystem = function(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.webkitRequestFileSystem);

window.SpeechSynthesisUtterance = function SpeechSynthesisUtterance(){

};memory.protect(window.SpeechSynthesisUtterance);



window.MediaEncryptedEvent = function MediaEncryptedEvent(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.MediaEncryptedEvent);


window.open = function open(method,url){
    if(memory.callFunDebugger){debugger}
    return url
};memory.protect(window.open);

window.DOMParser = function DOMParser(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.DOMParser);

window.XMLHttpRequest = function XMLHttpRequest(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.XMLHttpRequest);

window.XMLHttpRequest.prototype.open = function(){
    if(memory.callFunDebugger){debugger}
    return arguments[1]
};memory.protect(window.XMLHttpRequest.prototype.open);

window.XMLHttpRequest.prototype.send = function send(){
    return arguments[0]
};memory.protect(window.XMLHttpRequest.prototype.send);


window.fetch = function fetch(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.fetch );

window.Request = function Request(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.Request);

window.SourceBuffer = function SourceBuffer(){

};memory.protect(window.SourceBuffer);

window.SourceBuffer.prototype.changeType = function changeType(){

};memory.protect(window.SourceBuffer.prototype.changeType);



// window.ScreenOrientation = function ScreenOrientation(){

// };memory.protect(window.ScreenOrientation);

window.Path2D = function Path2D(){

};memory.protect(window.Path2D);

window.Path2D.prototype.addPath = function addPath(){

};memory.protect(window.Path2D.prototype.addPath);


window.HTMLFrameSetElement = function HTMLFrameSetElement(){

};memory.protect(window.HTMLFrameSetElement);

window.HTMLFrameSetElement.prototype.hasPointerCapture = function hasPointerCapture(){

};memory.protect(window.HTMLFrameSetElement.prototype.hasPointerCapture);

window.HTMLFrameSetElement.prototype.webkitRequestFullScreen = function webkitRequestFullScreen(){

};memory.protect(window.HTMLFrameSetElement.prototype.webkitRequestFullScreen);

window.CDATASection = function CDATASection(){

};memory.protect(window.CDATASection);

window.CDATASection.prototype.remove = function remove(){

};memory.protect(window.CDATASection.prototype.remove);


window.SVGGraphicsElement = function SVGGraphicsElement(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.SVGGraphicsElement);

window.PerformancePaintTiming = function PerformancePaintTiming(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.PerformancePaintTiming);



window.atob = function atob(s) {
    var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    s = s.replace(/\s|=/g, '');
    var cur,
        prev,
        mod,
        i = 0,
        result = [];
    while (i < s.length) {
        cur = base64hash.indexOf(s.charAt(i));
        mod = i % 4;
        switch (mod) {
            case 0:
                //TODO
                break;
            case 1:
                result.push(String.fromCharCode(prev << 2 | cur >> 4));
                break;
            case 2:
                result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
                break;
            case 3:
                result.push(String.fromCharCode((prev & 3) << 6 | cur));
                break;
        }
        prev = cur;
        i ++;
    }
    return result.join('');
};memory.protect(window.atob);
window.btoa  = function btoa(s) {
    var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    if (/([^\u0000-\u00ff])/.test(s)) {
        throw new Error('INVALID_CHARACTER_ERR');
    }
    var i = 0,
        prev,
        ascii,
        mod,
        result = [];
    while (i < s.length) {
        ascii = s.charCodeAt(i);
        mod = i % 3;
        switch(mod) {
            // 第一个6位只需要让8位二进制右移两位
            case 0:
                result.push(base64hash.charAt(ascii >> 2));
                break;
            //第二个6位 = 第一个8位的后两位 + 第二个8位的前4位
            case 1:
                result.push(base64hash.charAt((prev & 3) << 4 | (ascii >> 4)));
                break;
            //第三个6位 = 第二个8位的后4位 + 第三个8位的前2位
            //第4个6位 = 第三个8位的后6位
            case 2:
                result.push(base64hash.charAt((prev & 0x0f) << 2 | (ascii >> 6)));
                result.push(base64hash.charAt(ascii & 0x3f));
                break;
        }
        prev = ascii;
        i ++;
    }
    // 循环结束后看mod, 为0 证明需补3个6位，第一个为最后一个8位的最后两位后面补4个0。另外两个6位对应的是异常的“=”；
    // mod为1，证明还需补两个6位，一个是最后一个8位的后4位补两个0，另一个对应异常的“=”
    if(mod == 0) {
        result.push(base64hash.charAt((prev & 3) << 4));
        result.push('==');
    } else if (mod == 1) {
        result.push(base64hash.charAt((prev & 0x0f) << 2));
        result.push('=');
    }
    return result.join('');
};memory.protect(window.btoa);


window.alert = function alert(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.alert);
window.setInterval = function setInterval(x){
    memory.promise['2'] = x;
    return 1
};memory.protect(window.setInterval);
window.clearInterval = function clearInterval(){
};memory.protect(window.clearInterval);
window.setTimeout = function setTimeout(x){
    memory.promise['1'] = x;
    x()
    return 1
};memory.protect(window.setTimeout);
window.clearTimeout = function clearTimeout(x){

};memory.protect(window.clearTimeout);


window.MutationObserver = function MutationObserver(y){
    // debugger
    // y()
};memory.protect(window.MutationObserver);

window.MutationObserver.prototype.observe = function observe(y){

};memory.protect(window.observe);



// eval_ = eval;
// eval = function eval(x){
//     // debugger;
//     // let vvv = Reflect.apply(eval_,this,arguments);
//     // debugger;
//     // return vvv
//     return eval_(x)

// };
// new function(){eval("this.a=1")}();
memory.protect(eval,'eval');


window.HTMLFormElement = function HTMLFormElement(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.HTMLFormElement);


// 查看ip信息
window.RTCPeerConnection = function RTCPeerConnection(x){
    return memory.objects.RTCPeerConnection
};memory.protect(window.RTCPeerConnection);

mathdata = [true,false,false,true,true,false,false,true,true,false,false,true];
mathdataindex = 0;
window.matchMedia = function matchMedia(x){
    let obj = memory.createProxyObject('MediaQueryList');
    obj.matches = mathdata[mathdataindex++];
    return obj
};memory.protect(window.matchMedia);

window.CSS = function CSS(x){
    debugger
    return {}
};memory.protect(window.CSS);


window.CSS.supports = function supports(x){
    debugger
    return true
};memory.protect(window.CSS.supports);

window.customElements = memory.createProxyObject('customElements')

window.CSSStyleSheet = {};
window.CSSStyleSheet.cssRules = [{cssText: "::marker { }"}]

// col = ['rgb(0, 128, 0)','rgb(255, 0, 0)','rgb(0, 0, 0)','rgb(255, 0, 0)','rgb(0, 0, 255)','rgb(255, 0, 0)']
// //解析dom元素的css信息
// window.getComputedStyle = function getComputedStyle(x){
//     let obj = memory.createProxyObject('CSSStyleDeclaration'); // 创建一个新的能开代理的对象
//     obj.getPropertyValue = function(x){
//         if('color'==x){
//             return col.shift()
//         }
//     }
//     return obj
// };memory.protect(window.getComputedStyle);

window.ActiveXObject = undefined
window.SyncManager = function SyncManager(x){
    return true
};memory.protect(window.SyncManager);

window.RTCPeerConnectionIceEvent = function RTCPeerConnectionIceEvent(){
    debugger
};memory.protect(window.RTCPeerConnectionIceEvent);

window.WebSocket = function WebSocket(x){
    throw new TypeError("Failed to construct 'WebSocket': The URL '"+x+"' is invalid.");
};memory.protect(window.WebSocket);

window.Notification = function Notification(){

};memory.protect(window.Notification);

window.OffscreenCanvasRenderingContext2D = function OffscreenCanvasRenderingContext2D(){

};memory.protect(window.OffscreenCanvasRenderingContext2D);

window.external = {};

window.External = function External(){

};memory.protect(window.External);


memory.make_chain(['External'],window.external)
window.external.IsSearchProviderInstalled = null;


window.TextTrackList = function TextTrackList(){

};memory.protect(window.TextTrackList);

window.TextTrackList.prototype.getTrackById = function getTrackById(){

};memory.protect(window.TextTrackList.prototype.getTrackById);
Window = function Window(){
    throw new TypeError('Illegal constructor');
};memory.protect(Window);

Window.prototype.TEMPORARY = 0;
Window.prototype.PERSISTENT = 1;
memory.data.WindowProperties = {};
EventTarget = function EventTarget(){};memory.protect(EventTarget);




EventTarget.prototype.addEventListener = function addEventListener(x,y){
    // if(x == 'load'){
    //     y()
    // }
    let name = 'lixia_' + x;
    if(memory.EventListener[name]){
        if(memory.EventListener[name].includes(y)){;return}
        memory.EventListener[name].push(y)
    }else{
        memory.EventListener[name] = [y]
    }
};memory.protect(EventTarget.prototype.addEventListener);
Node = function Node(){
    throw new TypeError('Illegal constructor');
};memory.protect(Node);


Node.prototype.appendChild = function appendChild(newNode){
    // if(this.lixia == 'body' || this.lixia == 'head'){
    //     document.childNodes.push(this);
    // }
    if(newNode.parentNode){
        newNode.parentNode.removeChild(newNode);
        newNode.parentNode = undefined;
        newNode.parentElement = undefined;
    }
    if(this == newNode || this == newNode.parentNode){
        return newNode
    }
    if(!this.childNodes.some((x)=>{return x==newNode})){
        this.childNodes.push(newNode);
        newNode.parentNode = this;
        newNode.parentElement = this;
    }
    return newNode;
};memory.protect(Node.prototype.appendChild);


Node.prototype.removeChild = function removeChild(child){
    let index = this.childNodes.indexOf(child);
    if(index != -1){
        this.childNodes.splice(index,1);
        child.parentNode = undefined;
        child.parentElement = undefined;
    }
    return child
};memory.protect(Node.prototype.removeChild);


Node.prototype.replaceChild = function replaceChild(newChild, oldChild){
    if(newChild==oldChild){
        return oldChild
    }
    if(oldChild.parentNode){
        oldChild.parentNode.removeChild(oldChild);
        oldChild.parentNode = undefined;
        oldChild.parentElement = undefined;
    }
    if(this.childNodes.some((x)=>{return x==newChild})){
        this.childNodes.splice(this.childNodes.indexOf(newChild),1)
    }
    for(let i=0; i<this.childNodes.length; i++){
        if(oldChild == this.childNodes[i]){
            this.childNodes[i] = newChild;
            return oldChild
        }
    }
};memory.protect(Node.prototype.replaceChild);


Node.prototype.cloneNode = function cloneNode(x){
    if(x){
        return memory.extendCopy(this);
    }else{
        caocao = memory.extendCopy(this);
        caocao.childNodes = []
        return caocao
    }
};memory.protect(Node.prototype.cloneNode);


Node.prototype.insertBefore = function insertBefore(newNode, referenceNode){
    if(this.childNodes.some((x)=>{return x==newNode})){
        this.childNodes.splice(this.childNodes.indexOf(newNode),1)
        for(let i=0; i<this.childNodes.length; i++){
            if(referenceNode == this.childNodes[i]){
                this.childNodes.splice(i++,0,newNode)
            }
        }
    }else{
        this.childNodes.push(newNode)
    };
    return newNode
};memory.protect(Node.prototype.insertBefore);


HTMLElement = function HTMLElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLElement);
Element = function Element(){
    throw new TypeError('Illegal constructor');
};memory.protect(Element);


Element.prototype.setAttribute = function setAttribute(key,val){
    this[key] = val;
};memory.protect(Element.prototype.setAttribute);

Element.prototype.getAttribute = function getAttribute(key,val){
    return this[key]
};memory.protect(Element.prototype.getAttribute);

Element.prototype.removeAttribute = function removeAttribute(key){
    delete this[key]
};memory.protect(Element.prototype.removeAttribute);


Element.prototype.getElementsByTagName = function(x){
    return memory.filter_obj(this.childNodes,{'lixia':x},'childNodes')
};memory.protect(Element.prototype.getElementsByTagName);



Object.defineProperty(Element.prototype, 'outerHTML', {
    get: function(){
        let caocao = '<'+this.lixia;
        if(this.class){
            caocao += ' class="'+this.class+'"'
        }
        if(this.id && this.id != "50000000"){
            caocao += ' id="'+this.id+'"'
        }
        if(this.content){
            caocao += this.content;
        }
        caocao += '>'
        if(this.childNodes && this.childNodes.length>0){
            for(let x of this.childNodes){
                caocao += memory.domStr(x)
            }
        }
        caocao += '</'+this.lixia+'>';
        return caocao
    }}
);

Object.defineProperty(Element.prototype, 'innerHTML', {
        get: function(){
            if(this.childNodes && this.childNodes.length>0){
                caocao = ''
                for(let x of this.childNodes){
                    caocao += memory.domStr(x,this)
                }
                return caocao
            }
            return null
        },
        set:function(x){
            let xx = x.replace(/[\r\n]/g,"");
            let result = memory.str_to_dom(xx);
            memory.dom_create(this,result)
        }
    }
);
HTMLDocument = function HTMLDocument(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLDocument);


Document = function Document(){

};memory.protect(Document);


memory.create_count = 0;
memory.fontSize = ["SimHei","SimSun","NSimSun","FangSong","KaiTi","Verdana","Helvetica Neue LT Pro 35 Thin","tahoma","verdana","times new roman","Courier New","Microsoft Himalaya","helvetica","LG-FZKaTong-M19-V2.2","Georgia","georgia","courier new","Arial","arial","cursive","times","fantasy","courier","serif","monospace","Times New Roman"];
Document.prototype.createElement = function createElement(tag){
    let caocao;
    if(tag=='canvas'){
        caocao = memory.create_element.create_canvas();
    }
    else if(tag=='iframe'){
        caocao = memory.create_element.create_iframe();
    }
    else if(tag=='div'){
        caocao = memory.create_element.create_div();
    }
    else if(tag=='span'){
        caocao = memory.create_element.create_span();
    }
    else if(tag=='p'){
        caocao = memory.create_element.create_p();
    }
    else if(tag=='style'){
        caocao = memory.create_element.create_style();
    }
    else if(tag=='a'){
        caocao = memory.create_element.create_a();
    }
    else if(tag == 'h1'){
        caocao = memory.create_element.create_h1();
    }
    else if(tag=='li'){
        caocao = memory.create_element.create_li()
    }
    else if(tag=='video'){
        caocao = memory.create_element.create_video()
    }
    else if(tag=='meta'){
        caocao = memory.create_element.create_meta()
    }
    else if(tag=='script'){
        caocao = memory.create_element.create_script()
    }
    else if(tag=='form'){
        caocao = memory.create_element.create_form();
        caocao = memory.hookDomGet(caocao,['innerText','action','id','textContent']);
    }
    else if(tag=='input'){
        caocao = memory.create_element.create_input()
    }else if(tag=='audio'){
        caocao = memory.create_element.create_audio()
    }
    else{
        caocao = memory.create_element.create_other(tag);
    };
    memory.create_count += 1
    caocao.order = memory.create_count;

    // caocao.childNodes = [];
    // memory.rename(caocao.childNodes,'NodeList');
    // caocao.children = [];
    // memory.rename(caocao.children,'HTMLCollection');

    caocao.style = memory.createProxyObject('CSSStyleDeclaration');

    Object.defineProperty(caocao, 'offsetHeight', {
        get: function(){
            let fff = this.style['fontFamily'];
            if(memory.fontSize.includes(fff)){
                return 114
            }else{
                return 150
            }
        }});
    Object.defineProperty(caocao, 'offsetWidth', {
        get: function(){
            let fff = this.style['fontFamily'];
            if(memory.fontSize.includes(fff)){
                return 666
            }else{
                return 1327
            }
        }});
    return caocao
};memory.protect(Document.prototype.createElement);




Document.prototype.getElementById = function getElementById(tag){
    return memory.domForObj(document,tag)
};memory.protect(Document.prototype.getElementById);


Document.prototype.getElementsByClassName = function getElementsByClassName(tag){
    return memory.filter_obj(this.childNodes,{'class':tag},'childNodes')
};memory.protect(Document.prototype.getElementsByClassName);


Document.prototype.getElementsByTagName = function getElementsByTagName(tag){
    let val = memory.filter_obj(this.childNodes,{'lixia':tag},'childNodes');
    return val
};memory.protect(Document.prototype.getElementsByTagName);


Document.prototype.exitFullscreen = function exitFullscreen(){

};memory.protect(Document.prototype.exitFullscreen);




memory.create_element.create_document = function(){
    let obj = memory.createProxyObject('document');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLDocument','Document','Node','EventTarget'],obj);
    return obj
};
;
memory.objects.webgl = memory.createProxyObject('WebGLRenderingContext');

memory.objects.webgl.drawingBufferHeight = 150;
memory.objects.webgl.drawingBufferWidth = 300;

webglobj = {
    "ACTIVE_ATTRIBUTES":"35721",
    "ACTIVE_TEXTURE":"34016",
    "ACTIVE_UNIFORMS":"35718",
    "ALIASED_LINE_WIDTH_RANGE":"33902",
    "ALIASED_POINT_SIZE_RANGE":"33901",
    "ALPHA":"6406",
    "ALPHA_BITS":"3413",
    "ALWAYS":"519",
    "ARRAY_BUFFER":"34962",
    "ARRAY_BUFFER_BINDING":"34964",
    "ATTACHED_SHADERS":"35717",
    "BACK":"1029",
    "BLEND":"3042",
    "BLEND_COLOR":"32773",
    "BLEND_DST_ALPHA":"32970",
    "BLEND_DST_RGB":"32968",
    "BLEND_EQUATION":"32777",
    "BLEND_EQUATION_ALPHA":"34877",
    "BLEND_EQUATION_RGB":"32777",
    "BLEND_SRC_ALPHA":"32971",
    "BLEND_SRC_RGB":"32969",
    "BLUE_BITS":"3412",
    "BOOL":"35670",
    "BOOL_VEC2":"35671",
    "BOOL_VEC3":"35672",
    "BOOL_VEC4":"35673",
    "BROWSER_DEFAULT_WEBGL":"37444",
    "BUFFER_SIZE":"34660",
    "BUFFER_USAGE":"34661",
    "BYTE":"5120",
    "CCW":"2305",
    "CLAMP_TO_EDGE":"33071",
    "COLOR_ATTACHMENT0":"36064",
    "COLOR_BUFFER_BIT":"16384",
    "COLOR_CLEAR_VALUE":"3106",
    "COLOR_WRITEMASK":"3107",
    "COMPILE_STATUS":"35713",
    "COMPRESSED_TEXTURE_FORMATS":"34467",
    "CONSTANT_ALPHA":"32771",
    "CONSTANT_COLOR":"32769",
    "CONTEXT_LOST_WEBGL":"37442",
    "CULL_FACE":"2884",
    "CULL_FACE_MODE":"2885",
    "CURRENT_PROGRAM":"35725",
    "CURRENT_VERTEX_ATTRIB":"34342",
    "CW":"2304",
    "DECR":"7683",
    "DECR_WRAP":"34056",
    "DELETE_STATUS":"35712",
    "DEPTH_ATTACHMENT":"36096",
    "DEPTH_BITS":"3414",
    "DEPTH_BUFFER_BIT":"256",
    "DEPTH_CLEAR_VALUE":"2931",
    "DEPTH_COMPONENT":"6402",
    "DEPTH_COMPONENT16":"33189",
    "DEPTH_FUNC":"2932",
    "DEPTH_RANGE":"2928",
    "DEPTH_STENCIL":"34041",
    "DEPTH_STENCIL_ATTACHMENT":"33306",
    "DEPTH_TEST":"2929",
    "DEPTH_WRITEMASK":"2930",
    "DITHER":"3024",
    "DONT_CARE":"4352",
    "DST_ALPHA":"772",
    "DST_COLOR":"774",
    "DYNAMIC_DRAW":"35048",
    "ELEMENT_ARRAY_BUFFER":"34963",
    "ELEMENT_ARRAY_BUFFER_BINDING":"34965",
    "EQUAL":"514",
    "FASTEST":"4353",
    "FLOAT":"5126",
    "FLOAT_MAT2":"35674",
    "FLOAT_MAT3":"35675",
    "FLOAT_MAT4":"35676",
    "FLOAT_VEC2":"35664",
    "FLOAT_VEC3":"35665",
    "FLOAT_VEC4":"35666",
    "FRAGMENT_SHADER":"35632",
    "FRAMEBUFFER":"36160",
    "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME":"36049",
    "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE":"36048",
    "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE":"36051",
    "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL":"36050",
    "FRAMEBUFFER_BINDING":"36006",
    "FRAMEBUFFER_COMPLETE":"36053",
    "FRAMEBUFFER_INCOMPLETE_ATTACHMENT":"36054",
    "FRAMEBUFFER_INCOMPLETE_DIMENSIONS":"36057",
    "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT":"36055",
    "FRAMEBUFFER_UNSUPPORTED":"36061",
    "FRONT":"1028",
    "FRONT_AND_BACK":"1032",
    "FRONT_FACE":"2886",
    "FUNC_ADD":"32774",
    "FUNC_REVERSE_SUBTRACT":"32779",
    "FUNC_SUBTRACT":"32778",
    "GENERATE_MIPMAP_HINT":"33170",
    "GEQUAL":"518",
    "GREATER":"516",
    "GREEN_BITS":"3411",
    "HIGH_FLOAT":"36338",
    "HIGH_INT":"36341",
    "IMPLEMENTATION_COLOR_READ_FORMAT":"35739",
    "IMPLEMENTATION_COLOR_READ_TYPE":"35738",
    "INCR":"7682",
    "INCR_WRAP":"34055",
    "INT":"5124",
    "INT_VEC2":"35667",
    "INT_VEC3":"35668",
    "INT_VEC4":"35669",
    "INVALID_ENUM":"1280",
    "INVALID_FRAMEBUFFER_OPERATION":"1286",
    "INVALID_OPERATION":"1282",
    "INVALID_VALUE":"1281",
    "INVERT":"5386",
    "KEEP":"7680",
    "LEQUAL":"515",
    "LESS":"513",
    "LINEAR":"9729",
    "LINEAR_MIPMAP_LINEAR":"9987",
    "LINEAR_MIPMAP_NEAREST":"9985",
    "LINES":"1",
    "LINE_LOOP":"2",
    "LINE_STRIP":"3",
    "LINE_WIDTH":"2849",
    "LINK_STATUS":"35714",
    "LOW_FLOAT":"36336",
    "LOW_INT":"36339",
    "LUMINANCE":"6409",
    "LUMINANCE_ALPHA":"6410",
    "MAX_COMBINED_TEXTURE_IMAGE_UNITS":"35661",
    "MAX_CUBE_MAP_TEXTURE_SIZE":"34076",
    "MAX_FRAGMENT_UNIFORM_VECTORS":"36349",
    "MAX_RENDERBUFFER_SIZE":"34024",
    "MAX_TEXTURE_IMAGE_UNITS":"34930",
    "MAX_TEXTURE_SIZE":"3379",
    "MAX_VARYING_VECTORS":"36348",
    "MAX_VERTEX_ATTRIBS":"34921",
    "MAX_VERTEX_TEXTURE_IMAGE_UNITS":"35660",
    "MAX_VERTEX_UNIFORM_VECTORS":"36347",
    "MAX_VIEWPORT_DIMS":"3386",
    "MEDIUM_FLOAT":"36337",
    "MEDIUM_INT":"36340",
    "MIRRORED_REPEAT":"33648",
    "NEAREST":"9728",
    "NEAREST_MIPMAP_LINEAR":"9986",
    "NEAREST_MIPMAP_NEAREST":"9984",
    "NEVER":"512",
    "NICEST":"4354",
    "NONE":"0",
    "NOTEQUAL":"517",
    "NO_ERROR":"0",
    "ONE":"1",
    "ONE_MINUS_CONSTANT_ALPHA":"32772",
    "ONE_MINUS_CONSTANT_COLOR":"32770",
    "ONE_MINUS_DST_ALPHA":"773",
    "ONE_MINUS_DST_COLOR":"775",
    "ONE_MINUS_SRC_ALPHA":"771",
    "ONE_MINUS_SRC_COLOR":"769",
    "OUT_OF_MEMORY":"1285",
    "PACK_ALIGNMENT":"3333",
    "POINTS":"0",
    "POLYGON_OFFSET_FACTOR":"32824",
    "POLYGON_OFFSET_FILL":"32823",
    "POLYGON_OFFSET_UNITS":"10752",
    "RED_BITS":"3410",
    "RENDERBUFFER":"36161",
    "RENDERBUFFER_ALPHA_SIZE":"36179",
    "RENDERBUFFER_BINDING":"36007",
    "RENDERBUFFER_BLUE_SIZE":"36178",
    "RENDERBUFFER_DEPTH_SIZE":"36180",
    "RENDERBUFFER_GREEN_SIZE":"36177",
    "RENDERBUFFER_HEIGHT":"36163",
    "RENDERBUFFER_INTERNAL_FORMAT":"36164",
    "RENDERBUFFER_RED_SIZE":"36176",
    "RENDERBUFFER_STENCIL_SIZE":"36181",
    "RENDERBUFFER_WIDTH":"36162",
    "RENDERER":"7937",
    "REPEAT":"10497",
    "REPLACE":"7681",
    "RGB":"6407",
    "RGB5_A1":"32855",
    "RGB565":"36194",
    "RGBA":"6408",
    "RGBA4":"32854",
    "SAMPLER_2D":"35678",
    "SAMPLER_CUBE":"35680",
    "SAMPLES":"32937",
    "SAMPLE_ALPHA_TO_COVERAGE":"32926",
    "SAMPLE_BUFFERS":"32936",
    "SAMPLE_COVERAGE":"32928",
    "SAMPLE_COVERAGE_INVERT":"32939",
    "SAMPLE_COVERAGE_VALUE":"32938",
    "SCISSOR_BOX":"3088",
    "SCISSOR_TEST":"3089",
    "SHADER_TYPE":"35663",
    "SHADING_LANGUAGE_VERSION":"35724",
    "SHORT":"5122",
    "SRC_ALPHA":"770",
    "SRC_ALPHA_SATURATE":"776",
    "SRC_COLOR":"768",
    "STATIC_DRAW":"35044",
    "STENCIL_ATTACHMENT":"36128",
    "STENCIL_BACK_FAIL":"34817",
    "STENCIL_BACK_FUNC":"34816",
    "STENCIL_BACK_PASS_DEPTH_FAIL":"34818",
    "STENCIL_BACK_PASS_DEPTH_PASS":"34819",
    "STENCIL_BACK_REF":"36003",
    "STENCIL_BACK_VALUE_MASK":"36004",
    "STENCIL_BACK_WRITEMASK":"36005",
    "STENCIL_BITS":"3415",
    "STENCIL_BUFFER_BIT":"1024",
    "STENCIL_CLEAR_VALUE":"2961",
    "STENCIL_FAIL":"2964",
    "STENCIL_FUNC":"2962",
    "STENCIL_INDEX8":"36168",
    "STENCIL_PASS_DEPTH_FAIL":"2965",
    "STENCIL_PASS_DEPTH_PASS":"2966",
    "STENCIL_REF":"2967",
    "STENCIL_TEST":"2960",
    "STENCIL_VALUE_MASK":"2963",
    "STENCIL_WRITEMASK":"2968",
    "STREAM_DRAW":"35040",
    "SUBPIXEL_BITS":"3408",
    "TEXTURE":"5890",
    "TEXTURE0":"33984",
    "TEXTURE1":"33985",
    "TEXTURE2":"33986",
    "TEXTURE3":"33987",
    "TEXTURE4":"33988",
    "TEXTURE5":"33989",
    "TEXTURE6":"33990",
    "TEXTURE7":"33991",
    "TEXTURE8":"33992",
    "TEXTURE9":"33993",
    "TEXTURE10":"33994",
    "TEXTURE11":"33995",
    "TEXTURE12":"33996",
    "TEXTURE13":"33997",
    "TEXTURE14":"33998",
    "TEXTURE15":"33999",
    "TEXTURE16":"34000",
    "TEXTURE17":"34001",
    "TEXTURE18":"34002",
    "TEXTURE19":"34003",
    "TEXTURE20":"34004",
    "TEXTURE21":"34005",
    "TEXTURE22":"34006",
    "TEXTURE23":"34007",
    "TEXTURE24":"34008",
    "TEXTURE25":"34009",
    "TEXTURE26":"34010",
    "TEXTURE27":"34011",
    "TEXTURE28":"34012",
    "TEXTURE29":"34013",
    "TEXTURE30":"34014",
    "TEXTURE31":"34015",
    "TEXTURE_2D":"3553",
    "TEXTURE_BINDING_2D":"32873",
    "TEXTURE_BINDING_CUBE_MAP":"34068",
    "TEXTURE_CUBE_MAP":"34067",
    "TEXTURE_CUBE_MAP_NEGATIVE_X":"34070",
    "TEXTURE_CUBE_MAP_NEGATIVE_Y":"34072",
    "TEXTURE_CUBE_MAP_NEGATIVE_Z":"34074",
    "TEXTURE_CUBE_MAP_POSITIVE_X":"34069",
    "TEXTURE_CUBE_MAP_POSITIVE_Y":"34071",
    "TEXTURE_CUBE_MAP_POSITIVE_Z":"34073",
    "TEXTURE_MAG_FILTER":"10240",
    "TEXTURE_MIN_FILTER":"10241",
    "TEXTURE_WRAP_S":"10242",
    "TEXTURE_WRAP_T":"10243",
    "TRIANGLES":"4",
    "TRIANGLE_FAN":"6",
    "TRIANGLE_STRIP":"5",
    "UNPACK_ALIGNMENT":"3317",
    "UNPACK_COLORSPACE_CONVERSION_WEBGL":"37443",
    "UNPACK_FLIP_Y_WEBGL":"37440",
    "UNPACK_PREMULTIPLY_ALPHA_WEBGL":"37441",
    "UNSIGNED_BYTE":"5121",
    "UNSIGNED_INT":"5125",
    "UNSIGNED_SHORT":"5123",
    "UNSIGNED_SHORT_4_4_4_4":"32819",
    "UNSIGNED_SHORT_5_5_5_1":"32820",
    "UNSIGNED_SHORT_5_6_5":"33635",
    "VALIDATE_STATUS":"35715",
    "VENDOR":"7936",
    "VERSION":"7938",
    "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING":"34975",
    "VERTEX_ATTRIB_ARRAY_ENABLED":"34338",
    "VERTEX_ATTRIB_ARRAY_NORMALIZED":"34922",
    "VERTEX_ATTRIB_ARRAY_POINTER":"34373",
    "VERTEX_ATTRIB_ARRAY_SIZE":"34339",
    "VERTEX_ATTRIB_ARRAY_STRIDE":"34340",
    "VERTEX_ATTRIB_ARRAY_TYPE":"34341",
    "VERTEX_SHADER":"35633",
    "VIEWPORT":"2978",
    "ZERO":"0",
}

Object.assign(memory.objects.webgl,webglobj)
// memory.objects.webgl.ARRAY_BUFFER = 34962;
// memory.objects.webgl.STATIC_DRAW = 35044;
// memory.objects.webgl.VERTEX_SHADER = 35633;
// memory.objects.webgl.FRAGMENT_SHADER = 35632;

memory.objects.webgl.getSupportedExtensions = function getSupportedExtensions(){
    return memory.SupportedExtensions
};memory.protect(memory.objects.webgl.getSupportedExtensions);

memory.objects.webgl.getExtension = function getExtension(x){
    if(x=='WEBGL_debug_renderer_info'){
        return {
            UNMASKED_RENDERER_WEBGL: 37446,
            UNMASKED_VENDOR_WEBGL: 37445
        }
    }
};memory.protect(memory.objects.webgl.getExtension);

memory.objects.webgl.getParameter = function getParameter(x){
    if(x==37445){
        return memory.neihe_data
    }
    else if(x==37446){
        return memory.xianka_data
    }
};memory.protect(memory.objects.webgl.getParameter);


memory.objects.webgl.createBuffer= function createBuffer(x){
    return memory.createProxyObject('WebGLBuffer');
};memory.protect(memory.objects.webgl.createBuffer);

memory.objects.webgl.bindBuffer= function bindBuffer(x){

};memory.protect(memory.objects.webgl.bindBuffer);

memory.objects.webgl.bufferData= function bufferData(x){

};memory.protect(memory.objects.webgl.bufferData);

memory.objects.webgl.createProgram= function createProgram(x){
    let y = memory.createProxyObject('WebGLProgram');
    y.offsetUniform = function offsetUniform(){
        let yy = memory.createProxyObject('WebGLUniformLocation');
        return yy
    };memory.protect(y.offsetUniform);
    return y
};memory.protect(memory.objects.webgl.createProgram);

memory.objects.webgl.linkProgram= function linkProgram(x){

};memory.protect(memory.objects.webgl.linkProgram);

memory.objects.webgl.createShader= function createShader(x){
    let y = memory.createProxyObject('WebGLShader');
    return y
};memory.protect(memory.objects.webgl.createShader);

memory.objects.webgl.shaderSource= function shaderSource(x){

};memory.protect(memory.objects.webgl.shaderSource);

memory.objects.webgl.compileShader= function compileShader(x){

};memory.protect(memory.objects.webgl.compileShader);

memory.objects.webgl.attachShader= function attachShader(x){

};memory.protect(memory.objects.webgl.attachShader);

memory.objects.webgl.useProgram= function useProgram(x){
    let y = memory.createProxyObject('useProgramuseProgramuseProgram');
    return y
};memory.protect(memory.objects.webgl.useProgram);

memory.objects.webgl.getAttribLocation= function getAttribLocation(x){

};memory.protect(memory.objects.webgl.getAttribLocation);

memory.objects.webgl.getUniformLocation= function getUniformLocation(x){

};memory.protect(memory.objects.webgl.getUniformLocation);

memory.objects.webgl.enableVertexAttribArray= function enableVertexAttribArray(x){

};memory.protect(memory.objects.webgl.enableVertexAttribArray);

memory.objects.webgl.vertexAttribPointer= function vertexAttribPointer(x){

};memory.protect(memory.objects.webgl.vertexAttribPointer);

memory.objects.webgl.uniform2f= function uniform2f(x){

};memory.protect(memory.objects.webgl.uniform2f);

memory.objects.webgl.drawArrays= function drawArrays(x){

};memory.protect(memory.objects.webgl.drawArrays);

maxmin = [127,127,23,15,15,10,15,15,10,31,30,0,15,14,0,15,14,0,127,127,23,15,15,10,15,15,10,31,30,0,15,14,0,15,14,0];
maxminindex = 0;
memory.objects.webgl.getShaderPrecisionFormat= function getShaderPrecisionFormat(x){
    let y = memory.createProxyObject('WebGLShaderPrecisionFormat');
    Object.defineProperty(y, 'rangeMin', {
        get: function(){
            return maxmin[maxminindex++];
        }});
    Object.defineProperty(y, 'rangeMax', {
        get: function(){
            return maxmin[maxminindex++];
        }});
    Object.defineProperty(y, 'precision', {
        get: function(){
            return maxmin[maxminindex++];
        }});
    return y
};memory.protect(memory.objects.webgl.getShaderPrecisionFormat);
;
memory.objects.CanvasRenderingContext2D = memory.createProxyObject('CanvasRenderingContext2D');

memory.objects.CanvasRenderingContext2D.fillRect = function fillRect(){
    return memory.createProxyObject('fillRect')
};memory.protect(memory.objects.CanvasRenderingContext2D.fillRect);

memory.objects.CanvasRenderingContext2D.fillText = function fillText(){
    return memory.createProxyObject('fillText')
};memory.protect(memory.objects.CanvasRenderingContext2D.fillText);

;
HTMLCanvasElement = function HTMLCanvasElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLCanvasElement);


HTMLCanvasElement.prototype.getContext = function getContext(x){
    return memory.objects[x]
};memory.protect(HTMLCanvasElement.prototype.getContext);

HTMLCanvasElement.prototype.captureStream = function captureStream(x){
    return true
};memory.protect(HTMLCanvasElement.prototype.captureStream);
memory.create_element.create_canvas = function(){
    let obj = memory.createProxyObject('canvas');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    obj.getContext = function getContext(x){
        if(x=='webgl'){
            let x = memory.objects.webgl
            x.canvas = memory.create_element.create_canvas();
            x.canvas.toDataURL = function toDataURL(){
                return memory.canvas_toDataUrl_1;
            };memory.protect(obj.toDataURL)
            return x
        }
        else if(x=='2d'){
            return memory.objects.CanvasRenderingContext2D
        }
    };memory.protect(obj.getContext);
    obj.toDataURL = function toDataURL(){
        return memory.canvas_toDataURL;
    };memory.protect(obj.toDataURL)

    memory.make_chain(['HTMLCanvasElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLAnchorElement = function HTMLAnchorElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLAnchorElement);
memory.create_element.create_a = function(){
    let obj = memory.createProxyObject('a');

    (function() {
        'use strict';
        var cookieTemp = "";
        Object.defineProperty(obj, 'href', {
            set: function(val) {
                cookieTemp = val;
                this.host = this.hostname = location.hostname;
                this.baseURI = location.href;
                this.port = '';
                this.hash = '';

                if(val.indexOf('http') != -1){
                    let pathname_ = '/' + val.split('//')[1].split('/').slice(1).join('/')
                    this.pathname = pathname_.split('?')[0]
                    this.protocol = val.split('//')[0]
                }else{
                    let pathname_  = val;
                    this.pathname = pathname_.split('?')[0]
                    this.protocol = location.protocol;
                }
                this.origin = this.protocol + '//' + this.hostname
                if(val.indexOf('?') != -1){
                    this.search = '?' + val.split('?').slice(-1)[0]
                }else{
                    this.search = ''
                }
                return val;
            },
            get: function(){
                // debugger
                if(cookieTemp.indexOf('http') == -1){
                    return this.protocol + '//' + this.host + cookieTemp
                }
                return cookieTemp
            }});
    })();

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLAnchorElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

;
HTMLHeadElement = function HTMLHeadElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLHeadElement);
memory.create_element.create_head = function(){
    let obj = memory.createProxyObject('head');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLHeadElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};


;
HTMLSpanElement = function HTMLSpanElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLSpanElement);
memory.create_element.create_span = function(){
    let obj = memory.createProxyObject('span');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLSpanElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLBodyElement = function HTMLBodyElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLBodyElement);
memory.create_element.create_body = function(){
    let obj = memory.createProxyObject('body');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLBodyElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

// Document.prototype.body = memory.create_element.create_body();

;
HTMLParagraphElement = function HTMLParagraphElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLParagraphElement);
memory.create_element.create_p = function(){
    let obj = memory.createProxyObject('p');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLParagraphElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLDivElement = function HTMLDivElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLDivElement);
memory.create_element.create_div = function(){
    let obj = memory.createProxyObject('div');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLDivElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

;
HTMLIFrameElement = function HTMLIFrameElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLIFrameElement);


memory.create_element.create_iframe = function(){
    let obj = memory.createProxyObject('iframe');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    obj.contentWindow = {
        'document':memory.create_element.create_document()
    };
    let v = memory.create_element.create_video();
    v.id = 'preview'
    obj.contentWindow.document.appendChild(v)

    obj.style = {
        'display':'none'
    }
    memory.make_chain(['HTMLIFrameElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};
;
HTMLUnknownElement = function HTMLUnknownElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLUnknownElement);


memory.create_element.create_other = function(x){
    let obj = memory.createProxyObject(x);

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLUnknownElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};
;
HTMLStyleElement = function HTMLStyleElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLStyleElement);


HTMLStyleElement.prototype.remove = function remove(){
    return false
};memory.protect(HTMLStyleElement.prototype.remove);
memory.create_element.create_style = function(){
    let obj = memory.createProxyObject('style');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    obj.sheet = {cssRules:[{cssText: "::marker { }"}]};

    memory.make_chain(['HTMLStyleElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLHtmlElement = function HTMLHtmlElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLHtmlElement);


memory.create_element.create_html = function(){
    let obj = memory.createProxyObject('html');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLHtmlElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};
;
HTMLMediaElement = function HTMLMediaElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLMediaElement);


HTMLMediaElement.prototype.captureStream = function captureStream(){
    return true
};memory.protect(HTMLMediaElement.prototype.captureStream);


cantype2 = ['probably15','probably16','probably17','probably18','probably19','probably20','probably21','probably22','probably23','probably24','probably25','probably26','probably27','probably28'];
cantypeindex2 = 0;
HTMLMediaElement.prototype.canPlayType = function canPlayType(){
    return cantype2[cantypeindex2++]
};memory.protect(HTMLMediaElement.prototype.canPlayType);
HTMLVideoElement = function HTMLVideoElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLVideoElement);

memory.create_element.create_video = function(){
    let obj = memory.createProxyObject('video');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLVideoElement','HTMLMediaElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLHeadingElement = function HTMLHeadingElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLHeadingElement);
memory.create_element.create_h1 = function(){
    let obj = memory.createProxyObject('h1');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLHeadingElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

;
HTMLLIElement = function HTMLLIElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLLIElement);
memory.create_element.create_li = function(){
    let obj = memory.createProxyObject('li');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLLIElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLMetaElement = function HTMLMetaElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLMetaElement);
memory.create_element.create_meta = function(){
    let obj = memory.createProxyObject('meta');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLMetaElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLScriptElement = function HTMLScriptElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLScriptElement);
memory.create_element.create_script = function(){
    let obj = memory.createProxyObject('script');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLScriptElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLFormElement = function HTMLFormElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLFormElement);
memory.create_element.create_form = function(){
    let obj = memory.createProxyObject('form');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLFormElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

;
HTMLInputElement = function HTMLInputElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLInputElement);


memory.create_element.create_input = function(){
    let obj = memory.createProxyObject('input');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLInputElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};
;
HTMLAudioElement = function HTMLAudioElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLAudioElement);
HTMLMediaElement = function HTMLMediaElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLMediaElement);


cantype = ['probably','probably','probably','maybe','probably','probably','probably'];
cantypeindex = 0;
HTMLMediaElement.prototype.canPlayType = function canPlayType(){
    return cantype[cantypeindex++]
};memory.protect(HTMLMediaElement.prototype.canPlayType);
memory.create_element.create_audio = function(){
    let obj = memory.createProxyObject('audio');

    obj.childNodes = [];
    obj.children = obj.childNodes;

    memory.make_chain(['HTMLAudioElement','HTMLMediaElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
;
Document.prototype.documentElement = memory.create_element.create_html();
Document.prototype.documentElement.style = memory.createProxyObject('CSSStyleDeclaration');
Document.prototype.documentElement.onresize = null;
Document.prototype.documentElement.style.fontVariantNumeric = '';
document = memory.create_element.create_document();

// document.body = memory.create_element.create_body();
// document.documentElement.appendChild(document.body);

document.head = memory.create_element.create_head();
document.documentElement.appendChild(document.head);
document.appendChild(document.documentElement);
document.scrollingElement = document.documentElement;

document.characterSet = "UTF-8";
document.charset = "UTF-8";
document.hidden = false;
document.visibilityState = "visible";
document.onselectionchange = null;
document.onmousemove = null;
document.createExpression = function createExpression(){
    // var obj = memory.createProxyObject('XPathExpression')
    //     // return obj
};memory.protect(document.createExpression)


document.all = {}//lixia_tools.lixia();
Object.defineProperties(document.all,{[Symbol.toStringTag]:{value:"HTMLAllCollection", configurable:true}})
document.all.length = 3
document.scripts = [];


MimeType = function MimeType(){
    throw new TypeError('Illegal constructor');
};memory.protect(MimeType);
memory.create_MimeType = function create_MimeType(type){
    let obj = memory.createProxyObject('MimeType');
    obj.type = type;
    obj.suffixes = "pdf";
    obj.description = "Portable Document Format";
    memory.make_chain(['MimeType'],obj);
    return obj
}
;
Plugin = function Plugin(){
    throw new TypeError('Illegal constructor');
};memory.protect(Plugin);
memory.create_plugin = function create_plugin(name){
    let obj = [];
    obj.push(memory.create_MimeType('application/pdf'))
    obj.push(memory.create_MimeType('text/pdf'))
    obj.description = "Portable Document Format";
    obj.filename =  "internal-pdf-viewer";
    obj.name = name;
    memory.make_chain(['Plugin'],obj);
    return obj
}
;
Navigator = function(){
    throw new TypeError('Illegal constructor');
};memory.protect(Navigator);

Navigator.prototype.webkitPersistentStorage = {};

Navigator.prototype.getBattery = function getBattery(){
    if(memory.callFunDebugger){debugger}
    obj = {then:function(x){
            x({
                'charging':true,
                'chargingTime':0,
                'dischargingTime':Infinity,
                'level':1,
                'onchargingchange':null,
                'onchargingtimechange':null,
                'ondischargingtimechange':null,
                'onlevelchange':null,
            })
        }}
    return obj
};memory.protect(Navigator.prototype.getBattery);

Navigator.prototype.maxTouchPoints = 0;

Navigator.prototype.requestMIDIAccess = function requestMIDIAccess(){
    return true
};memory.protect(Navigator.prototype.requestMIDIAccess);


Navigator.prototype.webdriver = false;
xxs = function(){return false};memory.protect(xxs,'get webdriver')
Object.defineProperty(Navigator.prototype, 'webdriver', {
    enumerable: true, // 不可枚举
    configurable: false, // 不可改写
    get:xxs,
    set:undefined
})

// memory.pro_thr(Navigator.prototype,'webdriver','webdriver')



navigator = {};

navigator.appCodeName = memory.userAgent.split('/')[0];
navigator.appName = "Netscape";
navigator.appVersion = memory.userAgent.split('/').slice(1).join('/');
navigator.cookieEnabled = true;
navigator.deviceMemory = 8;
navigator.appCodeName = memory.userAgent.split('/')[0];
navigator.appCodeName = memory.userAgent.split('/')[0];
navigator.doNotTrack = null;
navigator.hardwareConcurrency = 12;
navigator.language = "zh-CN";
navigator.onLine = true;
navigator.pdfViewerEnabled = true;
navigator.platform = "Win32";
navigator.product = "Gecko";
navigator.productSub = "20030107";
navigator.userAgent = memory.userAgent;
navigator.vendor = "Google Inc.";
navigator.vendorSub = ""
navigator.webdriver = undefined;
// memory.NO_enumerable(navigator,'webdriver')

navigator.languages = ["zh-CN","zh"]
navigator.plugins = [];

for(let x=0;x<memory.plugins.length;x++){
    let xs = memory.create_plugin(memory.plugins[x])
    navigator.plugins.push(xs);
}


navigator.connection = memory.createProxyObject('connection',{
    downlink: 8.95,
    effectiveType: "4g",
    onchange: null,
    rtt: 50,
    saveData: false,
});

navigator.mimeTypes = [];
memory.rename(navigator.mimeTypes,'MimeTypeArray')
navigator.mimeTypes.push(memory.create_MimeType('application/pdf'))
navigator.mimeTypes.push(memory.create_MimeType('text/pdf'))
// navigator.mimeTypes ['application/x-shockwave-flash'] = memory.createProxyObject('mimeTypes_flash');
// navigator.mimeTypes ['application/x-shockwave-flash'].enabledPlugin =  memory.createProxyObject('mimeTypes_flash_enabledPlugin');


navigator.serviceWorker = memory.createProxyObject('serviceWorker')


navigator.vibrate = function vibrate(){

};memory.protect(navigator.vibrate);

navigator.locks = memory.createProxyObject('LockManager')
history = {};
history.length= 2
history.scrollRestoration= "auto"
history.state=null
History = function History(){
    throw new TypeError('Illegal constructor');
};memory.protect(History);
Storage = function Storage(){
    throw new TypeError('Illegal constructor');
};memory.protect(Storage);

Storage.prototype.getItem = function getItem(keyName){
    if(memory.callFunDebugger){debugger}
    return this[keyName] || null
};memory.protect(Storage.prototype.getItem);

Storage.prototype.removeItem = function removeItem(keyName){
    if(memory.callFunDebugger){debugger}
    delete this[keyName]
};memory.protect(Storage.prototype.removeItem)

Storage.prototype.setItem = function setItem(key,value){
    console.log(key,value)
    debugger
    if(memory.callFunDebugger){debugger}
    this[key] = value
};memory.protect(Storage.prototype.setItem)
sessionStorage = {};
localStorage = {};

memory.make_chain(['sessionStorage','Storage']);
memory.make_chain(['localStorage','Storage']);
location = {};

location.href = undefined;
location.toString = function(){
    if(memory.callFunDebugger){debugger}
    return location.href
}

location.protocol = "https:";
location.port = '';
location.origin = 'https://www.ems.com.cn';
location.host = 'www.ems.com.cn';
location.search = "?tab=2";
location.hash = "";

Location = function Location(){
    throw new TypeError('Illegal constructor');
};memory.protect(Location);
screen = {};

ScreenOrientation = memory.createProxyObject('ScreenOrientation ');
Object.assign(ScreenOrientation,{angle: 0, type: "landscape-primary", onchange: null});

screen.availHeight = 816;
screen.availLeft = 0;
screen.availTop = 0;
screen.availWidth = 1536;
screen.colorDepth = 24;
screen.height = 864;
screen.orientation = {}
screen.pixelDepth = 24;
screen.width = 1536;
Screen = function Screen(){
    throw new TypeError('Illegal constructor');
};memory.protect(Screen);


;
// 第4个加载            进行原型链的组成
memory.make_chain(['window','Window','WindowProperties','EventTarget']);
memory.make_chain(['document','HTMLDocument','Document','Node','EventTarget']);
memory.make_chain(['history','History']);
memory.make_chain(['location','Location']);
memory.make_chain(['navigator','Navigator']);
memory.make_chain(['screen','Screen']);



document.location = location;
window.top = window;
window.self = window;
;
// 第5个加载        对对象进行代理 并且遍历对象:  函数进行toString保护  对象则进行递归调用
sessionStorage = memory.proxy('sessionStorage');
localStorage = memory.proxy('localStorage');
location = memory.proxy('location');
navigator = memory.proxy('navigator');
screen = memory.proxy('screen');
history = memory.proxy('history');
document = memory.proxy('document');
window = memory.proxy('window');




;
(function() {
    'use strict';
    var cookieTemp = {};
    Object.defineProperty(document, 'cookie', {
        set: function(val) {
            let xxx = val.split(';')[0].split('=')
            cookieTemp[xxx[0]] = xxx[1];
            console.log('set cookie',val)
            debugger
            return val;
        },
        get: function(){
            let result = [];
            for(let x of Object.keys(cookieTemp)){
                result.push(x + '=' + cookieTemp[x])
            }
            result = result.join('; ')
            console.log('get cookie',result)
            return result
        }});
})();

(function() {
    'use strict';
    var cookieTemp = "";
    Object.defineProperty(location, 'href', {
        set: function(val) {
            cookieTemp = val;
            this.protocol = val.split('//')[0];
            this.hostname = this.host = val.split('//')[1].split('/')[0];
            this.pathname = '/' + val.split('?')[0].split('//')[1].split('/').slice(1).join('/');
            this.origin = this.protocol + '//' + this.hostname;
            if(val.indexOf('?') != -1){
                this.search = '?' + val.split('?').slice(-1)[0]
            }else{
                this.search = ''
            }
            return val;
        },
        get: function(){return cookieTemp}});
})();;

;

                var meta = document.createElement('meta');
                meta.content = "49KB56ypcvaL1wp6H9omlyBpZg2ZxtQDltTw42pDBvgkAcohUz0bl1blVQEx3QY8gONHTfcjaBr3Pq43kzqCYMqWevFQcuPF";
                location.href = "https://www.ems.com.cn/queryList?tab=2";
                Object.assign(localStorage,{'lixia': 'localStorage', 'chain': ['localStorage', 'Storage'], '__#classType': 'localStorage', '$_YWTU': 't5gDBvxLJ6cyXF9a1z8xf5N3mSKAskuT2PC9NHvNYal', '$_YVTX': 'Wq'})
                meta.r = "m"
                document.head.appendChild(meta);
                var script1 = document.createElement('script');
                script1.r = "m";
                document.head.appendChild(script1);
                var script2 = document.createElement('script');
                script2.r = "m";
                document.head.appendChild(script2);
                document.visibilityState = 'visible'; // hidden
                window = memory.hookDomGet(window,['__Zm9ybS5pZAo__']);
                document.body = memory.create_element.create_body();
                document.body.onmouseenter = null;
                document.documentElement.appendChild(document.body);
                document.body.style = memory.createProxyObject('CSSStyleDeclaration');
                document.body.style.backgroundBlendMode = '';
                document.body.style.lineBreak = '';
                document.body.style.textAlignLast = '';
                document.body.style.minWidth = '';
            ;
document.cookie="mEsoE3ffu2LGO=609gpP8HypGOfC91yRHE.0b1LJrf7fYFcRfEq9Ev72z0C5fd92Ev6oRWSV9YKzsih4APnVJ62vyf0SXWX4BX7Kfa;";
document.cookie="mEsoE3ffu2LGP=001TPwguZaxfSTdpUbrJQnUmmZDVg4EoLtd3VhYxmiw2EUC.hfAEs0hMEDXdzekD3STm4afDr1.0Ty6a8FisEVzk6b1AbFjTa1CXiexjz0Ug94Mw0eJpnLoq0oZ1OSfgQAN2_ha9z94TrGWM9UXzlPxmpUryb7yz0zLAYK5lIg7DqLocuAY0Don4Y4tYJamg.CeZpO5fl8OGtl.GTWXK_SyvHUs0l9JWGXFsbuG9n6cAF4PtuX2TWIHWsBM9VruT7Mg9yQALg6Axk1sRDTmfKpq;";
$_ts=window['$_ts'];if(!$_ts)$_ts={};$_ts.nsd=34913;$_ts.cd="qoJErrAlxPWqckGEEaqtqqLrHO7trn3mcGE8WqWOqqGgc1WqckGtcGqtEAQ6cqA1cGW5WqAtrOgaqnLmHOqccGE6cAA3EaqtrGLvHO7OqqLmcGE5iaLrHOqctG36cGAYcGW5WqAtrOgaqnWqcGAtrUL4cGE6hx7qJslcrslSbnhQz6aL0qck47D2zuSYq6sKvSu6n1oLCNCeOKk3hW113GWmqGQorhArkYyyx19Tuuxiwly3WVH1sozriCq01zR91VAGHYS8jngfxngCJ2P6KsWNEcV.Jt2IhTgntnVvzuWaKcyQJnbyEcZ0J2NFtM9as0RK3TYhTsJBYVYtpvczY9TYFvwCx_mRKkVXx1VNjOw8Kcg2po6aibSxWmqTRZAuVl29WvYSasRLwcqeUm_.hPlvhOwFtQqnhnQGtuR3zT9ut1q2tuIDh2GThPV2tFfIhTgntnVvzuR8tY96tn8yhOR3h2a6tM9GhuJItTaTznqftsYFtT_.hPlvhOeFtQqnhnQGtuy3zT9ut1q2tu1.UTgNEDzOQXTfVKp71KxauTrYJ6RdWvK.3lAvimSQJMQGE19uHTN3znrSIDmH1C.BR0ebAUTpJIr6W0yt3vJ0Xsf3UOE.x186WuY3h2a6tM9GhuATK2NgzCSCFKg.Um_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFtT_.hbTaMb7.F5yXMn27QbzNzCSCFKyFK2PpqnzQJYT9YFSJwuy6psQSCYxvwu2ipl_L8OJPwsSeRdTYKuQ4UOaS4Dmjw2ldIu4Cp6rjpupf35gas0EyWTeq4br6VlYnRKI6iUYZAlmxs7mYRuYJJsSrdoNUUlYNMou31C0.JkAT3dNGJPzLwkSWCOlCMof7QTU1RD0.JkAT3dNGJPzLwkSrdl22FT76sDMU8T9.JkAT3dNGJPzLwkSL.VJspCWTICHkJb7.FoAZ1BA0Al2_WORULbYnHbp0MDHhwUJ9YmwkWjrl1bRH3bxC5sYSMYEZQDuVVDxsAl2IMwwrhsWSJKm95sQzM6lZsCMXAYJb1kwaHwW0hsWSJKm95sQzM6lZtsiLWDY93kENM5Gy3smSIumTnmfJQDyrHl.XJKRfQUWuHQT2MqVcra3TbaWnrpRBQ6o.Qs96iuEdHtguiOECHsWSjqEmWulT3KsyqGq0JkVok_LnJklTHOQSjuEkksVnWOKjJuVeqfwQ.Tnf5Bt0nRSwZJMB1E2erSUpAy0awWxg2R_RqA3orAqcbnEJZ3MgCOsxVWxKkHh2.78RU64GhchOQhqKD3gz5WwjtqWHWk3aJtL_JuWCJaQljGExJkVCWsCPWOVSWGQorR7cqaVkJaQl.qqYWvG.RbsghbxLQczbwIqX3vRBtCRuZPyfRD9.RKsBhbm7Mcz2Fi7X3c2fRbVN5DTXtKm6wnvgQUqN3UpStIeOwn2bFC7NdCTGtKRLRoC6RbSShbxjFMwvMolX3veGzCpBRcyfFCF6RDeuhbmLF4w9MDzCtCmj4ny93Kq.3D60hbp7RczGI4wjM6VXM6wTzCN6RPyXRDj6FCTOhbyNMhw.MU3XMvw9zCzaFPyzRv86FDxu3nzzwIy2hCen3czB_cyNwbTNtCvn3ceNMKq.FteOhCfOwnzLZb3BFDzjtCOawceLMKW.FHp0hCfnJczL_u3BFoxbtCO.RCANM6wGtIRnQn2BwDgNeDrNtKT9Inv0RKANMKz2tIpXRP2zQClN_CJatUx9RvK6QbwOhvwGFhwnFb3XwCz7z6xBMomut6UTR1eTQbL.w8zSh6YnQnzT_6R4tUx03nv.8neT8CA.wHx9h6pCInz65PySRDZ.wKsNhvmGR1zT3iGXQKGXwKNu51ySQKA.wUoCQPeC3D7.wBT_h6Rzt6pudcyaQbW.wohehvrZQ1zuRi9XwCpgt6JPg1y6MDA.QCueRceSMUYT3HYCh6mC31zSg63BQ6mOt6HLQ1euQUq.Q5Jbh6xOQ1zndbrutUYjRPv7M6VNwKff34wTMDJ9J1zn_6lBIKrjt666Q1eeMvpdt8JBMn2_wCLNg6mBtUG.IKu.qGWmr2GOKXEcrTLbECVmvT0v3KWoqTjdUUVmqkAarR90WAVkJaQljGEkrAEoraKM";if($_ts.lcd)$_ts.lcd();;
if($_ts.cd){


(function(_$gH,_$gg){var _$ct=0;function _$_b(){var _$eD=[28];Array.prototype.push.apply(_$eD,arguments);return _$$x.apply(this,_$eD);}function _$_J(_$fH){return _$_b;function _$_b(){_$fH=0x3d3f*(_$fH&0xFFFF)+0x269ec3;return _$fH;}}function _$en(_$_b,_$kD){var _$$T,_$kt,_$$r; !_$kD?_$kD=_$_n:0,_$$T=_$_b.length;while(_$$T>1)_$$T-- ,_$$r=_$kD()%_$$T,_$kt=_$_b[_$$T],_$_b[_$$T]=_$_b[_$$r],_$_b[_$$r]=_$kt;function _$_n(){return Math.floor(_$fl()*0xFFFFFFFF);}}var _$kD,_$$T,_$kz,_$fF,_$_V,_$$o,_$it,_$fl,_$cJ,_$eY;var _$kl,_$k$,_$_r=_$ct,_$ij=_$gg[0];while(1){_$k$=_$ij[_$_r++];if(_$k$<12){if(_$k$<4){if(_$k$===0){_$_r+=2;}else if(_$k$===1){_$$x(28);}else if(_$k$===2){_$kz=[4,16,64,256,1024,4096,16384,65536];}else{return;}}else if(_$k$<8){if(_$k$===4){_$kl=_$eY;}else if(_$k$===5){_$_V=window,_$$o=String,_$it=Array,_$kD=document,_$fl=Math.random,_$$T=Math.round,_$cJ=Date;}else if(_$k$===6){ !_$kl?_$_r+=2:0;}else{ !_$kl?_$_r+=0:0;}}else{if(_$k$===8){_$eY=_$_V['$_ts']={};}else if(_$k$===9){_$eY=_$_V['$_ts'];}else if(_$k$===10){_$eY.lcd=_$_b;}else{_$kl= !_$cJ;}}}else ;}



function _$$x(_$_9,_$$g,_$i9){function _$gT(){return _$kP.charCodeAt(_$jG++ );}function _$g1(_$_b,_$kD){var _$$T,_$kt;_$$T=_$_b.length,_$$T-=1;for(_$kt=0;_$kt<_$$T;_$kt+=2)_$kD.push(_$e1[_$_b[_$kt]],_$aM[_$_b[_$kt+1]]);_$kD.push(_$e1[_$_b[_$$T]]);}function _$_Q(){return'\x74\x6f\x53\x74\x72\x69\x6e\x67';}var _$_b,_$kD,_$$T,_$kt,_$$r,_$_n,_$ct,_$_r,_$kl,_$eD,_$k$,_$ij,_$bv,_$$J,_$a1,_$aM,_$fk,_$kP,_$aY,_$jG,_$hZ,_$ax,_$e1;var _$aD,_$$3,_$$f=_$_9,_$a7=_$gg[1];while(1){_$$3=_$a7[_$$f++];if(_$$3<97){if(_$$3<64){if(_$$3<16){if(_$$3<4){if(_$$3===0){_$kt=0;}else if(_$$3===1){_$$f+=2;}else if(_$$3===2){_$kt=_$gT();}else{_$a1=_$_J(_$kD);}}else if(_$$3<8){if(_$$3===4){_$$T[2]="xQM`NR`NPQONTTOT`NT`PQ`VM`POTSU`OM`SQ`OQM`R`UPUUSMU`U`QOVQVSTOVS`PO`OR`PM`NPQONTTOU`VO`Q`QNVQPMQ`QOVQVSTOVR`PP`P`QU`SMQUMM`JN`NP`NV`NO`V`NOU`PR`SP`SRRPS`NOT`PPRRQQPO`OMM`NMOQ`OOQ`NOS`RU`ORR`OQ`PT`NU`NMMM`SRRPR`NMM`OT`PN`T`NN`NVO`OMVTNRN`O`ORS`NM`NPNMTO`NQ`UNVO`SM`S`NS`MKMN`JNMM`QO`OMP`NSPUP`UV`OQU`RMMM`OS`OMVTNRO`TO`SR`OSONQQ`UR`RO`OMMM`RNO`QMVSM`NSUQPMMU`NMO`QR`JQ`OP`TR`RT`NUM`OMN`TV`SRRPT`QP`NSTTTONS`RV`UO`VP`STNMUUSQ`OSUQPRQRS`VT`NMQURTS`OSRQQPRTSV`PV`RR`QS`RS`RN`RMM`UM`QN`OV`NOO`QMVS`JMKMN`PS`US`PMM`OSUQPRQRR`OU`OMQU`OUP`ON`SU`TN`MKM`NMMMMM`ORT`OTNTPPUTU`NMQURTR`MKOS`PVUUOVOPUQ`NTPORUQNVP`NRSTV`NVN`ORPNMNN`NUMM`JVM`NURVTTRPVP`MKQ`NMMN`JMKOS`NSQ`NNO`POURPTTROM`PPPTRSRVUQ`PSM`JO`JNUM`PMMMM`RMMMM`JMKO`JMKV`RSPOM`JT`OMQT`VV`RROVS`OMMMM`MKPR`MKS`ORO`OQMMVRVTMU`PNQRTOU`PMMM`MKO`MKU`PPVRQSVTUO`NRNURMMOQV`NSTTTONR`NRMM`NMMMMMM`MKUNPOSQRQP`MKV`ORSOPUPNMO`MKN`VU`QMOPOPPQNT`USQMMMMM`NSUQPMMV`ORQ`RMUV`NRM`NOV`NRR`NQO`NSV`NPS`NRQ`NPQ`NQN`NTS`NRO`NRN`NRU`NTN`NTM`NQT`NQV`NTU`NTO`NSP`NPV";}else if(_$$3===5){_$aD= !_$eD;}else if(_$$3===6){_$e1=_$kP.substr(_$jG,_$_r).split(_$$o.fromCharCode(257));}else{_$$T=[];}}else if(_$$3<12){if(_$$3===8){_$$T++ ;}else if(_$$3===9){_$eY.nsd=_$fF;}else if(_$$3===10){_$jG=0;}else{_$kt++ ;}}else{if(_$$3===12){_$kD=[];}else if(_$$3===13){_$aD= !_$hZ;}else if(_$$3===14){_$aD= !_$e1;}else{_$$r=0;}}}else if(_$$3<32){if(_$$3<20){if(_$$3===16){_$aD= !_$$J;}else if(_$$3===17){_$eY.lcd=_$fF;}else if(_$$3===18){_$$T[1]=_$aM;}else{_$bv=0;}}else if(_$$3<24){if(_$$3===20){_$aM=_$$x(0,850,_$_J(_$kD));}else if(_$$3===21){ !_$aD?_$$f+=17:0;}else if(_$$3===22){_$$T[4]=_$$x(26)-_$_b;}else{_$aD=_$ct>0;}}else if(_$$3<28){if(_$$3===24){_$a1=[1,0,0];}else if(_$$3===25){_$_b=_$$x(26);}else if(_$$3===26){_$en(_$kD,_$i9);}else{ !_$aD?_$$f+=7:0;}}else{if(_$$3===28){ !_$aD?_$$f+=46:0;}else if(_$$3===29){_$eD=[];}else if(_$$3===30){ !_$aD?_$$f+=23:0;}else{ !_$aD?_$$f+=-23:0;}}}else if(_$$3<48){if(_$$3<36){if(_$$3===32){_$eD.push('}}}}}}}}}}'.substr(_$ct-1));}else if(_$$3===33){_$k8(21,_$kl,_$eD);}else if(_$$3===34){_$$T=0,_$kt=0;}else{_$ax=_$gT();}}else if(_$$3<40){if(_$$3===36){ !_$aD?_$$f+=71:0;}else if(_$$3===37){_$$f+=-5;}else if(_$$3===38){_$$T[3]=_$bv;}else{_$aD=_$_V.execScript;}}else if(_$$3<44){if(_$$3===40){_$_b=_$_V.execScript(_$$g);}else if(_$$3===41){_$$T[5]=_$$x(26)-_$_b;}else if(_$$3===42){_$kl=0;}else{_$jG+=_$_r;}}else{if(_$$3===44){ !_$aD?_$$f+=0:0;}else if(_$$3===45){_$kD=_$_V.eval;}else if(_$$3===46){_$$x(95,_$ij);}else{_$hZ=_$gT();}}}else{if(_$$3<52){if(_$$3===48){return;}else if(_$$3===49){_$_b=_$kD.call(_$_V,_$$g);}else if(_$$3===50){_$$J=_$$x(26);}else{_$aD= !_$ij;}}else if(_$$3<56){if(_$$3===52){_$k8(71);}else if(_$$3===53){_$$f+=-19;}else if(_$$3===54){ !_$aD?_$$f+=4:0;}else{for(_$kl=0;_$kl<_$ij.length;_$kl+=100){_$bv+=_$ij.charCodeAt(_$kl);}}}else if(_$$3<60){if(_$$3===56){_$$f+=-6;}else if(_$$3===57){_$_n=_$gT();}else if(_$$3===58){_$$T[0]="kuffbo`edhyuxoijujyw|ud{y`|y}{|j`hyifediyJynj`{yjEmdFhefyhjo:yiwh}fjehi`wubb`0`}dxynEz`jynj`bewuj}ed`uxx;lydjB}ijydyh`ijh}d{`uvi`iyuhw|`jofy`~e}d`jyij`xewkcydj;bycydj`hyfbuwy`7wj}lyNEv~ywj`uffydx9|}bx`kiyh7{ydj`w|uh9exy7j`edbeux`fki|`zkdwj}ed`NCB>jjfHygkyij`5`hekdx`ifb}wy`kdxyz}dyx`|jjfi0`hyifediyJofy`;lydjJuh{yj`{yj;bycydj8o?x`zbeeh`hyuxoIjujy`fuhiy`juh{yj`wedwuj`jeIjh}d{`zhec9|uh9exy`V`ijujki`ijoby`&`|jjf0`iydx`cujw|`ducy`m}xj|`ifb}j`;awF`ib}wy`dkcvyh`byd{j|`fhejejofy`3`hyifediy`{yj`efyd`vexo`whyujy;bycydj`#`dexyDucy`;bycydj`|hyz`uwj}ed`{yj;bycydji8oJu{Ducy`hyikbj`wb}wa`edfhe{hyii`]`{yj7jjh}vkjy`S`R`hudxec`|uiEmdFhefyhjo`w|uh7j`\"`iyj`ayoxemd`{`eduvehj`edbeuxydx`jef`fzzZ`ikvijh`cujw|Cyx}u`.Z`**)`edbeuxijuhj`|}xxyd`x}l`ayo9exy`Z`jeBemyh9uiy`edj}cyekj`ev~ywj`weea}y`hycely;lydjB}ijydyh`edyhheh`X`}dfkj`xewkcydj`fyhzehcudwy`Y`fhejeweb`u`cun`ynjyhdub`wudFbuoJofy`r``hyifediyNCB`ihw`}dxynyx:8`{yjJ}cy`Cuj|`|yuxyhi`ighj`vkjjed`j}cyIjucf`NCB>jjfHygkyij;lydjJuh{yj`bewubIjehu{y`lubky`YY`hycely9|}bx`h`iyj7jjh}vkjy`FEIJ`fzv(_Z`$v_wubb>udxbyh`iwh}fj`{yj?jyc`ijh}d{}zo`wbyuh?djyhlub`ezziyj>y}{|j`[`fehj`(`ijuwa`xyiwh}fj}ed`ikvc}j`ijujkiJynj`wedijhkwjeh`wbeiy`jekw|ydx`veebyud`eh}ydjuj}ed`ylub`}`|eijducy`ylydj`}ddyh>JCB`>JCB<ehc;bycydj`iyj?djyhlub`fef`___JI___`1`}i7hhuo`>yuxyhi`zedji`fuj|ducy`C}wheCyiiyd{yh` 334 `c`|eij`wy}b`Hygkyij`Q`iybz`HyifediyWJofy`v`{yj8ekdx}d{9b}ydjHywj`dem`cekiyxemd`%`y8.-v9Z`$_OLJN`zyjw|`edikwwyii`j|yd`Qduj}ly wexy]`fuhydjDexy`iyjJ}cyekj`fzvZ`}djyhdub`l}i}v}b}jo`n`fzuZ`iwhyyd`=yjLuh}uvby`whofje`lyhjynFei7jjh}v`wedju}di`ezziyjJef`C}wheiezjXNCB>JJF`1 Iywkhy`}jycI}py`xuo`ynywIwh}fj`uvehj`he`Elyhh}xyC}cyJofy`ezziyjByzj`wedjydj`ulu}b>y}{|j`uxxyxDexyi` 3334 `oyuh`ayoi`Cyx}uIjhyucJhuwa`ulu}bM}xj|`}ddyh>y}{|j`~ied`cekiycely`ezziyjKd}zehc`ekjyhM}xj|`iwhyydN`wecf}byI|uxyh`yhheh`ekjyh>y}{|j`q`cyx}u:yl}wyi`7~un hyifediy vexo xywhofj}ed zu}byx W `cujw|yi`zehc`iocveb`$_ji`fzxZ`ezziyjM}xj|`Fhec}iy`ulu}bJef`beux`cyiiu{y`hycely?jyc`v[7y[<*u`hy{`iyii}edIjehu{y`ydkcyhujy:yl}wyi`uffydx`{yjIekhwyi`w|}bxB}ij`iwhyydO`F`cekiykf`uffb}wuj}edYncb`iyj?jyc`}iDuD`wudx}xujy`j}cyPedy`cedj|`hmvZ`$vc<ZuNPbHcbLoK>@`ynyw`1 ynf}hyi3`:ECFuhiyh`vyju`wubydxuh`hkd`7HH7O_8K<<;H`{yjEmdFhefyhjo:yiwh}fjeh`$v_iyjkf`ubf|u`ujjh}vkjyi`L;HJ;N_I>7:;H`{uccu`bewuby`udw|eh`hmwZ`dkc?jyci`fem`jhudiuwj}ed`QZW/uWz7W<]`elyhh}xyC}cyJofy`fzyZ`fuhiy?dj`whyujyI|uxyh`ulu}bByzj`$DM;+DpHaO~|cOpC*`{yjI|uxyhFhyw}i}ed<ehcuj`s`hmuZ`ZZZZ`l}ikubL}ymfehj`$v_fbujzehc`fzwZ`iyjHygkyij>yuxyh`_$hw`byzj`ujjh}vkjyDucy`vujjyho`jeKffyh9uiy`dkbb`_`ev~ywjIjehy`ju{Ducy`|ui|`vejjec`33ydx33`ujjuw|I|uxyh`jekw|cely`ev~ywjIjehyDucyi`{yjHyifediy>yuxyh`}wzw`i|uxyhIekhwy`Qev~ywj 7hhuo]`uwei`yiwufy`}ddyhM}xj|`zhuwj}edubIywedx:}{}ji`bewub:yiwh}fj}ed`)~y7ByIiu,`whyxydj}ubi`zuZW`lx<c`jekw|ijuhj`hyfbuwyIjujy`webeh:yfj|`bb`}l}i}v}boj|wduy{`w|}bxhyd`xyz}dyFhefyhjo`eii`f}nyb:yfj|`yMIv`x?zvsrb4u@rgtyHe}`C}wheiezjXNCB>JJFX[XZ`}mxdmeuXxx}BadkRbh`\\qRXU5S\\s`vo_fuj|`Dkcvyh`h}{|j`|jjf0YY`khhydwo`iehj`uxx8y|ul}eh`whjy`C;:?KC_?DJ`hyjwu`wybbkbuh`Ayoveuhx`cfj`fbk{}di`xyl}wycej}ed`JF;ECHHO7`ufyfhLeid}`m}cun`ujjuw|;lydj`<bui|`jdyl;hyjd}eF`xyl}wyF}nybHuj}e`dkcvyh}d{Ioijyc`l}xye`$_OMJK`1 IucyI}jy3Dedy`je=CJIjh}d{`yhumxhu|`-)-*,[,y`9h|ce\\yRYx\\SU`zeh;uw|`|jjfi0\\\\`y}e:yttu~`bylyb`ekjyh>JCB`$v_edDuj}lyHyifediy`whyujyFhe{huc`]42}42Y}42!Qydx}z]WW4`=yj7bbHyifediy>yuxyhi`jdyl;`w|uh{}d{J}cy`Q\\\\\"\\kZZZZW\\kZZ[z\\kZZ-zW\\kZZ/z\\kZZux\\kZ,ZZW\\kZ,Z*\\kZ-Zz\\k[-v*\\k[-v+\\k(ZZwW\\k(ZZz\\k(Z(.W\\k(Z(z\\k(Z,ZW\\k(Z,z\\kzyzz\\kzzzZW\\kzzzz]`me`<H7=C;DJ_I>7:;H`(+(*..`fu{yNEzziyj`zkdw`iwhebb`ayokf`edy`yuhw`hx`kiyFhe{huc`-Z-(,z,*-+,)-*+)-+,(`m}z}`--,+,(,v,/-*+(,+-[-+,+-)-**,,/,w,++)-/-)-*,+,x`ew}Xdew}lu`ihw;bycydj`lyhi}ed`cyj|ex`-*[(`awuhJj`dexyJofy`iqnf[qphkto`bIX9Mbj`}8i`xyl}wyeh}ydjuj}ed`l<yue?dwl@uuj?yduhwz~yyVeid}`/*`dwyiEyvyhhl`),`j9MI`}iIywkhy9edjynj`wb}ydjM}xj|`L`CI}Fdehj;ydljy`xyl}wy?x`_$xv`ij9uzy9ehy%V%jyi`Q\\h\\d\\j]`{yjIkffehjyx;njydi}edi`v}dx8kzzyh`|udxbyh`ybkxec`Cincb)XNCB>JJF`9ekdj`wb}ydjJef`+Z+((z`).`ci?dxynyx:8`lrdkd`khbR#xyzukbj#kiyhxujuS`N9EXhyoubFCM`HyFubbyuho`Z+X`9edw`:yl}wyEh}ydjuj}ed;lydj`efj}edi`>?=>_?DJ`eo`iwhyydX`jxuu`dedy`2;C8;: }x3`1 fuj|3Y`*-,+-**-,+,y,+-(,[,w*x*/**(w*-,+-**x,/,*(w*/-)*w,z,-,/,y,+,*(w*w,z,-,/,y(w*[-+-*,.,z-(,/-u,+(w*-,+-**(,[-),+++-),+-(*/,y,,,z(w+(,+-**w,[-+,y,),.`{yjFuhucyjyh`~uluiwh}fj0`hyifediy8exo`vmiyhjye`wb}ydjO`i|}zj`c?`vv.(a~`cy`ynfyh}cydjubWmyv{b`uffuDyc`4dufiY2}}}bbccccccccccc4\"nf*[[0yp}iWjdez1}}bbcc0ob}cuzWjdez\"3yboji \"|p\"3{dub dufi2`li}v}b}j}Ioujyj`Q^7WPuWpZW/\\U\\Y\\3]`exeD`yj|yhdyj`fefijujy`n;euvy}Boz}jeDVeuvy}Boz}jeDV<:FAid}dKeuvy}BViiyhxx7jie>jyIeu8y}BVjiykgyHxdyIeu8y}BVde}jwybyIhyvcycyHeuvy}BVhwEy{uc?dyfEeuvy}BViiyhxx7id:fkaeeBeu8y}BVjid?euvy}BVde}ihyLjy=euvy}BV:?KKjy=euvy}BVezd?hyiKjy=euvy}BVizyhFjy=euvy}BVbhKxuebdme:euvy}BVwdoi7jiykgyHbbu9euvy}BVjiykgyHbbu9euvy}BVyjujI_fkawu8euvy}BVohylewyH_fkawu8euvy}BVxueB_fkawu8euvy}BVde}ihyLjy=_fkawu8euvy}BVfkawu8_fkawu8euvy}BVezd?jdkeww7ycu{_bb}<ejk7euvy}BV`tZ,Oc`;;BJ9EH_DH8ME;I_H?M:DME9_EB;I`wbedy`|Fhel}xyh`wubbvuwa`{yjFhejejofyEz`yhe`w|uh{}d{`Cebvy}`c}`kfwie`ijd}eF|wkeJnuCic`__#wbuiiJofy`7vehj`V xywhofjyx ID0 `ikvijh}d{`[(-XZXZX[`|v_e}nydhjwzyu`y}xn`fuhydj;bycydj`behjde9{7Xb`,+,w,+,)-*-(,z,y(z,u-))(,)`l`__fheje__`__xlhy}yhl_kuubVj_yy_vm}xlh_yyhblkuyuVji_y_db}y_kycblkuyuVjz_n_}xlh_yyhblkuyuVjx_h_y}hld_mkfhfuVy_xy_vm}xlh_ykhhdumyfxf_Vi_yydbc}_kmkhdfuyf_x_Vxzhny}hld_mkfhfuVy_xy_vm}xlh_yih}wfhzjk_Vd_wy_vm}xlh_yih}wfhzjd_`ghwabc:e;nj|M@}>7f[iLOAK)H<CGm.?=zFE/(vlBD~W-pN8uIdkZJ9,{o_*Py+xt!6$%^&TRSU324X5Y01qsQ]r `ii`heej`uviebkjy`behjde9 (= hyoubFbuyHXnwech`|elyhredWxycudxrdedyrudo`kd}zehc(z`|jjifY0kYywjdhycX}}Xje{XldwbY{ed}~Xfi`myva}jHJ9Fyyh9eddywj}ed`hydhxFywhye?ixi`wia`jynjYncb`__cP`dyyh{`yHbu}LyxXeyHbu}LyxRecj Sw7}jyl Ne9jdeh b)RW(}vSj`R}e{hu}bd}Vd hjlyJu|bih|yxeSb`'ubyhjV wedz}hcV fhecfj x}iuvbyx zeh'V xewkcydj\\Xbewuj}ed\\X|hyz`}zhucy`|}ijeho`buij?dxyn`w|uhiyj`WWWWW m}dxem_hywj_[ WWWWW`iw`=cufyxu`WWWWW m}dxem_hywj_( WWWWW`yd}{d;vyMjG`iwhyydByzj`xvbwb}wa`heju{`vyzehykdbeux`myv{b`ec}j`huvk`*),[,w,w`u}hoj`bzb}wHjy`Z([`_}`kEEh`Cincb(XIyhlyhNCB>JJFX,XZ`oFu}h`RudoW|elyh`pmqKBB?`zYfhkvYY`<beuj)(7hhuo`}oqrAtm~|`CincbXNCB>JJF`yduvbyLyhjyn7jjh}v7hhuo`vkzzyh:uju`wyIyhlyhi\" 0`z}byducy`yx`lbuky`^\\iUr\\iU$`jwkxehf`wb}ydj>y}{|j`Fyhz`j}cyekj`xebbgTyr~~veyvruTfyrubjThz`ijujy`b.`xyz}dyFhefyhj}yi`wibiu`xub`f`vuiy`(y*w*+*[*v+z*[*w*w`z}byDucy`kd}zehcEzziyj`fi_}e|aexycVped7c}jue}Idujjh}JyccVped?yxyn:xV8ecHpgyykjid7c}jue}<duhyc`{cwrs`!dym zkdwj}edRSqylubR\"j|}iXu3[\"SsRSXu`jeeubhv`iwhyydJef`vbkyjeej|`vx_i`cyuhiyknJjy`}<ybyHxuhy`lyhjynFei7hhuo`m}dxem`hyjkhd uQv]R`ikzz}nyi`beuxNCB`emVd`Cincb(XNCB>JJF`Ev~ywjX?d~ywjyxIwh}fjXylubkujy`yd`IJ7J?9_:H7M`__udw|eh__`weea}y x}iuvbyx`yd mbeMxvyeIawjykRbh`djk`Fbyuiy yduvby weea}y }d oekh vhemiyh vyzehy oek wedj}dkyX`yvdbuFybx}kd{`dx{u`hw`yjukbulyWck}dybyi`be{`{bevubIjehu{y`uwbb|FduejVcf_u|jdce`/ovfIP+_7_e`ywuhJawujIyhk`n__tb}aofsbo_p~ofmq_ck`cI>}1yI}I}kcDdI1I}kc<du1Ide{1dA{Ju}}u1d<e{dI8{(=()1[}AJu8}(=()1[wCh}eeziOju }>1yh>u}d{e}u dI=i8 J1>Ijy}}} {B1|IjyJ}>1jI}uJ}A1jI}eJdII{J1d<{udi{e}1IBOke1kkuOIdJ1|Ny}I}J1ePd|e{di<{P1kIJ|<}P1eOjuI}J1}9ou1kIdkJf>IeJ1jB}}J1NI{}ad1uI}}JdN}m1y`Hyifediy`7xdehx}* X\\ZQ)WX] U=RrJCIIr>9WS`-*,/-,,+(Z,),z,*,++w+x`Cincb(XNCB>JJFX)XZ`Y0kiyh_zedji`whyujy;lydj`fu{yOEzziyj`dpuul`u|xdybz?uhych9uy}jde`kdyiwufy`sqSyR|wjuws1ycudyb}z__ dhkjyhqohj`~xzg5toopy`jeAy`~a}fh}pab}y Idtyozd ty~alynpzq DtyozdJ(jnlansIpJhj`myva}j9eddywj}ed`CBe{`{yjHudxecLubkyi`YJ-7oJhneMn=x`ghwabc:e;nj|M@}>7f[iLOAK)H<CGm.?=zFE/(vlBD~X-pN8uIdkZJ9,{o_*Py+xqsrt !#$%RSTUVW1356Q]^`jee8vb`lyhjyn7jjh}vFe}djyh`gexi,veqiFqxx)yqwxsq09`Cincb(XIyhlyhNCB>JJFX*XZ`K}dj.7hhuo`jauudbHeIkwdfhj}`ydEwyvhihl;yhdojiBj}` u 3 dym :ujyRS1`uwwybyhuj}ed?dwbkx}d{=hul}jo`b{ukdyui{`kCuj}jdevEyilhhy`ih{vrf)rhyw(Z(Zrudo`[Xbehjde9 (= hyoubFbuyHXnwech`|jjfi0YY`uii}{d`hyifediyKHB`whyujy:uju9|uddyb`k53.[xceptionB58)[xceptionB:2ath[xceptionB/ediaYontrollerB*6/.Wpplet[lementB*6/.-eygen[lementB1verflow[ventB58)2aint`9u`+z+z,x-*-**)-(,+`8`9ebbywj=uhvu{y`m}dxem\\Xefyd 3 zkdwj}ed \\RkhbV zhucyDucyV zyujkhyi\\S`fuhiy<hecIjh}d{`de}iiyhfn;yjuyhw`ynfb`aubjeuyddIyxiC{iyu`^Q\\nZZW\\n-<]T$`6xyvk{{yh`eFbhxfejc`Hy{;nf`!}cfehjudj1 l}i}v}b}jo0 l}i}vby !}cfehjudj1 m}xj|0 [ZZ% !}cfehjudj1 pW}dxyn0 ([*-*.),*, !}cfehjudj1`__ymxv}hyl_hlybuukyj`R^\\YTSrR\\YT$S`~ns}zxp`fkj`_bIyykdc}:_;?y_wHxeyh_hiVyydbc}VkbwbubIyykdc}`P.N>@@OXvc<ZuNPbHcbLoK>@RS`fu{yByzj`j9uzy:h}lyh%V%jyij9uzy?zhucy:h}lyh%V%jyij9uzy7kjecuj}ed%`~viw|ycy0YYgkyky_|ui_cyiiu{y`m0YY`Wau`{yjEmdFhefyhjoDucyi`u|fb7jnyj`cekiybyuly`hjyhk dojyfze_ b{vebuvEy~jw!  3k\"xdzyd}xy \"&&j foey z}mxdme!  3k\"xdzyd}xy \"&&_ b{vebuvEy~jw3  3}mxdme`X\\SUx\\R ;?IC`h{vuR(*ZV[[ZV+)VZX*S`}i;njydxyx`7~un hyifediy vexo hyfbuoV ynfywjyx ID0 `ciil}}bv}}wj|o{uyd`SR3  4ub{duky{ i`xewkcydjX`wb}ydjByzj`budhyjnyVdyyhwIbbk<jiykgyHj}avymXyfojejehfXjdycyb;jyIycuh<BCJ>VFKO;AXyfojejehfXjdyl;jfcehFbbujid?yhezy8VylecyikecdeXjdyckwexV__$_Z,)ee|}g_$__Vjdyl;xyjfohwd;u}xyCVuju:aw}b9VaweBhyjd}eFjiykgyHpecXyfojejehfXjdycyb;iw}|fuh==LIVy{ufdeXoxevXjdyckwexVjik~x7yp}IjnyJicXybojiXoxevXjdyckwexVywduchezhyfV{d}c}Jjd}uFywduchezhyFVuhyfe__Vy{uFybw}jh7yxeChyxuyHVi{ub<j}AvyMVhehhydeVywduhyjjKi}iy|jdoI|wyyfIV|jx}Md}cXybojiXoxevXjdyckwexVde}jujdy}hEdyyhwIVjiuBd{}b7jnyjXybojiXoxevXjdyckwexVauyh8yd}bXybojiXoxevXjdyckwexVde}jwybyiXjdyckwexVx?o8awuhJjy{XyfojejehfXji}BawuhJjnyJVxybbujid?hyx}lehF|whuyIi?XbudhyjnyVhybbehjde9u}xyCVijiyJzhyFjy=VyiebwXyfojejehfXjnyjde9e}xk7j}avymVyju:xyjuyh9yb}zXjdyckwexV__hyjjyIyd}zyx__XyfojejehfXjwy~vEVyceh|wV:(jnyjde9{d}hyxdyHiuldu9dyyhwizzEVhyjdyyikecdeXoxevXjdyckwexVyhkjfu9hyjd}eFiu|XyfojejehfXjdycyb;jyIycuh<BCJ>Vde}juw}z}jeDViybkHII9xy|wjuCjy{Vjdyl;yieb9j}d}XyfojejehfXjdyl;yieb9Vjkfd}_yhkwyi_ke{ei__Vy{uiiycdeV__nezyh}z__Vjyihu|9jbkuzyxXjdyckwexVbuyiXjwy~vEVywufiyj}|MyxeDi}VyjujIbbujid?XffuXyceh|wVxd}vXyfojejehfXde}jwdk<Vw}hyckDjdu}huLjdezXybojiXjdycyb;{d}bbehwiXjdyckwexVybkHjyihu|9II9VzzE{d}dhuMaweBifu9icXjdyckwexVI@NM_Vawuvbbu9xuebdme:veb8VylecyhXyfojejehfXde}jwyI7J7:9Vjn;vyM9KV:>uju:y{uc?jy=j}avymXyfojejehfX:(jnyjde9{d}hyxdyHiuldu9Vyp}iyhdeXjdycyb;jdyckwexXjdyckwexVyxeCxdyb8xdkeh{awuvXybojiXoxevXjdyckwexVy{du|wde}jwybyideXjdyckwexVNE8=D?:DKE8J9;@8E_;FOJ_J?DK_=LIXjdycyb;dhyjjuF=LIVb}ujy:yfojXde}jwybyiXjdyckwexV{ebu}:buxeCme|iVhyzzk8ywhkeIVib}jKd}{eBke{eIVyj}helu<xx7XbudhyjnyVoyahejuhybywwuWicWnXoxevXjdyckwexVxybvudy_hy{uduc_xhemiiufV}iwXyceh|wVy{x}h8hy|juymVyfoJy{du|wXyfojejehfXhyzzk8ywhkeIV|juFxxuXyfojejehfX:(|juFVy{du|wmy}lxy|wujyxuhyfedeVcyjioIyb}<jiykgyHj}avymVjdyl;_hyimehveujVzEyfojejehFjyiXjwy~vEVikjujIjbkuzyxVji}BawuhJe}xk7`sh{jkgfwdxwj`did9ieye:bky{viV9dieedJbhyyuVw<deiyhJwy}ecikVj?ddinxyyvxI:hjueV{dyeiwBIujbue{hdyiVwBuejbeI{hyuoFbuxeVuIdyi}ieijdeI{hyuiVIdiy}iIejdue{huyoFubxeyVjduihfhaVyjdiyhfauHy<hd?iVcIk}jb}u9eedbcyfxjVyMd}iedmxyEdfiVxd[eVcxdeiVcd(eicxd)iVcx*eiVxd+eVcd_i__Vd_fif7xyJdjyVnMyyehve8ymhi`m}dxemX`=yjHyifediy>yuxyh`W4Qzkdw]0`de}juweBycuh<jy{`$hFKy89ehimhyb9iu}iVw9Kh8meyiChiyuiy{y9jdhy`zkdwj}ed \\IU5\\R\\Sq\\IU`QDe ikffehj]`xuju0`Cincb(XNCB>JJFX+XZ`ohyjju8jy{`exmhgD`uo}d{zbu{`yjujIhyxhewyh_mf__Vde}jw7xhewyHhyxhewyh_mf__VoubhylE|iyhzyh_mf__VhejwybyIjyIhyxhewyh_mf__Vde}jw7chez`zeYnR\\U\\Sx`whyujyEzzyh`BEM_<BE7J`ud{by`de}jwyjy:XyfoaI`~viw|ycy0YY`zedj`cuenkJFwe|j}id`yVgv`Q1&]`q~cff`f:mthp|f{j-qfxmI:mthp|f{j-qfxm`^QuW`wb}ydj yhheh`z}wuj}ed`>?=>_<BE7J`iyjJ}cy`ehcu`Q\\ud`nyHjgy:?`<BE7J`uwwybyhuj}ed`}i<}d}jy`en_`wuw|y_`#z.(`#[-y`Cpef7yfhuduyw`kw9fibiu`)w,z,(,u,+,)-*(Z,/,*)x((,(,().)(,v,u(((Z,),w,[-)-),/,*)x((,),w-),/,*)u)))Z)+)Z,,).)[)/(x)/).,()+(x)[)[,),,(x,(,().)((x)Z)Z,[,[)Z)Z,(,*,),+)Z,((((Z--,/,*-*,.)x(()Z-Z-.(((Z,.,+,/,-,.-*)x(()Z-Z-.(()y)w(z,z,(,u,+,)-*)y`V khb0 `uD}l`yhheh9exy`wb}ydj ujjuwa xyjywjyx`iwhebbO`hyieblyxEfj}edi`,/`q \"}`^R50\\xq[V)sR50\\Xr$SSq*s`wbeiyx`[,`vlhyu`f__knwjkt}__G_knwjkt}_9jfijw4tij`I;D:`I{eke`EF;D`xhy}hl`|`,-`wha~`jhoq`H;?<?JED_AEE>__FJG__`xdy}j}zhy`yj}I`RudoWfe}djyh`}huzui`<ej`weddywj}ed`ge}e|`cep9eddywj}ed`y`j(oujuz`)`:yl}wyCej}ed;lydj`\"Q;]\"`x7`789:;<=>?@ABCDEFGHIJKLMNOPuvwxyz{|}~abcdefghijklmnopZ[()*+,-./UY3`x {;`feh`whyujyEv~ywjIjehy`F<:FX<:`xI`hud{yC}d`x_we`:}ifujw|;lydj`Dej}`{yj7jjh}vBewuj}ed`xhum7hhuoi`m}dxemXl}ikubL}ymfehjX`ul}{`lXqnrrv~kj`Z-`MyvN`w`Iydx`x}ifujw|;lydj`uxxdBa}`\"QK]\"`W4{yjjyh0`|jjf0\\\\`iwhebbM}xj|`ybjh`w_h_vMVy{_9_yhvM`iwhebbN`l}xyeYe{{1 wexywi3\"j|yehu\"rl}xyeYcf*1 wexywi3\"ulw[X*(;Z[;\"rl}xyeYmyvc1 wexywi3\"lf.V lehv}i\"rl}xyeYcf*1 wexywi3\"cf*lX(ZX.V cf*uX*ZX(\"rl}xyeYcf*1 wexywi3\"cf*lX(ZX(*ZV cf*uX*ZX(\"rl}xyeYnWcujheiau1 wexywi3\"j|yehuV lehv}i\"`fhyw}i}ed`iwhyydXeh}ydjuj}edX`fIwud<ewkiEkjVuffIwudAyo:emdVuffIwudAyoKfVuffIwudIydxHyfbuwycydjVuffIwudEdHyuxoIjujy9|ud{yHyfbuwycydjVuffIwudBeux>udxbyhVuffIwudFu{yBeuxyxVuffIwudIyjFu{yBeuxyxVuffIwudM}dxem9ekdj9|ud{yxV?d~ywj7ffIwudIwh}fjV}d~ywjyx7ffIwudIwh}fj`uwldiu`mxyhvy}hl`}i`Cincb(XIyhlyhNCB>JJFX)XZ`zkdwj}ed zyjw|RS q Qduj}ly wexy] s`w|uhuwjyhIyj`Cincb(XIyhlyhNCB>JJFX+XZ`fb`|$ee$a$Vx|$n$Vxi$n$V}k$y$Vb$hi$Vb$fi$Vb$hiVv$$eb{{hy$V7$N9JKB?VI7_N9;_7L_B7FII_V97_NE>AEVIh$uyoxe9yxb7yhxu;oynkwyj?xJd}|<iuhyc`4`,*-(,[--*/,x,[,-,+`bbhviu`Efyd`{yj;njydi}ed`l}vjhyu`F:|<lyybwju}}1vJ`?djb`d?jzdheuc}jde`-(,+-*-+-(,y(Z-*-/-Z,+,z,,(Z+z+z,w,z,[,*+),)-(,/-Z-*(Z)x)x(Z((,,-+,y,)-*,/,z,y(((Z(,(,(Z-*-/-Z,+,z,,(Z+z+z,*,[-*,++z,),w,z,),v(Z)x)x(Z((,,-+,y,)-*,/,z,y((`'Xwd? yb{ee=' rr hexdyl 43 SR`u3wudx}xujy0`@IED`P.N>@@OXDM;+DpHaO~|cOpC*RS`edkf{huxydyyxyx`uwh|`W4iyjjyh0`wheiiEh}{}d?iebujyx`ujjh}vkjy lyw( ujjhLyhjyn1luho}d{ lyw( luho}dJyn9eehx}dujy1kd}zehc lyw( kd}zehcEzziyj1le}x cu}dRSqluho}dJyn9eehx}dujy3ujjhLyhjynUkd}zehcEzziyj1{b_Fei}j}ed3lyw*RujjhLyhjynVZV[S1s`)()(`hyjk`VuffIwud9b}waVuf`7~un hyifediy vexo }i dej ydwhofjyxV hyifediy byd{j|0 `zedj<uc}bo`)+)Z`GGh8`*x-),-+z++*y*/+[++*++z`:ujyJ}cy<ehcuj`nyyf}hycjdbu`abumn`eviyhly` xyvk{{yh1 hyjkhd dym :ujyRS W u 4 [ZZ1sRSS`*.*).,`|jjf`19eeb~upp1Lyhxudu1>yblyj}wu Dyky BJ Fhe )+ J|}d1ju|ecu1B= Icuhj_> jyij Hy{kbuh1:?DFheWb}{|j1>yblyj}wu BJ *) B}{|j ;njydxyx1>yblyC_?dx}u1I;9HevejeB}{|j 8ebx1EH Ce|udjo Kd}wexy Hy{kbuh1:he}x Iudi J|u}1Audduxu Iud{uc CD1::9 Kw|yd1wbewa(Z[,_l[X[1Iucikd{AudduxuHy{kbuh1C? B7DJ?D= 8ebx1Iucikd{IudiDkc)B B}{|j1lyhxudu1>yblyj}wuDykyJ|}d1I;9<ubbvuwa1Iucikd{;ce~}1Jybk{k Iud{uc CD19uhhe}i =ej|}w I91<bocy B}{|j Heveje B}{|j1IeC7W:}{}j B}{|j1IeC9 Iudi Hy{kbuh1>ON}Okud@1iij1iucikd{WiudiWdkc*J1{c_cyd{cyd{1Be|}j Audduxu1j}cyi dym hecud1iucikd{WiudiWdkc*B1iyh}zWcedeifuwy1Iucikd{IudiDkcW)J J|}d19ebehEIK?WNJ|}d1:he}x Duia| I|}zj 7bj1Iucikd{Jybk{kHy{kbuh18yd{ub} EJI1C? BudJ}d{_=8 Ekji}xy OI1<PC}ueMk_=8[.Z)Z1|yblyWdykyWhy{kbuh1IIJ Cyx}kc19ekh}yh Dym1A|cyh Cedxkba}h} 8ebx1>yblyj}wu BJ () Kbjhu B}{|j ;njydxyx1>yblyj}wu BJ (+ Kbjhu B}{|j1Heveje Cyx}kc1:he}x Iudi 8ebx1{ekxo1iudiWiyh}zWwedxydiyxWb}{|j1I<}dxyh1dejeWiudiWw~aWcyx}kc1c}k}1CHewao FH9 8ebx17dxhe}x9bewa Hy{kbuh1Iucikd{IudiDkcW*B B}{|j1iudiWiyh}zWj|}d17uFud{Ouyh1wuikub18D Ce|udjoEJ 8ebx1nWiij1DejeIudiCoudcuhPum{o}1>yblyj}wu BJ )) J|}d ;njydxyx17i|byoIwh}fjCJ 7bj1Deje Iudi :yludu{uh} K?1Heveje 9edxydiyx 8ebx1Heveje Cyx}kc ?jub}w1c}k}yn1Deje Iudi =khcka|} K?1IIJ L}yjducyiy B}{|j1B=_Eh}ou1|owezzyy1nWiijWkbjhub}{|j1:<>y}7M-W71<PPMN8JEJ_Kd}wexy1:yludu{uh} Iud{uc CD 8ebx1iudiWiyh}zWcedeifuwy1Fuxuka 8eea 8ebx1B=W<PO}d{8}Au}I|kWI[+WL(X(1B=W<PO}d{8}Au}I|kWI[+WL(X)1>yblyj}wuDykyBJ Fhe )+ J|1C}wheiezj >}cubuou1Iucikd{Iudi<ubbvuwa1IIJ Cyx}kc ?jub}w17dxhe}x;ce~}1Iucikd{IudiDkcW)H1?J9 Ijedy Iyh}z1iudiWiyh}zWicubbwufi1nWiijWcyx}kc1B=_I}d|ubyiy1Heveje J|}d ?jub}w1wydjkhoW{ej|}w19bewaef}u1Bkc}deki_Iudi1<beh}x}ud Iwh}fj 7bj1Deje Iudi =khcka|} 8ebx1BJ>OIPA 8ebx1=I_J|u}1Iucikd{DyeDkc_)J_(17huv}w1|udiWiudiWdehcub1Be|}j Jybk{k1>OG}>y}W+ZI B}{|j1B}dxiyo zeh Iucikd{17H 9hoijub|y} :81Iucikd{ Iudi Cyx}kc1iucikd{WiudiWdkc*+1|udiWiudiWvebx1Bkc}deki_Iwh}fj1IIJ 9edxydiyx1Iucikd{:yludu{uh}Hy{kbuh17d~ub Cubuoubuc CD1Iucikd{J|u}RjyijS1<PBudJ}d{>y}WCW=8[.Z)Z1>yvhym EJI1=I*+_7huvR7dxhe}xEIS1Iucikd{ Iudi B}{|j19|ewe weeao1|yblyWdykyWj|}d1FD Ce|udjoEJ Cyx}kc1B=W<PAuJed{WC[/WL(X*1:he}x Iyh}z1Iucikd{I}d|ubuHy{kbuh1|yblyj}wu1B=W<PAuJed{WC[/WL(X(1Deje Iudi :yludu{uh} K? 8ebx1IIJ B}{|j1:<F;ce~}1myuj|yhzedjdym Hy{kbuh1HevejeDkc)H1:?DFheWcyx}kc1Iucikd{ Iudi Dkc++1IIJ >yulo ?jub}w1B=bewa* Hy{kbuh_Z.Z+1=yeh{}u1dejeWiudiWw~a1Jybk{k Iud{uc CD 8ebx1C?K? ;N Dehcub1>OG}>y}W-+I 8ebx1DejeIudiCoudcuhPum{o} 8ebx1okdeifheWvbuwa1|yblyWdykyWdehcub1Bkc}deki_Iyh}z1JC Ce|udjoEJ Dehcub1Iucikd{IudiDkcW)Bl B}{|j1Iucikd{ Iudi Dkc*+1Icuhj=ej|}w Cyx}kc1{yeh{}u1wuikubWzedjWjofy1Iucikd{ Iudi 8ebx1icubbWwuf}jubi1C<}dudwy FH9 8ebx1<PBudJ}d{>y}_=8[.Z)Z1Iucikd{7hcyd}ud1Heveje 8ebx1wydjkhoW{ej|}wWvebx1nWiijW|yulo1IIJ B}{|j ?jub}w1J|uhBed1nWiijWb}{|j1:}dveb Hy{kbuh1Iucikd{8yd{ub}Hy{kbuh1AD Ce|udjoEJIcubb Cyx}kc1|ofkhy1Iucikd{Juc}bHy{kbuh1Cubuoubuc Iud{uc CD1Deje Iudi Audduxu K?1|yblyWdyky1>yblyj}wu BJ ++ Hecud1Deje Iudi Audduxu 8ebx1Iudfou1Iucikd{Fkd~uv}Hy{kbuh1iucikd{WiudiWdkc*Bl1B=_Audduxu1Iucikd{ Iudi Hy{kbuh1Pum{o}WEdy1:he}x Iyh}z 8ebx ?jub}w1<PA7J@M1wekh}yh dym1Iucikd{;ce~}Hy{kbuh1C?K? ;N 8ebx17dxhe}x ;ce~}1Deje Duia| 7huv}w K?1B9: 9ec1<kjkhu Cyx}kc 8J1L}leWynjhuwj18ud{bu Iud{uc CD 8ebx1|udiWiudiWhy{kbuh1IDkcW)H1IDkcW)J1|udiWiudi1IIJ Kbjhu B}{|j1Heveje Hy{kbuh1Heveje B}{|j1>udkcud1dymb{{ej|}w1:<>y}7M+W71|udiWiudiWb}{|j1Fbujy =ej|}w1IDkcW)B1>yblyj}wu BJ *+ B}{|j1Coudcuh Iud{uc Pum{o} 8ebx1b{WiudiWiyh}zWb}{|j1C?K? ;N B}{|j1Heveje J|}d1IeC7 8ebx1Fuxuka1Iucikd{ Iudi1Ifuw}eki_Icubb9uf1iudiWiyh}z1:L Ce|udjoEJ Cyx}kc1Ijuvby_Ibuf1ceduwe1<bocyWB}{|j1zppoiWxeifo1IwhyydIudi1wbewa(Z[,1Heveje 9edxydiyx 8ebx ?jub}w17h}ub1AD Ce|udjo Cyx}kc1CejeouBCuhk M) cede1>udxiyj 9edxydiyx1Heveje ?jub}w1>J9 >udx1IIJ Kbjhu B}{|j ?jub}w1IIJ L}yjducyiy Hecud1Deje Duia| 7huv}w K? 8ebx1w|dzpn|Wcyx}kc1IDkc9edxW)J1wydjkhoW{ej|}wWhy{kbuh1xyzukbj_hevejeWb}{|j1Deje Iudi Coudcuh1Coudcuh Iud{uc CD17ffby 9ebeh ;ce~}1myuj|yhzedjHy{1Iucikd{CubuoubucHy{kbuh1uh}ub1:he}x Iyh}z 8ebx19Fe) FH9 8ebx1C? B7DJ?D=1Iucikd{AehyudWHy{kbuh1jyij*+ Hy{kbuh1if}h}j_j}cy1:yludu{uh} Iud{uc CD1IwhyydIyh}z1Heveje1wkhi}lyWzedjWjofy1IJ>y}j}_l}le1w|dzpn|1Iucikd{ 9bewa<edj )71Heveje 9edxydiyx Hy{kbuh1iucikd{WdyeWdkc)H1=@ Ce|udjoEJ Cyx}kc19|kb|e Dyky Bewa1hevejeWdkc)B1|yblyWdykyWkbjhuB}{|jynjydxyx1Iucikd{Eh}ouHy{kbuh1Iucikd{IudiDkcW*Bl B}{|j1CO}d{>y}_[.Z)Z_9(W8ebx1:<FI|ueDlM+W=81Heveje 8buwa1|yblyWdykyWkbjhub}{|j1{c_n}|y}1B=bewa* B}{|j_Z.Z+1=k~uhuj} Iud{uc CD1Cubuoubuc Iud{uc CD 8ebx1hevejeWdkc)H1IJN}|y}_l}le1<PP|kdOkud_=8[.Z)Z1dejeWiudiWw~aWb}{|j1webehei1Deje Iudi =khcka|}1Deje Iudi Iocvebi1Heveje B}{|j ?jub}w1Be|}j Juc}b1wkhi}ly1xyzukbj_heveje18|ui|}ju9ecfbynIudi 8ebx1B=_Dkcvyh_Heveje J|}d1cedeifuwyxWm}j|ekjWiyh}zi1>yblyj}wu BJ )+ J|}d1iucikd{WiudiWdkc)BL1:?DFhe1@eceb|uh}1iudiWiyh}zWb}{|j1|yblyWdykyWvbuwa1Be|}j 8yd{ub}1Coudcuh Iud{uc Pum{o}1:he}x Iyh}z ?jub}w1Heveje 8ebx ?jub}w1Dudkc=ej|}w1Iedo Cev}by K: =ej|}w Hy{kbuh1=yeh{}u 8ebx ?jub}w1iucikd{WiudiWdkc)Bl1okdeiWj|}d1iucikd{WdyeWdkc)JWwedx1Deje Iudi Coudcuh K? 8ebx1b{iyh}z1<POek>y}WHW=8[.Z)Z1Be|}j Fkd~uv}1vuiayhl}bby1iucikd{WiudiWdkc*Jl1iucikd{WiudiWj|}d1B= ;ce~}17d~ub}DymB}f}1Iucikd{IudiDkcW*J J|}d1Iucikd{AehyudW8ebx1c}k}ynWb}{|j1Deje Iudi Audduxu1Heveje Dehcub ?jub}w1=yeh{}u ?jub}w1iudiWiyh}zWcyx}kc1Icuhj Pum{o}1Heveje 9edxydiyx ?jub}w1Deje Iudi Audduxu K? 8ebx1:<F Iw Iudi >yky)Z_[Z)1B=_Dkcvyh_Heveje 8ebx1Fuxuka 8eea1nWiijWwedxydiyx1Ikdi|}dyWKw|yd1Heveje 8buwa ?jub}w1H}d{e 9ebeh ;ce~}1:yludu{uh} EJI1Icuhj Pum{o} Fhe1<PBudJ}d{>y}WCW=8A17dxhe}x9bewaWBuh{y Hy{kbuh1fhefehj}edubboWifuwyxWm}j|ekjWiyh}zi19kj}ly Cede1j}cyi1B= Icuhj_> jyij 8ebx1:?DFheWB}{|j1iudiWiyh}zWvbuwa1Be|}j :yludu{uh}1fhefehj}edubboWifuwyxWm}j|Wiyh}zi1iucikd{WiudiWdkc)B1COekd{ FH9 Cyx}kc1:<=ej|}wFM+W8?=+>AWIEDO1|udiWiudiWcyx}kc1IIJ >yulo1B=W<PP|kdOkudWCZ(WL(X(1CoudcuhKDym Hy{kbuh1Deje Duia| 7huv}w 8ebx1Iucikd{=k~uhuj|}Hy{kbuh1zudjuio1|yblyWdykyWb}{|j1>yblyj}wu Dyky EJI 8ebx1dejeWiudiWw~aWvebx1iucikd{WiudiWdkc)H1B}dxiyo Iucikd{1iucikd{WiudiWdkc)J1IwhyydIyh}zCede1;Jhkcf Coudcuh_PM1|yblyWdykyWj|}dynjydxyx1Deje Duia| 7huv}w1B=_=k~uhuj}1Icuhj_Cedeifuwyx1Juc}b Iud{uc CD1B= ;ce~} Ded7C;1Heveje 9edxydiyx B}{|j ?jub}w1{c_~}d{au}1<PBudJ}d{Aud>y}_=8[.Z)Z1b{jhulyb1fubuj}de1=yeh{}u 8ebx1:he}x Iudi1B=_Fkd~uv}1Icuhj=ej|}w 8ebx1Iucikd{ Iudi J|}d1IIJ 9edxydiyx 8ebx19ec}wi_Duhhem1wekh}yh1Eh}ou Iud{uc CD1|yblyWdykyWb}{|jynjydxyx1<PBudJ}d{>y}WHW=8[.Z)Z17H 9hoijub|y}>AI9I :81iyh}z1HJMIOkyHekx=e=Zl[WHy{kbuh1C}ueMk_fhyl1<PO[A1B=_Dkcvyh_Heveje Hy{kbuh17dxhe}x9bewa1IeC7 Hy{kbuh1>OG}>y}W*ZI B}{|jn1b{WiudiWiyh}z1:udw}d{ Iwh}fj 8ebx1xyzukbj1iywWhevejeWb}{|j19ebehEIK?WHy{kbuh1jyij Hy{kbuh1Juc}b Iud{uc CD 8ebx1<PO}d{8}N}d{I|kWI[,1HevejeDkc)B B}{|j1cedeifuwyxWm}j|Wiyh}zi1iucikd{WiudiWdkc)+19eeb ~upp1Iucikd{DyeDkcW)B1IJN}d{au}1IwhyydIudiCede1:<FMuMuM+W=81Iucikd{IudiDkcW)B B}{|j18ud{bu Iud{uc CD1=khcka|} Iud{uc CD1I;9HevejeB}{|j1|ozednhu}d1CO}d{>y}=8[.Z)Z9W8ebx1iucikd{WiudiWb}{|j1>yblyj}wu BJ ,+ Cyx}kc1:he}x Iudi <ubbvuwa1Heveje Jyij[ 8ebx1Deje Iudi Coudcuh 8ebx1iudiWiyh}zWwedxydiyxWwkijec1Iucikd{DyeDkcW)J1Iucikd{ Iudi Dkc)+1cedeifuwy1JB Ce|udjo Cyx}kc1|yblyWdykyWcyx}kc1BJ>OIPA1Heveje 9edxydiyx wkijecy 8ebx1Coudcuh)1:he}x Iudi :yludu{uh}1I|ueDl_fhyl1iucikd{WdyeWdkc)B1<PBudJ}d{>y}W;BW=8A1okdei1iucikd{WdyeWdkc)J1J}cyi Dym Hecud1|yblyWdykyWvebx1dejeWiudiWw~aWhy{kbuh1Deje Iudi =khcka|} K? 8ebx1:?DFheWvbuwa1<PBudJ}d{>y}W;BW=8[.Z)Z1IIJ L}yjducyiy Cyx}kc1Heveje 9edxydiyx B}{|j1IIJ L}yjducyiy 8ebx17H :@WAA1:he}x Iudi I;C91Deje Iudi Coudcuh K?19ec}d{ Ieed1COkffo FH9 Cyx}kc1Heiycuho1Be|}j =k~uhuj}1Heveje 9edxydiyx wkijec 8ebx1<PBudJ}d{>y}IWHW=81>yblyj}wu Dyky EJI1Au}j}_fhyl1HevejeW8}{9bewa1<PO8AI@M1>udxiyj 9edxydiyx 8ebx1Iucikd{=yeh{}ud1:udw}d{ Iwh}fj1iudiWiyh}zWwedxydiyx1|udiWiudiWj|}d1Iucikd{IudiDkcW*Jl J|}d1Be|}j Ex}u18|ui|}ju9ecfbynIudi`d9luHuyiydhx{}9djeyd(n:j`fu`fu{yJef`rr Q'ydW`{yj7bbHyifediy>yuxyhi`y{uk{dub`vGxtaEatnxgWGxtaE`uwbbhy`awuhJjeDe:ic`xyvk{{yh1_$xvR`0\\xU`xkcbfb7`{yjKd}zehcBewuj}ed`vy|ul}eh`2!WWQ}z {j ?; `-(-+,y-*,/,x,+`yduvby_`WmiWxujuWfhyl}ymWybycydj`ukx}e`\"Q<]\"` Q kqh\" b0\"i j\"0kiddjZki[}X|fefXdwy\"escqV\" bk\"h  \"0kidjj0kiydaXu}X{jd\"y sqVh\"bk0\"  j\"kiidj0XkzddmyxdjyXsjV\"\" kq\"h b\"0i dj0kkidjxXy}}ufieXcwV\" skqh\" b0\"i j\"0kiddjXkj}yfebhXs{V\"\" kq\"h b\"0i dj0kkidj}XnhbjyycwXe\"isyqV\" bk\"h  \"0kidjj0kiidwXk|dbxxyXV\" skqh\" b0\"i j\"0kiddjXk{beXbey{eXcw/0)[\"Zs(qV\" bk\"h  \"0kidjj0kiXdb[eXe{y{Xbcw0e)[Z/s(V\"\" kq\"h b\"0i dj0kkidjb(XXe{{eXbwy0e[cZ/()V\" skqh\" b0\"i j\"0kiddj)kXX{b{ebewyeX[c/0()\"Z sqVh\"bk0\"  j\"kiidj0*kXd{beXbey{eXcw/0)[\"Zs(   ]          s `yj%V%xuy|hyccu|%`wedieby`{yejd9njjy`lyedhx`o`nlk|rql~ljmibqb`ev8k`+),+*x,z,(*,,/,w,w*,,z-(,x+*,z,z,w(w+),z,-,z-+*x-),+`*u,[-,,[*+-.,),+-Z-*,/,z,y`+)`(.-+-(,w(w(Z,,-(,[,x,+*y,[,x,+(w(Z,,,+,[-*-+-(,+-)(/(Z)x)y(Z-v`Q\\\\\\\"\\kZZZZW\\kZZ[z\\kZZ-zW\\kZZ/z\\kZZux\\kZ,ZZW\\kZ,Z*\\kZ-Zz\\k[-v*\\k[-v+\\k(ZZwW\\k(ZZz\\k(Z(.W\\k(Z(z\\k(Z,ZW\\k(Z,z\\kzyzz\\kzzzZW\\kzzzz]`$vz./uZ[,$`yjud Cuw|}dy Kd}`fei}j}ed`)[),))).)*`z}dyrweuhiyrdedyrudo`C;:?KC_<BE7J`d7buiohyeDyx`E `HJ9Fyyh9eddywj}ed`IyjHygkyij>yuxyh`wj}edRS qluh`dyu __kpyuhtlXfjh{joElFdf`iuly`zkdwj}ed wbyuh?djyhlubRS q Qduj}ly wexy] s`sTi\\]\\yxew yl}judQ\\Ti\\q`KI'V 'yd']`J`$`ymavj}}>xxdy`^RR50Q\\xuWz]q[V*sR500rSSqZV.sSR00S5RR50Q\\xuWz]q[V*sR500rSSqZV.sS$`vymwkVjn;v`hgulyhuFhydoxdwh`fhyw}i}ed cyx}kcf zbeuj1luho}d{ lyw( luho}dJyn9eehx}dujy1le}x cu}dRS q{b_<hu{9ebeh3lyw*Rluho}dJyn9eehx}dujyVZV[S1s`kibo`Jekw|;lydj`{7e9jdeh`Z[)-*-.[*(`p]q)`g{ifhvmzivGizepyexi`uiodw`ci9hofje`<heumxhj y|w bu bejj y|x zyd}xyf ehon| dubxhy`[.fn '7h}ub'`j`jyiji`fuhiy;hheh`wb}ydjN`$_wedz}{__Xxyju}b__ U3 [`ZXZXZXZ`weea}y;duvbyx`xv`x?iiywehFhyxdyH`hyime`_gvvxh{}`+Z***,(y+Z,*,,*)-*-(,w`W4Qxuju]0`ikvjhyy`wecfbyjy`nWfmW{buii`yMn}d}I@h8x}y{`Cekiy`oj{rec{pkn`yceh|9iiybxuy>`7|buf`jfuw`xbe|fd}xVbe|fd}d}ezxVbe|fd}ycuj`feij`Ijh}d{`ujehVxewkcydj`<kdwj}ed`whyxydj}ubbyii`fyi`ed}wywudx}xujy`fuhiyhyhheh`iwuby`b}dyDkcvyh`uffI`}<yh`b}yv`}~du`ukx}eYe{{1 wexywi3\"lehv}i\"rukx}eYmul1 wexywi3\"[\"rukx}eYcfy{1rukx}eYnWc*u1ukx}eYuuw1`e`hyzyhhyh`cepHJ9Fyyh9eddywj}ed`Ux\\Y\\}huzuI U]X/WZQSUx\\RY\\de}ihyL`bwy}`yjjnu8yi}byd`vb`iyjBewub:yiwh}fj}ed`uhyl`ubyhj`xtrcgtyrEvwevfyStrcgtyr_evwevfyStyvt|?bxzaSuvtelcg6r}}srt|`f_m_y_whxeyhyhhF`if|k`Cincb(XNCB>JJFX*XZ`3jhky`|cuycyhu|xxercwykWdwjh|iuVy|jcuycyhu|xxercwykWdkjWhhbeybihlVyc|cu|yyhruyxcbyyWdbjj}yidd{}lWyyidWjeihjyuW{effhuVc|hc|yxyruwbueejd}hWumyfhf`__d|}j{hcyu`beuxyx`Gk}Jw}aXcGywka}cJy}`MKy9`b<?;_0;0_3::6`ylubkujy`b}daFhe{huc`[[-X.,`hjyd_xeiy`RQZW/]q[V)sR\\XQZW/]q[V)sSq)sr RRQZW/uWz]q[V*s0Sq-V-sQZW/uWz]q[V*srRQZW/uWz]q[V*s0Sq[V-s0rRQZW/uWz]q[V*s0Sq[V,s0QZW/uWz]q[V*srRQZW/uWz]q[V*s0Sq[V+sR0QZW/uWz]q[V*sSq[V(srRQZW/uWz]q[V*s0Sq[V*sR0QZW/uWz]q[V*sSq[V)srRQZW/uWz]q[V*s0Sq[V)sR0QZW/uWz]q[V*sSq[V*srRQZW/uWz]q[V*s0Sq[V(sR0QZW/uWz]q[V*sSq[V+srQZW/uWz]q[V*s0RR0QZW/uWz]q[V*sSq[V,sSr0RR0QZW/uWz]q[V*sSq[V-sr0Sr00RzzzzR0Zq[V*sSqZV[s0SqZV[sRR(+QZW+]rR(QZW*]r[qZV[sQZW/]SqZV[sQZW/]S\\XSq)V)sR(+QZW+]rR(QZW*]r[qZV[sQZW/]SqZV[sQZW/]SrRQZW/uWz]q[V*s0Sq[V*s0RR(+QZW+]rR(QZW*]r[qZV[sQZW/]SqZV[sQZW/]S\\XSq)V)sR(+QZW+]rR(QZW*]r[qZV[sQZW/]SqZV[sQZW/]SS S`hud{yCun`b}dyDkcvyhVwebkcdDkcvyhVz}byDucyVb}dyVwebkcdVxyiwh}fj}ed`yid|`?dz}d}jo`BEM_?DJ`wud7~un9ekdj`eb` |y}{|j3, m}xj|3[ jofy3uffb}wuj}edYnWi|ewamulyWzbui| ihw3`*),+,,+),.,[-(-Z`wedjydjWjofy`ymavj}}l}i}v}boj|wduy{`cekiyydjyh`mvy}aFjhy}ijidyIjejuhy{`>JCB7dw|eh;bycydj`myva}j?dxynyx:8`xywexyKH?9ecfedydj`jh}c`cepil}}bv}}wj|o{uyd`ykhicdyu`qA>BCD`vo_buvby`hyuxmh}jy`W4Qev~]0`khb`ux`-Z,[-(-),+*,,w,z,[-*`+*,+-.-*`jdyjde9jnyj`huvde}juweb`whyujy8kzzyh`m}j|9hyxydj}ubi`P.N>~`}bxyh`Cincb(XNCB>JJFX,XZ`,-,+-**/,x,[,-,+**,[-*,[`uj`_suQpWWZ]/(qs(Q_Wu]p$U`e^\\$CgIb]cOe_CgIbLIU]cNNe_`zb}Ibojyb`BHKuju:ej`Qde cuf]`udxhe}x`kdbeux`kc`|f`m}dx`hyx}hywjyx`buhoRySj cj7}wNl yd9jebh e(RW)jvS}`chez`Jo`R^\\iTSrR\\iT$S`}ji{edduzu}b`vo_buvyb`JH?7D=B;_IJH?F`vexoKiyx` |eij `RwebehW{uckj`bhKbud}{}hEjy=`-(+*,+-.-*`ixf`kjzW.`buij?dxynEz`xewkcydjXxewkcydj;bycydjX` ihzbn `+z-Z,w,[-/---(,/,-,.-*+(,+,),z-(,*,+-(+)-*,[-*,+(w+z-Z,w,[-/---(,/,-,.-*+(,+,),z-(,*,+-(+),+-*+),+,w,+,)-*,z-((w+z-Z,w,[-/---(,/,-,.-*+(,+-)-+,x,+(w+z-Z,w,[-/---(,/,-,.-*+(,+,),z-(,*,+-(+Z,+-(,,,z-(,x*[,)-*,/,z,y(w+z-Z,w,[-/---(,/,-,.-*+(,+,),z-(,*,+-(+(,+,),z-(,**[,)-*,/,z,y`Djy=`*,,/-(,+,,,z-.(z(.+w,*(v(/`x}ifbuo`iwhebb>y}{|j`Cincb(XIyhlyhNCB>JJF`-)-*,[-*-+-),(,[-(`d}`veeai|ybz`foh9`yFzhheuc`Q|jcb]X{yj8ekdx}d{9b}ydjHywjRSX`CincbX:EC:ewkcydj`,`cep?dxynyx:8`xyjuw|;lydj`$v_zyjw|Gkyky`edjekw|ijuhj`ubf}fjw}uYend|WeimwuaWlzyib|u`7x`uxuj`eawjy`ujjhLyhjyn`>CJ9Bduul;iybycjd`b`u{y`k`7w`W4lubky`[(`Rzkd`9II`\"0` `wf` W `\\h`\\d`?;`XX`\x09`\\\"`0 `\r`Y5`QN]`x`\\\\`hyx`\x0c`udo`de `\n`V `wx`}x`ydkcyhuvby`ea`\\j`}{`\\z`\x08`QC]`\\k`wubbyy`wv_` S`\\v`\\`(x";}else{_$$r=_$gT();}}else{if(_$$3===60){_$kD=_$eY.nsd;}else if(_$$3===61){_$aD= !_$_b;}else if(_$$3===62){_$_b="_$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');}else{_$k$='\n\n\n\n\n';}}}}else{if(_$$3<80){if(_$$3<68){if(_$$3===64){ !_$aD?_$$f+=3:0;}else if(_$$3===65){_$aD=_$$r<_$$g;}else if(_$$3===66){_$aD=_$kt==64;}else{_$aD= !_$$T;}}else if(_$$3<72){if(_$$3===68){_$aD=_$kt%10!=0|| !_$$T;}else if(_$$3===69){return _$_b;}else if(_$$3===70){_$kP="Łĳɲɳĳম\x00喡,ā=ā[ā(āā.ā;ā(){return ā],ā);ā?ā+ā),ā<ā;}function ā){var ā=0,ā[5]](ā=0;ā !ā(){ā[ --ā]=ā:ā++ ]=ā&&ā= !ā>>ā[ ++ā(),ā&ā+=ā.push(ā[24]](ā):ā=(ā);}function ā));ā++ )ā=[],ā=new ā!==ā){ā||ā[55]];ā(){var ā===āfunction ā!=ā)ā&& !ā>ā){return ā[0],ā&&(ā-ā?(ā|| !āreturn ā>>>ā[1],ā<=ā[24]]((ā();ā||(ā;return ā*ā[42],ā][ā;for(ā<<ā++ ){ā[42]),ā[55]],ā[19];ā+1],ā){if(ā:0,ā==ā={},ā]):ā/ā;}ā[14]]==ā++ ]=(ā;function ā(){return +ā){}ā[42]]^ā++ ]<<ā^ā[55]]===ā](ā[12])&ā)return ā>=ā++ ;ā[63])&ā[19],ā-=ā,0,ā[53]](ā,true);ā|=ā in ā[3],ā[43])&ā[11][ā];if(ā&& !(ā[55];ā&&( !ā):0,ā= !(ā[7][ā]===ā({ā[2],ā):(ā[5]&ā[56]][ātry{ā=1;ā)?ā[12]),ā++ ),ā:1,ā);if(ā=0;for(ā[55]]-ā.y-ā<0?ā[12];ā});ā[12]](ā;}}function ā; ++ā[35]](ā];ā.length;ā+=1,ā[4],ā[9]][ā);return ā[63]);}function ā()[ā[63]&ā);function ā[54]||ā.x-ā);else if(ā)):ā[55]]>ā++ ],ā[12]&ā=[];for(ā=((ā[10]](ā[21][ā];}function ā[55]),ā|| !(ā]],ā=0:ā||( !ā(118)-ā){ typeof ā[55],ā=[ā+2],ā);}ā=true,ā))&& !ā[5],ā=this.ā(0);ā[63];ā);}catch(ā.x*ā[55]]/ā+=1:0;ā.y*ā[26];ā[12],āreturn;ā;if(ā){}}function ā[3];ā[62],ā ++ā=0;if(ā=1,ā[2];ā]|ā))||ā++ ,ā[12])|ā(118);ā[55]?ā[7]](ā++ ):ā[53]](0,ā[42]);}function ā[45]+ā=[];ā[10];ā[77]+ā-- ,ā));}function ā[83],ā[28]](ā], !ā[20][ā[20];ā[63])|(ā[(ā.x)+(ā[31]?ā[91],āfor(ā[29]](ā[21],ā[6]);ā;)ā[57],ā[6][ā+=2:0;ā)+ā===0?(ā[43]^ā[23],ā%ā; typeof ā[16][ā[1])<<ā]);ā[13]](ā[72]);}function ā[33])<<ā-1],ā()),ā();}function ā[49]=ā[43]]^ā[59]);}function ā[10],ā();if(ā[44]=ā[63])[0],ā&& !( !ā[44][ā[19]);ā))|| !ā[34]](ā[70]),ā[80],ā[56]);}function ā.y),ā[55]]+ā[55]]%ā[14]);}function ā[43])|(ā[56];ā])):ā[10])&ā[12]^ā=0;while(ā)if(ā]=108,ā]=(ā[46]?ā-=3,ātry{if(ā[13],ā){return(ā+=3:0;ā[80]](ā+=0:0;ā=0:0,ā[19]^((ā[57]+ā]^=ā)|0,ā[34],ā[7];ā[33]),ā[6];ā[73]](ā;if( !ā[13]);}function ā):0;return ā].ā)%ā)&ā[55]]-1;ā-=4,ā.slice(ā[51]](ā[27]+ā[42]]<<ā[11]?ā.join('');}function ā[11];ā[75]+ā,this.ā[53]](0),ā++ )if(ā))&&ā+=1;ā-=2,ā()][ā[23])]))&ā[2]))+ā[415](ā.length,ā[59]](ā+1)%ā>0;ā('');ā+=(ā:0;return ā[8]);ā[37],ā)&&ā[89]:0,ā[95]);}function ā()*ā[40]];ā[55]&&ā[67],ā[12]);}function ā[1];ā.y)/(ā[0][2];ā[22]][ā[47]:0,ā[28],ā++ ];else if((ā[((ā[24]];ā;try{ā.x+ā)),ā)){ā[29];ā);}}function ā)?(ā[39]),ā};function ā.x,ā[6]);}function ā[68]](ā[48]),ā[63]),ā[63]);ā);for(ā[39][ā[52];ā);while(ā[10]),ā[4]);}function ā,{ā[19]?ā+1]&ā[0]](null,ā>0||ā[23]);}function ā[62];return ā)||(ā=false:0,ā[26]||ā[9]);}function ā[56]](ā[76]);}function ā)==ā,'');}function ā[11]]+ā+=5:0;ā[3]](ā[21];ā[17]),ā[42];ā[42]?ā[81],ā[10]);return ā[36]);}function ā[13];ā]!==ā[18];ā[74]);}function ā[55]);return ā[82]);}function ā=false,ā)===ā[48]);}function ā[55]];for(ā[93],ā[23])<<ā[13]<=ā[57];ā.x),ā[11]||ā[24]](((ā[2]=ā;){ā[62])|(ā[52]),ā;}}catch(ā[38]](ā+3],ā[62]](ā]:(ā[3]);}function ā]<ā]+ā))ā[20]](ā[48]);ā[53]);}function ā[47]?ā[47]=ā[24]]({ā[23]?ā[38]][ā+3])):ā():0,ā(118),ā[42])|ā[3]);ā];}}function ā[85]]=ā):0;for(ā[4];ā[52],ā);else return ā(60,ā(126,ā[38]),ā=( !ā[21]),ā[12])),ā!=null?(ā:0;ā[71]);}function ā[26]?ā[61],ā[26][ā[0]^ā[0][ā[39]](ā[42]:0,ā]=\"\",ā[0]](ā[55]]),ā(9,ā[94]);}function ā[60]](ā[41]);}function ā]):(ā.charCodeAt(ā[88]);}function ā[19]),ā.split('');for(ā[44]][ā())in ā[57]](ā>0?ā);}}catch(ā[14]&ā<<1^(ā[54]?ā[83]);}function ā[14],ā[54],ā[14];ā[39]);}function ā[79]);}function ā[10]?ā[45]);}function ā[6]||ā()?ā+=-4;ā[90]:0):0,ā[17]+ā[30]+ā[17];ā))return ā):0):ā[28]),ā();for(ā();return ā[86]](ā[51]);return ā[46];return ā[55]?arguments[2]:1,ā.z;ā[90]);}function ā[94];ā[57]);ā[54])&ā[14]]==0?ā)try{if(ā(1,0),ā)return false;return ā[17]],ā[71]],ā[4];for(ā|=1;ā)):0;if(ā+=14:0;ā[32]|| !ā[75]];ā[9];ā[23]?arguments[3]:0,ā[84]);}function ā[1]>ā[1]=ā[5]=ā[42])+ā[1][ā[1]^ā[33]);return ā[55]])===ā;else ā[63]^ā[24],ā[63]+ā+1])):(ā[22]];ā(122,ā(102,ā<=94?(ā[32]][ā[23]]^ā<=59?ā+1])):ā||0,ā[5]);return ā[37]](ā[18]);}function ā[37]];ā+=-32:0;ā[21]][ā+2])):ā(){return(ā>0)for(ā;return[ā[19])|(ā[80]+ā(){return[ā[58]);}function ā[40]]()));ā[5]](this,ā[12])return ā[23]);ā[77]);}function ā[29])|((ā()];ā[28]]((ā[55]]&ā:(ā]=83,ā[19])),ā[14]]==1&&ā[43]);}function ā?1:ā+=6:0;ā]=1,ā[32]=ā[55]];while(ā.y;ā++ ):0):0;ā):0;}function ā[73]);}function ā[39]=ā[52]+ā[31]+ā){if( !ā[12]=ā[66]);}function ā,[ā[35]);}function ā=arguments.length,ā[11]);ā[26])return[ā[46]&&ā?0:ā[32]);return ā]>>ā+1]=ā[0];return ā[8])this.ā[33]);}function ā[48]*(ā-((ā[54]);return ā[15]][ā[21]);return ā[23];while(ā[1]+ā]=10,ā[59]),ā[61]);}function ā){this.ā[56]];ā[87]](0,ā){for(ā[69]+ā[69]],ā};ā[29]](0,ā[10]],ā[49]&&(ā]]:(ā<=56?(ā>>>0),ā[42]=ā[25],ā>=0;ā[81]+ā[46]+ā[3][ā[46]=ā+=7:0;ā=null,ā.split(''),ā[81]]([ā[25]]==ā= typeof ā)<<ā[67]),ā[64]);}function ā(1,ā+4])):ā){return[ā[69]);}function ā+=4;ā)!==true?(ā[26],ā[127]^ā+=1:0,ā=2;ā]>=ā];}return ā[6]=ā[5]);ā[1]);if(ā]):0;return ā.x&&ā[93]+ā[11]=ā[3]=ā[16];ā[1]);ā+(ā[32]);}function ā];}ā});return;function ā[90],ā>>(ā]!=ā[34]+ā[74]+ā[44]);}function ā[25]);}function ā[21]);}function ā[6],ā[72]];ā[6]+ā[13]&&ā[1]||'',ā[66]],ā[2][ā[2]^ā+1},ā[85]];ā[46],ā());ā]]]=ā++ ];}ā[16]);}function ā[35]];ā[102];for(ā[52])&ā(203,ā]]=ā]]:ā,1,ā[37]);}function ā]^ā[12]&&ā+((ā]>ā[78]);}function ā[19]],ā]-ā]/ā]*ā)(ā)*ā)-ā)/ā){return((ā[77]](ā[78]];ā){}function ā<=43?ā[15]);}function ā[85]][ā[42];return ā[83]]=ā+=4:0;ā[43](ā[28]];ā(){this.ā[55]]>=ā[51]];ā[23];ā[12]);ā=0;}function ā[35]+ā.y))*ā[35],ā[55]|ā[71]),ā[35]?ā, ++ā)):0;return ā.apply(null,ā[11],ā=null;ā+=-9;ā-=5,ā[85]](ā<=1?(ā[34]);}function ā[43]]<<ā[39];ā[15]),ā-1),ā={};for(ā[42])):ā[42],(ā[13]];ā[7]),ā[13]][ā<=36?(ā]),ā[(((ā.y))),ā[16]](ā];else if(ā[60]),ā[19]||ā)>1?ā-1+ā[55]?(ā[0]);}function ā[51]+ā[55]*ā[21]]();ā[63]](ā<=46?(ā[8];ā[44];return ā[29].ā[29],ā]);return ā[0];ā<=48?(ā|| !( !ā=null, !this.ā+2]=ā[19])],ā[51])*ā[31]](ā[51]);ā[47];return ā[34]);return ā[48]];ā[48]](ā[75]);}function ā[8]](ā[8]];ā[1]];ā[82])!=ā[22]);}function ā[9]];ā]++ :ā[49]]=ā[48]):0,ā[42]]]^ā[47]]=ā]&ā()?(ā[7]);}function ā[23]]||ā[5]);}function ā&& typeof ā[18]);ā[59]][ā[0]);ā]]):(ā[11]);}function ā[55],( ++ā<=28?(ā[45],ā+=3;ā++ ):0,ā[49];ā=[[],[],[],[],[]],ā){return[(ā[20]][ā[47]](ā[87],ā(100);ā[47]];ā]++ ,ā.substr(ā)|(ā)||ā[40]]=ā[0]](this,ā[57]];ā[10]?(ā[5]);else if(ā[68]);}function ā[37]])return ā+=99:0;ā[26]]():ā]=Number(ā[35]='';ā[42]],ā+2]));else throw ā++ ):0;for(ā[12]-(ā[39]);return ā[0][1])&&( !ā;if( !(ā];while(ā[143],ā[21]));ā[8])));ā[47]))||ā[46]='';ā[14]+ā[33],ā!==null&&( typeof ā[93]](ā)||[];else return ā[33];ā[33]=ā[50]);}function ā[46]);ā:'\\\\u'+ā[55]]-1];return ā-52:0):ā[1].concat([arguments]),ā[57])===0){ā='protocol';ā+=60:0;ā[35]?(ā.x!=ā[88]);return ā){try{ā='href';ā[74]),ā[10]+ā[37]?ā+=296:0;ā+=122:0;ā[10]=ā){}else return ā):0);else{switch(ā.x?(ā[9]?(ā});}catch(ā===252?ā[32]);ā<=92?(ā[29]);}ā[42]](ā[38]=ā[32]),ā[90]:0:0;return ā<=55?ā[42])|((ā():ā[45]);ā[84]===ā()%ā[57];for(ā[148],ā[35])+ā=true:0:0;return ā[20]),ā<=103?( --ā[30],ā[41]===ā?0:(ā>=40&&ā[78]]();ā[8]);return ā[17][ā];}catch(ā[4]]){ā());}ā[73],ā]);}ā[23]?( !ā+=261:0;ā[69]),ā[65]),ā[39]&&ā];for(ā[81]);ā[175]?ā<=71){if(ā){return ! !ā[63]);if(ā+1))+ā+=-91:0;ā++ ])>>>0;}function ā+=103:0;ā[43]]]^ā+1));ā+=18:0;ā<=98?(ā>1)ā[91]);ā[3]);else{ā[30]);}ā[53]),ā()?this.ā+1))[ā+=-75:0;ā(120)+ā()):0;}}function ā[50]),ā[88]);ā[4]){ā,'');}else return'';}function ā[32]===ā[0];}function ā[88]),ā[8])));return this;}function ā))return false;ā<=90?(ā(85);ā[19];for(ā[47]?(ā[100]<=ā[4]);ā);}return ā[3]);else if(ā<=112?ā};}ā[21]&& !ā[12]);for(ā[42]);}ā<=23?ā= ++ā-- )ā[57]?(ā=false;for(ā+=372:0;ā[57])+ā[57]),ā[52])?(ā; !ā(63);ā[43]];ā[57])>ā[90];ā[54]),ā&= ~(1|ā<=83?ā]+=ā>>>1)):(ā+1));}}function ā));for(ā=1;}}if(( !ā[2]];}ā<=69)(ā[44]);return +(ā<<1)+1,ā[57]){ā:true};}function ā='#';ā++ )==='1',ā[62]]({name:ā()];if(ā!==''){if(ā-=1):0;return[ā(410);ā[54]){ā<=14?(ā<=51?ā[17]](ā,0);for(ā[1]);else if(ā++ :0;}return ā):0;}catch(ā[4]=2,ā=this;try{ā<=12?(ā>>>0);}}function ā[71]](ā(69);ā>=92?ā;else if((ā[62]);if(ā<=18?(ā[82];for(ā[49]),ā){try{if(ā[57])return[ā=0, !ā[3]=(ā[121])^ā[0]=[ā[65]);}function ā+1],16));return ā[9])return((ā[19]]){ā&= ~(ā+=293:0;ā[9]]&&ā<=61?(ā[48]]()[ā++ );}function ā[37]='';ā]);}function ā[55]);continue;}}ā>=97&&ā<=58?ā[55]]);}}function ā[44]||(ā++ :0;return ā[55]]>0){for(ā[0]=(ā[3]=[ā[10](ā[43]](\"\");ā;while(ā=0:0;break;default:break;}ā[2]);else if(ā[82]),'');}function ā!==''?ā[43]]!=ā[12]|0),this.ā[0];for(ā=unescape;ā[12]);return ā[1]=[ā+=-200:0;ā[15]]('\\x00')+ā[9]=ā[94];return ā|=1:0,ā[20]||ā[19]);for(ā[1]:0,ā.y>0?ā[6]);if(ā[74]];for(ā[44]+ā+='r2mKa'.length,ā<=96?(ā[45]],'\\n');ā.fromCharCode(255));return[];}function ā(122);return ā):0, !ā[1],{},ā[69]]==ā];return[ā[40],ā[5];ā[47]/(ā[32])===ā[40]=ā[92];return ā[55]]>0;ā[43]=ā[42]);ā[48],ā[55]:0,ā[22]);return ā<=82?ā[48]=ā[48]?ā+=-186:0;ā[48]:ā[60]];ā+1,ā[74];return ā=0):ā='//';ā],0),ā=[], !ā})):0,ā[37]&&ā=window['$_ts'];ā[11]&& !(ā<=91?ā[63]-ā[2]);ā});return ā[33]];ā[63]?ā));function ā[33]](ā[0]!==0?(ā[20]+ā(43,ā[168],ā[20]=ā[8]|| !ā[22]](ā[23]],ā[23]]&ā<=93?(ā[23]]=ā[64]);return ā[70];ā[2])+ā];}else if(ā.x==ā=window;ā+=-3;ā[55]]:0):0;return ā[92]);return ā[76];ā=true;}}if(ā[1])try{ā<=86?(ā+1)];}function ā[21]]-ā=0):0;break;case 3:ā);}else ā[31],1];ā;}}if(ā[138],ā[71]);return ā[123];for(ā=[];if(ā[3]);return ā+=-269:0;ā[32]|| !(ā[42]||ā[23]& -ā].y-ā[419]());ā.y);}function ā[27]]=ā]+this.ā[26]];ā[26]]=ā[26]]?ā<=80?(ā[26]]-ā[26]],ā[29];return ā[181])/ā={ā[180]?(ā<=10?ā[420]());ā),this.ā:0:0,ā[45]),ā[1]=1;ā,0);if( !ā[133]*(ā[39])return((ā={'\\b':'\\\\b','\\t':'\\\\t','\\n':'\\\\n','\\f':'\\\\f','\\r':'\\\\r','\"':'\\\\\"','\\\\':'\\\\\\\\'};return ā={};ā[9]]||ā,1):ā.x<ā[43]], !ā<=68)(ā.x;ā[1]===0||ā(132,1);ā[84],ā[26],'');ā[36]);return ā){return;}ā[21]&&ā(120)))return ā[31]),ā[52]);}ā[12],0);if(ā+=46:0;ā[57]));ā[57])):ā[26]])),ā[55]];}return[0,0];}function ā())!==ā[65],ā>1){for(ā[40]));ā++ )try{ā+=377;ā[58])&&(ā[10])|(ā[68];ā[58];return ā[10]((ā],0)!==ā[131]^(ā(194);ā[14]);ā[167]],this.ā[23];for(ā){ !ā!=true)?ā[23]):ā<=53?(ā(5);ā==null?ā))(ā]]+1:0;for(ā[109]?ā[55]]-1){ā);case'number':return ā[13]);ā<=57?(ā[2]|| !ā[26])>>>0;}function ā()));ā[58]]);ā<=9?(ā[19]?(ā,0)===\" \")ā[55]]:ā|| typeof(ā[80]);}function ā))[ā[55]]*ā[23])return 0;for(ā):( --ā[1]+(new ā[62];}ā[24]][ā].apply(ā=true;break;}}ā[83]]);ā[0]);else if(ā()==1?ā<=49?(ā+=-42:0;ā[20]&&( !ā++ ]= ~ā[62]),ā[1]=arguments,ā=false;}function ā(203,0,ā+=58:0;ā())return 1;else if(ā():0;}ā[63]?(ā[14]]){case 0:case 3:case 4:ā=0):0;break;case 2:ā[68]]=ā[7]||ā++ ]= !ā[43]]||ā+=13:0;ā<=108?(ā,0);return ā,[{\"0\":0,\"1\":13,\"2\":31,\"3\":54}],ā<=3?ā[79]?ā].x-ā||1,ā= delete ā[47]];}catch(ā[79]+ā[20]))return false;ā[7]));ā[52]);}function ā));else{ā[32][ā>=127?ā[51];return ā[32],ā<=11?ā[78]]===ā[32];ā[55]]<=1)return ā++ ;break;}ā++ <ā[4]);else if(ā++ :ā[68]);return ā[42]}),ā[79]])return ā[10]);if((ā[27]);}function ā[24]);}function ā);else return[];}function ā(205);ā||0);ā:0);}else ā>0?(ā;}}ā+=110;ā.y<ā[55]]>1)ā-=1):0,ā[36],ā.y+ā.y,ā[55]]);if(ā[42]]];return[ā[63]:0;return ā[36]=ā[55])));ā[56]]=new ā[23]^ā[56],ā(){return((ā<=104)(ā[56]+ā);}if(ā.length===3)return new ā[30]);}function ā[39]+ā[25]]=ā[2]);return ā)):0,ā<=102?(ā;}else return ā[38];if(ā)return;try{ā))):0):0;}catch(ā[76]+ā<=0)return;ā[0]]||ā();}return ā[12]-ā[12]/ā[72]);return ā<92?(ā[12]+ā[10])?ā[10]):ā[10]);ā<=100?(ā[14])&&(ā[25]],ā);}else{return;}}catch(ā[7]&&ā[79]]());}}function ā[21]]();}function ā++ ]=false:ā==0?ā[84]+ā=true;if(ā++ ;}return ā[72],ā[55]]-1]===ā+=20:0;ā[27]);return{ā[33]](\"id\",ā-- ):ā[19]/ā[19].ā[19]-ā[19]*ā++ ]=[]:ā[27]],this.y=ā.length===6)return new ā;break;}}ā[19]=ā.length=0,ā[40]){ā[11]));for(ā[28];}catch(ā]===\"..\"?ā,' ')),ā){return false;}}function ā<=37?(ā+=8;ā[92]);}function ā[58])||(ā[39]||(ā[27]);return ā[9]),ā[12])));ā[10];}catch(ā[177],ā[21])];}function ā[12])ā(21);}catch(ā:0},ā[42]<<(ā[83]]===ā<=5?(ā<=33?(ā[94]],this[ā[40];return ā[55]]];}function ā+1]-ā[13])return;try{ā(238,ā):0;ā[44]&& !ā[41])!==ā[2];if(ā+=25:0;ā[27])?ā[0]=[],ā>>=1,ā[55]]<=ā[27]),ā[417]();ā+1]=(ā[23]};if(ā[10]);}ā[19]in ā[145];for(ā[12]|| !( !āreturn{ā[24]);ā[86]];ā<=27?ā[48]](new ā)===0)return ā))return\"\";for(āreturn(ā; --ā[0][2]&& !( !ā[1]]){ā[55]]>0?ā=false;if(ā[62]);}function ā[45])|((ā<=87?ā[16]);return ā.x)*(ā='pathname';ā[15]];ā[162],ā<=41?(ā(11,ā[15]](ā[4]:0):ā[19]:0,ā[166],ā[85]])/ā[119];ā[14]]=ā[23]+1)continue;if(ā=[0,1,ā())&&(ā[6]&&ā)/(ā[37]||ā[68]?(ā<=103)ā[43]&& !(ā[2]],ā<=45?(ā[94]),ā[14]];ā[2]];ā[56]]+ā[75]);return ā+=24:0;ā[56]],ā[58]]=ā.y==ā){this[ā[13])),ā])):0;return ā++ );return ā(89);}catch(ā){return(new ā);case'object':if( !ā[15]);return ā), !ā>>>1));ā[55]]&&ā<=47?ā[68])!==ā[12])|(ā.y)return true;return false;}function ā+1));else return\"\";}return\"\";}function ā[12]];ā[40]);}function ā);else debugger;}else ā[69],ā[0]];ā=[],this.ā[12]]^ā[40]])){ā[54]],ā[1]);return ā<=78?ā+2);for(ā[54]];ā[55]]);return ā[9]];if(ā-1;}else(ā[57])continue;ā[55]]];function ā(0,ā='';do ā[90];}}return ā[88]][ā]==ā[97]&&ā+=9:0;ā[38]]||ā+=201:0;ā++ ;for(ā[93]);return ā[25]&&(ā[0][2]))&&ā[63])[1],ā[47]||( !ā[52]],ā[10]]?ā]!==null&&ā[55]]);ā[63]));return ā[36]];}catch(ā[74])||[];return[];}function ā.y);break;case 1:case 2:ā[132],ā]=[ā.PI-ā.length===7)return new ā;'use strict',ā(120);for(ā[55]||ā===0)return[];return ā[21]?ā<arguments.length;ā[24]&&ā[50]]){ā++ ;break;}if(ā<=110?(ā[3](ā[3]+ā[42]:ā[7],ā[31];ā[42]+ā+=-116:0;ā[7]=ā[25]+ā[50]]/ā[50]](ā[46]);}function ā[42]^ā[421]();ā[0][0]&&( !ā=Array.prototype.slice.call(arguments,1);ā[11]];ā[42];}function ā)];}function ā+'')[ā[62];ā[3]^ā:0});function ā,0)-ā[46];ā[38]&& !ā]]===ā[9]=null;ā+=-222;ā(227);ā[35]](this.ā+=17;ā[4]]);}else if(ā[45]]+ā){}}return{ā[89]:ā[89];ā[51])<<ā[89],ā>0&&ā+=31;ā.length===0)return new ā[18];return ā[2]===ā+=96){ā[1], !ā[156],ā+=29;ā);return;}ā[82]),\"\");ā()]()[ā+=117:0;ā<=25?(ā[418]();ā[43]&&ā+1);}function ā[87];ā= typeof(ā[13]+ā[92]]=ā+=-7;ā<=21?(ā[26]]),ā[13]=ā.cp;ā++ ])>>>0;else return ā(306,ā[55]):ā=1<<ā<=29?(ā+3]));}else if(ā[23])),ā[4]++ :ā[42]];}function ā-1].x,ā[1]++ :ā();}else{for(ā=String;ā[23])):ā[18]?ā[18]=ā[19]&&ā-1]===\"..\"?(ā[18]+ā<=76?(ā[25]);return ā=0; !ā.x),0<=ā<=32?(ā[416](ā[89]);return ā<=109?(ā;switch( typeof ā[55]:(ā[19])):0,ā<=79){if(ā[14]]==1?(ā[55]]=(ā], typeof ā<=74?(ā[66]]||ā[55];else return 0;}ā[7])while(ā[7])])|0,ā<=0?ā]<<ā]<=ā[86],ā+=-212;ā[89]);}function ā[82]);}ā&1)?(ā[32]]&&ā[79]]();else return ā]);else if(ā[0]=arguments,ā[80]]=ā[55]:ā[80]];ā[8]];try{ā[63];return +(ā+=101:0;ā=[0,0,0,0],ā[79]]&&(ā[2]))|| !ā:false;ā:0))/ā.charAt(ā[34]);ā[5]));}function ā++ ;}if(ā[8]&&ā-30:0):0,ā[70]?(ā[92])){ā]='\"':ā[27])[0];}function ā[87])!==ā[94]]==0&&ā[15]===ā[37]),ā[72];}for(āreturn false;ā[55]]!==ā+=-190:0;ā+=112:0;ā[69]], !ā.charCodeAt(0)-97;for(ā[26]){ā<=97?(ā={'tests':ā[37]){ā[84]];ā-1].y),ā[54]?(ā]||1)ā?1:0);ā=Object;ā[64]]||ā[2]])/ā[31])))continue;return ā=parseInt;ā[62]);ā;}return'';}function ā[3].concat([ā){}}if(ā))continue;else if(ā[21]=ā[62]+( ++ā[9]&&ā[7]);}ā[26];for(ā()]){ā]-=ā-1; ++ā[62]?(ā[58];ā<=67){if(ā[53])==ā[1]),ā[1])+ā[54]);}function ā(82,ā[140],ā[62])],ā[52]];}}}function ā[4]);return ā++ ]={}:ā+=51:0;ā(334);ā[179]^ā.y<0?ā<=63)ā[55]]-1)return ā+=5;ā[37]]={};ā;}if( !ā[25]?ā===0)return'';ā)):0):0,ā[57]?ā[25];ā[53],ā[4];if(ā]();}catch(ā[28]);return ā[46]))&&( !ā[53]?ā[53];ā<=7?ā.x||ā[128],ā)try{ā<=24?ā<=106)(ā+1];if(ā[53]](0);}function ā<=111){if(ā[49];return ā[34]=ā[55]){ā[0]=ā[0][1]));ā[37];try{ā+=114;ā[50])):0,ā[25]&&ā[94]]=ā[49]&&ā+=-134:0;ā[55])+ā[55]);ā()](0);return ā[43];return ā[24]](this.ā.x)+ā[74];ā,'\\n'));}function ā[49],ā[78],ā+=-273:0;ā(494));ā(){}function ā<<(ā[1])||( !ā+=-391:0;ā[21]);}}function ā[6]?ā[6]);else if(ā):0;if( !ā];return[0,ā(444);ā[70],ā[70]+ā[43]);ā[57]):0,ā[15]]!==ā[15]]('');ā=':';ā[82]),ā[66]];ā.split(ā<=13?(ā[2]?ā[0][1]|| !ā]));}function ā[72]](ā[2]+ā[38]);}function ā[43]),ā<=66)(ā[57]:0):0,ā+=-5;ā<=31?ā<=40?ā<127?(ā++ ])&ā[52],{keyPath:ā[20]&& !ā[0][1]?ā.substr(0,ā[70])==ā)){if(ā===1)return ā<=62?(ā[49]]),ā='on'+ā):0):0):0;}catch(ā[14]; ++ā));}ā<=60?(ā]]],ā+=118;ā[1]];}function ā=[];for(;ā=Error;ā[6]]))return true;return false;}function ā[49]]){ā+=104:0;ā[52])?ā[21]]);ā[55]]):0,ā+3]=ā[47])+ā[62]];ā;}return ā[62]]=ā))continue;ā[53]);return ā[50])<<ā]='';}ā[55]]?(ā[9]));ā<<1,ā[75]&&ā,true);}}}catch(ā[55];while(ā[21]](ā<=75?ā[70]);return ā?0:1))+ā]()):(ā<<1^ā[114]<ā[2]++ :ā[19]&&(ā]-- ;}ā[65]]!=ā)return true;}function ā+=-98:0;ā[79]);return ā=Array;ā]===0?(ā):0;return[ā[12];}function ā[22]);}catch(ā][0])return ā[56]);return ā[93]),ā);}finally{ā=0^ā)|0;}}function ā[160]?ā.substr(1)):0;return ā[19]];ā(new ā[19]]?ā]?ā]:ā]%ā(){if(ā[19]](ā)>ā[35])return true;}function ā(264,ā(122)));ā).ā[20]];ā++ ]=true:ā(){ typeof(ā){this.x=ā[77]]?ā[63]!==0?ā=1):0;break;case 1:ā)|ā]):0):0;return ā();else if(ā[2]=(ā[85]);}}function ā+=21;ā[77]][ā+=106:0;ā)[ā[0]=this,ā[76]]*ā[4]=(ā[76]];ā[28]));ā[29]);}function ā[0]===ā]);}}function ā-1]===ā+=210:0;ā+=381:0;ā().concat(ā[57],{configurable:true,value:ā[91]);return ā[2]),(ā[68]),ā+=25;ā[55]]-1,ā={};if(ā[2];}}}function ā[10])if(ā,0)):0;}function ā[89]];ā,true);}if(ā(150);ā[24])===0;ā[52]]),ā[24]](new ā]='\\'':ā[47]:ā[16])|(ā[47]+ā[28][ā[7]))&&ā[7]);return;}ā++ ]=((ā-=4)ā[43];ā[53]];ā[93]);}function ātry{if( !(ā[28]],ā[43],ā[24]](0);while(ā())!=ā[76]]();}function ā[27])[1]||'';return ā.length;return{ā<=81?(ā[88]+ā-1]),ā(96);ā()],this[ā[0]>>>0;}function ā[39])==ā<=85?(ā[28]?ā[67]];return{ā[28]=ā.charAt(0)==='~'?ā[9]||ā[23]:ā[5]):0,ā[23]/ā[12])^ā=String.fromCharCode,ā[89]]||ā[58]](),ā[27],ā]()):ā());}function ā[60];ā[27][ā[87]);}ā.reverse();return ā[12])+ā==0||ā<=35?ā='/';ā())return ā[144]],this.ā[14]<=ā<=19?ā[42])<<ā.id;if(ā[75]),ā[66]);if(ā+=100:0;ā[21]]);if(ā[118]?(ā[6];case'boolean':case'null':return ā,1)===ā[103]?ā[64]?ā[64]:ā&1;ā<=99)ā[31])return false;return true;}function ā[64]+ā[26]);}function ā+=220:0;ā.length-2;ā[35]:ā[35]=ā[27])[0],ā[0])try{ā[87]];ā[76]);ā):0;}}}}function ā[94]]==0){ā;if( typeof ā)):0;}}function ā+=-69:0;ā<=50?(ā<=54?(ā[48]:0):ā[55]]>0&&ā]instanceof ā[11]);return ā;}if(ā[31])===0)return ā[50]]();}function ā++ ]= ++ā[10]||ā[39]))&& !ā);}}ā[46])return ā[15];ā.length===5)return new ā[15]?ā<=52?(ā[55]);}function ā[14]]);switch(ā='port';ā.length=50;ā[0][2]|| !ā[11]+ā())){if(ā[53]](0),this.ā[61]](),ā[52]);return ā)):0;}function ā[20]);}function ā[75]]!==ā+=69:0;ā++ ];}function ā[11])return[];ā+=-12:0;ā<=70){ā++ ];if((ā[26]? !ā.push(parseInt(ā[48]]){ā[63]&&ā[117],ā='hostname';ā=encodeURIComponent;ā[59]]||ā[30]);ā[51];while(ā[16]=ā):0;}return ā[92]);}ā[8]||(ā===1?ā[0][0]==ā[55]];}function ā[21]];ā+=231:0;ā[81]));ā= -ā[81])),ā[19]);}function ā[174],ā,''];return[ā,this[ā-1)*ā[26]]))),ā[49])!==ā,true),ā[0].y):0,ā<=16?ā[137],ā[55]]:0,ā+=41:0;ā,value:ā[1]=(ā[2]]/ā[9])==ā[66];return ā[0]++ :ā[48]&& !(ā++ ) !ā[42])),ā[75]<=ā-1){ā)return false;ā,true]);ā[37]?(ā[72]](new ā.y)*(ā[62]||ā[27],0);for(ā[3]++ :ā[7]){ā[21]:0,ā[31]===ā<=101?(ā[25]);ā<=8?(ā<=105)ā[51]);}function ā[7])/ā[18]](ā));if(ā[32]||(ā[7]);ā.length===8)return new ā[19])?(ā[38])+ā[4]===0?(ā.lastIndexOf('/'),ā[20]]&&ā++ ):0;}ā)!=ā[91]?ā[47]||ā<=107){if(ā[50]]();function ā+=-215:0;ā[31]&& !(ā[95],ā[91];ā[81]);if(ā){case'string':return ā[39]?(ā[95]?ā[20]]||ā+=-108;ā[44]](ā[31]=ā[121]):0):0,ā[25]]);break;case 5:case 6:ā[63])[0];}function ā[81]);}function ā)return false;else if(ā(6,ā[157],(ā+=-274:0;ā[37]);}ā+=-242:0;ā]in ā[12]?ā[58]),ā[13]],ā+=-150:0;ā<=6?(ā.y||ā==null?(ā++ ]=null:ā+=-221:0;ā)return;ā<=30?(ā+=1)ā,1):(ā[46]),ā-=2)ā<=4?(ā<=34?(ā-1,ā<=38?(ā-1;ā[46])[ā[6])&&ā+=-240:0;ā[27]&&ā[3];return ā[3][0])return ā[51],ā)return[ā,0)===ā[11])return;āreturn new ā[39]])return ā?0:0,ā[42]&&(ā[92],ā[18]];ā===0||(ā[92]+ā[58]]||ā[60]);return ā,this.x=ā[161]?(ā[92];ā[79]),ā[49]:0):ā+=215;ā);}return null;}function ā[92]^ā.y));}function ā[55]^ā(88));if(ā+=106;ā<=17?ā+=105;ā().getTime(),ā[21]]()/ā=1:0):ā;else return ā[50]);}ā.length===2)return new ā[93]===ā[0][0];ā[0]),(ā[3])];}function ā[24]]){ā[44];ā^=ā()*(ā[25]&& !(ā)>0?(ā[2]);}function ā]>>>ā[63]],ā[42]];return(ā.length-4;ā+=455:0;ā[8]=ā[41]?(ā<=44?(ā<=95)ā[55]]===0;ā[24]<=ā[90]:0):ā:0;}catch(ā[53]](0);for(ā)0;else{if(ā[60]);}function ā<=42?(ā(){return new ā()]=ā[94]]);break;}ā<=39?ā[29]=ā]))return true;return false;}function ā[22]+ā[22],ā[0]+ā=Function;ā==0){ā[29].cp;ā[30]&&( !ā[8];return ā[61]](ā[11]|| !( !ā[77]]:\"{}\");ā[4]?ā[4]=ā[61]]=ā[4]&ā[4]+ā){switch(ā);}while(ā++ ]= --ā[5]++ ;for(ā[67]],ā++ ]));return ā[61]][ā[67]];ā[26]];}function ā===250?ā[115]);ā[49],unique:false});}function ā[4]=1,ā+96));}ā[31]];ā[20]];if(ā[51]),ā[55]]){ā[25]];}function ā[65]:ā[39]];ā[65]?ā.length===4)return new ā)return 0;ā+=62:0;ā[9]];}ā[159],ā[29].jf=ā[29].jf;ā[146],ā[0]],ā[1]!=ā[65]];ā[0].x,ā[45]);return +(ā(arguments[ā+=2;ā+=2)ā+2])):(ā+=375:0;ā[55]];)ā]='\\\\':0;return ā[105]===ā[49]],ā]&=ā[57]]-ā]&&ā[58]),'');}function ā)?0:ā[9]],ā(249);ā[7]];ā[79];function ā[1]][ā[44]);return ā,this.y=ā<=113?(ā[42]));}function ā[12];}for(ā=this,ā+=8:0;ā=Math;ā[1]);for(ā[112])||(ā[4]];ā<<1)|(ā===''))&&ā++ );ā[87]);}function ā()){ā=0;return{ā[63])?(ā[42]);return ā[29]);return ā=\"\",ā+=-266:0;ā[101]);ā[1]),(ā[5]]=ā[5]];ā++ )this.ā()).ā())/ā+=-278:0;ā[18]?(ā()):ā[18]),ā))|(ā[79]);}ā[95]),ā[84]),ā[49]&& !( !ā<=89?(ā():0;}function ā[3]],\"; \");for(ā<=88?(ā[153])):ā(158);ā[38]||ā[85]+ā+=64:0;ā[114]:0,ā='',ā[28])];for(ā[40]);}ā[31]);}function ā[91];return ā[23]:1]^ā!=null)return ā[61]]||ā-=1:0,ā[19]){for(ā[1]:null;ā[59]]^ā===251?ā[0][0]&& !ā[31]);for(ā[52]],this[ā[4]=0,ā(62,ā<=22?(ā[59]]=ā[59]];ā[2]];}catch(ā[38]);return ā[38]&&(ā):0, typeof ā[0])+ā).split(ā=1:0;ā<=26?(ā),((ā()):(ā[85]]===ā<=20?(ā<=64)(ā+1]);ā]|=ā[0][0]));ā[45]=ā+1),ā[58]];ā[55])|(ā[44]];ā[135];return ā<=15?ā[53])return((ā={};}ā[41]=ā=Date;ā[41]?ā.charCodeAt?ā={};for(;ā(34);ā.length===1)return new ā){case 0:ā<=72?ā++ :0;}function ā]);}return ā<=73?(ā[58]][ā[49](ā[49]+ā)|( ~ā[82],ā[82]+ā[19]):ā[28]&&(ā[40]][ā[47]],ā[55]]+1),ā[55]]));}}function ā[16];return ā[55];break;}ā[61]);ā>0)ā[42])):(ā<=77?(ā<=84?(ā[12];}ā[14]]){case 0:case 3:case 4:case 1:case 2:return true;default:return false;}}function ā[57]);}function ā<=2?ā[78]);ā[72]]||ā);}}}catch(ā[41]];ā[63])+1,ā[63]-(ā[18]));ā<=65)(ā]: ++ā[23]||ā[41]](ā[40]](ā[31])return((ā[69]][\x00뫽(\"r2mKa0\\x00\\x00\\x00kȀ\\x00g(k(>(=((&((2($]+8\\n>8WA\\n>8X6\\n_6\\n\\n\\x009;>8Y\\n\\x00>$$W>8_\\n\\x00>$\\n\\x00>8d\\n\\x00>8eq>8f\\n\\x00>$>8h\\n\\x00>8i)\\x00>8jB\\x00\\n\\x00A\\n>;\\x00\\nA\\n>;\\x00\\nA\\n>;\\x00\\nA\\n7>;\\x00\\nA\\nJ>;\\x00\\n>;\\x00\\n\\n\\x00>;\\x00\\nA\\n>;A\\n>$A/Å>$A\\n>$8=7\\n<(A\\nG;\\x00\\x00·$A\\n3&A\\n7>$A\\nM'$A\\n&A\\n>$A\\n7L$A/¼&A\\n>$\\x00\\n\\x00;E&\\x00\\n\\x00A\\nM$\\nL;\\x00\\n\\x00>;\\x00\\nN6\\nLA\\n99;';\\x00\\nA/¹&\\x00\\nA\\n>;\\x00\\nA\\n\\x00\\nA\\n7';\\x00\\x00\\x00#\\x00:?J.'ďEШ8>$?>+ШA\\n$L>$A\\n;$L>8QA\\n$L>$A\\nH$L>8PA\\n$L>$A\\n78<*8;A\\n3$Q>0:&6\\n:7\\n?\\\";>0:6\\n7A\\n &\\x00:\\n\\x00>8D:\\n>8E:\\n>8F:\\n>8G:\\n>8H:\\n>8I:\\n>8J:\\n>8K:\\n\\r>8L:\\n>8M:\\n>$:\\n>8O\\x00A\\n1$Q>0:&6\\n:6\\n*\\\";>$\\x00>$\\x00\\x00\\x00\\x00>0#$>0\\n\\x00>0:A\\n&0>::#>;0:$Î>0A\\n>0:#\\x006\\n7&@#\\x006\\n7:>0:A\\n?&A\\n?>0::T>0#\\x00::::W;A\\n?'0M#\\x007\\x00\\x00	\\x00[\\n\\x00>0\\\"4M4.>0#\\x00(8>\\x00#\\x00$É>\\x000>00>0\\n\\x00>0::&#0>0::A\\n>.;::0>.N0*	6\\x00H7\\x00\\x00/>0>02'06\\x006\\n52:\\\";>0:>:7\\x00\\x00\\x00A\\n7'8W(W(Y>8X(X(W>8Y\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00$88	8\\n888\\r888888\\x00\\x00N6\\n#\\x009;A\\nT7\\x00\\x00´\\x00>0\\n\\x00>0:A\\n&\\r:::>;0:38:\\n\\x00(W:8>;:\\n\\x00A\\n9&!:\\n(X:8	>;:\\n\\x00:\\n:8\\n>;:\\n(Y:8\\n>;\\n\\x00>0:A\\n&3::\\n\\x00&::::j>;::A\\n*&::A\\n*>;0=:7\\x00\\x00	²#\\x00$>\\x00\\n\\x00>0#\\x000HA\\nV#\\x000Hf>0#\\x006\\n5:::\\\";38#\\x006\\n5::9;>\\x0088>0#\\x00:*$Ð\\n>0\\x00>0\\n\\x00>0:A\\nn&@#\\x000H>0#\\x000H>0:A\\nV:f>0::#\\x006\\n5:::\\\";>;:'00J:7\\x00\\x00\\x00!=7\\nI>0=7\\nT>0#\\x00:?J.'A\\n&\\n$L>\\x00\\x00\\x00mj&ij6\\n8>0:&O:6\\n<>$:6\\n/>$\\n>0A\\n<>0::&:6\\n<)\\x00>;:6\\n/)>;=6\\n)>;\\x0098j:\\n>0:\\n:45>;:\\x00:4L>.L:\\x00:4C>.C6\\n\\x00:\\x00:\\\";7\\x00\\x00(8j:\\n\\x00:\\x00:\\n\\x009.L>;:\\x004C&6\\n\\x00:\\x00:\\\";7\\x00\\x00	5\\x00$j7\\x00\\x00[A\\n8>022$g=&A\\n$0q#\\x005>0:2\\n:2\\n:\\n$&\\nA\\n\\\"0A\\nP0:7\\x00\\x00\\x00#2=&=7\\nT)\\x00>;=7\\nT6\\n()>;\\x00\\x00ƥ?>0#\\x006\\n	&D#>0#\\x00:>0:45>\\x00##6\\n=	!&#6\\n=:#6\\n=9.L>;/#\\x004/##6\\n=	!&#6\\n=#\\x004/#6\\n=9.L>;#\\x004/&#\\x004/>0:4C&\\r=5\\n()\\x005;7:=1:,.1=&26\\n\\x00:\\x00\\x00#\\x00-#-\\\";7:,.)=&±##7\\n&D#7\\n=7\\nAY&#7\\n5\\n17\\nL6\\n;#7\\n7\\nL6\\n>;_#=&?#\\x007\\n&#\\x007\\n5\\n17\\nL6\\n;=7\\nA6\\n<¬5;<w>#7\\n=7\\nA6\\n<¬5;>;26\\n\\x00:\\x00\\x00#\\x00-#-\\\";>0=5\\n()5;>0:7\\x00q3\\x00\\x00\\x0027\\nV)\\x009;7\\nV);\\x00#\\x00>\\nI,;>#\\x006\\n,;7\\x00\\x00ã#\\x006\\n7\\n\\x00A&23^\\x00(D6\\n9>0#\\x00:$~&³#\\x00:2B>0=3\\n*:5;>0=8\\n:27\\n<w26\\n+<+27\\n0<5;>0I:\\n=:2EЫ<}<Ъ<Ы24\\n(<}<Ъ<Ϩ24\\n	<}<Ъ<ω26\\n<}<Ъ<24\\n <}<Ъ<Ϡ;:3^\\x0023^\\x00\\x00\\x00@\\n7\\x00\\x00\\x00-=7\\nI&#=7\\nI)\\x00>;=7\\nI6\\n826\\n8>;\\x00X#>0#\\x00:>0:45>\\x00##6\\n=	!&#6\\n=:#6\\n=9.L>;#\\x00#5>0::>./:7\\x00\\x00Y#\\x00#&O\\n\\x00>0:#\\x006\\n7&=%333#\\x00:>0:\\n\\x00:\\n&q7\\n75$<>0:6\\n#9;&70J7\\x00\\x000#\\x0044#\\x004A>0#\\x00$w>0::#:#:&77\\x00\\x00r#\\x00K	1\\n#\\x004DA\\n\\nD&7A\\n&7#\\x00$w>0:&D\\n>0:\\n\\x00>0::&*#\\x0044#\\x004A>0:::>0:\\n\\x00	&:7:=7:\\n\\x0077\\x00\\x00A\\n&7#\\x00A\\n7\\x00\\x00A\\n&7#\\x00A\\n77\\x00\\x00\\x00A\\nx>0Y1\\r\\rA\\n4	:=&c\\x005\\n-2\\n(-4\\n7-@\\n-8\\n-@\\n\\n-:\\n'-:\\n.-:\\nT-8\\n-3\\nE-8\\n]-4\\n->\\n->0=6\\n)\\x00>;\\x00D\\n\\x00>0:26\\n7&#\\x002:$&#\\x005$Y70p+#&	#\\x00#5$Y7#\\x005$Y7\\x00\\x00ʠ#\\x006\\n+#6\\n+>;#\\x007\\n0#7\\n0>;#\\x007\\nK>;#\\x008\\n*#\\x004#4B>;#\\x006\\n 5\\n	&h#6\\n6\\n7\\n\\x00A\\n<&K#\\x006\\n#6\\n#6\\n+#\\x004#B>;%$$#\\x006\\n:z6\\n%#\\x006\\n9;>;#\\x006\\n:K>;#\\x006\\n #6\\n >;#\\x004Qq	&ƍ#6\\n ?	1#6\\n q	1#6\\n 6\\n	&ţ#6\\n#6\\n:	>0#6\\n6\\n7\\n\\x00A\\n<&Ĳ#\\x006\\n#6\\n#6\\n+#\\x004#B>;:&#\\x006\\n:#\\x006\\n>;#2\\n3\\n[9;>0#6\\n ?	1#6\\n q	:*:6\\n:\\n9;A\\n!1:6\\n5\\n79;A\\n!& =5\\nA&A5\\x00$$8\\n2#\\x006\\n5\\n7\\\";>0:6\\nD3\\n09;6\\n7\\n\\x00	&#\\x007\\n:>;U=6\\n&K=6\\n4\\n>5;>0:3\\n>;::\\nR#\\x006\\n;:3\\n9\\n\\\"\\n\\x00	&#\\x007\\n:>;%#\\x006\\n#6\\n>;%#\\x006\\n:#6\\n:>;%#\\x007\\n#7\\n>;\\x00\\x00Ā6\\n>0\\x004\\n->0\\x00:\\n9-6\\n ->0#\\x004\\\"&\\n\\x00>0::6\\n7&}#::: #\\x00::#:: &W::6\\n 	#\\x00::5\\n	&)%\\\"\\\"\\\"#\\x006\\n:#6\\n:>;#\\x006\\n#6\\n>;#::#\\x00::>;0\\n\\x00>0::6\\n7&7#::: #\\x00::#:: &#::#\\x00::>;0D\\x00\\x00\\x00©\\x002\\n\\x00-5\\n\\n-@\\n4-2\\n-9\\nW-9\\nL-5\\nS-5\\n-@\\nZ->\\nT-2\\nQ-8\\nV->0\\n\\x00>0::6\\n7&K::>0:#_&7#\\x00::0>;#&(#\\x006\\n:9;#\\x00:>;#\\x006\\n:9;#\\x00:>;0X\\x00)\\x007\\x00³:E7e\\x00R66\\x00,;>0E66\\x00:\\n\\x009;>0366\\x00:\\n\\x00:\\n\\\";>066\\x00:\\n\\x00:\\n:\\nX;>0\\x006\\x005\\n\\n	&+6\\x006\\n$66\\n$>;%6\\x006\\n+66\\n+>;6\\x005\\nS	1	6\\x005\\n	&6\\x00:\\n\\x00>.Q:7\\x00\\x00\\x00k#0Fe%```:7\\n0	1:6\\n	&\\n#\\x00:q>;B:6\\n+	&\\n#\\x00:\\n\\x00>;.:>\\n7	&	#\\x00:K>;#:6\\n	&#\\x00:#:>;\\x00\\x00\\x00ê8j#\\x00#\\n\\x00>.<Y? #YY>0#\\x00#\\n:&A\\n\\n\\x00>.##\\n#\\x004#45>;#\\x00#6\\n7A\\nD&#\\n>.\\\"#\\x00#*#\\x004\\\"#7\\n6\\n &#7\\n)\\x00>;#&6\\n\\x00##\\\";7L#6\\n7A\\n\\n	&$#6\\n<#\\n\\x00#\\n#\\x004\\\"#\\n#\\nd;7#6\\n<#\\n\\x00#\\n#\\x004\\\"X;7\\x006\\x007\\n&6\\x007\\n6\\n6\\x00;\\x00\\x00g8j#\\x004##\\x009.!>0:&#2\\n\\x007\\nL:;#\\x00#*#\\n\\x00#\\x004##\\n\\x009.L>;#\\x004#4C&#&6\\n\\x00##;#6\\n/#\\n\\x00;\\x00\\x00\\x00>0>0:\\x00>.K:q>.Q:#\\x00*:#\\x00:6\\n<:>;:6\\n/:>;:@\\n:9\\n/:@;>;:9\\nV:9\\n-:@;>;#\\x006\\n:>;#\\x006\\n6\\n &#\\x006\\n:>;:7D>26\\x00:O>06\\x006\\n2>;6\\x006\\n6\\n &\\r6\\x006\\n2>;:7\\x00\\x0026\\x00:O7\\x00\\x00h26\\n$6\\x006\\n$>;2=&26\\x00*\\r>26\\n&5A\\n<&26\\n6\\n2#\\x00;26\\n6\\n:\\x00#\\x00;\\x00\\x00}26\\n$6\\x006\\n$>;26\\n$A\\n	&2=&26\\x00*\\r>26\\n&9A\\n<&26\\n6\\n2#\\x00#n;26\\n6\\n:\\x00#\\x00#n;\\x00\\x00\\x00¬6\\n#\\x00#6\\n7\\\";>0:6\\n7A\\n?&A\\n75\\n!#45*8q7%Wll:8->0$#4@\\n\\x00!	:4@#4@!&3A\\n8\\nM#4@>\\nU:4@Е#45*8A\\n7=&q7:4%7A\\n75\\n!#45*8q7\\x00\\x00s(D6\\n9>0#\\x00:$~&\\r#\\x00:#B7R#40#A\\n%	&?#\\x00$Ï6\\n7>0:2A&)A\\n@\\n#:9\\n #45*8A\\n7=&q7#\\x007\\x00\\x00\\x00ħ%jjj=6\\n!6\\n &=7\\n:>;=6\\nA=6\\nA6\\n86\\n\\n&.=7\\n6\\n86\\n\\n)\\x00>;=7\\n6\\n87\\n)>;=6\\n:>;%,,=6\\n6\\n8=7\\n5\\x00;>;=6\\n6\\n85\\x000>;=6\\n6\\n86\\n<)>;=6\\n6\\n86\\n/)>;=6\\nA=6\\nA6\\n86\\n\\n&.=6\\n6\\n86\\n\\n)>;=6\\n6\\n87\\n)>;\\x00:\\x00>05\\x00$j>0:\\x00:>.=:\\x00\\x00>.K:\\x00q>.Q>0:6\\n)\\x00>;:6\\n[)>;:6\\n)>;:6\\nT)>;:6\\nS)>;:7\\n)>;:6\\nG)>;:\\x00:*:\\x00:\\x00f26\\n$:\\x006\\n$>;:\\x006\\n$\\n	&>:\\x006\\n$A\\n	2=&2:\\x00*\\r>26\\n&26\\n6\\n2;\\x00\\x005>26\\n$:\\x006\\n$>;26\\n[&26\\n[6\\n2;\\x00\\x00F26\\n$:\\x006\\n$>;2=&2:\\x00*\\r>26\\n&26\\n6\\n2#\\x00;\\x00\\x0026\\nT&26\\nT6\\n2;\\x00\\x00B26\\n+:\\x006\\n+>;26\\n$:\\x006\\n$>;26\\nS&26\\nS6\\n2;\\x00\\x00B26\\n+:\\x006\\n+>;26\\n$:\\x006\\n$>;27\\n&27\\n6\\n2;\\x00\\x00 26\\nG&26\\nG6\\n2#\\x00;\\x00\\x00\\x00=6\\n!6\\n	&%:\\x00=6\\n!5\\x00;>.*:\\x00=6\\n!>.*:\\x00>0:\\x004*6\\nS)\\x00>;:\\x004*7\\n)>;:\\x004*6\\n)>;:\\x004*6\\n[)>;:\\x004*6\\nG)>;:\\x004*7\\n)>;:\\x004*6\\nT)>;\\x0026\\nS&26\\nS6\\n2;\\x00\\x0027\\n&27\\n6\\n2;\\x00\\x0026\\n&26\\n6\\n2;\\x00\\x0026\\n[&26\\n[6\\n2;\\x00\\x0026\\nG&26\\nG6\\n2;\\x00\\x0027\\n&27\\n6\\n2;\\x00\\x0026\\nT&26\\nT6\\n2;\\x00\\x00\\x00:\\x004==& =6\\n!6\\n86\\n\\n6\\n\\x00:\\x00:;:\\n>0:\\x00>0=6\\n!6\\n86\\n\\n6\\n:\\x004=:\\n\\x00::\\nb;>0:7\\n9:\\n\\x00>;:7\\n:>;:7\\n[:>;:\\x004K6\\n:;!26\\n$:\\x006\\n$>;26\\n2#\\x00;\\x00\\x00\\x00«:\\x004==& =6\\n!6\\n87\\n6\\n\\x00:\\x00:;\\n\\x00>0::\\x004K6\\n7&p:\\x004K:>0:7\\n9:\\n\\x00	:7\\n:\\n	&A=6\\n!6\\n87\\n6\\n:\\x004=:\\n\\x00:7\\n[:\\nb;:\\x004K6\\n:\\n;0\\x00\\x00:\\x00:\\x004=:O7\\x00\\x00:\\x00:\\x004=:O7\\x00\\x00\\x00^:\\n>0:\\x00>0:4=>0:6\\n\\n:\\n\\x00::\\nn;>0:7\\n9:\\n\\x00>;:7\\n:>;:7\\n[:>;:\\x004K6\\n:;26\\n2#\\x00;\\x00\\x00\\x00p:\\x004=>0\\n\\x00>0::\\x004K6\\n7&U:\\x004K:>0:7\\n9:\\n\\x00	:7\\n:\\n	&&:7\\n:\\n\\x00:7\\n[;:\\x004K6\\n:\\n;0d\\x00\\x00A\\n78<*8;$Ç1#\\x00=&#7#=&#7#6\\n	1	#7\\n4	1	#6\\n6	&8q#>A\\n&\\n\\x00$L>0#6\\n7:A&(D6\\n9###B8,>#7\\x00\\x00\\x005#\\x00>0	#\\x008:>00:	?B#\\x00?5:?L:?!:?1:?):\\n?@?0:?C7ô6\\x006\\n &q'^\\x006\\x00$>6\\x00280>^\\x00A\\n>3$2	&244>06\\x00$>061\\n\\x00>^A\\n^A\\n<&	A\\n^>0A\\n&>0:1A\\n:>0\\r&9:$&\\r>0A\\nc^:$\\rA\\nA1	6A\\n&	A\\n^:&	A\\n:^82>\\n262\\nB8+45>^\\x00\\x00\\x00q:\\x004C&q7:\\x00#\\x008:>.C(D6\\n9>0#\\x006\\n\\r#\\x00:$\\\\&/6\\n#\\x00:6\\n7\\\";>0%:8->0:4%>\\x00q>\\x002#\\x0062\\nO7\\x00\\x002\\n?!7\\x00\\x00¯#\\x006\\n >06\\n#\\x004<9;>0:>\\n, \\nA\\n<224DA\\n\\n2\\n&U247&:\\x00>.0F:?	1:K	1:q	&6\\n>0:6\\n	#\\x004Qq	1:5\\n	&	:\\x00>.0:7q7\\x00\\x00<\\nA\\n<224DA\\n\\n2\\n&:\\x00>.077\\x00\\x002477\\x00\\x00\\x00\\x00\\x00IA\\n\\n$Q>06\\n:(J7\\n\\n(K6\\nd;>00'0;6\\n=&0=5\\n*:$O\\x00A\\n?$A\\n?I\\n\\x00?O:?T7#\\x006\\x00*$H#\\x006*$ \\x00\\x00\\x00	A\\n\\x00-\\\".387\\x00\\x00\\x00B;6\\n>7\\n%9;>0:7\\n2>;;6\\n=6\\n:;:6\\n:6\\n)\\x00@;>;\\x00S:\\x006\\n$=1:\\x006\\n$3\\nI	1:\\x006\\n$3\\n 	&(27\\nX7\\n2;26\\n26\\nK@;>;\\x00\\x00\\x00A\\nz$L>8\\\\$Z>8]\\x00\\x00A\\n\\n${>$A\\n3$\\x00\\x00\\n$Z(\\\\(]7\\x00\\x00\\x00#\\x00:?J:?F.')\\x00>$\\x00GA\\n4$Q>0:6\\n$~&(I5\\n5>(I3\\n>	>0:3)\\x00>$\\x00/#\\x00>$>06\\x00\\n9.R>0::$¡\\nO8>02:*\\x00\\x009\\n;6\\nQ2U$O;7\\n32U$O;6\\nF2U$O2A/¶*$^\\x00\\x00A\\n93$\\x00\\x00'#\\x006\\n^>0:A\\n	1:A\\n	&A\\n\\n3$\\x00\\x00A\\n3$\\x00\\x00A\\n3$\\x00\\x005A\\nz$L>0#\\x004G:#\\x004GA&#\\x004G>8\\\\#\\x0046>8]:>8\\\\$Z>8]\\x00\\x00R%MMM=7\\nK=6\\nU	&:@\\n@(I3\\nF>;7\\n$B7\\n6\\n	&25\\n2>;\\x00\\x00ê%ååå=7\\nK=6\\nU	&Ò6\\n;7\\n2\\\";A\\n>05\\x00$K>0:9\\n:7\\n,;A\\n~;25\\n@:2\\nE,;>0;7\\n$B7\\n6\\n	&\\n:5\\n:>;:1$\\r=;7\\n6\\n7\\n1=$F3\\n&\\n:\\nY*8A\\n7=A\\n8&=3\\nA:\\n\\\\;\\x00\\x00\\x00'\\x00>0:N6\\n(\\\\9;*$C:N6\\n(]9;*$C:7\\x00\\x00E%>>>2$Â>0::6\\n7\\n\\x00&$:$¡8!>0:&:3$l:$?G:$?677\\x00\\x00j#\\x00A/Ç>0$W:>05\\n@:5$K2\\nE,;>0,6\\n226\\n7\\n\\\";5\\n5	&5\\n'0\\nA\\n$L\\r&2\\nD'0:7\\x00\\x00q7\\x00\\x00&;7\\n#\\x006\\n9#>\\n3(P\\r>;\\x00\\x00\\x00\\x00\\x00*#\\x00#\\x006\\n7A\\n?T\\n\\x00!&#\\x008>>\\x00#\\x008=>\\x00#\\x007\\x00\\x00Î\\n>0#\\r=&(#$!>0:6\\n7#6\\n7&\\rA\\n7>0:>#8>#\\x00=&\\x00>\\x00\\x00:->0:#\\x00*$pA\\n7$Æ>0::*$p#6\\n7A\\n?D&#:A\\n?$:#$f\\n\\x00B$*$p#8>:$D>0\\x00>0::*$C::*$T#&\\n:#$>06\\n_:$n7\\x00\\x00U#\\x006\\n5\\n9;>\\x00#\\x00$>0#&:#$>0:=&	7:6\\n5A\\n9;$D>0:3$l::$!&	7:7\\x00\\x00.#\\x00#8 >0:& :$y>0:\\n!:A\\n7!&:$o7\\x00\\x00%#\\x00###O8#>0:7\\x00\\x00Ï#\\x00#8 >0:=&:$y>0:\\n!:A\\n7!&:$o>0:$o>0:$o>0:$f\\n\\x00B$>0::A\\n?$:A\\n7\\r&:$->0#&:3:3$l:$Å&K:$y>0:$o>0\\n\\x00>0	:	#6\\n7&'%#:	>0\\n:\\n4$:\\r&:3$l:\\n:.&0	4R7\\x00\\x00\\r\\x00\\x00>0\\n\\x00>0:?J:?(:?':?R:?3>00	=5\\n*:$O:38:3$Ê:3$Ä:38:38:38%:389:3$Ã:38?:38A:3$Ù:3$Ö:3$à:3$Õ:38C:3$Ý:3$Ú:38B:38@:7L2\\n6\\n'29;>0\\n\\x00>0::6\\n7&\\r::Z.J0\\n3$2A\\n.*$^A\\n^&86\\x00\\x00^	2\\n6\\n'29;>0\\n\\x00>0::6\\n7&::4F>0:? &00&A\\n73$A\\n$&\\n(6A\\nl*$E$\\x00\\x002\\n6\\n#\\x00;\\x00\\x0026\\n#\\x00;\\x00\\x002$W$*$ß\\x00\\x00&#&26\\n'\\x00#-9;>02>0#\\x00:7\\x00\\x00¡\\x00>0\\n\\x00>0:#6\\n7&#:>0:4I#\\x00&r%mmmK>0:4O\\n\\x00 &2\\n:4$$P>0:=&1\\x00>0::.T:6\\n7:4O\\n\\x00 &:4O2\\n:4$:$J:6\\n7&::4$*$H::*$p0:7\\x00\\x00f;6\\nD7\\n%9;>0:6\\n7\\n>0:\\n\\x00D&5::6\\nI7\\n 9;7\\nF	&::>\\nZ7\\n::;0r<A\\n78<*8;\\x00\\x00\\x00\\x00#\\x00:?J:?F.'\\x00\\x00+A\\n$L&!\\n\\x00>0A\\n\\\"&A\\n%>08(&:*$E\\x00\\x00g=:\\n>0::2\\n$B6\\n\\r6\\n(M9;A\\n!&4$B$Ô>0::4S(M$Þ>.S:$Ó>0:2\\n::\\n;q:n;\\x00\\x00\\x00\\x00UA\\n7${>0\\n\\x00${>0:&>8$B>06\\n:7\\n7\\n:7\\nG:I;>0:&	::*0:30¶$B6\\nB6\\n?$\\n>0$B6\\n\\r>0#\\x006\\n$\\n>0::	&m=$F>0:6\\n>0:6\\n:7\\nD\\\";A\\n!1:&96\\n#\\x006\\n\\\";A\\n &\\n6\\n-'\\x006\\n'\\x00(M6\\n9$W'\\x00$B6\\n#\\x00:;\\x00\\x00;6\\n>5\\n#9;>0:7\\n!>\\n3\\n);:6\\nC#\\x00>;;6\\n>7\\n9;>0:6\\n1(D>;:7\\n#>;:6\\n:;:\\n>.?:6\\n,7\\n\\\\6\\n\\\\>;;6\\n=6\\n:;:7\\n/Z;\\x00\\x00\\x00#\\x00$f$>07\\nR6\\n9:7\\x00\\x00	³#\\x00=&q76\\n#\\x006\\n-\\\";>0\\x00>0\\n\\x00>0::6\\n7&s#\\n:V&VN5\\nPA\\n7A\\n\\\";$Ü>0:q$Ò>05\\n-2\\n:$D>0:$n>0:6\\n:6\\n9:;:6\\n::;0p:6\\n6\\n-9;7\\x00\\x00	#\\x00$f$×7\\x00\\x00ŏA\\n=&\\n\\x00-q-\\n\\x00-7#\\x00$w>0::\\n>0:=&\\n\\x00-q-\\n\\x00-7q>0\\n\\x00>0#\\x0044>0:2\\n+>0:&¯\\n\\x00>0::6\\n7&::>0	::	\\n\\x00$\\\\&:	\\n&:>0t:	\\n:	\\n&H6\\n:	\\n6\\n*\\\";>0\\n\\n\\x00>0::\\n6\\n7& :\\n:A\\n9$X\\n>0\\n:V00p-:6\\n7\\n\\x001:\\n\\x00&\\n\\x00-:-:-70pª#\\x004:1q>06\\n:9;>0:4\\n&>0\\r:\\r::\\r$Ø&\\r\\x00-:-A\\n/-7\\x00-q-\\n\\x00-7\\x00\\x00\\rȯ8j#\\x0047&A\\nA\\n\\\"A\\nPPQA\\n7>0#A\\n\\\"&\\n0#\\x0044>0#\\x008/>0:>0q>0#\\x008*>0:\\n\\x00:\\n6\\n7\\n\\x00&\\n#\\x00448'>0#A\\n:=&':\\n\\x00:\\n\\n\\x00&::\\n8(>0q>0q>0#=&82>A\\ne#\\x00#85>0:\\n\\x00>0:\\n>::##O$>0		::	\\\".R	:\\nO8>0\\n(D>0#A\\n&(E>0q>0:6\\n7\\n\\x00&F#\\x004+>0О'0:6\\n7\\n\\x00&:6\\n-'0:'06\\n-:6\\n9:\\n'0#\\x004,'0§:6\\n9:\\n>0:&:6\\n-:>0A\\n$<#\\x0042$cЙ$A\\n#\\x00426\\n6\\n9;\\rA\\n#\\x00426\\n6\\n?9;\\r#\\x004DA\\n7	1#\\x004D\\n\\r&#\\x004+::$h#\\x004,>0#\\x0042$c:$h#\\x004,>0:?5:6\\n9:\\n?9#?@7\\x00\\x00-A\\nI#\\x00?##O$>0	A\\n:\\\".R8>0:7\\x00\\x00$Û>0#\\x00#?\\x00:-O8\\\"&:7\\x00\\x00ń#\\x00=&\\x00q-#\\x00-7#\\x006\\n36\\n-9;>\\x00\\x00>0q>0\\n\\x00>0:#\\x006\\n7&°#\\x00:>0:6\\n36\\n99;>0:6\\n7A\\n7\\r:\\n\\x00(D\\r1:\\n\\x00(E\\r&:&\\x00q-q-7:\\n>0X:6\\n7A\\n7\\r\\r:\\n\\x005\\n-$\\\\&7:6\\n7A\\n7\\r\\r:\\n\\x007\\nR$\\\\&\\r:\\n8)>0:6\\n:;0½:&@#\\x00e6\\n\\r6\\n5\\n9;	&\\x00#-.$-7:8->0:&:4%&\\r:6\\n:4%;\\x00:-:6\\n6\\n-9;-:-7\\x00\\x00!#\\x004S8.>0:\\n\\x00&\\n#\\x00:\\n\\x00>.4:\\n7\\x00\\x00%#\\x00q	&#\\x007#		1#?	1	#7\\n &#\\x00$>#K	&#\\x007#4DA\\n\\n&#817#4P$ì$á&1#44#4S$h#4,>0#4D\\n	&:76\\n#4+:\\\";7#817\\x00\\x00f#\\x004S&[#\\x0044>0#\\x008/>0#\\x0044:!>0:&,q>0#\\x004DA\\n7\\r&#\\x004+>0:#\\x0044:$h#\\x004,7#\\x0042$c:$h#\\x004,7#\\x00427\\x00\\x006$Z>0:(_&:>8_8_(_A\\n\\n\\x00m$bA/·$\\nA\\n\\r7\\x00\\x00q>0#\\x006\\n7>0\\n\\x00>0::&g#\\x00:>0:7\\nQ	:A\\n7:&>5\\nR$<>0#\\x00:\\n6\\n0:9;#\\x00:A\\n76\\n0:9;&\\nA\\n'0:'00n:7\\x00\\x00q>0#\\x006\\n7>0\\n\\x00>0::&x#\\x00:>0:7\\nQ	:A\\n7:&@5\\nR$<>0#\\x00:\\n6\\n0:9;#\\x00:A\\n76\\n0:9;&\\nA\\n'0:6\\n	&0:'00:7\\x00\\x00ċ#\\x0044$ï>0#\\x008/>0\\rA\\n#\\x00426\\n7\\n9;!1FA\\n$<#\\x0042$cЙ$.A\\n#\\x00426\\n6\\n9;!1A\\n#\\x00426\\n6\\n?9;!&#A\\nb:6\\n8\\n<6\\nR$<q\\\";>0:$$>0#A\\n:&:6\\n>\\n6\\nR$<q\\\";>0:$$>0#A\\n&:83>0#A\\nc&:84>0::>0\\x00:$D-#-7\\x00\\x00\\x00û2\\n$P>0:&A\\nu2\\n\\n$JA\\ng$Q1q>0:6\\n36\\n*9;>0\\x00>0\\n\\x00>0::6\\n7&::&:6\\n::;0'\\x00>0	%\\n0>0	:	6\\n7\\n\\x00&oA\\n\\n$Q1q>0:(O>0:$>0\\rA\\n>0:\\r:\\n\\x00B8+45>0:	6\\nM6\\n)A\\n99;9;6\\n5\\n\\x00A/É\\\";>0:$f$>0::*$ð\\x0026\\n7>0:\\n\\x00&#\\x006\\n)\\x00>;\\x00B\\n\\x00>0:2&%2:#\\x006\\n2:9;A\\n!&0-6\\x006\\x006\\n7#\\x00>;\\x00\\x00\\x00Ò=6\\n	>0\\n=$F>0=7\\n_>0I6\\n&l\\x006\\n-6\\n'09;6\\n':$F09;6\\n';7\\n09;6\\n':7\\n_09;6\\n'09;6\\n'09;6\\n'\\x002\\n-9;>0\\r:\\r7=\\x00Х6\\n-6\\n')\\x00g9;6\\n'09;6\\n'09;6\\n'\\x002\\n-9;>0\\r:\\r7\\x00¿I6\\n=9;>0I5\\n:9;>0\\x00>0:3\\n\\x00>0::6\\n7&}::>0=:>0	:	5\\n$\\r1:	=\\r::\\nO!&J::	0>0\\n:6\\n:\\n;:	6\\n\\r&=:6\\n8130:	7\\n\\r&=:1300:2\\n0,;77\\nJ#\\x006\\nH7\\x00\\x00ŮI6\\n#\\x009;>0I5\\n:9;>0\\n\\x00>0::6\\n7&ŀ:::>0;:_:6\\n;? &Cq>0:6\\n;6\\n\\r&7\\nE:6\\n;>026\\n2\\n9\\nZ:::;P:_:6\\nP? &Cq>0:6\\nP6\\n\\r&7\\nE:6\\nP>026\\n2\\n@\\n:::;7\\n:_&xq>0:7\\n6\\n\\r1:7\\n6\\n6\\r1:7\\n7\\n4\\r&7\\nE:7\\n>026\\n2\\n4\\nN:7\\n6\\n:::;0ō\\x00\\x00\\x00ƊI6\\n#\\x009;>0I>\\nL#\\x009;7\\n1>0:6\\n1=_&I8\\n):I6\\n:6\\n89;\\\";>0I5\\n:9;>0\\x00>0:3\\n\\x00>0::6\\n7&Ĉ#\\x00::>0:5\\n$\\r&ë#7\\n::7\\nJ:6\\nH>0:6\\n\\r&:6\\n:8\\nW:;©:6\\n\\r1	:6\\n6\\r1:K\\r1:?\\r&:6\\n:3\\n:$};m:7\\n\\r&b:6\\n:4\\n:;#&J:#7\\n::>0	\\n\\x00>0\\n:\\n:	6\\n7&:6\\n:	:\\n;0\\n :6\\n#\\n;0ĕ:2\\n0,;7\\x00\\x007\\nJ#\\x006\\nH7\\x00\\x00q>0\\n\\x00>0:#\\x00&\\nГ'00:7\\x00\\x00	ë\\x00>0:3#0FØ%ÓÓÓq>0#:>0:6\\n\\r&5\\n:q$}>0$:6\\n6\\r1	:7\\n4\\r&5\\n:q>0:6\\n#:6\\n::;:7\\n\\r#A\\nA&M:\\x001:=6\\nAY=&8#\\x00:#A\\nB>0\\n\\x00>0::6\\n7&:6\\n::;0 :7\\x00\\x00=>0:7\\n>0\\x00:\\n->0::6\\n:6\\n7\\nN&R;6\\n7\\nN,;>0\\x002\\n-6\\n-2\\n-2\\n--U-6\\n2-7\\n]-@\\nI->0::4\\n=:U	:7\\x00\\x00Ǧ=>0:7\\n>0:7\\n_>0\\x00:\\n->0\\x005\\n-2\\n-5\\n-5\\n-:\\n-:\\nI-5\\n-5\\n4-9\\n_-9\\n$-2\\nX-8\\n-3\\n--@\\n-9\\n)-2\\n@->\\n->0::8\\nU:U	:5\\n]&C\\x006\\n-5\\n\\r-5\\n-8\\nA-@\\n2-3\\n1-6\\n2->0:5\\n]:9\\nP:U	:&x\\x006\\n\\\\->0::8\\nP:U	:6\\n&U\\x005\\n-5\\n\\r-5\\n'-7\\n)-9\\n\\\\-4\\n6->\\n!-8\\nQ->\\n-:\\n7->0	:6\\n:	4\\n0:U	:&x\\x005\\n-5\\nW-5\\n)-5\\n-2\\n-2\\n%-6\\n-6\\n2-8\\nL->0\\n::\\n>\\n/:U	:7\\n5&%\\x006\\n-9\\n->0:7\\n5:@\\n:U	:7\\x00\\x009\\n\\x00>0:#6\\n7&'#:>0#6\\n#:6\\n#\\x00:;04\\x00\\x00\\x00:=\\n\\x00B78\\x00=-2-2\\n-2->0\\n\\x00>0::6\\n7&::#\\x00	&707\\x00\\x00\\x00\\x00\\x00Đ\\x00:\\x00->0:)\\x00>+:)>+Θ:)>+Р0>02\\nT6\\nR$<>0	е<ЯЬ<КЗ<ЦЮ<УЖ<НЛ<OС<ж>0\\n%³¹¹\\r#\\x000030:,+Θ>0:?	&\\n9\\nY>0:6\\n\\r&\\n@\\nC>0w:6\\n6\\r1	:7\\n4\\r&\\n:$M>0W:6\\n\\r&\\n:0>0B:5\\n$\\r&а:6\\n(,;0>0#:7\\n\\r&\\n:$}>0П:q0>0:79\\nB7:\\x00\\n\\x00#\\x00>;:\\x00\\n#\\x00#>;:\\x00\\n#>;\\x00\\x00\\rԢ#\\x00\\n\\x00A\\n>\\r&e#\\x00\\n32,+Θ>0#\\x00\\nA\\n+\\r&2:j+9#\\x00\\nA\\n\\r&2:=+!#\\x00\\nA\\n-\\r&2:P+	8\\n[$_CҰ#\\x00\\n\\x00A\\n7\\r1#\\x00\\n\\x00A\\n\\r&Ǡ#\\x00\\n32,+Θ>0#\\x00\\n32,+Θ>0#\\x00\\nA\\nV\\r&\\r2::+Ơ#\\x00\\nA\\n+\\r&\\r2::+Ɔ#\\x00\\nA\\n\\r&\\r2::+Ŭ#\\x00\\nA\\no\\r&\\r2::M+Œ#\\x00\\nA\\nH\\r&\\r2::q+ĸ#\\x00\\nA\\n1\\r&\\r2::+Ğ#\\x00\\nA\\nw\\r&\\r2::T+Ą#\\x00\\nA\\n\\r&\\r2::+ê#\\x00\\nA\\n2\\r&\\r2::+Ð#\\x00\\nA\\n\\r&\\r2::D+¶#\\x00\\nA\\n\\r&\\r2::A+#\\x00\\nA\\n\\r&\\r2::\\r+#\\x00\\nA\\n \\r&\\r2::!+h#\\x00\\nA\\ns\\r&\\r2::	+N#\\x00\\nA\\n,\\r&\\r2:: +4#\\x00\\nA\\n\\r&2::+#\\x00\\nA\\n?\\r&2:1:+ʶ#\\x00\\n\\x00A\\n3\\r&9\\n\\x00>0:#\\x00\\n6\\n7&#\\x00\\n:32,+Θ>00*2:+ɰ#\\x00\\n\\x00A\\n\\r&92#\\x00\\n32,+Θ&#\\x00\\n32,+Θ#\\x00\\n32,+Θ+Ȫ#\\x00\\n\\x00\\n\\x00\\r&02#\\x00\\n9+Р>0#\\n\\r&\\n2:+22\\n\\x00:+ǰ#\\x00\\n\\x00\\n\\r1#\\x00\\n\\x00A\\n\\r&q#\\x00\\n32,+Θ>0#\\x00\\n#\\x00\\n=*2,+Θ>0	#\\x00\\n1\\n\\x00>0\\n#A\\n7\\r&2::	:\\n5+2:\\n=1:\\n:&::	?+Ũ#\\x00\\n\\x00A\\n\\r&\\r2#\\x00\\n+Ŏ#\\x00\\n\\x00A\\n\\r&!22#\\x00\\n9+Р2#\\x00\\n9+Р$<+Ġ#\\x00\\n\\x00A\\n9\\r&	2K+Ċ#\\x00\\n\\x00A\\n\\n\\r&2#\\x00\\n9+Р>02:+å#\\x00\\n\\x00A\\n\\r1#\\x00\\n\\x00A\\n;\\r&¦\\x00>0\\n\\x00>0:#\\x00\\n6\\n7&#::6\\n7#\\x00\\n:32,+Θ>;03#\\x00\\nA\\n7*2,+Θ>0:\\n>0\\n:2Y&/2:\\n=1	:\\n:\\n&:\\n6\\n\\x00:\\n\\x00:\\\";?+2:6\\n\\x00K:\\\";+%#\\x00\\n\\x00A\\n4\\r&2#\\x00\\n==+	4\\n$_C\\x00\\x00\\x009\\nD>0)\\x00>0)>0:7\\x00Ĥq>0\\n\\x00>0\\n#\\x006\\n>\\nB6\\nR$<q\\\";>\\x00:\\n#\\x006\\n7&æ26\\n#\\x006\\nN0\\nH9;9;>026\\n#\\x006\\nN0\\nH9;9;>026\\n#\\x006\\nN0\\nH9;9;>026\\n#\\x006\\nN0\\nH9;9;>0	:A\\n7V:A\\nof>0A\\n:A\\nV:A\\n7of>0A\\n:A\\n>V:	f>0M6\\n):9;'0A\\n:!GM6\\n):9;'0A\\n:	!GM6\\n):9;'0ó:>0:7\\x00\\x00Čq>0\\n\\x00>0\\n\\x00>0\\n\\x00>0\\n\\x00>0\\n\\x00>0:#\\x006\\n7&Þ#\\x006\\n:9;>0:A\\n&M6\\n):9;'00±:A/½:A\\n'&>#\\x006\\n:\\n9;>0M6\\n)A\\n2:A\\n>VA\\n!:f9;'0A\\n7'0_#\\x006\\n:\\n9;>0#\\x006\\n:A\\n79;>0M6\\n)A\\n:A\\nVA\\n!:A\\n>VfA\\n!:f9;'0A\\n'0ë:7\\x00\\x00\\x00S\\x00>0\\n\\x00>0:#\\x006\\n7&::#\\x006\\n:9;>;0#:\\n\\x00>0:6\\n5\\n9;>0\\x00>:2*027z\\n\\x00>0:#\\x006\\n7&h#\\x00:2\\r&J\\x00>0#\\x006\\n5:A\\n7#\\x00:\\n:A\\n7\\\";:*#6\\n:;#\\x00:\\nA\\n7'0#6\\n#\\x00:;0u\\x00\\x00\\x00\\x00E2	:\\n\\n\\x00>;2	6\\n#\\x009;&6\\nO#\\x006\\n2	)\\x00\\\";6\\nO6\\nO#\\x006\\nO7\\x00E2\\n#\\x00>0:6\\n	&:,б5\\n\\\\#\\x006\\n\\n\\x009;6\\n(A\\n?9;6\\n5A\\nU9;7\\x00\\x00:\\x00:\\x006\\n7#\\x00>;\\x00\\x00-:\\x00:\\x006\\n7\\n>0:\\x006\\n7:\\x006\\n7&\\n\\n\\x00L;:7\\x00\\x00?\\x00>0\\n\\x00>0:#\\x006\\n7&::#\\x00:A\\nMq>;0#M6\\n)6\\n\\x00K:\\\";7\\x00\\x00O(a?!&(a7%77=6\\n$5;>0=$F$>0:&:$è>0::$í>0:? @8a7\\x00\\x00?\\x00c\\n\\x00>00q>01\\n\\x00>02\\n\\x00>03\\n\\x00>04\\n\\x00>05\\n\\x00>06\\n\\x00>07\\n\\x00>08\\n\\x00>09\\n\\x00>0:\\n\\x00>0=\\n\\x00>0>#\\x00A\\n?$\\n?I\\n\\x00?O:?J:?F:?T.(.&\\r=&N)\\r\\x007\\nP-6\\nQ-6\\nF->0\\n\\x00>0::6\\n7&;::2$O0;6\\n\\n&!;$ä2$O;$é2$O;$å2$O=5\\n2$O\\x00\\x00D&&A\\nA\\n|*=7\\nY2.\\n\\x00;!\\r=&\\r=$? ><\\x00\\x00®!##\\x00*$H#\\x0024*$#\\x0022*$#\\x0023*$H#\\x0020*$C#\\x0021*$#\\x002:*$C#\\x0028*$H#\\x0029*$H#\\x0026*$H#\\x0027*$H#\\x00*$C#\\x002=*$C#\\x00=5\\n*$[#\\x00=2\\n*$[#\\x00=5\\n*$[#\\x00=5\\n*$[#\\x002>*$ê\\x00\\x00\\r\\x00\\n\\x00>0\\n>0	A\\nb&A\\n7	&@=$F>0\\n:\\n6\\n6\\n0$ç5$<9;>0::\\n$X$âD&:\\n$v\\n\\r&%010&A\\nA\\nJ*)\\x0030Ŋ;6\\n>$`9;>0:6\\n2#\\x006\\n2>;:6\\n#\\x006\\n>;\\n\\x00>0\\n\\x00>0#\\x00$«=&2#\\x006\\n2A\\nA\\n$U>0#\\x006\\nA\\nA\\n$U>0:$Sз9;>0:$m#\\x00$m>;:$]$¬#\\x00$xЧ#\\x00$tЧ#\\x00$Ч#\\x00$6\\nJ>;:$#\\x00$::n;:$]$¬#\\x00$xЧ#\\x00$tЧ#\\x00$Ч#\\x00$q6\\nJ>;:$\\n\\x00\\n\\x00#\\x006\\n2#\\x006\\nb;\\x00:-:$u\\n\\x00\\n\\x00#\\x006\\n2#\\x006\\nI;$a-7\\x00\\x00ó#\\x00$x\\n\\x00A\\n*$U>;#\\x00$t\\n\\x00A\\n*$U>;#\\x00$\\n\\x00A\\n*$U>;#\\x00$mU>;#\\x00$«#>;#\\x006\\n2	\\r&5#\\x00$\\n>;#\\x00$q$æ>;#\\x00$$ñ>;#\\x006\\n2#>;#\\x006\\n#>;k#\\x00$$b$°\\n9;>;#\\x00$q$b$°\\n9;>;#\\x00$M6\\n)A\\nA\\np$U9;>;#\\x006\\n2#\\n\\x00A\\n9$U>;#\\x006\\n#\\n\\x00A\\n9$U>;\\x00\\x00#\\x006\\n7#6\\n7&\\n#\\x006\\n7#6\\n7>0\\n\\x00>0::&_#\\x00:#:!1#\\x00:\\n#:\\n!1#\\x00:A\\n7#:A\\n7!1#\\x00:A\\n#:A\\n!&\\n7A\\n'0f\\n\\x007\\x00\\x00\\x00g=$®5\\x00;>0A\\n7>0A\\n7>0>0:6\\n2>;:::\\nU:$q\\n>;:>0:7\\n:\\n\\x00$r,;>;:6\\n)\\x00>;\\x00ª;6\\n>$`9;>0:$Sз9;>0:::$£=&:6\\n226\\n2>;:6\\n26\\n>;:$£2\\n\\x00\\n\\x0026\\n226\\na;:$u\\n\\x00\\n\\x0026\\n226\\nI;>02\\n:$a>0:3^\\x00\\x00\\x00C>0:6\\n2>;:A\\n4A\\n4\\n\\x00U:\\n>0::6\\n5A\\n9;7\\x00\\x00Q>0:6\\n2	>;:A\\n>A\\n>\\nU:\\n>0:6\\nA\\n7';:\\n>0::7\\x00\\x00#\\x00&A\\nA\\nJ*\\x00\\x00\\x00e=$î>0:&:6\\n8$u0=&\\n>=$ã>0:&4:6\\n8$ë0=&	A\\n7>:6\\n8$r0=&	A\\n>6%111#\\x00#6\\n(,;>0:6\\n#9;\\n\\x00:6\\n7\\nW9;\\n\\x007\\x00\\x00\\x00\\nA\\n\\\"\\n*8;\\x00\\x00	#\\x00#? 7\\x00\\x00:6\\n#6\\n*\\\";>\\n\\x00>0:#6\\n7&#\\x00#:? &\\n70\\\"\\x00\\x00,#1\\n\\x00>#\\x000F:6\\n7#D#6\\n:9;&\\n7\\x00\\x00#\\x000F6\\n:#\\\";A\\n &\\n7\\x00\\x00«A/¿>0A\\n}>0A\\n}>0\\x00>0\\n\\x00>0::&:6\\nN6\\nL,;;::'00&::M>0N6\\n:A\\n09;>8\\n\\x00>0::6\\n7&:::A\\n7$+'00%::M>0N6\\n:A\\n09;>9\\x00\\x00@%2;;5\\x00$K>0\\n\\x00>05\\x00$K:A\\n&0:A\\n~& :>:A\\n>:\\x00\\x00#k>0:\\nG0>0:&:>6A\\n>\\x00\\x00\\x002G)\\x007\\n1 1G6\\n()6\\n( &A\\nB>7A\\n?>\\x00\\x00\\x00\\x00\\x00\\x00\\x00!=$ÿ	&\\n7=0F\\r:$ö$\\\\&\\n7\\x00\\x00\\n\\x00#\\x00*\\x00\\x00\\\">0#\\x00\\n*8;:A\\n&#>$\\x00\\x00\\x00ā\\r&+;$ø1;$Ā&\\n>5A\\nA\\n2*\\n=\\n\\x00>0$¤>0$ý>0$ò>0\\x00$ù-$ú-:->0=$¦>0=$÷>0	=$ā>0\\n$ô>0$ü>0:==\\n=>\\n==06\\n:\\n9;\\n\\x00\\r&A\\nA\\nk*:	:	6\\nM:9;1:\\n:\\n6\\nM:9;&A\\nA\\nh*%\\r0:&\\n>5A\\nA\\n2*\\r\\x00ƀ=2	>0:&\\n>A\\n7=;2	>0:&\\n>A\\n==$þ>0::2&\\n>A\\n==$F>0:2&\\n>A\\n?=:6\\n>0:6\\n0$¢5$<9;>0	:	:	\\n$XA\\nE&2:_>0:2>0:&\\n>A\\n=$õЭ5$<>0\\n;0F7:\\n\\x003\\n	:\\n6\\n:9;;:9\\n&\\n>A\\n=\\n\\x00>0:26\\n7&,;6\\n6\\nI2:9;&\\n>A\\n=0:0&\\n>ňA\\n=&7I5\\nF22\\\";&A\\n8=7I5\\nF2>\\n^2\\\";>0:&X7\\n:_&A\\nP=7$û5$<>0:6\\n;6\\n	:6\\n:6\\n;6\\n(,;9;=&A\\n&=7©26\\n0$ó9;=&26\\n0$¢5$<9;>0::\\n$XA\\nED&A\\nx=726\\n0$Ą5$<9;>0::\\n$XA\\n=D&A\\nq=726\\n0$Ć5$<9;>0::\\n$XA\\nD&A\\n<=77\\x00\\x00\\x00\\x00\\x00)\\x00>0$č:_7\\x00\\x00\\x00\\x00\\x00D>0>0)\\x00g>0$±>0:6\\n::\\rG:::;7\\n-:_>0:=7\\x00%_7\\x00\\x00/;6\\n\\\"$Đ9;&7$đ>0$Ĉ>0=:	1;:	7\\x00\\x00Y=$ď&I=$=&7=$6\\n(,;>06\\n:$ą\\\";A\\n!6\\n:$Ċ\\\";A\\n!&77\\x00\\x00=$ć	>0=$ă	>0:1:7\\x00\\x0042;&7$ĂЭ5$<>0=:A\\nB\\n>;2;&A\\n=7\\x00\\x00N2;&#\\x002<	&==$>07\\n@7\\n@:9;&\\n>;A\\nA\\n!*A\\n\\\"=\\x00\\x00	$ċ$Gg7\\x00\\x00%>0$Ď$Gg>0:&7=6\\n!=4E=4E$Č\\r&7;6\\n!\\r;$§6\\n\\r&;$§$ĉK\\\";>0:4H1$Ĝ:_&7=$¥$­$<6\\n=$¥q9;==7\\x00\\x00n$ĝ>06\\n:6\\n*\\\";>0\\n\\x00>0\\n\\x00>0::6\\n7&=::6\\n	&00&=$F>0::6\\n7	:\\n:$ª$ė	7\\x00\\x00Q%LLL=$Ğ&76\\n=$Ěq7\\nW\\\";A\\n &7=$¯7\\n	=$¯$ě$Ĕ	&7\\x00\\x00\\x00î%ééé\\r;6\\n>$`9;>0:$Sз9;>0:$mU>;:$ĕq9;6\\n2\\n\\x00 >0:$]Т>;:$\\n\\x00\\n\\x00\\n\\nb;:$u\\n\\x00\\n\\x00\\n\\nI;>0$ġ:0 >0$Ę>06\\n:6\\n*\\\";>0	\\n\\x00>0\\n\\n\\x00>0::	6\\n7&6:\\x00:	:>0:\\x00:	:\\n\\x00>;:\\x00:	:\\n\\x00	&:\\x00:	::>;0\\n0C:::\\n:	6\\n7	7_q>0\\n\\x00>0:#\\x00$a6\\n7&A#\\x00$a:\\n\\x00	&\\n7\\n*>0#\\x00$a:A\\n*	&$Ē>0$ę>0:'00R:7\\x00\\x00\\x00\\x00Ā%ûûûG6\\n8G6\\n86\\n\\x00>.>G6\\n86\\n\\x00)\\x00>;;6\\n>7\\n;:qhG6\\n86\\n\\x00G6\\n84>>;G6\\n8.>c:q>06\\n:$ğ\\\";A\\n 16\\n:$ē\\\";A\\n &7I6\\n&Z=$¨&RI6\\n=$¨6\\n89;>0:&6:$©6\\n;q>0:$Ġ6\\n;q>0:$ı	1:$ħ	&7\\x00\\x00\\x00*%:Eв>0:&\\n:$Ė>:\\x00:\\n\\x00:\\n\\\".>7\\x00\\x00\\nƥ\\r&>0%;$À?\\r;$À6\\n7=>0>06\\n;5\\n#\\\";>0:$½>+Щ:6\\nC$Ħ>;;6\\n=&66\\n;6\\n=:;=$½6\\n\\r>0*6\\n;6\\n=:;>06\\n;7\\n\\\";>0:$ĩ>+Щ:5\\n6\\nC>;:6\\n16\\nC>;6\\n;7\\n\\\";>0:6\\n1$R>;:$Ī>+Щ6\\n;7\\n\\\";>0	:	$²>+Щ:	6\\n7\\n/>;:	6\\n1Щ>;6\\n::;6\\n::;6\\n::	;:6\\nC:!>0:1	:$R:!>0:1:EЩ:	!>0:1	:$²:	!>0:1:1:&A\\n$ĭ*\\x00\\x00i\\n\\x00>09\\n5$_>06\\n3\\nS6\\n*\\\";>0\\n\\x00>0::6\\n7&:::? &\\n:V00'$±__&\\nA\\n3V0:7\\x00\\x00=$F>0:$¹>0$>0$>0:6\\n&:6\\n$D>0:&:>1=7\\n66\\n(,;6\\n7>2::_&::>4::_&::>4\\x00\\\">3\\x00\\x00Џ=$F>0:6\\n>0:$Ģ? &Â$¸$A\\ne$A\\nb$=$ĥ	&A\\n36\\n:7\\nD\\\";A\\n!&	$¶3t=$Į	&A\\n73^=$İ	&A\\n?3H=$ī	&\\n35=$ģ	1'6\\n:$Ĩ\\\";A\\n!&A\\nz3	A\\n3\\r>0:A\\n>D&3$į:*:A\\n9D& =7\\n==$¿1=$µ&\\n>0=$Ĥ	=$Ĭ&A\\nA\\n*=7\\n=&\\n>0:$ľ&ƆA\\n^\\n*8;=$ĵ	&A\\n3²6\\n:$ļ\\\";A\\n &A\\n36\\n:$Ŀ\\\";A\\n &A\\n3p=$\\r=$7\\n	\\n$Ł=$_1'6\\n:$ŀ\\\";A\\n!&A\\nA\\n*'=$Ĺ1	=$Ĵ&A\\n13\\n3=$d=$d$Ķ=&=$d$Ļ=&=$Á? =7\\n$Á? =$ĳ==$Ľ=&A\\n+3W=$´=$Ĳ=&D=7\\n$ĸ=$ķ=&+=7\\n$ĺ=7\\n$ŉ&\\r\\n>5$ő=$³;6\\n6\\n,_&A\\n$A\\n7*=$Ō	&A\\n3=$ņ	&A\\n?3y=$ŏ	&A\\n-3c6\\n:7\\nD\\\";A\\n!&	$¶3B=$d\\r=$d$Ņ	&A\\nH3 =$·\\r=$·$ń	&	A\\n+3=$>0::$¾&A\\nbA\\n*:$|\\n:$|$º&A\\nA\\nw*=7\\n5? &$¸$88&$Ŏ$\\x00\\x00˃=$F>0:6\\n>0=$ō	&A\\nA\\n*ʔ=$ň	&A\\nA\\n*ɹ=$Ŋ	&A\\nA\\ns*ɞ=$Ő&A\\nA\\n*Ƀ&A\\nA\\n*ȭ=$ŋ	&=$ł&A\\nA\\n *Ȉ &A\\nA\\n{*ǲ25&A\\nA\\n2*ǝ=$´=$Ń=&A\\nA\\n,*Ƽ=$Ň1=$ŗ&A\\n$ś*ƞ$œ$<6\\n:9;1	:$©%	&A\\nA\\ng*Ų$ŝ$<6\\n:9;&A\\n$Œ*œ,&A\\nA\\n\\x00*Ľ*&A\\nA\\nn*ħ+&A\\n$¼*ē=$Ř=$ř=$Ŝ&A\\nA\\n*ë=$Ŕ&A\\n$Š*Ò$ŕ=_&A\\n$»*¼&A\\nA\\nN*¦&A\\n$Ŗ*&A\\n$Ì*~/&A\\nA\\n=*h&A\\nA\\n!*R&A\\nA\\nK*<&A\\nA\\n*&&A\\n$Ś*&A\\n$Ş*\\x00\\x00\\x00%$%)\\x003-\\x00#\\x00&A\\nL$\\x00\\x00A\\n#\\x00*A\\n3$\\x00\\x00	Ȧ\\n>0\\n\\x00>0:#\\x006\\n7&ȏ#\\x00:>05\\nI:6\\n\\r&ª:6\\n&6\\n@=1:6\\n&6\\n@7\\n\\x00=&ǈ:6\\n&6\\n@7\\n\\x00,;6\\n=\\r:2\\n$š\\r&A\\nj3'G:2\\n$­\\r:6\\n&2\\nM@\\nA$<6\\n:6\\n&2\\nM9;&\\nA\\n)3'ň5\\n3:6\\n\\r&ĸ\\n\\x00>0::5\\n6\\n7&Ġ:5\\n:>0::>\\n	\\r&Ā:6\\n@=1:6\\n@7\\n\\x00=&â:6\\n@7\\n\\x00,;>0:6\\n]\\r&4:6\\nI6\\n,9;>0:8\\n:$<6\\n:9;&\\nA\\n)3':7\\n%\\r&w;6\\n6\\nI$ş9;7\\n*\\r&\\nA\\nX3':$R:$R6\\n7A\\n.&58\\n1$<6\\n:$R9;1:\\n$<6\\n:$R9;&$¼3':3\\n!\\r&$Ì3'0ĳ0Ȝ\\x00\\x00\\n¯=$ţ>0=$Ŭ>0=$¦>0=$ŧ>0:	:6\\n\\r>0:	:6\\n\\r>0:::==&A\\nA\\nj*:==&I2(50>0>0	:	5\\nI>;:	5\\n3>;:	3\\n>;:@\\n+;6\\n1;6\\n=:	;\\x00\\x00C=$Ū>0:	:$ť	>0:=6\\n<6\\n(,;6\\n$ů9;\\n>0:1:7\\x00\\x00I8\\nF>0=$Ť?!	=$ū?!	=$ũ?!=7\\n2=7\\n26\\n(,;6\\n$ŭ9;\\n>0%...=6\\n<!/6\\n\\x00=6\\n<9;6\\n$Ů9;A\\n>0:1:7\\x00\\x00:%333&-$ű$Gg>0$Ű$Gg>0$Ũ$Gg>0:=::77\\x00\\x00\\x00ē)\\x00>0)>0%āĄĄ=$F>0=$Ë:$Ñ$Ŧ$<6\\n:$Ñ9;=&=$Ë=$Ţ\\n::b;½$³;6\\n6\\n,_&/=7\\n6\\n<6\\n49;>0:7\\n:>;:7\\nU:>;z=$\\n=$$¾&C%9<<=7\\n6\\n7&0$=7\\n\\n>+½=7\\n5\\n,7\\n];00#=7\\n==$¿1=$µ&000\\x003^\\x00\\x00\\x003^\\x00\\x00\\x00\\x00,A\\n\\\"&\\\"=$®5\\x00;>0:6\\n)\\x00>;:7\\n$Ɓ>;\\x00A\\nA\\n=*A\\n73$\\x00\\x00m=0Fe=:6\\n\\r=:6\\n7A\\n7	=:6\\n1=:6\\n16\\n7A\\n9	&6\\n=:q$ƀ\\\";A\\n &77\\x00\\x00\\x00\\x00A\\nI=&7(b=1(c=&7#\\x00	#\\x006\\n	&`%#\\x00$Ÿ>\\x00#\\x006\\n7A\\nq&#\\x006\\nW\\n\\x00A\\nq\\\";>\\x00#\\x0001#\\x000&\\\"A\\n?3$A\\n>9\\n#*8A\\n7=&77M\\n\\x00>0:(b6\\n7&9(b:5\\n.5\\n?#\\x009;>0:&\\n>8d(b:EЩ>8e:\\n\\x00>8f70F7\\x00\\x00P\\n\\x00>0:(c6\\n7&<(c:5\\n.5\\n?#\\x009;>0:&A\\n7>8d(c:EЩ>8e:\\n\\x00>8f70I7\\x00\\x00\\x00	#&#\\x00$\\x00\\x00\\x00¨(h&>8h:\\n\\x00*$E_5\\x00$_>0:&:7\\n->0:=&:6\\n(,;>06\\n:Ц\\\";>0:7\\n=,;>0:q	:6\\n7\\n\\x00&:7\\n=,;>06\\n::\\nU\\\";A\\n 1\\n:8\\n7$\\\\1:3\\nM	&7>8h\\x00\\x00\\x00n=7\\n7\\nH=7\\n6\\nL,;A\\n89;>0#\\x006\\n'$Z$Ŵ9;>\\x00\\n\\x00>0:#\\x006\\n7&\\r#\\x00::W;0A\\n78<*8;#\\x00::>;#\\x007\\x00\\x00\\nć#\\x006\\n5\\n\\x009;>0:6\\n7A\\n\\n&:7\\n=,;>0\\n\\x00>0:6\\n7>0::&:0H:W;:6\\n7A\\n>0$Z:6\\n5:9;$Ź\\n\\x00>0:(i&:>8i:6\\n5\\n\\x00:\\\";>0:A/»&:7;$Ż6\\n\\\\	&:7=$Ŷ$ž9;>0::M$ź$\\n$&$\\n>0	:6\\n7>0\\n\\x00>0::&:::	:0Hf>;A\\n:	*8;:7\\x00\\x00\\x000\\n\\x00>0$ŵ>00#\\x00A\\n3?$\\n?I\\n\\x00?O:?J:?F:?T.(\\r\\x00\\x00\\x00\\x00»2=&A\\n$Q>0A\\n$Q>0):6\\n(,;$D>0\\n\\x00>0G6\\n86\\n(6\\n\\x00$ŷ9;>0:6\\n7A\\n0M$X>0:6\\nW:::\\\";$D>0::qA\\n/>A\\n78<*8;A\\n2*8;#\\x00*$C#\\x00(i*$C#\\x002*$[#\\x002*$[\\x00\\x007EД>0:\\nA/Â1:\\nA/Æ\\r\\r=1\\rA\\n9&\\n\\n*8;\\x00\\x00$B6\\nB@\\n.$\\\\=&\\ne>$=;>$e\\x00\\x00=7\\n6$ſ9;>021:>\\x00\\x00k\\x00\\x00!5\\x00$K>021\\r5\\x00$K:A\\n0>\\x00\\x00	\\x0075\\x00$K>0:>0:>0\\n\\x00>0%\\n\\x003021\\r5\\x00$K:A\\n.>\\x00`)\\x007\\n1>\\n@\\n9$W#\\x006\\nJ\\\";23g5\\x00$K>22A\\n0>2>2&\\n\\x00>\\x00#\\x00A\\n&\\x00R3\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00.\\nA\\n$L\\r&!2A\\nO*$^2	A/Ä*$^2\\nA/*$^\\x00\\x00q\\nA\\n$L\\r&d\\x007\\nP-5\\n6-5\\n-6\\nQ-2\\n-2\\n-7\\n3-6\\nF-7\\n-2\\nZ->0\\n\\x00>0::6\\n7&;::2	$O0\\x00\\x00\\x00 A\\n&\\x00\\n-\\n\\x00-\\n\\x00->00H8\\nZ5$<>026\\n(,;>0:6\\n:9;>0:&2\\n;N>0\\n2\\n\\x00;N>0:7\\x00\\x00#\\x00=10&#\\x007\\x00\\x00i\\n\\x00>026\\n7>0::&Q$bA\\n\\n>0:$1>02:>026\\n:;26\\n7>026\\n7A/Ã&23$ż0X\\x00\\x00\\x00\\nA\\n $L\\r&2A/¸*$^\\x00\\x00\\x00y)\\x00>\\x002-2-2-s->0 6\\n	\\r\\r\\rA\\nA=&:6\\n=7\\n(;\\x00>0\\n\\x00>0::6\\n7&::>0:::6\\n(,;$D>;0p,\\x00E%@@@\\n\\x00>0:26\\n7&-2:>0:6\\n(,;$D>02:: &>0p;\\x00\\x00\\x00)\\x00>8j\\x00\\x00(2&$s>21	)\\x00\\n\\x00$E==>\\x00\\n?@>\\x00\\x00K\\nA\\n $L\\r&>k=7\\n6*G=3\\n,*2&\\r?\\r1\\rA\\n&2\\n\\x00*$E\\x00\\x00\\n;>$=e>$;\\x00\\x00I%DDD/6\\n\\x00#\\x009;>0$Ų5$<>0#\\x006\\n 1:6\\n:9;=1#?!#\\x00# &>\\x00\\x00\\x00\\nA\\n $L\\r&)\\x007\\x00$$s6\\x00>0:A\\nG&2\\n\\x00*$E$s7\\x00\\x00\\x00	\\x00+>0q>0#\\x00A\\n?$\\n?I\\n\\x00?O:?J:?F:?T.(\\x00\\x00\\x00\\x00\\x0026\\n7\\n\\x00&#\\x002*$\\x00\\x00}A\\n\\x00$Q1q>0:6\\n7\\n\\x00\\r&%[[[:6\\n36\\n*9;>0\\n\\x00>0::6\\n7&8::6\\n36\\n9;>0:6\\n7A\\n7	&2:\\n\\x00:\\n>;0E\\x00\\x00Y\\x00>020F#2:87>0:6\\n6\\nO:В:;:6\\n7\\n\\x00&5\\n:6\\n6\\n*9;5\\nZ>\\x00\\x00\\x00\\x00#\\x00\\n\\x00?$\\n?I\\n\\x00?O:?J:?F:?T.(<7\\nZ$P>5\\n_$P>5\\n&$P>5\\nT$P>7\\n#$P>\\x00\\x002\\n\\x00*$E\\x00\\x00\\n\\x00>0#\\x006\\n7>0#\\x00:*$H2&\\r\\n0#\\x002*$T2&A\\n70#\\x002*$T2&A\\n0#\\x002*$T2&A\\n0#\\x002*$T2&A\\n0#\\x002*$T#\\x00::>;\\x00\\x00±2=&\\n2=&>A\\n5\\n_2$J2=&>A\\n5\\n&2$J2=1	7\\n^$P=&>A\\n7\\nZ2$J2=1	7\\n^$P=&>A\\n7\\n#2$J22&A\\n7\\n^\\n$J\\x00\\x00\\rA\\n&~2&27\\x00>\\x00$-$Ž-$ų-$Ƅ-$Ɗ-$Ə-$Ƃ-$ƅ-$ƌ-$Ƌ-$Ƒ-$Ɖ-$ƈ->0\\n\\x00>0::6\\n7&\\\"%::J$Y26\\n::;0/27\\x00\\x00.#=&2\\n>>#\\x00&#\\x00$i>A\\n5\\nT2$J77\\x00\\x00č%ĈĈĈ5\\x00$>0$ƍ>0:$ƃ6\\n37\\n?9;>0;6\\n>6\\n]9;>0:6\\n,7\\n\\\\6\\n\\\\>;:7\\n:$Ǝ>;;6\\n=6\\n:;:2\\n\\\"\\n\\x00>0:5\\n'>0:7\\n)>0\\n\\x00>0	:	:6\\n7&A:6\\n,@\\n$::	>;::5\\n'!1::7\\n)!&:6\\n::	;0	pN6\\n:7\\n?\\\";Б>0\\n;6\\n=7\\n:;:\\n7\\x00\\x000>A\\n7\\nZ2$J>A\\n7\\n#2$J\\x00\\x00\\n\\x00Ň=@\\nQ2>;\\r&§;6\\n>6\\n]9;>0:7\\n:$Ɔ>;;6\\n=6\\n:;;6\\n\\\">\\n<9;>0:7\\nB&K\\x00>0\\n>0::7\\nB>\\n &:6\\n:7\\nB:9;;0,6\\n:6\\n*\\\";И*;6\\n=7\\n:;88&;6\\n>6\\n]9;>0A\\n\\n$Q>0:7\\n!Щ2\\n;:7\\n:>\\n2(L3\\nY:(J7\\n\\n(L@\\n\\r>;;6\\n=6\\n:;\\n\\x00>0>0=7\\n<)\\x00A\\nl\\\";>0	\\x00\\x00¢%>>>;6\\n\\\"(L9;>0::5\\n\\x006\\n	&:5\\n\\x008\\n9;5\\n\\x00>21	2A\\n9&K 6\\n=2	;;6\\n\\\"2\\n9;&;6\\n=7\\n2;2&	=7\\nY)\\x00A\\nl;\\x00\\n&	\\x00\\x00Ï%ÊÊÊ;6\\n>$`9;>0::$S&¯:6\\n2A\\n%>;:6\\n$»>;:$Sз9;>06\\n>0:$mU>;:9\\n3\\n>;:$]9\\n>;:$\\n\\x00\\n\\x00A\\n0A\\nb;:$]9\\n>;:$:A\\nA\\n?n;:$]8\\nK>;:$:A\\n\\nA\\n-n;:$r,;$i7\\x00\\x00\\x00̂%,--;6\\n>$`9;>0:$S:\\n9;1:$S>\\n>9;>0%ʷʷʷ\\x00>0@\\n>03\\n>0	:4\\n,;>0\\n:>\\n:5\\nE:\\n;=:\\n,\\x00A/Á-A/À-\\n\\x00-A/Ê-A/¾-\\n\\x00-\\n\\x00-A/È-\\n\\x00-5;>0::\\n0:5\\nE:::\\nWn;:\\n5\\nA\\n>;:\\n5\\nOA\\n>;:2\\nO,;>0:5\\nV:5\\nJ9;>0\\r:2\\n:\\r:;:5\\n:\\r;:5\\nV:2\\nV9;>0:2\\n::	;:5\\n:;:2\\n\\r::\\r;:2\\n\\r::;:3\\nN:;:2\\n_:;:5\\n:9\\nN:4\\nH\\\";>;:5\\n:@\\n<::\\nD\\\";>;::\\n/::\\nN;:8\\n:5\\n:\\n5\\n:9\\n\\n=\\n\\x00\\n\\x00];::\\n:5\\n\\n\\nn;:9\\nO:4\\n'\\n\\x00:\\n5\\nOn;:$`K!&:6\\n:$`$r,;;0:30:5\\nY&µ\\x00:5\\nJ-:2\\nV->0\\x00:9\\n-:@\\nV-:9\\n-:>\\n--:2\\n3-:3\\nV->0\\n\\x00>0::6\\n7&S\\n\\x00>0::6\\n7&<:5\\nY::::\\\";>0:6\\n:9\\nJ:3\\nR:@\\nn;0I0`6\\n:6\\n\\\";$i7_#\\x000FY6\\n:9;:	&I#\\x00:6\\n\\r&;2>\\n5#\\x00:9;>0:?!&\\\":6\\n6	:A/ºD=&26\\n:;\\x00\\x00M2>\\n,;>0\\n\\x00>0::6\\n7&.::>02@\\n:9;>026\\n:;:30;\\x00\\x00\\x00ì=@\\n@\\n(5\\x00;9\\n%,;>0\\x00:5\\nC? &\\n:5\\nCq-:2\\n? &\\n:2\\nq-:5\\nL? &\\n:5\\nLq-:2\\nA? &\\n:2\\nAq-:5\\n;? &\\n:5\\n;q-:5\\n? &\\n:5\\nq-:5\\n<? &\\n:5\\n<q-:5\\n? &\\n:5\\nq-7\\x00\\x00\\x00в\\x00>0=$F>0:6\\n:$Ɛ;:6\\n:$Ƈ;:6\\n:$ƒ;:6\\n:$¹;:6\\n:$ƕ;:6\\n:$Ɨ;:6\\n:$Ɣ;)\\x00g>0:6\\n:;:6\\n;)g>0:6\\n:;%\\n\\r>0	q>0	:6\\n:	;\\x00>03\\n7>0;6\\n>@\\nB9;>0\\r:\\r:\\r7\\n:\\r7\\n$g&?:6\\n37\\n9;>0\\n\\x00>0::6\\n7&:6\\n:\\r7\\n::9;;0):6\\n:;\\x00>0@\\n\\x00>0;6\\n>2\\nB9;>0::7\\n:7\\n$g&?:6\\n37\\n9;>0\\n\\x00>0::6\\n7&:6\\n:7\\n::9;;0):6\\n:;=6\\nX=6\\nX$g&œ\\x00>0@\\nU6\\n37\\n9;>0\\n\\x00>0::6\\n7&<:6\\n=6\\nX9\\n8Ф:: &\\nМ::qд9;5\\n\\\";0I:6\\n:;\\x00>0:\\n6\\n37\\n9;>0\\n\\x00>0::6\\n7&<:6\\n=6\\nX:\\n)Ф:: &\\nМ::qд9;5\\n\\\";0I:6\\n:;\\x00>08\\n&6\\n37\\n9;>0\\n\\x00>0::6\\n7&<:6\\n=6\\nX4\\n*Ф:: &\\nМ::qд9;5\\n\\\";0I:6\\n:;2&:6\\n2$n;)g>0:6\\n:;2&:6\\n2$n;2&:6\\n2$n;)g>0:6\\n:;:6\\n$¤:_;:$v1:$Ɩ1=$v==>0:6\\n:;:6\\n$ƚ:_;$ƞ>06\\n:6\\n*\\\";>0\\n\\x00>0::6\\n7&:6\\n::0&\\n\\n\\x00;0+6\\n:6\\n\\\";$i7$%#\\x00#1##\\x00_1#\\x006\\nM#9;77\\x00\\x00\\\\6\\n#\\x007\\n\\\";>0=>0\\n\\x00>0::6\\n7\\n&:::>0:=&70p*:::6\\n7\\n7\\x00\\x00\\r%#\\x00#7K7\\x00\\x00w\\x00>022\\n8>0:&`\\n\\x00>0::6\\n7&N::>06\\n\\x00:6\\n1-:7\\n.-::\\n2-:>\\n-6\\n*\\\";>0:6\\n:;0[:7\\x00\\x00g\\x00>02$>0:&R\\n\\x00>0::6\\n7&@::>0:6\\n6\\n\\x00:6\\n-::\\nQ-:7\\n.-6\\n*\\\";;0M:7\\x00\\x00l\\n\\x00>02$6\\n &2$>02$6\\n &\\n2$>0%;8\\n\\r3\\n	;>0>04\\nC=_>0\\x00:-:-:-7\\x00\\x00\\x00>0%LL3\\n3$k:6\\n:5\\n+;:6\\n:3\\n2;:6\\n:7\\n.;:6\\n:\\nC:_;%'884\\n%>0A\\nf&8\\nD:>0=$:J;:6\\n:5\\n+;:7\\x00\\x00Ƕ2=&q7\\x00>0=$ƛ>0:6\\n::$V;=$Ƙ>0:6\\n::$V;=$ƙ>0:6\\n::$V;=$Ɯ>0:6\\n::$V;=$Ɠ>0:6\\n::$V;=$Ɲ>0:6\\n::$V;:6\\n=2\\n@;=$F>0	:6\\n:	6\\n;:6\\n:	$|\\n:	$|$º;:6\\n:	$È\\r:	$È6\\n(,;;:6\\n:	$Í\\r:	$Í6\\n(,;;:6\\n:	$ª;=7\\n_>0\\n:6\\n:\\n5\\n;:6\\n:\\n5\\nW;:6\\n:\\n5\\n);:6\\n:\\n5\\n;:6\\n:\\n2\\n;:6\\n:\\n6\\n;:6\\n:\\n6\\n2;:6\\n:\\n2\\n%;2:6\\n6\\n*9;$i>27\\x00\\x00\\x00	\\x00!#\\x00A\\n?$\\n?IA\\nu?O:?J:?T.(\\r=&6\\nV$P>\\x00\\x00P\\r&\\n\\x00>0#\\x006\\n7>0#\\x00:*$H2&\\r\\n0#\\x002*$>0:&A\\n70#\\x00:*$ #\\x00::>;\\x00\\x00=7\\n$4\\nq#\\x00n;\\x00\\x00*=5\\n>&\\r=5\\n>>0%8\\n@$k>0:7\\x00\\x00/q>0%\\\"\\\"\\\"=5\\nX&\\r=5\\nX>0@\\n$k>0:7\\x00\\x00\\x00p6\\nV$P>2=&A\\nV$Q>2&\\r\\n6\\nV2$J%>0:&:>\\n6\\nV:$J=5\\nG)\\x00>;=5\\n^&	=5\\nGZ;\\x00\\x00P=7\\n$&=5\\n^4\\n\\r>0>0\\n>0\\x00>0=7\\n$)\\x00>;=4\\nB)>;=2\\nN)>;)3\\x00Ä2=&9;6\\n>:\\n9;>26\\n,4\\n5>\\n1>;;6\\n6\\n2;гH2\\n5\\x00$K7\\n,;>0>0:2\\nY#\\x00>;:$a#>;:>\\nK:>;2:#>;2&27\\n9\\nz7\\n':9;>;26\\n:;27\\n8\\nC>;\\x00\\x00z7\\n'29;>0\\x00>:7\\x00\\x002#\\x00>0:&#302#\\x00;c\\x00\\x00#\\x00>\\n6\\nV#\\x00$JA\\n3$\\x00\\x00\\x00\\x00%>0#\\x00A\\n7?$\\n?IA\\n7?O:?J:?T.(23\\x00\\x00=#\\x006\\n2A\\no$Q,;2A\\n$Q,;2A\\n2$Q,;2A\\n$Q,;b;\\x00\\x00\\x00#\\x00)\\x00>.#\\x00)>.\\n#\\x00)>.#\\x00)>.#\\x00)>. #\\x00)>.#\\x00)>.	#\\x00)>.#\\x00)>.#\\x00)	>.#\\x00)\\n>.\\r#\\x00)>.#\\x00)>.#\\x00)\\r>.#\\x00)>.#\\x00)>.#\\x00)>.#\\x00)>.#\\x00)>.#\\x00)>.$#\\x00A\\n7&\\n7#\\x00\\n#\\x00A\\n77\\x00\\x00#\\x00A\\n7&\\n7#\\x00#\\x00\\n7\\x00\\x00\\n\\x00>0\\n>0:#\\x00&\\n:'00p:7\\x00\\x00A\\n0>\\x00A\\n>0=K\\r&:7#\\x00:7\\x00\\x00;&\\n\\x00\\n7\\x00\\x00;6\\n>7\\n9;&A\\nSA\\n47\\x00\\x00\\r=	=7\\n;=&A\\nZ7A\\nC7\\x00\\x00U\\n>\\x00A\\n7>A\\n>=$F6\\n6\\n\\r&\\\"#\\x00#####A\\n7A\\n7#\\x00##7\\x00\\x00A\\n4A\\n,7\\x00\\x00A\\n\\nA\\nA\\n77\\x00\\x00A\\n>A\\nM7\\x00\\x00A\\nA\\n7\\x00\\x00A\\n?A\\n\\n\\x007\\x00\\x00%A\\n0>\\x00A\\n>0=6\\nUK\\r&:7#\\x00:7\\x00\\x00=7\\n&A\\n4\\n7\\x00\\x00;6\\n>5\\n#9;&A\\nSA\\n47\\x00\\x00\\r=	=3\\n_=&A\\nZ7A\\nC7\\x00\\x00X\\n>\\x00A\\n7>A\\n>=$F6\\n6\\n\\r&%#\\x00#####A\\n7A\\n#\\x007#\\x00##7\\x00\\x00A\\n,>\\x00A\\n4>##\\x007\\x00\\x00 A\\n\\nA\\nA\\n7A\\n07\\x00\\x00A\\n>A\\nM7\\x00\\x00A\\nA\\n\\n7\\x00\\x00$A\\n?A\\n\\n\\x00\\nA\\n*7\\x00\\x00\\x00\\x00\\x00\\x00\",ĮĭįİɄɪıĲ\x00jĦħĨĩĪīĬƬƭƮƯưƱƲƳƴƵƶƷƸƹƺƻƼƽƾƿǀǁǂǃǄǅǆǇǈǉǊǋǌǍǎǏǐǑǒǓǔǕǖǗǘǙǚǛǜǝǞǟǠǡǢǣǤǥǦǧǨǩǪǫǬǭǮǯǰǱǲǳǴǵǶǷǸǹǺǻǼǽǾǿȀȁȂȃȄȅȆȇȈȉȊȋȌȍȎ,ó$ô&õmöpōr÷vøxùUúXû[čÓĎÛď~ęĚěĝĞáğãĠèġóĢöĄƲtFÏÉó¤@Ñâ¡ðúHPÆïPÆÃÂ¡!µÕ¡³§u\"P¡÷¡(h«¡8Y¥Úí¡ ÁI¡ ¡S£Å¡<D¡:N¡®*	¡~PÆG¥W¢è¡¡q{¡E#6¡yz¡·|T¡±0%¡¿¡\\ò]ãP¡V¡ê2BP¡Ù¡1rJP¡Ìñ¡ß¥aº?¡¡­[¡ì¾fPÆv¥äÞí¡²pP¡jÛ¡Àl,¡)È¶¡i'¡XA¡CýPÆØ»¡K°×P¡Ó¥oí¡å¥áþs¡¡¥û¬í¡Ê¨¥3í¡Ý¸PÆ.¡ªàă¡>&¡Ă´P¡9¥Ð\nõ¡¡^¥āí¡wg¥ĀÎí¡\r-¡Ld¡$¹©¡ù¥¼5Ü¡¡nx¡¯4¡cZ¡=ÖË¡RÔPÆMç¡`_PÆUÿÄ}Oæeô½/î+QmPÒb¦ö\x00Fkëéø¦Íü;Ç7!ĭ/ĳ\x00	\x00\n\x00\x00\x00\rĺ\n(ƭˣڝ\rz\r\r\r1	ǋ\r	΄	Ձ	\x00	ϱ		͘	Њ	ܝ	\x00	ԅ		ڎ\n	AƬ˘\n$Ĵɱ߉ĭĵ\x00	\x00\nǎ\nߤ\nɪ\nࢉ	\n\n\nK\nɍ	AĭĶ\x00	\x00\nǎ\nࣅ\nɪ\nޣ	\n\n\nK\nɍ\nƙ\nܸ\n©\n̄	Aĭķ\x00	\x00\nɱ	\n\n\r\nऎ	ࠖ\nƞ\nϾƬ˘	$ĸL^ĳ३ƮԖĹĶƸʵĶƺțǔĶƷֺǢƶÎƻ࣠ǔǢĺĳƷÊ	ĵƵǉ\nĶƹΣa/VĶƹܖĴƶƇ\rĴƶǛĴƺĀĶƸĀĳƸŞĳƹʗĴƺŅǢƼʖƻԪǞĵƷƀǢǞĴƶ԰ǞķƵ˔ǚƷȎƵйǞǚĶƶ॑y/ĴƶɷĵƷ˟ǚĴƶिǞĵƶߵǚǞǡĴƵþǔƶ؏Ƶ̉ǡǔĵƺŊǡƹՏƸæǚķƺ̈́ǡǚĳƸʗĵƸƜĵƶ ĵƹ̍!ĶƷɅ\"ǞƷįƵƌǢĶƶ͟ǞǢRU/#ĶƺƊ$Ķƺ̝%ǹĵƸࢦǡƺ˶ƻɎǹǡ&VĶƶɅ'ĶƷ֞(ĵƸų)ĴƷڿ*ĶƸȂ+ĴƷʘ,Ķƹɻ-ķƹ॒.ĴƵٸm//ķƶժ0ĶƵôĻĵƵɐļĶƼƜ1ǺĶƺǍǢƺ঎ƺ̉ǺǢ2ǺƼǤƷłǞĵƹɓǺǞ3ǚƼȤƺÚǞƸʕƺ˼ǚǞĽĳƻƁ4ķƼ͔5ĶƸľĳƸࠫ6Ĵƻࡸm/7ĶƶĄ8ķƷɐ9ĳƸŅ:ǹĴƻśǚĴƸșǹǚ;ǹƷߡƳ·ǺƻٝƹۤǹǺ<Ķƻǜ=ĶƸԔĿĵƻƜ>ĴƹƢ?ķƺȫ@ĵƸٷAǹĵƹͿǚķƸƀǹǚRm/BĶƹųCǔƼɟƹ΋ǚƵʉƶчǔǚDĶƺôEĴƵFVĶƺʵGķƺĄHĳƷǞIǺƷԭƹbǚĶƸȉǺǚJķƺ̒KĴƹŞLĶƻíMǺƻްƹŉǚĵƹׯǺǚRy/NĵƷɻOķƶԂPĵƷǰQĴƻôRǔķƶżǚĶƳϘǔǚ$SĶƹƊTǡĵƷ|ǚĶƸۄǡǚUǭƶʉƺʚǢĶƻܾǭǢVVĴƷƁWĵƸôXǢĴƳͳǹĶƷǬǢǹYVĶƹࢵy/ZĵƸʨ[ķƷɃ\\ĳƹġ]ǭĵƵƵǢĵƼѷǭǢ^ǔĶƻɶǞĴƹלǔǞ_ǡƶȤƶƽǹƼːƻǭǡǹ`Ǟĵƻ˰ǡĵƺɕǞǡaĴƷġbĶƸʏcĶƻƅdķƻǰeķƻͰy/fǹĳƵśǺĴƶ݉ǹǺgĵƻ˟hĳƼŮiǚƸËƵԇǺĴƹƆǚǺjĳƸǗkǢĳƷþǡƸȿƹɎǢǡlĳƹƇmĶƶŅŀĴƸƅnVķƺȂoĴƺŮpǢĵƻƖǞĶƹԳǢǞR/qķƶࣁrķƼ̣sĶƸ̛ŁVķƺʏtǞƺࠇƼÝǢĴƼ̊ǞǢuĴƸࡒvǞĳƶږǚƼĘƼҊǞǚwǭƹ͍ƻ·ǺĵƼпǭǺxǺƼɀƷÑǔƹɫƻ۳ǺǔyĴƷŨzĴƹঞłǞĵƺƵǹĴƻխǞǹRy/{VĵƹÊ|ǔƳǣƳ·ǞĵƵɋǔǞ}ĵƸȽ~ǢĴƶ˨ǹĶƺऋǢǹ$ĵƶϽĶƸƁķƺĵƻǇĶƹǌǺĶƻӧǡƼԺƹůǺǡĶƶĀǔĶƵΪǭĶƻ॥ǔǭRm/ĵƺࠂĵƹބǺĴƼࣹǔĵƹɕǺǔǡĳƺώǹĶƼȉǡǹĶƺƻĶƻƻĵƹؕĶƷŵĴƺÊĵƷȫĵƸʰǢĵƹĝǔĴƷۗǢǔRm/ĵƷĄǭƳЪƳCǞĶƼݔǭǞĳƻŞĶƹȴŃĳƵ̍Ķƹ࣑Ķƶ̒ǡĶƻृǭĵƻɓǡǭĶƺíńVĵƶǉĶƹǇǭķƸ࢈ǚĳƸलǭǚR/ǺĵƼ˰ǢĶƶ֡ǺǢĳƺƅǭĴƷܗǢĴƶѺǭǢ ĳƸʙ¡ĵƻʨ¢ǚĳƹ|ǺķƼНǚǺŅVĵƻ̣£ǚĴƼəǢƸљƷջǚǢ¤ǹĶƻǨǭƹͣƼҸǹǭ¥ĵƻɚ¦ǭĵƶ|ǚĵƻѣǭǚ§ķƺु/¨ĳƸɚ©ĵƵíªǺĶƻߔǔĴƻșǺǔ«ǔƳ܇ƷٵǞĴƷɋǔǞ¬ǢƸޞƻɩǹĶƹٟǢǹ­ĵƶí®ĴƸǌ¯ǞĵƶɶǢĴƶΆǞǢ°ǹƳǣƼڂǹǹ$ņǚƹԱƷ۸ǹĶƺԐǚǹ±ĶƶǜŇĵƻࠡa/²ĵƻה³ĳƻɃ´ǔƹȿƺ͎ǞĳƺѫǔǞµĳƻŵ¶ĶƷަ·ķƶ˵¸ǞĴƳżǚĳƷࢢǞǚ¹ĵƹɷºVĵƹǗ»ķƺŵ¼ĳƼ̝½ĳƶ֍m/¾ǺĵƳżǢǺƳ˼ǺǢ¿ĵƷŮÀĶƷíÁǺĵƼþǡƸɟƷ॓ǺǡÂĳƻġÃĵƻӖňĶƶƊÄĴƸƻÅǞƳÎƼõǭƳÎƶǭǞǭŉĴƸǇÆĴƶࡳÇķƼҨ/Èǭĳƶ˔ǔƺįƼشǭǔÉĳƹÊĵƼԕËǞƼÎƴ˙ǭĵƹՀǞǭÌǹĵƺΰǡķƶ̊ǹǡÍĶƸƢÎĴƺƢÏĶƷ˃ÐǭĶƻގǢƹÎƹকǭǢÑĵƺŨÒǺĵƻŧǔĴƶތǺǔŊVĵƵ߈y/ÓĴƼĄÔǞĳƸˢǚķƼटǞǚÕǹĴƶəǚĶƼ־ǹǚÖĶƼŨ×ĴƼʘØķƼĀÙĴƼȴÚǚƷࣙƴ˙ǡĶƺ׊ǚǡÛǢĴƷूǔĵƵңǢǔÜĴƻߢÝĴƸ˵ÞĵƷڴ/ßǞĶƺǨǔĴƵࠋǞǔàǚƻ˶ƻ̮ǹƺʕƺ࢓ǚǹáǡƺঋƷ<ǞƵौƵТǡǞâǡĵƹþǢĶƵƆǡǢãǚĳƷƵǞĳƹǬǚǞäĴƸǛåǡĴƺΏǢƶؒƸ࠼ǡǢŋVķƺʰæĴƼġçĶƷųèĵƺǉŌǺĴƹࡼǢĶƶ٤ǺǢRO/éVĴƶ˃êĵƼȽëĶƶʙìĴƸƇíĵƺभîĶƵȦïķƼࠍðĶƼ̺ñĴƸțòĳƷȦ4ǑƲĤƯݘŎǨƲंˑ/ŏ-\x00\x00	ǨƲचŻƲʟƲײ	ƳҜ	\nǏsƲĎ	ƲحǏsƲÙ	ƲʹƳŸƳǤƳֽƲʜ	ǇːǇɬü\x00	\x00\nƲàǇáƲǐƳे		\rƲ,	G\n	lŸ\n\x00ǦǶƲ\n\x00ƲЌŐ-\x00\x00	\x00\n		\rƯĆ	G	E\n\n\rƯ\n&ٹƯһϒ׌	ܻő\x00	\x00\n\x00è.ƲĬŶpǇ˽¡@Ǉ˽¡Őð	ݞƯɾ\nƲƋ\r\nß	#	;Ư޿×	ZܞƯࣄ	ZƯӎŒ\x00\x00	\x00\n*Ʋ׵Ʋ\x00	\x00\nvܨ\x00Ƶ࣡\x00	Ðœ\x00	\x00\n	ƲƋ\n\n\r	\nĲ\nsݒŔ\x00	E	h1		ýE\rƲ,ĲƲўݪƯݫŕ\x00	\x00\n\x00\x00ǇáƲ\x00ƳࡨƲԋE	z	\rƲ,	G\n	l\nƲˋƯۦǶƲ\ndƯ Ǩƴ˝\x00ƯΗƯߐ=Ưբ	ǵƲপãǶƲ\n\x00ƯЉ	Ƴɫ	ʃǇrƲŷþצ\x00ŕŦ0^ǇޟƲ$Ŗ\x00	\x00\n\x00\x00\x00\rळ	ź\x00Ʋ։	Ʋ[ƯÆ	Ц\n	ǀƲĩƳŧ\nƲI\nއƳǟ\nٜ\nǃ͂\rß\nեä\nǃÈࠣ\nƲÜࢇ\nƲÜࢌƯ ՗\nsƳ܁ä\nǃÈ\nƲÜҚ`\rǇrƲ\n\x00ƳŧƲ֜\rƲĪŀ\rŗ\x00	\x00\n\x00\x00Ʋ³Ưb	\nƲI(ƭŦ	\r1\nޢ	YƯą	YƯÖ	YƯא	࣮RǏ/Ř\x00	\x00\n\x00\x00\x00\rƲI	\nƲӘƯb\r(ƭŦ	\r1	\r\nT;ƯjƯC\r\nT;ƯaƯC\r\nT;Ư]ƯC\r\nƯ˅\rř̫;ƯjƯ˦;ƯaƯ˦;Ư]ƯCƯٓŚ'ŗ޴ś-\x00ǐƺҙǐƷࣸ*ǇƲ)Ƽ߽ڭÿ-ǨƳסƳԒǨƳƳٻɪ¥ȁŜ\x00	\x00\nź\x00Ƴø	ǇŤƲ\x00ƳШ	)Ưڞ\nǇŤƲ\x00Ƴԓ\n.ƯŲ\n\r	Ń	\rƲۋǇƲǶƲ\x00	ϓŝŔŜœ\x00Ǉݙ	էŞǌşñş-\x00\x00	ǐƲşƷΐĊ\rƲࣺ	DƲğƲߕ		ϠǇʝǇƎƯࣟŹ	\x00ƲۘŹ	\x00ƲڪŪ	\x00ũΊՑũñĀ\x00L)ǋ͏.ƲƑƲךИŷа8ǌşǌĢŪ\x00ࢩŠ-ƌƯϳċǽǽƲ̻ǽƲȚ͑ǜƲįƲ׺š\x00\x00	\n¹ߨ\n(ǯʆ\nƲˮǦ	।ͨ	ϖ֙/Ţ\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00Ʋࡍ\nƳ،Ʋࡦ	Š\n	5	<	փ\n*\rŮƊǗlǗ`Ŗ\n\rlƲЏ\rƲ,Gš4\x00ċݚȋ߶^ѵɞ\rƲ,GlƲڙƯ֯ص`ޅѮ(ǯʆƲˮlŗši4\x00ċ࢔ȋƗگ^ţΖŢ$Ť\x00	͆ǇwƯԀŢ	ە	6	ƵӴ	ƼܲāȠǇwƯҵǇࣧƯŊťʾƯη=ƯनƯࡁ=ƯڋŦĒƯ࣌=Ưǌŧ\x00	\x00\nǘƲҔť֗		\rƲ,	G\nǘƲ\x00	ť\n̴Ŧ\nŰƯओ\nŰƯ͹\nŰƯࢷ\nڰƯ΂\n^ǇƲǇéƲd	גŨ\x00\x00	\n¹)Ʋɉ)Ʋࡥ.Ǘβ\nŧ	\n\n)Ʋɉ\n)Ʋߠũ-\x00\x00	\x00\nŎǏ	ǒÓ	8.ƲĎ	Ʋń.ƲÙ	ƲǢ\nॏƲ˩ƲÇƳ̑ƯƼ\nǇߥ\nƳ޸2ƲʟPŏ+ƳŸǎƳǹ\x00lǟ`	\x004\n\x00AǇʤ,Ƶɣ7ϛŪ\x00	\x00\n\x00\x00\x00\r\x00\x00\x00	O	2\x00	P	+		l	`	4	A	,Ǉł	7ƈ	¨Ǉł	SǇ۩Ÿ\x00Ǔ{	DƯ֪\nŎ\nǒÓ+ä\nǏsƲĎƲń\nǏsƲÙƲǢ.ǇͤPM	SƨǐƲƚƳ|Ǯ\x00ǮǮlǮƃǇэŹǮƸڐ	DƯů	R\rǏl\r.ƶϣ	DƯԆ	ێŨ\r\x00Ǉđ	2ŗ	DƯů	RƦ΃ŎƲ˩ƲÇƳ̑ƯࠕŸ\x00ƳՃǉƧǇͽґŹ\x00{ǇéƲ\x00ƲܷǇúƲࢗǍ\nǇúƲߚǍ8«Ǯ\"Ǯ+Ÿ\x00ƲօǮ+4Ÿ\x00ƲरǮ+4A\x00	SƨAǮ+Ƨ4ã	Ǐ	lǟǒsǇִǒݖǏsƲĎ	`ƲńǏsƲÙ	`Ʋ࣍	`ǒǇúƲǉҺǍ\n	4ǇÔƲǍ\x00ǉP	4ǉ	AƲࡽ	,Ƶɣ	+ǇÔƲ	\x00ǎ\x00	l\x00Ǘ\x00	`	PǇÔƲ	+\x00	4\x00	A\x00	,ǇÔƲ\nƳ׀Ǘ\x00ǇÔƲ	l\x00Ǘ\x00	`६ǇwƯ࢐.̴ţ	Ś	7)\x00	¨Ŗ	4׋Ť	Ńŝ	4{	DƯ޼\n	DƯٿ	D)ƯŪ	Dࢳ	DƯհ*	DƯӜƲ߳ƲՓƲѕ	,Ʋԥ	ūLǽǽƳ࢚ǽƳǁȏ\x00ȑǯƺÿƲ܍ȑҗƲӿǲƲ\x00\x00	ãƲझ	\x00	ȑ	ǘƲӷ\n͖ǇéƲƴࢠ	ƲফƯšƯݺȐ\x00	\x00\n\x00٦ࡩȏӊǙ{ǵ\"Ƶߙǵ׉^ƵĞǖƲǄ\nѹ.Ƶक़\rƲ,ࢆ\nȐ˿ƳʖǇrƲ\n\x00ƲȆƲڗ	h1ǣƲxƲݼƲ\x00	{\nƲ!ȏ	ãƲʜȐ	ׅƴɀǇrƲ\n\x00ƲȆƴקȐ$ĂݱǻŶƲ۬ǇƎƯࡻǻӭϱ/ă\x004ǇВǥࢾ7ΘŬ4ǑƲǥņ$ŭ\x00	(ƭ	Ċ	\r1	ŬƯݛĄȏ4UȏƯҕȏƯܹƯॹȏą\x00	\x00\n\x00ω\nM	Ʋȹ	Π	Ïͺ	\x00\n		\nUǑƲǥņƯ܀Ć-\x00E=ƯŽ&ȇƯڵ\rȈƲ,&ǘƲȈъȂFƯ§ȃƯbȄčƯêƯbȅƯ§ȆčƯƍƯ¼ȇŮ\x00	\x00\n\x00\x00\x00\r\x00è.ƲĬŶp+Ȉ\x00\nƲI	(ƭǑƳܔBƯ՘ƯّƲƯ݆\n\r1\r\n	\rƯI\n	Œ\rƯƍƯȣƯ̅\r\n	ŒƯêƯॷ\rƯۂ	\rƯє\n\rƲ݁\r\n	\rƯI\n	Œ\rƯƍƯȣƯ̅)ǋ\n	×ƯêƯѪǇrƲ	ŷů\x00	\x00\n\x00\x00\x00\r\x00\x00\x00Ġӕ࡟ƲࠑƲI	(ƭǑƲBƯ޾ƯȲ7Ưҿ\rß\nǘƲ\x00}ǘƲ\x00}ǘƲ\x00}\rǘƲ\x00}	Ȃ\nÁȃ	ȄÁȅ	ȆÁȇ\r\r8\nǘƲ\x00}ǘƲ\x00}	Ȃ\nÁȃ\r8ǘƲ\x00	ȄÁȅݷ	Űůų$ű\x00	\x00\n\x00\x00\x00\r	ƲI\n(ƭ	ˣǘƲءƯѸ\rz\r\r	\r1ǘƲ\x00\r_Ưת\rƯ͝\x00_Ư˕cƯ֩_Ư݄\rƯऽ\x00_ƯٙcƯࢧ_Ư؆\rƯࣈ\x00_ƯॿcƯܙ\nAƬƲŬ\n$Ų\x00	\x00\n\x00\x00'ǘƲƲࡉ		\rƲऑ\n	\n\rƯÙ\n\n\rƯۙ\n\rƯࡪ\nƯîƯƕ	ūƯĝ	È\n\rƯͫ\nƯêƯȬ	ūƯîƯƕ	ƯȯƯĝ	Ưٍ\n\rƯڏ\nƯدƯ֟	ūƯîƯȬ	ƯȯƯîƯƕ	ƯѠƯĝ	Ưӂ\n\rƯࢤ\x00	Ưএ\n\rƯҍ\x00	ƯՄ\x00	Ã3ƯζcƯěƲ>ƯφƯࡶçƯ࡚ƯॉƲ!ų4ŴŲܫЁ/Ŵ\x00\x00	\n\x00\x00Ș	.ǋ\n	Ʋ࠶\n(ƭǛƲ³Ưࠪ	7ƯſĊ\r1\nƬƲŬƲe\x00Ưࠨ\r	\n\nƬƲŬƲe\x00	˗ǇrƲ\nŷŵ4ǰǬÐŶ\x00	\x00\n	ŵ\nƲI(ƭ\n\ncƯɖ	\r\n1	ǘƲ\x00	}	ǘƲ\x00	}	ǘƲ\x00	}	ǘƲ\x00	ब\nƯɖ	\r\n1	ǘƲ\x00	׆ŷ4Ǿ\nǾƲ\"ǲƲ\x00ǯƷ۔ƲЗŸ\x004ǇéƲdƲȊŹ\x00	Ġ9ࡃ	ǇéƲdƲנǇƲ	ƉǇƲ$ć\x00Ɂ9ǷǶƲ\x00ƲƲȊĈ\x00Ɂ9ǷǇƲƉǇƲ$ź\x00		ǇkƲ\x00	.ƯɈгǶƲd	ǶƲ\x00	ѰŻ\x00		ǇkƲ\x00	.ƯɈ࠭ǶƲd	ǶƲ\x00	؜ĉ-ȏ\x00Ȑ\x00ȑȐȑOȒȐũoM}յȑȏȑǇ͓	\x00Ǉॴ\nU-ȕ\x00\x00	\x00\n\x00ȕz\rƯŽ&ȕƲƥh~ȕƲƥhƯ¼ƯԑȕƲƥhƯҡؠE\rȕƲ,Ĳh=ȕģh*ȕƲÜdغȕƲ!࣪ȕƲԞ	ȕƲÉƯ \n	5	<ȕȕƲeƯ th\nhh\x00g\n\x00{ѓȕίȒ\x00\x00	*ࢁȒgũoo݃}}ʢ	Ȓ{ũoȰoϙ}}ʢ		Ehċģ}_Ưȩģoʓģ}7ƯŊȓ\x00	\x00\n\x00\x00\x00\r\x00	'\nƲI\r\r\r\n\rG\r¢#F}ݶo\x00}Д_Ưճ	Ʋ!ʓ7ƯƸЁƯն7ƯƸcƯজǒ	Ʋ>۽ƯԾीȏ˗	Ȕ\x00	\x00\n\x00\x00\x00\r\x00	'\n\x00ƲI\r\rG\rَƯࠞ\rঘ\r\n\n\n{\n\ng\x00\rև\nƹ	Ʋ!\n\nࠠ		4ȓ\x00ȑ$\n4ȔȐ\x00řż\x00\x00	\n\x00\x00\x00\r\x00\n5<\rƯʪ\rƯǚ&\n#\nʳFƯėƯĈƯĸZ	×ƯķƯÝ#\rĥƯÝ#ʳ\nFƯė\nƯĈƯĸ\nZ	ˬƯʫƯǳƯķƯŻƲ!\n\x00ªݱ/Ž\x00ɺƿ5Ȉܯž\x00	\x00\n\x00\x00\x00\r\x00\x00ŗ	ǑƲƲ³Ư|''\rƯ̓ƲăƯ|ŗŭƯƸƲ࣏\n\n\r	\n&Ʋ!ŗƲe\nBƯ·\nBƯՂƯկƲe	BƯξ\n\n\r\r\n&Ʋ!\r	Ʋ!ŗϔ\n\n\rƲ,\n&żŽ\n\x00ƲeƲƯƆŘ$ſ\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00	(ƭƲƯ|\nŗŗ5<ƲސƯʪƯn\rƔKƯ֏\r\r\rƯܪ\r1#ɒFƯėƯĈƯĸZˬƯʫƯǳƯķƯÝ#7ĥƯÝ#ɒFƯėƯĈƯĸZ×ƯķƯŻZ\x00Z\x00	\nTƯjƯC	\nTƯaƯC	\nTƯ]ƯC	\nTĥƯC	\nTƯjƯC	\nTƯaƯC	\nTƯ]ƯC	\nTĥƯCʧ	\nï	ƲÜ\n7\x00	Ċ-ȏ\x00Ȑȏ̪Ȑ̪ȉUɺȏ\x00Ȑƭƀ\x00\x00	\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\n\x00ƲăƯݴ\nǇĹpŗ\nƲI¿Ʋı\rƯ՛Ư֭&ïç࢟.Ưʲç.Ư࡙;ƯˠƯåƯƯīƯȌƯƯīƯĉỪçäFƯĉ;ƯåFƯީǕƯ̆Ưࡰ7ʱE\r\rÃς\rƯƦ7Ưʶ=Ư˱\r\rƯŪ\r\r	ǀ;ƯΜ	ȇƯƯ̗	ʠƯƯ̗	ɭƯԤ\x00Ɓ\x00\x00	\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\n	'\rƯĆ&×ǕƯ̆ƯϻE\r٠\n\r\rࢽӼڥZ݌FƯࢬFƯԩFƯbƯĉƯؖƯظ\n\r\x00\r\x00\rΒ\rƯĆ&\nʭE\r\r\rƯĆ\rG\n\r\rܭBƯۈBƯࢪBƯɿ\rBƯ঍ʹƯɿBƯϵ\rƯJ&D\rFƯå;Ư·	DFƯå;Ưण\rƯÍ&DƲı		DƲۢƂ\x00\x00	\x00\n\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00	ƿ5\r	\nƯ॔<ʡu	ȵƯȕiƲ³Ư՚Ư§Ưbڄ\n5\n<\nu\ni\nǺ\r&;Ưó\rƯƯXƯƯXƯX\r;ƯóƯƯXƯƯXƯXK;ƯóƯƯXƯƯX\rƯXƯI;ƯóƯƯX\rƯƯXƯXƯџƯb\x00\r\x00E\rƯJ&	\nƯѾ;ƯˠƯå\rƯƯīƯȌƯƯīƯĉƯX\x00\r\x00\r\x00\x00Aƃ\x00̫ƿࢹȈशʡލ؟ࢺƄȥŬƯƷŬƯƷŬƯƷŬƯղƅ\x00	\x00ȏ\x00Ȑ\x00ȑ\x00	ȉȏ	5Ȑ	طȏड़ȏܡƁ\x00ȏ\x00Ȑpȑƀ\x00ȏ\x00Ȑ\n\x00	\x00\n\x00\x00\x00\r\x00\x00\x00	ǑƲƲ³Ưত'\rƯথƲăƯš\nƄƩƲıƲĂ\rE\nƲ,\n\rß\n\rŗţ\n\n\r	ƔƲe\nFƯ̤\nɵƯ \nƃ\x00\"\x00Ƃȑ\x00dȏţ\rƲ,&Ʋ!ইŘ$\x00	\x00\n\x00\x00\x00\r\x00\x00\x00'ŗ8ƲÉƯǍƲeƯ٨	Ʋ³Ưε\n\n\r	Ɣ\rƲe\nFƯ̤\nɵƯ Ƃȑ\x00\rʯȐ\nƃ\x00Ư\rƲ,&Ʋ!ë\rRŘƲ͗ƲÉƲªO­\n\x00ºAƆ\x00\x00	\x00\n\x00	\x00\n\x00è.ƲĬŶpɆ	3ƯǮ\n3Ưȁƅ\x00\n­\x00	$Ƈ\x00\x00	\x00\n\x00	\x00\n\x00Ɇ	3ƯǮ\n3Ưȁƅ\x00\nº\x00	ª¯/ċ\x004ŮƆ\x00Ðƈ\x004Ƈů$Č\x004ųƈ\x00ÐƉˊe®JƲࠉiט}ˏƊ-\x00(Ɖǩ؅&ऌ˿ZƲÉƯƋ׈ƉऺݮZñƌǇƾl^Ŵ$ƍ4ǇƾƎ4ǳŴǇƾܓƏ\x00Ӏ\nĖAĐ4\rƲࠥƐ4ʧɟ/ƑĒYƯÄࠐƒࠔƯ߷ϲƯڼƯবƯîƯÄőƯ޵ƯॻƯܿƯÖYƯÄőƯ࠻ƯҖƯêƯąYƯÖYƯÄőƯܣƯϿYƯąYƯÖYƯÄًƓʾYƯąYƯÖYƯÄΚƔ4ƓʻƯلƓ$ƕ\x00	ƒ	\x00AƲe	\x00$Ɩ\x00	ƒ	\x00AųƲe	\x00ÐƗ\x00¦)Ʋ£3ƯžƯǂƲ!$Ƙ\x00¦)Ʋ£3ƯžƯǂƲ!$ƙ\x00*3ƯƣƯŏƚ\x00$ƚ\x00¦)Ʋ£3Ư؄Ưࡌ=Ư˕Ʋ!\"=ƯֵƲƒƯ]ƯƫƯҧƲ!Ư˥=ƯڤƲƒƯaƯƫƯΤƲ>Ư]ƯHƲ!Ư˥=ƯߘƲƒƯjƯƫƯśƲ>ƯaƯHƲ>Ư]ƯHƲ!ƯঙƲ!ƯծƲ>ƯjƯHƲ>ƯaƯHƲ>Ư]ƯHƲ!Ưढƛ\x00¦)Ʋ£3ƯƣƯŏƲ!Ư|Ʋ!ƯÊƜ\x00¦)Ʋ£3ƯƣƯŏƲ!Ư|Ʋ!Ưο̗/Ɲ\x00¦)ƲǖĖƲ>ƯjƯHƲ>ƯaƯHƲ>Ư]ƯHƲ!ƯÊƞ\x00	\x00\nè)ƲĖ	QƯđ\nçƯđƲ>	ƯjƯHƲ>	ƯaƯHƲ>	Ư]ƯHƲ!	ƯHƲ>\nƯjƯHƲ>\nƯaƯHƲ>\nƯ]ƯHƲ!\nƯÊƟ\x00*ŶƲɝƯࡀƗ\x00ƲǅƢ\x00$Ơ\x00*Ŷƚ\x00ƲǅƢ\x00$ơ\x00*ƚ\x00ƲǅƢ\x00$Ƣ\x00	\x00\nE		\rƲ,	&\n	٬\n)Ʋ\n\n£\n3Ưž\nƯǂƲ!\n$ƣ\x00\x00	¦	)Ʋǖ	Ėč	ƯjƯC֋	ƯaƯCƯ٫	Ư]ƯCƯѢ	Ư؛đ*'tJʑȎȏñȏ-Ȑ\x00ȑȐOȑƈȍȌȒ-ɪЯǇĹݾƲÉƯ\x00	ĠԸƳƘƵڽ8ů	ŚƲÉƯȲƲeƯǍőŶ	8ſ\x00ȒðŴǜƲįƲ͢̞NƳܑŔȐ\x00ܩ\nºȓ-\x00\x00	\x00\n\x00\x00OO	ɪ؁\nhȐ1Ȑ\n5NƯƦ\n0Ưňȃ	\n\nƺȔ\x00ȍȔ\x00ȌȑөȔ\x00	Ŕ8	ū	ƲƯ˴	Ŷ		ž	\x00Ȓð	řő	ӗƲǁ	ƴŴƵ<Ů	Թ\nج¹\x00_	Ŝ\x00\x00	\n\n3ƯƦ\nɪΨMȐ׽\x00\n\x00	Óȑ0Ư˴ȑ«Ǳȓޔ	Ȑl6ҟȃɪҦޒƤLȎ^Ȏ_$ƥ\x00\x00	LȎ	ॕȎ¹\x00\x00	$Ē\x00\x00	\nE\n\n\r	\n&\nę\nē\x00	\x00\nź\x00Ʋš	5\nʞź	\x00ƲՕ^5Sʞ,\nμᆧ/Ĕ^\x00S\nƲĪSM,\nƲȎ,ŀƦ\x00	¨ƵʤƸдƹÚƵЩ		\rƲ,	ĲŹ\x00	ࣘƧźź\x00ƲøƲߧǇŤƲ\x00ƳƀǶƲdفĕ\x00L^ƲĪAĖ4źź\x00ƲøƲڒė\x00	\x00\n	'ƲĩƲҒƲͻ\n\n\rƲ,\n࠿Ÿ\n{	Ʋ!\nʇ	Ʋ֨ƲǞƨL^źź\x00ƲøƲޭƩ4Ż\x00ƲࡲĘ\x004ƩŶƩ$Ĝȏ\x00\x00Ȑ\x00ȑ\x00Ȓ\x00ȓ\x00	\x00\n\x00Ȕ\x00ȕ\x00Ȗ\x00ȗ\x00Ș\x00ș\x00Ț\x00ț\x00Ȝ\x00ȝ\x00Ȟ\x00ȟ\x00Ƞ\x00ȡ\x00Ȣ\x00ȣ\x00Ȥ\x00ȥ\x00Ȧȏ¿Ȑȑ¿Ȓȓ¿	Ưہ\nƯʒȕƯɾȚȧ	țȧ\nȜ'ȞɪƪȟƸɩȠȢȣȤɪƪȦO(t$~I~OMJ\x00F\x00T\rʑۼȘȱș(ȲƯŠȖƎƯˢȗŎƳ࣭Œǐ\x00ƴȍŒǐ\x00ƳÿŒǐ\x00ƴǙ	ŒǐƲǸƻƌ\nŒǐƲǸƸՒŒǐ\x00ƲſŒǐ\x00ƵÚ\rŒǨ\x00Ʒ˾*ȷץ$*ȷɸ$	*ȷƯ§$\n*ȷƯæ$*ȷƯb$*ȷƯõ$\r*ȷƯ¼$*Ȗ8ȹݣȳƯбȵƳ࠰ȻΩ\rLȘ.ǋࢄȸȑȔ\nƢ\x00ȔȼȧȽ\x00Ⱦ\x00ȿ\x00ɀ\x00\x00	Ƚ\x00Ⱦȿɀ'O	k\n\x00n\x00¿\x00¯\r\x00f\x00y\x00|\x00\x00\x00p\x00Ã\x00_AU\nԫȿļȽNȾ$ȿNȾ-̃n̚ɀȾȾ#ȾļȽĢ\r-̃n̚ȿ#ȿ˳ȽĤȽ\x00ɀȿʇɛkΥ¿Ʃɀȿ\x00ȿ#ȿļȽȠȿ7ȾȽĤȽȾȿˏȾȿĒļȽĒ˳ȽĤȽ4ɀƭȨ\x00\x00	\nE\n\n\r\n1\n	ȩ\x00LNǋ+NǋࡴѧʈׂבȪ\x004ǑƳ>֢Øࡇࢫȫ\x004ǑƲ۵ǑƲҁȬ\x00		#²ŕµŌǑƳ>²ØµˑǑƳ>²Øµ˭ǑƲ	˲	ǳ	ĢǑƵƠ	$ȭ\x00	\x00\n	#²ŕµŌǑƳ>²ØµˑǑƳ>²Øµ˭ǑƲ	˲	ǳ	p\nǑƵƠ	ۉ\nƯ˷Ǒ׾\nŀ\nȮ\x00	\x00\n\x00\x00\x00\r'	(ȴǶ\nЛz\rƲ,&\r(ȴ\nŝ\nāƲ!ȭ\r\x00	Ŗ\nAȯ-\x00Ƚ\x00Ⱦ\x00ȿ\x00ɀ\x00Ɂ\x00ɂ\x00ɃOȽ'Ɂ'ɂ'Ƀ'Ê\x00	\x00\n\x00À\x00\x00¤\r\x00\x00¬\x00X\x00±\x00ÈAU\x00	Ⱦɀȿɂ'Ƀ'Ƚ'Ɂ	?	0?	p	ܤ	0मȽȾȫ_	ȾÃɃƲ!_	ࡕȩ_	ܽɁɀȪ_	ɁɀƝƯࡅȿɁɀɀ࡞_	ɂƲ!ř	ȥȿ\x00ɀ\n\x00	\x00\n\x00\x00Ư¼	'\nȨ	\x00ϧ\rɀ1Ɂ=ƯÆ	࠽=Ưے	ٕ=Ưࠀ	ݎ=ŋǠ	ࡊ=Ưӈ	ْ	࣬\r1	ݥ\nЎ\n\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00Ưà	\nO\r¾Ⱦ\r^	Ċ\rȾࡂ''\nঁ\rȾڸ*ȽKȽlߋ3Ưڡ؈ࣝƯখ7\x00œ\x00ɽȷ\nÈ̱\x00ڌ\rƯףˤ\rࢎ&սœ\x00ɽȷÈ̱Eh1ʸƲƯݠ४\n3\n\r\r\n\x00	ǑƳì\r\x00	ι	\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00«\rƈ¾ɂƲƯٰ\rɃƲӉܰ\rɃƲĦG	Ƀ\nɃۡȩ	\x00\nŗԌ	͞\nͪ#	\nŌ	\n١\rƯߜƯߝƯݍƯॎ\rƯࣾƯࣼ3ƯтƯ߲	\nЧƯфƯҰƲ!ԮƲƯϚƳࠊƶ߂\rƲ,&QƲI\rƲ,&ǑƲʷՎQƲӔ#QƲĂʽƯ§3ƯΔű\rѭ\r࢖\x00܄Ưࣱ\r\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00Ư<	«\n««ՐɂƲ*\r¿z\rɂƲĦ&ɂɂKқŝ	08\r3ƯÆ\n	M	\"ԝԢ08\r3ƯÆM\"3Ưň\n0	8\n	\x00\rԟ3Ưň08\x00\rϡ\r\x00ɂƲƯҮ-\x00\x00	\x00\x00\x00\r'	¾ɂƲֈƯϸ\x00Ʋפ\n\x00L73ńӬ73ńߎƯٯȮɂ\n5धƯn\rƲ,&\r\nޱ)\r8	3Ưǝॗ	ш	\rȢ\x00Ʋռ\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00	Ưः\nɂ\x00ǳ	BƲওǋ\x00¾\rƯәƲĦ_Ʋ֙1(ȴӻٔѿڣ0ǋ8Ȭ\x00\x00ǑƳì\x00Դ7ֳ࠯Ư࢏Ō۲\x00\x00	\n\n֝0ȏऀyӢ	Ʋȳȩ_ð	{\n;\n-\x00\x00	\x00\n\x00\x00\x00\r\x00\x00ɂ5(ȴǶ	ǋ\x00\n\rz\r\rɂƲĦ\r&ɂ\rȫ\x00ࣀ(ȴŝā\nȭ\x00	)ǋ\n)	\nʀ	\n\x00ݗ\x00\x00	\x00\n\x00\x00\x00\r\x00	\nϹȦ\nȦ(ȴɂऊɂ࠳Ȧ\nȦȦ\x00ɂƲƋ\r\r\r\r&ɂ\r	ĿȦƐ\nĿȦāȪ\x00ȦȢ	\x00\n\x00\x00ƭȰ-\x00Ƚ\x00Ⱦ\x00ȿOȽ'ȾȿÊ\x00	\x00´\n\x00rAU\x00	Ⱦȿ?0?pƟ	_	ƲSƯߺ	ƲSƯڹȽȾ	\x00Ⱦ̨	ƲSƯǝȿআ	ȿ\n\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00Ưн	Ư֫\nɰ'\r¾Ⱦұ\rȾ1ȽƲSƯ̸\nƹƳ҈\nƳ҉̨\nƯ\r1Ɲ\n\rϩ\r\x00	\x00\n\x00	τ\n\n\rȾ\nL\n*Ƚ\nlƲSƯࡈƲSƯޓƲڔƲ߬	ӟȽ\nʃ	ȱ-\x00Ƚ\x00Ⱦ\x00ȿ\x00ɀOȽȯȾȰȿɀƴӱAU\x00\x00	\n\x00\x00\x00\r\nޑNȐɞhȽ1ȽƲʿŚȽ\\Ț\x00\x00	)ǋ8\n\x00ȿȻȚ|ٖhȾ1ȾƲʿŚ\rȾ\\ț\r)ǋ8\n\r\x00ɀȻț|Խ\nȲ\x00Ƚ\x00Ⱦ\x00ȿOȽȾȧȿȧÄ	\x00§\n\x00£\x00AU	\x00\x00	LԻNȐ8Ⱦf	ȽÈȿf	Ґñ\n\x00LNǋ^A4ǳBƯɬń߅-\x00\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \x00!\x00\"\x00#\x00$\x00%\x00&\x00'\x00(\x00)\x00*\x00+	\n\rȕ\x00 ȕ\x00!Ⱦy\"ȿyö!ȡ#Ⱦ?#0Ⱦ?#Ⱦp#Ɵ$Ⱦ_#%$\x00	%5%<ǑƳì$\x00ǑƳì$À\x00$0ǋ8&$\x00&ј&<&5\nʀƯɑQƯɑQۑ'$\x00'5'<($±\x00(5(<)$È\x00)5)<)u)i\rǑƳì$¬\x00\r$X0ǋ\nNȕ\n$X$XƺǒǑƲQBƯ̖ǒǑƲQBƯ̖3ƯσQʼƯࡓƯࣚQʼŋऻŁ#7ƯҋƯ͈ǑƲÒBƯŠǑƲÒBƯŠǑƲÒBƯҬ¾\"ȡ#ȿ?#0ȿ?#ȿp#Ɵ*ȿ_#\n*\x00*´\x00*r0ǋ\n .ȕ\n *r  *rƺNȕ\nű Nȕ\n ű#Ȕ'+\n+У \n+gƯоƗȔ\x00+ƜȔ\x00ǑƲÒ	ŖƜȔ\x00ƜȔ\x00ȽƜȔ\x00ƜȔ\x00ƜȔ\x00ƜȔ\x00ƜȔ\x00ƜȔ\x00\rƜȔ\x00\nƜȔ\x00ƘȔ\x00ƝȔ\x00ɧƝȔ\x00ɧƝȔ\x00Ϯȳ\x00\x00	׃Ʋ֮ࢣƴ՝ƴफ़Ƴ҅	࠮ƲۭƲպňࣔň޳ƳԲƳࣻȴ\x00ݲठȵ4ɪ¥ȤȶࣩƲঝȷ\x00		(ȳ\x00\x00ȵƳҭȖ\nȹ	܃ȶ	ӆȥNȐ\nȸȐpțf	ȥȑ\x00țkǠȸȑͩȣ঄	ƲǴȚf	\"	Ʋ٪ȸȐ\x00ȏ\x00		ƳɳȒ\nȣƯ٧ȢȣƯ٘	ƲSƯӒȡ	\x00ȣݵ	ƲSƯ΍ȩȡ\x00	{ȸȐpȣӰ	ƲSƯÆȣ£	Ʋȳ	Ƴɳȓ8ȣƯæȢѲ	ƲǴȢԏȢȢ_ƯÆȣЕȥȐȸ\x00\x00	\n\x00\x00¨ƻ˒ƵכNȐ\nȚyͷțyԚ\nȘƴş\x00\x00	șÄ\x00\x00\nࠌȹ'Ʋ!ƲࠃƲӯƲ!ƐƲ!׻Ʋ!ƐƲ!āƲ!ƳࡱƲ!ƲࣕƲ!ƳوȜƲ!ǇrƲզȜƲ׍ɪ¥Ȟ_ƯӺȻॆȺ-\x00\x00	¨\x00\x00\r\x00¨ƌƯॐ		\rƲ,	ҳ		ۖ\n*	݀ǇrƲ\x00ƲऱŮƋі-¹Ǩƴ֛ǨƴञƸޚǨƸ̇Ư׸ǇrƲέǑƲެ\r࣓ǷƳՌǨƳЃǨƳƳڅǨƳƳՋȻ-ыȝ\nȝȺƩȠÃƲ!ȝƲ!ȠƲ!ȗƲǁȜȜ'ȞɪƪȼǇrƲ۷ȼɰǨƲ҆(ǨƲ̽ǨƲݤ(ǨƲݩƴ޽ƹƲǈƳěȟ࠲Ʋ̭߮ƪ-ȏ\x00Ȑȏ'ȐयW\x00ŜݨȐ؃ȏȐ*աȏȐƫȏ\x00Ȑȑȑȏޮ\x00¥Ȓ\x00w\x00	\x00¦\nŜȒȏǋȐІȐ-\x00Ȓöېȏ̲Ȑ\x00ȐA	-®wö^܏ǵЮ\n\x00	ȏ\x00ȑĺȐ	Ȑ\rȑ	&	ȒǪԛᑱ/ģ\x00ȏ\x00Ȑ\x00ȑ\x00Ȓ\x00ȓ\x00Ȕ\x00ȕ\x00Ȗ(Ƿࢱ	Ȕۥ\x00Ȗȕ¦\x00\n	\x00	\x00Ș\x00ș\x00\n	OЫ	ډϝ	࢛ȕƫ\x00Șȕ¥\x00șȕw\x00\nș\x00	¶ȏ\x00	³ȑ\x00	¼Ȑ\x00	®ȕފȕð	ÆȘ	«Ș	MȚǪ	UȚ-\x00\x00	\x00\n\x00O;ȘȘNș	Ș\n(ƭ	מ\r	&\n̄Ț?	Ș(ƭ	ţ\r	&Ț?.\n\x00¸Aȗ\x00Lسݸঃӡࢶ5Ϩԯ5<Жࣿ5<uκ߿5<uiԎ՞5<ui̹׿5<ui­܂ࡘ5<ui­ʚ̛\n\x00Ș\x00ș\x00	\x00\n\x00Ț\x00\x00\x00\r\x00ț\x00\x00M\x00Ș¶\x00ș¼\x00	³\x00\n®\x00Țƪǩ\r	&Ȝ	˫\r࡜	ǯܢ\r̲\rΝț(ƭ;țۧǨ\x00țÆǨ\x00ț«Ȕ\x00\n'ֆОइƓț\x00Бț.Eʁ\r&țȞ	NȖNȟdNĺE\r&ȜЈȜ*ĳ޺ȝݡȝ\x00	\x00\nǎ		\r	&\nǋ	\nࣲ	ڑ\nज़	ޛ\nͭ	ऒĭȞȡ\x00Ȣ4U-\x00\x00	\x00\n\x00\x00¹ȡʺȚWȚWȄȢ<ʋȢ΢'(ƭȡ;ȄȢ͙ʋȢڮ˫	ȡ.E\nʁ\n\r	\n&\nȞ	\nªٽƓ\x00ݿӨȡNঀȡNȖȡNpȟȡdȡNĺ­ȡ8ȚȚǼܥȟ\x00\x00	\x00\nȡ\x00\x00Ȣ\x00ȣ\x00\x00Ȥ\x00\r\x00ȥ\x00Ȧ\x00ȧ\x00Ȩ\x00ȩ\x00Ȫ\x00ȫ\x00ȥN\x00Ȧ\nuȧ\niȨ\n5ȩ\n<ȪȚWȫȡȡ\r	ȡGȥȡlۊॺӹٲȪȫ՜˞ȤȥȡȣȥȡȢȧȤPটȪȫȔȥȡɥȣȥȡȪȫÓ8ȡȣ˖ȫǧۛࢊȥȡɘȣȥȡȘȣȥȡ\x00Ȫȫ\"ոɴȪȫȪȫ\"ࡿȪȫȢȪȫȪȫȢǊȪȫȪȫƞ\x00Ȫȫ\"ԈࡐȫÏȫ\x00ȢȢȣȪȫȢȪćӑȪȫȪȫs\x00Ȫȫ\"ҎȪȫȥȡƛȪȫȪȫʷ\x00Ȫȫ\"ϭȪȫȪȫ̙\x00Ȫȫ\"ܐȪȫȪȫש\x00Ȫȫ\"Ϥȫĵȫ\x00Ȣȣ\\ȪȪȏ\rȥȡȡc\r\"ܛߑ࠴ȪȫۅࢯȪȫՍϴȫďȫ\x00ȢȢȣȢȪȪKȪȟȪȫݰπ९ȪȫȢȣॲ\"ه\nϫȡ	\"ॡ\rȥȡȡ\rvȪȫȪȫƝ\x00Ȫȫ\"֔۟Ȣȣ̔ؾȪȫȪȫʴ\x00Ȫȫ\"५ȢȢȣȢ७ȫÏȫ\x00Ȣȣ\\Ȫć̥ȣȥȡȢȨ\"ُȢȢȣȪȫȢाࢅȪȫȪȫʹ\x00Ȫȫvȫĵȫ\x00ȢȢȣȪȫȢȪȪȗ׎ߌ٢ȪȫȪȫƃ\x00Ȫȫ\"չȪȫȪȫʔ\x00Ȫȫ\"ࢋȫĵȫ\x00ȪȫȢȣ\\ȪȪȗȪȫȨȥȡʮࣖ˪ȣȥȡȢȔ\"ըȠ\x00ȥȡȥȡ\rȥȡȥȡȡцȦ\x00\n\nࣤȡ	ȡ\r\"ࢍȪȫ\rȥȡɊȡ\rvȪȫȢȣϑ\"˂ܜȪȫțȥȡʮ֦ȣȥȡȪȫȞ¸ȣ\n࣒ȫĵȫ\x00ȢȢȣȢȪȪȏȥȡČȣȘȥȡ¢ȥȡȣ\x00ȢȪȫPࣉȪȫȢȣ߄ֹȪȫȢȪȫïȢ ˺ȥȡČȣȒȥȡ¢ȥȡȣ\x00ȢȪȫǊȥȡɘȣȥȡșȣȥȡ\x00Ȫȫ\"ϥ́ȣȥȡȢȦ\"ӣȣȥȡȪȫ8ȡȣ˖ȫǧ߰ȤȥȡȪȫȧȤDȥȡ̢ȫÏȫ\x00ȢȢȣȢȪć͵ࠁȥȡȱȣȒȥȡ¢ȥȡȣ\x00ȪȫȪȫȣPӃ\rȥȡȪĨȫ7\r\x00ȫȫc\r\x00ȪȫȗȢȣ߱ȤȥȡȪȫȩȤDȥȡ̢Ȫȫ\nࣵ\nȅ\x00ȡ	\"ȖɦȣȥȡȢț\"ӌȫÏȫ\x00ȪȫȢȣ\\ȪćЋȪȫȦȥȡɥȣȪȫȢȪȫPܬȪȫȢȪȫïȢȘȥȡʦ\"ЄȪȫȪȫӳ\"ܦȪȫȢȣvȪȫȢȪȫïȢȒȥȡʦ٩ڻ॰ȪȫȢȣ\x00ȪȫধȪȫȪȫٴ\x00Ȫȫܘȫďȫ\x00ȢȢȣȪȫȢȪȪKȪ́ȪȫѦΕҝȪȫȪȫʂ\x00ȪȫϗȥȡȱȣȘȥȡ¢ȥȡȣ\x00ȪȫȪȫȣټࠓ\rȥȡȪȫȡ׮Ȥh*ȢȣȤ\x00ȟ\x00ȡ\x00ȡ\r\x00\n\nάȡ	՟ȡ\rעȣȥȡȪȫÓ\nȡȣԙ݈অȪȫȢȣ̔ঈȫħȫ\x00ȪȫȢȣ\\ȪȪKȪ©Ȫƨ٭\rȥȡȪĨȫ7\r\x00ȫȫc\r\x00ȗȢȣȪȫࢂٞȪȫȢȣڷ\"চȪȫȪȫʸ\x00Ȫȫ\"םȪȫ࣫Ȣȣƛȫħȫ\x00ȢȢȣȪȫȢȪȪKȪ©Ȫِ࣊ϐ҇ȪȫȪȫӦ\"ޯȪȫȢȣक\"рȪȫ߹ȢȣƛȣȥȡȪȫȪȫȣP֠ছȪȫȪȫݧ\x00Ȫȫ\"޶ȫħȫ\x00ȢȢȣȢȪȪKȪ©ȪƨѯȪȫȪȫٳ\x00ȪȫvȪȫȢȣę\"ѐैȫďȫ\x00ȪȫȢȣ\\ȪȪKȪȟॅȪȫȪȫߴ\x00Ȫȫ\"γȢȣ݋ȣȥȡȪȫȣPͯȣȥȡȣPѡ\rȥȡȫc\r\x00ȪĨȫ\x00ȫ\rȢȣӞȢ\x00ȓȤȥȡȣȥȡȢȩȤǊȪȫȪȫࡺ\x00ȪȫۣߟЬȣȥȡȪȫȣPڟȫ˜ȫ\x00Ȣȣ\\ȪȪKȪ©ȪƙȪɹΟȫħȫ\x00Ȣȣ\\ȪȪKȪ©ȪƨӽȢȣ˯ֶՆȫ˜ȫ\x00ȪȫȢȣ\\ȪȪKȪ©ȪƙȪɹࡎȪȫȣȥȡȢȓȣ\rȢ\rNǋ\n\rȥȡনȡ\x00ȡ\r\"ԵȪȫȪȫÁ\x00ȪȫӚȫ\x00ȢȪ\x00ȣȫࡢԬȪȫȪȫƞࡑȥȡ˯۠ࠩȪȫȪȫוӶȣȥȡȢȪȫP٥ȪȫȪȫࣂ\x00Ȫȫ\"؉ȫďȫ\x00Ȣȣ\\ȪȪKȪएȪȫȪȫɌ\x00ȪȫѳλρȢȣݦडȪȫȪȫʱ\x00Ȫȫ\"ȢȣݐȚȪ-ȥȡ˂˞ȤȥȡȣȥȡȢȧȤP̥ȣȥȡȢȨ\"˪ȣȥȡȢȔvȥȡČȣȘȥȡ¢ȥȡȣ\x00ȢȪȫPȖ˺ȥȡČȣȒȥȡ¢ȥȡȣ\x00ȢȪȫP́ȣȥȡȢȦ\"ɦȣȥȡȢțvȣȪȫȢȪȫPȓȤȥȡȣȥȡȢȩȤP΀ȫ\x00ȢȪ\x00ȣȫvȣȥȡȢȪȫކȠ\x00\x00	\x00\n\x00\x00\x00\r\x00\x00\nc	\x00	cŔȟ\x00\x00\x00±*\r\x00ȟ\x00\x00	\x00ݝ­य़	\x00ȟ\x00\x00\n\x00࡛ࣥ\x00ȅ߫ĤˊİZİJ¨Ư׼ƯձƯࠬƯ۝Ưߏ¨ƯћƯѶƯ֥ƯҾu	U\x00	è.ƲĬŶƯ\rƲ,हiƲ!ë	®iİ}Ʋȹ	ƲˋƯɏuŗ	ƲɢƯα-\x00\x00	\x00\n\x00\x00\x00\r	®i\x00\n®e\x00Ʋ§	Ʋ!Ưढ़	ƲĂƯ˷ƯJƯ͒&	Ʋު	ʂƯɏuŗ	ƲɢƯ͊	ŗ		Ʋ!ǑƲب}BƯԿƯׄ	Ʋ۴}BƯКu	\nƲI(ƭBƯХ\rß\r\nT\r;ƯjƯCT\r;ƯaƯCT\r;Ư]ƯC\rƯ˅	\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00Ʋı®e\x00Ʋ˒\n5<u\riǺ=Ưࡧ&_ƯӮ7Ưȕ7Ưי7Ưग़7Ưࣃčप;Ư۫#\nFƯҶ\n;Ư϶=Ư޷#ঌ\r\"=ƯߛZZ\r=Ư࡫#̳\r̳\r\"=ƯࡠZZ\rM	#҃Ǒ\\QƯٱ\r\x00\r\x00#FƯޝ;Ư \n\x00\n	Аࣛ\nĚ࠹ɗĚݹܕĚϺ؋\rĚށࣨݟĥȏȐ\x00ȑ\x00Ȓ\x00ȓ\x00Ȕ\x00ȕ\x00Ȗ\x00؀ȐȏƳځȑȏƲऔȒȏƳިȓȏƸָȔȏƴ঒ȕȏƳ࡬ȏƼڨȏƼԼȏƶ׹WȖڠƯ֌ȏƲ८ȏ͠ȟƵŐȑ)ǋ\nȏƲ̕࣎	WŒȏ\x00ƼŐªȋ\nU\nɛ+Ȗİtॼ\nƲxƲॢ\x00\nƲxƲپ\rUȗȢ\x00ȣ\x00Ȥ\x00ȥ\x00Ȧ\x00ȧ\x00\x00	\x00\n\x00\x00ȧतȥȥȘȥäȧtȘȢ\x00ȣȧtÁșȢ\x00ȣȧt©ȚȢ\x00ȣȧtțȢ\x00ȣȧtµȜȢ\x00ȣȝƲȧ\x00Ȣ\x00ȣǼȣ)ǋ࣐6ȕ6ȧt.ǋ+ȧtफȥԍȧƻЀǱ\r\x00Ưޡȧt\x00	'\nȧtˤh1ग׶ʔǋ\n	ʭ	ؤǋȵ	Ӈh	1	ʴ\n8\n	ր)ǋ6Ȧ.ǋ+ȦӁȧƲĔȢ\x00१Ȥ.ƲۏȤ\x00ȼ\rȗƲȧ\x00Ȣ\x00ȣ\x00Ȥ\x00ȥ\x00ȦřȘ\x00Ϸ)ǋ1ȑȞȑ\x00\x00Ʋȟ\x00ȑ±	ºș\x00LȔǵ)ǋ1ȔƴŴ\x00ƲȔƳƘ±	ºȚ\x00	¹ȓ۞	Ƞö)ǋ1ȓ	Dࢴȓ	DΈ\nºț\x00LȒǵ)ǋ1ȒƴŴ\x00ƲȒƳƘ±	ºȜ\x00	ĠǇվ	ȡƲƌƳҩ	Ƶܳ	ƲǏƺࣦƶԷ)ǋʺ	Ƴї\x00	ƺ͐ԃ	ƴͱ	Ʋğঢ\nºȝȢ\x00ȣȤ\x00\x00ȤϬȕ8¿ȕƲǈƲƱƳष\n\x00ƺ҂\x00ȣ)ǋ\nƳƮƳƮ\rϪ	ˁ\nˁ\x00	ƲƧƲɠ	ƹϯƲܟƲࣴ\x00	\x00\n\x00ƲƧƲɠƵɔƴźƲψ	ƴɲƲ״Ƽ˨\n	Ƶ̎ƲƖ\nƸϞȢ࠸ȣьƳ߸\r\x00	\x00\n\x00ȥƲƧƲڜƵɔƴźƲܵȤtǋȰ	ƴɲƲޙ\n	Ƶ̎ƲƖȥ\nƲĻȢȥƳƮƳࡣ*ȥƲвǋ\nȤtǋȤtȥƲভƷۃȞ\x00\x00	\n\x00\x00\x00\r	ȏƵ݇	ǇkƲ\x00ƲËƲόƯŲǇkƲ\x00Ʋ͚\nǇkƲ\x00ƲËƲχ\n.ƯƼ\nǇkƲ\x00Ʋ܉ǇkƲ\x00Ʋ̦\nॵ\rǶƲd\n)ƯƼ\rǶƲ\x00ʎ\n݊ƲËƲĘ	\rƲËƲĘ	AԶƲËƲĘ	ȟ\x00	\x00\n\x00\x00߭)Ʋ࢘	ƲàǇáƲ\x00ǯƹգ\n\n\rƲ,\nG\n͇ǇúƲӓǸƲʯƲԣǇkƲ\x00	֖ȏƸϦǸƲ\x00	ƲIƲঔȠǲƲȏƲƳǹǯƺघȡ\x00\x00	\n)ǋȐƲý{\nȐƲý\"\nȐƲƚ\nƲǏƳمƲ࢝\nƲǏƺˆƷi\n\nƳՖp	\nȐƲ࣯ƲƠ\nĢ\nȑȞȑ\x00ƵŐȏƲܧȏƲ̕ȑ\x00\x00	\x00\n*ȗƲȨ\x00ǋ\x00\x00ǋ\x00	\x00\n$\r\x00*ȗƲȨ\x00\x00ǋ߼ĄįǊǯįĩmǲ6Ǯ+ǔ%įǵ2ǌǇƓƯƏįǫmǇяǪ+Ǉ͉ǨѨǇ÷ĳƳŁǇ͌ǣڧǥǑƲނįǇ०ǧ¤Ǜ9ǰ%įǇФǫį\nĮࠒǚƲÀǬࠛį\nĮŹǙǨƹœǇٚǐƲݯǞĳƳŁį\nĮâįǹ2ǔǐǨƳ̏ǇЇ	ǇƤīƲxƲŇǇɨǢǇȾǠƼ̰Įنįǐ2Ǘįǉ+ĨǇڱǠƳחĉ?ƮƬ޲ǍƲ»ǌ˚į#ǜ¤Ǟ2Ǧ¬ǇŘįǤ+ǇÕǇȸǨƳŇǫǑƳœįǘ+ħįǑ@ǚoǔ2ǭ%ǇòǊǇќǠƲࣽįǹ6ǡ@ǵ+Ǯ%	ȈǇáƲƸҢǇȾĳƳÞį#ĦùǚĩÂǨ	ĦƭƲxƲœĬ¨Ư­Ư̮ƯƽƯڢįǨ2ǕǇʊǬǤǨƵࠦįǇӲǇˡǎщįǹǠǇòĳƳՅ¸ǷॾįǇլǷ@ǳ2ǡ%ǇɂǇĜǇՠǇؗīࣜǮ͡ĩĳƳʍǙǔǇॽǈǏĳƳ̟įǇЍǫmǏǣ%ĩǠƲ̋įǗ2ǇŘǓǵį\nĮˇįǇأǟįǇΑǌǰМįǮ2ǇࢼĦƲÀǒĳƳɇįǠǚįǨ6ĩoǠ2Ǻ%Ǉऄǋį\nĮ´Ć?ǟࠚĪƲ̀ǇлǑƴڀǇԦǨƴउįǇ࢜Ǧ¤Ǳ+Ǘ%ǛǑƳʛįǪǓįĦ2ǮįqǺ@ǇۮǠüǱǊǐǱǨƳޕǧǨƳхįǟ@Ǉ׳Ǟǲ%įǇʲǇĞǒࠄǪǨƲ̓Ǉ̿ǧǢǎƲǇࣇƯ¶į#Ī6ǳ+ĦĳǗį#ǎ6ǐǦÂǇ̩įǘ+ǸǕǊįǥǤĊ?įǕmĪ@Ƕ+ǉ%įǇƂįǇঐǇַǦǌ%ǇʄǠƲˌį#ǫ6ǇҥǯÂǇ̩į#Ǣ@ǊǇ͋ĪǕǨƼ̐ǇòƲưɪ¯ǑदįǇνǇÕǞǎǓϜǇͧǑƲʩǇͲǑƸ̐ǇòǑƲˉįǉ+ǰ	Ǉ࡯ǽǽƲȜǇƤǟǻǨƸ̋ǦƲȀǲǠƲ࢞Ǉ÷ǠƲˀǇࠅįǇؘǉ@Ǐ2Ǧ%ǈÌįǒmǪ6Ǔ9ǭ%įǞ¡ǐmǤ2ǳ%įǖ9ǑįǟmǮ6ĩǦ%Ƭ߀ƭݕǉ֣ǩÌĪĳƳûǇсǇअǸƲ˻Ĵľ	ǇϼƯ̦ƯǘƯѴǪǪįǑ@ǇɤĨǦ%Į˛įǎ2ǟȊÌįqǓoǰ2Ǉ߻ǶĪǑƲדįǥ2ǺǏ͛ǛǭįǉǇÍįǊǨƵॸǜǨƳןǩƲÀĮĴįħ6Ǉ࣢ǇՊǦ%įǇǟǇĜǇÌį\nĮɯį\nĮĕįqǜ̂ǇƑǶ¬Ǉޤįǳ@ǹ6Ǫ2Ǎ%ǍߍǇƤƲưǇȸĳƳʅįǠoǟ6Ǡ+ǇদįǕ9Ǫ	ǦǨƲ˄Ʋ̓ǇСĳƳ̟įǎ¤ǰ@Ǉ޻ǭ%ǉƲÀǇ÷ǇʌħܱįǸ@ǹ6Ǥ2Ǹ%įǛ+ĨǇʊǠƲजǇòƲ»įǛ6ǘ@ǇֲǇ݂į#Ǻ@Ǐ9ǙÂǰįǚ+ǞĨǠƲ˧Ǘ܌ɪҼǇࣗǨƴȜįǘ¡ǇॄĪ+ǒ%ǒĳƳûįǇܠǓǙƲJį#ǰ6ǇࡡǇޠǹǿǨƲ҄ǇʄĳƳƬĮǡɪछįǇ֐Ǭ@ĩ+Ǻ%ĶľǓǇŘǟƲJįǇڳĩ˝Ǉ Ƶ\x00ƻ\x00Ƽ\x00ƴ\x00Ʋ\x00Ƴ\x00Ƹ\x00ƹ\x00Ʒ\x00ǐ\x00ǯ\x00Ǩ\x00ƶ\x00ǋ\x00ƺ\x00Ư\x00Ŏ\x00Ɲ\x00ő\x00Ǳ\x00Ľ\x00ī\x00Ɨ\x00ǣ\x00ƥ\x00Ƿ\x00Ǝ\x00ǵ\x00Ǒ\x00Œ\x00Ƥ\x00ƌ\x00æ\x00\x00Ƣ\x00ă\x00U\x00÷\x00ǳ\x00Ǽ\x00ø\x00ƛ\x00Ÿ\x00Ê\x00ö\x00ħ\x00Ñ\x00ň\x00ǥ\x00Ė\x00¨\x00Ǫ\x00ù\x00õ\x00ĕ\x00Ƌ\x00ǿ\x00ǜ\x00Ə\x00¥\x00Ů\x00ƕ\x00ơ\x00\x00×\x00ÿ\x00a\x00ï\x00¯\x00Ţ\x00X\x00Ɛ\x00ǽ\x00ď\x00\x00ū\x00Ź\x00Ɵ\x00Ɠ\x00Ā\x00\x00]\x00ƭ\x00!\x00z\x00B\x00ƨ\x00ů\x00Ă\x00Ĉ\x00ß\x00¢\x00Ä\x00\x00\x00Ą\x00Ã\x00Ǭ\x00Ɔ\x00ý\x00\\\x00_\x00Ż\x00ć\x00Ƙ\x00Ƈ\x00ċ\x00Ğ\x00þ\x00Ē\x00Ơ\x00ú\x00©\x00G\x00$\x00.\x00®\x00u\x00\x00\x00Î\x00Û\x009\x00'\x00Õ\x00\x00Ō\x00:\x00Ô\x00\x00É\x00\x00Ł\x00\x00Ņ\x00t\x00¦\x00ŋ\x00F\x00T\x00Ð\x00E\x00|\x00\x00ü\x00Ě\x00Ď\x00Đ\x00ƍ\x00ā\x00\x00Ų\x00đ\x00q\x00R\x00\x00Ř\x00ŵ\x00č\x000\x00Ɗ\x00Ĕ\x00ē\x00Ĝ\x00Ġ\x00Č\x00œ\x00ğ\x00ġ\x00Ģ\x00Ŭ\x00ĝ\x00ė\x00ą\x00ę\x00Ę\x00V\x00ê\x00\x00Ý\x00ń\x00Ç\x00ð\x00Â\x00ƞ\x00=\x00ŏ\x00¶\x00#\x00Ŗ\x00û\x00ë\x00m\x00±\x00Ü\x00h\x00\x00d\x00W\x00v\x00S\x00A\x00ç\x005\x00`\x00à\x00\x00H\x00w\x00^\x00p\x00	\x00Q\x004\x00\x00ã\x00P\x00J\x00\x00\x00}\x00\x00ò\x00å\x00¾\x00Z\x00/\x00\x00\x00¸\x00x\x00¹\x00â\x00;\x00 \x00\x00g\x00¡\x00\x00\x00\x00»\x00È\x00@\x00Þ\x00o\x00\x00Ö\x00á\x00\x00£\x00Y\x00\x00Ŋ\x00\x00%\x00í\x00\x00¬\x007\x00\x00D\x00C\x00\"\x00\x00\x00Ì\x00I\x00\x00,\x00l\x00è\x00¿\x00\x00O\x00f\x00¤\x00µ\x00\x00Ù\x00*\x00N\x00ª\x00\x00~\x00²\x002\x00n\x00°\x006\x00Å\x00L\x00{\x00>\x008\x00i\x00\x00&\x00?\x00+\x00º\x00Á\x00é\x00k\x00î\x00b\x00M\x00³\x00(\x00\x00´\x00\x00\x00½\x00Í\x00­\x00§\x00[\x00ñ\x00 \x00\x00e\x00ř\x00ô\x00r\x00ó\x00Ǖ\x00ŗ\x00¼\x00\x00ě\x00Ë\x00<\x003\x00Ï\x00\x00\x001\x00c\x00\x00-\x00\n\x00K\x00Ò\x00y\x00\x00\x00s\x00\x00ä\x00\x00\r\x00Æ\x00Ø\x00)\x00\x00\x00·\x00«\x00j\x00ŉ\x00Ó\x00Ú\x00À\x00ì	įǣùǯ6ǇोǇރĵľǇɂǐƲܺįǉ+ǭį\nĮथįǚmǇӥĩ9ǳ%įǇѽǺǚĳƳҽįqǭ̂ǩǰüǫǇࠟǠƲޥįĦ2ǇŻįĩ+ǇĞį#Ǎ¡ǜǶ¬ǇĮǘǠƲȐǯĳƳÞǇ޹ǠƵसįǑ2ǇÕį#ǦoǗǙÂǵįƶǺmǇـǌÂǡǶǠƲߩǇإįǇցǌǠǵƲɜįǘ+ǠǇғǫĩĪƲƄįǇӍǠǇ÷ǹƉƲԨĤ?ǯǨƸ̷Į̧\rȂ'ȃ'Ȅ'ȅ'Ȇ'ȇÌį#ǇɤǙǣĳǇˡǎƲƄǜǇÕįǲ2ǡķľȀǳǧƲJĥǨ%ǳګį#ǤoǇࠆǮĳǱǹǥǵٗǸǠƶ֓\rģমư\x00Ư\x00Ʊ\x00ǝӸǇ	įǸ@Ǔ¡ǇǾǟ%įǮ+ǩǼǨƲʶǽǨƺՈǾǠƼּǇɨǐƳࣷįǇƑǇŽ	ǇؑƭƲxƲ֤	ǖǣƲxƲŇ! \"#ɪɭ$%ɦɧɨɩɒɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥDǝ	\n&.\r/ȏȔɅÐɆØĖ_acæçǺɇŃɈżɉſɊƆɋ²Ɍ¶ɍºɎ½ɏûɐþɑŪŬŰŜŒơÆĀÂo´W%­%²J9¥Ár³*N\"ÀX¤5Ä_¯%£%h%¸2k§sHI»$C~1¨¶gfU0%b%4¿Qºzye}%¢}%u}%l\x00[86K-Yv% %'% %¬%·%#Ã%%¼«;%%d%%¾%%/Sa,G\n%@EZ½<%\\w`¹®A?!B©:xL(7T)°%PV{q=M]^FµF%&SfO±Gª%.\rn%%j%tc%%Å¦	|¡iR%%%%+>%mpfD3%\x00Æ\"\n!ڛ	\"\rƲ,Ǩƴۍ!࡭ɦ(t$Ư΁I~OMJ\x00Tǈ ɇ	ǃǥǈ Ɋ	ǈ 	ɟɠɡ`ǈ 	ɦ(t$ƯõI~OMJ\x00F\x00T\"#Ǉࡖǟ+ǒ¬Ǖ	Ǉ·ƲǄɄɧëǈ ɉ	\x00	ǈ ɏ		ƲǈƳěɦf	\"œɦ\x00ǩ	ǈ Ɇ	ɦƲ!	ǥņƯÍ:ȊɦyȌǨƳˉȍǨƴӾWƳŋ	ƶư(ǿ?Û\rưض ưĨ\x00ࣶ:ɣكɦƉƲװɦ؝ƲÇƳړƯ¶ǈ 	ƼÍ\"#ǓoǤ9Ǉױǧ\"ǤǍ¸ɦƲɦƲăƯǩƲ!ǧɦ\x00ɧ%ǈ ɍ	ǈ ɑ	ƹĜɒҌ$ƯƱ&ɡɦ\"ǨƲݢ	ɦ'tJ	ɦƲ,	ǨƳ঑Ʋ̵yȌƳܼƳ؞Ȍƴ࡮ƳڬȌƶˆƳդ*ȌǋR	ǨƳ̠ƲxƳ̘ƯæǐƲƚƲݜƲşƳ۱ǁ߾\"ǎ¡Ǯ@Ǔǧ%ǈ Ɏ	!ࢰƲ̀ǈ 	ų	֘ƯͶƯߒƯˎɪং:ɒǈ 	\"Ǡǎǈ 	ǈ 	\"\n!ߖɒǨƳ̠ƲxƳ̰\"\n!ࠏƲ̭ɧ	ɦƲ,\"\n!ݽÌ\"\n!ڃǈ Ɍ	ɪॊƻȀÛ\rƯÃGɦęɧʐǇࣞ\"\n!Źɦ(t$ƯbI~OMJ\x00F\x00T\"\rǈ ɐ	ǨƳ̵ōǴŋƱĸÞƿƂ:ƯƏǑƲॱ\"Ǉ࢒Ǉǥǈ 	\"ǒǕ\"\n!ࡾǅJǈ \n	\"\n!ɯyɭǆǨƲ˄ĽĶƲߗ\r*ƗWɦ(t$Ư¼I~OMJ\x00F\x00Tɦ(t$Ư·I~OMJ	\x00F\n\x00TƍƯ͸\"\n!â\r\"ɴǇήƲࢿǇʝǇƎƯˎ:Ȁɥ˚֑$ƯƱIƯ˓ƯbOMTɡ	\"ǿǇՙJ?\"\n!ݓɪǆ̡\"ǨƳॣǇи»Ʒе¯ɗƍƯŢ\r\"Ǩƻ܊ǋ+Ʋ֎Ǩǈ 		ǈ 	\"\n!Ք\"=ǝǴɢ:Ǉ٣	\"Ȍǈ 	!ѩǈ 		ɘəɚɛǈ 	ǄƄְƯ§ƯæƯbƯõƯ¼Ưˌ!˛Ǉ߇ƲǄɄƳěɦࡄƺ˻\"ǼǇঊ	:ɭǆǨĽĶƲܶǈ 	ǈ 	\"ǨƳࠎǨƲʣɭ¯!یǈ Ɉ	ю\"#ƳׁƺڲãƵÿ̡\"\n!ēɓɔɕÛ\rƯGƯ̾ƯΌ:Ưťƾ\"\n!´ǈ Ʌ	ǈ 	\"ƶǉ@Ǎ2ǇچǍǈ ɋ		:ǇԄƲǨ\x00ɦ	ɤƍƯƬȀɪǀǚƴÀɜɝɞ	Ǉىɪϰǈ 	Û\rÃGɦęɧʐ\"࢙ǷƳ˸Ưĸɦ	ǈ \r	ǆÕǈ 	!ǡưĸɦ	ƸĞɪࡵђ(ǼƴʅȁɪÅ\r:ǨƳŎƳࡆǷƳࢲƯ͕	ǈ 	ɪϊǑƲëȊɦƯnɦ(t$ƯàI~OMJ\x00T\r\"3ƯJƽĮƵ»ي\"\n!Ӥǂʌ\rɒɓɔɕɖɗɭɯ\rɫɬ\n		F\nUWƌȜpů#gĻÈâÈ¹ƉØ¡Żƀ§ÛųvƀºœfƀŰ<¾ŞţƅŔÿ7]ġÈÚƀðŤÈŃ\"ÈÈŅ¢ŽÃ8K6?ŨÈÈ©Õv'¤ĞƄőŶvIƈĒŨĚqŭĳßŨēŋjŨŐ5ÈlÈļÈŅű=.ăŨĵĸŨÂwŨ:ÅŨ%šÆÐ=ĠĤƀ>Eö|ĘXĽĩƀŸś! ôÀ¦¼ÈÈĄä\x00ÈÊÙþiíƀĂ×ĕƀÎƀ®ħàƀªŎŒ@ò1È}«ÈtŧÈěÈAũįE[2²Ū&ÈŴÈÒ­Èçó[úƂÁÈUVƊĮeŜŉ{ÈÈā±ÈÈ*4»$¸ÔÈĪ_ĴĬ¨,Pćċ\nÈÌÏÈżÝ^¬ŚƀC³ÈĲŨÈłńåıĜīŅÈSá÷uT8ąĺķæŗm¯oDëĊMĥƀſÓøŨWÈľ3JbėŊcHdzňŬžÈO\\qéŖŢÈŏÈÈïĀƋŌŦźŨ(È`ŨÈŅ¢ƀ>ďFŝÈaÈ½ĔČÈ ŨÈ£Ũ)¥~ŘÈĢÈ9[ãÜ	Èkŷ·;B0î\rhùÍÇ>QĦËÈĭÑyŨnÈýŠÉĖÞ°ĝƀņÞĐN/+°ƃƀ2+&ÈxōęĈĖr-Ũ>Öņ¿õƆRşƁ/ģĶû[ŁĨŨđGŨŮÈŇYƀŀÓûŨř´vŨğĎ¶ÈµêİĆZsLÈūťĉŕŹčìñƀĖŵƀņüŲƀ/<&ÈŨĿÈŅ¢ÄĹèƇÈ\x00ƌəƴǿɜɭԗ\nҪɭ܅/ĐǨƴ࡝Ǩƴ̬ƴ؇Ǩƴ̬ƴؔ\nªǨĽϟƴٺƴȔƴࠗƴȔƴЅƳǫǓ\rW`ǨƲƳϋɓҞɒɪҠɘɥǳǫǇˈƻѱ\x00Ư۰Ǉˈƶख\x00Ưԧǈ 		ƙ\x00ɡ	Ɯ\x00	\rƛ\x00ɭʬƯͼƯذɘ%	Œǐ\x00Ƶǘɍf\n߯\nۆƒ\r	\nࠧǇĹ	Û\rGȊƕ\rª`ƎƯ܈	Œǐ\x00Ƶ˾Ɍfژƙ\x00ɕ	ƙ\x00ɔ	ǎǪ½ə\nܴ:\nऐ	.Ʋ؎Ǉؿǈ \n	\nΎƖ	\r	\r\rǀƲĩƳÞɭۇǒoǯ¤Ǐ9ǒ%	Œǐ\x00ƳÿɇfƢ\x00ɓ	\rԡ\rƲ࠺Ưnɛ	ɒ@Ɣ	gƯƲ,	ɝǳɞQɓ	gƯ°6Ʋ[Ư˱Ʋ[ƯŢ	Œǐ\x00ƴǙɉf	ƣ\x00\x00ɨ	\n्ɫƝ\x00ǇࠝɘĽ	ɒ»Ɩ	\nࢃ	ơ\x00ǇĹɪݭ\nЂǻǨĽĶƲȞƲÇłүƯŲǨĽĶƲȞƲÇƳ׏Ư¶ǗoǦ¡ǍǱ%ɟĽ\r(ǷƳ˸	ƳרƳ̇	\r\rDƲ܋Ɨ\x00	\n͜ƲÇĺޫƯ¶ƙ\x00ɤ	z\nֿǱ@ǎoǐ9Ǉۨ	Œǐ\x00Ƴ؍ɑf\rȇƲĂ\rɭƲ,	ɓƲ[ƯJǠ2ǊऍƢ\x00ɖ	ɭޗɨϏƯ˓Ưû	ƛ\x00ƎƯҫɗ0ƴডɘ0ƴٮə0ƴǿɗƴʛ\r:\rӛƭƯёΦƲР\r»`ɪƴƯȪ	Œǐ\x00ƵÚɊf\nˇ	(ƭƲ׷Ǉ֊\nŹ̞ƳԉƲۓ	qɔ+ɒ+ɓ	½ɤǒǟƙ\x00ɖ	ƙ\x00ɢ	\nΧ#ǇwƯիɨƯՇɨƯڊǈ 	ǨƳŎƲȮɔʎɕ\n\r7ɓڈƯơ\nͦǇڕƯݏǇǔƯɇɜĽɭا\n़Ɛ	ٶǈ 	Ɨ\x00ɚ		Œǐ\x00Ʋ܆ɏfɖ`Ɲ\x00ɨ	\rƯJǈ2ǏƯĮƙ\x00ɣ	yɯմWlǨƲƳɜɜɪÅɕ`\rƟ\x00lƲɝƯԁ	Œǐ\x00Ƴ࢕Ɏf	ƲSƵ߆ɔɔƲ[ƯĜƜ\x00ǑƲÒɜ%ɬ	\rƲ,	Œǐ\x00Ƶʒɐf\nē.ǋؙƕ	ǤǇÀɒ`ɭݬɭۻǦ9Ǉō	\rſ\x00	\n׫qǇwƯߪ½ɖǤ9Ǧǐ9Ǘ\r\rDƲ,\n࠷\nऴ\n̼ɒƯnࢨ	ƲSƶҷƗ\x00	ɗ0ǋɘ0ǋə0ǋ\nߣqǇwƯŁƝ\x00ɧ	\rƲ,ɔ\r\r२\rھ\rѥ\rƬ\nȝƏ\r	ɨgƯn\rŕ\rƲؓƯnǵƲণƯJɓ`	ǐƲýǇࡏĐƵΉɯ֧ƵتŉڶŉؼƳǫՉ\rWƯˍ\rD\rDɌƯߊ\rD̙Ưмɼ	ɫƲĻƵŉ		ƛ\x00ɭӪƯआɗ%:ƴֻ\rɪƴƯûǇѝǉ	ŒǨ\x00ƶזŞ	ɪ¥ɜ	ɡǳɠQɖ	Ʋ֕ǯŀӏɨgƯJǤ9ǇōȊ(ƭ	ɔƤƴΡǇƂƜ\x00ɒ	\nυ½ɒ	ɒ%Ɩ	Ɲ\x00ǇҀ#Ǥ6ǧǈ¬ǠƯѬ\nͥɖɖƲ[Ư¸	ɒƲ[ƯJ\rǨĽȭ½ɢƗ\x00ɕڦ۪yɭտ±W#ǇࠤǇ۾ǎǇͮ\nښǨĽȭ̧ɟ\rƲ̌ǯƹҲɒ0ǋ+ɖ0ǋܮ\nࣆ\rƹࠜ\rƹॖ\rƸȐɒɓƠ\x00ɦ		ɛǳɚQə	ƎƯࣳƢ\x00ɒ	\rǨƴǑ\rDë	ƲSƶŋɨgƯ°:ƺǱɚĿɪ¥ɘ	\nؐǇڍǗɨǻƹ̜ƸʩǇ؊Ư̈\rǘƲ\x00	\n࢑`4ǨƲƳࣰ	ƲSƷ۶ɒ.ǋɊǨƳŎƲȮ\r7ɒʽƯơƓ	ơ\x00ɒ	ţ	ɞɓ0ۜɔ0ࢀɕ0ǯǠǍƜ\x00ɖ	ҘƲ,\rƯ࠘\rʠƲкƜ\x00	ɔȺƠ\x00ǇȪǦ¡Ǐ6Ǐ+ǜ%	ɫǐƲýƷΫɒ-ɫ(ȋ?zߞǇܒǗƞ\x00ɩ		Œǐ\x00Ʋſɋf\r#\rƵث\rƵکƯn\nȶƙ\x00ɓ	ئ\r#\rƵŸ\rƲ֬ƯnɓƤƴঠ`Ʋύǌş?Ƣ\x00ɔ	ɓ:\r\r.Ư؂\rDƲ࣋\n׭ɒƤƴগ	ƲSƵۚgƯn\nǽǨƲƳؚɚ\r\r\rDƲĩƲÞɗ`ƯÍ	ɒƲ[Ư°	:\rƲ[ƯŪ\rڇ\ryǣƵǐ\x00ƻދ\rͬWƞ\x00Ǉҏ	Œɫ\x00Ʒ߃	ɔ`Ǖ6ǪùǏ9Ǘ%	ر\rƯ.Ư°Ɯ\x00ɗԘԜ\r3Ưٛ\r\rƯť	.ƲآƲ׬ƶऩĴ\rʈ\rȺǧǎǧ6Ǉ֚ǐ9Ǔ%Ǧoǒ¤ǇǾǈ%	Œǐ\x00ƴȍɈf\nۯ\rDǨƴ˝\rDƯŢ\rƳ΅	ɒ8Ɠ	\nۺ\nࡷƯn\nΙɧ0ǋɯ¯ɭϢ\nމ	yɭƳ±\rҤ+ާǇwŊֱǇǔŅࠈǨƹݑǋ*ɒǨƲƵàɅޖǨƶЙǋ*ɖǨƲƶđɆ݅WǇɮǪƲ˧\rǳʍɪδ	ɓŶű%ů	gƯJǇߦɪƴƯ̈ƙ\x00ɛ	ɓɒƙ\x00ɗ	Ɨ\x00ǇӋ	ɒ½Ɠ	\nۿࢮyɯׇWɨgƯǱ\nĕ\nΛƠ\x00\r	\nӫqǒùǪ9ǜüǟܚǤ2ǓɘɪÅǇɮƲĪ\rƲğƳзƳѤҴɒɪÅ½ɣ\nँ0ǋ\nؽŊ?:ɨgƯĮơ\x00ɓ	\nу\nࡹɟɪÅ\n´ɠĿɪ¥ɟ	\rƛ\x00ɭʬƯ࠵Ư­ə%ɒŭɤŭɢŭɣĽƙ\x00ɝ	\nވ:Ưťǈ 	ɨgŊ?ǎmǈmǓ2ǎ%ǇwƯں\rś?\r:Ǉҹ7ʻƯж7%Ǉˍ	\rƲ̌	\nࡤ`Ʋخ\nПɒ9ɓɦqǤ¤ǍǐĳǇԊƗ\x00Ǉ֒ƙ\x00ɥӅƯޜɥ	:\rɗ\r»\nâ\nѻɕǯ	ɓƲ[Ư°ǯƻθǗ2ǧqǇwƯवɒƲ̶	\rƯJǉ9ǈɘƴ܎	ɒªƑ	ɯɰ	ɮ	\n\r c,5K?WG\r\rN/*	b`C\r!1bV4b9^bRDbS:J\\\"T7LP'+6\r0E\rU\r-3LN2\rX;\\bP\n\r<\r\x00\r\x00\rQ&\rBHY#\rF\rM.)L>N=$\r(L8aZb8\rAOLI%] @N_bI%[\r\x00cɯۀ	#ǇࠢǍǎ¬Ǡǯ9Ǐޏ	Ʋ[Ư°:ɗɔ\nӵƵշǨƻʣ	ɫƲĻƳÑ		ǈ \r	ɼ¸ɓɯȑƴ۹\x00ɓ	\nȝǈ 		\n´ɭњɫƴݳɫƴࣣ	ɫƲĔƵŉ	ƶǇѼǈǦüǇࢸ	ɫƹź\x00	ɔĴݻɯ̯ɖ	#ɮľǐǐ	ǐƲĹ	ƌŁʥز\nȶɮƲࢥɯƳ	ɫƸГ\r+.ƻ঩.ƶق:	ɫƲĻƳÑ	\rǇkƲ\x00Ƽ࠱Ư¶ɛƶˀ\nքǈ 		ǳ\x00Ưǲƴ˹\nख़ɚǳƵހƯơ	ǐɮƃǋɮhǐǳŰƯǲ	ǨƴǑ	عǈ 	\nΞɭٌ		ǐƲļ	Ǘ9Ǖ\rɫƲĔƳÑŮɗƲȧKy\rƲ,Gƶ̜ߓƲƯࡋƋ	+¹.1ϕ9Ń*ɔƥɸƴÚǓW\rƲࡔǯƼԠƲػǯǇōǈ 	Ǘ2Ǖ	ǽƲȚņʥ	ɜǳƵӠ	#ɮŃǐǐɰӄǱ\r\x00Ưࡗɰ¯ɫ(		ƥƯ࠙\x00	\nǽǈ \n	\nē(ǯƻΓ\nĕ	Ʋ[ƯJɖǨƺ߁ǨƻࢡǨƷ̏	ǐƲŇ	ةɯƳ	Đ*ƈ\x00ɪࢭƲ[ƯȩƗW	ǐƲĻ	ǈ 	#ǇईǇͅǒǟ	ɫƻ̘\n\rǇkƲ\x00ƼւƯ¶:թ	#ɮĿǐǐ+ƲƯƏɜɒɯȑƴƽ\x00ɒ	\nâ\rɰɱ\n	&	\r\n\x00\x00ĐɫƵࢻ\nǇáƲɫƵӝƼЭ\nƵğ	ǓWɗ`ǈ 	ɕǓ6ǒ6ǎǇॳ\nNɕɕ\n¸\nǐɮǈ 	ĴɗǨƴǑɗङɗɗɯॠ	ɱ¯ɫƻ˹\x00\x00	ɔɪ¥ɓɬ\rƯ࠾ɓɒ	ɯ̯ƴॶ\n´	ɯȒƴউƴӐ\rɫƲĔƳÑŮɗƲȧ\nē\nĕɓɪÅ\nâɬ`ǈ 			\nɱ\x00\r\x00\x00\x00\x00ɯȒ	¸\nǇkƲ\x00ƺޘ\n\n	´";}else{_$$T[6]="";}}else if(_$$3<76){if(_$$3===72){_$aY=_$kP.length;}else if(_$$3===73){ !_$aD?_$$f+=11:0;}else if(_$$3===74){_$eD.push("})(",'$_ts',".scj,",'$_ts',".aebi);");}else{_$aD=_$$g===undefined||_$$g==="";}}else{if(_$$3===76){ !_$aD?_$$f+=-46:0;}else if(_$$3===77){_$ct=_$gT();}else if(_$$3===78){_$aD= !_$jG;}else{_$eD.push(_$k$.substr(0,_$a1()%5));}}}else if(_$$3<96){if(_$$3<84){if(_$$3===80){_$k8(9,_$eD);}else if(_$$3===81){ !_$aD?_$$f+=1:0;}else if(_$$3===82){_$aD=_$kl<_$ct;}else{_$kD[_$$r]="_$"+_$_b[_$$T]+_$_b[_$kt];}}else if(_$$3<88){if(_$$3===84){_$ij=_$eD.join('');}else if(_$$3===85){_$eY.cp=_$$T;}else if(_$$3===86){return new _$cJ().getTime();}else{_$kl++ ;}}else if(_$$3<92){if(_$$3===88){_$$x(106);}else if(_$$3===89){_$$r++ ;}else if(_$$3===90){ !_$aD?_$$f+=2:0;}else{_$fk=_$eY.aebi=[];}}else{if(_$$3===92){return _$kD;}else if(_$$3===93){_$eY.scj=[];}else if(_$$3===94){_$e1.push(_$k8(7,_$gT()*55295+_$gT()));}else{ !_$aD?_$$f+=-78:0;}}}else{_$_r=_$gT()*55295+_$gT();}}}else ;}

function _$k8(_$eD,_$_r,_$kl){function _$j7(_$_b,_$kD){var _$$T,_$kt;_$$T=_$_b[0],_$kt=_$_b[1],_$kD.push("function ",_$aM[_$$T],"(){var ",_$aM[_$li],"=[",_$kt,"];Array.prototype.push.apply(",_$aM[_$li],",arguments);return ",_$aM[_$$_],".apply(this,",_$aM[_$li],");}");}function _$dx(_$_b,_$kD){var _$$T,_$kt,_$$r;_$$T=_$lj[_$_b],_$kt=_$$T.length,_$kt-=_$kt%2;for(_$$r=0;_$$r<_$kt;_$$r+=2)_$kD.push(_$e1[_$$T[_$$r]],_$aM[_$$T[_$$r+1]]);_$$T.length!=_$kt?_$kD.push(_$e1[_$$T[_$kt]]):0;}function _$i$(_$_b,_$kD,_$$T){var _$kt,_$$r,_$_n,_$ct;_$_n=_$kD-_$_b;if(_$_n==0)return;else if(_$_n==1)_$dx(_$_b,_$$T);else if(_$_n<=4){_$ct="if(",_$kD-- ;for(;_$_b<_$kD;_$_b++ )_$$T.push(_$ct,_$aM[_$$t],"===",_$_b,"){"),_$dx(_$_b,_$$T),_$ct="}else if(";_$$T.push("}else{"),_$dx(_$_b,_$$T),_$$T.push("}");}else{_$$r=0;for(_$kt=1;_$kt<7;_$kt++ )if(_$_n<=_$kz[_$kt]){_$$r=_$kz[_$kt-1];break;}_$ct="if(";for(;_$_b+_$$r<_$kD;_$_b+=_$$r)_$$T.push(_$ct,_$aM[_$$t],"<",_$_b+_$$r,"){"),_$i$(_$_b,_$_b+_$$r,_$$T),_$ct="}else if(";_$$T.push("}else{"),_$i$(_$_b,_$kD,_$$T),_$$T.push("}");}}function _$lf(_$_b,_$kD,_$$T){var _$kt,_$$r;_$kt=_$kD-_$_b,_$kt==1?_$dx(_$_b,_$$T):_$kt==2?(_$$T.push(_$aM[_$$t],"==",_$_b,"?"),_$dx(_$_b,_$$T),_$$T.push(":"),_$dx(_$_b+1,_$$T)):(_$$r= ~ ~((_$_b+_$kD)/2),_$$T.push(_$aM[_$$t],"<",_$$r,"?"),_$lf(_$_b,_$$r,_$$T),_$$T.push(":"),_$lf(_$$r,_$kD,_$$T));}var _$_b,_$kD,_$$T,_$kt,_$$r,_$dj,_$bJ,_$el,_$li,_$_3,_$$_,_$$t,_$$s,_$bX,_$$R,_$gN,_$_I,_$jL,_$lj;var _$ij,_$$J,_$k$=_$eD,_$$g=_$gg[2];while(1){_$$J=_$$g[_$k$++];if(_$$J<73){if(_$$J<64){if(_$$J<16){if(_$$J<4){if(_$$J===0){_$kD=0;}else if(_$$J===1){_$ij= !_$gN;}else if(_$$J===2){_$ij= !_$lj;}else{_$$T=_$_b.test(_$kD);}}else if(_$$J<8){if(_$$J===4){_$_b=_$gT();}else if(_$$J===5){_$ij=_$$T;}else if(_$$J===6){_$ij= !_$$r;}else{_$k$+=1;}}else if(_$$J<12){if(_$$J===8){_$kt=_$gT();}else if(_$$J===9){_$g1(_$kD,_$$T);}else if(_$$J===10){_$jL[_$kD]=_$k8(0);}else{_$kD=new _$it(_$_b);}}else{if(_$$J===12){_$_3=_$gT();}else if(_$$J===13){ !_$ij?_$k$+=-38:0;}else if(_$$J===14){_$ij= !_$kD;}else{_$kt=new RegExp('\x37\x34');}}}else if(_$$J<32){if(_$$J<20){if(_$$J===16){_$gN=_$_b;}else if(_$$J===17){return;}else if(_$$J===18){_$gN=_$k8(0);}else{_$kD++ ;}}else if(_$$J<24){if(_$$J===20){_$ij= !(_$$s+1);}else if(_$$J===21){_$_r.push(_$$T);}else if(_$$J===22){_$kD=_$k8(0);}else{ ++_$$T;}}else if(_$$J<28){if(_$$J===24){_$jG=0;}else if(_$$J===25){_$k$+=-5;}else if(_$$J===26){_$lj=[];}else{_$$s=_$gT();}}else{if(_$$J===28){_$eY.jf= !_$$T;}else if(_$$J===29){ !_$ij?_$k$+=7:0;}else if(_$$J===30){_$_b=[];}else{ !_$ij?_$k$+=25:0;}}}else if(_$$J<48){if(_$$J<36){if(_$$J===32){_$aR(0,_$kl,_$_r);}else if(_$$J===33){_$ij= !_$jL;}else if(_$$J===34){_$$r=_$gT();}else{_$dj=_$gT();}}else if(_$$J<40){if(_$$J===36){_$bX=_$k8(0);}else if(_$$J===37){for(_$$T=0;_$$T<_$_b;_$$T++ ){_$kD[_$$T]=_$gT();}}else if(_$$J===38){_$bJ=_$gT();}else{ !_$ij?_$k$+=0:0;}}else if(_$$J<44){if(_$$J===40){_$kP="\"ňfunction ā(ā){if(2){ā[0]=6;}ā[0]=6;ā[4]=3+1;ā[4]=2;ā[0]=6;}function ā){ā[0]=ā[ā(7,8)];if(3+1){ā[4]=2;}ā[0]=7+5;ā[0]=7+5;}function ā){if(3+1){ā){var ā=2;var ā=ā(1,8)];var ā=2-0;var ā=5;}function ā=7;var ā=2;if(ā(7,8)]){if(2){var ā=5;}}ā(4,8)],8)]=ā(3,8)];if(6){ā[4]=ā[4]=2;}}function ā(3,8)];var ā=3;var ā(7,8)]){if(2){ā[0]=6;}}}\x00)))))))\x00))	)\n)))\r)))))	)\n))))+*)\n,,)\n,,)+*)\n+)\n)\n)\n))))\n))))))))\n+*)\n )!";}else if(_$$J===41){return _$kD;}else if(_$$J===42){_$$r=_$kt.test(_$kD);}else{_$ij=_$kD<_$$r;}}else{if(_$$J===44){_$ij=_$kD<_$gN.length;}else if(_$$J===45){_$e1=_$k8(7,_$gT());}else if(_$$J===46){_$$T= --_$a1[1];}else{ !_$ij?_$k$+=3:0;}}}else{if(_$$J<52){if(_$$J===48){_$$T=_$$T.join('');}else if(_$$J===49){_$_b.push([_$gN[_$kD],_$gN[_$kD+1]]);}else if(_$$J===50){_$en(_$gN,_$a1);}else{_$$_=_$gT();}}else if(_$$J<56){if(_$$J===52){_$kD=_$_Q[_$_Q()]();}else if(_$$J===53){_$li=_$gT();}else if(_$$J===54){_$ij=_$kD<_$kt;}else{_$$t=_$gT();}}else if(_$$J<60){if(_$$J===56){_$_I=_$gT();}else if(_$$J===57){_$$R=_$k8(0);}else if(_$$J===58){_$kD+=2;}else{_$$T= --_$a1[0];}}else{if(_$$J===60){_$_b=new RegExp('\x5c\x53\x2b\x5c\x28\x5c\x29\x7b\x5c\x53\x2b\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x7d');}else if(_$$J===61){_$aY=_$kP.length;}else if(_$$J===62){_$_b=_$kP.substr(_$jG,_$_r);_$jG+=_$_r;return _$_b;}else{_$lj[_$kD]=_$k8(0);}}}}else{if(_$$J<68){if(_$$J===64){_$el=_$gT();}else if(_$$J===65){_$fk[_$_r]=_$$T;}else if(_$$J===66){_$$T=_$k8(0);}else{ !_$ij?_$k$+=13:0;}}else if(_$$J<72){if(_$$J===68){_$e1=_$e1.split(_$$o.fromCharCode(257));}else if(_$$J===69){_$jL=[];}else if(_$$J===70){_$en(_$jL,_$a1);}else{ !_$ij?_$k$+=1:0;}}else{_$$T=[];}}}else ;}
function _$aR(_$kt,_$kD,_$$T){var _$_b;var _$_n,_$_r,_$$r=_$kt,_$kl=_$gg[3];while(1){_$_r=_$kl[_$$r++];if(_$_r<43){if(_$_r<16){if(_$_r<4){if(_$_r===0){ !_$_n?_$$r+=28:0;}else if(_$_r===1){for(_$_b=1;_$_b<_$$R.length;_$_b++ ){_$kD.push(",",_$aM[_$$R[_$_b]]);}}else if(_$_r===2){ !_$_n?_$$r+=15:0;}else{ !_$_n?_$$r+=-21:0;}}else if(_$_r<8){if(_$_r===4){_$_n=_$lj.length;}else if(_$_r===5){_$_n=_$$T==0;}else if(_$_r===6){ !_$_n?_$$r+=4:0;}else{return;}}else if(_$_r<12){if(_$_r===8){_$kD.push("(function(",_$aM[_$hZ],",",_$aM[_$ax],"){var ",_$aM[_$bJ],"=0;");}else if(_$_r===9){_$_b++ ;}else if(_$_r===10){_$i$(0,_$_I,_$kD);}else{_$$r+=-9;}}else{if(_$_r===12){ !_$_n?_$$r+=11:0;}else if(_$_r===13){_$lf(_$_I,_$lj.length,_$kD);}else if(_$_r===14){_$kD.push("var ",_$aM[_$el],",",_$aM[_$$t],",",_$aM[_$dj],"=");}else{ !_$_n?_$$r+=3:0;}}}else if(_$_r<32){if(_$_r<20){if(_$_r===16){_$_n=_$bX.length;}else if(_$_r===17){_$kD.push("if(",_$aM[_$$t],"<",_$_I,"){");}else if(_$_r===18){_$kD.push(",",_$aM[_$bX[_$_b]]);}else{_$_n=_$$R.length;}}else if(_$_r<24){if(_$_r===20){_$_n=_$dj<0;}else if(_$_r===21){_$$r+=-5;}else if(_$_r===22){_$_n= !_$kD.length;}else{_$_n=_$_I<_$lj.length;}}else if(_$_r<28){if(_$_r===24){_$_n= !_$gN;}else if(_$_r===25){_$kD.push("var ",_$aM[_$$R[0]]);}else if(_$_r===26){_$_b=0;}else{_$kD.push("}");}}else{if(_$_r===28){_$kD.push(_$aM[_$bJ],",",_$aM[_$$s],"=",_$aM[_$ax],"[",_$$T,"];");}else if(_$_r===29){ !_$_n?_$$r+=0:0;}else if(_$_r===30){_$kD.push(";");}else{_$kD.push("}else ");}}}else{if(_$_r<36){if(_$_r===32){ !_$_n?_$$r+=6:0;}else if(_$_r===33){_$_n=_$kD.length==0;}else if(_$_r===34){ !_$_n?_$$r+=32:0;}else{ !_$_n?_$$r+=1:0;}}else if(_$_r<40){if(_$_r===36){ !_$_n?_$$r+=-22:0;}else if(_$_r===37){_$_n=_$_b<_$bX.length;}else if(_$_r===38){_$_n= !_$aM;}else{_$kD.push("function ",_$aM[_$_3],"(",_$aM[_$bJ]);}}else{if(_$_r===40){_$kD.push("){");}else if(_$_r===41){for(_$_b=0;_$_b<_$gN.length;_$_b++ ){_$j7(_$gN[_$_b],_$kD);}for(_$_b=0;_$_b<_$jL.length;_$_b++ ){_$g1(_$jL[_$_b],_$kD);}}else{_$kD.push("while(1){",_$aM[_$$t],"=",_$aM[_$$s],"[",_$aM[_$dj],"++];");}}}}else ;}}}}})([],[[2,5,11,7,9,4,6,1,0,8,10,3,],[62,12,34,15,65,21,83,11,66,73,0,8,68,27,22,19,55,38,50,16,36,89,53,26,92,48,86,48,25,60,17,9,61,28,77,96,23,81,6,43,78,44,77,42,82,64,94,87,37,14,44,29,63,77,42,82,54,79,33,87,56,5,30,88,18,91,93,70,72,10,58,4,71,2,59,47,35,57,13,76,3,20,7,85,67,31,32,80,74,84,51,95,46,41,48,75,81,48,39,90,40,1,45,49,69,48,24,52,48,48,],[4,11,14,39,37,41,17,62,17,40,61,24,4,45,68,22,72,9,48,21,17,35,38,64,53,12,51,55,27,20,31,50,56,66,65,8,69,0,54,47,10,19,25,33,39,70,34,26,0,43,47,63,19,25,2,67,36,57,18,30,0,44,47,49,58,25,16,1,13,32,17,60,52,3,5,29,46,15,42,6,71,23,7,59,28,17,],[5,34,8,33,0,41,19,15,25,1,30,22,29,14,38,12,16,32,26,37,15,18,9,21,40,24,36,28,4,2,42,20,6,11,39,33,3,17,10,31,23,35,13,30,27,7,],]);};


data = []


mouse_count = {
    "mousemove": 56,     // 鼠标移动直接记录次数
    "mousedown":1,       // 鼠标按下直接记录次数
    "click": 0,          // 鼠标点击直接记录次数
    "scroll": 9,         // 轮滑滑动直接记录次数
    "mouseup": 65,       // 时间间隔与鼠标松开除
}



for(let mouse of data){
    let xy;
    let name = 'lixia_' + mouse;
    if(memory.EventListener[name] == undefined || window[name] == undefined){continue}

    xy = window[name].shift();

    for(let i=0; i<memory.EventListener[name].length;i++){
        if(mouse_count[mouse] == 0){
            if(mouse == 'mousemove'){
                memory.EventListener[name][i](xy);
            }
            if(mouse == 'click'){
                memory.EventListener[name][i](xy);
            }
            if(mouse == 'mousedown'){
                memory.EventListener[name][i](xy);
            }
            if(mouse == 'mouseup'){
                memory.EventListener[name][i](xy);
            }
            if(mouse == 'dblclick'){
                memory.EventListener[name][i](xy);
            }
            break
        }
        memory.EventListener[name][i](xy);
    }
    if(mouse_count[mouse]){
        mouse_count[mouse] = mouse_count[mouse] - 1;
    }
}


// debugger
// l = new XMLHttpRequest();
// url = l.open('POST','/service/freshHouse/getHosueList.action',true);
// console.log(url);

add_url_search = function add_url_search(url) {
    let l = new XMLHttpRequest();
    let enurl = l.open('GET',url,true);
    return {'url':enurl,'cookies':document.cookie}
}
add_url_search_post = function (url,data) {
    let l = new XMLHttpRequest();
    let enurl = l.open('POST',url,true);
    let data_ = l.send(data)
    return {'url':enurl,'cookies':document.cookie,'data':data_}
}

memory.EventListener['lixia_load'][0]()
memory.EventListener['lixia_popstate'][0]()
memory.EventListener['lixia_error'][0]()
// console.log(add_url_search('/service/freshHouse/getHosueList.action'))
// console.log(add_url_search_post('/service/freshHouse/getHosueList.action','{"qw":3,"regNum":"19614609","pageNum":1,"pageSize":50,"orderByColumn":"0"}'))
