from lxml import etree
from pprint import *
import re
import requests
import execjs
import base64
import json
import time


api_url = "https://dps.kdlapi.com/api/getdps/?secret_id=ov2z3ggi9u0lou6nogry&signature=zsq7lcghkmveg1w922k85cwkxbatreh3&num=1&pt=1&format=text&sep=1"

# 获取API接口返回的代理IP
proxy_ip = requests.get(api_url).text

print(proxy_ip)
# 用户名密码认证(私密代理/独享代理)
username = "用自己的"
password = "用自己的"

requests = requests.session()

class Hg:
    def __init__(self):
        self.url = "https://www.gsxt.gov.cn/index.html"
        self.headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0',
        }
        self.proxies = {
            "http": "http://%(user)s:%(pwd)s@%(proxy)s/" % {"user": username, "pwd": password, "proxy": proxy_ip},
        }

    def jsl(self):
        response = requests.get(url=self.url, headers=self.headers, proxies=self.proxies)
        print("加速乐第一次请求的状态码:", response)
        resp = execjs.eval(re.findall(r"cookie=(.*?);location", response.text)[0])
        cookie = {
            "__jsl_clearance_s": re.findall(r"nce_s=(.*?); Max", resp)[0]
        }
        response = requests.get(url=self.url, headers=self.headers, cookies=cookie, proxies=self.proxies)
        print("加速乐第二次请求的状态码:", response)
        return response.text
    def resp_jsl(self, data):
        go = re.findall('};go\((.*?)\)</s', data)[0]
        __jsl_clearance_s1 = execjs.compile(open("国企信用公开(加速乐).js", mode="r", encoding="utf-8").read()).call("go",
                                                                                                                     go)
        cookie_jsl = {
            "__jsl_clearance_s": __jsl_clearance_s1.split('nce_s=')[-1]
        }
        resp = requests.get(url=self.url, headers=self.headers, cookies=cookie_jsl, proxies=self.proxies)
        print("加速乐第三次请求得到瑞数返回的状态码:", resp)
        return resp.text, cookie_jsl['__jsl_clearance_s']

    def main_rs_info(self, rs6):
        html_data = etree.HTML(rs6)
        content = html_data.xpath('//meta[2]/@content')[0]
        ts_js = html_data.xpath('//script[1]/text()')[0]
        return content, ts_js

    def execjs_data(self, content, ts_js, cookie_jsl):
        urls = "https://www.gsxt.gov.cn/n07TRG0QlbWf/KXrkY33P7haj.b4c45da.js"
        # 携带 加速乐的 cookie才能进行请求
        functo_code = requests.get(url=urls, headers=self.headers, cookies={"__jsl_clearance_s": cookie_jsl}).text
        with open("国企信用公开 (瑞数).js", mode="r", encoding="utf-8") as f:
            cookie_doc = f.read().replace('content_code', content).replace("'ts_code'", ts_js).replace("'functo_code'",
                                                                                                       functo_code)  # '"function_code"' 记一下
        cookie = {
            "T4kpbdTdBi5QP": execjs.compile(cookie_doc).call("rs6").split(';')[0].split("=")[-1],  # 瑞数 的 cookie
            "__jsl_clearance_s": cookie_jsl  # 加速乐的 cookie
        }
        return cookie

    def main_qe(self):
        data = self.jsl()
        rs6, cookie_jsl = self.resp_jsl(data)
        content, ts_js = self.main_rs_info(rs6)
        resp = self.execjs_data(content, ts_js, cookie_jsl)
        return resp

class JY(Hg):
    def __init__(self):
        super(JY, self).__init__()
        self.headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Proxy-Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        }
        self.cookies = None
        self.url_wou = "http://gcaptcha4.geetest.com/load"
        self.execjs_js = execjs.compile(open("国家企业公式系统(极验).js", mode="r", encoding="utf-8").read())
        self.uuid_challenge = self.execjs_js.call("uuid")  # 创建 challenge 的值
        self.ts = str(int(time.time() * 1000))  # 创建时间戳
        self.user = "xiaoajian"
        self.api_key = "bb743a2a395eec730fe480323e7bfdcf"
        self.captcha_id = "b608ae7850d2e730b89b02a384d6b9cc"

# ============================= 图鉴文字点选解析点选并返回坐标点 =============================================================
    def base64_api(self, img, imageback1, imageback2, imageback3):
        with open(img, 'rb') as f:
            base64_data = base64.b64encode(f.read())
            b64 = base64_data.decode()
        with open(imageback1, 'rb') as f:
            base64_data = base64.b64encode(f.read())
            b64s1 = base64_data.decode()
        with open(imageback2, 'rb') as f:
            base64_data = base64.b64encode(f.read())
            b64s2 = base64_data.decode()
        with open(imageback3, 'rb') as f:
            base64_data = base64.b64encode(f.read())
            b64s3 = base64_data.decode()
        data = {"username": "xiaoajian", "password": 'yuzhen123', "typeid": 27, "image": b64, "imageback1": b64s1,
                "imageback2": b64s2, "imageback3": b64s3}
        result = json.loads(requests.post("http://api.ttshitu.com/predict", json=data).text)
        if result['success']:
            return result["data"]["result"]
        else:
            # ！！！！！！！注意：返回 人工不足等 错误情况 请加逻辑处理防止脚本卡死 继续重新 识别
            return result["message"]

# 解析文字语序点选
    def base64_api_s(self, img):
        with open(img, 'rb') as f:
            base64_data = base64.b64encode(f.read())
            b64 = base64_data.decode()
        data = {"username": "xiaoajian", "password": 'yuzhen123', "typeid": 27, "image": b64}
        result = json.loads(requests.post("http://api.ttshitu.com/predict", json=data).text)
        if result['success']:
            return result["data"]["result"]
        else:
            # ！！！！！！！注意：返回 人工不足等 错误情况 请加逻辑处理防止脚本卡死 继续重新 识别
            return result["message"]

# ============================= 云码九宫图解析并返回坐标点 =============================================================
    # 九宫图识别
    def click_verify(self, image, label_image, extra=None, verify_type="30008"):
        _custom_url = "http://api.jfbym.com/api/YmServer/customApi"
        _headers = {
            'Content-Type': 'application/json'
        }
        payload = {
            "image": image,
            "label_image": label_image,
            "token": "rzfYESyuFUIBKieNdE-azr3aQbqPEJkW7Hb2QvdsYDo",
            "type": verify_type
        }
        if extra:
            payload['extra'] = extra
        resp = requests.post(_custom_url, headers=_headers, data=json.dumps(payload))
        return resp.json()['data']['data']

    def requestsss_two(self, return_data):
        # 保存图片
        requests_xiao = requests.get(url=return_data['slice_xiao']).content
        requests_da = requests.get(url=return_data['bg_da']).content
        with open("datu.png", mode="wb") as f:
            f.write(requests_da)
        with open("xiaotu.png", mode="wb") as f:
            f.write(requests_xiao)
        # 读取图片
        with open("datu.png", mode="rb") as datu:
            datu = base64.b64encode(datu.read()).decode("utf-8")
        with open("xiaotu.png", mode="rb") as xiaotu:
            xiaotu = base64.b64encode(xiaotu.read()).decode("utf-8")
        # 传入图片
        resp = self.click_verify(xiaotu, datu)
        return resp

# =============================== 九维图标点选解析点选并返回坐标点==============================================================
    def download_image(self, url):
        response = requests.get(url)
        img_data = response.content
        img_base64 = base64.b64encode(img_data).decode('utf-8')
        return img_base64
    def ReTasks(self, base64image, ques_base64):
        resp = requests.post("http://118.89.71.53:8879/api/ReTasks", data={
            "user": self.user,
            "api_key": self.api_key,
            "pro_id": "83",
            "keyword": ques_base64,
            "img_data": base64image
        })

        respjson = resp.json()
        print(resp.text)
        return respjson["data"]["task_id"]
    def DoTasks(self, id):
        resp = requests.post("http://118.89.71.53:8879/api/DoTasks", data={
            "user": "xiaoajian",
            "api_key": "bb743a2a395eec730fe480323e7bfdcf",
            "pro_id": "83",
            "task_id": id,
        })
        respjson = resp.json()
        return respjson

    def icon_det(self, bg, result):
        task_id = self.ReTasks(bg, result)
        for i in range(60):
            cx = self.DoTasks(task_id)
            print(cx)
            if cx["code"] == 100:
                return cx
            time.sleep(0.5)

# =======================================================================================================================

    def load_jy(self):
        self.cookies = self.main_qe()
        """
        发送第一次请求
        获取 process_token,
        lot_number 的值
        点选图片的大图
        点选图片的一号小图
        点选图片的二号小图
        点选图片的三号小图a
        """
        params = {
            'captcha_id': self.captcha_id,
            'client_type': 'web',
            'pt': '1',
            'lang': 'zho',
        }
        response = requests.get(url=self.url_wou, params=params, headers=self.headers, cookies=self.cookies, proxies=self.proxies).text
        resp = json.loads(response.replace("(", "").replace(")", ""))
        captcha_type = resp['data']['captcha_type']
        print(captcha_type)
        if captcha_type == 'word':
            process_token = re.findall(r'process_token":"(.*?)","pay', response)[0] # 获取 process_token
            payload = re.findall(r'"payload":"(.*?)","process_t', response)[0]  # 获取 payload
            lot_number = re.findall(r'lot_number":"(.*?)","captch', response)[0] # 获取 lot_number
            datetime = re.findall(r'datetime":"(.*?)","hash', response)[0]  # 获取 datetime
            imgs_url = "http://static.geetest.com/" + re.findall(r'"imgs":"(.*?)","ques', response)[0]
            ques_url = (re.findall(r'ques":(.*?),"js":', response)[0]).replace("[", "").replace("]", "").replace('"', '') # 获取 ques_url
            ques_url_1 = "http://static.geetest.com/" + ques_url.split(",")[0]
            ques_url_2 = "http://static.geetest.com/" + ques_url.split(",")[1]
            ques_url_3 = "http://static.geetest.com/" + ques_url.split(",")[2]

            return {
                "type_name": "word",
                "process_token": process_token,  # 最终请求携带的参数
                "payload": payload,  # 最终请求携带的参数
                "datetime": datetime,  # 生成 w 请求携带的参数
                "lot_number": lot_number,  # 最终请求携带的参数
                "imgs_url": imgs_url,   # 点选图片的大图
                "ques_url_1": ques_url_1,  # 点选图片的一号小图
                "ques_url_2": ques_url_2,  # 点选图片的二号小图
                "ques_url_3": ques_url_3,  # 点选图片的三号小图
            }

        elif captcha_type == 'icon':
            response_info = json.loads(response.replace("(", "").replace(")", ""))
            lot_number = response_info['data']['lot_number']
            payload = response_info['data']['payload']
            process_token = response_info['data']['process_token']
            datetime = response_info['data']['pow_detail']['datetime']
            imgs_url = "https://static.geetest.com/" + response_info['data']['imgs']
            ques_url_ques = response_info['data']['ques']
            ques_url_1 = "https://static.geetest.com/" + response_info['data']['ques'][0]
            ques_url_2 = "https://static.geetest.com/" + response_info['data']['ques'][1]
            ques_url_3 = "https://static.geetest.com/" + response_info['data']['ques'][2]
            bg = self.download_image(imgs_url)
            result = ','.join(ques_url_ques)
            click = self.icon_det(bg, result)
            return {
                "type_name": "icon",
                "process_token": process_token,  # 最终请求携带的参数
                "payload": payload,  # 最终请求携带的参数
                "datetime": datetime,  # 生成 w 请求携带的参数
                "lot_number": lot_number,  # 最终请求携带的参数
                "imgs_url": imgs_url,  # 点选图片的大图
                "ques_url_1": ques_url_1,  # 点选图片的一号小图
                "ques_url_2": ques_url_2,  # 点选图片的二号小图
                "ques_url_3": ques_url_3,  # 点选图片的三号小图
                "click": click
            }

        elif captcha_type == 'phrase':
            response_info = json.loads(response.replace("(", "").replace(")", ""))
            lot_number = response_info['data']['lot_number']
            payload = response_info['data']['payload']
            process_token = response_info['data']['process_token']
            datetime = response_info['data']['pow_detail']['datetime']
            slice_xiao = "https://static.geetest.com/" + response_info['data']['imgs']
            return {
                "type_name": "phrase",
                "lot_number": lot_number,
                "payload": payload,
                "process_token": process_token,
                "datetime": datetime,
                "slice_xiao": slice_xiao,
            }

        elif captcha_type == "nine":
            response_info = json.loads(response.replace("(", "").replace(")", ""))
            lot_number = response_info['data']['lot_number']
            payload = response_info['data']['payload']
            process_token = response_info['data']['process_token']
            datetime = response_info['data']['pow_detail']['datetime']
            slice_xiao = "https://static.geetest.com/" + response_info['data']['imgs']
            bg_da = "https://static.geetest.com/" + response_info['data']['ques'][0]
            return {
                "type_name": "nine",
                "lot_number": lot_number,
                "payload": payload,
                "process_token": process_token,
                "datetime": datetime,
                "slice_xiao": slice_xiao,
                "bg_da": bg_da,
            }
        else:
            return {
                "type_name": "没有以上的验证码!!!",
            }

    def requests_imgs_url(self, response):
        resp_ques_url_1 = requests.get(response['ques_url_1']).content
        resp_ques_url_2 = requests.get(response['ques_url_2']).content
        resp_ques_url_3 = requests.get(response['ques_url_3']).content
        resp_imgs_url = requests.get(response['imgs_url']).content
        f_1 = open("xiaotu_1.png", "wb")
        f_2 = open("xiaotu_2.png", "wb")
        f_3 = open("xiaotu_3.png", "wb")
        f_4 = open("datutu.png", "wb")
        f_1.write(resp_ques_url_1)
        f_2.write(resp_ques_url_2)
        f_3.write(resp_ques_url_3)
        f_4.write(resp_imgs_url)

    def requests_imgs_url_ss(self, response):
        resp_imgs_url = requests.get(response['imgs_url']).content
        f_4 = open("datutu.png", "wb")
        f_4.write(resp_imgs_url)

    def geetest_click(self, click_xy):
        encrypted_points = []
        for x, y in [tuple(map(int, point.split(','))) for point in click_xy.split('|')]:
            encrypted_x = round(x / 300 * 10000)
            encrypted_y = round(y / 200 * 10000)
            encrypted_points.append(f"{encrypted_x},{encrypted_y}")  # 将加密后的坐标转换为字符串
        # 将字符串列表转换为整数列表
        encrypted_result_list = [list(map(int, point.split(','))) for point in encrypted_points]
        return encrypted_result_list

    def resoonse_tow(self, data_load_jy, execjs_js_w):
        params = {
            'captcha_id': self.captcha_id,
            'client_type': 'web',
            'lot_number': '{}'.format(data_load_jy['lot_number']),
            'payload': '{}'.format(data_load_jy['payload']),
            'process_token': '{}'.format(data_load_jy['process_token']),
            'payload_protocol': '1',
            'pt': '1',
            # w 需要逆向
            'w': '{}'.format(execjs_js_w)
        }
        print(len(execjs_js_w))
        time.sleep(2)
        response = requests.get('http://gcaptcha4.geetest.com/verify', params=params, headers=self.headers, cookies=self.cookies, proxies=self.proxies)
        resp = json.loads(response.text.replace("(", "").replace(")", ""))
        return {
            "captcha_output": resp["data"]['seccode']['captcha_output'],
            "gen_time": resp["data"]['seccode']['gen_time'],
            "lot_number": resp["data"]['seccode']['lot_number'],
            "pass_token": resp["data"]['seccode']['pass_token']
        }

    def requests_info_data(self, params):
        url = "https://www.gsxt.gov.cn/corp-query-search-1.html"
        data = {
            "tab": "ent_tab",
            "province": "",
            "geetest_challenge": "",
            "geetest_validate": "",
            "geetest_seccode": "",
            "lot_number": params.get("lot_number"),
            "captcha_output": params.get("captcha_output"),
            "pass_token": params.get("pass_token"),
            "gen_time": params.get("gen_time"),
            "captchaId": self.captcha_id,
            "token": "111634655",
            "searchword": "海信"
        }

        pprint(data)
        time.sleep(2)
        response = requests.post(url, headers=self.headers, cookies=self.cookies, data=data)

        print(response.text)
        print(response)

    def jy_shibie(self):
        data = self.load_jy()
        lot_number = data['lot_number']
        print(lot_number)
        # 文字点选
        if data.get("type_name") == "word":
            self.requests_imgs_url(data)
            resp_zuobiao = self.base64_api("datutu.png", "xiaotu_1.png", "xiaotu_2.png", "xiaotu_3.png") # 传入四张图片 主图在第一位, 其余按请求顺序排序
            click_data = self.geetest_click(resp_zuobiao)
            print(click_data)
            get_sign = self.execjs_js.call("sign_ss", data['datetime'], lot_number)
            print("sign:", get_sign)
            get_w = self.execjs_js.call("get_w", click_data, lot_number, data['datetime'], get_sign.get("sign"),get_sign.get("pow_msg"))
            resp = self.resoonse_tow(data, get_w)
            self.requests_info_data(resp)


        # 语句点选
        elif data.get("type_name") == "phrase":
            response = requests.get(url=data['slice_xiao']).content
            with open("tu.png", "wb") as f:
                f.write(response)
            with open("tu.png", mode="rb") as f:
                f = f.read()
            data_info = self.base64_api_s("tu.png")
            click_data = self.geetest_click(data_info)
            get_sign = self.execjs_js.call("sign_ss", data['datetime'], lot_number)
            print("sign:", get_sign)
            get_w = self.execjs_js.call("get_w", click_data, lot_number, data['datetime'], get_sign.get("sign"),get_sign.get("pow_msg"))
            resp = self.resoonse_tow(data, get_w)
            self.requests_info_data(resp)


        # 图标点选
        elif data.get("type_name") == "icon":
            self.requests_imgs_url(data)
            info_list = list()
            click = data['click']['data']['list']
            for i in click:
                # 直接将每对数字转换为字符串，并用逗号连接
                info_list.append(','.join(map(str, i['info'])))
            # 使用'|'连接所有部分
            result = '|'.join(info_list)
            print("我是图标点选:", result)
            click_data = self.geetest_click(result)
            print(click_data)
            get_sign = self.execjs_js.call("sign_ss", data['datetime'], lot_number)
            print("sign:", get_sign)
            get_w = self.execjs_js.call("get_w", click_data, lot_number, data['datetime'], get_sign.get("sign"),get_sign.get("pow_msg"))
            # cookie 值为1376 合格
            print(len(get_w))
            # print("这是 w 的值:", get_w)
            resp = self.resoonse_tow(data, get_w)
            self.requests_info_data(resp)


        # 九宫图验证
        elif data.get("type_name") == "nine":
            click_xy = self.requestsss_two(data)
            print(click_xy)
            get_sign = self.execjs_js.call("sign_ss", data['datetime'], self.captcha_id, data['lot_number'])
            print(get_sign)
            w = self.execjs_js.call("get_w", click_xy, data['lot_number'], data['datetime'],get_sign.get("sign"), get_sign.get("pow_msg"))
            resp = self.resoonse_tow(data, w)
            self.requests_info_data(resp)


        elif data.get("type_name") == "没有以上的验证码!!!":
            print("没有以上的验证码!!!")

    def main(self):
        self.jy_shibie()


if __name__ == '__main__':
    jy = JY()
    jy.main()






















