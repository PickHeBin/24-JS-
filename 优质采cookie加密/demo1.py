# -*- coding: utf-8 -*-
# @Author   : HeLaoshi
# @File     : demo1.py
# @Project  : pythonProject2
import requests

cookies = {
    'Hm_lpvt_9511d505b6dfa0c133ef4f9b744a16da': '1698129614',
}

headers = {
    'authority': 'www.youzhicai.com',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'accept-language': 'zh-CN,zh;q=0.7',
    'cache-control': 'no-cache',
    # 'cookie': 'Hm_lpvt_9511d505b6dfa0c133ef4f9b744a16da=1698129614',
    'pragma': 'no-cache',
    'referer': 'https://www.youzhicai.com/nd/c93b8018-328a-40f4-950b-3d4bdbac44c1-1.html',
    'sec-ch-ua': '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'sec-gpc': '1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
}

response = requests.get(
    'https://www.youzhicai.com/nd/c93b8018-328a-40f4-950b-3d4bdbac44c1-1.html',
    cookies=cookies,
    headers=headers,
)
SprCookie = requests.utils.dict_from_cookiejar(response.cookies)
with open('./123.html', 'w', encoding='utf-8') as f:
    f.write(response.text)
