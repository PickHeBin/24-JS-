const {JSDOM} = require('jsdom');
var xazxBase64 = require('js-base64').Base64;
const {isNaN} = global;
const DOM = new JSDOM('<!DOCTYPE html><p>hello wolrd</p>')

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
window = DOM.window;
document = window.document;
String = window.String;
navigator = window.navigator;
location = {
    "ancestorOrigins": {},
    "href": "https://qiye.obei.com.cn/web-zone/bwzy/procurement.html",
    "origin": "https://qiye.obei.com.cn",
    "protocol": "https:",
    "host": "qiye.obei.com.cn",
    "hostname": "qiye.obei.com.cn",
    "port": "",
    "pathname": "/web-zone/bwzy/procurement.html",
    "search": "",
    "hash": ""
}
Ha = String;
Win = window;
Docu = document;
clk = 'click';

get_enviroment(proxy_array)

var ipN = ['155', '160', '177', '179']
    , arrCookSet = ['61', '77', '85', '89', '91', '102', '106', '123', '127', '131', '132', '136', '138']
    , arrMouse = ['18', '25', '31', '129', '139', '143']
    , ipL = ['191', '199', '217', '228']
    , timeArr = ['3', '5', '8', '11', '12', '16', '17', '20', '28', '31']
    , arrCookOut = ['61', '77', '85', '89', '91', '102', '106', '123', '127', '131', '132', '136', '138']
    , j_con_id = ['J', 'C', '1', '1', '0', '1', '0']
    , conIdLoca = ['12', '13', '16', '27', '29', '38', '47']
    , UUUrrAtt = ['7', '55', '88', '100', '112', '116', '117', '120', '128', '131']
    , UUUpostAtt = ['3', '7', '10', '12', '15', '18', '20', '23', '35', '40']
    , coockieNameToken = "HKIIUU9O618PPTHPM"
    , twoNumname = "iusa88fgfccmr00rPP"
    , coockieNameUnique = "HKIIUU9O618PPTHKM"
    , link_state = 2
    , password_state = 2
    , ajax_state = 2
    , cookie_domain = ".obei.com.cn"
    , exception_domain = [];
var returnCitySN, reguLiu;
var ex, ey;
var asourceWP = 'Web';

function _$Yd(_0x6b3b3b) {
    var _0xc2fd22 = _0x6b3b3b == undefined ? 0x0 : _0x6b3b3b['length']
        ,
        _0x5c0d37 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        , _0x2fafff = _$Hj1['call']('0120123456789678912012345678901201234567896789120123456789', '')
        , _0x46bc4f = _0x5c0d37['concat'](_0x2fafff);
    _0x46bc4f = _$Ki(_0x46bc4f);
    _0x46bc4f = _0x46bc4f['slice'](0x0, _0xc2fd22);
    return _0x46bc4f;
}

function _$Fu(_0x4402e4, _0x4dbd43) {
    var _0x88fa27 = _$Yd(_0x4dbd43);
    _0x4402e4 = _$Hj1['call'](_0x4402e4, '');
    for (var _0x663160 = 0x0; _0x663160 < _0x4dbd43['length']; _0x663160++) {
        if ('SNDfr' !== 'SNDfr') {
            var _0x5c16fb = window['navigator']['hasOwnProperty']('webdriver');
            if (_0x5c16fb)
                return 'yes12';
        } else {
            _0x4402e4['splice'](_0x4dbd43[_0x663160], 0x0, _0x88fa27[_0x663160]);
        }
    }
    return _0x4402e4['join']('');
}

function _$j1(_0x28b6ed, _0x215789, _0x27ba55, _0x222d28, _0x5a606a, _0x3add1d, _0x170f51, _0x1e14bf, _0x426ec5) {
    _0x426ec5 = '';
    _0x170f51 = _0x170f51 == undefined ? 'aaaaa' : _0x170f51;
    var _0x29da29 = _$I6(coockieNameUnique);
    return xazxBase64['encode']('{\x22mousex\x22:\x22' + _0x28b6ed + '\x22,\x22mousey\x22:\x22' + _0x215789 + '\x22,\x22screenw\x22:\x22' + _0x27ba55 + '\x22,\x22screenh\x22:\x22' + _0x222d28 + '\x22,\x22noheader\x22:\x22' + _0x5a606a + '\x22,\x22nomal\x22:\x22' + _0x3add1d + '\x22,\x22ajax\x22:\x22' + _0x170f51 + '\x22,\x22now_unique\x22:\x22' + _0x29da29 + '\x22,\x22shebei\x22:\x22' + _0x1e14bf + '\x22,\x22navigator\x22:\x22' + _0x426ec5 + '\x22}');
};

function _$Q2() {
    var _0x4d27a8 = '';
    var _0x35c067 = 0x0;
    var _0x41790a = '';
    var _0x53ada9 = 0x0;
    var _0x17a998 = '';
    for (var _0x2363bb in window['navigator']) {
        _0x35c067++;
        _0x41790a = _0x35c067;
        _0x17a998 = '' + window['navigator'][_0x2363bb];
        _0x53ada9 = _0x17a998['toString']()['length'];
        if (_0x53ada9 <= 0x14) {
            _0x41790a = _0x17a998;
        }
        if (_0x4d27a8 == '') {
            _0x4d27a8 = _0x2363bb + '=' + _0x41790a;
        } else {
            _0x4d27a8 = _0x4d27a8 + ';' + _0x2363bb + '=' + _0x41790a;
        }
    }
    return _0x4d27a8;
};

function _$Xt() {
    var _0x4447f4 = {
        'w': '',
        'h': ''
    };
    _0x4447f4['w'] = window != window ? '10000' : Docu['compatMode'] == 'BackCompat' ? Docu['body'] == null ? window['screen']['availWidth'] : Docu['body']['clientWidth'] : Docu['documentElement']['clientWidth'];
    _0x4447f4['h'] = window != window ? '10000' : Docu['compatMode'] == 'BackCompat' ? Docu['body'] == null ? window['screen']['availHeight'] : Docu['body']['clientHeight'] : Docu['documentElement']['clientHeight'];
    return _0x4447f4;
};

function _$Hc() {
    var _0x4ae53e = []
        , _0x29183b = _$Xt();
    var _0x2211ed = _0x29183b['w'];
    var _0x10b928 = _0x29183b['h'];
    var _0x504d9a = ex == undefined ? '10000' : ex;
    var _0x127653 = ey == undefined ? '10000' : ey;
    var _0xc0eebd = _0x2211ed == undefined ? '10000' : _0x2211ed;
    var _0x3cd0d7 = _0x10b928 == undefined ? '10000' : _0x10b928;
    _0x4ae53e['push'](_0x504d9a, _0x127653, _0xc0eebd, _0x3cd0d7);
    return _0x4ae53e;
};

function _$m4(_0x55b16a) {
    _0x55b16a = _$Hj1['call'](_0x55b16a, '');
    for (var _0x5ef53f = 0x0; _0x5ef53f < conIdLoca['length']; _0x5ef53f++) {
        _0x55b16a[conIdLoca[_0x5ef53f]] = j_con_id[_0x5ef53f];
    }
    return _0x55b16a['join']('');
};

function _$Js(_0x5c4349, _0x10dedf) {
    _0x5c4349 = _$Hj1['call'](_0x5c4349, '');
    _0x10dedf = _$Hj1['call'](_0x10dedf, '.');
    for (var _0x5e9f16 = 0x0; _0x5e9f16 < _0x10dedf['length']; _0x5e9f16++) {
        var _0x39a5c0 = _$Hj1['call'](_0x10dedf[_0x5e9f16], '');
        _0x5c4349[ipN[_0x5e9f16]] = _0x39a5c0['length'];
        for (var _0x24389d = 0x0; _0x24389d < _0x39a5c0['length']; _0x24389d++) {
            var _0x4bbeb6 = parseInt(ipL[_0x5e9f16]) + _0x24389d;
            _0x5c4349[_0x4bbeb6] = _0x39a5c0[_0x24389d];
        }
    }
    return _0x5c4349['join']('');
};

function _$D9(_0x22db6f, _0x7952a) {
    var _0x2cb3e1 = _$Hj1['call'](_0x22db6f, '')
        , _0x5b7eec = _$Hj1['call'](_0x7952a['toString'](), '');
    for (var _0x34e3e4 = 0x0; _0x34e3e4 < arrCookSet['length']; _0x34e3e4++) {
        var _0x5cc43d = arrCookSet[_0x34e3e4];
        _0x2cb3e1[_0x5cc43d] = _0x5b7eec[_0x34e3e4];
    }
    return _0x2cb3e1['join']('');
};

function _$Hb(_0x1e2873, _0x4c8e67) {
    var _0x47ff03 = '';
    for (var _0x34ef5b = 0x0; _0x34ef5b < _0x4c8e67; _0x34ef5b++) {
        var _0x51a003 = _$Q8(_0x1e2873);
        _0x47ff03 += _0x1e2873[_0x51a003];
    }
    return _0x47ff03;
};

function _$Q8(_0x33879b) {
    return Math['floor'](Math['random']() * _0x33879b['length']);
};

function _$o7(_0xa48fba, _0x16b7fa) {
    for (var _0x5733a1 = 0x0; _0x5733a1 < _0x16b7fa['length']; _0x5733a1++) {
        var _0x15fdba = _$Q8(_0x16b7fa);
        _0xa48fba['splice'](_0x15fdba, 0x0, _0x16b7fa[_0x15fdba]);
    }
};

function _$Ki(_0xcd33be) {
    var _0x2d7ee7 = _0xcd33be['length'];
    for (var _0x586ca6 = 0x0; _0x586ca6 < _0x2d7ee7 - 0x1; _0x586ca6++) {
        var _0x1a4d14 = parseInt(Math['random']() * (_0x2d7ee7 - _0x586ca6));
        var _0x357076 = _0xcd33be[_0x1a4d14];
        _0xcd33be[_0x1a4d14] = _0xcd33be[_0x2d7ee7 - _0x586ca6 - 0x1];
        _0xcd33be[_0x2d7ee7 - _0x586ca6 - 0x1] = _0x357076;
    }
    return _0xcd33be;
};

function _$Uk(_0x37dbe3, _0x481f32) {
    var _0x59dcf5 = Math['floor'](Math['random']() * 0x64);
    var _0x35475b = [];
    for (var _0x9a0514 = 0x0; _0x9a0514 < _0x59dcf5; _0x9a0514++) {
        if ('NCTvq' !== 'aHeli') {
            var _0x12f909 = Math['floor'](Math['random']() * (_0x481f32 - _0x37dbe3 + 0x1) + _0x37dbe3);
            _0x35475b['push'](_0x12f909);
        } else {
            location['reload']();
        }
    }
    return _0x35475b;
};

function _$w2() {
    var _0xd7b8a5 = ['97-122&65-90', '48-57', '97-122&65-90&48-57&97-122']
        , _0x256351 = []
        , _0x356fa8 = [];
    for (var _0x85f7d1 = 0x0; _0x85f7d1 < _0xd7b8a5['length']; _0x85f7d1++) {
        if ('SUwwZ' === 'aIuTM') {
            return btoa(utob(u));
        } else {
            var _0x4fbeb3 = _$Hj1['call'](_0xd7b8a5[_0x85f7d1], '&');
            for (var _0x371484 = 0x0; _0x371484 < _0x4fbeb3['length']; _0x371484++) {
                var _0x46781f = _$Hj1['call'](_0x4fbeb3[_0x371484], '-');
                _0x256351['push'](_$Uk(parseInt(_0x46781f[0x0]), parseInt(_0x46781f[0x1])));
            }
        }
    }
    _0x356fa8['push'](_0x256351[0x0]['concat'](_0x256351[0x1]));
    _0x356fa8['push'](_0x256351[0x2]);
    _0x356fa8['push'](_0x256351[0x3]['concat'](_0x256351[0x4])['concat'](_0x256351[0x5])['concat'](_0x256351[0x6]));
    var _0x31600f = 0x0;
    for (var _0x1cd17b = 0x0; _0x1cd17b < _0x356fa8['length']; _0x1cd17b++) {
        _0x31600f += _0x356fa8[_0x1cd17b]['length'];
        _0x356fa8[_0x1cd17b] = String['fromCharCode']['apply'](null, _0x356fa8[_0x1cd17b]);
    }
    return _0x356fa8;
};

function _$Te(_0x28daab) {
    var _0x25b839 = _$w2();
    var _0x4c528d = ''
        , _0xdaa891 = _0x28daab
        , _0xa55121 = _$Hj1['call'](_0x25b839[0x0], '')
        , _0x2509b8 = _$Hj1['call'](_0x25b839[0x1], '')
        , _0x20a75e = _$Hj1['call'](_0x25b839[0x2], '');
    var _0x6f5e53 = _$Ki(_0xa55121)
        , _0x4acf00 = _0xa55121['join']('');
    _$o7(_0xa55121, _0x2509b8);
    _$o7(_0xa55121, _0x20a75e);
    _0x4c528d = _$Hb(_0xa55121, _0xdaa891);
    var _0xa55121 = new Date()['getTime']();
    _0x4c528d = _0xa55121 + _0x4c528d['substr'](_0xa55121['toString']()['length']);
    return _0x4c528d;
};

function _$Df(_0xca0a7f) {
    var _0x54f03f = _$Hj1['call'](_0xca0a7f, '')
        , _0x1a4ee5 = '';
    for (var _0x51c3bd = 0x0; _0x51c3bd < arrCookOut['length']; _0x51c3bd++) {
        var _0x3fb8fe = arrCookOut[_0x51c3bd];
        _0x1a4ee5 += _0x54f03f[_0x3fb8fe];
    }
    return _0x1a4ee5;
};

function _$e1(_0x59d214) {
    _0x59d214 = _$Hj1['call'](_0x59d214, '');
    var _0x58b11f = '';
    for (var _0x37a233 = 0x0; _0x37a233 < arrMouse['length']; _0x37a233++) {
        _0x58b11f += _0x59d214[arrMouse[_0x37a233]] == undefined ? '' : _0x59d214[arrMouse[_0x37a233]];
    }
    return _0x58b11f;
};
_$Hj1 = Ha['prototype']['split'];

function _$x2(_0x52adef) {
    var _0x23a81d = UUUrrAtt == undefined ? [] : UUUrrAtt;
    _0x52adef = _$Hj1['call'](_0x52adef, '');
    for (var _0x12c4ee = 0x0; _0x12c4ee < _0x23a81d['length']; _0x12c4ee++) {
        _0x52adef['splice'](parseInt(_0x23a81d[_0x12c4ee]) - _0x12c4ee, 0x1);
    }
    return _0x52adef['join']('');
};

function _$I6(_0x38d5b6) {
    var _0xd81c28 = '';
    if (window['plus'] && waf_port) {
        _0xd81c28 = window['plus']['navigator']['getCookie'](waf_port);
    } else {
        _0xd81c28 = Docu['cookie'];
    }
    var _0x3e1983 = encodeURIComponent(_0x38d5b6) + '=';
    var _0x9728c = _0xd81c28['indexOf'](_0x3e1983);
    var _0xc9c55d = '';
    if (_0x9728c > -0x1) {
        var _0x4f8aba = _0xd81c28['indexOf'](';', _0x9728c);
        if (_0x4f8aba == -0x1) {
            _0x4f8aba = _0xd81c28['length'];
        }
        _0xc9c55d = _0xd81c28['substring'](_0x9728c + _0x3e1983['length'], _0x4f8aba);
    }
    return _0xc9c55d;
};

function _$W6() {
    var _0x53edfb = _$I6(coockieNameToken);
    _0x53edfb = _$x2(_0x53edfb);
    _0x53edfb = xazxBase64['decode'](_0x53edfb);
    var _0xa5e451 = _$e1(_0x53edfb);
    _0x53edfb = _$Hj1['call'](_0x53edfb, _0xa5e451, 0x1)[0x0] == undefined ? '' : _$Hj1['call'](_0x53edfb, _0xa5e451, 0x1)[0x0];
    return _0x53edfb;
};

function _$Il(_0x2493a3) {
    var _0x126beb = _$W6();
    var _0x10fd0b = parseInt(_$Df(_0x126beb));
    var _0x42abb9 = parseInt(new Date()['getTime']());
    var _0x55ef5c = _$Te(_0x126beb['length']);
    var _0x4bfb07 = _$D9(_0x55ef5c, _0x42abb9);
    var _0x1580ef = returnCitySN == undefined ? '111.111.111.111' : returnCitySN['cip'];
    _0x4bfb07 = _$Js(_0x4bfb07, _0x1580ef);
    _0x4bfb07 = _$m4(_0x4bfb07);
    var _0x410ec7 = _$e1(_0x4bfb07);
    var _0x2fed10 = _$Hc();
    var _0x1b0941 = _$Q2();
    var _0x2548b8 = _0x2493a3 == undefined ? 'yes' : 'no';
    var _0x15bc88 = _$j1(_0x2fed10[0x0], _0x2fed10[0x1], _0x2fed10[0x2], _0x2fed10[0x3], reguLiu, _0x2548b8, undefined, asourceWP, _0x1b0941);
    if (_0x2493a3 == 'post') {
        _0x15bc88 = _$j1(_0x2fed10[0x0], _0x2fed10[0x1], _0x2fed10[0x2], _0x2fed10[0x3], reguLiu, 'yes', _0x6fb2('0x1d'), asourceWP, _0x1b0941);
    }
    var _0x311a9e = xazxBase64['encode'](_0x4bfb07 + _0x410ec7 + _0x15bc88);
    var _0x4269f6 = UUUrrAtt == undefined ? [] : UUUrrAtt;
    _0x311a9e = _$Fu(_0x311a9e, _0x4269f6);
    _0x311a9e = _0x311a9e['replace'](/=/g, '@');
    var _0x9d973c = coockieNameToken + '=' + _0x311a9e + ';path=/';
    if (cookie_domain !== '') {
        if ('dWzaG' !== 'WyMyW') {
            _0x9d973c = _0x9d973c + ';domain=' + cookie_domain;
        } else {
            return ![];
        }
    }
    if (window['plus'] && waf_port) {
        window['plus']['navigator']['setCookie'](waf_port, _0x9d973c);
    } else {
        Docu['cookie'] = _0x9d973c;
    }
}

_$I6(coockieNameUnique)
_$Il()
console.log(Docu['cookie'])



