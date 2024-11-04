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

