# -*- coding: utf-8 -*-
# @Author   : HeLaoshi
# @File     : demo1.py
# @Project  : pythonProject2
import requests

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Pragma': 'no-cache',
    'Referer': 'http://www.chinastock.com.cn/newsite/cgs-services/stockFinance/businessAnnc.html?type=marginList',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
}

params = {
    'type': 'marginList',
}

response = requests.get(
    'http://www.chinastock.com.cn/newsite/cgs-services/stockFinance/businessAnnc.html',
    params=params,
    headers=headers,
    verify=False,
)
cookie = response.cookies.get_dict()
with open('./demo1.html', 'w', encoding='utf-8') as f:
    f.write(response.text)
