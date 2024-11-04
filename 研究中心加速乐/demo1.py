# -*- coding: utf-8 -*-
# @Author   : HeLaoshi
# @File     : demo1.py
# @Project  : pythonProject2
import re

import requests
import execjs

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.7',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Referer': 'https://sjdj.sist.org.cn/',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Sec-GPC': '1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
    'sec-ch-ua': '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}

response = requests.get('https://sjdj.sist.org.cn/', headers=headers)
demo1_cookie = re.findall("document.cookie=(.*?);location", response.text)[0]
jsl_demo1_cookie = requests.utils.dict_from_cookiejar(response.cookies)
jsl_cookie = execjs.eval(demo1_cookie).split('=')[1].split(';')[0]
jsl_demo1_cookie['__jsl_clearance_s'] = jsl_cookie


from curl_cffi import requests
response1 = requests.get('https://sjdj.sist.org.cn/', headers=headers, cookies=jsl_demo1_cookie, impersonate="chrome100")
# print(jsl_demo1_cookie)
with open('./de1231.html', 'w', encoding='utf-8') as f:
    f.write(response1.text)
