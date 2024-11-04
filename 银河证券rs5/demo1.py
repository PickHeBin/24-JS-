# -*- coding: utf-8 -*-
# @Author   : HeLaoshi
# @File     : demo1.py
# @Project  : PythonReversePath
import requests

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Referer': 'http://www.chinastock.com.cn/newsite/cgs-services/stockFinance/businessAnnc.html?type=marginList',
    'Sec-GPC': '1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
}

params = {
    'type': 'marginList',
}

response = requests.get(
    'http://www.chinastock.com.cn/newsite/cgs-services/stockFinance/businessAnnc.html',
    params=params,
    headers=headers,
    verify=False,
).text
with open('./rs5123.html', 'w', encoding='utf-8') as f:
    f.write(response)