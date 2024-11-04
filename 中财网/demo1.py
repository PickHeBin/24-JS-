# -*- coding: utf-8 -*-
# @Author   : HeLaoshi
# @File     : demo1.py
# @Project  : pythonProject2
import requests

cookies = {
    'ASP.NET_SessionId': 'z3ouvsigtto0aazdpb1gc533',
}

headers = {
    'Accept': '*/*',
    'Accept-Language': 'zh-CN,zh;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    # 'Cookie': 'ASP.NET_SessionId=z3ouvsigtto0aazdpb1gc533',
    'Origin': 'https://data.cfi.cn',
    'Pragma': 'no-cache',
    'Referer': 'https://data.cfi.cn/data_ndkA0A1934A1939A4569A4570.html',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-GPC': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}

params = {
    'ndk': 'A0A1934A1939A4569A4570',
    'client': 'pc',
}

data = {
    'search': 'all',
    'sortCol': '',
    'pageIndex': '2',
    'subvalue': '',
}

response = requests.post(
    'https://data.cfi.cn/cfi_datacontent_server.aspx',
    params=params,
    # cookies=cookies,
    headers=headers,
    data=data,
).text
print(response)
