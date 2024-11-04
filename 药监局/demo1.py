# -*- coding: utf-8 -*-
# @Author   : HeLaoshi
# @File     : demo1.py
# @Project  : PythonReversePath
import requests

cookies = {
    'isClick': 'true',
    'JSESSIONID': '0000bh3z04FI_KrzbW0ItxQg4Yw:-1',
}

headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    # 'Cookie': 'isClick=true; JSESSIONID=0000bh3z04FI_KrzbW0ItxQg4Yw:-1',
    'Origin': 'https://xkz.cbirc.gov.cn',
    'Pragma': 'no-cache',
    'Referer': 'https://xkz.cbirc.gov.cn/jr/',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-GPC': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua': '"Brave";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}

params = {
    'useState': '3',
}

data = {
    'start': '30',
    'limit': '10',
}

response = requests.post(
    'https://xkz.cbirc.gov.cn/jr/kCEKXO/getLicence.do',
    params=params,
    cookies=cookies,
    headers=headers,
    data=data,
).json()
for i in response['datas']:
    print(i)