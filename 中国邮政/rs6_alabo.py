# -*- coding: UTF-8 -*-
# @author: 莉夏宝贝儿
# @file: rs6_alabo
# @time: 2024/3/25
# @desc:
# import sys
# import os
# sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
import re
import requests
from loguru import logger
from lxml import etree
from functools import partial
import subprocess

subprocess.Popen = partial(subprocess.Popen, encoding="utf-8")
import execjs

with open('tools.js', 'rt', encoding='utf-8') as f:
    env_code = f.read()
with open('thisurl.js', 'rt', encoding='utf-8') as f:
    url_code = f.read()


def get_rs6_alabo():
    headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    }
    url = "https://kscd.zking.com/app/vehicle/proposal/commonlogin"
    params = {
        "redirect": "/index"
    }
    response = requests.get(url, headers=headers, params=params)
    logger.info(f'瑞数请求阿拉伯网站的第一次状态码: {response.status_code}')
    cookies = {}
    response_text = response.content.decode('utf-8')
    # meta
    meta_content = re.findall('<meta content="(.*?)"', response_text)[0]
    # 外链js
    tree = etree.HTML(response_text)
    # 外链
    _ts = tree.xpath('//script/text()')[-2]
    src = tree.xpath('//script[@type="text/javascript"]/@src')[0]
    res_cookie = response.cookies.get('hvAJjymUYBa3O')
    logger.debug(f"获取O结尾的cookie ==>{res_cookie}")
    cookies.update(response.cookies)
    ts_url = "https://kscd.zking.com" + src
    ts_response = requests.get(ts_url, headers=headers, cookies=cookies)
    trans_ts = ts_response.content.decode("utf-8")
    cookies.update(response.cookies)
    baseUrl = "https://kscd.zking.com/app/vehicle/proposal/commonlogin?redirect=%2Findex"
    env_url_start = f'''
        var meta = document.createElement('meta');
        meta.content = "{meta_content}";
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
    cookies["hvAJjymUYBa3P"] = res_cookie
    cookies["hvAJjymUYBa3P"] = mEsoE3ffu2LGP
    logger.success(f"首页初始生成的cookie------>{cookies}")
    return cookies, baseUrl, localStorage, sessionStorage


def get_index_success():
    cookies, baseUrl, localStorage, sessionStorage = get_rs6_alabo()
    headers_ = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
        "Pragma": "no-cache",
        "referer": f"{baseUrl}",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "none",
        "Sec-Fetch-User": "?1",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\""
    }

    response_x = requests.get(url=baseUrl, headers=headers_, cookies=cookies)
    response_x.encoding = 'utf-8'
    logger.info(f'瑞数请求的阿拉伯网站第二次状态码: {response_x.status_code}')


if __name__ == '__main__':
    get_index_success()
