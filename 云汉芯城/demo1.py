# -*- coding: utf-8 -*-
# @Author   : HeLaoshi
# @File     : demo1.py
# @Project  : pythonProject2
import requests

cookies = {
    'ICKEYACCESSTIME': '1695193429',
    'seaut': 'bb8fda8e3ea55c179dd461d9beb1bbea',
    'cdn_sec_tc': '76fdae1a17095403901383450ee94541a4e7ab032c8dd7e270eca0840d',
    'ICKEY_AB_UUID': '5baea42097b3873fa7a84ec7ab2b7365',
    'sajssdk_2015_cross_new_user': '1',
    'sensorsdata2015jssdkcross': '%7B%22distinct_id%22%3A%2218e088c39d688e-0caa95075b1466-26001b51-1768320-18e088c39d71ae1%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2218e088c39d688e-0caa95075b1466-26001b51-1768320-18e088c39d71ae1%22%7D',
    'ICKEY_AEG': '1',
    'acw_tc': '71dbc99e17095430595626745e29bb648b00117a7e3ff706b801a630d1',
    'ICKEYWWWID': '3d13ncblmu4eoc6m9r4h98bhc3',
    '_csrf': 'ee68530b56b7a1ce917788962168b829252fa1b10963d8720de618728fbeef02a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%2280BE-CY2kahNo4TG7O2Wv6NK3ibMFDuM%22%3B%7D',
    'ICKEY_ABTEST_DATAJSON': '{"ICKEY_AB_EXPIRE_TIME":1709543360000,"ICKEY_AB_UUID":"5baea42097b3873fa7a84ec7ab2b7365","ICKEY_AB_JUMP_NEW":"1","ICKEY_AB_EXP_UUID":"SBzYWxlcyBkaXJlY3Rvci","ICKEY_AB_EXP_NAME":"task_19525"}',
}

headers = {
    'authority': 'search.ickey.cn',
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'zh-CN,zh;q=0.7',
    'cache-control': 'no-cache',
    # 'cookie': 'ICKEYACCESSTIME=1695193429; seaut=bb8fda8e3ea55c179dd461d9beb1bbea; cdn_sec_tc=76fdae1a17095403901383450ee94541a4e7ab032c8dd7e270eca0840d; ICKEY_AB_UUID=5baea42097b3873fa7a84ec7ab2b7365; sajssdk_2015_cross_new_user=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2218e088c39d688e-0caa95075b1466-26001b51-1768320-18e088c39d71ae1%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2218e088c39d688e-0caa95075b1466-26001b51-1768320-18e088c39d71ae1%22%7D; ICKEY_AEG=1; acw_tc=71dbc99e17095430595626745e29bb648b00117a7e3ff706b801a630d1; ICKEYWWWID=3d13ncblmu4eoc6m9r4h98bhc3; _csrf=ee68530b56b7a1ce917788962168b829252fa1b10963d8720de618728fbeef02a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%2280BE-CY2kahNo4TG7O2Wv6NK3ibMFDuM%22%3B%7D; ICKEY_ABTEST_DATAJSON={"ICKEY_AB_EXPIRE_TIME":1709543360000,"ICKEY_AB_UUID":"5baea42097b3873fa7a84ec7ab2b7365","ICKEY_AB_JUMP_NEW":"1","ICKEY_AB_EXP_UUID":"SBzYWxlcyBkaXJlY3Rvci","ICKEY_AB_EXP_NAME":"task_19525"}',
    'pragma': 'no-cache',
    'referer': 'https://search.ickey.cn/?keyword=TPS7A3725DRVR',
    'sec-ch-ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Brave";v="122"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
}

params = {
    'sup_ids': '30',
    'keyword': 'VFBTN0EzNzI1RFJWUg==',
    'encode': 'base64',
    'v_': '_0x107687',
    'font_ident': '6a104615cec25b61',
    'v': '1709543090441',
    'p': '1aafafc0be8d73b854a1473e91f91e75',
    '_csrf': 'WjEzSTJITFZiAXEMHwsVZDFQWwddfBgRbX4BHkR.Ah1pWFEEdAw5Gw==',
    'get_res_time_point': '0',
    'v_sup_ids': '30',
    'ab_version': 'v5001',
}

response = requests.get('https://search.ickey.cn/main/search/ajax-get-res-v000', params=params, cookies=cookies, headers=headers)
