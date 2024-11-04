
function getdegin(cookie){
    l58=[
    "-100",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36,uaend,12147,20030107,zh-CN,Gecko,5,0,0,0,418141,0,1536,824,1536,864,1536,150,1536,,cpen:0,i1:0,dm:0,cwen:0,non:1,opc:0,fc:0,sc:0,wrc:1,isc:0,vib:1,bat:1,x11:0,x12:1,8108,0.605348694302,849717646830.5,0,0,loc:",
    "-105",
    "0,-1,0,1,2465,773,0;0,-1,0,1,2166,773,0;0,-1,0,0,-1,-1,0;0,-1,0,0,-1,-1,0;-1,-1,0,1,2937,-1,0;0,-1,0,0,-1,-1,0;0,-1,0,0,-1,-1,0;",
    "-108",
    "",
    "-101",
    "do_en,dm_en,t_en",
    "-110",
    "",
    "-117",
    "",
    "-109",
    "",
    "-102",
    "0,-1,0,1,2465,773,0;0,-1,0,1,2166,773,0;0,-1,0,0,-1,-1,0;0,-1,0,0,-1,-1,0;-1,-1,0,1,2937,-1,0;0,-1,0,0,-1,-1,0;0,-1,0,0,-1,-1,0;",
    "-111",
    "",
    "-114",
    "",
    "-103",
    "",
    "-106",
    "0,0",
    "-115",
    "1,32,32,0,0,0,0,10,0,1699435293661,-999999,18180,0,0,3030,0,0,20,0,0,CF46F32126BF55CC452215C0453295C5~-1~YAAQZA1x32pIxm2LAQAAzag8rgqdMH74w2R89QwZsLreIUfP9iCTJtn//jaE3Vte/eq2Vn0d9eCCap9uRO28NtUJuRCBO/BUyw0c/0RDlO6MyHmoIIpBkGOiD0Hu7RVzjhd1OhOnFDAra7Txv6CRsVcgNnjBmyjXFlMw2HHZ8CAeR16ODaoGWokViB+2rNRFi/gGujsAdmq5oUchmcr6/USd21C3Hz3I6aEJN/ceCzwJTbqalJnM+eaNQfb2UEAnjDtTtSvpgEZ9ulDcVHaIHgUWvi3LasikPHT8NjO70qavNxIne/fla9uAo8fG9MEv7CU+eRYSY2ctORz/LylYYA09TIrXYgu6GbWYrLuq3esYaL6Va1m45UeDxfcTjcd4cyj7ys30quoa0c5tzm+Axs8=~-1~-1~-1,37662,-1,-1,30261693,PiZtE,52124,73,0,0,0,,,",
    "-112",
    "https://www.cathaypacific.com/cx/sc_CN.html",
    "-119",
    "-1",
    "-122",
    "0,0,0,0,1,0,0",
    "-123",
    "",
    "-124",
    "",
    "-126",
    "",
    "-127",
    8,
    "-128",
    ",,",
    "-131",
    ",,,",
    "-132",
    "",
    "-133",
    "",
    "-70",
    "-1",
    "-80",
    "94",
    "-90",
    [
        1,
        10,
        2,
        5
    ],
    "-116",
    0,
    "-129",
    ",,0,,,,,,,,"
]
    ti=Math.random()
    data=new Date();
    let str1 = ti.toString();
    let num2 = parseInt(ti*1000/2,10);
    let result = str1.substring(0, 11) + num2.toString();
    timee=data/2*2
    var m1=parseInt(data/4064256,10)
    console.log(parseInt(parseInt(m1/23,10)/6,10))
    // console.log(timee)
    var l1="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36,uaend,12147,20030107,zh-CN,Gecko,5,0,0,0,"+m1+",0,1536,824,1536,864,1536,150,1536,,cpen:0,i1:0,dm:0,cwen:0,non:1,opc:0,fc:0,sc:0,wrc:1,isc:0,vib:1,bat:1,x11:0,x12:1,8106,"+result+","+data/2+",0,0,loc:"
    // console.log(l1)
    l58[1]=l1
    lists=Rw7(timee)
    // console.log(lists)
    var as = asd(cookie)
    // console.log(as)
    l25= "1,32,32,0,0,0,0,7,0,"+timee+",-999999,"+parseInt(m1/23,10)+",0,0,"+parseInt(parseInt(m1/23,10)/6,10)+",0,0,18,0,0,"+cookie+","+as+",-1,-1,30261693,PiZtE,"+lists[0]+","+lists[1]+",0,0,0,,,"
    // console.log(l25)
    l58[25]=l25
    var aa=Qw7("TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzExOC4wLjAuMCBTYWZhcmkvNTM3LjM2Nw==")
    // console.log(aa)
    l58[53]=[ 1, 10, 2, 5 ]
        // ['MA==', Math.floor(100000*Math.random()+10000)].join("|")
    console.log(l58)
    return l58
}
function Rw7(ks7) {
      for (var zs7 = Math.floor(100000 * Math.random() + 10000), Qs7 = (ks7 * zs7).toString(), fs7 = 0, LA7 = [], XA7 = Qs7.length >= 18; LA7.length < 6; )
          LA7.push(parseInt(Qs7.slice(fs7,fs7+2),10)),
          fs7 = XA7 ? fs7 + 3 : fs7 + 2;
      var pA7;
      return pA7 = [zs7, function qA7(VA7) {
       // console.log(VA7)
          var wA7 = VA7[0] - VA7[1];
          var cA7 = VA7[2] - VA7[3];
          var ZA7 = VA7[4] - VA7[5];
          var bA7 = Math.sqrt(wA7 * wA7 + cA7 * cA7 + ZA7 * ZA7);
          var nA7;
          return nA7 = Math.floor(bA7),

          nA7;
      }(LA7)],

      pA7;
  }

function asd(IA7) {
 var SA7 = [554, 629, 862, 64, 603, 971, 987, 971, 210];
       for (var UA7 = 0, YA7 = 0; YA7 < IA7.length; YA7++) {
           var hA7 = IA7.charCodeAt(YA7);
           hA7 < 128 && (UA7 += hA7);
       }
       var FA7;
       return FA7 = UA7,
       FA7;
}

// console.log(asd("D5820FECD50146095F8A66A362E2721C~-1~YAAQHg1x3xnc3jeLAQAAEfTmUAp8i2VdVmuOdlcyRqGKIQFmhAuRPmdQLyn1/oz/0xxT+YI7M3QJLUcdJOesXB+G/Ms0Qbf6Vyoboo/TN7YrS8U3/XS6TbVqQuuGBCvNmM03XEzzs6mQVG28I8ud3FhoXbtvhNByOUrjPfCA7bTsMGPYpfB3B7ddYtdBDxXdUBEVBwchhKyVxdlUFMkyBj64gmGouvVkQR2vFwD1iQbKrHTyQEEcNx0G6s5C1Vvx04dwqqMGtUTJBsYR8FQs5uLSKJW1Nj04hNXKhpVY2wVKhJt/iFDX79LOhRtTh8nnZfZqOgGMY8ejs0CeMBjV90nTB3/BkM79XxA0gJerplzAa7WqzYkLSYHUOjSYdhvcI4wJZukGWIhZ4nUUe5fMQmk1Fw5nKhK0dzpNHsDleqA2wB7X~-1~-1~-1"))


// asdddddddddddddddddd
function PH(xT7, vT7) {
        return xT7 < vT7;
    };
function Qw7(fw7) {
      for (var L87 = 0, X87 = 0; PH(X87, fw7.length); X87++)
          L87 += fw7.charCodeAt(X87);
      var p87;
      return p87 = L87,
      p87;
  }

// console.log(l58[1])
// console.log(Qw7("TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzExOC4wLjAuMCBTYWZhcmkvNTM3LjM2Nw=="))
// console.log(atob('TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzExOC4wLjAuMCBTYWZhcmkvNTM3LjM2Nw=='))
// console.log(btoa('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.367'))

function mH(TN7, NN7) {
    return TN7 + NN7;
};
function M6(r10, q10) {
        return r10 <= q10;
    };
function jL(lN, VN) {
        return lN < VN;
    };
console.log(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(mH(true, false << 1), true << 2), true << 3), true << 4), true << 5), false << 6), true << 7), true << 8), false << 9), false << 10), false << 11), false << 12), false << 13), true << 14), true << 15), true << 16), false << 17), true << 18), true << 19), false << 20), false << 21), true << 22), true << 23), true << 24));
function WN(n10, X10) {
        return n10 !== X10;
    };
function tL(I10, J10) {
        return I10 + J10;
    };
function kL(h6, K6) {
        return h6 * K6;
    };
function PG(H9) {
        return -H9;
    };
function YG(IB0) {
        return !IB0;
    };
function XK(kb0, rb0) {
        return kb0 ^ rb0;
    };
function jL(lN, VN) {
        return lN < VN;
    };
function WL(pb0, Db0) {
        return pb0 % Db0;
    };
function c1(WB0, pB0) {
        return WB0 & pB0;
    };
function pL(t9, sN) {
        return t9 >> sN;
    };
function J1(j6, L6) {
        return j6 == L6;
    };
function xB(vB, fB) {
        return vB >= fB;
    };
function YN(dN, wN) {
        'use strict';
        var PN = YN;
        switch (dN) {
        case 16:
            {
                var AN = wN[0];
                var cN = wN[1];
                var MN = wN[2];
                var l6;
                var V6;
                var R6 = true;
                var Y6 = ",";
                var w6 = 3;
                // if (false)
                var P6=""

                P6="abcdefghijklmnopaqrstuvxyzABCDEFGHIJKLMNOPAQRSTUVXYZ!@#%&-_=;:<>,~000000000000000000001111111111111111111133333333333333333333444444444444444444445555555555555555555566666666666666666666777777777777777777778888888888888888888899999999999999999999"
                console.log(P6)
                for (; ; ) {
                    for (Y6 = ",",
                    R6 = true,
                    l6 = 0; jL(l6, tL(Math.floor(kL(Math.random(), 3)), 3)); ++l6) {
                        for (V6 = 0; jL(V6, tL(Math.floor(kL(Math.random(), 3)), 3)); ++V6)
                            Y6 += P6[Math.floor(kL(Math.random(), P6.length))];
                        Y6 += ",";
                    }
                    for (l6 = 0; jL(l6, AN.length); ++l6)
                        if (WN(PG(1), (AN[l6].toString()).indexOf(Y6))) {
                            R6 = YG(1);
                            break;
                        }
                    if (R6) {
                        var b6;
                        return b6 = Y6,
                        b6;
                    }
                }
            }
            break;
        case Cr:
            {
                if (Hk) {
                    throw Math.random();
                }
            }
            break;
        }
    };




var Vl0="-100,3y57,m0Z,777Dv,365,16<,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36,uaend,12147,20030107,zh-CN,Gecko,5,0,0,0,417885,0,1536,824,1536,864,1536,150,1536,,cpen:0,i1:0,dm:0,cwen:0,non:1,opc:0,fc:0,sc:0,wrc:1,isc:0,vib:1,bat:1,x11:0,x12:1,8107,0.532979378266,849197795457.5,0,0,loc:,3y57,m0Z,777Dv,365,16<,-105,3y57,m0Z,777Dv,365,16<,-1,-1,0,0,-1,-1,0;,3y57,m0Z,777Dv,365,16<,-108,3y57,m0Z,777Dv,365,16<,,3y57,m0Z,777Dv,365,16<,-101,3y57,m0Z,777Dv,365,16<,do_en,dm_en,t_en,3y57,m0Z,777Dv,365,16<,-110,3y57,m0Z,777Dv,365,16<,,3y57,m0Z,777Dv,365,16<,-117,3y57,m0Z,777Dv,365,16<,,3y57,m0Z,777Dv,365,16<,-109,3y57,m0Z,777Dv,365,16<,,3y57,m0Z,777Dv,365,16<,-102,3y57,m0Z,777Dv,365,16<,-1,-1,0,0,-1,-1,0;,3y57,m0Z,777Dv,365,16<,-111,3y57,m0Z,777Dv,365,16<,,3y57,m0Z,777Dv,365,16<,-114,3y57,m0Z,777Dv,365,16<,,3y57,m0Z,777Dv,365,16<,-103,3y57,m0Z,777Dv,365,16<,,3y57,m0Z,777Dv,365,16<,-106,3y57,m0Z,777Dv,365,16<,0,0,3y57,m0Z,777Dv,365,16<,-115,3y57,m0Z,777Dv,365,16<,1,32,32,0,0,0,0,10,0,1698395590915,-999999,18168,0,0,3028,0,0,15,0,0,39DAC3BAE9F9A1B50C16D3913E02BB37~-1~YAAQFA1x3yz6zmuLAQAAOBJEcAo1CQ44DtddJ/sSCKqRT344Bt126NdV9p5lvzcsY0/Z3io8xR6SGEIWbzPwyQxCCwdJSMFVWVjWxNc56yrSmeILf5O8qb6Je6y6rMo5lhm6gzn/LLL78g78ggs77NAVggFOZd6id01qP/oFjqOLNqAUdifzNF2BhjjDQHYwJk39Yv2xZoQ0Itl3mIIswwr6uhtqrR0BXQzt+ehcCo1UL8p+ireJSi7Gsn5trmzx8Bphf6lOHMVXzroVrXQuWZExivPt81GvOQ6N2IJtrFRXdwWGXgqyGL57NBpEoyyIB0rkQp5PA1qBiwdI9s+3qVUlyUEOmxLfVOBa/eSfF9AqxQEtoVJGBqmJ0nJgFOni/fVGqcFUt+bwKAvgW65wHJUtk8FiXWXaffrYoiNF5kLHFHaj~-1~-1~-1,40185,-1,-1,30261693,PiZtE,107803,83,0,0,0,,,,3y57,m0Z,777Dv,365,16<,-112,3y57,m0Z,777Dv,365,16<,https://www.adidas.com.cn/?utm_medium=brandzone&utm_campaign=brandzone-alwayson-cn-exact&utm_source=baidu&utm_content=na-main_title-na-na-na-pc-na&utm_term=na,3y57,m0Z,777Dv,365,16<,-119,3y57,m0Z,777Dv,365,16<,-1,3y57,m0Z,777Dv,365,16<,-122,3y57,m0Z,777Dv,365,16<,0,0,0,0,1,0,0,3y57,m0Z,777Dv,365,16<,-123,3y57,m0Z,777Dv,365,16<,,3y57,m0Z,777Dv,365,16<,-124,3y57,m0Z,777Dv,365,16<,,3y57,m0Z,777Dv,365,16<,-126,3y57,m0Z,777Dv,365,16<,,3y57,m0Z,777Dv,365,16<,-127,3y57,m0Z,777Dv,365,16<,8,3y57,m0Z,777Dv,365,16<,-128,3y57,m0Z,777Dv,365,16<,,,,3y57,m0Z,777Dv,365,16<,-131,3y57,m0Z,777Dv,365,16<,,,,,3y57,m0Z,777Dv,365,16<,-132,3y57,m0Z,777Dv,365,16<,,3y57,m0Z,777Dv,365,16<,-133,3y57,m0Z,777Dv,365,16<,,3y57,m0Z,777Dv,365,16<,-70,3y57,m0Z,777Dv,365,16<,-1,3y57,m0Z,777Dv,365,16<,-80,3y57,m0Z,777Dv,365,16<,94,3y57,m0Z,777Dv,365,16<,-90,3y57,m0Z,777Dv,365,16<,449|20163,3y57,m0Z,777Dv,365,16<,-116,3y57,m0Z,777Dv,365,16<,0,3y57,m0Z,777Dv,365,16<,-129,3y57,m0Z,777Dv,365,16<,,,0,,,,,,,,"

function geth2num(h1) {
for (var dl0 = 0, wl0 = 0; wl0 < h1.length; wl0++) {
        var Pl0 = h1.charCodeAt(wl0);
        Pl0 < 128 && (dl0 += Pl0);
    }
return dl0
}
function getbm_sz(bm_sz) {
    list=bm_sz.split('~')
    return list

}
function h3bK(FK, BK) {
        var gK;
        var jK;
        var LK;
        var NK;
        var zK = FK.split(',');
        for (NK = 0; jL(NK, zK.length); NK++)
            gK = WL(c1(pL(BK, 8), 65535), zK.length),
            BK *= 65793,
            BK &= 4294967295,
            BK += 4282663,
            jK = WL(c1(pL(BK &= 8388607, 8), 65535), zK.length),
            BK *= 65793,
            BK &= 4294967295,
            BK += 4282663,
            BK &= 8388607,
            LK = zK[gK],
            zK[gK] = zK[jK],
            zK[jK] = LK;
        var vK;
        return vK = zK.join(','),
        vK;
    }
function h4hK(KK, QK) {

        var OK =" !#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~"
        var BG=0
        var HK=[
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    -1,
    0,
    1,
    -1,
    2,
    3,
    4,
    5,
    -1,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    -1,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91
]
        for (var sQ = "", lQ = BG; jL(lQ, KK.length); lQ++) {
            var VQ = KK.charAt(lQ)
              , RQ = c1(pL(QK, 8), 65535);
            QK *= 65793,
            QK &= 4294967295,
            QK += 4282663,
            QK &= 8388607;
            var dQ = HK[KK.charCodeAt(lQ)];
            if (J1("function", typeof VQ.codePointAt)) {
                var AQ = VQ.codePointAt(BG);
                xB(AQ, 32) && jL(AQ, 127) && (dQ = HK[AQ]);
            }
            xB(dQ, BG) && (dQ += WL(RQ, OK.length),
            dQ %= OK.length,
            VQ = OK[dQ]),
            sQ += VQ;
        }
        var cQ;
        return cQ = sQ,

        cQ;
    }

function getresult(cookie,bm_sz) {
    VN7=getdegin(cookie)
    //数组VN7
    var jiage=YN(16, VN7);
    console.log(jiage)
    //第一次拼接
    h1=VN7.join(jiage)
    // console.log(h1)
    h2c=geth2num(Vl0)
    //第二次结果
    var h2 = tL(tL(tL(tL(2, jiage), 2), jiage), hh = tL(tL(tL(tL(tL("7a74G7m23Vrp0o5c946981", "l/3W8ccl8nErIQpN40d2ug=="), jiage), XK(8, h2c)), jiage), h1))
    // console.log(h2)
    bm_szunm=getbm_sz(bm_sz)
    var h3=h3bK(h2, bm_szunm[3])
    var h4=h4hK(h3,bm_szunm[2])
    console.log(h4)
    // var MQ = ((((((l0.WY.apply(null, [l1, PG(Wx), rg, YG(BG)]))[l0.Ww.apply(null, [jj, Tg, B1])](DL(vz(), Ix), l0.B0(PG(Ox), fG, gG, NG)))[l0.Ww(AL, Tg, B1)](IQ, l0.B0(PG(Ox), fG, gG, FN)))[l0.Ww.call(null, l1, Tg, B1)](MK, l0.B0(PG(Ox), fG, gG, vL)))[l0.Ww(D9, Tg, B1)](UK, l0.B0.call(null, PG(Ox), fG, gG, Ij)))[l0.Ww(Hg, Tg, B1)](EK, l0.B0(PG(Ox), fG, gG, vj))).concat(JQ);
    var h5 = tL(tL(tL(tL(tL(tL(tL("2;", bm_szunm[2]), ";"), bm_szunm[3]), ";"), "3305,0,0,1,4,0"), ";"), h4)
     var re=('{"sensor_data":"').concat(h5, '"}')
    return h5
}
cook='09BAEE2978C317C0B45EEA7B74D1A334~-1~YAAQFA1x3wd3/muLAQAAZmSWgAq3t9D8MKbiZ3DH50fY6TszYRgnzBvgHHbhFXJCkUgdqmYG29zJQtJeqmemw+asuhSZawtt52chSy43jcNVdRn6EX5yagGxIXV7pXFUB8k7BWRJ6enF5ZLk3ayR6156bAcwMx5+LtQHo0m7j9Le68Dcpd2hVbBVejEuAdqnVtZZz3YhgdixOZm1ktaNksNH2O/IrPxBxlI7ey2LQ4l4ZC0tuxCPeteU3w1WEj5aLKEtf+0UHk0+RetnyzpJZ9O1iYdSOp6uJZ5fNO/eMabYEUYgGA73RfIE7Mf/kI+yoLd2QgZGVz0ywecpLRgG8iRf3eFLWZUSmRqLLR21/vy0k/ObwuEjLeakBUwa42mo86X+v5rOS//03MKVgJJaevcQ1c+RnA==~-1~-1~-1'
bm_sz='3E3B7EC9C27FEC4553AB294C45B3AAFB~YAAQFA1x3zNs+GuLAQAAj/IWfxX4a7Irq4xtB/lO1/IlRoeQYaWZ28ZjE46Q+jMGgoYuUEBqx139d6CE5Wcsb3KjGuicdyImrCDpiFrXrdgevByCZUDmcNTfFWqOb/4T3dljKYmTVlgePBzK0Ml/ELTzucrqjkqMFyJGQ+kKRu90R/VEocXazk8IpBN4AJvBsUJc+L1wFMwUFY3xpV5prdQW/cm6EX1isvlNpMxV7eREtnyRL2Cx/LCB9Q9m0r7j3MhZyCAqwxfEjGY07kRiHsrbOrwm/e2j5JInh7h5zYPadh8p14BgaynGLwaNPPgPwoOpgP10A55s/R33r18FLtclCa3r8Mji8BKxyTd8SQmfpvKAhnRFGIms12uYrBdSp7tcfkC+Heq/NElGm1BugBy7OaTyPajiaOh/goMrZuux5LkxRAnVGeKdd1A=~3223601~3488055'

console.log(getresult(cook, bm_sz));

