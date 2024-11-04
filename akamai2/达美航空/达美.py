import re
import time
import execjs
from curl_cffi import requests


class DMHK:
    def __init__(self):
        self.base_url = 'https://zh.delta.com'
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',

        }
        self.cookies = {}
        self.start_time = int(time.time() * 1000)

    def req(self):
        import requests
        response_1 = requests.get(self.base_url + '/cn/zh', headers=self.headers)
        # print(response_1.text)
        wl_url = self.base_url + re.findall(r'src=".*?"></script></body></html>', response_1.text)[0].split('"')[1]
        # print(wl_url)
        self.cookies = response_1.cookies.get_dict()
        _abck = self.cookies.get('_abck')
        print('首页返回:', _abck)
        return wl_url

    def first_req(self, wl_url):
        self.headers['Origin'] = 'https://zh.delta.com'
        self.headers['Referer'] = 'https://zh.delta.com/cn/zh'
        response_2 = requests.get(url=wl_url, headers=self.headers, cookies=self.cookies, impersonate='chrome110')
        print('第一次外链返回：', response_2.cookies.get('_abck'))
        _abck = response_2.cookies.get("_abck")
        self.cookies['_abck'] = _abck

    def second_req(self, wl_url, url):
        with open('akam_1.js', encoding='utf-8') as f:
            js_code = f.read()
        sensor_data = execjs.compile(js_code).call('main', self.cookies['_abck'], url, self.cookies['bm_sz'],
                                                   self.start_time)
        data = {'sensor_data': sensor_data}
        response_3 = requests.post(wl_url, headers=self.headers, cookies=self.cookies, json=data,
                                   impersonate='chrome110')
        print('第二次外链返回：', response_3.cookies.get('_abck'))
        _abck = response_3.cookies.get('_abck')
        self.cookies['_abck'] = _abck

    def third_req(self, wl_url, url):
        with open('akam_2.js', encoding='utf-8') as f:
            js_code = f.read()
        sensor_data = execjs.compile(js_code).call('main', self.cookies['_abck'], url, self.cookies['bm_sz'],
                                                   self.start_time)
        data = {'sensor_data': sensor_data}
        response_4 = requests.post(wl_url, headers=self.headers, cookies=self.cookies, json=data,
                                   impersonate='chrome110')
        print('第三次外链返回：', response_4.cookies.get("_abck"))
        _abck = response_4.cookies.get('_abck')
        # print(_abck)
        self.cookies['_abck'] = _abck

    def fourth_req(self, wl_url, url):
        with open('akam_3.js', encoding='utf-8') as f:
            js_code = f.read()
        sensor_data = execjs.compile(js_code).call('main', self.cookies['_abck'], url, self.cookies['bm_sz'],
                                                   self.start_time)
        data = {'sensor_data': sensor_data}
        response_5 = requests.post(wl_url, headers=self.headers, cookies=self.cookies, json=data,
                                   impersonate='chrome110')
        _abck = response_5.cookies.get('_abck')
        self.cookies['_abck'] = _abck
        print('第四次外链返回：', _abck)

    def fifth_req(self, wl_url, url):
        with open('script.js', encoding='utf-8') as f:
            js_code = f.read()
        sensor_data = execjs.compile(js_code).call('main', self.cookies['_abck'], url, self.cookies['bm_sz'],
                                                   self.start_time)
        data = {'sensor_data': sensor_data}
        response_6 = requests.post(wl_url, headers=self.headers, cookies=self.cookies, json=data,
                                   impersonate='chrome110')
        _abck = response_6.cookies.get('_abck')
        print('第五次外链返回：', _abck)
        print(response_6.text)

    def main(self):
        url = "https://zh.delta.com/cn/zh"
        wl_url = self.req()
        self.first_req(wl_url)
        self.second_req(wl_url, url)
        self.third_req(wl_url, url)
        self.fourth_req(wl_url, url)
        self.fifth_req(wl_url, url)


if __name__ == '__main__':
    dmhk = DMHK()
    dmhk.main()
