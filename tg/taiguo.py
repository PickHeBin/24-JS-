import re
from curl_cffi import requests
import subprocess
from functools import partial
subprocess.Popen = partial(subprocess.Popen, encoding='utf-8')
import execjs
headers={

    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
}
res=requests.get('https://www.cathaypacific.com/EsGGW/Ld/pe/Inxg/WXWTw4t/Oh1Jp4wNt0u17N/Lw9CD1Y_SwE/KQ5/6JHRlaWcB'
                 ,headers=headers,impersonate='chrome110')
print(res.headers)
call=execjs.compile(open('astgg.js','r',encoding='utf-8').read())
cook_abck=re.findall('_abck=(.*?);', str(res.headers))[0]
bz=re.findall('bm_sz=(.*?);', str(res.headers))[0]

data={
'sensor_data':call.call('getresult',cook_abck,bz)
}
cookiest={
    'bm_sz':bz,
    # 'QueueITAccepted-SDFrts345E-V3_cxpr01': cxpr01,
    # 'polling_request':'1',
    # 'utag_main':nmain,
    # 'AMCV_21683A5857FCAE5A0A495DC5%40AdobeOrg':"1176715910%7CMCIDTS%7C19670%7CvVersion%7C5.4.0",
    '_abck': cook_abck
}
resb=requests.post('https://www.cathaypacific.com/EsGGW/Ld/pe/Inxg/WXWTw4t/Oh1Jp4wNt0u17N/Lw9CD1Y_SwE/KQ5/6JHRlaWcB'
                   ,json=data,headers=headers,cookies=cookiest,impersonate='chrome110')
print(resb.headers.get("Set-Cookie"))

