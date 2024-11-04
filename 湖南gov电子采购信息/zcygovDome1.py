# -*- coding: utf-8 -*-
# @Author   : HeLaoshi
# @File     : zcygovDome1.py
# @Project  : pythonProject
import requests

cookies = {
    'ssxmod_itna': 'QqGxgDciDtD=7qCq0dGQDHYySeeTjq0Kw20Iimi3TND/SiIDnqD=GFDK40EoMIP4FYWrx4e6WQ0wh3ez20gvsX4PSc2idlQx0aDbqGkqBnC4GGnxBYDQxAYDGDDP1Dj4ibDYRUODjlUzzMZF8DWKDKx0kDY5DwrBkDYPDWxDFXaieelImzZ98DeKD0xD1YKSGDDPDao5xDG5x2tWqIrDDElKzzEYhQtSDBcr5XxG1DQ5DshDR8K8RdTGsBxj099b8Y+YDvxDkN857QzhCDfvO98rq6WrqTeWP81W5qn24KnDxq0R5reRD=WxVPw37DqiDhceB6pG0iWgNygxxD==',
    'ssxmod_itna2': 'QqGxgDciDtD=7qCq0dGQDHYySeeTjq0Kw20Iimi3TG97MSKSDBd8Eq7pxC7ggBCr8AwFv3r0ObHAOqfjLR0xhfQL24CD8Eqx+=qE1vX31yfw0XC15G7FyC0QQuCP1=IXqhZg02cAfO1x2Ccav4U2wtdi7+jrBkKnPYypaW8ahzPQ54Ypp4zpa48ZgDW8WOYYKpKGaFTx8f8chxSQ0C63aeYFhxn90slhTH7+9kKTTpBCeAihpTYtDbqYvOpUn63qIIUSytW2YHlW2+kaKQctq6awFPgYK==DvMAP2tsCFSqah99zw+B5deQXOQt+GU0OelE6LhmSAEOg5lOo6amhA=niLugw6ewFcxVP+PjDnjp5YLKjKnlGyld17DwlA1e32DA7AU7=DkgfSjpSlxDEvjYPb3407KUYhnGqhGXt7rEhK7GPdOmPAuKYuShNhKniYK404DQK8D08DiQ4YD==',
}

headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    # 'Cookie': 'ssxmod_itna=QqGxgDciDtD=7qCq0dGQDHYySeeTjq0Kw20Iimi3TND/SiIDnqD=GFDK40EoMIP4FYWrx4e6WQ0wh3ez20gvsX4PSc2idlQx0aDbqGkqBnC4GGnxBYDQxAYDGDDP1Dj4ibDYRUODjlUzzMZF8DWKDKx0kDY5DwrBkDYPDWxDFXaieelImzZ98DeKD0xD1YKSGDDPDao5xDG5x2tWqIrDDElKzzEYhQtSDBcr5XxG1DQ5DshDR8K8RdTGsBxj099b8Y+YDvxDkN857QzhCDfvO98rq6WrqTeWP81W5qn24KnDxq0R5reRD=WxVPw37DqiDhceB6pG0iWgNygxxD==; ssxmod_itna2=QqGxgDciDtD=7qCq0dGQDHYySeeTjq0Kw20Iimi3TG97MSKSDBd8Eq7pxC7ggBCr8AwFv3r0ObHAOqfjLR0xhfQL24CD8Eqx+=qE1vX31yfw0XC15G7FyC0QQuCP1=IXqhZg02cAfO1x2Ccav4U2wtdi7+jrBkKnPYypaW8ahzPQ54Ypp4zpa48ZgDW8WOYYKpKGaFTx8f8chxSQ0C63aeYFhxn90slhTH7+9kKTTpBCeAihpTYtDbqYvOpUn63qIIUSytW2YHlW2+kaKQctq6awFPgYK==DvMAP2tsCFSqah99zw+B5deQXOQt+GU0OelE6LhmSAEOg5lOo6amhA=niLugw6ewFcxVP+PjDnjp5YLKjKnlGyld17DwlA1e32DA7AU7=DkgfSjpSlxDEvjYPb3407KUYhnGqhGXt7rEhK7GPdOmPAuKYuShNhKniYK404DQK8D08DiQ4YD==',
    'Pragma': 'no-cache',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Edg/125.0.0.0',
    'sec-ch-ua': '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
}

params = {
    'utm': 'luban.luban-PC-41.79-hunan-news-publicity-pc.1.88b25f50f47b11ee96c65521087eff6a',
}

response = requests.get('https://hunan.zcygov.cn/luban/announcement/list', params=params, cookies=cookies, headers=headers)
print(response.cookies.get_dict())