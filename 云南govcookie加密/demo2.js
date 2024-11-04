navigator = {
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
}

var _$ = ["#challenge", "#waf_answer", "#ChallengeForm"];

function main123(demo1, demo2, demo3 ) {
  var x06dd1a = {};
  var x0fcad9;
  var x08c924 = demo1;
  var x01c264 = navigator.userAgent.toLowerCase();
  x08c924 = x08c924 * demo2;

  if (x0fcad9 = x01c264.match(/msie ([\d.]+)/)) {
    x06dd1a.ie = x0fcad9[1];
  } else {
    if (x0fcad9 = x01c264.match(/firefox\/([\d.]+)/)) {
      x06dd1a.firefox = x0fcad9[1];
    } else {
      if (x0fcad9 = x01c264.match(/chrome\/([\d.]+)/)) {
        x06dd1a.chrome = x0fcad9[1];
      } else {
        if (x0fcad9 = x01c264.match(/opera.([\d.]+)/)) {
          x06dd1a.opera = x0fcad9[1];
        } else {
          if (x0fcad9 = x01c264.match(/version\/([\d.]+).*safari/)) {
            x06dd1a.safari = x0fcad9[1];
          } else {
            0;
          }
        }
      }
    }
  }

  x08c924 = x08c924 + demo3;

  if (x06dd1a.ie || x06dd1a.firefox || x06dd1a.chrome || x06dd1a.opera || x06dd1a.safari) {
    x08c924 = x08c924 * 3 + 7;
    if (x08c924 < 123) x08c924 = x08c924 + 2345;
    var x0b515d = _$[1];
    if (x08c924 > 2345) x08c924 = Math.floor(x08c924 / 123);
  }
  return x08c924
}

demo1 = 0x0b
demo2 = 0x4d
demo3 = 0x17

console.log(main123(demo1, demo2, demo3))