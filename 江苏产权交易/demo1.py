# -*- coding: utf-8 -*-
# @Author   : HeLaoshi
# @File     : demo1.py
# @Project  : pythonProject2
import requests


url = 'https://www.jscq.com.cn/jscq/cqjy/jygg/cqzr/index.shtml'
response = requests.get(url).text
with open('./index123.html', 'w', encoding='utf-8') as f:
    f.write(response)