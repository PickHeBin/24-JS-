from lxml import etree
import requests
import re
import execjs
import json
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)



class CnTaiping:
    def __init__(self,):
        self.url = "https://autopp.tpi.cntaiping.com/web/home/index.html"
        self.headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
        'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
    }


    def first_request(self):
        first_response = requests.get(url=self.url, headers=self.headers)
        # print(first_response.text)
        print("服务端第一次返回 xxuhoztF0eZsO 的值为:              +】", first_response.cookies)
        html = etree.HTML(first_response.text)
        ts_cd = html.xpath('//script[@r="m"]/text()')[0]
        content = re.findall(r'<meta\s+id=".*?"\s+content="([^"]+)"', first_response.text, re.S)[0]
        conid = re.findall(r'<meta\s+id="([^"]+)"', first_response.text)[0]
        print("读取第一次返回的js文件并生成cookie-> xxuhoztF0eZsP  +】")
        print(conid)
        script_src = re.findall(r'<script type="text/javascript"[^>]*src="([^"]+)"', first_response.text)
        for script in script_src:
            script_src = script
        print("要获取的js地址是: ",script_src)
        jsCodeurl = ("https://autopp.tpi.cntaiping.com"+script_src)
        firstjs_response = requests.get(url=jsCodeurl, headers=self.headers)
        with open('cntaipingJsfile.js', 'w', encoding='utf-8') as file:
            file.write(str(firstjs_response.text))

        with open('./newcntaiping.js', 'r', encoding='UTF-8') as file:
            # file = file.read().replace("'arg2_function'", ts_cd)
            file = file.read().replace("arg1_content", content).replace("'arg2_function'", ts_cd).replace("conid", conid)
            print(file)
        js = execjs.compile(file)
        cookie = js.call('get_cookie')
        cookie = json.loads(cookie)
        all_cookie = re.findall('(.*?); path=/;', cookie, re.S)[0]
        list_cookie = all_cookie.split('=')
        print("生成的cookie  <xxuhoztF0eZsP>的结果：              +】", list_cookie)
        cookie = {
            "xxuhoztF0eZsO": first_response.cookies.get("xxuhoztF0eZsO"),
            list_cookie[0]: list_cookie[1]
        }
        return cookie


    def second_request(self):
        print("进行第一次请求：                                             +】")
        cookies = self.first_request()
        print("整合并传输过来的两个cookies是:                    +】", cookies)
        headers =  {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
            'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
        }
        # response = requests.get(url="https://autopp.tpi.cntaiping.com/web/home/index.html", cookies = cookies, headers=headers, verify=False)
        response = requests.get(url="https://autopp.tpi.cntaiping.com/web/home/index.html#/login", cookies = cookies, headers=headers, verify=False)
        print("确认请求的cookie内容: ",response.request.headers.get('Cookie'))
        # print(response.text)
        print("太平" in response.text)
        # print




if __name__ == '__main__':
    start_CnTaiping = CnTaiping()
    start_CnTaiping.second_request()
