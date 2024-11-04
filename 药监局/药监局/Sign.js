var CryptoJs = require('crypto-js')

function md5(str) {

    return CryptoJs.MD5(str).toString()
}

function jsonMD5ToStr(_0x20954c) {
    var _0x4699d8 = {
        'rlhqt': '%21',
        'AphAs': '%28',
        'MDmYq': function(_0x291a56, _0x5dbbe1) {
            return _0x291a56(_0x5dbbe1);
        },
        'YvYLd': function(_0x40b163, _0x2aa002) {
            return _0x40b163 + _0x2aa002;
        },
        'WCdKH': '%7E'
    };
    var _0x4da70e = '5|3|1|2|0|6|4'['split']('|')
      , _0x253110 = 0x0;
    while (!![]) {
        switch (_0x4da70e[_0x253110++]) {
        case '0':
            _0x20954c = _0x20954c['replace'](new RegExp('\x5c)','gm'), '%29');
            continue;
        case '1':
            _0x20954c = _0x20954c['replace'](new RegExp('!','gm'), _0x4699d8['rlhqt']);
            continue;
        case '2':
            _0x20954c = _0x20954c['replace'](new RegExp('\x5c(','gm'), _0x4699d8['AphAs']);
            continue;
        case '3':
            _0x20954c = _0x4699d8['MDmYq'](encodeURIComponent, _0x20954c);
            continue;
        case '4':
            return md5(_0x20954c);
        case '5':
            _0x20954c = _0x20954c['concat'](_0x4699d8['YvYLd']('&', 'nmpasecret2020'));
            continue;
        case '6':
            _0x20954c = _0x20954c['replace'](new RegExp('~','gm'), _0x4699d8['WCdKH']);
            continue;
        }
        break;
    }
}
// params = {
//     "isSenior": "N",
//     "itemIds": "ff80808183cad75001840881f848179f",
//     "searchValue": "牛黄解毒片",
//     "timestamp": "1680244306000"
// }


function get_sign(str){
    return jsonMD5ToStr(str)
}
// console.log();
