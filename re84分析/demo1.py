# -*- coding: utf-8 -*-
# @Author   : HeLaoshi
# @File     : demo1.py
# @Project  : pythonProject2
from curl_cffi import requests

cookies = {
    'TrackingId': '96dd8976-f496-410c-b8e4-6228c84a5fa2',
    'ASLBSA': '0003a231a57caabde4e0aefdbf30bb2a992631e1fc64078c9a056deaf3caa3edeff4',
    'ASLBSACORS': '0003a231a57caabde4e0aefdbf30bb2a992631e1fc64078c9a056deaf3caa3edeff4',
    'anonymousFeatureFlagId': '402653f7-e174-4d86-baf0-8e2ce8a50034',
    'reese84': '3:A5k6/CqmTKkDtHMMSS8foQ==:Czr94RjI/ZenqljQXRBpt2bCeSqNKYW77BF+IFjr1CY1d12C/55/m8OZKdwUNpzLJh+uXE4SPY3d+trkBoJmDTf7tdeAlv2a56+5r+WGNPI4m6HFrq0KGy928G1HrajM3qLiK/03YjyU8a2tGKOwPG/acJfxr3+stCYLNKuFmbtR6u1bpgNfP0DmRZE+CfeaWc7xzdROtpAdUQ0sTZ2V6gfhjOeJ2J6JiA0GENluiv2a97sdIrYGP5i00AmBnzijLywwDUIuQFRQhf+UrbZvSvG2pVBw+oOxMiJhi2mT/wdVZ7u2lhKiMqgqrwJkh72p60NIBkZJ1ZxP1K8pooyvGryUM1IUjjcxnS2jBBmFfwhNc4HldBBKkSBYVgxXlE/eoZcWzaHkpPI6uA7lZsdgaKq9uzgHhA8yRxzMNwmlpFHAnz4aY9Mq2VTYu4I8pncM8e05tDMEBt8UIi1edbMhEQ==:WWzBu8CFOU8kaHILWUZ8LLw5FHtzhjc9XAtJhacsets=',
}

headers = {
    'authority': 'www.flysas.com',
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh',
    'cache-control': 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    # 'cookie': 'TrackingId=96dd8976-f496-410c-b8e4-6228c84a5fa2; ASLBSA=0003a231a57caabde4e0aefdbf30bb2a992631e1fc64078c9a056deaf3caa3edeff4; ASLBSACORS=0003a231a57caabde4e0aefdbf30bb2a992631e1fc64078c9a056deaf3caa3edeff4; anonymousFeatureFlagId=402653f7-e174-4d86-baf0-8e2ce8a50034; reese84=3:A5k6/CqmTKkDtHMMSS8foQ==:Czr94RjI/ZenqljQXRBpt2bCeSqNKYW77BF+IFjr1CY1d12C/55/m8OZKdwUNpzLJh+uXE4SPY3d+trkBoJmDTf7tdeAlv2a56+5r+WGNPI4m6HFrq0KGy928G1HrajM3qLiK/03YjyU8a2tGKOwPG/acJfxr3+stCYLNKuFmbtR6u1bpgNfP0DmRZE+CfeaWc7xzdROtpAdUQ0sTZ2V6gfhjOeJ2J6JiA0GENluiv2a97sdIrYGP5i00AmBnzijLywwDUIuQFRQhf+UrbZvSvG2pVBw+oOxMiJhi2mT/wdVZ7u2lhKiMqgqrwJkh72p60NIBkZJ1ZxP1K8pooyvGryUM1IUjjcxnS2jBBmFfwhNc4HldBBKkSBYVgxXlE/eoZcWzaHkpPI6uA7lZsdgaKq9uzgHhA8yRxzMNwmlpFHAnz4aY9Mq2VTYu4I8pncM8e05tDMEBt8UIi1edbMhEQ==:WWzBu8CFOU8kaHILWUZ8LLw5FHtzhjc9XAtJhacsets=',
    'pragma': 'no-cache',
    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
}

params = {
    'to': 'CPH',
    'from': 'PVG',
    'outDate': '20240403',
    'adt': '1',
    'chd': '0',
    'inf': '0',
    'yth': '0',
    'bookingFlow': 'revenue',
    'pos': 'cn',
    'channel': 'web',
    'displayType': 'upsell',
}

response = requests.get('https://www.flysas.com/api/offers/flights', params=params, cookies=cookies, headers=headers, impersonate="chrome110")
print(response.json())