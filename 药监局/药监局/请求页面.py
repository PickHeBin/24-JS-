'''
@File    ：请求页面.py
@Author  ：cjt
@Date    ：2023/3/30 14:12 
'''

import os
import time

import requests
import execjs
from lxml.etree import HTML
import re
# os.environ["EXECJS_RUNTIME"] = "Node"
# print(os.environ)

class yjj():
    def __init__(self):
        self.cookie ={}
        self.session =requests.session()

    def get_t(self,response):
        self.cookie['gOEoYMGvg36yS'] = response.cookies.get('gOEoYMGvg36yS')
        content = re.findall('<meta content="(.*?)">', response.text)[0]
        functions = re.findall('<script type="text/javascript" r="m">(.*?)</script>', response.text)[0]
        # 执行js 获取 FSSBBIl1UgzbN7N80T
        with open('rs55_execjs.js', 'r', encoding='utf-8') as f:
            js_code = f.read().replace('content_data', content).replace("'functions_data'", functions)
        ctll = execjs.compile(js_code)
        T = ctll.call('get_cookie').split(';')[0]
        self.cookie[T.split('=')[0]]=T.split('=')[1]
        print(f' T 参数的长度为：  {len(T.split("=")[1])}')
    def main(self):

        headers = {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Referer": "https://www.nmpa.gov.cn/datasearch/home-index.html?79QlcAyHig6m=1680160001128",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        }
        # 2.第一次请求 获得 FSSBBIl1UgzbN7N80S  还有其中的 content 和 自执行方法
        url = "https://www.nmpa.gov.cn/datasearch/home-index.html"
        # url = "https://www.nmpa.gov.cn/datasearch/search-result.html"
        response = self.session.get(url, headers=headers)
        if response.status_code == 412:
            self.get_t(response)
            print(self.cookie)

        # 请求首页
        response = self.session.get(url, headers=headers, cookies=self.cookie)
        print(f"首页状态码返回  {response}")
        self.data_json()
        self.get_counts()



    def data_json(self):
        headers = {
            "Referer": "https://www.nmpa.gov.cn/datasearch/search-result.html",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        }
        url = "https://www.nmpa.gov.cn/datasearch/config/DATE.json"
        response = self.session.get(url, headers=headers, cookies=self.cookie)
        print(response.text)
        print(f"DATE.json状态码返回  {response}")

    def get_counts(self):

        headers = {
            "Referer": "https://www.nmpa.gov.cn/datasearch/home-index.html",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
            "sign": "9ef174e34d57909e7c8c2eb63cee96e5",
            "timestamp": "1680249117000",
            "token": "false"
        }
        name = '牛黄解毒片'
        times = str(int(time.time()) * 1000)
        sign_str = f"isSenior=N&itemIds=ff80808183cad75001840881f848179f&searchValue={name}&timestamp={times}"
        with open('Sign.js', 'r', encoding='utf-8') as f:
            js_code = f.read()
        ctll = execjs.compile(js_code)
        sign = ctll.call('get_sign', sign_str)
        print(f"生成的  sign: {sign}")
        headers['sign'] = sign
        headers['timestamp'] = times
        print(headers)
        url = "https://www.nmpa.gov.cn/datasearch/data/nmpadata/countNums"
        response = self.session.get(url, headers=headers, cookies=self.cookie)

        print(response.text)
        print(f"数量 状态码返回  {response}")


    # def get_json


def get_sign(headers):
    name = '牛黄解毒片'
    times = str(int(time.time()) * 1000)
    sign_str = f"isSenior=N&itemIds=ff80808183cad75001840881f848179f&searchValue={name}&timestamp={times}"
    with open('Sign.js', 'r', encoding='utf-8') as f:
        js_code = f.read()
    ctll = execjs.compile(js_code)
    sign = ctll.call('get_sign', sign_str)
    headers['sign'] = sign
    headers['timestamp'] = times

if __name__ == '__main__':

    yj=yjj()
    yj.main()
