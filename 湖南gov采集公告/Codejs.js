
string123 = "1|4|3|0|2"
t = "7E38DE3FB3D8745F49E3F1BFEE35D791E161D90F"
for (var c, s = [15, 35, 29, 24, 33, 16, 1, 38, 10, 9, 19, 31, 40, 27, 22, 23, 25, 13, 6, 11, 39, 18, 20, 8, 14, 21, 32, 26, 2, 30, 7, 4, 17, 5, 3, 28, 34, 37, 12, 36], u = '3000176000856006061501533003690027800375', f = [], p = "", h = "", l = 0; l < t['length']; l++)
    for (var d = t[l], g = 0; g < s["length"]; g++)
        s[g] == l + 1 && (f[g] = d);
for (p = f["join"](""),
l = 0; l < p["length"] && l < u['length']; l += 2)
    for (var w = string123['split']("|"), m = 0; ; ) {
        switch (w[m++]) {
        case "0":
            1 == b[r("0x1")] && (b = "0" + b);
            continue;
        case "1":
            var v = parseInt(p[r("0x5")](l, l + 2), 16);
            continue;
        case "2":
            h += b;
            continue;
        case "3":
            var b = (v ^ _)[r("0x6")](16);
            continue;
        case "4":
            var _ = parseInt(u[r("0x5")](l, l + 2), 16);
            continue
        }
        break
    }

