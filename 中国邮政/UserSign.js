const cryptoJS = require('crypto-js')


function l(xxxx) {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
        , n = e.url || ""
        , t = e.key || "";
    delete e.url,
        delete e.key;
    var c = cryptoJS.HmacSHA256("".concat(n, "?json=").concat(JSON.stringify(e)), t)
        , a = cryptoJS.enc.Base64.stringify(c);
    return a
}

function get_newsign(xxxx) {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
        , n = e.url || ""
        , t = e.key || "";
    delete e.url,
        delete e.key;
    var c = cryptoJS.HmacSHA256("".concat(n, "?json=").concat(JSON.stringify(e)), t)
        , a = cryptoJS.enc.Base64.stringify(c);
    return a
}
// data = {
//     "value": [
//         {
//             "ip": "61.150.12.245",
//             "xpos": 206,
//             "capcode": "d114571313004181899060050193442620240320",
//             "mailStatus": "a",
//             "orderNum": [
//                 "9858638312956"
//             ],
//             "orderType": "1",
//             "appleFlag": None
//         }
//     ],
//     "list": [
//         "9858638312956"
//     ]
// }
// console.log(get_newsign(data))
