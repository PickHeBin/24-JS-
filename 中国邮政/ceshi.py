# import base64
# import hashlib
# from loguru import logger
#
# consult_code = "9858638312956"
# def get_ticket_(_time, _capcode, _type):
#     o = _time
#     logger.info(o)
#     n = o[0:3]
#     logger.info(n)
#     r = o[3:]
#     logger.info(r)
#     l = ""
#     if _type == "verify":
#         l = "1163FA15CC9A425EA4B65B2A218FF5F8"
#     elif _type == "track":
#         l = "053B245CB1B74EBBB5FBB4A5889D66B8"
#     else:
#         pass
#     logger.info(l)
#     c = _capcode
#     logger.info(c)
#     u = consult_code + n + l + r + c
#     g = hashlib.md5(u.encode('utf-8')).hexdigest().upper()
#     d = hashlib.md5(g.encode('utf-8')).hexdigest().upper()
#     m = base64.b64encode(d.encode('utf-8')).decode('utf-8')
#     return m
#
# logger.info(get_ticket_('1710929800197', 'bce416ca6cf24dbab3974e1f4f3d16dc20240320', 'track'))
import requests


headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Language": "zh-CN,zh;q=0.9",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
    "Content-Type": "application/json;charset=UTF-8",
    "Origin": "https://wcjs.sbj.cnipa.gov.cn",
    "Pragma": "no-cache",
    "Referer": "https://wcjs.sbj.cnipa.gov.cn/list",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
}
cookies = {
    "goN9uW4i0iKzO": "60h3htx1w0z7ZSJ0a1cdYx0fuSRSu89oGkxHv3Sh4zu4ElIyJtyg0WyXXDQ4GHvzvlCS1tWFyqyYazVeCRFCvAma",
    "wcjs_cookie": "27005561",
    "JSESSIONID": "kbGXOHvZeqBBR6bovtT1vRShsF9A1WM9-gbV8U17",
    "enable_goN9uW4i0iKz": "true",
    "goN9uW4i0iKzP": "02lrBHtxHDTG7BDLT5bAa_qXvIEXU8tg0zFxvdCdoTmlp46qbaXeRxy5ttUDW544o9E56EUu7APCy2CC6dly0Dq2n7v5vK1vM_0EPWSCNT2mFDHLWpTAic__anMHH4nrqJGuxfPme_QjVknLZJjkf.K31sWKOawYNJA8ZWUO7P6zKCwlL3ElZMCjHcoI0.puKPu6P2F.oOIc66TUr6A6xTOUCOUga8I2ZflL_oFJU2Ko3xyrE4HDaRR.Iy3opco3pWpQHkf.0FZ9JBuSQYqMtET5hPEU.tNThViY1.mRmSINA.wR.S6Xn.9as2QMH2Qtfvhp3rxQL.liTm3x0x1IwY02DhgKYoI9jOuhEhqinCDNHFgYYI6RbQgvn8e4g2qW6"
}
url = "https://wcjs.sbj.cnipa.gov.cn/api/so/com"
params = {
    "vq5IcBqe": "0zxxl2AlqEHhYjXoOpaZ3nPkm2TSCWxD.daKebG3Ifc0QeX0hQMmCEhgsn61Dh2pQuZTxNTRIJNFGvtaHx2yJz6aUxvmjZs1t"
}
data = {
    "b9La8sqW": "0YZfsSalqEHhYjXoOpaZ3nPkm2TSCWxD.daKebG3Ifc0QeX0hQMmC3DRBkBxRva.Zvi4HSTTE1hH4_duQj8D30mt8rSy8TpOmc5ub5CdgN4v7sSz95tdVxEHQtOFfyYAQ0ixIppk0TPJakFnVU.9BNwf0kI.H7ZCegbnBiickSQB9DnBovXXyeA"
}
response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data)

print(response.text)
print(response)