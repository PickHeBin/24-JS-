# -*- coding: utf-8 -*-

import requests,execjs,json
from lxml import etree
from urllib.parse import urljoin

url = "https://www.nmpa.gov.cn/index.html"
headers1 = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
headers2 = {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Pragma": "no-cache",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "Referer":"https://www.nmpa.gov.cn/"
}


s = requests.session()
req = s.get(url,headers = headers1)
req.encoding = "utf-8"
print(req.status_code,'第一次请求')

# 第一次请求返回的是个html
paseHtml = etree.HTML(req.content.decode())



arg1 = paseHtml.xpath('//meta/@content')[-1]
arg2 = paseHtml.xpath('//script/text()')[0]
func_url = urljoin(url, paseHtml.xpath('/html/head/script[2]/@src')[0])


# func = s.get(func_url, headers=headers2).text


# rs5_vmp的script编码是utf-8
with open("rs6_vmp.js", 'r', encoding="utf-8") as f:
    js_code = f.read().replace('xxx_arg1',arg1).replace('"xxx_arg2"',arg2)
# with open("new.js",'w+',encoding="utf-8") as ff:
#     ff.write(js_code)
cookie = execjs.compile(js_code).call('get_cookie')
# print("cookie ===> ",cookie)
cookies = {
    cookie.split('=')[0] : cookie.split('=')[1]
}
print(cookies)


req = s.get(url, headers= headers2,cookies=cookies)

print(req.status_code,'第二次请求')
print(req.content.decode('utf-8'))



