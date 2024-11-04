# -*- coding: UTF-8 -*-
# @author: 莉夏宝贝儿
# @file: rs5_youzheng
# @time: 2024/3/17
# @desc:
# import sys
# import os
# sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
import time
import os
import requests
from loguru import logger
from lxml import etree
import base64
import hashlib
import json
import ddddocr

det = ddddocr.DdddOcr(det=False, ocr=False, show_ad=False)
# 你要查询的邮件号(单个查询)
consult_code = "9858638312956"
# 你的本地ip
import subprocess


class Popen(subprocess.Popen):
    def __init__(self, *args, **kwargs):
        kwargs.update({"encoding": "utf-8"})
        super(Popen, self).__init__(*args, **kwargs)


subprocess.Popen = Popen


class ExecjsUtils:

    def __init__(self, js_file_path: str, cwd=None):
        self.__choice_execjs_runtime()
        with open(js_file_path, 'r', encoding='utf-8') as f:
            print(execjs.get().name)  # Node.js (V8)
            node = execjs.get()  # 安装nodejs后，会得到运行环境名为：Node.js (V8)
            self.__ctx = node.compile(f.read())

    def __choice_execjs_runtime(self):
        os.environ['EXECJS_RUNTIME'] = "Node"

    def call(self, *args, **kwargs):
        result = self.__ctx.call(*args, **kwargs)
        return result


from requests.packages.urllib3.exceptions import InsecureRequestWarning

requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
from functools import partial
import subprocess

subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")
import execjs

with open('tools.js', 'rt', encoding='utf-8') as f:
    env_code = f.read()
with open('thisurl.js', 'rt', encoding='utf-8') as f:
    url_code = f.read()
with open('UserSign.js', 'r', encoding='utf-8') as f:
    sign = f.read()


def get_current_ip() -> str:
    url = "https://api.ipify.org/?format=json"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        ip_ = response.json()["ip"]
        return ip_


ip = get_current_ip()
logger.debug(f"当前本地ip地址--->{ip}, 类型{type(ip)}")


def ddocr_get_pos(_slide, _bg):
    _slide_bytes = base64.b64decode(_slide)
    _bg_bytes = base64.b64decode(_bg)

    with open('./slide.png', 'wb') as f:
        f.write(_slide_bytes)

    with open('./bg.jpg', 'wb') as f:
        f.write(_bg_bytes)

    _res = det.slide_match(_slide_bytes, _bg_bytes)
    return _res


def get_ticket_(_time, _capcode, _type):
    o = _time
    # logger.info(o)
    n = o[0:3]
    # logger.info(n)
    r = o[3:]
    # logger.info(r)
    l = ""
    if _type == "verify":
        l = "1163FA15CC9A425EA4B65B2A218FF5F8"
    elif _type == "track":
        l = "053B245CB1B74EBBB5FBB4A5889D66B8"
    else:
        pass
    # logger.info(l)
    c = _capcode
    # logger.info(c)
    u = consult_code + n + l + r + c
    g = hashlib.md5(u.encode('utf-8')).hexdigest().upper()
    d = hashlib.md5(g.encode('utf-8')).hexdigest().upper()
    m = base64.b64encode(d.encode('utf-8')).decode('utf-8')
    return m


def get_rs5_cookie():
    headers = {
        "authority": "www.ems.com.cn",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }
    url = "https://www.ems.com.cn/queryList"
    params = {
        "tab": "2"
    }
    response = requests.get(url, headers=headers, params=params)
    logger.info(f'瑞数请求的第一次状态码: {response.status_code}')
    # cnt = 1
    # while True:
    #     cnt += 1
    cookies = {}
    tree = etree.HTML(response.content.decode('utf-8'))
    arg1 = tree.xpath('//meta/@content')[-1]
    # 外链
    _ts = tree.xpath('//script/text()')[-2]
    src = tree.xpath('//script[@type="text/javascript"]/@src')[0]
    res_cookie = response.cookies.get('mEsoE3ffu2LGO')
    logger.debug(f"获取O结尾的cookie ==>{res_cookie}")
    cookies.update(response.cookies)
    ts_url = "https://www.ems.com.cn" + src
    ts_response = requests.get(ts_url, headers=headers, cookies=cookies, verify=False)
    trans_ts = ts_response.content.decode("utf-8")
    cookies.update(response.cookies)
    baseUrl = "https://www.ems.com.cn/queryList?tab=2"
    env_url_start = f'''
        var meta = document.createElement('meta');
        meta.content = "{arg1}";
        meta.r = "m"
        document.head.appendChild(meta);
        var script1 = document.createElement('script');
        script1.r = "m";
        document.head.appendChild(script1);
        var script2 = document.createElement('script'); 
        script2.r = "m";
        document.head.appendChild(script2);
        document.visibilityState = 'visible';
        location.href = "{baseUrl}"
        '''
    env_url_end = '''
        get_cookie = function get_cookie(){return {'cookie':document.cookie,'localStorage':localStorage,'sessionStorage':sessionStorage}};
        '''
    xxx = [env_code, env_url_start]
    xxx.append(_ts)
    xxx.append(trans_ts)
    xxx.append(env_url_end)
    code = ';\n'.join(xxx)
    with open('lixia1.js', 'wt', encoding='utf-8') as f:
        f.write(code)
    fun = execjs.compile(code)
    result = fun.call('get_cookie')
    localStorage = result['localStorage']
    sessionStorage = result['sessionStorage']
    mEsoE3ffu2LGP = result["cookie"].split(';')[1].split('=')[1]
    cookies["mEsoE3ffu2LGO"] = res_cookie
    cookies["mEsoE3ffu2LGP"] = mEsoE3ffu2LGP
    logger.success(f"首页初始生成的cookie------>{cookies}")
    return cookies, baseUrl, localStorage, sessionStorage


def get_pic_url():
    cookies, baseUrl, localStorage, sessionStorage = get_rs5_cookie()
    headers_ = {
        "authority": "www.ems.com.cn",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7",
        "cache-control": "no-cache",
        "pragma": "no-cache",
        "referer": "https://www.ems.com.cn/queryList?tab=2",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "same-origin",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }
    response_x = requests.get(url=baseUrl, headers=headers_, cookies=cookies)
    response_x.encoding = 'utf-8'
    # print(response.text)
    logger.info(f'瑞数请求的第二次状态码: {response_x.status_code}')
    response_x.encoding = 'utf-8'
    tree = etree.HTML(response_x.content.decode('utf-8'))
    meta_content = tree.xpath('//meta/@content')[-1]
    # meta_content = ''.join(re.findall('<meta content="(.*?)"', response.text))
    html_js = tree.xpath('//script/text()')[-2]
    src = tree.xpath('//script[@type="text/javascript"]/@src')[0]
    ts_url = "https://www.ems.com.cn" + src
    ts_response = requests.get(ts_url, headers=headers_)
    js_js = ts_response.content.decode("utf-8")
    env_url_start = f'''
                var meta = document.createElement('meta');
                meta.content = "{meta_content}";
                location.href = "{baseUrl}";
                Object.assign(localStorage,{localStorage})
                meta.r = "m"
                document.head.appendChild(meta);
                var script1 = document.createElement('script');
                script1.r = "m";
                document.head.appendChild(script1);
                var script2 = document.createElement('script');
                script2.r = "m";
                document.head.appendChild(script2);
                document.visibilityState = 'visible'; // hidden
                window = memory.hookDomGet(window,['__Zm9ybS5pZAo__']);
                document.body = memory.create_element.create_body();
                document.body.onmouseenter = null;
                document.documentElement.appendChild(document.body);
                document.body.style = memory.createProxyObject('CSSStyleDeclaration');
                document.body.style.backgroundBlendMode = '';
                document.body.style.lineBreak = '';
                document.body.style.textAlignLast = '';
                document.body.style.minWidth = '';
            '''
    xxx = [env_code, env_url_start]
    cookie_dicts = cookies
    for k, v in cookie_dicts.items():
        xxx.append(f'document.cookie="{k}={v};"')
    xxx.append(html_js)
    xxx.append(js_js)
    xxx.append(url_code)
    code = ';\n'.join(xxx)
    with open('lixia2.js', 'wt', encoding='utf-8') as f:
        f.write(code)
    fun = execjs.compile(code)
    return fun


def get_rs_houzhui():
    URL = "/ems-web/cutPic/getPic"
    fun_ = get_pic_url()
    result = fun_.call('add_url_search', URL)
    logger.info(result)
    new_url = result['url'].replace(':443', '')
    if "https://www.ems.com.cn" in new_url:
        new_url = new_url
    else:
        new_url = "https://www.ems.com.cn" + new_url
    cookies_ = {}
    mEsoE3ffu2LGO_ = result['cookies'].split(';')[0].split("=")[1]
    mEsoE3ffu2LGP_ = result['cookies'].split(';')[1].split("=")[1]
    cookies_["mEsoE3ffu2LGO"] = mEsoE3ffu2LGO_
    cookies_["mEsoE3ffu2LGP"] = mEsoE3ffu2LGP_
    cookies_["flag"] = "true"
    logger.success(f'url与携带的后缀:{new_url}')
    user_sign = execjs.compile(sign).call('l')
    logger.debug(user_sign)
    headers = {
        "authority": "www.ems.com.cn",
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "content-length": "0",
        "origin": "https://www.ems.com.cn",
        "pragma": "no-cache",
        "referer": "https://www.ems.com.cn/queryList?tab=2",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "user-sign": str(user_sign)
    }
    response = requests.post(new_url, headers=headers, cookies=cookies_)
    logger.info(f'访问json后缀1状态码----->{response.status_code}')
    logger.success(f'json数据:{response.json()}')
    capcode = response.json()["value"]["capcode"]
    backImage = response.json()["value"]["backImage"]
    slidingImage = response.json()["value"]["slidingImage"]
    yHeight = response.json()["value"]["yHeight"]
    return capcode, backImage, slidingImage, yHeight, cookies_, user_sign, fun_


def xpos():
    capCode, bg, slide, yheight, cookies_, user_sign, fun_ = get_rs_houzhui()
    xpos_x = ddocr_get_pos(slide, bg)['target'][0] - 3
    # xpos_ = int(xpos_x / ((350 - 40 - 20) / (350 - 40)))
    logger.info(f"{xpos_x}")
    return capCode, cookies_, user_sign, fun_, xpos_x


def querytime():
    time_URL = "/ems-web/currentTime/queryTime"
    capCode, cookies_, user_sign, fun_, xpos_x = xpos()
    result = fun_.call('add_url_search', time_URL)

    new_url_ = result['url'].replace(':443', '')
    if "https://www.ems.com.cn" in new_url_:
        new_url_ = new_url_
    else:
        new_url_ = "https://www.ems.com.cn" + new_url_
    headers = {
        "authority": "www.ems.com.cn",
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "content-length": "0",
        "origin": "https://www.ems.com.cn",
        "pragma": "no-cache",
        "referer": "https://www.ems.com.cn/queryList?tab=2",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "user-sign": str(user_sign)
    }
    logger.success(f"querytime--> {user_sign}")
    logger.success(f'查询时间与携带的后缀:{new_url_}')
    response = requests.post(new_url_, headers=headers, cookies=cookies_)
    logger.info(f'访问json后缀2状态码-------->{response.status_code}')
    return response.json()["value"], capCode, cookies_, xpos_x, fun_


def get_verify_success():
    _type = "verify"
    utime, capCode, cookies_, xpos_x, fun_ = querytime()
    ticket_ = get_ticket_(str(utime), capCode, _type=_type)
    test_flagURL = "/ems-web/trackTestQuery/getLogisticsTestFlag"
    data = {
        "value": {
            "customerIP": ip,
            "phoneNum": "",
            "waybillNoList": [
                consult_code
            ],
            "xpos": xpos_x,
            "capcode": capCode
        }
    }
    data = json.dumps(data, separators=(',', ':'))
    new_sign = execjs.compile(sign).call('get_newsign', data)
    logger.success(f"新sign--> {new_sign}")
    headers = {
        "authority": "www.ems.com.cn",
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json;charset=UTF-8",
        "origin": "https://www.ems.com.cn",
        "pragma": "no-cache",
        "referer": "https://www.ems.com.cn/queryList?tab=2",
        "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Google Chrome\";v=\"122\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "ticket": str(ticket_),
        "time": str(utime),
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "user-sign": str(new_sign)
    }
    # cookies_["historD"] = '[' + consult_code + ']'
    result = fun_.call('add_url_search', test_flagURL)
    new_url_X = result['url'].replace(':443', '')
    if "https://www.ems.com.cn" in new_url_X:
        new_url_X = new_url_X
    else:
        new_url_X = "https://www.ems.com.cn" + new_url_X
    logger.success(f'验证响应与携带的后缀:{new_url_X}')
    response = requests.post(new_url_X, headers=headers, cookies=cookies_, data=data)
    logger.info(f"访问json后缀3状态码-------->{response.status_code}")
    logger.success(f"json数据:{response.json()}")
    if response.json()['success'] == False:
        logger.error('验证失败, xpose值不对')
    else:
        queryTrack(xpos_x, capCode, fun_, cookies_, utime)


def queryTrack(xpos_x, capCode, fun_, cookies_, time_):
    _type = "track"
    ticket_ = get_ticket_(str(time_), capCode, _type=_type)
    end_URL = "/ems-web/mailTrack/queryTrack"
    json_data = {
        'value': [
            {
                'ip': ip,
                'xpos': xpos_x,
                'capcode': str(capCode),
                'mailStatus': 'a',
                'orderNum': [
                    consult_code,
                ],
                'orderType': '1',
                'appleFlag': None,
            },
        ],
        'list': [
            consult_code,
        ]
    }
    json_data = json.dumps(json_data, separators=(',', ':'))
    end_sign = execjs.compile(sign).call('get_newsign', json_data)
    logger.success(f"最终sign--> {end_sign}")
    result = fun_.call('add_url_search', end_URL)
    new_url_end = result['url'].replace(':443', '')
    if "https://www.ems.com.cn" in new_url_end:
        new_url_end = new_url_end
    else:
        new_url_end = "https://www.ems.com.cn" + new_url_end
    logger.success(f'验证通过后获取数据与携带的后缀:{new_url_end}')
    headers = {
        'authority': 'www.ems.com.cn',
        'accept': 'application/json, text/plain, */*',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/json;charset=UTF-8',
        'origin': 'https://www.ems.com.cn',
        'pragma': 'no-cache',
        'referer': 'https://www.ems.com.cn/queryList?tab=2',
        'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'ticket': str(ticket_),
        'time': str(time_),
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'user-sign': str(end_sign),
    }
    response = requests.post(new_url_end, headers=headers, cookies=cookies_, data=json_data)
    logger.info(f"访问json后缀4状态码-------->{response.status_code}")
    logger.success(response.text)


if __name__ == '__main__':
    get_verify_success()
