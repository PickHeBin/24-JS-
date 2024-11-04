// all_content = "arg1_content"
all_content = "h9i3zdoEcOgtDXIE4s6qbZQiibMcz_Vida5baLHvfaRr4wCd7oMwAA"

delete __dirname
delete __filename


function get_enviroment(proxy_array) {
    for(var i=0; i<proxy_array.length; i++){
        handler = '{\n' +
            '    get: function(target, property, receiver) {\n' +
            '        console.log("方法:", "get  ", "对象:", ' +
            '"' + proxy_array[i] + '" ,' +
            '"  属性:", property, ' +
            '"  属性类型:", ' + 'typeof property, ' +
            // '"  属性值:", ' + 'target[property], ' +
            '"  属性值类型:", typeof target[property]);\n' +
             'if(typeof target[property] === "undefined"){debugger}' +
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
proxy_array = ['window', 'document', 'location', 'navigator', 'history','screen'];
is_logging = true //异步
function v_log(){
    if(is_logging){
        console.log(...arguments)
    }
};
null_function = function(){
    v_log("__args__", ...arguments)
}
meta = [
    {
        "charset": "utf-8",
    },
    {
        "http-equiv": "pragma",
        "content": "no-cache"
    },
    {
        "http-equiv": "Cache-Control",
        "content": "no-cache"
    },
    {
        "http-equiv": "X-UA-Compatible",
        "content": "IE=edge",
    },
    {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no",
    },
    {   // "conid"
        // "id": "38mBLGn9OaoI",
        "id": "conid",
        "content": all_content,
    },
    console.log("meta执行..." )
]
navigator = {
    appCodeName: "Mozilla",
    appName: "Netscape",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
    standalone: undefined,
    connection: {
        downlink: 6.1,
        effectiveType: "4g",
        onchange: null,
        rtt: 100,
        saveData: false,
    },
    platform: 'Win32',
    mozConnection: undefined,
    webkitConnection: undefined,
    battery: undefined,
    getBattery: undefined,
    webdriver: false
}
window = global;
window.top=window
window.addEventListener = null_function
window.attachEvent = null_function
window.HTMLFormElement = function(res){console.log("window.HTMLFormElement下的: ",res)}
setInterval = function () {
};
setTimeout = function () {
};
window.setInterval = setInterval;

let head = {
    removeChild: function (val) {
        // console.log('执行head中的removeChild方法', val)
        if (val == 'script') {
            return ''
        }
    },
};
let call = function () {};
div = {
    getElementsByTagName: function(res){
        console.log("当前执行document当中的getElementByTagName方法",res)
        if (res == 'i'){
            console.log("当前执行i值")
            return {}
        }
    }
}
let document = {
    cookie: '',
    createElement: function(res){
        console.log("当前执行document当中的createElement方法", res)
        if (res == "div"){
            return div
        }
        if (res == "form"){
            return '<form></form>>'
        }
        if (res == "input"){
            return '<input>'
        }
    },
    appendChild: function(res){
        console.log("当前执行document当中的createElement方法", res)
    },
    removeChild: function(res){
        console.log("当前执行document当中的removeChild方法", res)
    },
    getElementsByTagName: function(res){
        console.log("当前执行document当中的getElementsByTagName方法", res)
        if(res == 'script'){
            return ''
        }
        if(res == 'base'){
            return []
        }
        // if(res == 'meta'){
        //     return 'meta'
        // }
    },
    documentElement: function(res){console.log("当前执行document当中的documentElement方法", res)},
    getElementById: function(args) {
        if (args == "38mBLGn9OaoI") {
            console.log("document getElementById base if")
            return {
                getAttribute: function (args) {
                    console.log("return getAttribute in缺少：", args)
                    if (args == "r")
                        return "m"
                },
                content: all_content,
                parentNode: {
                    removeChild: function (args) {
                        console.log("func return removeChild in：", args)

                    }
                }

            }
        }
    },
    attachEvent: function (res){console.log("当前执行document当中的attachEvent方法", res)}

}
window.document = document;
window.innerHeight = 50
window.innerWidth = 1684
window.outerHeight = 1084
window.outerWidth = 1708
location = {
    "ancestorOrigins": {},
    "href": "https://autopp.tpi.cntaiping.com/web/home/index.html#/login",
    "origin": "https://autopp.tpi.cntaiping.com",
    "protocol": "https:",
    "host": "autopp.tpi.cntaiping.com",
    "hostname": "autopp.tpi.cntaiping.com",
    "port": "",
    "pathname": "/web/home/index.html",
    "search": "",
    "hash": "#/login"
}
window.top = window
window.XMLHttpRequest = function () {
};

get_enviroment(proxy_array)

'arg2_function'
$_ts=window['$_ts'];if(!$_ts)$_ts={};$_ts.nsd=83586;$_ts.cd="qtYErpAltqqqJal6rfQpqqq6rkQmmSlqqkQlJaqUlAqqtp3Eqqq6qOQklrl6qpLErrV6rpQWqOQqma7mqqq6rOQomSl6rrLxrcVoqc9KcOQqJAGqqkQDJaQUmGqqtp3hJaATcqqqJaE6qSqpJalFcGA3JaWUkqAqqkQDJa3UlAqqJaA6rpQpJaEFkqAFqqq6quQqmSl6rSQWrkqcmaakJalUkqE6rfZ.balCWAVmWsiMWTkKd33gD3DYDFiRo3Flw4Cb1susChgvGXD_zTrzBbA73HaCOVH7_ET6e08Sslv3JaqmrAQokMp0RKQjMCfjdPaDm2yZxsInwuYcHo3dJQeH8lfAWsWaLOwst0E2HYuqWnavxn7CW7R8hcwl1uYBu0ysJVmTsvH7RupfACY9YzSlEOe8UkQ.X1l7J2fFtnU3soJTMbRGszp6J0z7FsQ0e9pPQ2rbxs6qKkqNxnV.Jje8U19vA9fb.mwfVD30plOjFsR7YoZdszrDQ1QdUma6znlPtsA6KPBqWnavxn7CJ73BKuVNx1V.jOmwtYg6tnKyhulCKmL.xwTnhvae3mY04nTWpCfO1b6cWvfvYo32HQr3Wc9vx17C.Yywt1wWUU_P3b2FFopLAFxEVvTJWoqd6PToxueQUk86E1ENJYNFt42iF9z1QUyJ5OpJR2e51b._QKaaplrDxFm3KuVNx1V.jYywt1wsQ0.CwKJNVlr8p7xSpYZC1TldTVwoxueQUk86E1ENWmL.Ut7BEPQNWYL.akW7xnQ.Wmj6KkqNxnV.HZR8hcwsWVrK0DlTWvTBWY_jsOJSF2YO1IxPEOe8UkQ.X1l7JmfFtnUchUpJQlRcUjzDFCTe30NjTVm212Jqxs6qKkqNxnV.WZR8hcwS3Ke2CYYxYkqaIK4ywbxIAkRAQeRnEOe8UkQ.X1l7HmfF8PBTwbSNtYSQJ4wzwK2NtC2neCZ7F6r.FnBTwbSNKczQJ4w3KnwMtDR6ZPSawCN6Fos_MCRjwCLLwixGp6w93CELCmYn3opnMvU5R0Jz3Dp7xMw6QvrGK2L.eUR7F12NQbB6hCyaFKzFtZquhDzaFC7.eUR7F12NQbB6hCyaFKzFtZquhDzaFC7.eUR7F12NQbB6hCyaFKzFtZquhDzaFC7.eUR7F12NQbB6hCyaFKzFtZquhDzaFC7.eUR7F12NQbB6hCyaFKzFtZquhDzaFC7.eUR7F12NQbB6hCyaFKzFtZquhDzaFC7.eUR7F12NQbB6hCyaFKzFtZquhDzaFC7.eUR7F12NQbB6hCyaFKzFtZquhDzaFC7.eUR7F12NQbB6hCyaFKzFtZquhDzaFC7.eUR7F12NQbB6hCyaFKzFtZquhDzaFC7.eUR7F12NQbB6hCyaFKzFtZquhDzaFC7.eUR7F12NQbB6hCyaFKzFtZquhDzaFC7.amGPtnZ2t6HNwbY3KczQUh2wh6R6Q1fb4vwLt9wPFKheFbJ7RoY5pHpzwowjFCzP_1SawCSNQTk53VSj39yN3IAfhom6QbxFzTGPKnN0wUD03vYSM1fm3BYbRbSbMbRTg9rBF6mTFDB6RvEjwoxPw8xcMD2KQCf6uDx0RbTiFKo0E1SSw6xPK.w3E27jwoYSzDxTQK0LpKhTRbR7Rbybw8xqMCzSwKf.eCRntvpn3vUPAKY.3DmXRHxPQvSkMbzPX1e0w6rPKPBqEYgjwvYStHNCwD0jpKxNdbYNRbSbwU43MDySwCf.FdySh6RbRb2iebxv3cQ.Q6UXR20NUPYRtifSwPN9QvJBzlm2FCrfMbsn3vxZpbfNQ527MD2Gw1fC4bRnIlpO36U5QoJh3DxOpHJb3Cgvt6JT4bRwtYg2K1OLQU3jRoxuM4prRKzG3Ky9ZbxnIlRLFUHNMDSN3oVLwHNTRVrYwlYPeKRbMDRXRvUP1byOFPV.Q52CRYGNUcYRzornQnNbQvHuhlxGFCxfMBfj3UwZpDfN46mBFK2Pw1OZRvpo3D2PAIxGFKp6I2xTenl7QUwn32j6KcxMtvpTQMpPwUmztlYPeKRbMDRXRvUPADe.QUYLFdwbQPNC3bzP5owAw9wPFKheFbJ7RoY5sBY2M027woJmg9rLRDzG394dE1SSw6xPK.w3E27jwoYSzDxTQK0LpKhTRbR7Rbybw8xqMCzSwKf.eCRntbwPFKheFbJ7RDzk3XePFK9vt6JT4bRwtYg2K1OLQU3jRoxuM4prRKzG3Ky9ZbxnIlRLFUHNMDSN3oVLRIyzRYR9QKxreomkFvwPx1BBQUYGKmL.F8yBMmGNUkQ.eUR7F12NQbB6hCyaFK7.F8yBMmGNUkQ.eUR7F12NQbB6hCyaFK7.F8yBMmGNUkQ.eUR7F12NQbB6hCyaFK7.F8yBMmf3KG0D7CzN1bNWM6UiiDRhWVVCww2Ai03uV2mBZVypH9T73k4twbwAHbzCpHe73OxXHoed4bzBI6mrJChrQk7SsuR5YFyYFmJUQ6ZZ60zkpuwXpbhHWOp1HbWaRHxcpmr0w2pw5cT2HsQnWbsehKNCH92f3FSrM2mqI2wHjnT2HsQnWbsehKNCHb2qRJATY0eqQVyPenT2HsQnWbsehKNCH2rIVzpzYoYdH9zs61TjwOyJ3OU5MTN010S5JH3g8DS9RKeagTNCWDA6HkiXMTrbQvx0IZm2VOyksVrd4owPQmJd1OFTROG6Wkx93MYNQuyGRDri59fnRlerU9FTROG6Wkx93MYNQug.3OZT.ORO3nzzwknLiCTo1VrNHzpPM0a5RbTq6VNiFKmJI9vPqaqmrkQorjLkmDTSQ6w0LsEyWuACHO8NJkWdWsW0ryTbikQaWbAobkV6WAVJJO87JuQZJsW0JR7hJuqaJu3n.kWqmMNNhJpTeFfWeITYwhdhAyVmm4Ag0PhvlxUsqxn3qaVqqGqox6U4bLUu787wCB.XdHv66ziA_CxnxGNajHF.nC.LYbX3baL6HklnHu17WkQmrk3okFL0Ws0nWsVnjuEqh2wmplO.ibW63lNYRzrTFka.YCmpaKRiMl0TUVoxMlxTVYydwIq4KPzURY0obaWqrAA6raF7qsqnInzbRBGB3Kf6tCR6ZcefwbG.RvonhCx9MPz2RXZB3bS.tCYj_nePIuQ.RcBg3bENRbfjtdfuQc2bwoA.5orCtKmbQnBdMCaN3Kf9tde7360N3CfuzCwz3P2PFbX6RbeStKxd3.w2MDAN3Kz9zCY7Qn2fFDb6RKe.Q1zfFiZBRCmvtCrBecevMDW.3oC6FCSTtKe6w4w.wD3NMbpLzCNX3n2XFK_6FbyCtKy6R.wjQCLNMKRTzC2fQCA.MUI5RcSBwKq.M8GBFvRjF1z.Zbl7FKNGtCjB3PSLRoQ.FBxvhDf7FPzjZoV7FDNOtC.0w1SLwsA.FX76hDfTRPzj_CRvtKf63cBCQ6qNFopXtdpfFP2jRoZ.eDpvtKN.R1B0MCVNFvJftdpT312TRvA._Crfw1263CD6QCwLtUwXRhwuMDaNwCzX_oQ7wKzGt6I.MPSTwUA.w5z6hoYTQ6Z._6r9tUY5t6IP3cS0MDl.wXe4hopbFoqTz6mftUwbFPBN3vENwCxGt52bQn26FPzTevYPtUwu31BNwCTTtUp2F4waRv0NwDG._oYvtURaRPBLwD3Nwvy0t5ePQP2SRv0.4Cp_tUmX31BBFbROtUJLw82bMvlNQ6Jfz6wgQ12SwDi6wUJCtUm0QhwT8DlNQDRSz6p2R6V.QD._h6wLQnzaFHT2hoxj3KlTz6pawP2a3bUCh6fvFczdF5GB8D2CInzdebZ7IUYjt6dLMnSeInzet5mjQqVmraJ3BCpJrAm3ECHXqapFEKE6ryeQxDmdraVujaWcJuEorOFMqOlmrAQory7kqqVqWsQ6juWqqk00WO5zqTf8x6mbwMz.RKpf3vY0nownMDzGYohyx13OwCx0wdpzQCq.MCxbdCRnwPzfFoU83bJzh1eSRBwCR192MDx57PVbECTPRbH5QUJKQUYXFIaOtuG2MDx5XYgt";if($_ts.lcd)$_ts.lcd();

require("./cntaipingJsfile")

function get_cookie() {
    console.log(document.cookie)
    return  JSON.stringify(document.cookie)
}
console.log(get_cookie())
