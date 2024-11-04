g = 'aes-128-cbc'
y = '0A234C4C639E015D'
b = 'E08247708934F42E'


var o = {};
o['vFCnA'] = 'utf8'
o['AtbgZ'] = 'base64'
o['BbaHW'] = function(t, e) {
    return t || e
}

function f(t, e, n) {
    var a = {
        "cipher": "AES",
        "key": 128,
        "iv": 16,
        "mode": "CBC",
        "type": "block",
        "module": {}
    };
    if (!a)
        throw new TypeError("invalid suite type");
    if ("string" == typeof e && (e = o.from(e)),
    e.length !== a.key / 8)
        throw new TypeError("invalid key length " + e.length);
    if ("string" == typeof n && (n = o.from(n)),
    "GCM" !== a.mode && n.length !== a.iv)
        throw new TypeError("invalid iv length " + n.length);
    return "stream" === a.type ? new s(a.module,e,n) : "auth" === a.type ? new i(a.module,e,n) : new c(a.module,e,n)
}

function _dynamicEncrypt(t, e, n) {
    var h = f(g, e, n)
        console.log(h)
    d = h['update'](t, a['vFCnA'], a['AtbgZ']);
    return d += h[c(659, 0, "uCJ]")](a['AtbgZ']),
    a['BbaHW'](d, "")['replace'](/\//g, "_")
}

var a = _dynamicEncrypt(o, b, y)["replace"]("_", "");
iv = a["substring"](1, 17)

