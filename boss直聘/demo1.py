# -*- coding: utf-8 -*-
# @Author   : HeLaoshi
# @File     : demo1.py
# @Project  : pythonProject2
import time

from curl_cffi import requests

cookies = {
    'lastCity': '101250100',
    'wd_guid': '50cc69c9-3a9f-4499-ba9f-48673d83a230',
    'historyState': 'state',
    '_bl_uid': 'nLlUdst4r78iFLmzm0wIldw30q8p',
    'gdxidpyhxdE': 'f8JIYS%2FOP0JbPCTy0v%2FaCzBGN7QTZ7uCNKXPJIoE9tnHHQBpJ%5CvZ0rrKvNnXTpD21fZ25GhfRSDwd0D2VhEn52NZWcxBPIDBCX6%5CIYWynns%2B1ig9PDGgX9NJPxisNNk48KItYz%2F77TK%2BJm2GI0GTJU%2FsZE%5CxLb2E9m%2BHRGCiq0OOKEZp%3A1708266970543',
    '__zp_seo_uuid__': '729064d6-4ed8-4b2d-8077-b9b91e0287f0',
    '__g': '-',
    '__l': 'r=https%3A%2F%2Fwww.google.com%2F&l=%2Fwww.zhipin.com%2Fchangsha%2F&s=1&g=&s=3&friend_source=0',
    '__c': '1708329848',
    '__a': '19512188.1708261195.1708265873.1708329848.15.3.3.15',
    '__zp_stoken__': '5bbdfZnR0wpHClHLCkF97ZnVrZmZrw5Zmbmdmd2ZmbmFMa0taa3PDmMOtw4Bdw5A/w5bCgGNoa05mwoRmY8KBZl/FrMOmZG1bQ8Otw4Bdw5A/w5ZrGWbDnsOmZsOCw6Zmw5jDpmZLZ3FrYmbCgGZjUFB8HX7EuMK1w6PFjcK4xoTEhTLDncOfw6jDncKgxJLDsMOyw77DnMOKLz3DtMSUw7LDnsOuw4sqxILDi8OkOVUbw6DDp8OOw6kpw6Y7OzQNNwooKy51wpAuI0J9f3oJCQkJw7k=',
}

headers = {
    'authority': 'www.zhipin.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.7',
    'cache-control': 'no-cache',
    # 'cookie': 'lastCity=101250100; wd_guid=50cc69c9-3a9f-4499-ba9f-48673d83a230; historyState=state; _bl_uid=nLlUdst4r78iFLmzm0wIldw30q8p; gdxidpyhxdE=f8JIYS%2FOP0JbPCTy0v%2FaCzBGN7QTZ7uCNKXPJIoE9tnHHQBpJ%5CvZ0rrKvNnXTpD21fZ25GhfRSDwd0D2VhEn52NZWcxBPIDBCX6%5CIYWynns%2B1ig9PDGgX9NJPxisNNk48KItYz%2F77TK%2BJm2GI0GTJU%2FsZE%5CxLb2E9m%2BHRGCiq0OOKEZp%3A1708266970543; __zp_seo_uuid__=729064d6-4ed8-4b2d-8077-b9b91e0287f0; __g=-; __l=r=https%3A%2F%2Fwww.google.com%2F&l=%2Fwww.zhipin.com%2Fchangsha%2F&s=1&g=&s=3&friend_source=0; __c=1708329848; __a=19512188.1708261195.1708265873.1708329848.14.3.2.14; __zp_stoken__=5bbdfUFDDmcOPwoDCvVMuGB8fJCJWLDlQK8KWVVAsUzpIUFA9PFZQUFUaPEAXw49jR8OudMOMwp7CvE8rPTpUUFBTOj1TGz1WxLvCuU8%2BHgnCvmVHw6xxw4kNdwvCjcK5DcSRw48gwrbCuSAvKS7Du8K%2BTzxROUzCvMOLw5NJw4%2FDoMOSScK%2Bw4vDlTw5UFFFUHMfI3ZQOUxLXApLaExydFcLY1hjKzlQOT3ElsKWw7xDTwkJDB8MICANCg0jIyIKDR8fDgkOICANCg04UMKzw4%2FCqcKMZMWTxJTEnsKaccK1cMOuWcSWb8KzwoXCjcKBw4J4wqjCrFfCrcKOwq3Cqn%2FDhnFlwoBNwrtde8OWwpPCqXDDkRjCh27ClE5taWxsInFxcBhQIUDCkMOJ',
    'pragma': 'no-cache',
    'referer': 'https://www.zhipin.com/web/geek/job?query=python&city=101250100&page=2',
    'sec-ch-ua': '"Not A(Brand";v="99", "Brave";v="121", "Chromium";v="121"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
}

params = {
    'scene': '1',
    'query': 'python',
    'city': '101250100',
    'experience': '',
    'payType': '',
    'partTime': '',
    'degree': '',
    'industry': '',
    'scale': '',
    'stage': '',
    'position': '',
    'jobType': '',
    'salary': '',
    'multiBusinessDistrict': '',
    'multiSubway': '',
    'page': 2,
    'pageSize': '30',
}

response = requests.get('https://www.zhipin.com/wapi/zpgeek/search/joblist.json', params=params, cookies=cookies,
                        headers=headers, impersonate="chrome110").json()
print(response)
