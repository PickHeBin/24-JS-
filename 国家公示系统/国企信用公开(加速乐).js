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


window = global;


navigator = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
}

get_enviroment(proxy_array)

var _0x52c8 = ['R2JCVw==', 'w7xxwoFE', 'w7JQwoE=', 'GkZKNg==', 'LxHDm10=', 'CBjCghI=', 'bDXCl8KC', 'dQ/CkcKE', 'EMOpw5c0', 'wpNHRcO2', 'wrZDw7/CpA==', 'wqrDpsObwrw=', 'BMKnYlU=', 'w6pawoJz', 'w7powpZN', 'DBHCsMOC', 'woPCpcO7wrM=', 'wqnCkMOEwoI=', 'w5NsD8KN', 'wpDCkQvDtA==', 'TRVvVg==', 'M1hVKQ==', 'KsO4worCog==', 'w5AfQMOc', 'LcOYw7AI', 'w5M5Y1c=', 'wpFzLcKc', 'w6HDvAoR', 'wrt1d8O0', 'E8K8YkI=', 'wqPCmirDqg==', 'EMOkwo7CuA==', 'wrLCjiDCtQ==', '6K685rCz6amz6Kyg', 'BcOFw4g4', 'wppRDsKL', 'QAXDgyU=', 'XicwQw==', 'OcO1w5A2', 'w597c24=', 'ZzpMbQ==', 'wooEFcKh', 'N8O8wq3Cow==', 'VAXCiVM=', 'w6pnwp1X', 'DsOJUEc=', 'AMOYw4g+', 'K8O4wow6', 'AcK+SG4=', 'OktIFg==', 'fzFuYg==', 'w4nDpMKrw64=', 'woViw43Cuw==', 'w6bCg8Kbw4o=', 'wrBQDsKL', 'wrtycsOj', 'LgDCthM=', 'UwPDuD8=', 'fHXDuMKD', 'w4LCg8KPw4o=', 'wq1Aw7bCiw==', 'aCjCosKN', 'wqw7w5PCqg==', 'wqMHOcK/', 'w4IBcmQ=', 'FMO4wpQZ', 'w4c7YQ==', 'ZjDCncKm', 'IsOrwqPCnw==', 'wr1VMsKN', 'w5dpwpnCig==', 'VcOJU8O1', 'MwjCtsOf', 'wrfDoS4q', 'LzXCuMK2', 'SDdTUA==', 'JCvCoT4=', 'I8OFwosA', 'wqDCgsO7wqQ=', 'wrPCph/CkQ==', 'eRFvRg==', 'wrMow6rChg==', 'U0NXfQ==', 'OxvCtcOR', 'LQvCtsKA', 'T1t8WQ==', 'JSzDgH8=', 'wozDv8OFwo0=', 'w5JPd3U=', 'fxt9dw==', 'wqPCtgXDiA==', 'ezN6dw==', 'a8KXPsK4', 'w4RrcEU=', 'w7PDksKXw6c=', 'cDbDnzs=', 'w4o3woY7', 'WxZuwrQ=', 'GCrChy8=', 'KBnCnsKT', 'XCcteg==', 'CDbCkDI=', 'w5DDncOhMg==', 'C8KpSWQ=', 'woHDon/CmA==', 'woHDusO5wos=', 'K8OFwqjCiA==', 'JsKLXlY=', 'IsKuWcOu', 'DMOmwocI', 'w5TCmxVA', 'w7lbYno=', 'B25mJg==', 'wr/CoxdS', 'w4sGC8KM', 'NsKQS8OQ', 'wo0YVsKV', 'dDJuSw==', 'wrpRK8KA', 'BcOCw4Yh', 'Uw3CtcKo', 'wp1ow5zCtw==', 'Fig6fw==', 'wofDn2LCgA==', 'GwsBJw==', 'woEICcK2', 'ZsK4PsK/', 'w6kwdXs=', 'wrbCrsO/Rg==', 'ZCNgbw==', 'XcKyLsK7', 'wqBRw6nCsA==', 'wo1FecOc', 'A8OIeEE=', 'KT3Dk3k=', 'OcKRT8Ov', 'w4BDWsKS', 'aBFXYQ==', 'LxfCs8OF', 'Mx9PPQ==', 'wolxB8K+', 'woVpRsOU', 'EsOgwq4r', 'w4XDtsKew7Y=', 'OjvCs8On', 'D8OramE=', 'w5HDqx0k', 'B3dOwp8=', 'XXfCtTo=', 'Clpfwqc=', 'f3Bweg==', 'w4kdwoQM', 'w5vClsKPw7g=', 'wogADcKv', 'wrg5w6TCnw==', 'w75dwp1i', 'RcOrX8Oh', 'PBHDm0E=', 'PsO0w5Ii', 'wqXCt8O4wrg=', 'AMObwoU1', 'wptycsOj', 'UsOBQsOK', 'w4DCusKTw6w=', 'P8O5wok9', 'CD3DvXg=', 'AQfCqcKq', 'wrpuCcKL', 'VBl7aA==', 'wptWfsOJ', 'YxrClsKs', 'JjlQUA==', 'wqvCncOLSA==', 'w7PDmsKKw6A=', 'wpDCmyjDlQ==', 'wrrCvDrDnw==', 'woUUw4nCgg==', 'w4UwZX8=', 'wox7w4nDjQ==', 'wrLDlSYd', 'AMKtU2w=', 'KMOKw6AC', 'ajTCncK7', 'IcK1UMOU', 'wp3CqzDCiA==', 'UTQ0Sg==', 'CB7Cm8KE', 'NcKIX8KU', 'bhEbag==', 'Uj7DjA8=', 'f0zDrcKF', 'HFhwOg==', 'wqbDpcORwrk=', 'w7tTREA=', 'w5lgwohm', 'dAYOYA==', 'BBfCl8O8', 'ckHChDk=', 'wqbCmcOBwo4=', 'w43Cs8Kfw7s=', 'YsOre8K1', 'KnpVwqY=', 'OHlSKw==', 'BVVmwpc=', 'w7Fawo5w', 'w60Mwq8k', 'bwFBXA==', 'woBKCMKd', 'wrbCnAzDmw==', 'NcKRS8Ox', 'JMK3ecKQ', 'w6AidXU=', 'woLCisOxbw==', 'HcKZWsKT', 'w4/CkxDCmw==', 'wp1+fMO4', 'IkYGTA==', 'ei7DtiI=', 'w7DDhsKmw6c=', 'w7BKZF0=', 'agfCqsKi', 'FAfClMOs', 'bDzDuy8=', 'BsKIX8KI', 'dw7Dugo=', 'BsKKbcO2', 'woEAD8Kp', 'CcK0U1Q=', 'w4/DiBol', 'A8KSUcKX', 'KcOHwrYA', 'B8KETMKT', 'VSTChMKn', 'wrY2w4XClg==', 'UMOWwpUv', 'HjDDiVw=', 'I8OHw6AU', 'UUPDo8KW', 'wq4iTMKJ', 'HMOEw5YV', 'I8O8wpbChg==', 'Qj4gcA==', 'ZQcbag==', 'wo9gw43Cgg==', 'wqTCpTPDhA==', 'w5QqTMKe', 'wpLCrB7Cjg==', 'wooPGcKM', 'TgXCnsK6', 'wp/CjTTCuw==', 'WBd9ZA==', 'woPCsMOHwrk=', 'FsKQUsKT', 'w4zCl8K5w7s=', 'wq9/w6bCsg==', 'dRfCpMKA', 'aHHDrcKe', 'e8KZJMKH', 'wo/CpMO1VA==', 'w4gxTXk=', 'wpnDvcOmwoM=', 'BWlFJg==', 'wpd3w5vCsg==', 'wrfDgGrCjA==', 'OFpJHA==', 'wobDgcOCwo0=', 'w4sWccKv', 'B3x3MQ==', 'wr7Cm8O1Yg==', 'FMOJQGQ=', 'IgTCvsKK', 'wo3CvR3CqQ==', 'dz5CRQ==', 'wqzDq0DCpg==', 'TFtHew==', 'w4NDW8Od', 'GsOTVGU=', 'M8O4w6TChQ==', 'w5vDt8KKw5s=', 'DUZmwoI=', 'aMK3LMKu', 'woMJbMKH', 'Cl1Vwr8=', 'C8KJd8KO', 'w6wvaWE=', 'CBnCnsKT', 'wqJGw6jCng==', 'PzHDnEc=', 'ey3Cig==', 'w4VQwohx', 'ekTCg8OR', 'w4hGYEw=', 'J21aAg==', 'RQfDjg==', 'QCrClsKZ', 'wrbCksOKcA==', 'PMKpacKw', 'wo3DmGHCjg==', 'w49qwpZE', 'w4kTd18=', 'HmphMA==', 'w4DDgA4N', 'wqNqw6I=', 'dlvDom4=', 'MEx2Dw==', 'wprDssOpwqk=', 'wqoBw4DCiQ==', 'wpZiZ8OG', 'w53CvMKkwqg=', 'f0TDicOW', 'ek/Clwk=', 'GMOYbHg=', 'w7bDgcKh', 'JMKHW8KU', 'McOmw5IG', 'wrnCkifDqg==', 'JQfCpik=', 'wrfCthDCkQ=='];
(function (_0x2162b6, _0x52c826) {
    var _0x5316f8 = function (_0x48c937) {
        while (--_0x48c937) {
            _0x2162b6['push'](_0x2162b6['shift']());
        }
    };
    _0x5316f8(++_0x52c826);
}(_0x52c8, 0xf0));
var _0x5316 = function (_0x2162b6, _0x52c826) {
    _0x2162b6 = _0x2162b6 - 0x0;
    var _0x5316f8 = _0x52c8[_0x2162b6];
    if (_0x5316['uZJRSJ'] === undefined) {
        (function () {
            var _0x3b7488;
            try {
                var _0x22106b = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');');
                _0x3b7488 = _0x22106b();
            } catch (_0x2ade72) {
                _0x3b7488 = window;
            }
            var _0x2410ee = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0x3b7488['atob'] || (_0x3b7488['atob'] = function (_0x1f7020) {
                    var _0x47c7cc = String(_0x1f7020)['replace'](/=+$/, '');
                    var _0x2c3a03 = '';
                    for (var _0x3080bc = 0x0, _0x3b60a7, _0x42b3a9, _0x40cb90 = 0x0; _0x42b3a9 = _0x47c7cc['charAt'](_0x40cb90++); ~_0x42b3a9 && (_0x3b60a7 = _0x3080bc % 0x4 ? _0x3b60a7 * 0x40 + _0x42b3a9 : _0x42b3a9,
                    _0x3080bc++ % 0x4) ? _0x2c3a03 += String['fromCharCode'](0xff & _0x3b60a7 >> (-0x2 * _0x3080bc & 0x6)) : 0x0) {
                        _0x42b3a9 = _0x2410ee['indexOf'](_0x42b3a9);
                    }
                    return _0x2c3a03;
                }
            );
        }());
        var _0x57b53a = function (_0x1a67f5, _0x51f6ce) {
            var _0x419c52 = [], _0x38f9e7 = 0x0, _0x3dbe91, _0x5548a0 = '', _0xa594e3 = '';
            _0x1a67f5 = atob(_0x1a67f5);
            for (var _0x5b2e71 = 0x0, _0x8e7de1 = _0x1a67f5['length']; _0x5b2e71 < _0x8e7de1; _0x5b2e71++) {
                _0xa594e3 += '%' + ('00' + _0x1a67f5['charCodeAt'](_0x5b2e71)['toString'](0x10))['slice'](-0x2);
            }
            _0x1a67f5 = decodeURIComponent(_0xa594e3);
            var _0x426887;
            for (_0x426887 = 0x0; _0x426887 < 0x100; _0x426887++) {
                _0x419c52[_0x426887] = _0x426887;
            }
            for (_0x426887 = 0x0; _0x426887 < 0x100; _0x426887++) {
                _0x38f9e7 = (_0x38f9e7 + _0x419c52[_0x426887] + _0x51f6ce['charCodeAt'](_0x426887 % _0x51f6ce['length'])) % 0x100;
                _0x3dbe91 = _0x419c52[_0x426887];
                _0x419c52[_0x426887] = _0x419c52[_0x38f9e7];
                _0x419c52[_0x38f9e7] = _0x3dbe91;
            }
            _0x426887 = 0x0;
            _0x38f9e7 = 0x0;
            for (var _0x330fdc = 0x0; _0x330fdc < _0x1a67f5['length']; _0x330fdc++) {
                _0x426887 = (_0x426887 + 0x1) % 0x100;
                _0x38f9e7 = (_0x38f9e7 + _0x419c52[_0x426887]) % 0x100;
                _0x3dbe91 = _0x419c52[_0x426887];
                _0x419c52[_0x426887] = _0x419c52[_0x38f9e7];
                _0x419c52[_0x38f9e7] = _0x3dbe91;
                _0x5548a0 += String['fromCharCode'](_0x1a67f5['charCodeAt'](_0x330fdc) ^ _0x419c52[(_0x419c52[_0x426887] + _0x419c52[_0x38f9e7]) % 0x100]);
            }
            return _0x5548a0;
        };
        _0x5316['rABIeA'] = _0x57b53a;
        _0x5316['mGZRrz'] = {};
        _0x5316['uZJRSJ'] = !![];
    }
    var _0x48c937 = _0x5316['mGZRrz'][_0x2162b6];
    if (_0x48c937 === undefined) {
        if (_0x5316['fHLEJX'] === undefined) {
            _0x5316['fHLEJX'] = !![];
        }
        _0x5316f8 = _0x5316['rABIeA'](_0x5316f8, _0x52c826);
        _0x5316['mGZRrz'][_0x2162b6] = _0x5316f8;
    } else {
        _0x5316f8 = _0x48c937;
    }
    return _0x5316f8;
};

var cryptojs = require('crypto-js')
// sha256
hash1 = {
    'sha1': function (aaa) {
        return cryptojs.SHA1(aaa).toString()
    },
    'md5': function (aaa) {
        return cryptojs.MD5(aaa).toString()
    },
    'sha256': function (aaa) {
        return cryptojs.SHA256(aaa).toString()
    },
}

function go(_0x4fb57f) {

    _0x4fb57f = JSON.parse(_0x4fb57f)
    if (_0x4fb57f['ha'] === 'sha1') {
        hash = hash1['sha1']
    }
    ;
    if (_0x4fb57f['ha'] === 'md5') {
        hash = hash1['md5']
    }
    ;
    if (_0x4fb57f['ha'] === 'sha256') {
        hash = hash1['sha256']
    }
    ;
    var _0x22b798 = {};
    _0x22b798[_0x5316('0x82', 'frfB') + 'S'] = _0x5316('0x109', '!Jvk') + _0x5316('0x30', 'TtD3');
    _0x22b798[_0x5316('0xfd', 'Taax') + 'F'] = function (_0x464060, _0xa1e0f0) {
        return _0x464060 < _0xa1e0f0;
    }
    ;
    _0x22b798[_0x5316('0x15', 'f9%]') + 'C'] = function (_0x4e72e0, _0x30bf84) {
        return _0x4e72e0 < _0x30bf84;
    }
    ;
    _0x22b798[_0x5316('0x6b', '3qMw') + 'c'] = function (_0x350e7d, _0x3ec867) {
        return _0x350e7d + _0x3ec867;
    }
    ;
    _0x22b798[_0x5316('0x6d', 'POzn') + 'g'] = function (_0x5f1139, _0x522714) {
        return _0x5f1139 == _0x522714;
    }
    ;
    _0x22b798[_0x5316('0x12b', 'I!Sz') + 'H'] = function (_0x5439db, _0x36f7bb) {
        return _0x5439db(_0x36f7bb);
    }
    ;
    _0x22b798[_0x5316('0x9a', 'hMyS') + 'X'] = function (_0x457fce, _0x12182f) {
        return _0x457fce ^ _0x12182f;
    }
    ;
    _0x22b798[_0x5316('0x10e', '0dwj') + 'L'] = function (_0x9677a0, _0x5ad74f) {
        return _0x9677a0 ^ _0x5ad74f;
    }
    ;
    _0x22b798[_0x5316('0x92', 'POzn') + 'E'] = function (_0x3eef4a, _0x438ee3) {
        return _0x3eef4a + _0x438ee3;
    }
    ;
    _0x22b798[_0x5316('0xdb', 'Z5(Z') + 'D'] = function (_0x4372ba, _0x17d41d) {
        return _0x4372ba === _0x17d41d;
    }
    ;
    _0x22b798[_0x5316('0xc3', 'mmS5') + 'y'] = _0x5316('0xb3', 'TDao') + _0x5316('0x64', 'POzn') + _0x5316('0x25', 'POzn') + _0x5316('0x100', 'frfB') + _0x5316('0x60', 'v%Yc') + _0x5316('0x48', 'ghT$');
    _0x22b798[_0x5316('0xa8', 'Taax') + 'y'] = function (_0x19ea4d, _0x85ed38, _0x1312e0) {
        return _0x19ea4d(_0x85ed38, _0x1312e0);
    }
    ;
    _0x22b798[_0x5316('0xc7', '&*4)') + 'P'] = function (_0x8cc660, _0xba0be1) {
        return _0x8cc660 === _0xba0be1;
    }
    ;
    _0x22b798[_0x5316('0x95', '&CvH') + 'o'] = _0x5316('0x12c', '8pO%') + 'F';
    _0x22b798[_0x5316('0x66', 'r33o') + 't'] = function (_0x3f6e58, _0x6d43a0) {
        return _0x3f6e58 > _0x6d43a0;
    }
    ;
    _0x22b798[_0x5316('0xa0', 'G5bB') + 'H'] = function (_0x5f4231, _0x259f17) {
        return _0x5f4231 - _0x259f17;
    }
    ;
    _0x22b798[_0x5316('0x39', 'It(^') + 'q'] = function (_0x10ee3c, _0x47a6b8) {
        return _0x10ee3c(_0x47a6b8);
    }
    ;
    _0x22b798[_0x5316('0xe', '&*4)') + 'l'] = _0x5316('0x6f', 'K7y4') + '失败';
    var _0x3b09a4 = _0x22b798;

    function _0x36dd89() {
        var _0x50509b = window[_0x5316('0x72', '8pO%') + _0x5316('0x130', 'CtQq') + 'r'][_0x5316('0x1b', 'f9%]') + _0x5316('0x49', '!Jvk') + 't']
            , _0x323ed2 = [_0x3b09a4[_0x5316('0xc1', 'r([O') + 'S']];
        for (var _0x47bc7d = 0x0; _0x3b09a4[_0x5316('0x3b', '3z1c') + 'F'](_0x47bc7d, _0x323ed2[_0x5316('0x5b', 'g33y') + 'th']); _0x47bc7d++) {
            if (_0x50509b[_0x5316('0x71', 'v%Yc') + _0x5316('0x3e', '&*4)')](_0x323ed2[_0x47bc7d]) != -0x1) {
                return !![];
            }
        }
        if (window[_0x5316('0x122', 'Y8&4') + _0x5316('0xeb', 'VOm&') + _0x5316('0x50', 'g33y')] || window[_0x5316('0x1c', 'Y8&4') + _0x5316('0x18', 'hkJX')] || window[_0x5316('0x13a', 'r33o') + _0x5316('0x3c', 'f9%]')] || window[_0x5316('0xe2', 'TDao') + _0x5316('0x88', 'UUi]') + 'r'][_0x5316('0x11a', 'g33y') + _0x5316('0xf0', '&CvH') + 'r'] || window[_0x5316('0xe7', 'CtQq') + _0x5316('0x102', '3qMw') + 'r'][_0x5316('0x110', 'g33y') + _0x5316('0xd5', 'r([O') + _0x5316('0x33', 'oL10') + _0x5316('0x3', 'frfB') + 'e'] || window[_0x5316('0x72', '8pO%') + _0x5316('0x22', 'G5bB') + 'r'][_0x5316('0x74', 'aWNj') + _0x5316('0x135', '!Jvk') + _0x5316('0x8a', '&*4)') + _0x5316('0x11f', 'r([O') + _0x5316('0xbe', 'f9%]')]) {
            return !![];
        }
    }
    ;
    if (_0x36dd89()) {
        return;
    }
    var _0x874580 = new Date();

    function _0x20b24b(_0x5170c7, _0x31f3bb) {
        var _0xddfcf1 = _0x4fb57f[_0x5316('0x12d', '!Jvk') + 's'][_0x5316('0x7f', 'hkJX') + 'th'];
        for (var _0x2104c5 = 0x0; _0x3b09a4[_0x5316('0xdf', 'lwVa') + 'F'](_0x2104c5, _0xddfcf1); _0x2104c5++) {
            for (var _0x177b71 = 0x0; _0x3b09a4[_0x5316('0x13d', 'r33o') + 'C'](_0x177b71, _0xddfcf1); _0x177b71++) {
                var _0x1e8319 = _0x3b09a4[_0x5316('0x97', '9s[1') + 'c'](_0x3b09a4[_0x5316('0x87', 'nx&H') + 'c'](_0x31f3bb[0x0], _0x4fb57f[_0x5316('0xef', 'BRAq') + 's'][_0x5316('0x128', 'ghT$') + 'tr'](_0x2104c5, 0x1)) + _0x4fb57f[_0x5316('0xb1', 'K7y4') + 's'][_0x5316('0x11d', 'v%Yc') + 'tr'](_0x177b71, 0x1), _0x31f3bb[0x1]);
                if (_0x3b09a4[_0x5316('0x37', 'Y8&4') + 'g'](_0x3b09a4[_0x5316('0x114', '&G3c') + 'H'](hash, _0x1e8319), _0x5170c7)) {
                    return [_0x1e8319, new Date() - _0x874580];
                }
            }
        }
    }
    ;var _0x448c81 = _0x3b09a4[_0x5316('0x125', 'Z5(Z') + 'y'](_0x20b24b, _0x4fb57f['ct'], _0x4fb57f[_0x5316('0x35', 'nx&H')]);

    var _0xb3b57b;
    if (_0x4fb57f['wt']) {
        if (_0x3b09a4[_0x5316('0x62', 'v(9)') + 'P'](_0x3b09a4[_0x5316('0x67', '3z1c') + 'o'], _0x5316('0xac', 'ghT$') + 'r')) {
            return _0x3b09a4[_0x5316('0xa1', 'I!Sz') + 'X'](_0x3b09a4[_0x5316('0xe3', ')^S9') + 'L'](S(x, 0x2), S(x, 0xd)), S(x, 0x16));
        } else {
            _0xb3b57b = _0x3b09a4[_0x5316('0x121', '3z1c') + 't'](_0x3b09a4[_0x5316('0x46', 'TDao') + 'H'](parseInt, _0x4fb57f['wt']), _0x448c81[0x1]) ? _0x3b09a4[_0x5316('0x123', '!Jvk') + 'H'](_0x3b09a4[_0x5316('0x39', 'It(^') + 'q'](parseInt, _0x4fb57f['wt']), _0x448c81[0x1]) : 0x1f4;
        }
    } else {
        _0xb3b57b = 0x5dc;
    }


    var _0x5b3752 = _0x3b09a4[_0x5316('0x104', 'TtD3') + 'E'](_0x4fb57f['tn'] + '=' + _0x448c81[0x0] + (_0x5316('0x124', 'APy2') + _0x5316('0xf9', 'v(9)') + '=') + _0x4fb57f['vt'], _0x5316('0x65', 'Z5(Z') + _0x5316('0x126', 'hkJX') + '\x20/');
    if (_0x4fb57f['is']) {
        if (_0x3b09a4[_0x5316('0x96', 'I!Sz') + 'D'](_0x5316('0x47', 'lwVa') + 'T', _0x5316('0x57', 'Z5(Z') + 'T')) {
            _0x5b3752 = _0x3b09a4[_0x5316('0x59', '0dwj') + 'E'](_0x5b3752, _0x3b09a4[_0x5316('0x136', 'TtD3') + 'y']);
        } else {
            return !![];
        }
    }
    return _0x5b3752
}

aaa = go('{"bts":["1709130143.073|0|gIR","UaPUHdRFMJ620hUIMKJJCU%3D"],"chars":"LtwsmXmPgylStBnrEcThWh","ct":"e9ad9f87ded5eeaaf632152e257f58418e32bbc0","ha":"sha1","is":true,"tn":"__jsl_clearance_s","vt":"3600","wt":"1500"}')

console.log(aaa)




