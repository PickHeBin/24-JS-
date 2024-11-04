const { JSDOM } = require('jsdom');
const { window } = new JSDOM('<html><body></body></html>');
const $ = require('jquery')(window);
navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0"
}

eval(function(p, a, c, k, e, d) {
    e = function(c) {
        return (c < a ? "" : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
    }
    ;
    if (!''.replace(/^/, String)) {
        while (c--)
            d[e(c)] = k[c] || e(c);
        k = [function(e) {
            return d[e]
        }
        ];
        e = function() {
            return '\\w+'
        }
        ;
        c = 1;
    }
    ;while (c--)
        if (k[c])
            p = p.replace(new RegExp('\\b' + e(c) + '\\b','g'), k[c]);
    return p;
}('i n$=[\'\\q\\f\\a\\4\\k\\k\\3\\o\\p\\3\',\'\\q\\m\\4\\c\\B\\4\\o\\g\\m\\3\\6\',\'\\q\\w\\a\\4\\k\\k\\3\\o\\p\\3\\G\\7\\6\\b\'];$(n$[0])["\\g\\a\\7\\m"]();$(y(){F(y(){i 9={};i 8;i 5=A;i j=I["\\v\\g\\3\\6\\E\\p\\3\\o\\e"]["\\e\\7\\H\\7\\m\\3\\6\\w\\4\\g\\3"]();5=5*C;(8=j["\\b\\4\\e\\f\\a"](/D ([\\d.]+)/))?9["\\h\\3"]=8[l]:(8=j["\\b\\4\\e\\f\\a"](/J\\/([\\d.]+)/))?9["\\c\\h\\6\\3\\c\\7\\t"]=8[l]:(8=j["\\b\\4\\e\\f\\a"](/T\\/([\\d.]+)/))?9["\\f\\a\\6\\7\\b\\3"]=8[l]:(8=j["\\b\\4\\e\\f\\a"](/S.([\\d.]+)/))?9["\\7\\x\\3\\6\\4"]=8[l]:(8=j["\\b\\4\\e\\f\\a"](/R\\/([\\d.]+).*U/))?9["\\g\\4\\c\\4\\6\\h"]=8[l]:V;5=5+Q;r(9["\\h\\3"]||9["\\c\\h\\6\\3\\c\\7\\t"]||9["\\f\\a\\6\\7\\b\\3"]||9["\\7\\x\\3\\6\\4"]||9["\\g\\4\\c\\4\\6\\h"]){5=(5*L+K);r(5<s)5=5+z;i u=$(n$[1]);r(5>z)5=P["\\c\\k\\7\\7\\6"](5/s);u["\\O\\4\\k"](5);$(n$[2])["\\g\\v\\N\\b\\h\\e"]()}},M)});', 58, 58, '|||x65|x61|x08c924|x72|x6f|x0fcad9|x06dd1a|x68|x6d|x66||x74|x63|x73|x69|var|x01c264|x6c|0x1|x77|_|x6e|x67|x23|if|0x7b|x78|x0b515d|x75|x43|x70|function|0x929|0x34|x5f|0x0b|msie|x41|setTimeout|x46|x4c|navigator|firefox|0x7|0x3|0x3e8|x62|x76|Math|0x2c|version|opera|chrome|safari|0x0'.split('|'), 0, {}))
