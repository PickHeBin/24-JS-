// 第1个加载     window 和 memory 这2个是框架中是最重要的  !!!!!!!!!!!!!!!!!!
//加载全局window变量
try{
    window = global;
}catch{
    window = this;
}
//JSON.stringify([window.byd++,_$$3,_$i6],function(k,v){if(!Array.isArray(v) && typeof(v)=='object'){return v+''}else{return v}})
// 全局存储器
memory  = {
    'setProxy': false,                                       // 是否进行代理(代理的对象是补的环境对象的每一个对象)
    'setLog':true,                                          // 是否输出 set捕获的日志
    'getLog': true,                                          // 是否输出 get捕获的日志
    'setDebugger': false,                                    // 是否断点 set捕获
    'getDebugger':false,                                     // 是否断点 get捕获
    'funTostringDebugger':false,                             // 函数tostring检测  正常代码谁toString啊
    'callFunDebugger': false,                                // 调用了补的函数是否断点
    'node':[],                                               // 存放运行中window的undefined变量  最后直接去node遍历里面输出是否undefined 突破node检测
    'nodes':{},                                              // 存放undefined
    'order':0,                                               // 日志的输出排序号码 (便于查看位置)
    'log':0,                                                 // 插桩输出序号定位
    'passOrder':0 ,                                          // 跳过低于这个序号的代理断点
    'random':false,                                            // hook随机数
    'timestamp': false,                              // hooks时间戳
    'data':{},                                               // 存放本地模拟的对象
    'cookies': {},                                           // 存放cookie
    'EventListener':{},                                      // 存放事件
    'attachEvent': {},                                       // 存放事件
    'create_element': {},                                    // 存放创建dom的元素方法
    'objects': {},                                           // 存放一些对象
    'domElement' : {'body':{}},                              // 存放html的dom层级关系
    'promise':{},
    'tree':{},
    'neihe_data': "Google Inc. (NVIDIA)",
    'xianka_data': "ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Laptop GPU Direct3D11 vs_5_0 ps_5_0, D3D11)",
    'userAgent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    'canvas_toDataURL': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAyCAYAAAAZUZThAAAAAXNSR0IArs4c6QAAEcdJREFUeF7tXGl4FcW2XdXjmTIxRq4IMl1z4QoE44ADSK6AyEMGZQZRZkKYQUCRUcTITAAjIDiAIigyI6BcRRAMAWSIqKAgGBAhIckZu7u63tcdTyB44AHf4X7n5Xb/gk7Xrtpr1apde1clhE2rxmA9EYMAGf0ziZjBWAMBsQQSWbPAEkiE8WEJJMIIsSJIRBFiRZCIogOwIkhkEWIJJLL4sAQSaXxYW6zIYsSKIBHGhyWQCCPEykEiihBrixVRdFg5SITRYZV5I44QK4JEFCVWBIkoOqwIEmF0WBEk4gixIkhEUWJFkIiiw4ogEUaHFUEijhArgkQUJVYEiSg6rAgSYXRYESTiCLEiSERRYkWQiKLDiiARRocVQSKOECuCRBQl140gW9RH0d2dhipcDtZH9UU8d+GWBn+axmO2vwdG2hebNgp0Jzq455i2VroGI5rz3JLdUI1O0r+hnXseKHiscaXgbv5Mic8UJmKw9yVsVR/BCtcwPCAcKv55AXMhw98R7ylP4ze9ovn+b9zvaCttxTDbUkQT9+Vvb9CHm/X1Zu9ixQ7Pq0J4NjogyJO8U51nwwakZchE4JoCYQwY4n0Za9V/QWECZjimoZO84ZZgS/P3xvuBp7El6gVU4s7fVoEYA9yqPIzunjfwiLAP77pGwUH85rgNn6b7eyHN3wtj7BnmpA8+B7R/mIvBWVYeTYWv0UL60vyRsUhsVx82xfGOcxQeEg+a72904t/od8Fx3LRAXsx7hYD19Au2hr5XHb/dEkFWo2sicE2B/Ewro1XhQjQWv0WeGo0GNBu9bSvhsntAuJtDtFggzudRgeaBF7UiGwxQfaJpTLSrQJh+2dQQwlRvPxz33Y3W4ja0cm0H4YG92r3o7J6JpuLXmGOfAk4BdJ3DH0IcWvsWQIWAd5wvoi73PagqQKe8KaocvQIWBLriDMpjUsxs1BBPFwtEZCreE4pEeF0fbtDXWxVIS7a1+Tz/65VUt/fb8m//UHhzDFlfXwuBawrk/UArDPOOwXLXcJzxVkKWUhsp8nLUsv8CXqQl7H2tNcB47yB8R+8x39flj2GiYy4eEbLQ0z0Va9Sm5vtEmo22/FZ0ifoEHb1zEZxcK5WnkI7OWBM9ENX5X4ttn6EV0cK9GI8LezHbMQWEAEe1GhjmHYssWvsvfV05qHzdhaEFYxGnFeIF+2o4ZQ/aedLNTz52paKydg5U48GJFK9q/bEw0BnvOkfiCX431IBoipfjdRBeN9tk+evgPX8b3CccQteotfBwdnObyDOKFLICa5VkrOWaoAqfg1cdM9FE2GOONxhBrhbSURraj0dfXlVimYgdndcYTE8DI4nmQAjbD8KNujQt7t9xo3I/BEGHILZJ+pE9I9XpzcrOO15gTfnwIBBSIF5mQyf3TJzTy2ODsw/y/HEYHxiEx7k9eF7+uMRKuTrQDAO941GBy0UvaaU5qsVKB3iYDatcg2Ds+d8MdMJO7T68wachAT+jkj3HFIjxGDnIdzQBHdyzkeZIQ1d5XbFnxqTr65mM91wj8IS4G+uUJujvmYi7+d/wvLTa/G6p8gyO07uQ7piIZ+TPSqBiRIzp+b2QxI6gQHDgfbTGh87BuJ8chqYI4DgdhaIdrT0LzXZrHQPgUPwgYBBkDYS//PcsjIneu2Ayqmk5GGFbAlFW0ME3B4e0WmhKd+Nx8VtQmSFD6YST+p3IcI7D09LnIbdi1/PDp0udC94o84ExnuiRuZ04gqWE4HedwVQ3RzCQAU6d8E8ySiWesCEg5PEuyoZlydjraaR9NsMSSHjEUbQehfirJvu0OnjGnY6u8lpMFObAHXBisPoSOMbwujQdZe155upqrNJt3Augg5ircpyeD6oIOEfLmaKoI/yEDq4NmK71wnFPVUyRZyGWFMLHZExT+uAoX93cnhh7q/baLDRkBzFKXAybzQdwQB/PFPyoV8WnjgHg/MB4JRW/S2WxxDkWdt0PTRGhUgHLlLbIYRUwMmoRYqTLibTh4BxvN+z11IcLXtSzZ6OffQWoIpkICpKC30g8mhcsNpP1t8RxZlQRJA2cWBQ5rnyMaPiTUgVLxbEoJ1xER3U2ftCqYo2Yin8Ix4swUaPwpq8TKOEwOGoZIMCMNMEIEvS1DJ8f0o/vtIQTjX072w6Qp/4KSd8GEI5SodmvnsdcROCTjpLqf/9IaDYkmnh3DvMuGXp3zI7uTenulDFKxoy7kXPJJFXH6Zj0fZvDN03+ey2FFMhE70AsCrTHamcq7qPZYIxgCdpgnq873hQn4iFpPwSbhoNaAtq456O/7QMM55eY4jByC44v2oIF9/BvsWfxqdIUy23DEccK4OMkpPgnoIA4i/fvr7Ne+EJ5EO8Ko3GH7Xec5cqb26t24mcYJy7AT76q6KlOQV3bMTxFvkSc5oYGDl7Bhq/U+3BBLYfh8mJUt50Cf8Xk3qPWxeDCceb2rpvtUyQJh8AYD1FSQQQdwcWgOf8V5gmTzXGLttD5kJFLLfY9i3Vif1Qi59FdmwaeaHhHGAuJqWZbXtCxJNAWB5Q6GCEvQXn5Ajr4LwvEqI49rc5HU3lXSD9yAnd429NNs/eg9sG5tuczADL7hLvxxzwvPEQI54fOfjQ74kgtXadCS/nN2oUkqtNcdfKYuvQYT3RySGLcH44Fmaf/e6d1+Dz/i0DO6eXwP4UZiCIefGLvD4eqgecpsvlqaF84G53ZRgyRl5nJ+mbaCN3cb2CZfSSa67vNJFuQ1eIknlECNSDgQ/oUpuu9sE3ugTKsAF5RKJGDGAnuIbEmOhXOwkJhAh6TMrGJPIpB3lfwoWsokuhRZKp10E5NB2MMyfpe+ImEr7gkaEQomphMxXp5ABqQIxBsCghHzAjX3j0X2bQ6atOfcD8Oo7/8ASpIF8HLRSI+Qe9Cy8IMJHN7MEt4DYRjEAyBhHj6eiaZ5eEtYi/cwf5AX20ConkP0vnJ5iJi+M4JzNwKpha+jE+kQajBnUI3Lc20ZkTLo7Qm2mrpIEwP6QdhVJ9AF0610YA0TkwZ4dTdXfcHOmngGPHnaRvj3ztk1sQL+jQop0ms+RhpeOOPxCefeFcZM/AxfX+Mpuets7ZYt1EgwbMPDSKS6GFUZb9hF5+IHFLB7PV+/SBmia+hlv0kNrJG6OFJwwrbECSzb83IEZx4Vw4xWMW6nkBUG4dOnllIpN9jpLgYY+hQHMY9+MQxAE5FwW5WD22UBVhhG4wmemaJBDrYF6O8WZUSZAWU4zHUOxarleZmfiJSDVs8jcwI0sW5DrKkmM3y9Gi0di9AWT0PS8SXEcV7QwokmGznshhslPuY9gao4+HivaZAjITcFBaBKZB+nklYL/VDTXbKFJKHOEoIxFhUQvmRf85ZR+DFKmuFx1u8xvdMuQtne6/yD9egsx+i5x/45mrqY/8s81oCCZ8orrRUIoKoTEBPz1R8oT6IkdIic7IajJ+XYsE4HgdpAlZ5m2E0t8hMpo+K1dHGswCjxQw8jzXgJc3c3riZA53dM8zEfb5jIuYEnjPPQa4nEKNEmu7vgo99TTFPnIqXtUFoaD+IEfwSM6HezyegrW8+hotvI5Usvw4aDIKk4hO9qVk8aCNtxWzbFOgBESsCLbFP/Sfa2zahsXOPWfo1HmNLudzfEkuFsXhAOhxSIF+pSaZP7aStmM5Ng4/azYlvCNFoJ3Nqcbup3r5YqrTDBntfxKsXzPwtl4sxBXJKvxOt1PlIld4P6Ycv39nXGFMmqV15tDQ0tSK78M6KwKgjGiM7y6VnHcME5or15q0zEvc8b1yPWMelF41zEEsg/wGBBLcbtfhfsMI2DKJiJKqXq475zIX5/q5QICDFthxO2Y22vgW4g57HPPFVxMj5pkCMfX9HzxwMsC3HKNsi3EgEMQSSrdfAMwVz0QurcYjWwvCYJUigJ8F0wCNJaOtdCCf1IkOcgIryebMvo0qW4hmPTPpPs2pWkz+FI8Y2pnA+ypBLWOvqh7JqAXTK4RxfBsN8L6EKzUEv+0dIcByHsfSf0ePRsWAWGmjZ6CevQILrRIkzmWxawxSH0dc6Vz9UUc7Cx2xmDpKt18QaIQV/F0+aAgme5N/JncNyebiZl6Vq43CJRJUoSEi6GtKP1UrzXyiEJ3mF/m4k6QnsZ/vbgXFvl9f/2GQIJGpk7sMCh40MZOal1+MmWRHk9ggjaLVEBEn3dcF4/2DMt09AO2yDkUOYZx7kcrlzga8zNilNMIRfimT7N/iUJGOieyDasM+RKB/BL8KdmBfohrLkEtY4B6CimovNaiP00SZgLJ+BJ7hvisu8V58N+CCji3sGcpVYtCBfISX6XUiKXrx1M0rKr3n6oRHNxP3yYXgkGR+rzZGp1cEo22KMsC2GcV2ks2cmjtJaZkk3CYfNSWpUmIwcYavSEBmFXfAQOYBerpWIlYuqXsZJ+oz8nojW3bCLPtS3Z5vvrz5Jf4B8By0gwsfJ6KjOMnOYZLoHjwqZuChFY5HaySxxG9dYjMNVr2ZHb3UifMReXJBYzzXGq94BIf3QmPjKpbTYKQboRpn3DlxY2ozuuqiDrFgutMplwAgQdqG695cW20mfe2fyPZvOF9r3bE53fvoM+/x7q8wbXsEUCyRYsi1kTqx39kYZxQ2O/JmwXnF0dVirhc4F081kPdX2Ppx2D3Zr9bGlsDFOsUrYSRrgYTkLbzjSEK9fhKqIuMjFoIcyDVThkMztxXNRH6Gn7/Xi0ueVp9DGAaUhuHRhMpLlPWA6AW8kv3+eSexSivoyTrd3cElwCT6Mtr+FDsIG6IqA9f4mGEVHoK9jJYaLi6EpkhkDixL3ousmRafs1dBK2I5Wzm3gxaIFoIC6sL2wIXbTRGzGIzjHVTDvYnWT1qKv7UO4qBtUEcFA4BdF8xykMncWregOfK4+hG2kIcqJuZjpeA31SbbZt49J6KzOAAe9xIn7LjW0H+61PqnjwweSwWhZEiCf3e9clvgYOTTfS+zVvuAeUL3EvlmBnHLB3ZgPCPjXv/X6eS84po1K1LMfqMN++rECzWny0uyXrDtZYdJJyMsd+YPrJTGdq6czsqdMetbhUH0VpCY+qhMugRDtQMycg5kXU+rWNkuRjHh04BjHMYnoLEFjRIlTsJG8lZV/aVBiA4DUZ8AJWeOO2/m88/kstqVhP4Zc2kDmHQ8Y/97Xp4FYXcJThCMVOJ2djypqX1xaCvbFMaYxjnyv60QhDNXAsTiO6keNZPb0s3faXfEVngThY2QN268ue+YPSKzBBNKYMZbrPnd+c+VVZ3xG356B9SspHJ9MmG7jOJzVgKKjfQ13cTyJN26MMGBHmblZ5nuWWkM2fGAcieYYo5Syn3meKMEy7Gf0wb39XVMW2eAnO7zPLYxHni/o6434YfRxK9haZd7wKOQvAjEmVlTFii11QKRe9/pr3es5PyApXuRpc56RS8EJnNevXlXjMAuExYIQplN2Ls7p+ZKkFd0NYn0axOTL5AlAj2PAxdhzp7fmV6zS7GqBGP/PHZx4L8e4BwE9K3bu/qyr3S3Rl3niyft46N8507OOEIAVDEpqqDNam9PZkVDVH8Ne4eD6j1HG38OBHImem7k72AfrUdVW6Iyrz4hQnRFqN94b9gnTTkR58g6QZSeLbj9eIRCdwccRep4RUocAIgjyNYXuqhmzww3Gtth0X873/tYrrvb1//Ij2M/NY+vfQFZlF5XqrOeWEQjT9cBb7r9UN4x7MfcRBtYMjIx0Mc+8I742e0ItBqUahP/nzlkCuV0EpjI51pG3CsBThGHvPeqx7pu1QfUIgTdm7r5Nt6tby254EbAEEl48Q1rLHdTgLkEnlXWOJXCM/RA9b//O/0C3VhdhQMASSBhAvJ4J9iz4vPjEFhwQD3B5MQG2zShY3OZuLfNhQsASSJiAtMyUTgQsgZROXi2vwoSAJZAwAWmZKZ0IWAIpnbxaXoUJAUsgYQLSMlM6EbAEUjp5tbwKEwKWQMIEpGWmdCJgCaR08mp5FSYELIGECUjLTOlEwBJI6eTV8ipMCFgCCROQlpnSiYAlkNLJq+VVmBCwBBImIC0zpRMBSyClk1fLqzAh8L+q7fOrnM/7SgAAAABJRU5ErkJggg==',
    'canvas_toDataUrl_1':'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAADRVJREFUeF7tnVuIJUcZx786R8lDEMlDEA0RA4aIokEiEkHZXhRFVFBE8PKgYAQFBS+I4IU5jZcHRQUVFJSAPqgPAS8PioLOWRSUwGZwZ2E2O5pZHXdXs8qaLO6qq9vSZ87Z6TnTZ87pS1V9VfXbx6S76qv//z8/qutUdRvhHwqgAAoEooAJpE7KRAEUQAEBWIQABVAgGAUAVjBWUSgKoADAIgMogALBKACwgrGKQlEABQAWGUABFAhGAYAVjFUUigIoALDIAAqgQDAKAKxgrKJQFEABgEUGUAAFglEAYAVjFYWiAAoALDKAAigQjAIAKxirKBQFUABgkYHeFSgKyUQkM0ZGvTdOg0krALCStt/O4KfAWheR48bI2E4vtJqiAgArRdctj/lGIWMjckxEThgzmW3xDwV6UQBg9SIjjVQVqACr/M85j4bkoy8FAFZfStLOTQVuFFLMBQtokY9eFABYvchIIzMFrheSDUXWa4LFehYx6awAwOosIQ1UFbheyGgoslYTLNaziEpnBQBWZwlpYA5Y46HIsQXB4tGQuHRSAGB1ko+b5xX4byHFQOSojwUALWLTWgGA1Vo6bpxXoFy/MiLrS4AlxvDxE9LTTgGA1U437qpRYFVgsT+L+LRVAGC1VY77DilwfbphdNkMa3ojj4ZkqLECAKuxZNywSIHr0/1XKwKrbAZoEadGCgCsRnJx8RGwKo/gTPZfNQAW61lEqpECAKuRXFzcN7BYzyJTTRQAWE3U4tqFCvyrkJv7r5rMsFjPIlRNFABYTdTiWlvAYj2LbK2kAMBaSSYuWqbAvysbRlvMsCbNsz9rmcr8f4BFBjorcK2QbFDZMNoWWKxndbYi+gYAVvQW2x/gtULGA5FjM1B1ABaPhvbtCroHgBW0fTqK7xlYQEuHrSqrAFgqbQmrqGvT9aueZlisZ4Vlv9NqAZZTuePrrFy/KjeMlrDqE1jsgo8vK32MCGD1oWLCbfyzkNFAZM0CsHg0TDhXi4YOsAhFJwWuVg489zzDmtXFecNODsV1M8CKy0/no7laOfBsCVjsz3Luqt4OAZZeb9RXdqXywQlLj4TMstSnwG2BAMut3lH15hBYrGdFlZz2gwFY7bVL/s4rcweebT0SVoRmPSvx1AGsxAPQZfgegMV6VhfDIrgXYEVgoo8hlI+D1Q9OWF7Dqg6RWZYPw5X0CbCUGBFaGR6BxXpWaGHpsV6A1aOYKTX1ZM2BZwdrWMy0UgpZzVgBVuIBaDt8BcBiPauteQHfB7ACNs9n6U/WHHh2PMPi0dBnADz1DbA8CR9yt+X6VVFz4NkDsIBWyEFqUTvAaiFa6rc8UcjI1Bx49gSs0o7jxsg4dV9SGD/ASsHlnsf4j8qCexVSHoHFelbPHmttDmBpdUZxXU8sOPDsE1i8P0txYHosDWD1KGYKTV2efnBi9oVnLTOsqfZsKo08hAArcoP7Hp5yYLGe1bfhytoDWMoM0V7O5en6ldIZ1kQ+vm+oPUXt6wNY7bVL8s7Lcx9MVfZIOPOER8NI0wmwIjXWxrDKx8HZByc0z7BYz7Lhvo42AZYOH4KoIjBgsZ4VRKqaFQmwmumV9NV/m76wb9FjoOdtDbXesJ4VV2QBVlx+Wh1NiMBif5bVSDhvHGA5lzzcDv++5MCzxhkW61nh5q2ucoAVl5/WRnNpumF0/s2iSn8lrNOB84bW0uGuYYDlTuuge7q0wvlBxTOsUvsTxkx+5eRfwAoArIDNc1l6BMAq5WJ/lsvQWOgLYFkQNcYmL1XWr0L6lbDGC6AVcEABVsDmuSq9XL+abRgNeA2rKhfrWa7C03M/AKtnQWNs7q+FjAaVF/YFPsNiPSvgkAKsgM1zVfrjhYyNyLHZ7CoCYLGe5So8PfcDsHoWNMbmHp97YV8kwAJaAYYVYAVomsuSLxaSDUXWq4edIwJWKSXrWS4D1bEvgNVRwNhvTwBY7M8KKMQAKyCzfJR6cXrgOeIZFo+GPoLVsk+A1VK4VG5LBFhAK5BAA6xAjPJRZvk4aKYfTI18hjWRl1fR+EhZsz4BVjO9krp6Aqwbsj6/yB7Zovu+p4WcME/hvKHmkAMsze54ru3Cf2Q8mO6/SmGGNZG7kNzcIiPP0tP9AgUAFtFYqMCFqwkCawatW4GWxj8NgKXRFSU1XbgiRd3ZwWgfCSu6m6cJfxtKclgtA1MUmqKhpIuXJSvM3vpVMmtYVeHL9azbWM/SkEWApc0FhfWcvyQjY2QtWWDNHg1v59FQUzyZYWlyQ1Etf/6LjAdm/8BzMovuhz3IzTOAlpZoAiwtTiir4/x5KRZ9LDWFNawDjyF3sJ6lJZ4AS4sTiurY3ZVsUBw88JzwDKt05oR5NutZGiIKsDS4oKyG3R3JBnNvaEgcWKVDubmLR0PfUQVYvh1Q2P/u9t7+Kx4JD5mTm7uBls/IAiyf6ivte/fM3v4rgHXYIPM81rN8xhZg+VRfYd+7m5LJdP8VwKoxqNyf9ULWs3xFF2D5Ul5pvxNg1Rx4Zg3rgGG5uZdHQx8RBlg+VFfc57lHZDysOfAMsOZMKw9J3we0XEcZYLlWXHl/5x4GWKtaZF7KetaqWvV1HcDqS8lI2vnjb+oPPDPDqjU4Ny9jluUy+gDLpdrK+9r51d7+q2Vfd05tp/sS23LzCqDlKtoAy5XSAfSzs774/CAzrCMMLNezjgMtFxEHWC5UDqSPnV/sv7CPfViNTMvNKwFWI8VaXgywWgoX423nfrb4wDMzrIWO5+Y1wMrV3wPAcqW08n52fiqZOeLAM8Cq2dbwOkDlOtYAy7XiSvv7w49kNDSytmh3O8CaGmckN28AVL5iDLB8Ka+s38d+cPSBZ4AluXkToPIdW4Dl2wEl/T/20NEHnpMFVvkL4FsAlZKYslNXixE+69j+nmTDJQeekwNWCaq3ASqfuazrmxmWNkc81DMB1pIDzwkBKzfvAFQeYrhSlwBrJZnivmj728vPDyYArLx02bwTWGlOO8DS7I6j2rYfTBxY5ePfuwGVo7h16gZgdZIv/Ju3vymZWeH8YKQzrNy8B1CFlGKAFZJbFmrd/nqSwMrN+wCVhThZbxJgWZdYdwdnv7ragecoZljlo98HAJXuRB5dHcAK2b0eaj/75QSAVYLqQ4Cqh7h4bwJgebfAbwFnv7j/wr5V3nO17F1Zs5mYkmDl5iOAym/C+u1dSa76HRStrabA9hckK4r9F/ZFA6xyRvUxQLVaCsK6CmCF5Vev1T76WRkZI2uzWVPwwCpkby/VJ4BVr0FR1BjAUmSG61LOfPrgC/sCB1ZuPgWoXGfIdX8Ay7Xiivp7dO3gC/uCBFb5upcRoFIUK6ulACyr8uptfOuTex+caLpdQdGie24+A6j0JsxOZQDLjq7qW936uIwGxcEX9gUxwypnVJ8DVOoDZqlAgGVJWO3Nbn308Av7VAOrBNXnAZX2XNmuD2DZVlhp+1sfPvzCPqXAys2XAJXSGDkvC2A5l9x/h1sflExq3n+lDFi5+Qqg8p8WXRUALF1+OKlm6/2SyXTDqLpFdzPdS/U1YOUkDIF1ArACM6yPck+/t/79VwpmWLn5BqDqw+NY2wBYsTp7xLhOP6AOWLn5FqBKMIqNhwywGksW9g2bD0g2+N/++UGvj4TlL38PAqqwE+W2eoDlVm/vvW2+SwGwSlB9B1B5D0OABQCsAE3rUvLm2w+eH3Q8w8rNdwFVF/9SvxdgJZaAzbfKeFDIsbojNtYW3csZ1fcBVWJRszJcgGVFVr2Nnn7zwQPPVmdYJageAlR60xBeZQArPM9aV7z5xr0PTlQhZQNYRiSfzNZ+CKxam8WNtQoArISC8bvXy2goBw889w0sGUj+1B8DqoRi5XSoAMup3H47O/XawweeewOWkfyWnwAqvw7H3zvAit/jmyM89erDB567Aqt8/Lv154AqoRh5HSrA8iq/u843XiXZsObAc1tgiUj+9F8CKncO0lOpAMBKJAcbmWTDmgPPjYFlJL9tDKgSiY26YQIsdZbYKWjj5TIeTvdftfqV0Eh++68BlR13aHVVBQDWqkoFft3G/fUHnpfNsMo1qmf+FlAFbn805QOsaKxcPJCN+yUzCw48LwTW9L1UdzwMrBKISDBDBFjBWNW+0I2XNASWkfzORwBVe8W505YCAMuWsora3XiRjI3Unx+cW8/K7zoFqBRZRylzCgCsBCKx8fyjgWUGkt99GlAlEIXghwiwgrdw+QA27llw4NlIfs8ZQLVcQa7QogDA0uKEpTo2niuZHD7wnL/g94DKkuQ0a1EBgGVRXA1Nn3yOjAbTA8/lFoV7zwEqDb5QQzsFAFY73YK56+SdMh4YGb/4T4AqGNModKECACvycJx8lozuuwCsIrc5meEBrGSsZqAoEL4CACt8DxkBCiSjAMBKxmoGigLhKwCwwveQEaBAMgoArGSsZqAoEL4CACt8DxkBCiSjAMBKxmoGigLhK/B/ZWwXtRZOwZ8AAAAASUVORK5CYII=',
    'SupportedExtensions':["ANGLE_instanced_arrays","EXT_blend_minmax","EXT_color_buffer_half_float","EXT_float_blend","EXT_frag_depth","EXT_shader_texture_lod","EXT_texture_compression_bptc","EXT_texture_compression_rgtc","EXT_texture_filter_anisotropic","EXT_sRGB","OES_element_index_uint","OES_fbo_render_mipmap","OES_standard_derivatives","OES_texture_float","OES_texture_float_linear","OES_texture_half_float","OES_texture_half_float_linear","OES_vertex_array_object","WEBGL_color_buffer_float","WEBGL_compressed_texture_astc","WEBGL_compressed_texture_etc","WEBGL_compressed_texture_etc1","WEBGL_compressed_texture_s3tc","WEBGL_compressed_texture_s3tc_srgb","WEBGL_debug_renderer_info","WEBGL_depth_texture","WEBGL_draw_buffers","WEBGL_lose_context","WEBGL_multi_draw"],
    'plugins' : ["PDF Viewer","Chrome PDF Viewer","Chromium PDF Viewer","Microsoft Edge PDF Viewer","WebKit built-in PDF"],
    'author': '莉夏',
    'QQ': '897969970',
    'Bilibili': '莉夏宝贝儿'
};

// 突破node检测  应用在python的execjs
memory.delete = function(obj,prop){delete prop || Object.defineProperty(obj,prop, {get:function() {return undefined;}})};
node_obj = ['global','Buffer'];  // 这里用上面的node  在最后运行代码结束时拿出来node填充的进行替换  在vm2运行这个不用搞
node_obj.map((x)=>{memory.delete(window,x)});


if(memory.random){Math.random = function(){return memory.random}}
if(memory.timestamp){
    first_time = memory.timestamp//new Date().getTime();
    ttt = 0;
    console.log('第1次的时间戳:' + first_time)
    Date.prototype.getTime = function() {
        return first_time
    }
    ;
    Date.now = function() {
        ttt++;
        console.log('第'+ttt+'次的时间戳',first_time + ttt);
        return first_time + ttt
    }
    ;
    let Date_ = Date;
    Date = function() {
        ttt++
        console.log('第'+ttt+'次的时间戳',first_time + ttt)
        return new Date_(first_time + ttt)
    }
}


// index = 0
// times = [1692977016620,1692977016620,1692977016620,1692977016626,1692977016626,1692977016646,1692977016786,1692977016786,1692977020230,1692977020230,1692977020275,1692977021202,1692977021202,1692977021203,1692977021203,1692977021234,1692977021234,1692977021234,1692977021240,1692977022024,1692977022024,1692977022708];
// Date.prototype.getTime = function (){
//     return times[index++]
// };



// Date.prototype.getTime_ = Date.prototype.getTime;times=[];Date.prototype.getTime = function (){let a = this.getTime_();console.log(a);times.push(a);return a};
// Date.now_ = Date.now;Date.now = function(){let v = this.now_();console.log(v);return v}
// 记录时间戳

;
// 第2个加载 环境构建工具

// 调用后给对象挂上代理
memory.proxy = function(name){
    let paramObj = memory.data[name] || window[name]
    if(memory.setProxy == false)return paramObj
    const handler1 = {
        set(obj, prop, value) {
            if(memory.setLog){
                if(typeof(value) == 'function'){
                    caocao = 'function'
                }else{
                    caocao = obj[prop]
                }
                console.log('方法 : set\t序号 : '+ (++memory.order) + '\t对象 : '+obj.lixia + '\t属性 : ',prop,'\t值 : ',value)
            }
            if(memory.setDebugger && memory.passOrder<=memory.order){debugger}
            return Reflect.set(...arguments)
        },
        get(obj, prop){
            if(obj.lixia=='window'){return obj[prop]}
            if(memory.getLog){
                if(typeof(obj[prop]) == 'function'){
                    caocao = 'function'
                }else{
                    caocao = obj[prop]
                }
                console.log('方法 : get\t序号 : ' + (++memory.order) + '\t对象 : ' + obj.lixia + '\t属性 : ' , prop ,'\t值 : ', caocao)
            }
            if(obj.lixia=='window' && obj[prop]==undefined){memory.node.push(prop)};
            if(obj[prop]==undefined){memory.nodes[obj.lixia]? memory.nodes[obj.lixia].push(prop):memory.nodes[obj.lixia]=[],memory.nodes[obj.lixia].push(prop)}
            if(memory.getDebugger && memory.passOrder<=memory.order){debugger}
            return obj[prop]

        }};
    return new Proxy(paramObj, handler1);
};


// 调用后方法tostring保护
memory.protect = (function() {
    "use strict";
    //原函数
    const $toString = Function.toString;
    const myFunction_toString_symbol = Symbol('('.concat('',')_',(Math.random() + '').toString(36)));
    //自定义函数
    const myTostring = function(){
        if(memory.funTostringDebugger){debugger}

        // return '=this;=this,=module;=module,arguments'
        return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);
    };
    function set_native(func,key,value){
        Object.defineProperty(func,key,{
            "enumerable":false,
            "configurable":true,
            "writable":true,
            "value":value
        })
    }
    delete Function.prototype['toString']; //删除原型是toString
    set_native(Function.prototype,"toString",myTostring);
    set_native(Function.prototype.toString,myFunction_toString_symbol,"function toString() { [native code] }");
    function protect(func,name){
        if(typeof(func) == 'function'){
            if(name){
                set_native(func,myFunction_toString_symbol,'function '+name+'() { [native code] }')
            }
            else{
                set_native(func,myFunction_toString_symbol,'function '+func.name+'() { [native code] }')
            }
        }};
    return protect
})();

// 调用后对象的名字改变
memory.rename = function (target,name){
    Object.defineProperties(target,{
        [Symbol.toStringTag]:{
            value:name,
            configurable:true
        }
    })
};

// 设置对象为不可枚举    模拟浏览器的那些灰色暗淡的变量名
memory.NO_enumerable = function(obj,pro){
    Object.defineProperty(obj,pro,{
        enumerable:false
    })
};

// 设置原型上面获取为异常 实例上面获取正常
memory.pro_thr = function(obj,pro,name){
    let throw_fun = function(){
        throw new TypeError('Illegal constructor')
    };memory.protect(throw_fun,name)
    Object.defineProperty(obj, pro, {
        enumerable: true, // 不可枚举
        configurable: false, // 不可改写
        get:throw_fun,
        set:undefined
    })
}

// 调用后组成对象原型链
memory.make_chain = function(target,obj){
    let fff;
    if(obj){
        first = obj;
        fff = 0;
        memory.rename(obj,target[0])
    }else{
        firstName = target[0]
        first = memory.data[firstName] || window[firstName] || memory.create_element[firstName];
        first.lixia = firstName;
        memory.rename(first,target[1]); //先把对象的名字改变  如: window的名字为 Window
        fff = 1
    }
    first.chain = target;
    for(let i=0;i<target.length-1;i++){
        let nextName = target[i + fff];
        let second = window[nextName] || memory.data[nextName];
        // 要么对象构造  要么函数构造
        if(typeof second == "object"){
            memory.rename(second,nextName);
            first.__proto__ = second;
        }else if(typeof second == "function"){
            memory.rename(second.prototype,nextName);
            first.__proto__ = second.prototype;
        }else{
            // 这种情况只能是获取到的是 undefined
            throw new TypeError('原型链的组成时没有在全局window或者全局缓存找到该变量:'+nextName);
        }
        first = first.__proto__;
    }
};

// 调用后会创建一个挂了代理的对象
memory.createProxyObject = function(name,obj){
    if(obj){
        memory.data[name] = obj;
    }else{
        memory.data[name] = {};
    }
    memory.data[name].lixia = name;
    memory.rename(memory.data[name],name)
    return memory.proxy(name)
}

// 深拷贝
memory.deepCopy = function deepCopy(p, c) {
    var c = c || {};
    for (var i in p) {
        if (typeof p[i] === 'object') {
            c[i] = (p[i].constructor === Array) ? [] : {};
            deepCopy(p[i], c[i]);
        } else {
            c[i] = p[i];
        }
    };
    memory.make_chain(p.chain,c)
    return c;
};


// 浅拷贝
memory.extendCopy = function extendCopy(p) {
    var c = {};
    for (var i in p) {
        c[i] = p[i];
    }
    c.uber = p;
    memory.make_chain(p.chain,c);
    return c;
};


// dom标签构建
memory.domStr = function domStr(x){
    let caocao = '<'+x.lixia;
    if(x.class){
        caocao += ' class="'+x.class+'"'
    }
    if(x.id && x.id != "50000000"){
        caocao += ' id="'+x.id+'"'
    }
    caocao += '>'
    if(x.content){
        caocao += x.content;
    }

    if(x.childNodes && x.childNodes.length){
        for(let sx of x.childNodes){
            caocao += domStr(sx,obj);
        }
    };
    caocao += '</'+x.lixia+'>';
    if(x.siblingNode && x.siblingNode.length){
        for(let sx of x.siblingNode){
            caocao += domStr(sx);
        }
    };
    return caocao;
};


memory.domForObj = function domForObj(a,y){
    for(let x of a.childNodes){
        if(x.id == y){
            return x
        }
        if(x.childNodes.length>0){
            let caocao = domForObj(x,y)
            if(caocao){
                return caocao
            }
        }

    }
};

memory.domForObj_2 = function domForObj(a,y){
    for(let x of a.childNodes){
        if(x == y){
            return a
        }
        if(x.childNodes.length>0){
            let caocao = domForObj(x,y)
            if(caocao){
                return caocao
            }
        }

    }
};


// 字符串转dom对象
memory.str_to_dom = function str_to_dom() {
    function xx(a) {
        let num = 0
            , index = 0
            , list = []
            , index_ = 0
            , str = ''
            , result = [];
        for (let i = 0; i < a.length; i++) {
            if (a[i] == '<') {
                num += 1
            }
            if (a[i] == '>') {
                num -= 1
                if (num == 0) {
                    list.push(a.slice(index, i + 1));
                    index = i + 1
                }
            }
        }
        ;for (let i of list) {
            str += i
            if (i.indexOf('/') == -1) {
                index_ += 1
            } else {
                index_ -= 1
                if (index_ == 0) {
                    if (str != '') {
                        result.push(str)
                        str = ''
                    }
                }
            }
        }
        return result
    }
    ;
    function wtx(ax) {
        tagName = /<(\w+)/.exec(ax)[1];
        text = />(.*)</.exec(ax);
        obj = []
        obj.push(['content', text[1]])
        let aa = ax.split('=');
        for(let i=0;i<aa.length;i++){
            let a = aa[i]
            value = /["'](.*?)["']/.exec(a);
            if(!value){continue}
            v = value[1];
            let b = aa[i-1];
            key =  / (\w+)/.exec(b);
            k = key[1]
            obj.push([k,v])
        }

        return {
            'tagName': tagName,
            'property': obj
        }
    }

    function zzz(data) {
        let result = []
        for (let x of data) {
            let tt = 0;
            for (let i of x) {
                if (i == '/') {
                    tt += 1
                }
            }
            if (tt == 1) {
                let caocao = wtx(x);
                caocao.childNode = []
                result.push(caocao)
            } else {
                let nex = />(.*)</.exec(x)[1];
                let nn = x.replace(nex, '')
                let caocao = wtx(nn)
                let xen = xx(nex);
                caocao.childNode = zzz(xen);
                result.push(caocao)
            }
        }
        return result
    }
    ;function xyz(z) {
        dataa = xx(z);
        a1 = zzz(dataa)
        return a1
    }
    ;return xyz
}();

memory.get_style_name = function(a){
    let b = '';
    for(let x=0;x<a.length;x++){
        if(a[x]=='-'){
            x++
            b = b + a[x].toUpperCase()
        }else{
            b = b + a[x]
        }
    }
    return b
}

// dom元素添加到对象子节点
memory.dom_create = function dom_create(obj,domEle){
    for(let i of domEle){
        let z = document.createElement(i.tagName);
        for(let j of i.property){
            if(j[0]=='style'){
                for(let x of j[1].split(';')){
                    let kkk = x.split(':');
                    z.style[memory.get_style_name(kkk[0])] = kkk[1];
                }
            }else{
                z.setAttribute(j[0],j[1])
            }
        };
        obj.appendChild(z);
        if(i.childNode.length>0){
            memory.dom_create(z,i.childNode)
        }
    };
}

// 16进制转rgb值
memory.colorRgb = function colorRgb(string) {
    let sColor = string.toLowerCase()
    let sColorChange = []
    for (let i=1; i<7; i+=2) {
        sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));
    }
    return 'rgb('+sColorChange.join(',')+')'
}


memory.ArrElementCount = function(data) {
    let map = {};
    for (let i = 0; i < data.length; i++) {
        let ai = data[i];
        if (!map[ai]) {
            map[ai] = 1;
        } else {
            map[ai]++;
        }
    }
    return map
}


memory.setTime = function() {
    let Date_ = Date;
    let times = []
    Date = function() {
        let time;
        if (times.length > 0) {
            time = times[0];
        } else {
            time = new Date_().getTime();
            times.push(time);
        }
        return new Date_(time)
    }
    Date.now = function(){
        let time;
        if (times.length > 0) {
            time = times[0];
        } else {
            time = new Date_().getTime();
            times.push(time);
        }
        return time
    }
    Date.parse = Date_.parse;
    Date.prototype = Date_.prototype;
    return function(timestamp){times[0]=timestamp}
}


memory.hookArray = function hookArray(target, index) {
    return new Proxy(target,{
        set(target, property, value) {
            if (property === (index + "")) {
                debugger
            }
            console.log(`setArray index->${property} = ${value}`);
            target[property] = value;
        },
        get(target, property) {
            if (property === (index + "")) {
                debugger
            }
            let result = target[property];
            try {
                console.log(`getArray index->${property} = ${result}`);
            } catch (e) {}
            return result;
        },
        deleteProperty(target, property) {
            console.log(`deleteArray index->${property}`);
            delete target[property];
        }
    });
}


memory.filter_obj = function filter_obj(x,y,z){
    let result = [];
    let xxxx = function(obj,pros,pro){
        let keys;
        let count = 0;
        if(Array.isArray(pros)){
            keys = pros;
            for(let key of pros){
                for(let value of obj.sx || Object.values(obj)){
                    if(value == key){count++}
                }
            }
        }else{
            keys = Object.keys(pros)
            for(let key of keys){
                if(obj[key] == pros[key]){count++}
            }
        }
        if(keys.length <= count){result.push(obj)};
        if(obj[pro]){
            if(Array.isArray(obj[pro])){
                for(let i of obj[pro]){
                    xxxx(i,pros,pro)
                }
            }
            else{
                xxxx(obj[pro],pros,pro)
            }
        }
    }
    if(Array.isArray(x)){
        for(let i of x){
            xxxx(i,y,z)
        }
    }
    else{
        xxxx(x,y,z)
    }
    return result
}


memory.filter_obj2 = function filter_obj2(htmlNode,tj){
    return memory.filter_obj(htmlNode.childNodes,tj,'childNodes')
}

memory.hookDomGet = function(paramObj,pros){
    paramObj.sx = []
    // (function() {
    //     'use strict';
    //     Object.defineProperty(caocao, pro, {
    //         set: function(val) {
    //             console.log('设置',pro,'值',val)
    //             return Reflect.set(...arguments)
    //         },
    //         get: function(){
    //             let a1;
    //             if(window==this){
    //                 a1 = memory.filter_obj2(this.document,[pro]);
    //             }else{
    //                 a1 = memory.filter_obj2(this,[pro]);
    //             }
    //             if(a1.length>1){
    //                 return a1
    //             }else if(a1.length==undefined){
    //                 return undefined
    //             }else{
    //                 return a1[0]
    //             }
    //         }});
    // })();
    const handler1 = {
        set(obj, prop, value) {
            obj.sx.push(value)
            return Reflect.set(...arguments)
        },
        get(obj, prop){
            // debugger
            if(!pros.includes(prop)){
                return obj[prop]
            }
            let a1;
            if(obj.lixia=='window'){
                a1 = memory.filter_obj2(obj.document,[prop]);
            }else{
                a1 = memory.filter_obj2(obj,[prop]);
            }
            if(a1.length>1){
                return a1
            }else if(a1.length==undefined){
                return undefined
            }else{
                return a1[0]
            }
        }};
    return new Proxy(paramObj, handler1);
};
memory.objects.RTCPeerConnection = memory.createProxyObject('RTCPeerConnection');

memory.objects.RTCPeerConnection.localDescription = {
    "sdp":"v=0\r\no=- 627758748607417531 2 IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\na=group:BUNDLE 0\r\na=msid-semantic: WMS\r\nm=application 1961 UDP/DTLS/SCTP webrtc-datachannel\r\nc=IN IP4 117.152.145.34\r\na=candidate:3539891574 1 udp 2113937151 a3198269-2c6e-4adc-828e-b7f9c949277d.local 49812 typ host generation 0 network-cost 999\r\na=candidate:842163049 1 udp 1677729535 117.152.145.34 1961 typ srflx raddr 0.0.0.0 rport 0 generation 0 network-cost 999\r\na=ice-ufrag:/CYr\r\na=ice-pwd:QRs0Mo7A0ouqDBYDlcvDSjPQ\r\na=ice-options:trickle\r\na=fingerprint:sha-256 BC:AC:D1:9B:EC:2F:F1:47:B5:EF:6D:2F:1A:E3:B6:9F:2B:76:07:CF:32:90:9F:B0:33:A6:90:63:F9:25:45:59\r\na=setup:actpass\r\na=mid:0\r\na=sctp-port:5000\r\na=max-message-size:262144\r\n",
    "type":"offer"
};
memory.objects.RTCPeerConnection.createDataChannel = function createDataChannel(x){
    return memory.createProxyObject(x)
};memory.protect(memory.objects.RTCPeerConnection.createDataChannel);

memory.objects.RTCPeerConnection.createOffer = function createOffer(x){
    return {
        'candidate':{
            address: "a3198269-2c6e-4adc-828e-b7f9c949277d.local",
            candidate: "candidate:3539891574 1 udp 2113937151 a3198269-2c6e-4adc-828e-b7f9c949277d.local 55154 typ host generation 0 ufrag gcmS network-cost 999",
            component: "rtp",
            foundation: "3539891574",
            port: 55154,
            priority: 2113937151,
            protocol: "udp",
            relatedAddress: null,
            relatedPort: null,
            sdpMLineIndex: 0,
            sdpMid: "0",
            tcpType: "",
            type: "host",
            usernameFragment: "gcmS",
        },
        'then':function(x){
            memory.promise['3'] = x;
            return memory.createProxyObject('createOffer');
        }
    }
};memory.protect(memory.objects.RTCPeerConnection.createOffer);

memory.objects.RTCPeerConnection.setLocalDescription = function setLocalDescription(x){
    return {'then':function(){debugger}}

};memory.protect(memory.objects.RTCPeerConnection.setLocalDescription);






;
window.length = 0; //内嵌了页面frame
window.onselectionchange = null;
window.onresize = null;
window.onmessage = null;
window.onerror = null;
window.outerHeight = 816;
window.innerHeight = 0;
window.outerWidth = 1536;
window.innerWidth = 0;
window.name = ""

window.locationbar = memory.createProxyObject('BarProp');
window.locationbar.visible = true;
window.menubar = memory.createProxyObject('BarProp');
window.menubar.visible = true;
window.personalbar = memory.createProxyObject('BarProp');
window.personalbar.visible = true;
window.scrollbars = memory.createProxyObject('BarProp');
window.scrollbars.visible = true;
window.statusbar = memory.createProxyObject('BarProp');
window.statusbar.visible = true;
window.toolbar = memory.createProxyObject('BarProp');
window.toolbar.visible = true;
window.devicePixelRatio = 1.25;


window.performance = memory.createProxyObject('performance');
window.indexedDB = {

};
window.indexedDB.open = function open(){
    return memory.createProxyObject('IDBFactory')
};memory.protect(window.indexedDB.open);

window.chrome =  memory.createProxyObject('chrome');

window.chrome.csi = function csi(){

};memory.protect(window.chrome.csi);

window.chrome.app = memory.createProxyObject('app');
window.chrome.app.isInstalled = false;
window.chrome.app.RunningState = {
    CANNOT_RUN: "cannot_run",
    READY_TO_RUN: "ready_to_run",
    RUNNING: "running"
};
window.chrome.app.InstallState = {
    DISABLED: "disabled",
    INSTALLED: "installed",
    NOT_INSTALLED: "not_installed"
}


window.clientInformation = {
    appCodeName: memory.userAgent.split('/')[0],
    appName: "Netscape",
    appVersion: memory.userAgent.split('/').slice(1).join('/'),
    bluetooth:  memory.createProxyObject('bluetooth'),
    clipboard: memory.createProxyObject('clipboard'),
    cookieEnabled: true,
    deviceMemory: 8,
    hardwareConcurrency: 12,
    keyboard: memory.createProxyObject('keyboard'),
    language: "zh-CN",
    languages: ["zh-CN","zh"],
    locks:  memory.createProxyObject('locks'),
    onLine: true,
    platform: "Win32",
    product: "Gecko",
    productSub: "20030107",
    userAgent: memory.userAgent,
    vendor: "Google Inc.",
    vendorSub: "",
    webdriver:false,
    wakeLock:memory.createProxyObject('wakeLock'),
    usb:memory.createProxyObject('usb')
};memory.proxy('clientInformation')



window.openDatabase = function openDatabase(){
    if(memory.callFunDebugger){debugger}
    return {version: "",transaction:function(){}}
};memory.protect(window.openDatabase);


window.FileReader = function FileReader(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.FileReader);

window.webkitRequestFileSystem = function(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.webkitRequestFileSystem);

window.SpeechSynthesisUtterance = function SpeechSynthesisUtterance(){

};memory.protect(window.SpeechSynthesisUtterance);



window.MediaEncryptedEvent = function MediaEncryptedEvent(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.MediaEncryptedEvent);


window.open = function open(method,url){
    if(memory.callFunDebugger){debugger}
    return url
};memory.protect(window.open);

window.DOMParser = function DOMParser(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.DOMParser);

window.XMLHttpRequest = function XMLHttpRequest(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.XMLHttpRequest);

window.XMLHttpRequest.prototype.open = function(){
    if(memory.callFunDebugger){debugger}
    return arguments[1]
};memory.protect(window.XMLHttpRequest.prototype.open);

window.XMLHttpRequest.prototype.send = function send(){
    return arguments[0]
};memory.protect(window.XMLHttpRequest.prototype.send);


window.fetch = function fetch(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.fetch );

window.Request = function Request(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.Request);

window.SourceBuffer = function SourceBuffer(){

};memory.protect(window.SourceBuffer);

window.SourceBuffer.prototype.changeType = function changeType(){

};memory.protect(window.SourceBuffer.prototype.changeType);



// window.ScreenOrientation = function ScreenOrientation(){

// };memory.protect(window.ScreenOrientation);

window.Path2D = function Path2D(){

};memory.protect(window.Path2D);

window.Path2D.prototype.addPath = function addPath(){

};memory.protect(window.Path2D.prototype.addPath);


window.HTMLFrameSetElement = function HTMLFrameSetElement(){

};memory.protect(window.HTMLFrameSetElement);

window.HTMLFrameSetElement.prototype.hasPointerCapture = function hasPointerCapture(){

};memory.protect(window.HTMLFrameSetElement.prototype.hasPointerCapture);

window.HTMLFrameSetElement.prototype.webkitRequestFullScreen = function webkitRequestFullScreen(){

};memory.protect(window.HTMLFrameSetElement.prototype.webkitRequestFullScreen);

window.CDATASection = function CDATASection(){

};memory.protect(window.CDATASection);

window.CDATASection.prototype.remove = function remove(){

};memory.protect(window.CDATASection.prototype.remove);


window.SVGGraphicsElement = function SVGGraphicsElement(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.SVGGraphicsElement);

window.PerformancePaintTiming = function PerformancePaintTiming(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.PerformancePaintTiming);



window.atob = function atob(s) {
    var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    s = s.replace(/\s|=/g, '');
    var cur,
        prev,
        mod,
        i = 0,
        result = [];
    while (i < s.length) {
        cur = base64hash.indexOf(s.charAt(i));
        mod = i % 4;
        switch (mod) {
            case 0:
                //TODO
                break;
            case 1:
                result.push(String.fromCharCode(prev << 2 | cur >> 4));
                break;
            case 2:
                result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
                break;
            case 3:
                result.push(String.fromCharCode((prev & 3) << 6 | cur));
                break;
        }
        prev = cur;
        i ++;
    }
    return result.join('');
};memory.protect(window.atob);
window.btoa  = function btoa(s) {
    var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    if (/([^\u0000-\u00ff])/.test(s)) {
        throw new Error('INVALID_CHARACTER_ERR');
    }
    var i = 0,
        prev,
        ascii,
        mod,
        result = [];
    while (i < s.length) {
        ascii = s.charCodeAt(i);
        mod = i % 3;
        switch(mod) {
            // 第一个6位只需要让8位二进制右移两位
            case 0:
                result.push(base64hash.charAt(ascii >> 2));
                break;
            //第二个6位 = 第一个8位的后两位 + 第二个8位的前4位
            case 1:
                result.push(base64hash.charAt((prev & 3) << 4 | (ascii >> 4)));
                break;
            //第三个6位 = 第二个8位的后4位 + 第三个8位的前2位
            //第4个6位 = 第三个8位的后6位
            case 2:
                result.push(base64hash.charAt((prev & 0x0f) << 2 | (ascii >> 6)));
                result.push(base64hash.charAt(ascii & 0x3f));
                break;
        }
        prev = ascii;
        i ++;
    }
    // 循环结束后看mod, 为0 证明需补3个6位，第一个为最后一个8位的最后两位后面补4个0。另外两个6位对应的是异常的“=”；
    // mod为1，证明还需补两个6位，一个是最后一个8位的后4位补两个0，另一个对应异常的“=”
    if(mod == 0) {
        result.push(base64hash.charAt((prev & 3) << 4));
        result.push('==');
    } else if (mod == 1) {
        result.push(base64hash.charAt((prev & 0x0f) << 2));
        result.push('=');
    }
    return result.join('');
};memory.protect(window.btoa);


window.alert = function alert(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.alert);
window.setInterval = function setInterval(x){
    memory.promise['2'] = x;
    return 1
};memory.protect(window.setInterval);
window.clearInterval = function clearInterval(){
};memory.protect(window.clearInterval);
window.setTimeout = function setTimeout(x){
    memory.promise['1'] = x;
    x()
    return 1
};memory.protect(window.setTimeout);
window.clearTimeout = function clearTimeout(x){

};memory.protect(window.clearTimeout);


window.MutationObserver = function MutationObserver(y){
    // debugger
    // y()
};memory.protect(window.MutationObserver);

window.MutationObserver.prototype.observe = function observe(y){

};memory.protect(window.observe);



// eval_ = eval;
// eval = function eval(x){
//     // debugger;
//     // let vvv = Reflect.apply(eval_,this,arguments);
//     // debugger;
//     // return vvv
//     return eval_(x)

// };
// new function(){eval("this.a=1")}();
memory.protect(eval,'eval');


window.HTMLFormElement = function HTMLFormElement(){
    if(memory.callFunDebugger){debugger}
};memory.protect(window.HTMLFormElement);


// 查看ip信息
window.RTCPeerConnection = function RTCPeerConnection(x){
    return memory.objects.RTCPeerConnection
};memory.protect(window.RTCPeerConnection);

mathdata = [true,false,false,true,true,false,false,true,true,false,false,true];
mathdataindex = 0;
window.matchMedia = function matchMedia(x){
    let obj = memory.createProxyObject('MediaQueryList');
    obj.matches = mathdata[mathdataindex++];
    return obj
};memory.protect(window.matchMedia);

window.CSS = function CSS(x){
    debugger
    return {}
};memory.protect(window.CSS);


window.CSS.supports = function supports(x){
    debugger
    return true
};memory.protect(window.CSS.supports);

window.customElements = memory.createProxyObject('customElements')

window.CSSStyleSheet = {};
window.CSSStyleSheet.cssRules = [{cssText: "::marker { }"}]

// col = ['rgb(0, 128, 0)','rgb(255, 0, 0)','rgb(0, 0, 0)','rgb(255, 0, 0)','rgb(0, 0, 255)','rgb(255, 0, 0)']
// //解析dom元素的css信息
// window.getComputedStyle = function getComputedStyle(x){
//     let obj = memory.createProxyObject('CSSStyleDeclaration'); // 创建一个新的能开代理的对象
//     obj.getPropertyValue = function(x){
//         if('color'==x){
//             return col.shift()
//         }
//     }
//     return obj
// };memory.protect(window.getComputedStyle);

window.ActiveXObject = undefined
window.SyncManager = function SyncManager(x){
    return true
};memory.protect(window.SyncManager);

window.RTCPeerConnectionIceEvent = function RTCPeerConnectionIceEvent(){
    debugger
};memory.protect(window.RTCPeerConnectionIceEvent);

window.WebSocket = function WebSocket(x){
    throw new TypeError("Failed to construct 'WebSocket': The URL '"+x+"' is invalid.");
};memory.protect(window.WebSocket);

window.Notification = function Notification(){

};memory.protect(window.Notification);

window.OffscreenCanvasRenderingContext2D = function OffscreenCanvasRenderingContext2D(){

};memory.protect(window.OffscreenCanvasRenderingContext2D);

window.external = {};

window.External = function External(){

};memory.protect(window.External);


memory.make_chain(['External'],window.external)
window.external.IsSearchProviderInstalled = null;


window.TextTrackList = function TextTrackList(){

};memory.protect(window.TextTrackList);

window.TextTrackList.prototype.getTrackById = function getTrackById(){

};memory.protect(window.TextTrackList.prototype.getTrackById);
Window = function Window(){
    throw new TypeError('Illegal constructor');
};memory.protect(Window);

Window.prototype.TEMPORARY = 0;
Window.prototype.PERSISTENT = 1;
memory.data.WindowProperties = {};
EventTarget = function EventTarget(){};memory.protect(EventTarget);




EventTarget.prototype.addEventListener = function addEventListener(x,y){
    // if(x == 'load'){
    //     y()
    // }
    let name = 'lixia_' + x;
    if(memory.EventListener[name]){
        if(memory.EventListener[name].includes(y)){;return}
        memory.EventListener[name].push(y)
    }else{
        memory.EventListener[name] = [y]
    }
};memory.protect(EventTarget.prototype.addEventListener);
Node = function Node(){
    throw new TypeError('Illegal constructor');
};memory.protect(Node);


Node.prototype.appendChild = function appendChild(newNode){
    // if(this.lixia == 'body' || this.lixia == 'head'){
    //     document.childNodes.push(this);
    // }
    if(newNode.parentNode){
        newNode.parentNode.removeChild(newNode);
        newNode.parentNode = undefined;
        newNode.parentElement = undefined;
    }
    if(this == newNode || this == newNode.parentNode){
        return newNode
    }
    if(!this.childNodes.some((x)=>{return x==newNode})){
        this.childNodes.push(newNode);
        newNode.parentNode = this;
        newNode.parentElement = this;
    }
    return newNode;
};memory.protect(Node.prototype.appendChild);


Node.prototype.removeChild = function removeChild(child){
    let index = this.childNodes.indexOf(child);
    if(index != -1){
        this.childNodes.splice(index,1);
        child.parentNode = undefined;
        child.parentElement = undefined;
    }
    return child
};memory.protect(Node.prototype.removeChild);


Node.prototype.replaceChild = function replaceChild(newChild, oldChild){
    if(newChild==oldChild){
        return oldChild
    }
    if(oldChild.parentNode){
        oldChild.parentNode.removeChild(oldChild);
        oldChild.parentNode = undefined;
        oldChild.parentElement = undefined;
    }
    if(this.childNodes.some((x)=>{return x==newChild})){
        this.childNodes.splice(this.childNodes.indexOf(newChild),1)
    }
    for(let i=0; i<this.childNodes.length; i++){
        if(oldChild == this.childNodes[i]){
            this.childNodes[i] = newChild;
            return oldChild
        }
    }
};memory.protect(Node.prototype.replaceChild);


Node.prototype.cloneNode = function cloneNode(x){
    if(x){
        return memory.extendCopy(this);
    }else{
        caocao = memory.extendCopy(this);
        caocao.childNodes = []
        return caocao
    }
};memory.protect(Node.prototype.cloneNode);


Node.prototype.insertBefore = function insertBefore(newNode, referenceNode){
    if(this.childNodes.some((x)=>{return x==newNode})){
        this.childNodes.splice(this.childNodes.indexOf(newNode),1)
        for(let i=0; i<this.childNodes.length; i++){
            if(referenceNode == this.childNodes[i]){
                this.childNodes.splice(i++,0,newNode)
            }
        }
    }else{
        this.childNodes.push(newNode)
    };
    return newNode
};memory.protect(Node.prototype.insertBefore);


HTMLElement = function HTMLElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLElement);
Element = function Element(){
    throw new TypeError('Illegal constructor');
};memory.protect(Element);


Element.prototype.setAttribute = function setAttribute(key,val){
    this[key] = val;
};memory.protect(Element.prototype.setAttribute);

Element.prototype.getAttribute = function getAttribute(key,val){
    return this[key]
};memory.protect(Element.prototype.getAttribute);

Element.prototype.removeAttribute = function removeAttribute(key){
    delete this[key]
};memory.protect(Element.prototype.removeAttribute);


Element.prototype.getElementsByTagName = function(x){
    return memory.filter_obj(this.childNodes,{'lixia':x},'childNodes')
};memory.protect(Element.prototype.getElementsByTagName);



Object.defineProperty(Element.prototype, 'outerHTML', {
    get: function(){
        let caocao = '<'+this.lixia;
        if(this.class){
            caocao += ' class="'+this.class+'"'
        }
        if(this.id && this.id != "50000000"){
            caocao += ' id="'+this.id+'"'
        }
        if(this.content){
            caocao += this.content;
        }
        caocao += '>'
        if(this.childNodes && this.childNodes.length>0){
            for(let x of this.childNodes){
                caocao += memory.domStr(x)
            }
        }
        caocao += '</'+this.lixia+'>';
        return caocao
    }}
);

Object.defineProperty(Element.prototype, 'innerHTML', {
        get: function(){
            if(this.childNodes && this.childNodes.length>0){
                caocao = ''
                for(let x of this.childNodes){
                    caocao += memory.domStr(x,this)
                }
                return caocao
            }
            return null
        },
        set:function(x){
            let xx = x.replace(/[\r\n]/g,"");
            let result = memory.str_to_dom(xx);
            memory.dom_create(this,result)
        }
    }
);
HTMLDocument = function HTMLDocument(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLDocument);


Document = function Document(){

};memory.protect(Document);


memory.create_count = 0;
memory.fontSize = ["SimHei","SimSun","NSimSun","FangSong","KaiTi","Verdana","Helvetica Neue LT Pro 35 Thin","tahoma","verdana","times new roman","Courier New","Microsoft Himalaya","helvetica","LG-FZKaTong-M19-V2.2","Georgia","georgia","courier new","Arial","arial","cursive","times","fantasy","courier","serif","monospace","Times New Roman"];
Document.prototype.createElement = function createElement(tag){
    let caocao;
    if(tag=='canvas'){
        caocao = memory.create_element.create_canvas();
    }
    else if(tag=='iframe'){
        caocao = memory.create_element.create_iframe();
    }
    else if(tag=='div'){
        caocao = memory.create_element.create_div();
    }
    else if(tag=='span'){
        caocao = memory.create_element.create_span();
    }
    else if(tag=='p'){
        caocao = memory.create_element.create_p();
    }
    else if(tag=='style'){
        caocao = memory.create_element.create_style();
    }
    else if(tag=='a'){
        caocao = memory.create_element.create_a();
    }
    else if(tag == 'h1'){
        caocao = memory.create_element.create_h1();
    }
    else if(tag=='li'){
        caocao = memory.create_element.create_li()
    }
    else if(tag=='video'){
        caocao = memory.create_element.create_video()
    }
    else if(tag=='meta'){
        caocao = memory.create_element.create_meta()
    }
    else if(tag=='script'){
        caocao = memory.create_element.create_script()
    }
    else if(tag=='form'){
        caocao = memory.create_element.create_form();
        caocao = memory.hookDomGet(caocao,['innerText','action','id','textContent']);
    }
    else if(tag=='input'){
        caocao = memory.create_element.create_input()
    }else if(tag=='audio'){
        caocao = memory.create_element.create_audio()
    }
    else{
        caocao = memory.create_element.create_other(tag);
    };
    memory.create_count += 1
    caocao.order = memory.create_count;

    // caocao.childNodes = [];
    // memory.rename(caocao.childNodes,'NodeList');
    // caocao.children = [];
    // memory.rename(caocao.children,'HTMLCollection');

    caocao.style = memory.createProxyObject('CSSStyleDeclaration');

    Object.defineProperty(caocao, 'offsetHeight', {
        get: function(){
            let fff = this.style['fontFamily'];
            if(memory.fontSize.includes(fff)){
                return 114
            }else{
                return 150
            }
        }});
    Object.defineProperty(caocao, 'offsetWidth', {
        get: function(){
            let fff = this.style['fontFamily'];
            if(memory.fontSize.includes(fff)){
                return 666
            }else{
                return 1327
            }
        }});
    return caocao
};memory.protect(Document.prototype.createElement);




Document.prototype.getElementById = function getElementById(tag){
    return memory.domForObj(document,tag)
};memory.protect(Document.prototype.getElementById);


Document.prototype.getElementsByClassName = function getElementsByClassName(tag){
    return memory.filter_obj(this.childNodes,{'class':tag},'childNodes')
};memory.protect(Document.prototype.getElementsByClassName);


Document.prototype.getElementsByTagName = function getElementsByTagName(tag){
    let val = memory.filter_obj(this.childNodes,{'lixia':tag},'childNodes');
    return val
};memory.protect(Document.prototype.getElementsByTagName);


Document.prototype.exitFullscreen = function exitFullscreen(){

};memory.protect(Document.prototype.exitFullscreen);




memory.create_element.create_document = function(){
    let obj = memory.createProxyObject('document');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLDocument','Document','Node','EventTarget'],obj);
    return obj
};
;
memory.objects.webgl = memory.createProxyObject('WebGLRenderingContext');

memory.objects.webgl.drawingBufferHeight = 150;
memory.objects.webgl.drawingBufferWidth = 300;

webglobj = {
    "ACTIVE_ATTRIBUTES":"35721",
    "ACTIVE_TEXTURE":"34016",
    "ACTIVE_UNIFORMS":"35718",
    "ALIASED_LINE_WIDTH_RANGE":"33902",
    "ALIASED_POINT_SIZE_RANGE":"33901",
    "ALPHA":"6406",
    "ALPHA_BITS":"3413",
    "ALWAYS":"519",
    "ARRAY_BUFFER":"34962",
    "ARRAY_BUFFER_BINDING":"34964",
    "ATTACHED_SHADERS":"35717",
    "BACK":"1029",
    "BLEND":"3042",
    "BLEND_COLOR":"32773",
    "BLEND_DST_ALPHA":"32970",
    "BLEND_DST_RGB":"32968",
    "BLEND_EQUATION":"32777",
    "BLEND_EQUATION_ALPHA":"34877",
    "BLEND_EQUATION_RGB":"32777",
    "BLEND_SRC_ALPHA":"32971",
    "BLEND_SRC_RGB":"32969",
    "BLUE_BITS":"3412",
    "BOOL":"35670",
    "BOOL_VEC2":"35671",
    "BOOL_VEC3":"35672",
    "BOOL_VEC4":"35673",
    "BROWSER_DEFAULT_WEBGL":"37444",
    "BUFFER_SIZE":"34660",
    "BUFFER_USAGE":"34661",
    "BYTE":"5120",
    "CCW":"2305",
    "CLAMP_TO_EDGE":"33071",
    "COLOR_ATTACHMENT0":"36064",
    "COLOR_BUFFER_BIT":"16384",
    "COLOR_CLEAR_VALUE":"3106",
    "COLOR_WRITEMASK":"3107",
    "COMPILE_STATUS":"35713",
    "COMPRESSED_TEXTURE_FORMATS":"34467",
    "CONSTANT_ALPHA":"32771",
    "CONSTANT_COLOR":"32769",
    "CONTEXT_LOST_WEBGL":"37442",
    "CULL_FACE":"2884",
    "CULL_FACE_MODE":"2885",
    "CURRENT_PROGRAM":"35725",
    "CURRENT_VERTEX_ATTRIB":"34342",
    "CW":"2304",
    "DECR":"7683",
    "DECR_WRAP":"34056",
    "DELETE_STATUS":"35712",
    "DEPTH_ATTACHMENT":"36096",
    "DEPTH_BITS":"3414",
    "DEPTH_BUFFER_BIT":"256",
    "DEPTH_CLEAR_VALUE":"2931",
    "DEPTH_COMPONENT":"6402",
    "DEPTH_COMPONENT16":"33189",
    "DEPTH_FUNC":"2932",
    "DEPTH_RANGE":"2928",
    "DEPTH_STENCIL":"34041",
    "DEPTH_STENCIL_ATTACHMENT":"33306",
    "DEPTH_TEST":"2929",
    "DEPTH_WRITEMASK":"2930",
    "DITHER":"3024",
    "DONT_CARE":"4352",
    "DST_ALPHA":"772",
    "DST_COLOR":"774",
    "DYNAMIC_DRAW":"35048",
    "ELEMENT_ARRAY_BUFFER":"34963",
    "ELEMENT_ARRAY_BUFFER_BINDING":"34965",
    "EQUAL":"514",
    "FASTEST":"4353",
    "FLOAT":"5126",
    "FLOAT_MAT2":"35674",
    "FLOAT_MAT3":"35675",
    "FLOAT_MAT4":"35676",
    "FLOAT_VEC2":"35664",
    "FLOAT_VEC3":"35665",
    "FLOAT_VEC4":"35666",
    "FRAGMENT_SHADER":"35632",
    "FRAMEBUFFER":"36160",
    "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME":"36049",
    "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE":"36048",
    "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE":"36051",
    "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL":"36050",
    "FRAMEBUFFER_BINDING":"36006",
    "FRAMEBUFFER_COMPLETE":"36053",
    "FRAMEBUFFER_INCOMPLETE_ATTACHMENT":"36054",
    "FRAMEBUFFER_INCOMPLETE_DIMENSIONS":"36057",
    "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT":"36055",
    "FRAMEBUFFER_UNSUPPORTED":"36061",
    "FRONT":"1028",
    "FRONT_AND_BACK":"1032",
    "FRONT_FACE":"2886",
    "FUNC_ADD":"32774",
    "FUNC_REVERSE_SUBTRACT":"32779",
    "FUNC_SUBTRACT":"32778",
    "GENERATE_MIPMAP_HINT":"33170",
    "GEQUAL":"518",
    "GREATER":"516",
    "GREEN_BITS":"3411",
    "HIGH_FLOAT":"36338",
    "HIGH_INT":"36341",
    "IMPLEMENTATION_COLOR_READ_FORMAT":"35739",
    "IMPLEMENTATION_COLOR_READ_TYPE":"35738",
    "INCR":"7682",
    "INCR_WRAP":"34055",
    "INT":"5124",
    "INT_VEC2":"35667",
    "INT_VEC3":"35668",
    "INT_VEC4":"35669",
    "INVALID_ENUM":"1280",
    "INVALID_FRAMEBUFFER_OPERATION":"1286",
    "INVALID_OPERATION":"1282",
    "INVALID_VALUE":"1281",
    "INVERT":"5386",
    "KEEP":"7680",
    "LEQUAL":"515",
    "LESS":"513",
    "LINEAR":"9729",
    "LINEAR_MIPMAP_LINEAR":"9987",
    "LINEAR_MIPMAP_NEAREST":"9985",
    "LINES":"1",
    "LINE_LOOP":"2",
    "LINE_STRIP":"3",
    "LINE_WIDTH":"2849",
    "LINK_STATUS":"35714",
    "LOW_FLOAT":"36336",
    "LOW_INT":"36339",
    "LUMINANCE":"6409",
    "LUMINANCE_ALPHA":"6410",
    "MAX_COMBINED_TEXTURE_IMAGE_UNITS":"35661",
    "MAX_CUBE_MAP_TEXTURE_SIZE":"34076",
    "MAX_FRAGMENT_UNIFORM_VECTORS":"36349",
    "MAX_RENDERBUFFER_SIZE":"34024",
    "MAX_TEXTURE_IMAGE_UNITS":"34930",
    "MAX_TEXTURE_SIZE":"3379",
    "MAX_VARYING_VECTORS":"36348",
    "MAX_VERTEX_ATTRIBS":"34921",
    "MAX_VERTEX_TEXTURE_IMAGE_UNITS":"35660",
    "MAX_VERTEX_UNIFORM_VECTORS":"36347",
    "MAX_VIEWPORT_DIMS":"3386",
    "MEDIUM_FLOAT":"36337",
    "MEDIUM_INT":"36340",
    "MIRRORED_REPEAT":"33648",
    "NEAREST":"9728",
    "NEAREST_MIPMAP_LINEAR":"9986",
    "NEAREST_MIPMAP_NEAREST":"9984",
    "NEVER":"512",
    "NICEST":"4354",
    "NONE":"0",
    "NOTEQUAL":"517",
    "NO_ERROR":"0",
    "ONE":"1",
    "ONE_MINUS_CONSTANT_ALPHA":"32772",
    "ONE_MINUS_CONSTANT_COLOR":"32770",
    "ONE_MINUS_DST_ALPHA":"773",
    "ONE_MINUS_DST_COLOR":"775",
    "ONE_MINUS_SRC_ALPHA":"771",
    "ONE_MINUS_SRC_COLOR":"769",
    "OUT_OF_MEMORY":"1285",
    "PACK_ALIGNMENT":"3333",
    "POINTS":"0",
    "POLYGON_OFFSET_FACTOR":"32824",
    "POLYGON_OFFSET_FILL":"32823",
    "POLYGON_OFFSET_UNITS":"10752",
    "RED_BITS":"3410",
    "RENDERBUFFER":"36161",
    "RENDERBUFFER_ALPHA_SIZE":"36179",
    "RENDERBUFFER_BINDING":"36007",
    "RENDERBUFFER_BLUE_SIZE":"36178",
    "RENDERBUFFER_DEPTH_SIZE":"36180",
    "RENDERBUFFER_GREEN_SIZE":"36177",
    "RENDERBUFFER_HEIGHT":"36163",
    "RENDERBUFFER_INTERNAL_FORMAT":"36164",
    "RENDERBUFFER_RED_SIZE":"36176",
    "RENDERBUFFER_STENCIL_SIZE":"36181",
    "RENDERBUFFER_WIDTH":"36162",
    "RENDERER":"7937",
    "REPEAT":"10497",
    "REPLACE":"7681",
    "RGB":"6407",
    "RGB5_A1":"32855",
    "RGB565":"36194",
    "RGBA":"6408",
    "RGBA4":"32854",
    "SAMPLER_2D":"35678",
    "SAMPLER_CUBE":"35680",
    "SAMPLES":"32937",
    "SAMPLE_ALPHA_TO_COVERAGE":"32926",
    "SAMPLE_BUFFERS":"32936",
    "SAMPLE_COVERAGE":"32928",
    "SAMPLE_COVERAGE_INVERT":"32939",
    "SAMPLE_COVERAGE_VALUE":"32938",
    "SCISSOR_BOX":"3088",
    "SCISSOR_TEST":"3089",
    "SHADER_TYPE":"35663",
    "SHADING_LANGUAGE_VERSION":"35724",
    "SHORT":"5122",
    "SRC_ALPHA":"770",
    "SRC_ALPHA_SATURATE":"776",
    "SRC_COLOR":"768",
    "STATIC_DRAW":"35044",
    "STENCIL_ATTACHMENT":"36128",
    "STENCIL_BACK_FAIL":"34817",
    "STENCIL_BACK_FUNC":"34816",
    "STENCIL_BACK_PASS_DEPTH_FAIL":"34818",
    "STENCIL_BACK_PASS_DEPTH_PASS":"34819",
    "STENCIL_BACK_REF":"36003",
    "STENCIL_BACK_VALUE_MASK":"36004",
    "STENCIL_BACK_WRITEMASK":"36005",
    "STENCIL_BITS":"3415",
    "STENCIL_BUFFER_BIT":"1024",
    "STENCIL_CLEAR_VALUE":"2961",
    "STENCIL_FAIL":"2964",
    "STENCIL_FUNC":"2962",
    "STENCIL_INDEX8":"36168",
    "STENCIL_PASS_DEPTH_FAIL":"2965",
    "STENCIL_PASS_DEPTH_PASS":"2966",
    "STENCIL_REF":"2967",
    "STENCIL_TEST":"2960",
    "STENCIL_VALUE_MASK":"2963",
    "STENCIL_WRITEMASK":"2968",
    "STREAM_DRAW":"35040",
    "SUBPIXEL_BITS":"3408",
    "TEXTURE":"5890",
    "TEXTURE0":"33984",
    "TEXTURE1":"33985",
    "TEXTURE2":"33986",
    "TEXTURE3":"33987",
    "TEXTURE4":"33988",
    "TEXTURE5":"33989",
    "TEXTURE6":"33990",
    "TEXTURE7":"33991",
    "TEXTURE8":"33992",
    "TEXTURE9":"33993",
    "TEXTURE10":"33994",
    "TEXTURE11":"33995",
    "TEXTURE12":"33996",
    "TEXTURE13":"33997",
    "TEXTURE14":"33998",
    "TEXTURE15":"33999",
    "TEXTURE16":"34000",
    "TEXTURE17":"34001",
    "TEXTURE18":"34002",
    "TEXTURE19":"34003",
    "TEXTURE20":"34004",
    "TEXTURE21":"34005",
    "TEXTURE22":"34006",
    "TEXTURE23":"34007",
    "TEXTURE24":"34008",
    "TEXTURE25":"34009",
    "TEXTURE26":"34010",
    "TEXTURE27":"34011",
    "TEXTURE28":"34012",
    "TEXTURE29":"34013",
    "TEXTURE30":"34014",
    "TEXTURE31":"34015",
    "TEXTURE_2D":"3553",
    "TEXTURE_BINDING_2D":"32873",
    "TEXTURE_BINDING_CUBE_MAP":"34068",
    "TEXTURE_CUBE_MAP":"34067",
    "TEXTURE_CUBE_MAP_NEGATIVE_X":"34070",
    "TEXTURE_CUBE_MAP_NEGATIVE_Y":"34072",
    "TEXTURE_CUBE_MAP_NEGATIVE_Z":"34074",
    "TEXTURE_CUBE_MAP_POSITIVE_X":"34069",
    "TEXTURE_CUBE_MAP_POSITIVE_Y":"34071",
    "TEXTURE_CUBE_MAP_POSITIVE_Z":"34073",
    "TEXTURE_MAG_FILTER":"10240",
    "TEXTURE_MIN_FILTER":"10241",
    "TEXTURE_WRAP_S":"10242",
    "TEXTURE_WRAP_T":"10243",
    "TRIANGLES":"4",
    "TRIANGLE_FAN":"6",
    "TRIANGLE_STRIP":"5",
    "UNPACK_ALIGNMENT":"3317",
    "UNPACK_COLORSPACE_CONVERSION_WEBGL":"37443",
    "UNPACK_FLIP_Y_WEBGL":"37440",
    "UNPACK_PREMULTIPLY_ALPHA_WEBGL":"37441",
    "UNSIGNED_BYTE":"5121",
    "UNSIGNED_INT":"5125",
    "UNSIGNED_SHORT":"5123",
    "UNSIGNED_SHORT_4_4_4_4":"32819",
    "UNSIGNED_SHORT_5_5_5_1":"32820",
    "UNSIGNED_SHORT_5_6_5":"33635",
    "VALIDATE_STATUS":"35715",
    "VENDOR":"7936",
    "VERSION":"7938",
    "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING":"34975",
    "VERTEX_ATTRIB_ARRAY_ENABLED":"34338",
    "VERTEX_ATTRIB_ARRAY_NORMALIZED":"34922",
    "VERTEX_ATTRIB_ARRAY_POINTER":"34373",
    "VERTEX_ATTRIB_ARRAY_SIZE":"34339",
    "VERTEX_ATTRIB_ARRAY_STRIDE":"34340",
    "VERTEX_ATTRIB_ARRAY_TYPE":"34341",
    "VERTEX_SHADER":"35633",
    "VIEWPORT":"2978",
    "ZERO":"0",
}

Object.assign(memory.objects.webgl,webglobj)
// memory.objects.webgl.ARRAY_BUFFER = 34962;
// memory.objects.webgl.STATIC_DRAW = 35044;
// memory.objects.webgl.VERTEX_SHADER = 35633;
// memory.objects.webgl.FRAGMENT_SHADER = 35632;

memory.objects.webgl.getSupportedExtensions = function getSupportedExtensions(){
    return memory.SupportedExtensions
};memory.protect(memory.objects.webgl.getSupportedExtensions);

memory.objects.webgl.getExtension = function getExtension(x){
    if(x=='WEBGL_debug_renderer_info'){
        return {
            UNMASKED_RENDERER_WEBGL: 37446,
            UNMASKED_VENDOR_WEBGL: 37445
        }
    }
};memory.protect(memory.objects.webgl.getExtension);

memory.objects.webgl.getParameter = function getParameter(x){
    if(x==37445){
        return memory.neihe_data
    }
    else if(x==37446){
        return memory.xianka_data
    }
};memory.protect(memory.objects.webgl.getParameter);


memory.objects.webgl.createBuffer= function createBuffer(x){
    return memory.createProxyObject('WebGLBuffer');
};memory.protect(memory.objects.webgl.createBuffer);

memory.objects.webgl.bindBuffer= function bindBuffer(x){

};memory.protect(memory.objects.webgl.bindBuffer);

memory.objects.webgl.bufferData= function bufferData(x){

};memory.protect(memory.objects.webgl.bufferData);

memory.objects.webgl.createProgram= function createProgram(x){
    let y = memory.createProxyObject('WebGLProgram');
    y.offsetUniform = function offsetUniform(){
        let yy = memory.createProxyObject('WebGLUniformLocation');
        return yy
    };memory.protect(y.offsetUniform);
    return y
};memory.protect(memory.objects.webgl.createProgram);

memory.objects.webgl.linkProgram= function linkProgram(x){

};memory.protect(memory.objects.webgl.linkProgram);

memory.objects.webgl.createShader= function createShader(x){
    let y = memory.createProxyObject('WebGLShader');
    return y
};memory.protect(memory.objects.webgl.createShader);

memory.objects.webgl.shaderSource= function shaderSource(x){

};memory.protect(memory.objects.webgl.shaderSource);

memory.objects.webgl.compileShader= function compileShader(x){

};memory.protect(memory.objects.webgl.compileShader);

memory.objects.webgl.attachShader= function attachShader(x){

};memory.protect(memory.objects.webgl.attachShader);

memory.objects.webgl.useProgram= function useProgram(x){
    let y = memory.createProxyObject('useProgramuseProgramuseProgram');
    return y
};memory.protect(memory.objects.webgl.useProgram);

memory.objects.webgl.getAttribLocation= function getAttribLocation(x){

};memory.protect(memory.objects.webgl.getAttribLocation);

memory.objects.webgl.getUniformLocation= function getUniformLocation(x){

};memory.protect(memory.objects.webgl.getUniformLocation);

memory.objects.webgl.enableVertexAttribArray= function enableVertexAttribArray(x){

};memory.protect(memory.objects.webgl.enableVertexAttribArray);

memory.objects.webgl.vertexAttribPointer= function vertexAttribPointer(x){

};memory.protect(memory.objects.webgl.vertexAttribPointer);

memory.objects.webgl.uniform2f= function uniform2f(x){

};memory.protect(memory.objects.webgl.uniform2f);

memory.objects.webgl.drawArrays= function drawArrays(x){

};memory.protect(memory.objects.webgl.drawArrays);

maxmin = [127,127,23,15,15,10,15,15,10,31,30,0,15,14,0,15,14,0,127,127,23,15,15,10,15,15,10,31,30,0,15,14,0,15,14,0];
maxminindex = 0;
memory.objects.webgl.getShaderPrecisionFormat= function getShaderPrecisionFormat(x){
    let y = memory.createProxyObject('WebGLShaderPrecisionFormat');
    Object.defineProperty(y, 'rangeMin', {
        get: function(){
            return maxmin[maxminindex++];
        }});
    Object.defineProperty(y, 'rangeMax', {
        get: function(){
            return maxmin[maxminindex++];
        }});
    Object.defineProperty(y, 'precision', {
        get: function(){
            return maxmin[maxminindex++];
        }});
    return y
};memory.protect(memory.objects.webgl.getShaderPrecisionFormat);
;
memory.objects.CanvasRenderingContext2D = memory.createProxyObject('CanvasRenderingContext2D');

memory.objects.CanvasRenderingContext2D.fillRect = function fillRect(){
    return memory.createProxyObject('fillRect')
};memory.protect(memory.objects.CanvasRenderingContext2D.fillRect);

memory.objects.CanvasRenderingContext2D.fillText = function fillText(){
    return memory.createProxyObject('fillText')
};memory.protect(memory.objects.CanvasRenderingContext2D.fillText);

;
HTMLCanvasElement = function HTMLCanvasElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLCanvasElement);


HTMLCanvasElement.prototype.getContext = function getContext(x){
    return memory.objects[x]
};memory.protect(HTMLCanvasElement.prototype.getContext);

HTMLCanvasElement.prototype.captureStream = function captureStream(x){
    return true
};memory.protect(HTMLCanvasElement.prototype.captureStream);
memory.create_element.create_canvas = function(){
    let obj = memory.createProxyObject('canvas');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    obj.getContext = function getContext(x){
        if(x=='webgl'){
            let x = memory.objects.webgl
            x.canvas = memory.create_element.create_canvas();
            x.canvas.toDataURL = function toDataURL(){
                return memory.canvas_toDataUrl_1;
            };memory.protect(obj.toDataURL)
            return x
        }
        else if(x=='2d'){
            return memory.objects.CanvasRenderingContext2D
        }
    };memory.protect(obj.getContext);
    obj.toDataURL = function toDataURL(){
        return memory.canvas_toDataURL;
    };memory.protect(obj.toDataURL)

    memory.make_chain(['HTMLCanvasElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLAnchorElement = function HTMLAnchorElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLAnchorElement);
memory.create_element.create_a = function(){
    let obj = memory.createProxyObject('a');

    (function() {
        'use strict';
        var cookieTemp = "";
        Object.defineProperty(obj, 'href', {
            set: function(val) {
                cookieTemp = val;
                this.host = this.hostname = location.hostname;
                this.baseURI = location.href;
                this.port = '';
                this.hash = '';

                if(val.indexOf('http') != -1){
                    let pathname_ = '/' + val.split('//')[1].split('/').slice(1).join('/')
                    this.pathname = pathname_.split('?')[0]
                    this.protocol = val.split('//')[0]
                }else{
                    let pathname_  = val;
                    this.pathname = pathname_.split('?')[0]
                    this.protocol = location.protocol;
                }
                this.origin = this.protocol + '//' + this.hostname
                if(val.indexOf('?') != -1){
                    this.search = '?' + val.split('?').slice(-1)[0]
                }else{
                    this.search = ''
                }
                return val;
            },
            get: function(){
                // debugger
                if(cookieTemp.indexOf('http') == -1){
                    return this.protocol + '//' + this.host + cookieTemp
                }
                return cookieTemp
            }});
    })();

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLAnchorElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

;
HTMLHeadElement = function HTMLHeadElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLHeadElement);
memory.create_element.create_head = function(){
    let obj = memory.createProxyObject('head');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLHeadElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};


;
HTMLSpanElement = function HTMLSpanElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLSpanElement);
memory.create_element.create_span = function(){
    let obj = memory.createProxyObject('span');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLSpanElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLBodyElement = function HTMLBodyElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLBodyElement);
memory.create_element.create_body = function(){
    let obj = memory.createProxyObject('body');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLBodyElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

// Document.prototype.body = memory.create_element.create_body();

;
HTMLParagraphElement = function HTMLParagraphElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLParagraphElement);
memory.create_element.create_p = function(){
    let obj = memory.createProxyObject('p');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLParagraphElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLDivElement = function HTMLDivElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLDivElement);
memory.create_element.create_div = function(){
    let obj = memory.createProxyObject('div');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLDivElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

;
HTMLIFrameElement = function HTMLIFrameElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLIFrameElement);


memory.create_element.create_iframe = function(){
    let obj = memory.createProxyObject('iframe');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    obj.contentWindow = {
        'document':memory.create_element.create_document()
    };
    let v = memory.create_element.create_video();
    v.id = 'preview'
    obj.contentWindow.document.appendChild(v)

    obj.style = {
        'display':'none'
    }
    memory.make_chain(['HTMLIFrameElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};
;
HTMLUnknownElement = function HTMLUnknownElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLUnknownElement);


memory.create_element.create_other = function(x){
    let obj = memory.createProxyObject(x);

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLUnknownElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};
;
HTMLStyleElement = function HTMLStyleElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLStyleElement);


HTMLStyleElement.prototype.remove = function remove(){
    return false
};memory.protect(HTMLStyleElement.prototype.remove);
memory.create_element.create_style = function(){
    let obj = memory.createProxyObject('style');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    obj.sheet = {cssRules:[{cssText: "::marker { }"}]};

    memory.make_chain(['HTMLStyleElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLHtmlElement = function HTMLHtmlElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLHtmlElement);


memory.create_element.create_html = function(){
    let obj = memory.createProxyObject('html');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLHtmlElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};
;
HTMLMediaElement = function HTMLMediaElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLMediaElement);


HTMLMediaElement.prototype.captureStream = function captureStream(){
    return true
};memory.protect(HTMLMediaElement.prototype.captureStream);


cantype2 = ['probably15','probably16','probably17','probably18','probably19','probably20','probably21','probably22','probably23','probably24','probably25','probably26','probably27','probably28'];
cantypeindex2 = 0;
HTMLMediaElement.prototype.canPlayType = function canPlayType(){
    return cantype2[cantypeindex2++]
};memory.protect(HTMLMediaElement.prototype.canPlayType);
HTMLVideoElement = function HTMLVideoElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLVideoElement);

memory.create_element.create_video = function(){
    let obj = memory.createProxyObject('video');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLVideoElement','HTMLMediaElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLHeadingElement = function HTMLHeadingElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLHeadingElement);
memory.create_element.create_h1 = function(){
    let obj = memory.createProxyObject('h1');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLHeadingElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

;
HTMLLIElement = function HTMLLIElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLLIElement);
memory.create_element.create_li = function(){
    let obj = memory.createProxyObject('li');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLLIElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLMetaElement = function HTMLMetaElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLMetaElement);
memory.create_element.create_meta = function(){
    let obj = memory.createProxyObject('meta');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLMetaElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLScriptElement = function HTMLScriptElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLScriptElement);
memory.create_element.create_script = function(){
    let obj = memory.createProxyObject('script');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLScriptElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
HTMLFormElement = function HTMLFormElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLFormElement);
memory.create_element.create_form = function(){
    let obj = memory.createProxyObject('form');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLFormElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};

;
HTMLInputElement = function HTMLInputElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLInputElement);


memory.create_element.create_input = function(){
    let obj = memory.createProxyObject('input');

    obj.childNodes = [];
    // memory.rename(obj.childNodes,'NodeList');
    obj.children = obj.childNodes;
    // memory.rename(obj.children,'HTMLCollection');

    memory.make_chain(['HTMLInputElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
};
;
HTMLAudioElement = function HTMLAudioElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLAudioElement);
HTMLMediaElement = function HTMLMediaElement(){
    throw new TypeError('Illegal constructor');
};memory.protect(HTMLMediaElement);


cantype = ['probably','probably','probably','maybe','probably','probably','probably'];
cantypeindex = 0;
HTMLMediaElement.prototype.canPlayType = function canPlayType(){
    return cantype[cantypeindex++]
};memory.protect(HTMLMediaElement.prototype.canPlayType);
memory.create_element.create_audio = function(){
    let obj = memory.createProxyObject('audio');

    obj.childNodes = [];
    obj.children = obj.childNodes;

    memory.make_chain(['HTMLAudioElement','HTMLMediaElement','HTMLElement','Element','Node','EventTarget'],obj);
    return obj
}
;
;
Document.prototype.documentElement = memory.create_element.create_html();
Document.prototype.documentElement.style = memory.createProxyObject('CSSStyleDeclaration');
Document.prototype.documentElement.onresize = null;
Document.prototype.documentElement.style.fontVariantNumeric = '';
document = memory.create_element.create_document();

// document.body = memory.create_element.create_body();
// document.documentElement.appendChild(document.body);

document.head = memory.create_element.create_head();
document.documentElement.appendChild(document.head);
document.appendChild(document.documentElement);
document.scrollingElement = document.documentElement;

document.characterSet = "UTF-8";
document.charset = "UTF-8";
document.hidden = false;
document.visibilityState = "visible";
document.onselectionchange = null;
document.onmousemove = null;
document.createExpression = function createExpression(){
    // var obj = memory.createProxyObject('XPathExpression')
    //     // return obj
};memory.protect(document.createExpression)


document.all = {}//lixia_tools.lixia();
Object.defineProperties(document.all,{[Symbol.toStringTag]:{value:"HTMLAllCollection", configurable:true}})
document.all.length = 3
document.scripts = [];


MimeType = function MimeType(){
    throw new TypeError('Illegal constructor');
};memory.protect(MimeType);
memory.create_MimeType = function create_MimeType(type){
    let obj = memory.createProxyObject('MimeType');
    obj.type = type;
    obj.suffixes = "pdf";
    obj.description = "Portable Document Format";
    memory.make_chain(['MimeType'],obj);
    return obj
}
;
Plugin = function Plugin(){
    throw new TypeError('Illegal constructor');
};memory.protect(Plugin);
memory.create_plugin = function create_plugin(name){
    let obj = [];
    obj.push(memory.create_MimeType('application/pdf'))
    obj.push(memory.create_MimeType('text/pdf'))
    obj.description = "Portable Document Format";
    obj.filename =  "internal-pdf-viewer";
    obj.name = name;
    memory.make_chain(['Plugin'],obj);
    return obj
}
;
Navigator = function(){
    throw new TypeError('Illegal constructor');
};memory.protect(Navigator);

Navigator.prototype.webkitPersistentStorage = {};

Navigator.prototype.getBattery = function getBattery(){
    if(memory.callFunDebugger){debugger}
    obj = {then:function(x){
            x({
                'charging':true,
                'chargingTime':0,
                'dischargingTime':Infinity,
                'level':1,
                'onchargingchange':null,
                'onchargingtimechange':null,
                'ondischargingtimechange':null,
                'onlevelchange':null,
            })
        }}
    return obj
};memory.protect(Navigator.prototype.getBattery);

Navigator.prototype.maxTouchPoints = 0;

Navigator.prototype.requestMIDIAccess = function requestMIDIAccess(){
    return true
};memory.protect(Navigator.prototype.requestMIDIAccess);


Navigator.prototype.webdriver = false;
xxs = function(){return false};memory.protect(xxs,'get webdriver')
Object.defineProperty(Navigator.prototype, 'webdriver', {
    enumerable: true, // 不可枚举
    configurable: false, // 不可改写
    get:xxs,
    set:undefined
})

// memory.pro_thr(Navigator.prototype,'webdriver','webdriver')



navigator = {};

navigator.appCodeName = memory.userAgent.split('/')[0];
navigator.appName = "Netscape";
navigator.appVersion = memory.userAgent.split('/').slice(1).join('/');
navigator.cookieEnabled = true;
navigator.deviceMemory = 8;
navigator.appCodeName = memory.userAgent.split('/')[0];
navigator.appCodeName = memory.userAgent.split('/')[0];
navigator.doNotTrack = null;
navigator.hardwareConcurrency = 12;
navigator.language = "zh-CN";
navigator.onLine = true;
navigator.pdfViewerEnabled = true;
navigator.platform = "Win32";
navigator.product = "Gecko";
navigator.productSub = "20030107";
navigator.userAgent = memory.userAgent;
navigator.vendor = "Google Inc.";
navigator.vendorSub = ""
navigator.webdriver = undefined;
// memory.NO_enumerable(navigator,'webdriver')

navigator.languages = ["zh-CN","zh"]
navigator.plugins = [];

for(let x=0;x<memory.plugins.length;x++){
    let xs = memory.create_plugin(memory.plugins[x])
    navigator.plugins.push(xs);
}


navigator.connection = memory.createProxyObject('connection',{
    downlink: 8.95,
    effectiveType: "4g",
    onchange: null,
    rtt: 50,
    saveData: false,
});

navigator.mimeTypes = [];
memory.rename(navigator.mimeTypes,'MimeTypeArray')
navigator.mimeTypes.push(memory.create_MimeType('application/pdf'))
navigator.mimeTypes.push(memory.create_MimeType('text/pdf'))
// navigator.mimeTypes ['application/x-shockwave-flash'] = memory.createProxyObject('mimeTypes_flash');
// navigator.mimeTypes ['application/x-shockwave-flash'].enabledPlugin =  memory.createProxyObject('mimeTypes_flash_enabledPlugin');


navigator.serviceWorker = memory.createProxyObject('serviceWorker')


navigator.vibrate = function vibrate(){

};memory.protect(navigator.vibrate);

navigator.locks = memory.createProxyObject('LockManager')
history = {};
history.length= 2
history.scrollRestoration= "auto"
history.state=null
History = function History(){
    throw new TypeError('Illegal constructor');
};memory.protect(History);
Storage = function Storage(){
    throw new TypeError('Illegal constructor');
};memory.protect(Storage);

Storage.prototype.getItem = function getItem(keyName){
    if(memory.callFunDebugger){debugger}
    return this[keyName] || null
};memory.protect(Storage.prototype.getItem);

Storage.prototype.removeItem = function removeItem(keyName){
    if(memory.callFunDebugger){debugger}
    delete this[keyName]
};memory.protect(Storage.prototype.removeItem)

Storage.prototype.setItem = function setItem(key,value){
    console.log(key,value)
    debugger
    if(memory.callFunDebugger){debugger}
    this[key] = value
};memory.protect(Storage.prototype.setItem)
sessionStorage = {};
localStorage = {};

memory.make_chain(['sessionStorage','Storage']);
memory.make_chain(['localStorage','Storage']);
location = {};

location.href = undefined;
location.toString = function(){
    if(memory.callFunDebugger){debugger}
    return location.href
}

location.protocol = "https:";
location.port = '';
location.origin = 'https://www.ems.com.cn';
location.host = 'www.ems.com.cn';
location.search = "?tab=2";
location.hash = "";

Location = function Location(){
    throw new TypeError('Illegal constructor');
};memory.protect(Location);
screen = {};

ScreenOrientation = memory.createProxyObject('ScreenOrientation ');
Object.assign(ScreenOrientation,{angle: 0, type: "landscape-primary", onchange: null});

screen.availHeight = 816;
screen.availLeft = 0;
screen.availTop = 0;
screen.availWidth = 1536;
screen.colorDepth = 24;
screen.height = 864;
screen.orientation = {}
screen.pixelDepth = 24;
screen.width = 1536;
Screen = function Screen(){
    throw new TypeError('Illegal constructor');
};memory.protect(Screen);


;
// 第4个加载            进行原型链的组成
memory.make_chain(['window','Window','WindowProperties','EventTarget']);
memory.make_chain(['document','HTMLDocument','Document','Node','EventTarget']);
memory.make_chain(['history','History']);
memory.make_chain(['location','Location']);
memory.make_chain(['navigator','Navigator']);
memory.make_chain(['screen','Screen']);



document.location = location;
window.top = window;
window.self = window;
;
// 第5个加载        对对象进行代理 并且遍历对象:  函数进行toString保护  对象则进行递归调用
sessionStorage = memory.proxy('sessionStorage');
localStorage = memory.proxy('localStorage');
location = memory.proxy('location');
navigator = memory.proxy('navigator');
screen = memory.proxy('screen');
history = memory.proxy('history');
document = memory.proxy('document');
window = memory.proxy('window');




;
(function() {
    'use strict';
    var cookieTemp = {};
    Object.defineProperty(document, 'cookie', {
        set: function(val) {
            let xxx = val.split(';')[0].split('=')
            cookieTemp[xxx[0]] = xxx[1];
            console.log('set cookie',val)
            debugger
            return val;
        },
        get: function(){
            let result = [];
            for(let x of Object.keys(cookieTemp)){
                result.push(x + '=' + cookieTemp[x])
            }
            result = result.join('; ')
            console.log('get cookie',result)
            return result
        }});
})();

(function() {
    'use strict';
    var cookieTemp = "";
    Object.defineProperty(location, 'href', {
        set: function(val) {
            cookieTemp = val;
            this.protocol = val.split('//')[0];
            this.hostname = this.host = val.split('//')[1].split('/')[0];
            this.pathname = '/' + val.split('?')[0].split('//')[1].split('/').slice(1).join('/');
            this.origin = this.protocol + '//' + this.hostname;
            if(val.indexOf('?') != -1){
                this.search = '?' + val.split('?').slice(-1)[0]
            }else{
                this.search = ''
            }
            return val;
        },
        get: function(){return cookieTemp}});
})();;

;

        var meta = document.createElement('meta');
        meta.content = "Rnre3pc1ymJbwTnR8Hc3zz.wSA3Xvpz2f2PucfpqkryGo2IIuSbm13ye1MWEfR_j8KLTdEIU_j0";
        meta.r = "m"
        document.head.appendChild(meta);
        var script1 = document.createElement('script');
        script1.r = "m";
        document.head.appendChild(script1);
        var script2 = document.createElement('script'); 
        script2.r = "m";
        document.head.appendChild(script2);
        document.visibilityState = 'visible';
        location.href = "https://www.ems.com.cn/queryList?tab=2"
        ;
$_ts=window['$_ts'];if(!$_ts)$_ts={};$_ts.nsd=24079;$_ts.cd="qETErrAlE1WqckGEEaqtqGLkHO7trOgaqaLGxGGOqqLccGW5iaLrJaGlrnWqcGltrOg4EaqtrqLmHfZOqqLkcGq5inWqcG3trugIcGA6cAA3EaqtrqLmHO7OxqGgcPWqcGEtqug4cGl6cPqOEaqtqALDHO7OqqLlcGVFinWqcGWtqkg4EaqtrGLoHOBNrkQXvAlCWAVmWsiwEncz_wHkEEFtIRIeDpzSSfk7Re0CBHTQArlDrwl0Rlm1qqA0raQovcakcTyZx1bzYurEwlz3WwztsvTrHbq009ybs0A2HYuDWnavxn7CJ7qBKuVNx1V..kmwtYg6tnKdhulCKczQJ4lfEP90WTNF71ln1VRs3TUsssmNYVrtpXGTYlzYM6wCBu2MUOV.x1KSWOY3Kc72piYLiDNxJYqTdTaSY92fWvUNKspXwcVeUW3uhcQvtuwF7YGat1Q2tuMqhT7Tt1V2t_e8hmgTtnV27srwtYg6tnKdhup3tYa6t4Zfhkr3tTa671lPtsJFtTnzhnEvtsrFtZ3uhcQvtueF7YGat1Q2tu4qhT7Tt1V2t_auUYGNxKzO_vYOYCpN1KhLYTxsJ6JdWX0u39EvHYSQ.1ZPxn9CHT.qhnx6IDpH1dx6RV2bpoTp.KfTJVyH3vH7EsN8UOQ.xMZBWsJ3tTa671lPtsAaK2.GhCyaFK7.UW3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFtZ3uhDzaFC7.Z6R7F12NQbBShCyaFKzFK7qxq1TQWmT9uspHQsynps8NAYrfwuSipJ3a8kYPQkSedCYUUsQ5UOnNwDJ7w2AdI_RXpURjAOpf563n1VEZWTd3wbxSVlrnRIeBi6JZpVmxT22U3sYEJsuRRofpUlrNMipq1K7.WsAT5CxPWczzwkuVAOWaMoT7QZTtRb7.WsAT5CxPWczzwkuRRlzOFTg6sHyH8YZ.WsAT5CxPWczzwkuaJVmYpC3TIdzMJD0.MUAZ0baCp92dWOMHibw0Hbm0MHzsw6Y9VYwkjOfDsDRt3bhX3sw6MYQZQHpWVbpspV2IeVektuW0JKoZ3sV.M6AZsdyCATYbsswaNV7CtuW0JKoZ3sV.M6AZtF7aWbJ9RsENe6q4Rum0IuozVmNhQDzrHJxCJCrfwoWuNYYvFGVoraFzqal0rpJBQ52uQuZ6HOEdNk3SHkEuHsiNWqqkWuAT3ISfqq30WsVo2uEaWOlaHO8NWkEmksqnWj0nJsWerSwQJZ1OdHtSnRumFJsN1ESergC5.eOUuD44YG1wrGVcqGcFqnqhZ3HgCjSpV7pKcIh2J25MKU42hcx4_hEAD37z5mdntGVHJs3a.kEgWslSHG8QWGqHJkqCWFV_WkWCHGQ7_sRvAVwSI0BUJKJZUVl5RjSyioTOW990ZmrhpoR7Q2iBV0WZ10eS1QpPMqVmra3uvAEarAAarpDj81S9RDA.RBrShDpTMczb4bg7RoJXtCUZFcSvRoW.RIpzhDwLwnz97KrfRn29FDjS3orTtKp0whmGQ6WN3CRu7Kw7F12OFD1SRCebI1zOFi9BRKfNtCxL_1e2IKq.3KBZhCRNRPzfF57BRbN.tCmLZ6Q73CNutCky31SPMKG.3Hp2hDxdtCe.41eLwUV.M6H5hC2bFPzXFI7BFKz7tCyN4PeNwKA.MvsnhCN9wnzzRXzPhDeT3bq.e6JvtKe0tC6XMDgNFKy2tdm7Rn2LWC3.ZDxatKfX3nBaFb0NFDSStdr7Rc2LFol.ZoWutKf6WnBaQClNFowP3hmXQDENFvw67KyuMc2LRKCSMDJetKfG3hm7MDQNFDzP7KS03n26Rv1SQCJ9w1z63d7BQDxLt6wXdPeaFKa.wCB0QoANwK2Gt5TuM12Tw6A.4UJ0tUY6Q65SQ6JftUw5t5T_3n20Mbl.4owgtUwbt6UZMPS6RoV.wIf9howGwczTZcenFoJ2t6UNR1S6QKN6t5yfMc2C3UZ.4ba7wvJGt6sj3PSCQbl.wipahom9w1zudo97QKxet6H0R1SSMDmft527QvwGFUW._UwbtUmdQnB.QDANQ6p0t5zawn2uICW._bxCtUxPRU8SwDT9tUrjQMm0MCJOt6rL5CVntUx6wcB23K0NIKz0t5YBQ60NICN.7UzaFc2dwDXS81SdMoQory0oUnmX3aQkaPwIJaVkKciy1GqrKPJGYx0cWqVoWO3ovkWqrkAora8wqaqmrA";if($_ts.lcd)$_ts.lcd();;
if($_ts.cd){


(function(_$gH,_$gg){var _$ct=0;function _$_b(){var _$eD=[80];Array.prototype.push.apply(_$eD,arguments);return _$$x.apply(this,_$eD);}function _$_J(_$fH){return _$_b;function _$_b(){_$fH=0x3d3f*(_$fH&0xFFFF)+0x269ec3;return _$fH;}}function _$en(_$_b,_$kD){var _$$T,_$kt,_$$r; !_$kD?_$kD=_$_n:0,_$$T=_$_b.length;while(_$$T>1)_$$T-- ,_$$r=_$kD()%_$$T,_$kt=_$_b[_$$T],_$_b[_$$T]=_$_b[_$$r],_$_b[_$$r]=_$kt;function _$_n(){return Math.floor(_$fl()*0xFFFFFFFF);}}var _$kD,_$$T,_$kz,_$fF,_$_V,_$$o,_$it,_$fl,_$cJ,_$eY;var _$kl,_$k$,_$_r=_$ct,_$ij=_$gg[0];while(1){_$k$=_$ij[_$_r++];if(_$k$<12){if(_$k$<4){if(_$k$===0){_$eY=_$_V['$_ts'];}else if(_$k$===1){return;}else if(_$k$===2){_$eY=_$_V['$_ts']={};}else{_$kz=[4,16,64,256,1024,4096,16384,65536];}}else if(_$k$<8){if(_$k$===4){ !_$kl?_$_r+=2:0;}else if(_$k$===5){_$kl= !_$cJ;}else if(_$k$===6){ !_$kl?_$_r+=0:0;}else{_$$x(80);}}else{if(_$k$===8){_$kl=_$eY;}else if(_$k$===9){_$_V=window,_$$o=String,_$it=Array,_$kD=document,_$fl=Math.random,_$$T=Math.round,_$cJ=Date;}else if(_$k$===10){_$eY.lcd=_$_b;}else{_$_r+=2;}}}else ;}



function _$$x(_$_9,_$$g,_$i9){function _$gT(){return _$kP.charCodeAt(_$jG++ );}function _$g1(_$_b,_$kD){var _$$T,_$kt;_$$T=_$_b.length,_$$T-=1;for(_$kt=0;_$kt<_$$T;_$kt+=2)_$kD.push(_$e1[_$_b[_$kt]],_$aM[_$_b[_$kt+1]]);_$kD.push(_$e1[_$_b[_$$T]]);}function _$_Q(){return'\x74\x6f\x53\x74\x72\x69\x6e\x67';}var _$_b,_$kD,_$$T,_$kt,_$$r,_$_n,_$ct,_$_r,_$kl,_$eD,_$k$,_$ij,_$bv,_$$J,_$a1,_$aM,_$fk,_$kP,_$aY,_$jG,_$hZ,_$ax,_$e1;var _$aD,_$$3,_$$f=_$_9,_$a7=_$gg[1];while(1){_$$3=_$a7[_$$f++];if(_$$3<97){if(_$$3<64){if(_$$3<16){if(_$$3<4){if(_$$3===0){return;}else if(_$$3===1){_$eD.push(_$k$.substr(0,_$a1()%5));}else if(_$$3===2){_$hZ=_$gT();}else{_$k8(21,_$kl,_$eD);}}else if(_$$3<8){if(_$$3===4){_$$r=0;}else if(_$$3===5){_$$r++ ;}else if(_$$3===6){_$aY=_$kP.length;}else{return new _$cJ().getTime();}}else if(_$$3<12){if(_$$3===8){_$$T[5]=_$$x(78)-_$_b;}else if(_$$3===9){_$$T++ ;}else if(_$$3===10){_$_b=_$_V.execScript(_$$g);}else{_$aD=_$_V.execScript;}}else{if(_$$3===12){_$_b="_$abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split('');}else if(_$$3===13){ !_$aD?_$$f+=71:0;}else if(_$$3===14){_$e1.push(_$k8(7,_$gT()*55295+_$gT()));}else{_$kP="ȨĪ͐͑Īབྷ\x00鏇,ā[ā=ā(āā.ā;ā===ā);ā?ā),ā[42]](ā){var ā(),ā[0]](ā],ā+ā !ā(){return ā<ā;}function ā(){ā=0;ā=0,ā&&ā);}function ā]=ā:ā= !ā[ --ā){ā||ā!==ā++ ]=ā==ā+=ā&ā(){var ā=(ā>>ā){if(ā[ ++ā.push(ā[4]];ā[0],ā++ )ā):ā[45],ā=new ā[12]](āfunction ā();return ā=[],āreturn ā;if(ā?(ā){return ā!=ā[13]](ā));ā[21][ā)ā|| !ā)return ā();ā[1],ā>ā<=ā);return ā>=ā;return ā[24].ā&&(ā-ā:0,ā*ā);if(ā&& !ā;for(ā||(ā):0,ā>>>ā++ ){ā;}ā[18],ā][ā](ā];if(ā)&&ā[39],ā[2],ā[4]],ā[50],ā[52]](ā[50]](ā)return;ā[63]](ā){}ā[50]),ā= !(ā];}function ā))return ā[7][ā];ā();switch(ā[61],ā);}ā+' '),ā[5][ā|=ā[425](ā<<ā={},ā]):ā()),ā[42]]((ā()[ā)){ā,true);ā++ ;ā+1],ā,0,ā instanceof ā[51]](ā,true),ā;}}function ā;function ā)?ā();}function ā();if(ā++ ]=(ā/ā);else if(ā)?(ā[34]]==ā[18];ā&& !(ā[61];ā[9]](ā[60]][ā)):ā++ ]<<ā=[ātry{ā^ā[17])&ā[3],ā[50]]^ā);}}function ā[4]]===ā||( !ā[11];ā[4]]-ā[4]]>ā=[];for(ā in ā[59])&ā[426](ā[81]+ā]===ā[18]),ā-=ā[1]);ā=1;ā[41]]);if(ā[11],ā[4],ā=( !ā[49]+ā=true,ā[17];ā(719)-ā[11]&&ā[29]](ā({ā[56]),ā){case 61:ā[5])&ā=1,ā[2]+ā);}catch(ā++ ),ā=0;for(ā[16]),ā&&( !ā[33][ā[14]&ā):(ā[11]<=ā);function ā))|| !ā[51],ā()?(ā)===ā[5]),ā;if( !ā)+ā,this.ā))&&ā);}return ā[0]=ā[39]),ā[59],ā<0?ā[11]),ā});ā){}}function ā[17])|ā[2][ā))ā={};ā|| !(ā[0]);return ā){ typeof ā+=1,ā[1];ā));}function ā()){ā:1,ā=[];ā[33]+ā[14],ā,0);ā[28]),ā(719);ā[27]](ā(68,ā[14]),ā[19];ā[17]),ā[18]?āfor(ā[34];ā[18]||ā[17]);ā[20]](ā.y-ā(287,ā.length;ā++ ],ā[38]),ā(){return +ā[0];ā[7]](ā; ++ā[59]]=ā)for(ā[0]);ā[17]&ā-- ,ā()||ā))&& !ā(719),ā[1]=ā[5],ā=this.ā[24]?ā(0);ā[23]](ā()?ā.x-ā[13]),ā[59]&ā++ ,ā[6],ā)):0,ā=((ā(451,ā){this.ā[2]](ā[21],ā[6]),ā[13],ā[51]](0,ā(104,ā[5]);ā[33]),ā=true;while(ā]],ā=0:ā]+ā[43]+ā[59])|(ā[28]||ā+2],ā,1);ā[38][ā[10]?ā[7])<<ā[57]){ā())break;ā[1]?ā], !ā[21]](ā.x*ā[17]);while(ā[6]);}function ā[59];ā+=1:0;ā.y*ā);while(ā[24])<<āreturn;ā)if(ā(193,ā[10]][ā[3];ā[18],0,ā){return(ā(419,ā[42]](' '+ā[11]<ā[58],ā=0;if(ā[34],ā++ )],ā[33]);ā[11]||ā[2]=ā;}return ā]|ā].ā ++ā[27],ā():0,ā(63,ā%ā[15];ā[11]?ā; typeof ā('as')?(ā[44]]=ā++ )if(ā[31]][ā[65]]=ā[4]]/ā++ ):ā[59]];ā[59]],ā=false,ā:0;return ā[59]);}function ā[74]),ā[76]]=ā[17],ā[86]](ā[55]&&ā[90]);}function ā[55]?ā]);}function ā[5]=ā[40]+ā[40];ā[5]^ā[24];ā[33]=ā,1),ā[(ā)),ā[36];ā[4]]-1],ā[39]+ā.x)+(ā[31][ā[72]?ā[5])|(ā=0;while(ā[7];ā[46]);}function ā[62],ātry{if(ā[89],ā=null,ā;)ā[91]](ā(1,ā[22]){ā];}ā[57],ā[57]?ā[56]&&ā,false),ā[94]](ā[66]]=ā[30]](ā]&ā[78]](ā))||ā+=2:0;ā===0?(ā+=4:0;ā,false,0,ā[75]+ā[16]+ā);break;default:ā[25]),ā]);ā[58]);ā[58]),ā+=1;ā[55],ā[0].ā[61]],ā[26]?ā[0][ā[0]]=ā[10]]((ā[8]](ā[7]];ā[4]]+ā-1],ā[41]]);ā[41]]),ā&& typeof ā[45]?ā[44]];ā)||ā(858,ā[77]][ā[42]]=ā[14];ā[50]);}function ā[39]);}function ā=true;ā[9]?(ā[45]),ā[17]?ā[17]^ā[41]];ā[4]),ā[1]===ā[429](ā[37]),ā[25])):0,ā[10];ā[24]=ā[24],ā[22]][ā()][ā()*ā(170,ā[23]),ā[61]^((ā.y),ā);continue;}else if(ā;}catch(ā[54]))+ā);for(ā[26];ā[25]]=ā[39];ā])):ā[61]?ā[4]]-1;ā[26]&&ā[72];ā[19],ā.slice(ā[427](ā[44]),ā[428](ā[6]](ā[20]),ā++ ;if(ā+' ('+ā=false:0,ā[12]]=ā[87],ā]=108,ā[45])]))&ā)==ā[54]]=ā+=5:0;ā]=(ā[3]=ā[13];ā[74]);}function ā[26],ā[18]){ā[34])&ā[5])+ā[50]]<<ā[93],ā=0:0,ā]^=ā[53],ā)|0,ā[70]]=ā[5]]^ā[43]),ā= !( !ā[16];ā[47]),ā[83]),ā,1,ā):0;return ā[19]]=ā]:ā)%ā)&ā[20]]+ā[76]],ā[76]](ā[0]===ā++ );while(ā(213,ā-=4,ā[93]);}function ā[18]&&ā[23],ā[12]),ā())return ā[35],ā[15]&&ā==1||ā;if( typeof ā[52]||ā[4]]==ā);break;case ā[75],ā.join('');}function ā)):0;}function ā[72]),ā[7]),ā[18]],ā[10]);ā-=2,ā[51]](0),ā[44]=ā[8];ā[8]&ā]);return ā>0||ā[31]];ā[49]*ā[7]]=ā[4]]%ā,'var'),ā[5]);}function ā[4]]>=ā.length,ā-=3,ā+1)%ā[4]]>1;ā[82],ā>0?ā[61]),ā>0;ā('');ā+=(ā[42]][ā[50]?ā[45]);return ā[10],ā[45]);}function ā[38]=ā[32]),ā[38]+ā[77],ā[17]+ā[4]])===ā!=null?(ā[50])|ā(845,ā[22])){ā){try{ā[64]]&&ā[57])return ā=false;ā[15]|| !ā='';ā[9];ā[40],ā[5];ā[44],ā.y)/(ā[1][ā[44][ā[2]);ā[15]))|| !ā++ ];else if((ā[18]);}function ā[26]](ā[((ā[70]),ā;try{ā[70]);ā[80],ā[25]];ā.x,ā.x+ā[65],ā&& !( !ā){ !ā[77]);}function ā[23]);return ā:(ā[43]);}function ā[59]),ā[62]),ā[56]]||ā};function ā[68]];ā[66]),ā[22];ā[59])||(ā[32],ā[3][1];ā, ++ā[52],ā[76],ā[12],ā){if( !ā[57]&&ā,{ā[35]);}function ā++ );if(ā+=5;ā[11]);ā[4]]),ā[44]?(ā+1]&ā,'var')):0;}ā[42]]({ā[4]]){ā[52]](null,ā[33]);}function ā(154,āreturn[ā[17]&&ā[64]+ā[29]);ā[15]]=ā[64]]?0:(ā)||(ā[15]],ā,1):0;return ā[14]]<ā[59]);ā[56]][ā[57]))return ā[2]][ā[35]&&ā[15]);return ā){case 38:ā[50]:0,ā[36]&& !ā[61])return;ā[54]](ā[1]);return ā[11]]=ā[3]);ā<arguments.length;ā[42]?ā[50]],ā[14]](ā[49]=ā));}else if(ā[94]];ā+=7:0;ā[50]](0,0,ā]!==ā[64]);}function ā[11]&&(ā[60]);}function ā+=3:0;ā()):0,ā[42]](arguments[ā[84]]+ā+=0:0;ā[34]||ā[33]&&ā[21];ā[17])return ā[42]]('...'),ā[34]+ā[34]?ā[94]]=ā[2])[0],ā+=3;ā[74],ā.x),ā[78],ā,'var')):0,ā[2];ā;){ā[70]+ā){while(ā[4]]!==ā[52]),ā;}}catch(ā.split('');for(ā+3],ā+=6;ā[4]];for(ā]:(ā[34]])===ā);return;}if(ā]<ā)(ā[20]];ā();}ā){}function ā[40]:0,ā[29]);}function ā,'rel',ā[53]);}function ā[17]);}function ā[47],ā[28]+ā[70]);}function ā,'as',ā+3])):ā());}function ā=0;}function ā);}}catch(ā[35][ā[71]),ā[76]),ā)):0;return ā[28]);}function ā);return;}ā[15],ā[35])return ā[42]](((ā+=30:0;ā];}}function ā[36]);}function ā):0;for(ā[16],ā[82]];ā[15]),ā[36]?(ā[83])?(ā[92]),ā]):(ā);else return ā[51]);}function ā[11]);}function ā[58]){ā[45];ā=false:(ā+=19:0;ā[60]),ā[13])|(ā++ )];return ā[51];ā,0)===ā);break;case 43:ā= typeof ā));return ā=this[ā[63]];ā[1]]===1)return ā()===ā[8]+ā:0;ā[14]);}function ā[22],ā[0]+ā[22]?ā[4]?ā[26]+ā){switch(ā[5])):0;if(ā[67]]=ā[0]^ā[42]:0,ā[39]][ā]=\"\",ā[3]](ā[65]](ā[81]);}function ā>0&&ā();break;}ā(562,ā[48],ā[430](ā[22]);ā[45])<<ā():0;}function ā[18]);ā,0);function ā[33]][ā.charCodeAt(ā+'\",',ā[17])),ā;else return ā[17]?(ā[1]=',\"'+ā[58]][ā())in ā[11]?(ā+=4;ā[45];return +(ā[36]))&&ā,true):0,ā[58])return ā[54];ā<<1^(ā[54]=ā[33],ā[33];ā[50];ā[43]]=ā[61])|(ā[43]](ā[20],ā)>1?ā[42]]('as '),ā]>=ā[37],ā]>>ā[37][ā(){if(ā<=94?(ā[38],ā():ā+=-4;ā())ā().ā[35]),ā[30]+ā+1]=ā[42]];ā[45];while(ā[8]);return ā[22])&&(ā[73],ā[4]]>0;ā[86]][ā[30]]((ā):0;}ā):0):ā[51](ā[53])?ā));else if(ā();for(ā[53]),ā[53]))ā[50]);ā[28]);ā[48])===ā[34]?(ā))return false;ā[4]);ā[41]])===ā[26]?(ā.z;ā[84],ā[48]=ā[57];return +(ā[54]),ā[70])return ā+=213:0;ā]+=ā)try{if(ā(1,0),ā)this.ā)return false;return ā[17]],ā[1]);else if(ā[49]){ā[113],ā[12]);}function ā[35]](ā[4];for(ā[14]]&&ā[50])):ā[65]);}function ā[3][0];ā[3]]('');ā|=1;ā)):0;if(ā[3]=[ā[37]=ā[37];ā[47])ā[44])ā[1]>ā[1]+ā):0, !ā(720,ā[40]=ā(), !ā[83]+ā[83],ā[1]^ā[61]);return ā[87]);}function ā+1,ā[84]),ā[92]]);ā[30])return((ā;else ā[20]]=ā[6])):0;else if(ā(0)?ā[24]+ā[24][ā[63],ā[33]]=ā+1])):(ā[32]]=ā[42]]('; ');ā[43]=ā[32]][ā[80]),ā[88],ā[14]]()===false&&ā[41])this.ā;}}if(ā[34]]=ā+1])):ā[44];ā[47]){ ++ā=[];if(ā[45]);ā||0,ā[5]);return ā[28],ā[27]];ā[14]||ā[26]];ā,'();',ā[37]];ā[50]](0,ā[29];return ā+2])):ā[4]]):0,ā(){return(ā>0)for(ā;return[ā[79]];ā(){return[ā+=13;ā,true);}catch(ā[58]);}function ā)switch(ā[56]);}function ā[18],( ++ā[65]];ā[0]]([ā);return;}return ā()];ā()));ā[29];ā[80]);}function ā[3][1]));ā[114];for(ā[0]?ā]=83,ā[47]);}function ā!=='';ā[39])&ā?1:ā[19]]();ā[0]);else if(ā[79];ā[37]||ā[59]^ā[51];return ā[59]+ā[32]+ā[63]),ā(452,ā[24]);}function ā>0?(ā[36],ā++ ):0):0;ā[77]),ā(912,ā):0;}function ā[56],ā[73]);}function ā);}if(ā[30]);}function ā[33]?(ā[15]]),ā[31];ā[23]&&ā[66]);}function ā[4]]-1,ā(23,ā[2])[1],ā[47];return new ā[45]),'\\r\\n');ā[72],ā){}return ā[40]),ā-- ):ā))if(ā[19](ā=arguments.length,ā){return false;}}function ā[9]),ā[31];return ā?0:ā))?(ā[27]);ā[15]&& !ā[100]){ā-((ā[29]){ā[86]]=ā[59]);else if(āreturn(ā, delete ā=false;if(ā[63])return((ā[91]:0):0,ā[15]];ā[90])&ā]=10,ā[14]]=ā|| !( !ā[9]);}function ā)try{ā[47]));ā[63]]&&ā[0]instanceof ā[47])):ā){for(ā[69],ā[0]];ā=[],this.ā!==null&&ā[90],ā[17])0;else{ā[50],(ā};ā[4]];while(ā[10]],ā(){return this.ā]]:(ā[66]]==ā[26];return ā<=56?(ā+1]<<ā();return;}ā[29]];ā>>>0),ā[55]||ā[42]=ā[89])?(ā[22]]&&ā,'');ā>=0;ā[81],ā[62];ā[3][ā[46]=ā){function ā,'var'):0,ā[18];return ā+=163:0;ā[6]):ā[6])(ā.split(''),ā+=-68:0;ā=null;ā[80];return ā+=-7;ā[6]){ā.apply(null,ā)<<ā[57]?arguments[0]=ā[18]|ā++ ), !ā++ ):0,ā[18]=ā++ ;return ā[51]];ā[18]*ā){return[ā[25]);return ā[13]|| !ā)!==true?(ā===1||ā);if( !ā,true,0,ā[61]?(ā[18]):ā[34]]==1&&ā]);else if(ā[80]]=ā[127]^ā];while(ā):'';else if(ā))for(ā+=1:0,ā=2;ā[34]),ā[44]]()));ā[1]]&&ā];}return ā[26]);ā[1]]!==1|| !ā[26])*āreturn false;ā[1]);if(ā[84]](ā]):0;return ā.x&&ā[2]),ā[79]]();ā[0]]&&ā[21]=ā,[ā[58]*(ā[22])(ā[36]||ā[58])ā[16]](),ā+=6:0;ā[1])+ā[54]);}function ā+(ā[60]].ā[4]);return ā};}function ā;else if(ā});return;function ā[45]?arguments[3]:0,ā=\"\";ā>>(ā]!=ā[34]=ā[55]),ā[108])return ā[25]);}function ā[21]);}function ā[6]?ā[1]||'',ā[21]&&ā[11]===ā[38]);}function ā+=9;ā[31]]===ā[2]^ā[50];return ā[34]]&&ā[4]];)ā[50]=ā+1},ā[85]];ā[18]?arguments[2]:1,ā){}return false;}function ā));}ā[37]](ā]]]=ā++ ];}ā[38]],ā[1]&&ā[16]);}function ā[62]];ā(203,ā]]=ā]]:ā[66]&&ā[13]);}function ā]^ā===null||ā]=1,ā[3]);}function ā[31]&&( !ā+((ā[19]];ā[16])):ā]>ā[78]);}function ā[44]||ā]-ā]/ā]*ā(587,ā)*ā)-ā)/ā){return((ā[36]](false),ā[57]]=ā();else if(ā<=43?ā]);}}function ā[86]);}function ā[61]||ā[32]?ā[68]),ā,1);if(ā[4]]:0;if( !ā+=-9;ā[47]=ā!==1&&ā[43];ā[43],ā,0,0).ā(){this.ā[28]?ā[13]&& !ā){return;}ā[45],0,ā[54])!=ā[61])),ā.y;ā[22];}function ā[60],ā[60])return((ā[71]){ā[5]));if(ā[56]<=ā.y))*ā[11]){ā[19]&& !(ā,'');}function ā[11]);return ā[34]]==0?ā[107];ā[29]&& !ā]);if(ā[11]+ā===1&&(ā[20]);}function ā={},this.ā[50]||ā[64]);ā-=5,ā[73]||ā<=1?(ā[22]&&ā[53]);return ā===1?ā[4];ā[30]),ā[4]]!=ā);break;case 42:ā(679,ā[83]);return ā[19]);}function ā-1),ā){case 1:if(ā[87]]=ā={};for(ā<=59?ā[65]](0,ā(12,ā[60])return ā[79]][ā[60]];ā[18]]&ā[0]](this,ā[34]]([ā[15]]);if((ā[91];ā[61])],ā[45]:ā<=28?(ā<=36?(ā[26]&&(ā]),ā[(((ā.y))),ā];else if(ā==='get'||ā[45]+ā[4]]);}}function ā(21);ā[10]&ā-1+ā[72]);}function ā[15]))&&ā[0]);}function ā[41];ā(146,ā[92];ā[5]]<<ā){try{if(ā[27]]===ā[58])){ā[11])return[ā[50]]]^ā(140,ā[2]);}function ā<=46?(ā[36]&&(ā+4])):ā);break;case 10:ā[29],ā<=48?(ā[40]);ā[88]]||ā[67]](ā=null, !this.ā+2]=ā[31]]=ā[59]);if(ā[31]],ā+=-341:0;ā[58]):0,ā[0]][ā[45]]^ā[48]](ā[0]],ā[3]];ā[3]]=ā[22]);}function ā[94]);}function ā]&&ā[58])&&ā[33];for(ā[12])<<ā[4]](ā+=8:0;ā[49]);}function ā++ );ā[42]);return ā[3][0]|| !ā++ )this.ā[18]?(ā()):ā());ā[95]),ā[85]);}function ā[7]);}function ā[24])return ā(1)?ā[13];return ā[85],ā[0])return;if( typeof ā='',ā[13]]=ā[42]);}function ā(719);if( !ā(723);ā[55]);return ā[60])===0)return ā[19]]===ā[0]),ā[82]]?ā[3]),ā[1]]===ā]]):(ā[45]=ā[58]];ā[45]]=ā[74]]===ā[16]);ā[41]])return;ā[41]=ā[78]]){ā in this.ā]);}return ā[89]](ā[28])|((ā=[[],[],[],[],[]],ā[19]),ā[16])return ā[49],ā){return[(ā]++ :ā[3][2];ā]++ ,ā++ ;else if(ā[4]]);ā[61]);ā[95])||(ā.substr(ā)|(ā[2], typeof ā[41]],ā[41]](ā[50]^ā[49];else if(ā<=30?(ā[10]?(ā[177],ā(569)+ā[68]);}function ā[147]?ā[76]))return true;else if(ā[17])break;}else if(ā]=Number(ā+=-792:0;ā+=515:0;ā[57]||ā);continue;}else ā[42]]?ā[54]]||ā;if( !(ā]='b['+ā[4]]>0)for(ā[35],'&=');default:return ā[22]))||ā[83]);}function ā[33]))&&ā[54]+ā!==null&&( typeof ā,true);else while( !ā)||[];else return ā[14]?ā[190]?(ā<=4?(ā[0]]){try{ā:'\\\\u'+ā+=-319:0;ā[60]),'');}function ā[21]||ā[43]],ā=false:0;break;case 4:case 36:ā());else if(ā[8])+ā-52:0):ā[172],ā[5]);}ā[141]){do ā[30]),((ā[68]]);ā+=58:0;ā='protocol';ā+=-613:0;ā[35]?(ā.x!=ā[37]+ā[26],'typeof':ā[79]);}function ā,0);}function ā[37]?ā[74]);ā[4]&&ā==='`')return true;}}ā?(new ā[11])return;try{ā){}else return ā[95]);}function ā);if(this.ā[3][2]&&ā):0);else{switch(ā)return;if(ā=false;break;}while(ā[5]):0):ā.x?(ā[101])==ā});}catch(ā===252?ā[32]);ā<=92?(ā[29]);}ā[31]]={};ā[30]]=ā[3]]('\\x00')+ā<=55?ā[36]||(ā[45]):ā[14]){if(ā[77]<ā[86]];ā()%ā[77]+ā[17]-ā,'let'),ā(701,ā[17])ā=true:0:0;return ā[89]]=false;}function ā[32])ā<=103?( --ā[66]&& !ā+=-376:0;ā]=1;return;}ā+=-181:0;ā?0:(ā[20]);ā>=40&&ā[55])){ā+=-531:0;ā[175])return ā(290);ā[17][ā[14]))){ā[17]];ā[20])[ā:0))/ā[2]](this.ā+=-381:0;ā());}ā[86]);return ā[45])[ā[26])<<ā,\" \");if(ā[61])):0,ā[80]);}return ā[32]](ā]);}ā[93]);}ā[4]]>0?ā=false:0;}while(ā[53]){ā[81]),ā){case 1:ā>0)return;ā[65]),ātry{if( !(ā[10])return[ā];for(ā[89])if(ā+=868:0;ā[65]]||ā<=71){if(ā){return ! !ā+=-619:0;ā+1))+ā+=-91:0;ā++ ])>>>0;}function ā))return;ā;break;}}ā):0):0):0;return ā+1));ā[3]]('');}function ā(334);ā<=98?(ā[16]])return ā[13]]),ā>1)ā[3]);else{ā[45]),'\\n'),ā()?this.ā+1))[ā>1;ā[1])return true;}function ā[14])ā<arguments.length; ++ā>1?ā[18],'true':ā==='let'&&ā[93]],ā[33]);}}function ā[124]=ā[82]|| !ā[83]?(ā()):0;}}function ā[51]);return ā[4]){ā):( --ā+=-79:0;ā[47]);ā,'');}else return'';}function ā[0];}function ā[88]),ā+=215:0;ā);return;case 43:ā[22]));for(ā[21])):0,ā++ )];if(āreturn new ā[40]);return +(ā[47]?(ā[212],ā[1]];}ā[46];return ā[4]]];}function ā[72])))continue;return ā[31]||( !ā<=73?(ā[88]){ā+=103:0;ā[0]=[],ā[3]);else if(ā[38]&&ā[40],'if':ā[78]||ā[18])return new ā));}return ā= ++ā+=445:0;ā[17]?0:(ā-- )ā(962,ā[25],'var':ā+=318:0;ā=false;for(ā[94],ā[45],'<<');}case 61:ā[36]&&ā[26])&&( typeof ā; !ā]()*ā[94]=ā[111]);ā+=496:0;ā[58]));ā[57]);ā[59]])/ā(880,ā[18];else return 0;}ā[59]])+ā[31]||ā?0:0,ā[66]];if(ā(arguments[0]);}}function ā[56]]){ā[45],'^');}}function ā);break;case 15:ā[90]?(ā-- :0;return ā>>>1)):(ā);return;case 16:ā+1));}}function ā[68])^ā=1;}}if(( !ā[8]),ā[43]]-ā<<1)+1,ā='#';ā[59]?(ā++ )==='1',ā[11]];for(ā!==''){if(ā-=1):0;return[ā,false);break;case 37:if(ā[41])));return this;}function ā[40])[0];}function ā[50]]];return[ā();case'*':ā[49])[ā[45],'===');default:return ā[39]&& typeof ā[48]]=new ā[5]);else if(ā[59]-(ā[17]](ā[17]]+ā[1].concat([arguments]),ā):0):0;return ā++ :0;}return ā):0;}catch(ā[4]=2,ā[36]);ā[113]+ā+=-132:0;ā=this;try{ā<=12?(ā[80]);if((ā>>>0);}}function ā[43]]))),ā[4]]];function ā[22]));ā>=92?ā;else if((ā[71]];ā[91]){this.ā[49]);ā[48]||ā[17]]^ā[0]=this,ā+=52;ā[21]&&( !ā[71]]=ā[49])(ā[36]){ā[52]](new ā[82]&&ā[50]));ā(269);ā=0, !ā[3]=(ā[59])+1,ā+1],16));return ā[33]));ā[50])),ā=true;}if(ā())&&ā[58]):0):0;}function ā[15])?(ā[2])[1];return ā&= ~(ā.y||ā[13]](\"id\",ā[0])return;ā(551);ā[34],1):0):0;}}function ā,false);break;default:ā=[];function ā[52],'class':ā(774,ā+=-151:0;ā++ );}function ā[4]]>1){return(ā='/';ā);return true;}}else ā(587,0,ā+=14:0;ā>=97&&ā='href';ā[83]]&&(ā+=21:0;ā[62]:0,ā[81]);}}function ā):0;}}}function ā<=58?ā[3][2]))&& !ā[72]&& !(ā++ :0;return ā[55]);}function ā);break;case 55:if(ādo{for(ā[112],'break':ā;while(ā=0:0;break;default:break;}ā+=-344:0;ā[45]:1]^ā[8]]/ā<=67){if(ā(142,ā):0);else if(ā+\".y\",ā[30]);return ā[4]);}ā[11];for(ā+=11:0;ā+' '):ā[153]^ā[0];for(ā=unescape;ā+=-172:0;ā[88]],ā[14]))break;ā[9]+ā]='c['+ā[9],ā[52])||ā('\\\\r',ā[28];ā|=1:0,ā[62])];}function ā[3][2]||ā[59]));return ā('get')||ā[13]);return ā[39]]&&ā.y>0?ā[6]);if(ā[17],'in':ā[61],0,0,0,ā);}else(ā[84]);}function ā[41]);ā[44]+ā+='r2mKa'.length,ā+=-75:0;ā[55]];for(ā[1]]))return ā+2]));else throw ā++ );while((ā[41]),ā[12]);switch(ā):0:0,ā;return;}return ā];return[ā[24].cp;ā){return typeof ā[20];return ā+=-383:0;ā[3]);case 5:return ā[5]+ā<=97?(ā[40]:ā[44]&&( !ā[56]]===ā[36]===ā[42])+ā[88][ā(791,ā[75]);}function ā+=169:0;ā]=1:0;}function ā||0);ā[48](ā[57])||(ā);break;case 38:ā<=82?ā[4]]):(ā[34]];ā==='img'||ā[441](ā[22]]===ā=0):ā);return;case 17:ā===\"`\"))return ā(583);ā],0),ā=[], !ā[34])return;ā[81]]))return true;return false;}function ā})):0,ā[440]();ā+=158:0;ā(0))ā<=91?ā[17];}for(ā[63]+ā});return ā[48]));ā[63]=ā[63]?ā));function ā[53]]+ā[46],'instanceof':ā[33]](ā==1&&ā[38]];ā[10]:0):0,ā=['top',ā[17];}function ā[20]+ā(43,ā+=48:0;ā);return;default:return ā[77]);return ā[158],ā[168],ā,false);}return ā+=242:0;ā[5]&&ā[46])?(ā[38];ā(726);ā[32]];ā>0)return ā[22]))return ā[45]](),ā+=23:0;ā[40]||ā[1]==\"?.\"?ā[39]);else{ā[56]);return;}ā++ ]= --ā[23]]?ā[22]];ā;if(this.ā[64]);return ā[59],true);ā[15];return ā[0]):0;if( !ā[55];try{ā[15]&&(ā[0])+ā];}else if(ā[90]in ā.x==ā)==false)return ā[4]]-1], typeof ā[67]+ā[48]])return ā+=378:0;ā+=-70:0;ā(721)))return ā===1?(ā[45]];}function ā=window;ā+=-3;ā[92]);return ā[45]};if(ā[88]+ā[80])?ā[1];return ā?( typeof ā[0]&& !(ā[1])try{ā[22]);}}function ā[60]]();ā(73);}catch(ā+1)];}function ā+=87:0;ā[28];}}return ā[7]])return ā=0):0;break;case 3:ā[164],(ā();return;case 26:ā);}else ā+=1;switch(ā[427](1,1);ā[48]|| !ā[4]]-1];return ā[3][2]!=ā[40]);return{ā(471,ā[163]^ā[6])){ā=( typeof ā[71]);return ā]>>>ā())){ā[45],'with':ā+1),ā)):0):0);else if(ā].y-ā.y);}function ā[27]]=ā]+this.ā[40]);return ā[167],ā[26]]?ā,false);}ā<=80?(ā[1]===0||ā+=-25:0;ā[135],ā[6])?(ā[79]]()/ā[25]][ā<=10?ā[35],'/=');}return ā[31]);return ā[148],ā),this.ā:0:0,ā[6])||[];return[];}function ā[51]](1));ā[4]]);return ā[36]](ā,0);if( !ā[133]*(ā={'\\b':'\\\\b','\\t':'\\\\t','\\n':'\\\\n','\\f':'\\\\f','\\r':'\\\\r','\"':'\\\\\"','\\\\':'\\\\\\\\'};return ā[437](ā[36]]=ā[27]])));}catch(ā[45];return ā[44]])return ā[79]){do ā[11])&&ā,1)+ā[79]],ā[30];ā[4]]),1):ā[10]));ā;}}ā[90]);ā,1):ā[438](ā[37]);ā[2])[1];}function ā.x<ā),this[ā.x;ā[15]]+'.x',ā+=273:0;ā[48],arguments);}function ā[2]];}function ā++ ){if(ā());else if( !ā[45]?( !ā[75]](ā);break;case 1:ā[125]=ā[4]]+1),ā!=='get'&&ā+=-484:0;ā[42]](this.ā[4]]===0;ā[57]));ā[77]:0,ā[109]),ā[14]){ā[73]);ā[121];ā):0;ā<this.ā())!==ā[55])>0&&ā,'');}ā[3])while(ā>1){for(ā[25]]^ā,'let');ā[68]+ā++ )try{ā);return;case 18:ā[68],ā){case ā[120])&&ā[45],'<=');default:return ā[57])){ā],0)!==ā){try{if( !ā[75]]-ā+=-231:0;ā[15]]&&ā[26],'catch':ā=1:0;function ā[52]](this,arguments);}finally{ā);break;}ā[3][1])|| !(ā[5])&&(ā[55]][ā(),'?.');}if(ā++ );do{ā[41]])if(ā[85]);break;}ā());else break;}}function ā==null?ā)))ā))(ā+=530:0;ā[2];return ā]]+1:0;for(ā[109]?ā);case'number':return ā(557);ā[13]);ā);}}return ā);return true;}return;}return ā<=57?(ā[68]][ā[29]]=ā<=9?(ā[15],{keyPath:ā[1]))&&( !ā[22]),ā);break;}}else(ā[21]|| !ā[43]);return ā)||\"\")+ā,1);try{ā,0)===\" \")ā|| typeof(ā[432]());ā.x),0<=ā(721)+ā))[ā[40])[1]||'';return ā[27])|((ā[42]](this):0;}function ā[63]]!==ā[179]^(ā=true:0;if(ā(1)){ā[34],'++');case 61:ā<=89?(ā];}catch(ā[138];return ā[2],'ig'),ā||\"\";ā].apply(ā=true;break;}}ā[57])return false;if(ā()==1?ā[3][1]&&(ā[28]);}}function ā[62])%ā++ ]= ~ā[98]<=ā[1]=arguments,ā!==''?ā[50]](1,1):0,ā();return;case 10:ā=false;}function ā[19])){ā[39]);ā);break;}break;default:break;}}function ā[48];return ā[17]];}function ā())return 1;else if(ā=0):0;break;case 2:ā[68]]?ā[35],'>>=');case 62:ā[0]===' ';ā++ ]= !ā[5]));ā+=13:0;ā[201],ā<=108?(ā[4]]&&ā[4]]>0)ā,0);return ā,[{\"0\":0,\"1\":13,\"2\":31,\"3\":54}],ā+=493:0;ā<=3?ā[11]],this[ā[1])||ā].x-ā||1,ā[55])return ā[21])?(ā[58]]&&ā+1?(ā,'id');ā[51]||ā+=-72:0;ā[35]){ā[21]?(ā){}return false;}ā[60]?(ā]&1;return ā));else{ā[45],0,0,0,0,0,0,0,0,0,0,0,ā>=127?ā=false;else{ā[83];if(ā[48]),ā[3][2]==ā,true,true));if(ā[59]-ā[0],0);return ā<=11?ā(0,'',0,0,0,true));function ā[59]?ā[32];ā[59]=ā++ ;break;}ā++ <ā[4]);else if(ā++ :ā[68]);return ā=false:0;break;case 42:ā<=26?(ā=this,ā(352);ā[27]);}function ā[5])),ā()]){ā);else return[];}function ā[35],'|=');case 124:ā[41]]);return(ā[111];ā[173]);}}function ā:0);}else ā[112])?(ā[25])?(ā[0]):0;return ā[185]?0:ā[0]>>>0;}ā){for(;;){ā[43]){for(ā[18]:(ā.y<ā[36]+ā[20]];return{ā-=1):0,ā[10]);}}function ā):0):0;function ā[89])):0,ā.y,ā[43]){ā+=-614:0;ā[36]=ā[56]?ā[58])?(ā(){return((ā[4]]-1]=ā[18]:0,ā[4]+ā[36][ā[30]));}}function ā+=345:0;ā[78]));}catch(ā[54]&&ā[45])return 0;for(ā(417),ā);return;case 19:ā[118],'let':ā<=102?(ā;}else return ā[25]]);ā+=-373:0;ā)return;try{ā))):0):0;}catch(ā[68]]():ā[76]+ā<=0)return;ā[10]),ā[31],ā]];for(ā[1]]():0,ā[10])+ā[91]=ā[1]:null;ā[1];if(ā<92?(ā[4]);}function ā[12]+ā[76]);return +(ā[32]?(ā[91],ā[91]+ā[12];ā++ ]=false:ā[4]]>1&&ā+=15:0;ā);try{ typeof ā[25]],ā[113])),ā[67],ā[7]&&ā){case 2:ā[19]&&(( !ā[25]],this[ā==0?ā[99],ā[84]+ā=true;if(ā[10]){ā++ ;}return ā[72]+ā+=555:0;ā[43]='';ā[40])?ā?(this.ā+=235;ā){if( typeof(ā[67]];ā()]()[ā[13])).ā[19]+ā(723);return ā++ ]=[]:ā+=-267:0;ā[67]]||ā.length===6)return new ā]=1:0,this.ā[19]=ā[2]));ā='$$_'+ā(114,ā]===\"..\"?ā[59]!==0?ā[45])return new ā[24]];for(ā,' ')),ā[42]])return ā<=37?(ā+=8;ā[31]])return true;ā[59]&&ā[143]?(ā[70];else if(ā[92]);}function ā[107]);ā[14])))return ā[0],'continue':ā[27]);return ā(457,1);ā<=64)(ā[66]];}function ā[80]]||ā+1)===ā();break;case 56:if(ā[13]?(ā[50]];return(ā[2])?(ā+=828:0;ā:0},ā[41]))return true;else if(ā+=248;ā[29]?(ā+=-597:0;ā<=15?ā<=33?(ā[53]]):0,ā[62])!==ā=window['$_ts'];ā[45]?(ā:true};}function ā+=-141;ā[4]();ā[0];}}function ā[40];return ā]=1;return;}if(ā[44])(ā[14]&1);ā+1]-ā[4](),ā[35]);ā[44]);ā<=96?(ā='hostname';ā[44]&& !ā[37]](new ā[72]===ā.id;if(ā[2];if(ā));}for(;;){switch(ā[9]);}ā[4]]:0,ā[45]),'%0A');ā);break;case 53:ā>>=1,ā[57])return[];ā[72])return false;return true;}function ā[6]]=ā+=171:0;ā+1]=(ā):'';return ā[76]));}function ā+=-74:0;ā[64],āreturn{ā()):0;switch(ā[36]](0);ā[60]);for(ā,'\\n',ā[4]]),1);ā[24]),ā[18])|(ā[73]);}}ā[23]);}function ā<=27?ā[29]),ā(108);ā)===0)return ā))return\"\";for(ā[45],'!==');default:return ā; --ā<=47?ā[56]])&&ā);return;case 21:ā[96],ā[0])];for(ā[18]);continue;}}ā[62]);}function ā[88]]=ā[10])):ā[1]]===1&& typeof ā);break;default:if(ā[64][ā[96]=ā===0||ā<=87?ā[50])|((ā.x)*(ā[15]][ā[34]]);ā,(ā[116];ā='pathname';ā[86]]*ā[26]|| !ā[64]||ā[86]||ā<=41?(ā[115];ā[115]?ā[26])&&( !ā(443);ā+=-126:0;ā;continue;}}ā[166],ā+=500:0;ā(261);ā[9]||ā){case 52:ā[53];ā[91];return +(ā+=-49:0;ā[40],0);for(ā]();case 1:return ā=[0,1,ā+=504:0;ā[26]||ā[59]):ā))try{ā,true);else if(ā[33]);if(ā[19]||(ā)/(ā[44]===ā[19])&&(ā[17])+1,ā)return 0;ā[90]);return ā[36]&& !(ā<=45?(ā[94]),ā[14]];ā[13]=1;ā[22]];for(ā[19])||(ā+=0;ā();}return ā[18])return true;}catch(ā[214],ā[57]))return;ā[58]]=ā.y==ā[65]+ā){this[ā);try{ā[76]);}function ā])):0;return ā++ );return ā(569);}}function ā+=-300:0;ā){return(new ā[61]:0,ā!=true)?ā=true;}}if(ā);case'object':if( !ā[56];return ā[83]]());}}function ā();return;}return ā[431](ā), !ā>>>1));ā('\\\\n',ā('of')){ā[68]):0):0,ā[11]][ā[24])?(ā.y)return true;return false;}function ā+1));else return\"\";}return\"\";}function ā[12]];ā[210],ā[40]);}function ā,true);return ā);else debugger;}else ā+'\")'):0;}function ā[17])===ā[69]+ā<=111){if(ā[79]]);ā):0;}}}}function ā<=78?ā+2);for(ā[42]](new ā[54]];ā[24]||ā[39]]('on'+ā[1]+(new ā.y);break;case 1:case 2:ā)):0);else if(ā[42]](' '),ā()):0;if(ā[75]];for(ā[31]=ā(0,ā='';do ā]==ā[27]]&&ā+=9:0;ā[17];return ā++ ;for(ā[11]];}function ā[51]&&( !ā[51]<=ā[52]]=ā[52]];ā[90];ā(589);ā[10]];ā[17]);for(ā==='set')){ā[57]);if( !ā[45],0,0,0,0,0];ā[94])return ā]!==null&&ā[51]](1);ā[130],ā[39]])];ā[151],ā[0]|| typeof ā)):this.ā();break;case 42:ā[67]]==0&&ā){try{return ā]=[ā]+'\\\\b','gim'),ā=false:0;break;case 44:ā[169]){ā<=53?(ā[61])){if(ā[30];return ā[38]||(ā;'use strict',ā[61])?(ā]||1)ā(5);ā[18]);if(ā===0)return[];return ā+=-527:0;ā++ ;break;}if(ā<=110?(ā[4]);}}function ā+=-111:0;ā[3]+ā[186],ā[42]:ā[7],ā);return;}}ā[91]:0:0;return ā[40])!==ā[61],'else':ā[38]], !ā[42]+ā[51]](0);for(ā[94]]!=ā[7]=ā+=-345:0;ā[42],ā[4]]==1)return new ā?this.ā=false;do{ā[50]]);ā+=107:0;ā[66],ā[3][1])||( !ā[4]]-1)!==ā];if((ā+'')[ā[24],'new':ā[62]?ā[46],ā,false)):0;}function ā:0});function ā[4]]-1]===ā,0)-ā[61]))||(ā[17])^ā[11];return āreturn'';ā]]===ā[70]);return;case 7:ā();return;case 22:ā[2]);else return ā[18],'debugger':ā[14]]();}function ā[36]](true),ā+=17;ā[89])&&ā[35],'*=');case 42:ā){}}return{ā[89]?ā++ ]=true:ā);return;case 33:ā(788,ā):0;try{ typeof ā()){case'/':ā=false;break;}ā[14])break;ā:this,ā<=23?ā+=79:0;ā[85])||(ā[61]);for(ā.length===0)return new ā-- ;ā[2]===ā+=816;ā[94]));ā+=96){ā[1], !ā,1):0;else if(ā]===1){ā(569);return ā[50]}),ā[10]);return ā<=68)(ā+=508:0;ā[6]);ā<=25?(ā,1);return ā+1);}function ā[434]();ā[87];ā+=109;ā[32]]||ā[41]]));ā+1))){ā[46]](ā[44]])){ā[189],ā= typeof(ā[19]](0);if(ā[92]]=ā[192])/ā[95];return ā.cp;ā[10]]-ā++ ])>>>0;else return ā){case 1:case 2:ā.length=0,ā=1<<ā[5],'default':ā[79];return ā[67]),ā<=90?(ā<=29?(ā(723)));ā[9];return ā[49]]+ā[91]];ā[91]]=ā[7]&& !ā()){ !ā+3]));}else if(ā+=-276:0;ā[4]++ :ā[18]^ā<=86?(ā[52];return ā-1].x,ā[1]++ :ā[67]]==0){ā[3][1]||ā=String;ā[18]:ā[45]),\"\");ā-1]===\"..\"?(ā[18](ā<=76?(ā+=-196:0;ā=0; !ā[90]],ā<=32?(ā+=15;ā+=277:0;ā]=1;for(ā<=109?(ā[69]);}function ā()==ā;switch( typeof ā[33])>ā[88]))return ā<=79){if(ā[56]){ā], typeof ā);}else{return;}}catch(ā[44])){ā[83]]();else return ā[58])&& typeof ā<=74?(ā[69]];ā,0)!==ā;continue;}}while(ā)return\"\";ā<=0?ā(221);ā]<=ā[4]]; ++ā+=-747:0;ā[8]);}ā[86],ā[30]?(ā(721);for(ā[13]||ā[2])+ā[82]);}function ā[86];ā[33])===ā[89]);}function ā[13])],ā[56])(ā[17]|0),this.ā]=1;ā&1)?(ā(928,ā[71])){ā[17]));ā+=-616;ā[0]=arguments,ā[80]];ā);break;case 5:ā[21])&&ā[16]]();}function ā(9,ā;return;}ā[123],ā:0):0,ā[52]];}function ā=[0,0,0,0],ā= delete ā[13]],this.y=ā<=83?ā[14]?(ā[13];}ā+=-145:0;ā<=51?ā[34]):ā]);else return ā+=443:0;ā+=-366;ā+=16;ā++ ;}if(ā){throw ā[51])?(ā-30:0):0,ā<=112?ā[78]);return ā[436]());ā]='\"':ā[59],'throw':ā[90]));ā[5]]){ā+=-192:0;ā[58];ā+=-40:0;ā[57]])return ā[21]);}}function ā,0);for(ā[102],'??');}return ā+=-61:0;ā[124])|(ā[26]),ā[432]()),ā)!==ā.length===7)return new ā[3][0]&&ā[95]);return ā[62]);}}function ā=Array;ā,'\\n')>=0;return ā[55]; ++ā.charCodeAt(0)-97;for(ā[48]);}function ā[2]=',\"'+ā[12]]||ā===(ā[26]){ā)):0:0,ā={'tests':ā[5]);default:return ā[84]];ā[79]]();}function ā<=103)ā[33]){ā<=93?(ā(492);ā[4]]);if(ā,'let')):ā?1:0);ā=[0,0,0,0,0,0,0,0,0,ā=true:0,ā=Object;ā[24]);default:return ā[45]),'%0D');ā<=69)(ā[93]=ā())){if(ā=parseInt;ā[29]===ā):0;if( !ā[6])||(ā[3].concat([ā){}}if(ā))continue;else if(ā[95]);}ā[24]&&ā(729));if(ā+=192:0;ā+=-594:0;ā[97],ā[25]);}}function ā[18]]:0):0;return ā+=-60:0;ā[58]+ā]-=ā-1; ++ā[17])+ā[58]?ā<=88?(ā[58]=ā[58]:ā[159])):ā[22])?ā[34])if(ā[18],1);ā));}break;}}function ā[42]/(ā[59]];if(ā[195]],this.ā[25])):0,(ā[2]);case 4:return ā[1]),ā[4]]-1)&&(ā);break;}}function ā[4]]>0){for(ā[34],'--');case 61:ā[3])===0;ā];else{ā)):(ā[32]);}function ā+=506:0;ā))):(ā[71]&&ā);return false;}}function ā[76])||(ā[91]:0):ā[40])[0],ā[4]]?ā[40])[0]+ā.y<0?ā[85]&&ā===1&&ā<=63)ā[22]:0;}function ā)):0;break;}ā[43]);}}function ā+=-53:0;ā;}if( !ā('set'))&&ā[43]]||ā[63]]();function ā={ā)):0):0,ā[57];ā+=352:0;ā[25];ā[60]&&ā[30]&&ā[4];if(ā]();}catch(ā[53]+ā[79],{configurable:true,value:ā[53]=ā[26]&& !(ā<=7?ā++ ]={}:ā.x||ā[82]];}catch(ā[86];return +(ā[3]);return;}ā<=24?ā<=106)(ā[17]]=ā:false;ā+1];if(ā[56]]!=ā[26]))&&ā[90])===ā[90]+ā[95]];ā-1;}else(ā[66])&&ā[42]]('try'),ā[25],ā>>=ā[15]<=ā=true;}ā.PI-ā[95]][ā;if((ā<=14?(ā[35],'**=')):ā[63]);return ā++ )]+ā[30]):0,ā[4]);case 6:return ā+=-134:0;ā[26])||ā[55]);ā[64]);if(ā()](0);return ā+=-5;ā+=186:0;ā.x)+ā[29]&&ā,'\\n'));}function ā[44]);}function ā[4]]<=1)return ā,false);break;case 54:if(ā==\"\")return true;else if(ā+=812:0;ā[78]+ā+=-369:0;ā):0):0);else if(ā[4]])];}while(ā+=132;ā[90];case'boolean':case'null':return ā(){}function ā<<(ā[21]))( !ā:0;function ā[42]](0);while(ā[36],'...')):ā[6];ā[2]:0;return ā[67]]);break;}ā-1].y),ā[58]))return ā[6](ā[6]);else if(ā[6]+ā;}return'';}function ā[45]& -ā];return[0,ā.split(ā,true);break;case 6:ā[2]=', \"'+ā[73]];ā[70]?ā+=-21;ā[70],ā[45],'**');default:return ā[36]|| !ā[43]);ā[52]){ā[123]=ā[42]?(ā(168,ā=':';ā[77]):(ā(),'case':ā=true:0;return ā+=-306:0;ā)];}function ā<=13?(ā[2]?ā[6])):0,ā]));}function ā[0]];try{if( typeof ā[3][1]))|| !ā+1];if((ā[23]))return false;ā[45],'!=');}default:return ā];function ā[43])+ā[56]]=ā[63])===ā<=66)(ā[62]=ā[43]?(ā<=31?ā[57])):0;}function ā,true);break;case 25:ā<127?(ā++ ])&ā[45]),\"\"),ā[34]]);switch(ā[34]]?(ā]?(ā[0][1]?ā+=-65:0;ā.substr(0,ā[3]^ā.length=56;ā[69]&&ā)){if(ā===1)return ā<=62?(āreturn\"\";ā[35],'%=');}else return ā);case 15:ā='on'+ā);break;case 44:if(ā):0):0):0;}catch(ā<=60?(ā]]],ā[3][0])|| !(ā[50]))&& !ā):0;else if(ā[45],'>>>');}default:return ā=[];for(;ā[10],'gim');if(ā[0]!==0?(ā[39]]===ā[61],'export':ā[11]):0,ā)):0):ā[38]][ā<=40?ā,'*/',ā+3]=ā+=-205:0;ā[94]][ā(746,ā[62]](ā[157],ā[16]?ā[93],arguments.callee);}function ā[32]];}catch(ā(621);ā[30]];ā))continue;ā[9]);ā[145]?ā[50])<<ā]='';}ā[33])return((ā<<1,ā;while(1){ā[30])==ā,true);}}}catch(ā[61]&&ā<=75?ā[35],'-=');default:return ā==='on'+ā[15]));ā)===false&&ā[14]];for(ā+=-143:0;ā[57]]){ā)&& !ā]:0;return ā?0:1))+ā===1;ā]][ā[188],ā[45],0,0,0,0,ā[2]};ā<<1^ā[49]);return ā[2]++ :ā[36]))&& !ā[83])[ā[19]&&(ā[89]):0;if(ā[22],'img',ā<=18?(ā+=-502;ā[58]:0):ā]-- ;}ā();break;case 43:ā[38]]==ā[19]][ā[24],'yield':ā[37]);}function ā+=-250:0;ā)return true;}function ā[1]);}ā,false)):0;return ā==null?this.ā)):0);return;}else if(ā+=385:0;ā]===0?(ā):0;return[ā[61]&&(ā+=-629:0;ā[184],'=>');default:return ā[3][1]|| !ā][0])return ā[5]]]^ā);}finally{ā[4]]-1)return ā=0^ā[160],ā[79],'ig'),'$1'));return ā[94]];try{ā+=14;ā)|0;}}function ā[45]()[ā){case 60:ā[41])));ā[63]]();}function ā.substr(1)):0;return ā(new ā))return true;return false;}function ā]?ā,false);break;case 56:ā[19])){if(ā[45]),'');}function ā)){try{ā++ ;while(ā])ā)>ā[71])):(ā(495,ā).ā[109],'function':ā(){ typeof(ā=1:0;ā[22]])/ā[48]);ā[57]][ā[20]],ā+=121:0;ā[44])break;ā==1?(ā[84],'ig'),ā[22]]||ā[57]],ā[87]+ā('',ā]):0):0;return ā[87]?ā[2]=(ā[57]];ā+=21;ā[6])&&(ā++ ):0;for(ā)[ā[32]]);if(ā[35]);}ā[10])continue;ā[4]=(ā+=619:0;ā(431,ā+=-152:0;ā+=227:0;ā){case 45:ā[87]||ā[81]];ā[34]];if(ā-1]===ā[170];}else if(ā[44]+( ++ā[81]](ā();while(1){ā[65]](1));}function ā().concat(ā[3][0]>ā(346);ā[16]]();}ā[60]]===ā[98]&&ā[69];}catch(ā[2]),(ā[37]&& !(ā[89]][ā={};if(ā[2];}}}function ā[96])),ā));for(ā[89]],ā,0)):0;}function ā[44],arguments);}function ā==''||ā[96]));ā[154],ā+=370:0;ā,true);}if(ā[78]]()[ā[35],'^=');default:return ā[150],ā]='\\'':ā[47]:ā[42];return ā)):0;}}ā[47]?ā[55]='';ā[3]](''),ā[187],ā,\"var\");if(ā[6])):0):0;}function ā(462,ā[47]+ā+=-113:0;ā[51]][ā[83]](ā[43]]),ā,false);break;case 40:case 41:if(ā++ ]=((ā[43]?ā[17];}ā-=4)ā[43]:ā[26]<=ā[42]]():ā+=184:0;ā<=5?(ā[85];return ā[85]?ā[53]]-ā[28]]=ā())!=ā+=64:0;ā[88];ā[16]?(ā.length;return{ā<=81?(ā[78];for(ā[47]);break;default:if(ā+=459;ā[48]|| !( !ā[11])if(ā[60]]&&ā-1]),ā+=-35:0;ā<=61?(ā)return true;}return false;}function ā(96);ā()],this[ā(275,ā[49]='';ā[45],'>>');}default:return ā[3][2]))&&ā<=85?(ā[51]]=ā.charAt(0)==='~'?ā],''),ā[15])?ā[3][0]||ā[17]-(ā+=480:0;ā+=218:0;ā+=-532;ā[125],1);ā[74]]&&((ā[23])ā[27],'return':ā=String.fromCharCode,ā[87]]:\"{}\");ā[27];ā[75]]){ā();break;case 36:case 38:case 3:if(ā())&&(ā[27]+ā<=19?ā]()):ā[12]);ā[60];ā[5]:0,ā[60]?ā[60]=ā[6])):0;}else ā.reverse();return ā[95])!==ā==0||ā<=35?ā[3]));ā[23][ā===null;ā[11])?(ā[67]);return ā[42]]('...')):0,ā)try{return ā[15]]+'.y',ā[75]),ā[58]&&ā[62]);return ā[39];return ā+=241:0;ā[13]);if(ā[55])&&(ā,1)===ā[64]?ā[1])):ā.y+ā[40]]||ā++ );}break;}ā<=99)ā[7]);return ā[20];ā[122])break;}else if(ā=null;}}catch(ā.length-2;ā[82],'ig'),'$1'),ā[35]+ā[213],ā[24],{},ā[67]],this[ā[57])return;ā[4]===ā[35];ā[70])[0],ā[0])try{ā,false);}function ā[191]){ā[24].jf=ā[74]];ā){case 42:ā[5]];else return ā[67]])return ā-- >0)ā[56]]);}else if(ā[4]];}function ā(169);ā+=-117:0;ā[29]||ā)===true){ā+=26;ā[4]]){case 0:return ā+=-69:0;ā+=-302:0;ā(45,ā<=50?(ā<=54?(ā]instanceof ā[16]](new ā;}if(ā[20]](\"_$\")>0;}function ā[22])?0:0,ā);return;case 11:ā[34]]){case 0:case 3:case 4:ā[129],ā))return true;}ā++ ]= ++ā[10]||ā[18],'null':ā);}}ā[0]=(ā[84]])return false;if(ā.length===5)return new ā[15]?ā[5])?(ā[15]=ā()){if(ā[0];if(ā<=52?(ā[49]]/ā(108):0,ā===\"\";ā[60]]=new ā[56]));ā!==\"js\";ā[45];for(ā)return true;ā():0;return ā[36]))(ā='port';ā));return;case 20:ā.charAt(ā[0]))return true;else if(ā+=624:0;ā[71]+ā){if((ā,1): ++ā===251?ā[75]?ā,1);}catch(ā[75]:ā.length===3)return new ā[11]=ā[18]]<<ā[2]);else if(ā[6]?(ā+=-412:0;ā<=84?(ā);return;case 6:ā+=-544:0;ā[35]){if(ā()];if(ā]:0,ā=[]:0;if(ā++ ];}function ā[4]=0,ā[18])?(ā,true]);ā<=70){ā[1]);case 3:return ā+=32:0;ā[43]])),ā++ ];if((ā[66]]);break;case 5:case 6:ā[64]),ā)||( typeof ā.push(parseInt(ā[62]](new ā[77]);if(ā[119]:0):ā(18));ā[196]],this.ā++ );}if(ā[11];function ā[52]=ā[68];return ā[85]]=ā[122],ā[3]='\")'):0):0;}function ā=encodeURIComponent;ā[149],ā||[];}function ā<=104)(ā):0;}return ā[4]]==0)return new ā++ ):0;while(ā[3][2]>=ā||this.ā+=-872:0;ā[34]);}function ā(631,ā+=-130;ā[31]?(ā<=21?(ā[39]=ā,true,true)):(ā[89]]===false;}function ā[55]);}}function ā[58]&& !(ā[61])&&ā+=516;ā[50]];}function ā= -ā[126]=ā[24])return false;return true;}function ā])&& typeof(ā):0, typeof ā[174],ā,''];return[ā;continue;}ā,this[ā-1)*ā[106]:ā[106]?ā='//';ā[43]===ā[87]]?ā[0].y):0,ā<=16?ā[34])|(ā);return;case 47:ā[63])==ā&= ~(1|ā+=351:0;ā[31]))return true;else return false;}function ā,value:ā&1;ā);break;case 33:ā[10]);}function ā[0]++ :ā+=12;ā++ ) !ā=',\"'+ā[60],1];ā[59],'');ā[17])));ā)>=0;}function ā-1){ā)return false;ā+=-621:0;ā[102]?ā(),'');}ā[60]]=ā[66]<=ā[56]?(ā]+'\\\\b','gim');if(ā);break;case 9:ā[1]=[ā.y)*(ā[61];for(ā[18])));ā[3]++ :ā():0;break;}if(ā[7]){ā();return;case 39:if(ā[206],ā[47]))===\"get\";ā[10]]!==ā[48],'switch':ā<=101?(ā()):(ā[82]])&&( typeof ā[86]);return +(ā[115]){do ā[17]/ā(794,ā<=105)ā[34];}catch(ā[18]==0?ā[7]?(ā[28],'while':ā]<<ā[18]](ā));if(ā<=2?ā[18];while(ā.length===8)return new ā[33])===0){ā[39],'const':ā[4]===0?(ā[18]]=ā.lastIndexOf('/'),ā()):0;break;}ā[3])])|0,ā++ ):0;}ā,arguments[0]),ā[58],0);if(ā[41]]!=null&&(ā[182],ā)!=ā){case 5:if(ā[203];for(ā[25]);ā[95],ā){case'string':return ā]>0;}function ā();}}function ā[55]],''),ā<=8?(ā+=-146:0;ā[1]=(ā)):0;break;case 46:ā[22])?(ā[4]]<=ā+=67;ā)return false;else if(ā[21]){ā(6,ā[73]],'\\n');ā[26])){ā[67]);}function ā){case 43:ā]in ā])return true;return false;}switch(ā+=-744;ā[71]]];ā[58])?ā[21]),ā<=100?(ā[16]](ā(476);ā));}catch(ā[50])):(ā[18]]=(ā[67]);ā<=6?(ā[87]),ā]]&&ā==null?(ā+=-282:0;ā=null):ā++ ]=null:ā[50]&&ā[1]:0,ā(1))if(ā(){return !ā,1):(ā[29])return ā+=544:0;ā[193],ā[433]();ā-=2)ā[27]])))||( typeof ā[69]){ā[61],'delete':ā<=34?(ā[101]?(ā[18];break;}ā[11]));}}catch(ā-1,ā[18]];}return[0,0];}function ā<=38?(ā-1;ā], !(ā='\\r\\n';ā[51]?ā[51]=ā[80];ā[69]),ā[7]);ā===0?ā[48]);return ā[3][0])return ā===0;ā[14],\"\");return;}return ā)return[ā[51]](0),this.ā[56]]==ā[34]||(ā[78]));else return ā(): !ā[18]];if((ā[5])):0):0;}function ā();}else{for(ā+=167:0;ā+=130:0;ā[92],ā===0||(ā[92]+ā[79]);ā[55]+ā){case 15:ā[4]]>1?(ā,this.x=ā[161]?(ā[29]], !ā[55];ā.charCodeAt?ā,false));}ā[32]]);ā,'let'):0):0,ā:0):0:0,ā);}return null;}function ā[62])){ā.y));}function ā[41]]&&ā(172);ā+=732:0;ā<=17?ā+=309:0;ā[4])?(ā(34);ā().getTime(),ā[13],'extends':ā<<1)|(ā(533);ā[12]);}ā=1:0):ā[14]];}catch(ā[35],'<<=');default:return ā[24])return;if(ā[50]);}ā.length===2)return new ā+=11;ā[26];while(ā[33])==ā.fromCharCode(255));return[];}function ā[2]];ā[36]||( !ā[0]),(ā[3])];}function ā+=510:0;ā[61],0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,ā[41]]|| !ā[45])),ā[42]]('??'),ā^=ā()*(ā)>0?(ā[3][0]))&&ā(458,ā[61]=ā[44]?ā[45])):ā[4]]>0){ā[89])){ā[45],'==');}case 62:ā[15],unique:false});}function ā[90]];ā.length-4;ā[45],'&&');case 61:ā[92]]||ā<=44?(ā[59]])return ā<=95)ā[45]+1)continue;if(ā[8],ā[90]]?ā[34]]),ā:0;}catch(ā)0;else{if(ā[0]);case 2:return ā<=42?(ā[52]](\"\");ā(){return new ā[29].ā);return;case 12:ā[25]]||ā()]=ā<=39?ā]):0;}ā[46]||(ā[29]=ā]))return true;return false;}function ā[1]!==ā(432,ā[90]](ā[71]);}function ā=Function;ā==0){ā[56]);}}function ā[22]=ā[61]]+ā[4]=ā[61]]=ā) !ā[26]=ā[72]);return null;}ā[51]](0);}function ā();function ā[47]);break;case 43:ā[43];}function ā);}while(ā-- ;}this[ā[5]++ ;for(ā[17]],\"; \");for(ā[10],'do':ā++ ]));return ā[82]](),ā[61]/ā[61]-ā[61]*ā]):0;}}function ā[83]])return ā===250?ā[93]),ā[24],'for':ā+=-169:0;ā[4]]?(ā[4]=1,ā+96));}ā=\"\";}ā[14]);default:return ā=Error;ā[26]-1)?0:ā[47];return ā[55]]){ā===0)return false;if(ā[45],'>=');case 62:ā[12])):0,ā[3]&&ā);return;}if( !ā[65];ā[39]]=ā.length===4)return new ā[2]:0):ā);return;case 8:ā,1);}ā[38]))||ā[41]){ā[15]);}ā[34]);return ā[59])&&ā[48]];ā[24].jf;ā[88],'void':ā[19]((ā[48]],ā[42]),ā);}else{if( !(ā[28]);break;case 52:ā[0].x,ā[42]]('\\n');return;}ā+=-171;ā(arguments[ā+=2;ā=='var'?ā[8]];ā=false;try{ā);break;case 55:case 2:ā[4]();return ā+=2)ā[1]];ā[55]<=ā[1]]?ā[1]]=ā[50];}function ā;}}}function ā+2])):(ā]='\\\\':0;return ā(207,ā[3][2]|| !(ā[9]];ā[56]===ā(417);ā]&=ā[69]],ā[144],ā<=49?(ā[69]))return true;else if(ā[70]||ā+=-11;ā[47]]+ā[200]];ā,false)):(ā[25])):ā=true:0):0;if(ā[134];}else if(ā();break;case 2:ā[44]);return ā[84]];else return ā[18]):0,ā>0)if(ā,this.y=ā[93]){ā<=113?(ā,false);break;case 59:ā(588,ā[4]]*ā=Math;ā)):0, !ā[1]);for(ā[11]? !ā[4]]:ā]%ā===''))&&ā[44]);if(ā[19]](ā(117);}catch(ā=0;return{ā=\"\"+ā[86]])return ā=\"\",ā[45])return;ā+=10;ā[47];}for(ā[57]](ā[53]));ā[1]),(ā[4]]),1);}catch(ā[31]];}function ā()).ā())/ā[80];for(ā[0]&&( !ā[3],'finally':ā))|(ā)return false;}return true;}function ā(912,this);ā]=\"$_\"+ā[69]||(ā[0]=null;ā+=522:0;ā(26,ā[55]]-ā[18])+ā[4]]-1);}return ā;}else if(ā=[]:0,ā[10])!==ā+=-103:0;ā);return;}else if(ā={'false':ā(174,ā[136];}}function ā(66,ā[52]]=true;}function ā[1]?(ā[38]||ā[51]&& !ā[53]);ā[4]]>0&&ā===0)return'';ā[38]);return ā[439](ā;}else{ā[4]]));}}function ā[22];return ā[14]&1)&&( typeof ā[41]);}function ā[31]);}function ā+\".x\",ā[84]]===ā[51],'try':ā+=10:0;ā!=null)return ā[103],ā[61]]||ā,''));ā[50]));}function ā-=1:0,ā){for(;;){while(ā[11])>>>0;}function ā[82]][ā[0][0]&& !ā[50]<<(ā[20]);}catch(ā[3]){ā+=43:0;ā[18]);return ā[2])[0];}function ā<=22?(ā[82]](ā[0]):ā[82]],ā[51]&&ā]);if( typeof ā[2]];}catch(ā+=231:0;ā[152]?ā[37]&&ā).split(ā[59]](ā[5]&& !(ā[3])/ā[33]):0,ā){this.x=ā[76]];}ā[22])&&( typeof ā),((ā[59]];}}}if(ā[51],0,0,0,0,0,0,0,ā<=107){if(ā[82])return true;return ā<=20?(ā[6]);break;case 10:ā+1]);ā,false);if(ā]|=ā[44]](ā[45]],ā[45]]&ā[34]]){case 0:case 3:case 4:case 1:case 2:return true;default:return false;}}function ā[55],'gim'),ā[45]/ā[58]](ā[57]);}function ā={};}ā[4]]>1)ā=Date;ā[128]||ā[4]]-1);ā[61]];}}}function ā);return{ā={};for(;ā[41],ā))||((ā.length===1)return new ā[181],ā){case 0:ā[88]);}function ā<=72?ā++ :0;}function ā[77]]=ā[16]){ā[45]^ā[49];ā[82]?ā;switch(ā[4]]-1){ā[17])|(ā)|( ~ā[40]];ā)?0:ā=1):0;break;case 1:ā[435]());ā)|ā]()):(ā[69])[ā[2]?(ā[61]):ā>0)ā[42]]('=>'),ā('-->')&&ā[39]];if(ā[50]]===ā[68]]({name:ā<=77?(ā[78]),ā+=1)ā,0);if(ā[80]);return ā[84]);return ā();}if( !ā[78]);ā[34]]==1?(ā[45],'||');default:return ā[4]];switch(ā);}}}catch(ā())break;}}while(ā[32]||ā(329,ā[7], !ā[30])===ā<=65)(ā]: ++ā[40]](ā, typeof ā[178]||ā+=-58:0;\x00뽭(\"r2mKa0\\x00\\x00\\x00oȈ\\x00{(o('(2(?(B(>(,(A(@((&((5(.(-(4($(=]+*8\\n>8[E\\n0>8\\\\G\\nUD\\n?\\n\\x009;>8]\\n\\x00>$ $p>8c\\n\\x00>$\\n\\x00>8h\\n\\x00>8iQ>8j\\n\\x00>$\\n>8l\\n\\x00>8m)\\x00>$F\\n\\x00E\\n>;\\nE\\n7>;\\nE\\n<>;\\nE\\n>;\\nE\\n~>;\\n\\r>;\\n\\n\\x00>;\\nE\\n>;E\\n->$\\rE/ë>$E\\n>$8=G\\n0(E\\nA;\\x00\\x00·$\\r\\rE\\n&E\\n>$\\r\\rE\\nM'$E\\n&E\\n3>$E\\nL$E/ê&E\\n>$\\n\\x00;\\\\&\\n\\x00E\\nM$L;\\n\\x00\\r>;\\nZG\\nE\\n\\n9;';\\nE/Ý&\\nE\\n<>;\\nE\\n8\\nE\\n';\\x00\\x00\\x00#\\x00:?J.'ďEԮ8>$#A>+ԮE\\n$N>$E\\n$N>8UE\\n.$N>$E\\nv$N>8TE\\n\\x00$N>$E\\n8@*8?E\\n$R>0:&D\\n\\x00:D\\nF\\\";>0:D\\nE\\n &\\x00:\\n\\x00>$:\\n>8I:\\n>$:\\n>$:\\n>$:\\n>$	:\\n>8N:\\n>8O:\\n\\r>8P:\\n>8Q:\\n>$:\\n>8S\\x00E\\n$R>0:&D\\n\\x00:D\\n\\\";>$\\x00>$\\x00\\x00\\x00\\x00>0#$¥>0\\n\\x00>0:E\\n=&0>::#>;0:$Î>0E\\n>0:#\\x00D\\n&@#\\x00D\\n:>0:E\\n;&E\\n;>0::T>0#\\x00::::W;E\\n;'0M#\\x007\\x00\\x00	\\x00[\\n\\x00>0*4M4.>0#\\x00.8>\\x00#\\x00$Õ>\\x000>00>0\\n\\x00>0::&#0>0::E\\n=>.;::0>.N0*	6\\x00H7\\x00\\x00/>0>02'06\\x00D\\n32:\\\";>0:>:7\\x00\\x00\\x00E\\n'8[([(]>8\\\\(\\\\([>8]\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00\\n\\x007\\x00\\x00$88	8\\n888\\r888888\\x00\\x00ZG\\n#\\x009;E\\nT7\\x00\\x00´\\x00>0\\n\\x00>0:E\\n&\\r:::>;0:38:\\n\\x00([:8>;:\\n\\x00E\\n\\n&!:\\n(\\\\:8	>;:\\n\\x00:\\n:8\\n>;:\\n(]:8\\n>;\\n\\x00>0:E\\n&3::\\n\\x00&::::j>;::E\\n2&::E\\n2>;0=:7\\x00\\x00	²#\\x00$>\\x00\\n\\x00>0#\\x000HE\\nV#\\x000Hf>0#\\x00D\\n3:::\\\";38#\\x00D\\n3::9;>\\x0088>0#\\x00:*$È\\n>0\\x00>0\\n\\x00>0:E\\n#&@#\\x000H>0#\\x000H>0:E\\nV:f>0::#\\x00D\\n3:::\\\";>;:'00J:7\\x00\\x00\\x00!=G\\n >0=;\\n>0#\\x00:?J.'E\\n\\n$N>\\x00\\x00\\x00mv&ivD\\n<>0:&O:D\\n>$:G\\n>$\\n>0E\\n&>0::&:D\\n)\\x00>;:G\\n)>;=D\\nD)>;\\x009$:\\n>0:\\n:45>;:\\x00:4L>.L:\\x00:4C>.CD\\n4:\\x00:\\\";7\\x00\\x00($:\\n\\x00:\\x00:\\n\\x009.L>;:\\x004C&D\\n4:\\x00:\\\";7\\x00\\x00	5\\x00$v7\\x00\\x00[E\\n>022$o=&E\\nh0Q#\\x005>0:>\\n:>\\n?\\n[$¦&\\nE\\n%0E\\n}0:7\\x00\\x00\\x00#2=&=;\\n)\\x00>;=;\\nD\\n,)>;\\x00\\x00ƥA>0#\\x00D\\n9	&D#>0#\\x00:>0:45>\\x00##D\\n\\n\\x00!&#D\\n\\n:#D\\n\\n9.L>;/#\\x004/##D\\n\\n\\x00!&#D\\n\\n#\\x004/#D\\n\\n9.L>;#\\x004/&#\\x004/>0:4C&\\r=B\\n:)\\x005;7:=1:,.1=&2D\\n4:\\x00\\x00#\\x00-#-\\\";7:,.)=&±##G\\n&D#G\\n=;\\nY&#G\\nB\\n;\\n\\\"D\\nW;#G\\n;\\n\\\"D\\nW>;_#=&?#\\x00G\\n&#\\x00G\\nB\\n;\\n\\\"D\\nW;=;\\nD\\nW<â5;<d>#G\\n=;\\nD\\nW<â5;>;2D\\n4:\\x00\\x00#\\x00-#-\\\";>0=B\\n:)5;>0:7\\x00Q3\\x00\\x00\\x002G\\n))\\x009;G\\n));\\x00#\\x008\\n\\x00,;>#\\x00D\\nW,;7\\x00\\x00ã#\\x00D\\n\\n\\x00A&23^\\x00D\\n!>0#\\x00:$|&³#\\x00:2B>0=9\\n:5;>0=T\\n,:2G\\n<d2D\\n$<$2;\\n!<á5;>0Q?\\n\\n:2Eԯ<<Ը<ԯ2W\\n<<Ը<ӵ2C\\n<<Ը<Ͱ2D\\n\\\"<<Ը<\\\"2W\\nG<<Ը<ԧ;:3^\\x0023^\\x00\\x00\\x00:\\n>7\\x00\\x00\\x00-=G\\n &#=G\\n )\\x00>;=G\\n D\\n<2D\\n<>;\\x00X#>0#\\x00:>0:45>\\x00##D\\n\\n\\x00!&#D\\n\\n:#D\\n\\n9.L>;#\\x00#5>0::>./:7\\x00\\x00Y#\\x00#&O\\n\\x00>0:#\\x00D\\n&=%333#\\x00:>0:\\n\\x00:\\n&QG\\n15$@>0:D\\n#9;&70J7\\x00\\x000#\\x0044#\\x004A>0#\\x00$>0::#:#:&77\\x00\\x00r#\\x00K	1\\n#\\x004DE\\n\\\"D&7E\\nx&7#\\x00$>0:&D\\n>0:\\n\\x00>0::&*#\\x0044#\\x004A>0:::>0:\\n\\x00	&:7:=7:\\n\\x0077\\x00\\x00E\\nx&7#\\x00E\\n-7\\x00\\x00E\\nx&7#\\x00E\\n7\\x00\\x00\\x00E\\ny>0g1\\rE\\n'	:=&c\\x00B\\n->\\nB-9\\nL-:\\n-9\\n)-:\\n'-F\\nJ-?\\n-8\\nG-T\\n5-W\\n-C\\n-W\\n-F\\n[->0=D\\nZ)\\x00>;\\x00D\\n\\x00>0:2D\\n&#\\x002:$¦&#\\x005$g70p+#&	#\\x00#5$g7#\\x005$g7\\x00\\x00ʠ#\\x00D\\n$#D\\n$>;#\\x00;\\n!#;\\n!>;#\\x00G\\nEK>;#\\x00?\\nY#\\x004#4B>;#\\x00G\\nB\\n	(&h#D\\n>D\\n\\n\\x00E\\n&&K#\\x00D\\n>#D\\n>#D\\n$#\\x004#B>;%$$#\\x00D\\nUbD\\nC#\\x00D\\n>9;>;#\\x00D\\nUK>;#\\x00G\\n#G\\n>;#\\x004QQ	&ƍ#G\\nA	1#G\\nQ	1#G\\nD\\nW	&ţ#D\\n>#D\\nU	>0#D\\n>D\\n\\n\\x00E\\n&&Ĳ#\\x00D\\n>#D\\n>#D\\n$#\\x004#B>;:&#\\x00D\\nU#\\x00D\\n>>;#;\\nFV\\nU9;>0#G\\nA	1#G\\nQ	:*:D\\n9\\n+9;E\\n!1:D\\nB\\nO9;E\\n!& =B\\n>&A5\\x00$-B\\n[#\\x00D\\n>B\\nO\\\";>0:G\\n^9\\n'9;D\\n\\n\\x00	&#\\x00G\\nE:>;U=D\\nZ&K=D\\nZ?\\nH5;>0:D\\nY>;:T\\nW#\\x00D\\n>;:V\\n@V\\n!\\n\\x00	&#\\x00G\\nE:>;%#\\x00D\\n>#D\\n>>;%#\\x00D\\nU#D\\nU>;%#\\x00G\\nE#G\\nE>;\\x00\\x00ĀD\\nI>0\\x009\\nN->0\\x00?\\n-G\\n->0#\\x004\\\"&\\n\\x00>0::D\\n&}#::: #\\x00::#:: &W::G\\n	#\\x00::B\\n	&)%\\\"\\\"\\\"#\\x00D\\nU#D\\nU>;#\\x00D\\n>#D\\n>>;#::#\\x00::>;0\\n\\x00>0::D\\n&7#::: #\\x00::#:: &#::#\\x00::>;0D\\x00\\x00\\x00©\\x00B\\n.-B\\n-F\\nI-;\\nF-T\\n-C\\n!-B\\nQ-B\\n-:\\n/-8\\n!->\\n&-8\\n'->0\\n\\x00>0::D\\n&K::>0:#_&7#\\x00::0>;#&(#\\x00%D\\n\\x00:9;#\\x00:>;#\\x00D\\n\\x00:9;#\\x00:>;0X\\x00)\\x007\\x00³:Ee\\x00R66\\x00,;>0E66\\x00:\\n\\x009;>0366\\x00:\\n\\x00:\\n\\\";>066\\x00:\\n\\x00:\\n:\\nX;>0\\x006\\x00B\\n	&+6\\x00D\\n.6D\\n.>;%6\\x00D\\n$6D\\n$>;6\\x00B\\nQ	1	6\\x00B\\n	&6\\x00:\\n\\x00>.Q:7\\x00\\x00\\x00k#0Fe%```:;\\n!	1:D\\n>	&\\n#\\x00:Q>;B:D\\n$	&\\n#\\x00:\\n\\x00>;.:F\\nY	&	#\\x00:K>;#:D\\n	&#\\x00:#:>;\\x00\\x00\\x00ê$#\\x00#\\n\\x00>.<gA #gY>0#\\x00#\\n:&E\\n\\n\\x00>.##\\n#\\x004#45>;#\\x00#D\\nE\\n-D&#\\n>.\\\"#\\x00#*#\\x004\\\"#G\\nD\\nI &#G\\n)\\x00>;#&D\\n4##\\\";7L#D\\nE\\n\\\"	&$#D\\n#\\n\\x00#\\n#\\x004\\\"#\\n#\\nd;7#D\\n#\\n\\x00#\\n#\\x004\\\"X;7\\x006\\x00G\\n&6\\x00G\\nD\\n\\x006\\x00;\\x00\\x00g$#\\x004##\\x009.!>0:&#B\\n.;\\n\\\":;#\\x00#*#\\n\\x00#\\x004##\\n\\x009.L>;#\\x004#4C&#&D\\n4##;#G\\n#\\n\\x00;\\x00\\x00\\x00>0>0:\\x00>.K:Q>.Q:#\\x00*:#\\x00:D\\n:>;:G\\n:>;::\\n@:9\\n:@;>;:?\\n<:C\\n(:@;>;#\\x00D\\nK:>;#\\x00D\\n0D\\nI &#\\x00D\\n0:>;:7D>26\\x00:O>06\\x00D\\nK2>;6\\x00D\\n0D\\nI &\\r6\\x00D\\n02>;:7\\x00\\x0026\\x00:O7\\x00\\x00h2D\\n.6\\x00D\\n.>;2=&26\\x00*\\r>2D\\n0&5E\\n&&2D\\n0D\\n\\x002#\\x00;2D\\n0D\\n\\x00:\\x00#\\x00;\\x00\\x00}2D\\n.6\\x00D\\n.>;2D\\n.E\\n=	&2=&26\\x00*\\r>2D\\nK&9E\\n&&2D\\nKD\\n\\x002#\\x00#n;2D\\nKD\\n\\x00:\\x00#\\x00#n;\\x00\\x00\\x00¬&D\\n\\x00#\\x00#D\\n\\\";>0:D\\nE\\n;&E\\n;\\nE#45*8Q7%Wll:8/>0$ #4@\\n\\x00!	:4@#4@!&3E\\n=T\\n#4@F\\nC:4@Լ#45*8E\\n=&Q7:4%7E\\n;\\nE#45*8Q7\\x00\\x00sD\\n!>0#\\x00:$|&\\r#\\x00:#B7R#40#E\\n	&?#\\x00$ÖD\\n>0:2A&)E\\n-F\\n#:C\\n%#45*8E\\n=&Q7#\\x007\\x00\\x00\\x00ħ%jjj=D\\n]D\\nI &=;\\n3:>;=G\\n5=G\\n5D\\n<D\\n&.=;\\n3D\\n<D\\n)\\x00>;=;\\n3D\\n<G\\n)>;=D\\nD:>;%,,=D\\nDD\\n<=;\\n35\\x00;>;=D\\nDD\\n<5\\x000>;=D\\nDD\\n<D\\n)>;=D\\nDD\\n<G\\n)>;=G\\n5=G\\n5D\\n<D\\n&.=D\\nDD\\n<D\\n)>;=D\\nDD\\n<G\\n)>;\\x00:\\x00>05\\x00$v>0:\\x00:>.=:\\x00\\x00>.K:\\x00Q>.Q>0:D\\nK)\\x00>;:G\\nX)>;:D\\n0)>;:G\\n=)>;:G\\nI)>;:G\\n)>;:G\\n\\\")>;:\\x00:*:\\x00:\\x00f2D\\n.:\\x00D\\n.>;:\\x00D\\n.\\n	&>:\\x00D\\n.E\\n=	2=&2:\\x00*\\r>2D\\nK&2D\\nKD\\n\\x002;\\x00\\x005>2D\\n.:\\x00D\\n.>;2G\\nX&2G\\nXD\\n\\x002;\\x00\\x00F2D\\n.:\\x00D\\n.>;2=&2:\\x00*\\r>2D\\n0&2D\\n0D\\n\\x002#\\x00;\\x00\\x002G\\n=&2G\\n=D\\n\\x002;\\x00\\x00B2D\\n$:\\x00D\\n$>;2D\\n.:\\x00D\\n.>;2G\\nI&2G\\nID\\n\\x002;\\x00\\x00B2D\\n$:\\x00D\\n$>;2D\\n.:\\x00D\\n.>;2G\\n&2G\\nD\\n\\x002;\\x00\\x00 2G\\n\\\"&2G\\n\\\"D\\n\\x002#\\x00;\\x00\\x00\\x00=D\\n]D\\nI	&%:\\x00=D\\n]5\\x00;>.*:\\x00=D\\n]>.*:\\x00>0:\\x004*G\\nI)\\x00>;:\\x004*G\\n)>;:\\x004*D\\n0)>;:\\x004*G\\nX)>;:\\x004*G\\n\\\")>;:\\x004*G\\n)>;:\\x004*G\\n=)>;\\x002G\\nI&2G\\nID\\n\\x002;\\x00\\x002G\\n&2G\\nD\\n\\x002;\\x00\\x002D\\n0&2D\\n0D\\n\\x002;\\x00\\x002G\\nX&2G\\nXD\\n\\x002;\\x00\\x002G\\n\\\"&2G\\n\\\"D\\n\\x002;\\x00\\x002G\\n&2G\\nD\\n\\x002;\\x00\\x002G\\n=&2G\\n=D\\n\\x002;\\x00\\x00\\x00:\\x004==& =D\\n]D\\n<D\\nD\\n4:\\x00:;:\\n>0:\\x00>0=D\\n]D\\n<D\\nD\\n\\x00:\\x004=:\\n\\x00::\\nb;>0:D\\n\\\\:\\n\\x00>;:D\\n_:>;:;\\n.:>;:\\x004KD\\n*:;!2D\\n.:\\x00D\\n.>;2D\\n\\x002#\\x00;\\x00\\x00\\x00«:\\x004==& =D\\n]D\\n<G\\nD\\n4:\\x00:;\\n\\x00>0::\\x004KD\\n&p:\\x004K:>0:D\\n\\\\:\\n\\x00	:D\\n_:\\n	&A=D\\n]D\\n<G\\nD\\n\\x00:\\x004=:\\n\\x00:;\\n.:\\nb;:\\x004KD\\n2:\\n;0\\x00\\x00:\\x00:\\x004=:O7\\x00\\x00:\\x00:\\x004=:O7\\x00\\x00\\x00^:\\n>0:\\x00>0:4=>0:D\\n:\\n\\x00::\\nn;>0:D\\n\\\\:\\n\\x00>;:D\\n_:>;:;\\n.:>;:\\x004KD\\n*:;2D\\n\\x002#\\x00;\\x00\\x00\\x00p:\\x004=>0\\n\\x00>0::\\x004KD\\n&U:\\x004K:>0:D\\n\\\\:\\n\\x00	:D\\n_:\\n	&&:G\\n:\\n\\x00:;\\n.;:\\x004KD\\n2:\\n;0d\\x00\\x00E\\n8@*8?$æ1#\\x00=&#7#=&#7#D\\n9	1	#G\\n#	1	#D\\n	&8Q#>E\\n\\n\\x00$N>0#D\\n:A&D\\n!###B8.>#7\\x00\\x00\\x005#\\x00>0	#\\x008>>00:	?B#\\x00?5:?L:?!:?1:?):\\n?@?0:?C7ô6\\x00D\\n9 &Q'^\\x006\\x00$t>6\\x00282>^\\x00E\\n\\r3$2	&244>06\\x00$>061\\n\\x00>^E\\n7^E\\n&&	E\\n<^>0E\\n>0:1E\\n>0&9:$&\\r>0E\\n\\\\^:$E\\nA1	6E\\n&	E\\n5^:&	E\\n^85>\\n262\\nB8,45>^\\x00\\x00\\x00q:\\x004C&Q7:\\x00#\\x008>>.CD\\n!>0#\\x00D\\n9\\r#\\x00:$a&/&D\\n\\x00#\\x00:D\\n\\\";>0%:8/>0:4%>\\x00Q>\\x002#\\x0062\\nO7\\x00\\x002\\nA!7\\x00\\x00¯#\\x00G\\n>0D\\n\\x00#\\x004<9;>0:G\\n! \\nE\\n&224DE\\n\\\"2\\n&U247&:\\x00>.0F:A	1:K	1:Q	&D\\nW>0:D\\nW	#\\x004QQ	1:B\\n	(&	:\\x00>.0:7Q7\\x00\\x00<\\nE\\n&224DE\\n\\\"2\\n&:\\x00>.077\\x00\\x002477\\x00\\x00\\x00\\x00\\x00IE\\n\\\"$R>0D\\n\\x00:(ND\\nP(OD\\n(d;>00'0<D\\n\\n&0=;\\nA:$S\\x00E\\n?$E\\n?I\\n\\x00?O:?T7#\\x006\\x00*$O#\\x006*$\\x00\\x00\\x00\\x00E\\n\\x00-\\\".387\\x00\\x00\\x00B<D\\n	D\\n#9;>0:D\\n52>;<D\\n\\nD\\n[:;:D\\n0:D\\nK)\\x00@;>;\\x00S:\\x00D\\n.=1:\\x00D\\n.:\\n	1:\\x00D\\n.W\\n	&(2G\\n\\x00G\\n2;2D\\n02D\\nKK@;>;\\x00\\x00\\x00E\\nX$N>8`$f>8a\\x00\\x00E\\n\\\"$>$'E\\n.3$\\x00\\x00\\n$f(`(a7\\x00\\x00\\x00#\\x00:?J:?F.')\\x00>$\\x00GE\\n'$R>0:D\\nH$|&	B\\n>	V\\n>	>0:3)\\x00>$\\x00/#\\x00>$ >06\\x00\\n9.R>0::$£\\nO8>02:*\\x00\\x009\\n<G\\nY2U$S<;\\n%2U$S<G\\n2U$S2E/ì*$Y\\x00\\x00E\\n\\n3$\\x00\\x00'#\\x00G\\nC>0:E\\n7	1:E\\n.	&E\\n\\\"3$\\x00\\x00E\\n=3$\\x00\\x00E\\n-3$\\x00\\x005E\\nX$N>0#\\x004G:#\\x004GA&#\\x004G>8`#\\x0046>8a:>8`$f>8a\\x00\\x00R%MMM=;\\n\\n=G\\n	&:T\\n2	9\\n>><G\\n$`D\\nTD\\nH	&2B\\n2>;\\x00\\x00ê%ååå=;\\n\\n=G\\n	&ÒD\\n\\x00<G\\n2\\\";E\\n>05\\x00$L>0:C\\n:G\\nO,;E\\ni;2>\\n):;\\n\\\\,;>0<G\\n$`D\\nTD\\nH	&\\n:B\\n:>;:1$=<G\\nD\\n\\n1=$U:\\nC&\\n8\\n[*8E\\n=E\\n&=V\\n>\\nX;\\x00\\x00\\x00'\\x00>0:ZD\\n(`9;*$M:ZD\\n(a9;*$M:7\\x00\\x00E%>>>2$á>0::D\\n\\n\\x00&$:$£8!>0:&:3$}:$?G:$?677\\x00\\x00j#\\x00E/ß>0$p:>0>\\n):5$L;\\n\\\\,;>0!D\\n\\x0022D\\n\\n\\\";B\\n	&B\\n'0\\nE\\n3$N\\r&>\\nO'0:7\\x00\\x00Q7\\x00\\x00&<G\\n#\\x00D\\n!#9\\n(T\\r>;\\x00\\x00\\x00\\x00\\x00*#\\x00#\\x00D\\nE\\n;T\\n\\x00!&#\\x008B>\\x00#\\x008A>\\x00#\\x007\\x00\\x00Î\\n>0#=&(#$)>0:D\\n#D\\n&\\rE\\n>0:>#8>#\\x00=&\\x00>\\x00\\x00:->0:#\\x00*$E\\n$ã>0::*$#D\\nE\\n;D&#:E\\n;$:#$j\\n\\x00B$§*$#8>:$P>0\\x00>0::*$M::*$e#&\\n:#$§>0G\\nU:$w7\\x00\\x00U#\\x00D\\n3\\n9;>\\x00#\\x00$>0#&:#$>0:=&\\x007:D\\n3E\\n=9;$P>0:3$}::$!&\\x007:7\\x00\\x00.#\\x00#8 >0:& :$>0:\\n!:E\\n!&:$h7\\x00\\x00%#\\x00###O8#>0:7\\x00\\x00Ï#\\x00#8 >0:=&:$>0:\\n!:E\\n!&:$h>0:$h>0:$h>0:$j\\n\\x00B$>0::E\\n;$:E\\n\\r&:$/>0#&:3:3$}:$Û&K:$>0:$h>0\\n\\x00>0	:	#D\\n&'%#:	>0\\n:\\n4$:\\r&:3$}:\\n:.&0	4R7\\x00\\x00\\r\\x00\\x00>0\\n\\x00>0:?J:?(:?':?R:?3>00	=;\\nA:$S:38:3$â:3$à:38:38:38%:38<:3$Ý:38C:38E:3$å:3$Ú:3$ç:3$Þ:38G:3$Ü:3$ß:38F:38D:7L2\\nD\\n629;>0\\n\\x00>0::D\\n&\\r::Z.J0\\n3$2E\\n*$YE\\nt&89\\x00\\x00^	2\\nD\\n629;>0\\n\\x00>0::D\\n&::4F>0:A &00&E\\n3$E\\nh&\\n(9E\\nJ*$\\\\$ \\x00\\x002\\nD\\n*#\\x00;\\x00\\x002D\\n*#\\x00;\\x00\\x002$p$¥*$Ù\\x00\\x00&#&2D\\n6\\x00#-9;>02>0#\\x00:7\\x00\\x00¡\\x00>0\\n\\x00>0:#D\\n&#:>0:4I#\\x00&r%mmmK>0:4O\\n\\x00 &B\\n$:4$$K>0:=&1\\x00>0::.T:D\\n:4O\\n\\x00 &:4OB\\n$:4$:$H:D\\n&::4$*$O::*$0:7\\x00\\x00f<G\\n^D\\n#9;>0:D\\n\\n>0:\\n\\x00D&5::D\\n;\\n09;;\\n)	&::;\\n_G\\n::;0r<E\\n8@*8?\\x00\\x00\\x00\\x00#\\x00:?J:?F.'\\x00\\x00+E\\n-$N&!\\n\\x00>0E\\n%&E\\n>08(&:*$\\\\\\x00\\x00g=G\\nV>0::>\\n\\x00$`D\\nOD\\n(Q9;E\\n!&4$`$Ø>0::4S(Q$ä>.S:$ë>0:>\\n\\x00:C\\n[Q:n;\\x00\\x00\\x00\\x00UE\\n$>0\\n\\x00$>0:&>8$`>0D\\n\\x00:D\\nTG\\nK:;\\n=:I;>0:&	::*0:30¶$`D\\n;D\\n$\\n>0$`D\\nO>0#\\x00D\\n($\\n>0::	&m=$U>0:D\\n >0:D\\n\\x00:G\\n_\\\";E\\n!1:&9D\\n\\x00#\\x00D\\n(\\\";E\\n &\\nD\\n+'\\x00D\\n('\\x00(QD\\n!$p'\\x00$`D\\n#\\x00:;\\x00\\x00<D\\n	D\\n9;>0:D\\n\\rG\\n/B\\n;:D\\n#\\x00>;<D\\n	G\\n9;>0:D\\n>;:D\\n#>;:D\\n[:;:\\n>.?:D\\nM;\\n6G\\n>;<D\\n\\nD\\n[:;:D\\nZ;\\x00\\x00\\x00~#\\x00$t>0:K :4DE\\n	1:4D\\n	1\\n:4DE\\n=	&L#:4,Q \\n:4P$$¤&:4,&:4,:427 #1\\n\\x00>:#1Q>.::#\\n\\x00B8,457#\\x007\\x00\\x00#\\x00$j$>0G\\n6D\\n!:7\\x00\\x00	³#\\x00=&Q7D\\n\\x00#\\x00D\\n+\\\";>0\\x00>0\\n\\x00>0::D\\n&s#\\n:V&VZB\\n(E\\nE\\n7\\\";$÷>0:Q$ô>0;\\nS;\\n[:$P>0:$w>0:D\\n*:D\\n!:;:D\\n*::;0p:D\\nD\\n+9;7\\x00\\x00	#\\x00$j$í7\\x00\\x00ŏE\\n=&\\n\\x00-Q-\\n\\x00-7#\\x00$>0::\\n>0:=&\\n\\x00-Q-\\n\\x00-7Q>0\\n\\x00>0#\\x0044>0:>\\n>0:&¯\\n\\x00>0::D\\n&::>0	::	\\n\\x00$a&:	\\n&:>0t:	\\n:	\\n&HD\\n\\x00:	\\nD\\n\\\";>0\\n\\n\\x00>0::\\nD\\n& :\\n:E\\n\\n$]\\n>0\\n:V00p-:D\\n\\n\\x001:\\n\\x00&\\n\\x00-:-:-70pª#\\x004:1Q>0D\\n\\x00:9;>0:W\\nI>0\\r:\\r::\\r$î&\\r\\x00-:-E\\n*-7\\x00-Q-\\n\\x00-7\\x00\\x00\\rȯ$#\\x0047&E\\nE\\n%E\\n}PQE\\n>0#E\\n%&\\n0#\\x0044>0#\\x0081>0:>0Q>0#\\x008+>0:\\n\\x00:\\nD\\n\\n\\x00&\\n#\\x00448(>0#E\\n=&':\\n\\x00:\\n\\n\\x00&::\\n8)>0Q>0Q>0#=&85>E\\nC#\\x00#88>0:\\n\\x00>0:\\n>::##O$¢>0	\\x00::	\\\".R\\x00:\\nO8>0\\n>0#E\\n7&(I>0Q>0:D\\n\\n\\x00&F#\\x004+>0Գ'0:D\\n\\n\\x00&:D\\n+'0:'0D\\n+:D\\n!:\\n'0#\\x004,'0§:D\\n!:\\n>0:&:D\\n+:>0\\nE\\nh<#\\x0042$zԬ$«E\\n#\\x0042D\\nD\\n(9;\\rE\\n#\\x0042D\\nD\\n9;\\r#\\x004DE\\n	1#\\x004D\\n\\r&#\\x004+::$u#\\x004,>0#\\x0042$z:$u#\\x004,>0:?5:D\\n!:\\n?9#?@7\\x00\\x00	$#\\x004A$80>0:\\n\\x00>0:Q!&#\\x00:>.4:\\n>0:\\n>0:=&7#\\x0044$¬$$>0:$$>0:4-E\\n5&:86>0:4-E\\n\\\\&:87>0::$P>0::48	7\\x00\\x00-E\\nG#\\x00A##O$¢>0\\x00E\\n=:\\\".R8>0:7\\x00\\x00$ì>0#\\x00#A\\x00:-O8\\\"&:7\\x00\\x00ń#\\x00=&\\x00Q-#\\x00-7#\\x00D\\nD\\n+9;>\\x00\\x00>0Q>0\\n\\x00>0:#\\x00D\\n&°#\\x00:>0:D\\nD\\n!9;>0:D\\nE\\n\\r:\\n\\x00\\r1:\\n\\x00(I\\r&:&\\x00Q-Q-7:\\n>0X:D\\nE\\n\\r\\r:\\n\\x00;\\nS$a&7:D\\nE\\n\\r\\r:\\n\\x00G\\n6$a&\\r:\\n8*>0:D\\n*:;0½:&@#\\x00xD\\nOD\\n3\\n9;	&\\x00+-1$-7:8/>0:&:4%&\\r:D\\n*:4%;\\x00:-:D\\nD\\n+9;-:-7\\x00\\x00!#\\x004S80>0:\\n\\x00&\\n#\\x00:\\n\\x00>.4:\\n7\\x00\\x00%#\\x00Q	&#\\x007#\\x00	1#A	1	#D\\n7 &#\\x00$t>#K	&#\\x007#4DE\\n\\\"&#837#4P$$¤&1#44#4S$u#4,>0#4D\\n	&:7D\\n\\x00#4+:\\\";7#837\\x00\\x00f#\\x004S&[#\\x0044>0#\\x0081>0#\\x0044:!>0:&,Q>0#\\x004DE\\n\\r&#\\x004+>0:#\\x0044:$u#\\x004,7#\\x0042$z:$u#\\x004,7#\\x00427\\x00\\x00#\\x00$$ö7\\x00\\x006$f>0:(c&:>8c8c(cE\\n>\\n\\x00m$E/à$E\\nq7\\x00\\x00Q>0#\\x00D\\n>0\\n\\x00>0::&g#\\x00:>0:G\\nM	:E\\n:&>>\\n.$@>0#\\x00:\\nD\\n%:9;#\\x00:E\\nD\\n%:9;&\\nE\\n-'0:'00n:7\\x00\\x00Q>0#\\x00D\\n>0\\n\\x00>0::&x#\\x00:>0:G\\nM	:E\\n:&@>\\n.$@>0#\\x00:\\nD\\n%:9;#\\x00:E\\nD\\n%:9;&\\nE\\n-'0:D\\n(	&0:'00:7\\x00\\x00ċ#\\x0044$¬>0#\\x0081>0E\\n#\\x0042D\\nG\\nK9;!1F\\nE\\nh<#\\x0042$zԬ$«.E\\n#\\x0042D\\nD\\n(9;!1E\\n#\\x0042D\\nD\\n9;!&#E\\nI:D\\nC\\nD\\n-$@Q\\\";>0:$$>0#E\\n&:D\\n:\\nD\\n-$@Q\\\";>0:$$>0#E\\n5&:86>0#E\\n\\\\&:87>0::>0\\x00:$P-#-7\\x00\\x00\\x00û>\\n-$K>0:&E\\nc>\\n-\\n$HE\\nY$R1Q>0:D\\nD\\n9;>0\\x00>0\\n\\x00>0::D\\n&::&:D\\n*::;0'\\x00>0	%\\n0>0	:	D\\n\\n\\x00&oE\\n\\\"$R1Q>0:(S>0:$t>0\\rE\\n7>0:\\r:\\n\\x00B8,45>0:	D\\nJG\\nE\\n\\n9;9;D\\n3\\n\\x00E/{\\\";>0:$j$>0::*$õ\\x002D\\n>0:\\n\\x00&#\\x00D\\n*)\\x00>;\\x00B\\n\\x00>0:2&%2:#\\x00D\\n2:9;E\\n!&0-6\\x006\\x00D\\n#\\x00>;\\x00\\x00\\x00Ò=D\\n>0\\n=$U>0=;\\n>0QD\\nG&l\\x00D\\nG-D\\n609;D\\n6:$U09;D\\n6<D\\n^09;D\\n6:;\\n09;D\\n609;D\\n609;D\\n6\\x00>\\n-9;>0\\r:\\r7=\\x00ԿD\\nG-D\\n6)\\x00g9;D\\n609;D\\n609;D\\n6\\x00>\\n-9;>0\\r:\\r7\\x00¿QD\\nG=9;>0Q;\\n(:9;>0\\x00>0:3\\n\\x00>0::D\\n&}::>0=:>0	:	;\\nC\\r1:	=\\r:8\\nN!&J::	0>0\\n:D\\n*:\\n;:	D\\n\\r&=:D\\n<130:	D\\n7\\r&=:1300:B\\n,;7D\\n&#\\x00D\\n/7\\x00\\x00ŮQD\\nG#\\x009;>0Q;\\n(:9;>0\\n\\x00>0::D\\n&ŀ:::>0}:_:G\\nA &CQ>0:G\\nD\\n\\r&;\\n#:G\\n>02D\\n*2\\n9\\n:::;f:_:G\\nA &CQ>0:G\\nD\\n\\r&;\\n#:G\\n>02D\\n*2\\nV\\n\\n:::;D\\n:_&xQ>0:D\\nD\\n\\r1:D\\nD\\n\\r1:D\\nG\\n#\\r&;\\n#:D\\n>02D\\n*2\\nW\\n\\\":D\\nD\\n:::;0ō\\x00\\x00\\x00ƊQD\\nG#\\x009;>0QC\\n\\\"#\\x009;G\\n>0:D\\n=_&QG\\nT:QD\\nG:D\\n<9;\\\";>0Q;\\n(:9;>0\\x00>0:3\\n\\x00>0::D\\n&Ĉ#\\x00::>0:;\\nC\\r&ë#D\\n@::D\\n&:D\\n/>0:D\\n\\r&:D\\n*:V\\nW:;©:D\\n9\\r1	:D\\n\\r1:K\\r1:A\\r&:D\\n*:8\\n:$;m:D\\n7\\r&b:D\\n*:9\\n:;#&J:#D\\n@::>0	\\n\\x00>0\\n:\\n:	D\\n&:D\\n*:	:\\n;0\\n :D\\n*#\\n;0ĕ:B\\n,;7\\x00\\x00D\\n&#\\x00D\\n/7\\x00\\x00Q>0\\n\\x00>0:#\\x00&\\nԷ'00:7\\x00\\x00	ë\\x00>0:3#0FØ%ÓÓÓQ>0#:>0:D\\n\\r&B\\n/:Q$>0$:D\\n\\r1	:G\\n#\\r&B\\n/:Q>0:D\\n*#:D\\n::;:D\\n7\\r#E\\nA&M:\\x001:=G\\n5Y=&8#\\x00:#E\\n=B>0\\n\\x00>0::D\\n&:D\\n*::;0 :7\\x00\\x00=>0:D\\n^>0\\x00T\\n->0::D\\n=:D\\n=G\\n<&R<D\\n=G\\n<,;>0\\x00>\\n/-D\\n->\\n;->\\n1-v-D\\n1-G\\nH-;\\n->0::C\\n:U	:7\\x00\\x00Ǧ=>0:D\\n^>0:;\\n>0\\x008\\n\\\"->0\\x00B\\nU-B\\n5->\\n-;\\nX-8\\n0-:\\nZ-B\\n\\r-B\\n-F\\nL-:\\n%->\\n,-T\\n9-9\\n-:\\n-C\\nX-;\\nH-:\\nE->0::T\\n%:U	:;\\nQ&C\\x00D\\n-;\\n\\r-;\\n'-8\\n-?\\n#-W\\n#-D\\n1->0:;\\nQ::\\n2:U	:&x\\x00G\\n->0::T\\nD:U	:D\\n=&U\\x00;\\n'-;\\n\\r-;\\n-;\\n+-:\\n-9\\nF-:\\nF-T\\nX-F\\nH-?\\n->0	:D\\n=:	9\\n]:U	:&x\\x00B\\n3-;\\nZ-B\\n-B\\n1-B\\n#->\\n-D\\n-D\\n1-C\\n->0\\n::\\nF\\nE:U	:;\\n]&%\\x00D\\n\\\"-T\\n&->0:;\\n]:9\\n:U	:7\\x00\\x009\\n\\x00>0:#D\\n&'#:>0#D\\n*#:D\\n#\\x00:;04\\x00\\x00\\x00:=\\n\\x00B78\\x00=-2-2\\n-2->0\\n\\x00>0::D\\n&::#\\x00	&707\\x00\\x00\\x00\\x00\\x00Đ\\x00:\\x00->0:)\\x00>+:)>+Ú:)>+ǃ0>0F\\nD\\n-$@>0	Տ<ՄԶ<ՋՃ<ՉԾ<ԽՆ<ՊՑ<kԭ<Ժ>0\\n%³¹¹\\r#\\x000030:,+Ú>0:A	&\\n:\\n)>0:D\\n\\r&\\n:\\n:>0w:D\\n\\r1	:G\\n#\\r&\\n:$J>0W:D\\n9\\r&\\n:0>0B:;\\nC\\r&Ի:D\\n,,;0>0#:D\\n7\\r&\\n:$>0Ռ:Q0>0:7V\\nS7:\\x00\\n\\x00#\\x00>;:\\x00\\n#\\x00#>;:\\x00\\n#>;\\x00\\x00\\rԢ#\\x00\\n\\x00E\\n\\r\\r&e#\\x00\\n32,+Ú>0#\\x00\\nE\\n\\r&2:j+9#\\x00\\nE\\n0\\r&2:=+!#\\x00\\nE\\n\\r&2:P+	C\\n\\r$[CҰ#\\x00\\n\\x00E\\n\\r1#\\x00\\n\\x00E\\n-\\r&Ǡ#\\x00\\n32,+Ú>0#\\x00\\n32,+Ú>0#\\x00\\nE\\np\\r&\\r2::+Ơ#\\x00\\nE\\n\\r&\\r2::+Ɔ#\\x00\\nE\\nm\\r&\\r2::+Ŭ#\\x00\\nE\\nu\\r&\\r2::M+Œ#\\x00\\nE\\nv\\r&\\r2::q+ĸ#\\x00\\nE\\n\\r&\\r2::+Ğ#\\x00\\nE\\nV\\r&\\r2::T+Ą#\\x00\\nE\\n|\\r&\\r2::+ê#\\x00\\nE\\n\\r&\\r2::+Ð#\\x00\\nE\\n7\\r&\\r2::D+¶#\\x00\\nE\\n4\\r&\\r2::A+#\\x00\\nE\\nw\\r&\\r2::\\r+#\\x00\\nE\\n@\\r&\\r2::!+h#\\x00\\nE\\n9\\r&\\r2::	+N#\\x00\\nE\\n(\\r&\\r2:: +4#\\x00\\nE\\n\\r&2::+#\\x00\\nE\\n;\\r&2:1:+ʶ#\\x00\\n\\x00E\\n\\r&9\\n\\x00>0:#\\x00\\nD\\n&#\\x00\\n:32,+Ú>00*2:+ɰ#\\x00\\n\\x00E\\n\\r&92#\\x00\\n32,+Ú&#\\x00\\n32,+Ú#\\x00\\n32,+Ú+Ȫ#\\x00\\n\\x00\\n\\x00\\r&02#\\x00\\n9+ǃ>0#\\n\\r&\\n2:+22\\n\\x00:+ǰ#\\x00\\n\\x00\\n\\r1#\\x00\\n\\x00E\\n.\\r&q#\\x00\\n32,+Ú>0#\\x00\\n#\\x00\\n=*2,+Ú>0	#\\x00\\n1\\n\\x00>0\\n#E\\n\\r&2::	:\\n5+2:\\n=1:\\n:&::	A+Ũ#\\x00\\n\\x00E\\n=\\r&\\r2#\\x00\\n+Ŏ#\\x00\\n\\x00E\\n\\r&!22#\\x00\\n9+ǃ2#\\x00\\n9+ǃ$@+Ġ#\\x00\\n\\x00E\\n\\n\\r&	2K+Ċ#\\x00\\n\\x00E\\n\\\"\\r&2#\\x00\\n9+ǃ>02:+å#\\x00\\n\\x00E\\n3\\r1#\\x00\\n\\x00E\\n\\r&¦\\x00>0\\n\\x00>0:#\\x00\\nD\\n&#::D\\n#\\x00\\n:32,+Ú>;03#\\x00\\nE\\n*2,+Ú>0:\\n>0\\n:2Y&/2:\\n=1	:\\n:\\n&:\\nD\\n4:\\n\\x00:\\\";A+2:D\\n4K:\\\";+%#\\x00\\n\\x00E\\n'\\r&2#\\x00\\n==+	C\\n:$[C\\x00\\x00\\x00T\\n>0)\\x00>0)>0:7\\x00ĤQ>0\\n\\x00>0\\n#\\x00D\\nV\\nD\\n-$@Q\\\";>\\x00:\\n#\\x00D\\n&æ2D\\n#\\x00G\\n0\\nH9;9;>02D\\n#\\x00G\\n0\\nH9;9;>02D\\n#\\x00G\\n0\\nH9;9;>02D\\n#\\x00G\\n0\\nH9;9;>0	:E\\nV:E\\n=of>0E\\n:E\\n=V:E\\nof>0E\\n-:E\\n\\rV:	f>0JG\\n:9;'0E\\n):!GJG\\n:9;'0E\\n):	!GJG\\n:9;'0ó:>0:7\\x00\\x00ČQ>0\\n\\x00>0\\n\\x00>0\\n\\x00>0\\n\\x00>0\\n\\x00>0:#\\x00D\\n&Þ#\\x00D\\n?:9;>0:E\\n<&JG\\n:9;'00±:E/Û:E\\n&>#\\x00D\\n?:\\n9;>0JG\\nE\\n:E\\n\\rVE\\n:f9;'0E\\n'0_#\\x00D\\n?:\\n9;>0#\\x00D\\n?:E\\n9;>0JG\\nE\\n:E\\nVE\\n:E\\n\\rVfE\\n:f9;'0E\\n-'0ë:7\\x00\\x00\\x00S\\x00>0\\n\\x00>0:#\\x00D\\n&::#\\x00D\\n?:9;>;0#:\\n\\x00>0:D\\n3\\n9;>0\\x00>:2*027z\\n\\x00>0:#\\x00D\\n&h#\\x00:2\\r&J\\x00>0#\\x00D\\n3:E\\n#\\x00:\\n:E\\n\\\";:*#D\\n*:;#\\x00:\\nE\\n'0#D\\n*#\\x00:;0u\\x00\\x00\\x00\\x00E2	8\\n:\\n\\x00>;2	D\\n#\\x009;&G\\n#\\x00D\\n2	)\\x00\\\";G\\nG\\n#\\x00G\\n7\\x00E2\\n#\\x00>0:D\\n9	&:,ՇB\\n*#\\x00D\\n?\\n\\x009;D\\n,E\\n;9;D\\n3E/×9;7\\x00\\x00:\\x00:\\x00D\\n#\\x00>;\\x00\\x00-:\\x00:\\x00D\\n\\n>0:\\x00D\\n:\\x00D\\n&\\n\\n\\x00L;:7\\x00\\x00?\\x00>0\\n\\x00>0:#\\x00D\\n&::#\\x00:E/éq>;0#JG\\nD\\n4K:\\\";7\\x00\\x00O(eA!&(e7%77=D\\nZ$´5;>0=$U$­>0:&:$ð>0::$è>0:A @8e7\\x00\\x00?\\x00c\\n\\x00>00Q>01\\n\\x00>02\\n\\x00>03\\n\\x00>04\\n\\x00>05\\n\\x00>06\\n\\x00>07\\n\\x00>08\\n\\x00>09\\n\\x00>0:\\n\\x00>0=\\n\\x00>0>#\\x00E\\n-?$\\n?I\\n\\x00?O:?J:?F:?T.(.&=&N)\\r\\x00;\\n-G\\nY-G\\n->0\\n\\x00>0::D\\n&<::2$S0<D\\n&!<$ò2$S<$é2$S<$ï2$S=B\\nK2$S\\x00\\x00D&&E\\n5E/è*=G\\n,2.\\n\\x00;!=&\\r=$³A ><\\x00\\x00®!##\\x00*$O#\\x0024*$®#\\x0022*$®#\\x0023*$O#\\x0020*$M#\\x0021*$#\\x002:*$M#\\x0028*$O#\\x0029*$O#\\x0026*$O#\\x0027*$O#\\x00\\n*$M#\\x002=*$M#\\x00=B\\nU*$s#\\x00=B\\n5*$s#\\x00=>\\n*$s#\\x00=;\\nX*$s#\\x002>*$ñ\\x00\\x00\\r\\x00\\n\\x00>0\\n>0	E\\nI&E\\n	&@=$U>0\\n:\\nD\\n D\\n%$ó5$@9;>0::\\n$]$êD&:\\n$\\n\\r&%010&E\\n5E\\n~*)\\x0030Ŋ<D\\n	$_9;>0:D\\n1#\\x00D\\n1>;:D\\n#\\x00D\\n>;\\n\\x00>0\\n\\x00>0#\\x00$©=&2#\\x00D\\n1E\\n)E\\n<$d>0#\\x00D\\nE\\n)E\\n<$d>0:$cԱ9;>0:$r#\\x00$r>;:$i$µ#\\x00$԰#\\x00$԰#\\x00$԰#\\x00$D\\n>;:$#\\x00$::n;:$i$µ#\\x00$԰#\\x00$԰#\\x00$԰#\\x00${D\\n>;:$\\n\\x00\\n\\x00#\\x00D\\n1#\\x00D\\nb;\\x00:-:$\\n\\x00\\n\\x00#\\x00D\\n1#\\x00D\\nI;$m-7\\x00\\x00ó#\\x00$\\n\\x00E\\n2$d>;#\\x00$\\n\\x00E\\n2$d>;#\\x00$\\n\\x00E\\n2$d>;#\\x00$rv>;#\\x00$©#>;#\\x00D\\n\\\"2	\\r&5#\\x00$\\n>;#\\x00${$Ć>;#\\x00$$û>;#\\x00D\\n1#>;#\\x00D\\n#>;k#\\x00$$$¯\\n9;>;#\\x00${$$¯\\n9;>;#\\x00$JG\\nE\\n/E\\n_$d9;>;#\\x00D\\n1#\\n\\x00E\\n\\n$d>;#\\x00D\\n#\\n\\x00E\\n\\n$d>;\\x00\\x00#\\x00D\\n#D\\n&\\n#\\x00D\\n#D\\n>0\\n\\x00>0::&_#\\x00:#:!1#\\x00:\\n#:\\n!1#\\x00:E\\n#:E\\n!1#\\x00:E\\n-#:E\\n-!&\\n7E\\n='0f\\n\\x007\\x00\\x00\\x00g=$·5\\x00;>0E\\n>0E\\n>0>0:D\\n\\\"2>;:::\\nU:${\\n>;:>0:D\\n5:\\n\\x00$y,;>;:D\\n0)\\x00>;\\x00ª<D\\n	$_9;>0:$cԱ9;>0:::$±=&:D\\n12D\\n1>;:D\\n2D\\n>;:$±2\\n\\x00\\n\\x002D\\n12D\\na;:$\\n\\x00\\n\\x002D\\n12D\\nI;>02\\n:$m>0:3^\\x00\\x00\\x00C>0:D\\n\\\"2>;:E\\n'E\\n'\\n\\x00U:\\n>0::D\\n3E\\n=9;7\\x00\\x00Q>0:D\\n\\\"2	>;:E\\n\\rE\\n\\r\\nU:\\n>0:D\\nE\\n';:\\n>0::7\\x00\\x00#\\x00&E\\n5E\\n~*\\x00\\x00\\x00e=$Ā>0:&:D\\n<$0=&\\n>=$ø>0:&4:D\\n<$ā0=&	E\\n>:D\\n<$y0=&	E\\n=>6%111#\\x00#D\\n,,;>0:D\\n#9;\\n\\x00:D\\n;\\n>9;\\n\\x007\\x00\\x00\\x00\\nE\\n%\\n*8?\\x00\\x00	#\\x00#A 7\\x00\\x00:D\\n\\x00#D\\n\\\";>\\n\\x00>0:#D\\n&#\\x00#:A &\\n70\\\"\\x00\\x00,#1\\n\\x00>#\\x000F:D\\n#D#D\\n:9;&\\n7\\x00\\x00#\\x000FD\\n\\x00:#\\\";E\\n &\\n7\\x00\\x00«E\\nO>0E\\nR>0E\\nR>0\\x00>0\\n\\x00>0::&:D\\n*ZG\\n,;;::'00&::M>0ZD\\n:E\\n:9;>8\\n\\x00>0::D\\n&:::E\\n$3'00%::M>0ZD\\n:E\\n:9;>9\\x00\\x00@%2;;5\\x00$L>0\\n\\x00>05\\x00$L:E\\n-&0:E\\ni& :>:E\\n>>:\\x00\\x00#^>0?\\n?0>0:&:>6E\\n>\\x00\\x00\\x002I)\\x00G\\n 1ID\\n,)D\\n, &E\\n	>7E\\n;>\\x00\\x00\\x00\\x00\\x00\\x00\\x00!=$ú	&\\n7=0F\\r:$ý$a&\\n7\\x00\\x00\\n\\x00#\\x00*\\x00\\x00\\\"\\n>0#\\x00\\n*8?:E\\n5&#>$\\x00\\x00\\x00ā&+<$ù1<$Ă&\\n>5E\\n5E\\n*\\n=\\n\\x00>0$¶>0$ą>0$þ>0\\x00$ć-$Ą-:->0=$¨>0=$ü>0	=$ă>0\\n$ÿ>0$Ď>0:==\\n=F\\n.==0D\\n;\\nT9;\\n\\x00\\r&E\\n5E\\n*:	:	G\\n3:9;1:\\n:\\nG\\n3:9;&E\\n5E\\nQ*%\\r0:&\\n>5E\\n5E\\n*\\r\\x00ƀ=2	>0:&\\n>E\\n=<2	>0:&\\n>E\\n===$Ē>0::2&\\n>E\\n==$U>0:2&\\n>E\\n;=:D\\n >0:D\\n%$°5$@9;>0	:	:	\\n$]E\\n[&2:_>0:2>0:&\\n>E\\n7=$ĈԴ5$@>0\\n<0F7:\\n\\x00>\\n8	:\\nD\\n:9;<:C\\nU&\\n>E\\n)=\\n\\x00>0:2D\\n&,<D\\n=D\\n2:9;&\\n>E\\n<=0:0&\\n>ňE\\nk=&7QB\\n]22\\\";&E\\n=7QB\\n]28\\n@2\\\";>0:&XD\\n:_&E\\n}=7$Đ5$@>0:G\\nD\\n	:D\\n:G\\nD\\n,,;9;=&E\\n=7©2D\\n%$č9;=&2D\\n%$°5$@9;>0::\\n$]E\\n[D&E\\ny=72D\\n%$ė5$@9;>0::\\n$]E\\naD&E\\nW=72D\\n%$ď5$@9;>0::\\n$]E\\nD&E\\n&=77\\x00\\x00\\x00\\x00\\x00)\\x00>0$ĕ:_7\\x00\\x00\\x00\\x00\\x00D>0>0)\\x00g>0$²>0:D\\n::\\rG:::;;\\n :_>0:=7\\x00%[7\\x00\\x00/<G\\n	$đ9;&7$ē>0$ċ>0=:	1<:	7\\x00\\x00Y=$ĉ&I=$=&7=$D\\n,,;>0D\\n\\x00:$Č\\\";E\\n!D\\n\\x00:$Ĕ\\\";E\\n!&77\\x00\\x00=$Ė	>0=$Ċ	>0:1:7\\x00\\x0042;&7$ĞԴ5$@>0=:E\\n7B\\n>;2;&E\\nx=7\\x00\\x00N2;&#\\x002<	&==$³>0XG\\n.XG\\n.:9;&\\n>;E\\n5E\\n*E\\n%=\\x00\\x00	$Ġ$Ig7\\x00\\x00%>0$Ĝ$Ig>0:&7=D\\nI!=4E=4E$ģ\\r&7<D\\nI!\\r<$ªD\\n\\r&<$ª$ĘK\\\";>0:4H1$Ě:_&7=$À$Á$@D\\n=$ÀQ9;==7\\x00\\x00n$ę>0D\\n\\x00:D\\n\\\";>0\\n\\x00>0\\n\\x00>0::D\\n&=::D\\n	&00&=$U>0::D\\n	:\\n:$»$ě	7\\x00\\x00Q%LLL=$ħ&7D\\n\\x00=$ĝQ;\\n>\\\";E\\n &7=$¾D\\n7	=$¾$ĥ$ğ	&7\\x00\\x00\\x00î%ééé\\r<D\\n	$_9;>0:$cԱ9;>0:$rv>;:$ĢQ9;D\\n1\\n\\x00 >0:$iԵ>;:$\\n\\x00\\n\\x00\\n\\nb;:$\\n\\x00\\n\\x00\\n\\nI;>0$Ĥ:0 >0$Ĳ>0D\\n\\x00:D\\n\\\";>0	\\n\\x00>0\\n\\n\\x00>0::	D\\n&6:\\x00:	:>0:\\x00:	:\\n\\x00>;:\\x00:	:\\n\\x00	&:\\x00:	::>;0\\n0C:::\\n:	D\\n	7_Q>0\\n\\x00>0:#\\x00$mD\\n&A#\\x00$m:\\n\\x00	&\\nG\\n->0#\\x00$m:E\\n2	&$Ħ>0$ġ>0:'00R:7\\x00\\x00\\x00\\x00Ā%ûûûID\\n<ID\\n<D\\n4>.>ID\\n<D\\n4)\\x00>;<D\\n	D\\n:;:QhID\\n<D\\n4ID\\n<4>>;ID\\n<.>c:Q>0D\\n\\x00:$ĩ\\\";E\\n 1D\\n\\x00:$Ĵ\\\";E\\n &7QD\\nG&Z=$Ä&RQD\\nG=$ÄD\\n<9;>0:&6:$¼G\\nQ>0:$ķG\\nQ>0:$ı	1:$ĳ	&7\\x00\\x00\\x00*%:EՀ>0:&\\n:$Ĭ>:\\x00:\\n\\x00:\\n\\\".>7\\x00\\x00\\nƥ&>0%<$ÅA\\r<$ÅD\\n=>0>0D\\n\\x00<D\\n\\\";>0:$Â>+Ո:D\\n$Ķ>;<D\\n\\n&6D\\n\\x00<D\\n\\n:;=$ÂD\\nI\\r>06D\\n\\x00<D\\n\\n:;>0D\\n\\x00<G\\n\\\";>0:$ĭ>+Ո:G\\nJD\\n>;:D\\nD\\n>;D\\n\\x00<G\\n\\\";>0:D\\n$n>;:$ĵ>+ՈD\\n\\x00<G\\n\\\";>0	:	$Æ>+Ո:	D\\n\\\"D\\n>;:	D\\nՈ>;D\\n\\x00::;D\\n\\x00::;D\\n\\x00::	;:D\\n:!>0:1	:$n:!>0:1:EՈ:	!>0:1	:$Æ:	!>0:1:1:&E\\n5$İ*\\x00\\x00i\\n\\x00>09\\nE5$[>0D\\n\\x009\\n&D\\n\\\";>0\\n\\x00>0::D\\n&:::A &\\n:V00'$²[_&\\nE\\nV0:7\\x00\\x00=$U>0:$¹>0$>0$>0:D\\n &:D\\n $P>0:&:>1=D\\nRD\\n,,;D\\n>2::_&::>4::_&::>4\\x00\\\">3\\x00\\x00Џ=$U>0:D\\n >0:$ĨA &Â$Ç$\\nE\\nC$\\nE\\nI$\\n=$Į	&E\\n3D\\n\\x00:G\\n_\\\";E\\n!&	$¿3t=$į	&E\\n3^=$Ī	&E\\n;3H=$ī	&\\n35=$ņ	1,D\\n\\x00:$Ĺ\\\";E\\n!&E\\nX3	E\\n-3>0:E\\n\\rD&3$ł:*:E\\n\\nD& =G\\n\\\\==$º1=$¸&\\n>0=$Ń	=$Ň&E\\nkE\\n=*=G\\n\\\\=&\\n>0:$Ľ&ƆE\\nt\\n*8?=$ĸ	&E\\n03²D\\n\\x00:$ŀ\\\";E\\n &E\\n\\x003D\\n\\x00:$ń\\\";E\\n &E\\n=3p=$\\r=$D\\n7	\\n$ĺ=$_1,D\\n\\x00:$Ł\\\";E\\n!&E\\n5E\\nm*'=$ľ1	=$Ŀ&E\\n3\\n3=$q=$q$ļ=&=$q$Ņ=&=$½A =D\\n^$½A =$Ļ==$Ŗ=&E\\n3W=$Ã=$Ō=&D=D\\n_$ŋ=$ő=&+=D\\n_$Ŋ=D\\n_$Ő&\\r\\n>5$ŕ=$Í<D\\n=D\\nM_&E\\nhE\\n*=$œ	&E\\n3=$ō	&E\\n;3y=$ŉ	&E\\n3cD\\n\\x00:G\\n_\\\";E\\n!&	$¿3B=$q\\r=$q$ň	&E\\nv3 =$Ô\\r=$Ô$Ŏ	&	E\\n3=$¡>0::$Ï&E\\nIE\\n-*:$~\\n:$~$Ó&E\\nE\\nV*=;\\n]A &$Ç$\\n8;&$Ŕ$\\n\\x00\\x00˃=$U>0:D\\n >0=$ŗ	&E\\n5E\\n|*ʔ=$ŏ	&E\\n5E\\n4*ɹ=$Œ	&E\\n5E\\n9*ɞ=$ţ&E\\n5E\\nw*Ƀ&E\\n5E\\n7*ȭ=$ś	&=$Ŝ&E\\n5E\\n@*Ȉ &E\\n5E\\nN*ǲ25&E\\n5E\\n*ǝ=$Ã=$Ţ=&E\\n5E\\n(*Ƽ=$ř1=$Š&E\\n5$Ì*ƞ$ş$@D\\n:9;1	:$¼7	&E\\n5E\\nY*Ų$Ř$@D\\n:9;&E\\n5$Ť*œ,&E\\n5E\\n*Ľ*&E\\n5E\\n#*ħ+&E\\n5$É*ē=$Ŧ=$ŧ=$Ś&E\\n5E\\n8*ë=$ŝ&E\\n5$Ş*Ò$ť=_&E\\n5$Ð*¼&E\\n5E\\n$*¦&E\\n5$š*&E\\n5$Ê*~/&E\\n5E\\na*h&E\\n5E\\n*R&E\\n5E\\nB*<&E\\n5E\\n)*&&E\\n5$ŵ*&E\\n5$ũ*\\x00\\x00\\x00%$%)\\x003-\\x00#\\x00&E\\no$\\n\\x00\\x00E\\n5#\\x00*E\\n3$\\x00\\x00	Ȧ\\n>0\\n\\x00>0:#\\x00D\\n&ȏ#\\x00:>0;\\n:D\\n\\\"\\r&ª:D\\n8D\\nJ=1:D\\n8D\\nJG\\n:=&ǈ:D\\n8D\\nJG\\n:,;D\\n\\n\\r:>\\n>$Ũ\\r&E\\nz3'G:>\\n>$Á\\r:D\\n8;\\n5:\\n$@D\\n:D\\n8;\\n59;&\\nE\\n+3'ňB\\nB:D\\n\\\"\\r&ĸ\\n\\x00>0::;\\nMD\\n&Ġ:;\\nM:>0::D\\n\\r&Ā:D\\nJ=1:D\\nJG\\n:=&â:D\\nJG\\n:,;>0:G\\n\\r&4:D\\nD\\nM9;>0:T\\n6$@D\\n:9;&\\nE\\n+3':D\\n#\\r&w<D\\n=D\\n$Ŷ9;G\\n-\\r&\\nE\\n3':$n:$nD\\nE\\n&5:\\n_$@D\\n:$n9;1?\\n$@D\\n:$n9;&$É3':8\\n\\r&$Ê3'0ĳ0Ȝ\\x00\\x00\\n¯=$Ų>0=$ű>0=$¨>0=$ų>0:	:D\\n\\r>0:	:D\\n\\r>0:::==&E\\n5E\\nz*:==&I2(50>0>0	:	;\\n>;:	B\\nB>;:	:\\nI>;::\\n;<D\\n=1<D\\n\\n:	;\\x00\\x00C=$ů>0:	:$ū	>0:=D\\nD\\n,,;D\\n$Ű9;\\n>0:1:7\\x00\\x00QT\\n0>0=$ŭA!	=$ŴA!	=$ŬA!=;\\n?=;\\n?D\\n,,;D\\n$Ū9;\\n>0%...=D\\n!\\\"D\\n4=D\\n9;D\\n$ŷ9;E\\n>0:1:7\\x00\\x00:%333&-$Ů$Ig>0$Ž$Ig>0$Ƈ$Ig>0:=::77\\x00\\x00\\x00ē)\\x00>0)>0%āĄĄ=$U>0=$Ò:$Ë$ſ$@D\\n:$Ë9;=&=$Ò=$Ż\\n::b;½$Í<D\\n=D\\nM_&/=G\\n\\\\D\\nG\\n9;>0:G\\n:>;:G\\nF:>;z=$¡\\n=$¡$Ï&C%9<<=D\\nED\\n&0$=D\\nE\\n>+¨=D\\nE>\\nG\\nH;00#=G\\n\\\\==$º1=$¸&000\\x003^\\x00\\x00\\x003^\\x00\\x00\\x00\\x00,E\\n%&\\\"=$·5\\x00;>0:D\\n0)\\x00>;:D\\n5$ƀ>;\\x00E\\n5E\\na*E\\n3$\\x00\\x00m=0Fe=:D\\n\\r=:D\\nE\\n	=:D\\n=:D\\nD\\nE\\n\\n	&D\\n\\x00=:Q$Ƃ\\\";E\\n &77\\x00\\x00\\x00\\x00#\\x00E\\n?$\\n?I\\n\\x00?O:?J:?T.(E\\nG=&\\x00\\x00!E\\nG=&#\\x00(h*$O#\\x00(i*$M#\\x00(j*$\\x00\\x00­E\\n($R>0:&bbD\\nC&bD\\nC:9;1\\x00>0D\\n':D\\n$^1\\x00>0XG\\n.:9;=1:D\\n\\n\\x00\\r&:D\\n5$X>8f\\n\\x00>0::D\\n&)(f:::\\n\\x00<Ո::\\nG\\n15$@<Ĵ>;06\\x00\\x00«$Ì$R>0:&bbD\\nC&bD\\nC:9;1\\x00>0D\\n':D\\n$^1\\x00>0XG\\n.:9;=1:D\\n\\n\\x00\\r&:D\\n5$X>8g\\n\\x00>0::D\\n&)(g:::\\n\\x00<Ո::\\nG\\n15$@<Ĵ>;06\\x00\\x00\\x00\\x00E\\nG=&7(f=1(g=&7#\\x00	#\\x00D\\n9	&`%#\\x00$ƅ>\\x00#\\x00D\\nE\\nW&#\\x00D\\nA\\n\\x00E\\nW\\\";>\\x00#\\x0001#\\x000&\\\"E\\n;3$E\\n\\rC\\nO*8E\\n=&77M\\n\\x00>0:(fD\\n&9(f:B\\nD\\nV#\\x009;>0:&\\n>8h(f:EՈ>8i:\\n\\x00>8j70F7\\x00\\x00P\\n\\x00>0:(gD\\n&<(g:B\\nD\\nV#\\x009;>0:&E\\n>8h(g:EՈ>8i:\\n\\x00>8j70I7\\x00\\x00\\x00	#&#\\x00$\\n\\x00\\x00\\x00¨(l&>8l:\\n\\x00*$\\\\[5\\x00$[>0:&:;\\n >0:=&:D\\n,,;>0D\\n\\x00:Չ\\\";>0:G\\n,;>0:Q	:D\\n\\n\\x00&:G\\n,;>0D\\n\\x00:?\\n\\\";E\\n 1\\n:T\\n$$a1:V\\n>	&7>8l\\x00\\x00\\x00n=G\\n*G\\n>=G\\n*G\\n,;E\\n9;>0#\\x00D\\n6$f$Ź9;>\\x00\\n\\x00>0:#\\x00D\\n&\\r#\\x00::W;0E\\n8@*8?#\\x00::>;#\\x007\\x00\\x00\\nć#\\x00D\\n3\\n\\x009;>0:D\\nE\\n\\\"&:G\\n,;>0\\n\\x00>0:D\\n>0::&:0H:W;:D\\nE\\n=>0$f:D\\n3:9;$ź\\n\\x00>0:(m&:>8m:D\\n3\\n\\x00:\\\";>0:E/á&:7<$żG\\n	&:7=$Ƅ$Ɓ9;>0::M$Ÿ$$2$>0	:D\\n>0\\n\\x00>0::&:::	:0Hf>;E\\n:	*8?:7\\x00\\x00\\x000\\n\\x00>0$Ɔ>00#\\x00E\\n?$\\n?I\\n\\x00?O:?J:?F:?T.(\\r\\x00\\x00\\x00\\x00»2=&E\\n4$R>0E\\nw$R>04:D\\n,,;$P>0\\n\\x00>0ID\\n<D\\n,D\\n4$ƃ9;>0:D\\nE\\n:M$]>0:D\\nA:::\\\";$P>0::qE\\n*>E\\n8@*8?E\\n=2*8?#\\x00\\n*$M#\\x00(m*$M#\\x002*$s#\\x002*$s\\x00\\x007EՎ>0:\\nE/Ú1:\\nE/\\r=1E\\n\\n&\\n\\n*8?\\x00\\x00$`D\\n;F\\n$a=&\\nx>$=<>$x\\x00\\x00=D\\nR$ž9;>021:>\\x00\\x00k\\x00\\x00!5\\x00$L>021\\r5\\x00$L:E\\n:>\\x00\\x00	\\x0075\\x00$L>0:>0:>0\\n\\x00>0%\\n\\x003021\\r5\\x00$L:E\\n>\\x00`)\\x00G\\nF\\n>V\\n	$p#\\x00D\\n\\\";23g5\\x00$L>22E\\n:>2>2&\\n\\x00>\\x00#\\x00E\\n&\\x00R3\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00.\\nE\\n$N\\r&!2E\\nH*$Y2	E/Ü*$Y2\\nE/ç*$Y\\x00\\x00q\\nE\\n$N\\r&d\\x00;\\n-B\\n-G\\n]-G\\nY-B\\nJ-B\\nN-;\\n%-G\\n-G\\n->\\n$->0\\n\\x00>0::D\\n&<::2	$S0\\x00\\x00\\x00 \\nE\\n5&\\x00\\n-\\n\\x00-\\n\\x00->00HC\\nF5$@>02D\\n,,;>0:D\\n:9;>0:&2\\n;N>0\\n2\\n\\x00;N>0:7\\x00\\x00#\\x00=15&#\\x007\\x00\\x00i\\n\\x00>02D\\n>0::&Q$E\\n\\\">0:$0>02:>02D\\n*:;2D\\n>02D\\nE/å&23$Ɛ0X\\x00\\x00\\x00\\nE\\n@$N\\r&2E/Þ*$Y\\x00\\x00\\x00y)\\x00>\\x002-2-2-->0$D\\n	\\rE\\nA=&:D\\n*=;\\n;\\x00>0\\n\\x00>0::D\\n&::>0:::D\\n,,;$P>;0p,\\x00E%@@@\\n\\x00>0:2D\\n&-2:>0:D\\n,,;$P>02:: &>0p;\\x00\\x00\\x00)\\x00>$\\x00\\x00(2&$>21	)\\x00\\n\\x00$\\\\==>\\x00\\nA@>\\x00\\x00K\\nE\\n@$N\\r&>^=D\\nR*I=;\\n<*2&A\\r1E\\n&2\\n\\x00*$\\\\\\x00\\x00\\n<>$=x>$<\\x00\\x00I%DDD\\\"D\\n4#\\x009;>0$Ǝ5$@>0#\\x00D\\n 1:D\\n:9;=1#A!#\\x00# &>\\x00\\x00\\x00\\nE\\n@$N\\r&)\\x007\\x00$$6\\x00>0:E\\nA&2\\n\\x00*$\\\\$7\\x00\\x00\\x00	\\x00+>0Q>0#\\x00E\\n?$\\n?I\\n\\x00?O:?J:?F:?T.(\\x00\\x00\\x00\\x00\\x002D\\n\\n\\x00&#\\x002*$\\x00\\x00}E\\n$R1Q>0:D\\n\\n\\x00\\r&%[[[:D\\nD\\n9;>0\\n\\x00>0::D\\n&8::D\\nD\\n9;>0:D\\nE\\n	&2:\\n\\x00:\\n>;0E\\x00\\x00Y\\x00>020F#2:8:>0:D\\n*G\\n:Ղ:;:D\\n\\n\\x00&D\\n:D\\nD\\n9;G\\n>\\x00\\x00\\x00\\x00#\\x00\\n\\x00?$\\n?I\\n\\x00?O:?J:?F:?T.(<;\\n&$K>B\\n)$K>;\\nP$K>B\\n@$K>;\\n$K>\\x00\\x002\\n\\x00*$\\\\\\x00\\x00\\n\\x00>0#\\x00D\\n>0#\\x00:*$O2&\\r\\n0#\\x002*$e2&E\\n0#\\x002*$e2&E\\n=0#\\x002*$e2&E\\n0#\\x002*$e2&E\\n70#\\x002*$e#\\x00::>;\\x00\\x00±2=&\\n2=&>E\\nB\\n)2$H2=&>E\\n;\\nP2$H2=1	;\\n/$K=&>E\\n;\\n&2$H2=1	;\\n/$K=&>E\\n;\\n2$H22&E\\n;\\n/\\n$H\\x00\\x00E\\n&~2&27\\x00>\\x00$´-$ƈ-$Ƌ-$Ɩ-$ƒ-$Ɗ-$ƕ-$ƌ-$Ɠ-$ƍ-$Ɨ-$Ɣ-$Ɖ->0\\n\\x00>0::D\\n&\\\"%::J$g2D\\n*::;0/27\\x00\\x00.#=&C\\n>#\\x00&#\\x00$l>E\\nB\\n@2$H77\\x00\\x00č%ĈĈĈ5\\x00$X>0$Ə>0:$ƑD\\nD\\nF9;>0<D\\n	G\\n9;>0:D\\nM;\\n6G\\n>;:D\\nL$ƚ>;<D\\n\\nD\\n[:;:>\\n\\n\\x00>0:;\\n>0:;\\n+>0\\n\\x00>0	:	:D\\n&A:D\\nMV\\n::	>;::;\\n!1::;\\n+!&:D\\n*::	;0	pND\\n\\x00:D\\nF\\\";Ս>0\\n<D\\n\\nG\\n:;:\\n7\\x00\\x000>E\\n;\\n&2$H>E\\n;\\n2$H\\x00\\x00\\n\\x00Ň=?\\n/2>;&§<D\\n	G\\n9;>0:D\\nL$ƙ>;<D\\n\\nD\\n[:;<G\\n	W\\n19;>0:;\\n&K\\x00>0\\n>0::;\\nT\\nL&:D\\n*:;\\n:9;;0,D\\n\\x00:D\\n\\\";Յ*<D\\n\\nG\\n:;8;&<D\\n	G\\n9;>0E\\n\\\"$R>0:D\\n\\rՈ>\\n%;:D\\nL>\\n^(PV\\n::(ND\\nP(P;\\n7>;<D\\n\\nD\\n[:;\\n\\x00>0>0=G\\n0)\\x00E\\nJ\\\";>0	\\x00\\x00¢%>>><G\\n	(P9;>0::B\\n	D\\n	&:B\\n	?\\n\\\\9;B\\n	>21	2E\\n\\n&K$D\\n\\x00=2	;<G\\n	>\\n%9;&<D\\n\\nG\\n2;2&	=G\\n,)\\x00E\\nJ;\\x00\\n&	\\x00\\x00Ï%ÊÊÊ<D\\n	$_9;>0::$c&¯:D\\n1E\\n>;:D\\n$Ð>;:$cԱ9;>0D\\nZ>0:$rv>;:>\\nRV\\n,>;:$i9\\nZ>;:$\\n\\x00\\n\\x00E\\n:E\\n|b;:$i8\\n7>;:$:E\\n-E\\n;n;:$i8\\n=>;:$:E\\n\\\"E\\nn;:$y,;$l7\\x00\\x00\\x00̂%,--<D\\n	$_9;>0:$cV\\n9;1:$cF\\nO9;>0%ʷʷʷ\\x00>0:\\n>0:\\nW>0	:9\\n\\x00,;>0\\n:8\\n:B\\n_:\\n;=?\\nW\\x00E/Ø-E/â-\\n\\x00-E/Ù-E/ä-\\n\\x00-\\n\\x00-E/æ-\\n\\x00-5;>0:8\\nJ:B\\n_::?\\n%n;:\\n>\\n=E\\n->;:\\nB\\nVE\\n->;:W\\n%,;>0:>\\n\\r:B\\n=9;>0\\r:B\\n!:\\r:;:B\\n:\\r;:>\\n\\r:>\\n9;>0:B\\n!::	;:B\\n:;:>\\n::\\r;:>\\n::;:9\\n1:;:8\\n<:;:>\\n:F\\n:W\\n3\\\";>;:;\\nB::\\nY:?\\n1\\\";>;:?\\n=:?\\nG;:T\\n\\r:>\\n:\\n>\\n=:C\\n\\n=\\n\\x00\\n\\x00];:8\\n:;\\nB\\n\\nn;:F\\n\\r:W\\nB\\n\\x00:\\nB\\nVn;:$_K!&:D\\n*:$_$y,;;0:30:B\\nT&µ\\x00:B\\n=-:>\\n->0\\x00:?\\nC-:V\\nT-:C\\n--:F\\n1-:F\\n-:>\\n0->0\\n\\x00>0::D\\n&S\\n\\x00>0::D\\n&<:B\\nT::::\\\";>0:D\\n*::\\n4:9\\n9::\\nn;0I0`D\\n\\x00:D\\n\\\";$l7_#\\x000FY%D\\n\\x00:9;:	&I#\\x00:D\\n9\\r&;2>\\nG#\\x00:9;>0:A!&\\\":D\\n	:E/ãD=&2D\\n*:;\\x00\\x00M2F\\n@,;>0\\n\\x00>0::D\\n&.::>02V\\n;:9;>02D\\n*:;:30;\\x00\\x00\\x00ì=V\\nC\\n35\\x00;C\\n&,;>0\\x00:B\\nHA &\\n:B\\nHQ-:B\\n4A &\\n:B\\n4Q-:B\\n&A &\\n:B\\n&Q-:B\\nA &\\n:B\\nQ-:B\\nDA &\\n:B\\nDQ-:B\\nA &\\n:B\\nQ-:B\\nA &\\n:B\\nQ-:B\\n<A &\\n:B\\n<Q-7\\x00\\x00\\x00в\\x00>0=$U>0:D\\n*:$Ɲ;:D\\n*:$Ƨ;:D\\n*:$Ơ;:D\\n*:$¹;:D\\n*:$ƞ;:D\\n*:$ƥ;:D\\n*:$ơ;)\\x00g>0:D\\n*:;:D\\n*;)g>0:D\\n*:;%\\n\\r>0	Q>0	:D\\n*:	;\\x00>0T\\n>0<D\\n	;\\n49;>0\\r:\\r:\\rG\\nP:\\rG\\nP$o&?:D\\nG\\n89;>0\\n\\x00>0::D\\n&:D\\n*:\\rG\\nP::9;;0):D\\n*:;\\x00>0:\\nG>0<D\\n	G\\n29;>0::G\\nP:G\\nP$o&?:D\\nG\\n89;>0\\n\\x00>0::D\\n&:D\\n*:G\\nP::9;;0):D\\n*:;=G\\nD=G\\nD$o&œ\\x00>0>\\n	D\\nG\\n89;>0\\n\\x00>0::D\\n&<:D\\n*=G\\nD8\\nOԲ:: &\\nՁ::QԹ9;;\\n2;0I:D\\n*:;\\x00>0F\\nMD\\nG\\n89;>0\\n\\x00>0::D\\n&<:D\\n*=G\\nD?\\nԲ:: &\\nՁ::QԹ9;;\\n2;0I:D\\n*:;\\x00>0?\\n$D\\nG\\n89;>0\\n\\x00>0::D\\n&<:D\\n*=G\\nDW\\n*Բ:: &\\nՁ::QԹ9;;\\n2;0I:D\\n*:;2&:D\\n*2$w;)g>0:D\\n*:;2&:D\\n*2$w;2&:D\\n*2$w;)g>0:D\\n*:;:D\\n*$¶:_;:$1:$Ƥ1=$==>0:D\\n*:;:D\\n*$Ƙ:_;$Ɵ>0D\\n\\x00:D\\n\\\";>0\\n\\x00>0::D\\n&:D\\n*::0&\\n\\n\\x00;0+D\\n\\x00:D\\n\\\";$l7$%#\\x00#1##\\x00_1#\\x00G\\n3#9;77\\x00\\x00\\\\D\\n\\x00#\\x00D\\n@\\\";>0=>0\\n\\x00>0::D\\n\\n&:::>0:=&70p*:::D\\n\\n7\\x00\\x00\\r%#\\x00#7K7\\x00\\x00w\\x00>02>\\nI>0:&`\\n\\x00>0::D\\n&N::>0D\\n\\x00\\x00:D\\n-:;\\n$-:C\\n1-:F\\n-D\\n\\\";>0:D\\n*:;0[:7\\x00\\x00g\\x00>02$­>0:&R\\n\\x00>0::D\\n&@::>0:D\\n*D\\n\\x00\\x00:D\\n\\\"-:8\\nX-:;\\n$-D\\n\\\";;0M:7\\x00\\x00l\\n\\x00>02$D\\nI &2$>02$D\\nI &\\n2$>0%<8\\nAV\\n/;>0>0W\\n==_>0\\x00:-:-:-7\\x00\\x00\\x00>0%LL:\\nQ3$^:D\\n*:B\\n;;:D\\n*:9\\n8;:D\\n*:;\\n$;:D\\n*?\\n\\x00:_;%'888\\nE>0E\\n-f&V\\nA:>0=$:J;:D\\n*:B\\n;;:7\\x00\\x00Ƕ2=&Q7\\x00>0=$ƛ>0:D\\n*::$k;=$ƣ>0:D\\n*::$k;=$Ƣ>0:D\\n*::$k;=$Ɯ>0:D\\n*::$k;=$Ʀ>0:D\\n*::$k;=$ƨ>0:D\\n*::$k;:D\\n*=;\\nH;=$U>0	:D\\n*:	D\\n ;:D\\n*:	$~\\n:	$~$Ó;:D\\n*:	$Ñ\\r:	$ÑD\\n,,;;:D\\n*:	$×\\r:	$×D\\n,,;;:D\\n*:	$»;=;\\n>0\\n:D\\n*:\\nB\\n3;:D\\n*:\\n;\\nZ;:D\\n*:\\nB\\n;:D\\n*:\\nB\\n1;:D\\n*:\\nB\\n#;:D\\n*:\\nD\\n;:D\\n*:\\nD\\n1;:D\\n*:\\n>\\n;2:D\\nD\\n9;$l>27\\x00\\x00\\x00	\\x00!#\\x00E\\n.?$\\n?IE\\nc?O:?J:?T.(=&G\\n?$K>\\x00\\x00P&\\n\\x00>0#\\x00D\\n>0#\\x00:*$O2&\\r\\n0#\\x002*$>0:&E\\n0#\\x00:*$#\\x00::>;\\x00\\x00=;\\nW\\nQ#\\x00n;\\x00\\x00*=B\\n\\\\&\\r=B\\n\\\\>0%F\\n$^>0:7\\x00\\x00/Q>0%\\\"\\\"\\\"=B\\n,&\\r=B\\n,>0F\\n&$^>0:7\\x00\\x00\\x00pG\\n?$K>2=&E\\np$R>2&\\r\\nG\\n?2$H%>0:&:>\\nG\\n?:$H=>\\n?)\\x00>;=>\\n&	=>\\n?Z;\\x00\\x00P=;\\n&=>\\nV\\n\\r>0>0\\n>0\\x00>0=;\\n)\\x00>;=9\\n)>;=T\\nE)>;)3\\x00Ä2=&9<D\\n	D\\nN9;>2D\\nMC\\n>F\\n>;<D\\n=D\\n[2;ՐH;\\n[5\\x00$LG\\nO,;>0>0::\\n!#\\x00>;:$m#>;:?\\n\\r:>;2:#>;2&2D\\n5V\\n=b;\\n:9;>;2D\\n*:;2D\\n59\\nC>;\\x00\\x00b;\\n29;>0\\x00>:7\\x00\\x002#\\x00>0:&#302#\\x00;c\\x00\\x00#\\x00>\\nG\\n?#\\x00$HE\\n3$\\x00\\x00\\x00\\x00%>0#\\x00E\\n?$\\n?IE\\n?O:?J:?T.(23\\x00\\x00=#\\x00D\\n*2E\\nu$R,;2E\\n|$R,;2E\\n$R,;2E\\n7$R,;b;\\x00\\x00\\x00#\\x00)\\x00>.#\\x00)>.\\n#\\x00)>.#\\x00)>.#\\x00)>. #\\x00)>.#\\x00)>.	#\\x00)>.#\\x00)>.#\\x00)	>.#\\x00)\\n>.\\r#\\x00)>.#\\x00)>.#\\x00)\\r>.#\\x00)>.#\\x00)>.#\\x00)>.#\\x00)>.#\\x00)>.#\\x00)>.$#\\x00E\\n&\\n7#\\x00\\n#\\x00E\\n7\\x00\\x00#\\x00E\\n&\\n7#\\x00#\\x00\\n7\\x00\\x00\\n\\x00>0\\n>0:#\\x00&\\n:'00p:7\\x00\\x00E\\n:>\\x00E\\n->0=K\\r&:7#\\x00:7\\x00\\x00<&\\n\\x00\\n7\\x00\\x00<D\\n	D\\n:9;&E\\nTE\\n'7\\x00\\x00=	=G\\nR=&E\\ng7E\\nn7\\x00\\x00U\\n>\\x00E\\n>E\\n->=$UD\\n D\\n9\\r&\\\"#\\x00#####E\\nE\\n=7#\\x00##7\\x00\\x00E\\n'E\\n(7\\x00\\x00E\\n\\\"E\\n-E\\n7\\x00\\x00E\\n\\rE\\n-M7\\x00\\x00E\\nE\\n=7\\x00\\x00E\\n;E\\n=\\n\\x007\\x00\\x00%E\\n:>\\x00E\\n->0=G\\nK\\r&:7#\\x00:7\\x00\\x00=D\\n^&E\\n'\\n7\\x00\\x00<D\\n	D\\n9;&E\\nTE\\n'7\\x00\\x00=	=9\\nR=&E\\ng7E\\nn7\\x00\\x00X\\n>\\x00E\\n>E\\n->=$UD\\n D\\n9\\r&%#\\x00#####E\\nE\\n=#\\x007#\\x00##7\\x00\\x00E\\n(>\\x00E\\n'>##\\x007\\x00\\x00 E\\n\\\"E\\n-E\\nE\\n:7\\x00\\x00E\\n\\rE\\n=M7\\x00\\x00E\\nE\\n\\\"7\\x00\\x00$E\\n;E\\n=\\n\\x00\\nE\\n27\\x00\\x00\\x00\\x00\\x00\\x00\",ĥĤĦħ̞͆Ĩĩ\x00ġĢģɓɔɕɖɗɘəɚɛɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣʤʥʦʧʨʩʪʫʬʭʮʯʰʱʲʳʴʵʶʷʸʹʺʻʼʽʾʿˀˁ˂˃˄˅ˆˇˈˉˊˋˌˍˎˏːˑ˒˓˔˕˖˗˘˙<í$î&ïͰðͳŌ͵ñˏòˑó˖ô˙õ˜ĀϖāϞĂǃĈǋĉǎĊŬČȗčͼĎ;ď΃Đxđ7ǃˉǄ¶ǆ¡ǘʲǙήǚʏǛnǜ͕ĩǂ3«ěü§³}\"\r	ģâ#tĤ#ÚtíġX#°ttYu#Ãt¼vñW'WÅġā#4t<YĚ#ËtDäġē#²ttYĦUW¢#&tß#Ąt=õyWP#¡tkV#đtûc#$tĀ#8tîÉW#¤tAo#¾t^#tGĘ#Mtg#5t7®#6tà:ġÔm#ttY\x00#¯tÁÞrW#ºtó+#×t]¥#ªtĨ´Ċts#ftI÷ġçô#ZttY·#Ĕtċ\\#òtëĥØWÿġåÒ#4tÀYÙ#tÌÈWÄT?ts¿#itąh#ħtĠ!W#,tN #dtj¬#tÂ#ătêÆ#0t#ÛtSď#¨t¹ìW/WWqġïE#4tY¸#tÍÕ#tĐ;(tsO#½tlÜġ»ğ#xttY%#nt ±#2t_#tĖ#ét9#ðtbã#ĉtzĂĕĈČ[č¦JėĞpHC)ĒþÓÐQ`@©ĝ*öèKĎĢ~Ça>BćÊ|ø¶­ę-µĜÎÑá{\nù1ÝýĆÖF£LRwúÏæe..Ņ2Ī\x00	\x00\n\x00\x00\x00\rȜ\n0ɔӗખ\r£\rô\r=	̐\r\n	׀	ࢁ	#\x00	ٮ		փ	ڛ	୪	#\x00	࠯		੻\n!	FɓШ\nīТಂȈĬ\x00	\x00\nʳ\nಠ\nЗ\nප	\n\n\nx\n̷	FȈĭ\x00	\x00\nʳ\nถ\nЗ\n౅	\n\n\nx\n̷\nʴ\nஏ\nĜ\nԍ	FȈĮ\x00	\x00\nТ	\n\nî\n๼	അ\nĘ\nڂɓШ	į(?Ī໾ɕࡈĬɞˡʗĮɢʱʑīɟࢿʗʑ	Īɠໟ\nʜɚӰɚɢʗĪɥ൥ʜʗĬɣ҈İʗɝũɠɞʜĬɟӎʗʜS2ĭɞໞ\rʢĭɝԩʟĬɥгʢʟʟĭɠŖʁɢ౹ɤड़ʟʁĭɣǜɸīɡȢʢɡ˳ɞআɸʢĪɡƦɸɞෙɤƴʟĬɤ؄ɸʟʑīɟãʁĮɥӕʑʁʟĪɠ๯ʢĬɢଙʟʢʜīɞઌʗɛ˺ɡথʜʗīɦڦıĬɟ֦y2ɷĬɡंʁĭɦۉɷʁʢĪɞҤʑĮɣџʢʑīɠҒĭɞːĬɡΫɸɣ¨ɟψʢĬɟݫɸʢĬɥĨīɣφĬɤˢ īɛȪ!ʜĬɡτʁĬɦΗʜʁ\"Ĭɣఇy2#īɞΩ$ʢĬɡȬʁɥಢɡߓʢʁĲʗɦࢤɥ޹ɸĬɟ̺ʗɸ%ĭɥࡅ&ʁĬɥ˧ʢĬɞʃʁʢ'ʗīɢȋʑĬɡԣʗʑ(Īɟ͠)Ĭɡͥ*īɦɲĳĮɢǻ+ĭɡɒĴĭɤו2,īɟѰ-īɡȪĵʁĬɢßɸɛӰɠଁʁɸ.ĭɦŰ/Ĭɡऀ0ĭɡѫ1ĭɦϐ2ʗĭɟͻʢĭɦȨʗʢ3ñĭɣӷ4ʟĪɢϣɷīɠ๨ʟɷ5ɷɝʮɡǢʗĪɦ෈ɷʗ6ʢĭɟȊʜĪɢݡʢʜSm27īɢŕ8ʑɜ͵ɦ˙ʁɛ˺ɟਥʑʁ9Ĭɣϕ:Ĭɠɲ;ĮɞƦ<ĮɝɅ=ɷĭɝȊʗĬɠಜɷʗ>īɡ˵?īɟŰĶñĮɟ҂@ʗĮɞӑɸīɣԶʗɸAīɠࣩy2Bʟĭɥ˞ʁĭɝݸʟʁCĪɣ˵DʟĭɝŖʗɟ͵ɞϤʟʗEʑĬɚˎʟəɛ̚ʑʟFʢĭɡŖɷɤɢ۠ʢɷķĬɦѪGīɥาHĬɟ҈IĬɞϕJīɤɒKĬɤɧLīɡષy2MĬɥ֐Nɷɤƈɠɡʟīɥ৹ɷʟOīɠɅPĬɠǻQĭɠ̄RĬɦǜĸɸəɤ༠ʢəɜ͓ɸʢSʢīɞ؋ʜɤճɥΟʢʜTīɢŰUʑĬɢ¯ʁĪɢཅʑʁVĬɦ૚Wĭɣ෵m2XīɥԂYɷĮɡʱʜĪɢઑɷʜZĭɢѪ[Įɢ੔\\ĭɝ̄]ɸɛ࢖ɠ̧ʜɥ֎ɣഎɸʜ^Ĭɤԡ_ĪɢҌ`ɷĭɞbʟĭɝࡀɷʟaīɟϐbīɦΫcīɤڴ2dĬɥ͹eʁĭɞѨɸɝܻəކʁɸfīɞɲgĪɣˀhĬɠφiĪɞҡjĮɠ༥kɷĬɣфʁĭɥຘɷʁlʟĬɞࡹʢɦିɣܱʟʢmʜīɦbʑɥςɤؖʜʑnɷĮɢǾɸĪɟʃɷɸoʟīɟ͔ɸɤ̶ɡ๘ʟɸS2pĭɢ॒qīɢɅrʟĪɣ˞ʑĭɢӎʟʑsĪɢӷtĭɠɕuʗəəИɷʗɢళʗɷvʗĬɡǩɷĬɦҿʗɷwīɠΩxʗīɢɛʢĭɦɓʗʢyĬɤԚzĭɟԳ{ʟĭɤƩʁĪɤɓʟʁSm2|Īɞˆ}ĮɥҌ~ĭɣଧĭɟǻīɥӖʗɣƈɡɋɷɤࡷɝ৔ʗɷĪɦ˗ĬɣҡĭɢԂīɣŰʁīɢȊɷɢےɡϤʁɷɸĭɢ̵ʢɥࢃɥోɸʢSm2ĹʑĮɢŖʗĮɞ੽ʑʗĪɞśĺʁīɠˎʜĭɟߤʁʜĮɤ௅ĬɦԫīɞγĮɥࢂĭɡېĬɠˆñĭɢൃīɣǻɷĪɟҤʜĪɥҿɷʜS2ɷɛςɥʨʗĭɞԣɷʗĬɤաīɠԙĻñĭɤ֙ʜĭɤbʁɜ³ɤ಑ʜʁĮɦˀĬɦːļĮɟඕʟɦॏɟǈɸĬɣгʟɸʗīɢृɸĮɢಊʗɸĽĮɣʘʗĬɝಎɷɤʣɞ݈ʗɷSm2Īɣ༗īɥȚʜĭɡˍʁĬɥܙʜʁĮɢҒĬɡϸ ĭɤǜ¡Ĭɝʖ¢ʟĭɣගʁĭɢڳʟʁ£ĭɢˢ¤ʟĬɞԻʑĬɝीʟʑ¥ĭɥˡľñĬɤ੎m2¦Ĭɤ˗§ĭɟԪ¨Ĭɞˢ©ʟĪɡԻʜɦ఼ɢࠋʟʜĿīɡ۬ŀʢɦȯɞÝʜīɠ̺ʢʜªĭɞ˗«ʁĪɝלʟɢ޶ɢХʁʟ¬Ĭɦ͠­īɥ̄Łñĭɟӆ®Įɥ๧U2¯īɤ˂łĪɥː°Īɥќ±īɢࢻ²Įɢś³ĮɥŰ´īɞԪµĮɞജŃĭɟऎ¶Īɠś·Īɢʘ¸ɸɡ࢚ɟ඄ʟɟʮɠࣙɸʟS2¹Įɦŕºĭɥӆ»Ĭɡʖ¼ʟĮɞԩʗĭɢӕʟʗ½ʟīɤƋʑĭɠȨʟʑńʑĬɚˎʟəɜ͓ʑʟ¾Ĭɡˡ¿ĭɟȪÀʢĮɡཁʟɠۣɟОʢʟŅīɟԡÁĮɢ˵ņʟĮɤÂɷəɣयʟɷjm2ÂʟɟଋɛǝʗĪɡџʟʗÃĬɣӵŇĭɠƦÄĬɦ˂ÅʟĭɣåɷɠƉɠ਍ʟɷÆĮɡձÇĭɣͥÈĭɢ͹ÉĮɤਸÊĬɠગËīɥӵÌʟĬɡ˞ʗĪɠಐʟʗS2ÍĭɡɧÎʗɝũɡ˒ɷɠૹɥХʗɷÏĭɞʘÐĬɣϸÑĬɤśÒĬɥԳÓɸĭɣϊʑəીɝρɸʑÔʢɥɶɝ˶ʁīɠԶʢʁÕĪɢȚÖĭɞ˂×ʢɦƈɠ\\ɸĭɤ݄ʢɸňʟĬɚƩʁĮɡؒʟʁj2ØĮɝ੗ŉʑəɛ̚ʑʑÙɸɞσɞ,ʁɟ௼ɦਚɸʁÚĮɠŕÛʜĭəיɸĮɤ׍ʜɸÜĭɡśÝīɟώÞʁĭɥϣʑɤȭɤΟʁʑßñīɟɧàīɞќáʑɜ³ɝ˶ɷĪɣɓʑɷâɸɣࡗɣฝʁɝࢇɤໜɸʁS2ãɷĬɢළʜĬɡஶɷʜäʗĭɝÂɸĭɦ໘ʗɸåʟɥෛɟ঵ʜɟσɡਕʟʜæʑĬɡ૒ɸɟ˺ɣЌʑɸŊɸĬɚࢄɸɸçĬɠӖèĭɤѫŋñīɢƥéĭɞˀêĪɝɕëĮɡȚìʟīɣ¯ʑɥ΂ɟρʟʑSǃ28ʣɚ1ǲɖܔōʈəືŎ%\x00ʈəԐƈəŒəډəʜɚƈɛืɮęɮ¨ŏ%\x00\x00	ʈəԐƈəŒəϘ	ɛ෠		ɺɚģ	ɚۥɺəŬ	ɚষəʜɚƈɛٞəƉ	ɮęɮ¨Ő%\x00ʋɚžə̵əŨɚԓɚƗö\x00	\x00\nə̡ɮÐəʋɚไ		ə+	R\n	Wƃ\n\x00eʀə\n\x00əӱő%\x00\x00	\x00\n		ɖŇ	R	N\n\nɖª\n-Ċੜɖ߱لॡ	ĿŒ\x00	\x00\n\x00ŉəŻƁPɮG¡OɮG¡őr	ௗɖ¥\nəʶ\nŵ	&	Qɖ৓ť	୫ɖࣇ	ɖ໫œ\x00\x00	\x00\nəܬəĂ\x00	\x00\n»୼\x00ɜ൯\x00	ØŔ\x00\x00	ɚݭɚɆ\x00	.ɦॹ\x00	ŕ\x00	\x00\n	əʶ\n\n	\nŌ\nேŖ\x00	N	=		Ź́2ŗ\x00		৉	$ɖԷ	ଖ	$ɖୣɖҷ	$ɖĠɖÏଢ଼	$ɖཐɖϱ	$ɖԞɖĚЎɖÏɖි	$ɖ੖ɖͽ	$ɖĭɖŭЎɖĚɖ೮ɖÏɖ݁ŘNə+Ōə`௫ɖ׸ř\x00\x00	\n\x00\n	ə+-\nڿəϙʙəĸɛÊɜͶɟɮfə\n\x00əǠəС\x00\x00	Ś\x00\x00	˻	ə಺लV	ยV	,	೾V	,	A	૑V	,	A	Z	ۢV	,	A	Z		ଜV	,	A	Z			ઞř\x00\x00	ś\x00	\x00\n\x00\x00ɮÐə\x00ɚഇəନN	£	ə+	R\n	W\nəțɖǞʀə\nyɖ ʈɜԕ\x00ɖԏɖ๾Cɖබ	ɽɚ̂Äʀə\n\x00ɖऍ	ɚֱ	чɮfəҾ÷ং\x00śĬ9?ɮ̭əŜ\x00	\x00\n\x00\x00\x00\rຯ	Ƈ\x00əϝ	əɖæ	ඬ\n	Ɣəáə΋\nə[\nఒəठ\nਭ\n́ఄŵ\nࢯƅ\n́Őӏ\nə^ද\nə^඼ɖ Ϟ\nəಖƅ\n́Ő\nə^ޑw\rɮfə\n\x00ə΋əז\r#əşŔ\rŝ8ʘəÁɜเŞ\x00	\x00\n\x00\x00əŏɖi	\nə[0ɔĬ	=\nూ	ɖŭ	ɖĚ	ɖ༯	ๆş\x00	\x00\n\x00\x00\x00\rə[	\nəມɖi\r0ɔĬ	=	ï\r\nQɖ±ɖ\\\r\nQɖɖ\\\r\nQɖɖ\\\r\n!$ɖѴ\rŠՎQɖ±ɖЅQɖɖЅQɖɖ\\$ɖനš4ŞDࡒȻ2Ţ%\x00ʋɣਃʋɟؽɮ<əL ɦ͕ୀţ\x00ঞə෪ɮ<əə͎ƽ	Ϣø%ʈɚ༽ɚ์ʈɚ̀ɚੂ͆«ʬŤ\x00	\x00\nƇ\x00ə಩	ɮɁə\x00əଠ	 ɖҼ\nɮɁə\x00ə٩\nɖĽ\n	X	ə௖ɮ<əʀə\x00	نťɉŤDŕ\x00ɮ໯	ϢŦʓŧŧ%\x00\x00	ʋɚžɚˍŮəɰ	Uə1əԏ		ِɮ¬ɮ¼ɖউƄ	\x00ɚߠƄ	\x00əؘų	\x00Ų׌࢙ŲŨ\x00( ɼմəըəਇࠄƂͱ7ʓŧ\rʓǯų\x00෧ũ%ƛɖಓįʨʨəಱʨəԋնʛəũəݼŪ\x00\x00	\n6ಪ\n0ʔь\nəĥe	໺֘	ޛū\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00əࣥ	ɚӧɚԯ	ũ\r\n	,	A	ࣧ\n\rŹƙʚlʚ`Ŧ\n\rWə૕ə+RŪ4\x00Lį௓;ೂ?ΏϾə+RWəʰɖผৰ`Ƿ݋0ʔьəĥluŪ4\x00Lį෉;ʲવ?}Ŭפūjӛ2ŭ\x00	լɮºɖ୞ū\n	૷	H	ɝઙ	ɢ܀ù΢ɮºɖऽɮȒɖ˃ŮқɖࠂCɖՕɖ൒CɖࣴůĴɖҺCɖԙŰ\x00	\x00\nɿəހŮअ		ə+	R\nɿə\x00	LŮ\nƠů\nɺɖ઱\nɺɖ़\nɺɖಧ\nશɖശ\n?ɮ<əɮĞəy	२ű\x00\x00	\n6 ɚҁ əڤʚ͌\nŰ	L\n\n ɚҁ\n ə࣯Ų%\x00\x00	\x00\nō\rɺ	ʏĤ	7ɚģ	ɚʿəŬ	ɚϲ\nԱəӟəëɚҲɖň\nɮె\nɚࡘ2əŒPŏ\r+əʜɳɛƒ\x00lɴ`	\x004\n\x00AɮՍ,ɜǵ7ࣕų\x00	\x00\n\x00\x00\x00\r\x00\x00\x00	p	2\x00	P	+		l	`	4	A	,ɮƐ	7œ	¨ɮƐ	Sɮܳƃ\x00ʊ	Dɖक़\nō\r\nʏĤƅ\nɺɚģɚʿ\nɺəŬɚϲɮŜPJ	SƼ\nʋəəƎʂ\x00ʂʂWʂʕɮŚƄʂɡݟ	DɖԮ	S\rɺW\rə؛	DɖЌ	૬ű\r\x00ɮ¥	2u	DɖԮ	SƷ\n־ōtəӟəëɚҲɖລƃ\x00ə݇ɵƸɮୡݻƄ\x00ɮĞə\x00əΡɮ¹ə˫ʒ	ɮ¹əಕʒ7©ʂ.ʂ+ƃ\x00ə࢝ʂ+4ƃ\x00əࣈʂ+4A\x00	SƼAʂ+Ƹ4Ä\n	ɺ	lɴʏɮВʏ்ɺɚģ	`ɚʿɺəŬ	`ɚૠ	`ʏɮ¹əɵ޾ʒ		4ɮūəʒ\x00ɵq	4ɵ	Aəދ	,ɜǵ	+ɮūə	\x00ɳ\x00	l\x00ʚ\x00	`\n	Pɮūə	+\x00	4\x00	A\x00	,\nɮūə\nɛ͜ʚ\x00\nɮūə	l\x00ʚ\x00	`༆ɮºɖ޻ƠŬ		7 \x00	¨Ŝ	4ॠŭ	Xť	4	Dɖӧ		Dɖਫ	D ɖǄ	D෶	Dɖ൪	Dɖੰə໖ə৐ə୘	,əହ	Ŵ(ʨʨɛװʨɛඞ½˚\x00˜ʔɤȠəƩ˜ނɚӄʞə\x00\x00	Äɚഌ	\x00	˜	ɿə࠙	ջɮĞəɜ঻	ə༐ɖɖɖࡌ˛\x00	\x00\n\x00਺අ˚ߖɰɽ.ɜ଱ɽज़?ɜ঍ʘə]\n\nΔɜࡔə+ག\n˛ȓəȭɮfə\n\x00əǠəາ	=ʤəɚాə\x00	\nə˚	ÄəƉ˛	॓əȯɮfə\n\x00əǠɚݑ˛ú௰ʦǖəǆɮ¼ɖƪʦ̌û\x008ɮϠɱชIצŵ8ʣɚčɱƷjп2Ŷ\x00	0ɔ\n	Ů	=	!ŵɖʃü˚8~˚ɖށ˚$ɖ۩ɖ߷˚}ŷ\x00	\x00\n\x00ذ	J	əЇ	ײ	ùְ	\x00\n		\n~ʣɚčɱƷɖ઒Ÿ8Żəగý%\x00NCɖ̣-ʲɖڵʳə+-ɿəʳ۽ʭoɖTʮ'ɖiʯǙ$ɖĭɖiʰ'ɖTʱǙ$ɖ̋ɖĐʲŹ\x00	\x00\n\x00\x00\x00\r\x00ŉəŻƁPʳ\x00\nə[	0ɔʣɚஓKɖ่ɖงəɖ൲\n=\r\nï	!\r'ɖȌ\nï	!ɇ\r$ɖ̋ɖ̥'ɖӦ\r\nï	!ɇ$ɖĭɖࣾ\r'ɖ੘	!\r$ɖƘ\nə๑\r\n	!\r'ɖȌ)\n	!ɇ\r$ɖ̋ɖ̥'ɖӦ ɼ		!ť$ɖĭɖાɮfə	Ҿź\x00	\x00\n\x00\x00\x00\r\x00\x00\x00Ãߨ඀ə࣮ə[	0ɔʣɚčKɖ༕ɖҳIɖ೜ŵ\nɿə\x00µɿə\x00µɿə\x00µ\rɿə\x00µ	!ʭ\nŀʮ	!ʯŀʰ	!ʱŀʲ\rg7\nɿə\x00µɿə\x00µ	!ʭ\nŀʮ7ɿə\x00\n	!ʯŀʰ௾	ŻźDžż\x00	\x00\n\x00\x00\x00\r	ə[\n0ɔ	ӗɿə৑ɖౕ\r£\r	ô\r=ɿə\x00\r\nEɖ૥ɖ໒#\x00Eɖģ¡ɖഈEɖ҇ɖؓ#\x00Eɖవ¡ɖ๢Eɖżɖ୦#\x00Eɖృ¡ɖܒ\n!Fɓəɱ\nŽ\x00	\x00\n\x00\x004ɿəəऱ		əѶ\n	\nɖ౿\n\nɖ܋\nɖ੐Ċ\n$ɖĠɖ˨	ɭɖȋ	Ő\nɖϑĊ\n$ɖĭɖՉ	ɭɖĠɖ˨	ɖӡɖȋ	#ɖк\nɖඹĊ\n$ɖ׏ɖ߮	ɭɖĠɖՉ	ɖӡɖĠɖ˨	ɖ༒ɖȋ	#ɖ֬\nɖࢹ\x00	#ɖ༹\nɖෟ\x00	#ɖੳ\x00	ćBɖ୏¡ɖ̫əs'ɖࡽɖݔņɖւɖૈəDž8ſŽØſ\x00\x00	\n\x00\x00Ζ	ɼ		ə࣪\n0ɔʝəŏɖత	IɖऋŮ=\n!ɓəɱə{\x00#ɖప		\n!ɓəɱə{\x00	ˏɮfə\nޱί2ƀ8ʄʌØƁ\x00	\x00\n	ƀ\n\nə[0ɔ\n\n\n¡ɖ̹	\n=	ɿə\x00	µ	ɿə\x00	µ	ɿə\x00	µ	ɿə\x00	Ԣ\n#ɖ̹	\n=	ɿə\x00	॔Ƃ8ʩ	ʩə.ʞə\x00ʔɠԯə௧ƃ\x008ɮĞəyəȰƄ\x00	Ã>്	ɮĞəyəݾɮ<ə	Áɮ<əƅ\x00ɤ>͛ʀə\x00əəȰƆ\x00ɤ>͛ɮ<əÁɮ<əƇ\x00		ɮlə\x00L	ɖӿ۝ʀəy	\nʀə\x00	ݏƈ\x00		ɮlə\x00L	ɖӿയʀəy	\nʀə\x00	ୖþ%˚\x00˛\x00˜˛\r˜p˝˛ɦoJ}࣊˜\n˚˜\nɮՄ	\x00ɮҨ\n~%ˠ\x00\x00	\x00\n\x00ˠ£ɖ̣-ˠəɯhÚÍˠəɯhɖĐɖ৸ˠəɯhɖȾ৏Nˠə+ŌhCˠŁhˠə^yˑˠəแˠə༙	ˠəđɖ \n	,	Aˠˠə{ɖ ®h\nhh\x00g\n\x00{܈ˠ؊˝\x00\x00	ට˝gɦoo஠}}Ѹ	\n˝{ɦoɔoً}}Ѹ		NįŁ}EɖʡŁoѥŁ}Iɖ˃˞\x00	\x00\n\x00\x00\x00\r\x00	4\nə[¶\r\r\n\rR\rĖ&o}༵o\x00#}ڪEɖֵ	əѥIɖ̒ڊɖ໮Iɖ̒¡ɖౄȡ	əsଳɖֲຽ˚'ˏ	˟\x00	\x00\n\x00\x00\x00\r\x00	4\n\x00ə[\r¶R\rਓɖ෽\r༺$\r	\n\n{\n\ng\x00\r࣭\nȱ	ə\n\n\nഖ		8˞\x00˜\n8˟˛\x00Ɖ\x00\x00	\n\x00\x00\x00\r\x00\n,A\rɖεɖ෡-\n&\nҎoɖƺ'ɖǟɖƾ	ť$ɖǕɖű&\rǳɖű&Ҏ\noɖƺ\n'ɖǟɖƾ\n	Ӭ'ɖκɖϴɖǕɖЙə\n\x00Ɗ\x00в˾,ͷؕݱ2Ƌ\x00	\x00\n\x00\x00\x00\r\x00\x00Ş\n	ʣɚčəŏɖå44\rɖ౫əȘɖåŞŶɖ̒ə়\n\n	\n-əŞə{\nKɖŘ\nKɖȯɖൊə{	Kɖঐ\n\n\r\n-ə\rəŞథ\n\nə+\n-ƉƊ\n\n\x00\nə{əɖ໲şƌ\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00	0ɔəɖå\nŞ\nŞ\n,Aəϖɖεɖʭxɖං\r\rɖક\r=&Ϫoɖƺ'ɖǟɖƾӬ'ɖκɖϴɖǕɖű&Iǳɖű&Ϫoɖƺ'ɖǟɖƾť$ɖǕɖЙ\x00\x00	\n'ɖ±ɖ\\	\n'ɖɖ\\	\n'ɖɖ\\	\nǳɖ\\	\n'ɖ±ɖ\\	\n'ɖɖ\\	\n'ɖɖ\\	\nǳɖ\\ïѿ	\nƚ	ə^\nI\x00D	ÿ%˚\x00˛˚Պ˛Պʴ~в˚\x00˛˖ƍ\x00\x00	\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\n\x00əȘɖࢰ\nɮǌPŞ\n\n¦ə[²əȏɖ๊ɖ੕-ƚņෘɖɵņɖনQɖӻɖš'ɖĆɖǡɖπ'ɖøɖǡɖƫ$ɖʎņƅoɖƫQɖšoɖþ̟'ɖъɖ।I҉N\r\rćا\r$ɖƞIɖƒCɖҢ\rɖǄ\r\r	ƔQɖ௔	ɀ'ɖĆɖԀ	Ð'ɖøɖԀ	К$ɖٕ\x00dƎ\x00\x00	\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\n¦	¦4ɖŇ-ť̟'ɖъɖهN\r਱\n\rg\rฉࠠ঩வoɖਣoɖ༪oɖi'ɖƫ$ɖ՛ɖೇ\n\r\x00\r\x00\rןɖŇ-\n҅N\r\rɖŇ\rR\n\r\r஀KɖڸKɖݞKɖо\rKɖɋҖɖоKɖ຺ɖ-U\roɖšQɖŘ	UoɖšQɖ܆ɖè-Uəȏ		Uə฽Ə\x00\x00	\x00\n\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00	˾,\r		ɖڭAѳZ	λɖԔəŏɖ้ɖTɖi੫\n,\nA\nZ\n\n͢-QɖǨ\r'ɖĆɖ'ɖøɖ$ɖ\rQɖǨ'ɖĆɖ'ɖøɖ$ɖxQɖǨ'ɖĆɖ'ɖøɖ\r$ɖɖȌQɖǨ'ɖĆɖ\r'ɖøɖ$ɖɖ༑#ɖi\x00\r\x00Nɖ-		ɖୁQɖӻɖš\r'ɖĆɖǡɖπ'ɖøɖǡɖƫ$ɖï\x00\r\x00\r\x00\x00FƐ\x00Վ˾ขͷີѳట୳ฃƑΦŵɖɗŵɖɗŵɖɗŵɖۅƒ\x00	\x00˚\x00˛\x00˜\x00	ʴ\r˚	,˛	৴˚໭˚୰Ǝ\x00˚\x00˛P˜ƍ\x00˚\x00˛½\n\x00	\x00\n\x00\x00\x00\r\x00\x00\x00	ʣɚčəŏɖځ4\rɖٜəȘɖɖ	Ƒńəȏəƙ\rN\nə+\nŵ\n!\rŞƿ\n\n	ʭə{\noɖά\nЩɖ 	Ɛ\x00.\x00Ə˜\x00y˚ƿə+-əՇş\x00	\x00\n\x00\x00\x00\r\x00\x00\x004Ş\n7əđɖȢə{ɖב	əŏɖ൘\n\n	ʭ\rə{\noɖά\nЩɖ Ə˜\x00\rǮ˛\n	Ɛ\x00˘ə+-əƌ\rSş\nəݚəđəjp­\n\x00ºFƓ\x00\x00	\x00\n\x00	\x00\n\x00ŉəŻƁPϡ	BɖѺ\nBɖѣƒ\x00\nD­\x00	Ɣ\x00\x00	\x00\n\x00	\x00\n\x00ϡ	BɖѺ\nBɖѣƒ\x00\nDº\x00	ƕ\x008ŹƓ\x00Ѽ³2Ɩ\x008Ɣź\nƗ\x008žƖ\x00ØƘҭeÿJə෍iЁ}ˊƙ%\x000Ƙͅʌ-๵ȓZtəđɖŕƚॗƘຸ௮ZƛɮˌW?ſƜ8ɮˌdƝ8ʖſɮˌ୚ƞ\x00ɑ	ǣFă8ə಴Ɵ8೹ƠĴɖÏѿɿ2ơഁ$ɖԷٯ$ɖ഼ɖҷ$ɖĠɖÏɄ$ɖ஢ɖϱ$ɖԞɖĚɖÏɄ$ɖ෾ɖͽ$ɖĭɖŭɖĚɖÏɄ$ɖ֡ɖடɖŭɖĚɖÏਐƢқɖŭɖĚɖÏרƣ8ƢҘɖ٥ƢƤ\x00	ơ\n	\x00#Fə{	\x00ƥ\x00	ơ\n	\x00#Fžə{	\x00ØƦ\x00Õ əěËėBɖȧɖʅəƧ\x00Õ əěËėBɖȧɖʅəƨ\x00Bɖʍɖ˿Ʃ\x00Ʃ\x00Õ əěËėBɖৌɖڟCɖģə.Cɖոə˔'ɖɖȲɖ˧ə$ɖͤCɖقə˔'ɖɖȲɖτəs'ɖɖbə$ɖͤCɖ؂ə˔'ɖ±ɖȲɖӑəs'ɖɖbəs'ɖɖbə$ɖඡəɖĔəs'ɖ±ɖbəs'ɖɖbəs'ɖɖbə$ɖ໨ƪ\x00Õ əěËėBɖʍɖ˿ə'ɖåə$ɖƥƫ\x00Õ əěËėBɖʍɖ˿ə'ɖåə$ɖƥƬ\x00Õ əҮǣəs'ɖ±ɖbəs'ɖɖbəs'ɖɖbə$ɖ෺̋2ƭ\x00	\x00\nŉ əěËǣ	ɖ͟\nņɖ͟əs	'ɖ±ɖbəs	'ɖɖbəs	'ɖɖbə	$ɖbəs\n'ɖ±ɖbəs\n'ɖɖbəs\n'ɖɖbə\n$ɖƥƮ\x00ƁəӜɖڄƦ\x00əɫƱ\x00Ư\x00Ɓ\nƩ\x00əɫƱ\x00ư\x00Ʃ\x00əɫƱ\x00Ʊ\x00	\x00\nN		ə+	-\n	ਿ\n əě\nË\nė\nBɖȧ\nɖʅə\nƲ\x00\x00	Õ	 əҮ	ǣǙ	'ɖ±ɖ\\ࣲ	'ɖɖ\\ɖජ	'ɖɖ\\ɖՀ	$ɖກĄ'®JѢʹ˚˚%˛\x00˜˛p˜œʸ\nʷ½˝%͆ࢥɮǌఅəđɖŕ\x00	Ãࡴɛɝࣽ7ź\n	šəđɖҳə{ɖȢŒǖ	7ƌ\x00˝rſ\nʛəũəďƝ\"əŜŖ˛\x00୾\nÎ˞%\x00\x00	\x00\n\x00\x00pp	͆ੑ\n˛=˛\n,\"ɖƞ\n9ɖǼͯ		\n˴˟\x00ʸ\n˟\x00ʷ\n˜ࠇ˟\x00	ɉ7	Ŵ\n	əɖԦ	Ɓ	\n	Ƌ	\x00˝r	ŠŒ	߬əʈ	\nɛǶɝƴŹ	ࡵ\nৠ¹\x00_	ə\x00\x00	\n\nBɖƞ\n͆߫J˛ট\x00\n\x00	Ĥ˜9ɖԦ˜©ʡ˞ధ	˛WHݰͯ͆ܿణƳ(ʹ?ʹ_ƴ\x00\x00	(ʹ	໤ʹ¹\x00\x00	ą\x00\x00	\nN\n\n	\n-\nǤ\ndƵ\x00	\x00\nƇ\x00əѐ	,\nѭƇ	\x00əݜ^,Sѭ,\nѠƶ^\x00S	#əşSJ,	#ə³,ŔSᄳ2Ʒ\x00	ɥɏɠ্ɢYɢࢲ		ə+	ŌƄ\x00	ฮƸƇƇ\x00əʦəૡɮɁə\x00əངʀəy৿ƹ\x00(?əşFƺ\x00(?ə³Fƻ8ƇƇ\x00əʦəٔĆ\x00	\x00\nəáəǩ#əԝ		ə+	R\n	Wƃ\n\x00e\nə̃əӱć\x00	\x00\n	4əáəǩ#əԝ\n\nə+\nെƃ\n	ə\nю	ə̂əɕƼ(?ƇƇ\x00əʦə߭ƽ8ƈ\x00əޔƾ8ƈ\x00ə໳ƿ\x008ƾǖƾċ˚\x00\x00˛\x00˜\x00˝\x00˞\x00	\x00\n\x00˟\x00ˠ\x00ˡ\x00ˢ\x00ˣ\x00ˤ\x00˥\x00˦\x00˧\x00˨\x00˩\x00˪\x00˫\x00ˬ\x00˭\x00ˮ\x00˯\x00˰\x00˱˚²˛˜²˝˞²	ɖ඲\nɖ໥ˠɖ¥˥˲	\n˦˲\n\n˧4˩͆ü˪ɡ̼˫˭ˮ˯͆ü˱p(®$ÚIÚOJJ\x00F\x00T\rѢଲˣ˼\rˤ0˽ɖƎˡƝɖީˢōtɚ௵œʋ\x00ɚǢ\nœʋ\x00ɛǈ\nœʋ\x00ɜǝ	\nœʋəƒɦ˒\n\nœʋəƒɡ੏\nœʋ\x00ɚų\nœʋ\x00ɝҶ\r\nœʈ\x00ɟZ½̂ঁ̂ŷ	̂ɖT\n̂ɖ/̂ɖi̂ɖĺ\r̂ɖĐˡ7̄௢˾ɖತ̀ɚ٫̆؃\r(ˣɼ_̃˜\n˟	Ʊ\x00˟ό˲̈\x00̉\x00̊\x00̋\x00\x00	̈\x00̉̊̋4p	k\n\x00n\x00¿\x00¯\r\x00f\x00y\x00|\x00\x00\x00p\x00Ã\x00_F~\nࡣ̊Ȟ̈\"̉̊\"̉%ԌnÀ̋̉̉&̉Ȟ̈ǯ\r%ԌnÀ̊&̊Ӵ̈ǲ̈\x00̋̊юČk׵¿ń̋̊\x00̊&̊Ȟ̈΢̊Ỉ̈ǲ̈̉̊ˊ̉̊ĴȞ̈ĴӴ̈ǲ̈8̋˖˳\x00\x00	\nN\n\nô\n=\n	˴\x00(\"ɼ\"ɼඐܸяॎ१˵\x008ʣɚƖĄघĄŪìൗì෩˶\x008ʣɚ1Ąତʣɚ1ìݨ˷\x00		&ĦɎīȿʣɚƖĦŪīһʣɚƖĦŪīӭʣɚ1	̨	ʖ	ǯʣɝԟ	˸\x00	\x00\n	&ĦɎīȿʣɚƖĦŪīһʣɚƖĦŪīӭʣɚ1	̨	ʖ	P\nʣɝԟ	\n૤\nɖбʣଔ\nŔ\n˹\x00	\x00\n\x00\x00\x00\r4	0˿͙\nڹ£ə+-\r0˿Ą\nɍì\nƻə˸\r\x00	Ŧ\nF˺%\x00̈\x00̉\x00̊\x00̋\x00̌\x00̍\x00̎p̈4̌4̍4̎4Ê\x00	\x00\n\x00À\x00\x00¤\r\x00\x00¬\x00X\x00±\x00ÈF~\x00	̉̋̊̍4̎4̈4̌	@	9@	p	୶	9Ù̈̉˶_	\n\n̉ć̎ə_	൰˴_	\nச̌̋˵_	\n\ň̋ʺɖ౒̊#̌̋̋ൻ_	\n̍ə	Φ̊\x00̋d\n\x00	\x00\n\x00\x00ɖĐ	4\n˳	\x00ઈ̋ô=̌Cɖæ	ൄCɖğ	ਧCɖߕ	ஷCŋă	൚Cɖେ	ਢ	ใô=	௤\nڥ\n\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00ɖȩ	\np\rĹ̉?	Ů̉ൌ44\n༟̉ૂ̈x̈W಄Bɖ༩মิ#ɖයI\x00ŕ\x00еҋ\nŐՑ\x00੸ɖఈӚ඿-ࣝŕ\x00еҋŐՑN=ҕəɖբ௱\nB	\r\r\n\x00	ʣɚƂ\r\x00	Ç	\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00©\rœĹ̍əɖ޲̎ə༮அ̎əǅR	̎\n̎ଇ˴	\x00\nu࠼	֍\n֠&	ì\nȿ	Ą\nߪɖഴɖളɖ֮Ëɖިɖ೩ɖ೫Bɖૄɖி	ì\nۋɖેɖȇəϏəɖ࢘ɚљɞܥ¶ə+-#gə[¶ə+-ʣɚ1Ҕ\n#࢔ə຦&əƙҚɖTBɖஜǑ\rग़\r෌\x00ୂɖঈ\r\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00ɖƴ	©\n©©ࢗ̍ə\r²¶£̍əǅ-̍̍xޕɍ	97\rÖBɖæ\n	J	.Öࡖ࡝97\rÖBɖæJ.ÖBɖǼ\n9	7\n	\x00\r࡙BɖǼ97\x00\rّ\r\x00̍əɖල%\x00\x00	\x00\x00\x00\r4	Ĺ̍əඎɖמ\x00ə٬\n\x00(IBŁࠍIBŁǿɖع˹̍\n\n,຤ɖə+-\r\n౛ \r7Ö	Bɖʤ໩	۹	Ö\rΤ\x00əؗ\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00	ɖ൞\n̍\x00ʖ	Kəޢɼ\x00Ĺɖ࡬əǅEəइ=0˿ࠟਦݧ଻9ɼ7˷\x00\n#\x00ʣɚƂ\x00ĉĊIऻലɖ׈ļଡ\x00\x00	\n\nϰ9˚िy߽	əл˴_r	\nֶ\n%\x00\x00	\x00\n\x00\x00\x00\r\x00\x00̍,0˿͙	ɼ\x00\n¶\r£\r̍əǅ\r-̍\r˶\x00ซ0˿Ąɍìƻ\n˸\x00\n	 ɼ\n 		тÖ	\n\x00௎\x00d\x00	\x00\n\x00\x00\x00\r\x00	\nٿ˱	˱0˿̍๲̍സ˱	˱˱\x00̍əʶ\r\r\r-̍\r	ȥĄ˱ʩ\nȥì˱ƻ˵\x00\n˱Τ	\x00\n\x00\x00˖˻%\x00̈\x00̉\x00̊p̈4̉̊Ê\x00	\x00´\n\x00rF~\x00	̉̊¶@9@pÑ	_\n	əɖʞ	əɖࣆ̈̉	\x00̉Э	əɖʤ̊༧	̊\n\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00ɖĸ	ɖܚ\nŴ4\rĹ̉޳̉ô=̈əɖ͋\nȱɚي\nɚտЭ\n˘ô=ʺ	\r١\r\x00	\x00\n\x00	ث\n\n̉ô\n(\n̈\nWəɖ੒əɖ૊ɚঝɚਨ	߻̈\nч	}˼%\x00̈\x00̉\x00̊\x00̋p̈˺\r̉˻\r̊̋ɝ΅F~\x00\x00	\n\x00\x00\x00\r\nఢ\"˛Ͼ̈=̈ɚ{̈V˥\x00\x00	\n ɼ7\n\x00̊ω˥|ු̉=̉ɚ{\r̉V˦\n\r ɼ7\n\r\x00̋ω˦|ॉ\n}˽\x00̈\x00̉\x00̊p̈̉˲\n̊˲\nÄ	\x00§\n\x00£\x00F~	\x00\x00	(ࡸ\"˛7̉f	\n̈Ő̊f	ݺ\n\x00(\"ɼ?F8ʖKɖܕŁˉ%\x00\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00 \x00!\x00\"\x00#\x00$\x00%\x00&\x00'\x00(\x00)\x00*\x00+	\n\rˠ\x00 ˠ\x00!̉y\r\"̊y!Σ#̉@#9̉@#̉p#Ñ$̉_#\n%$\x00	#%,#%AʣɚƂ$\x00\nʣɚƂ$À\x00\n$9ɼ7&$\x00&இÖ#&A&,	тɖѕ\nɖѕ૱'$\x00#',#'A($±\x00#(,#(A)$È\x00#),#)A#)Z#)\rʣɚƂ$¬\x00\r\n$X9ɼ	\"ˠ	$X$X˴ȡʣɚčKɖԒȡʣɚčKɖԒBɖ՞Ċҙɖ༁ɖɡĊҙŋູŉ\r&Iɖ਌ɖ௘ʣəƀKɖƎʣəƀKɖƎʣəƀKɖऐĹ\"Σ#̊@#9̊@#̊p#Ñ*̊_#\n\n#*\x00#*´\x00*r9ɼ	 ˠ	 *r  *r˴\"ˠ	Ǒ \"ˠ	 Ǒ#˟4+	+ۄ 	+mɖࡥƦ˟\x00+\nƫ˟\x00ʣəƀ	Ŧƫ˟\x00\nƫ˟\x00̈\nƫ˟\x00\nƫ˟\x00\nƫ˟\x00\nƫ˟\x00\nƫ˟\x00\nƫ˟\x00\r\nƫ˟\x00\n\nƫ˟\x00\nƧ˟\x00\nƬ˟\x00БƬ˟\x00БƬ˟\x00٪˾\x00\x00	ॐəΐෞɜ੭ɜ࢓ɚ̤	റɚ˽ɚಥķษķౠəſəࣂ˿\x00༃ຜ̀8͆«˯́˻ə༓̂\x00		0˾\x00\x00̀ɚഀˡ	̄	લ́	ߑ˰\"˛	̃˛P˦f	\n˰˜\x00˦kẵ˜֜ˮ༤	əӀ˥f	.	ə཈̃˛\x00˚\x00	\n	əЋ˝	ˮɖࡕ˭ˮɖฐ	əɖйˬ	\x00ˮ༳	əɖޞ˴ˬ\x00	̃˛Pˮࠎ	əɖæˮė	əл	əЋ˞7ˮɖ/˭ݓ	əӀ˭࠿˭˭Eɖæˮګ˰˛}̃\x00\x00	\n\x00\x00ɠZɝ׾\"˛	˥y̱˦y\rχ\nˣɝ܏\x00\x00	\nˤÄ\x00\x00\nȉ̄4əə୭əೆəʩəॻəʩəƻəəംəɚ଺əɚీ˧əɮfəࢳ˧əࠗ͆«˩EɖŬ̆̌̅%\x00\x00	\x00\x00\r\x00ƛɖऌ		ə+	޷		૸\n	ஞɮfə\x00əΗŹƚ܌%6ʈɝ๙ʈɝ߉ɥುʈɟǶɖۇɮfə؉ʣɚ৛\rลʉtɚઠʈɚۊʈɚ̀ɚڝʈɚ̀ɚढ़̆%۾˨	˨̅ń˫ćə˨\nə˫\nəˢ\nəʈ˧\n˧4˩͆ü̇ɮfəଦ̇Ŵʈəࠏ0ʈəࡶʈəพ0ʈəัɜஊȱəóɚǓ˪|ɚóఴɕ2ǀ%˚6ʻ_ʻ²œʋ\x00ɤŘǃ\nʓŧ\r˚Ũ͆ċɖࢣP ʓP\x00ɮǊɖTɮઍǂʋəЈ½\x00	\x00\nɮ<əə¤əјǅ\x00əϭəіǅ\x00ə ȗ̈́˚Ȫ\x00ə͇͆ȳə೵ə1ɛ͊ɛ๦ɛକɚƗژəğɮ¬ɮķɖئ	ə1ə࠲	݉	əƓ	ȥ	P\nǗ	ŤFəٚʙ\n஋ȿ\x00ȩ૞ǁ\x00	\x00\n\x00	ə1ɚ঒	ɤ_	͆຅j\nʾ	Ĥ\n7\npʾ	\n\x00ɮ¹ə	੆əϑ	͆҄	\n\n2͆ċ	\nŨ\n2\n\nDD٠\nǂ\x00\x00	\n\x00\x00\x00\r\x00\x00\x006Ҋɼ_\n0ɔɖىəA\rɣࡺɡཏ		P\rпȔʯ(৶Wಸन\n!\x00\rŹχ\n๋ǅ\x00(ə1ɚौ͆İ\x00\x00ə1ØǇ\x00\x00	\x00\n\x00\x00ČDÅoÅÅ	Å¾\nÅaÅqǈČdഔǉČmǊČ\\ӇvӇЁ]Åb	b৩	ə߯ǋ\x00	\x00\n\x00\x00s\r	͆ɳɖƎ\n¶ฺ\\୯m	\nï\nE	əૢ͆ɳ	əƙɖڇǌ8ŕ\x00˄Ǎ8ŕ\x00ˆǎȃ\"əġɚਊɚĽɛӋ֕Б2Ǐ\x00	\x00\n\x00d6əӒɖະ	,\nࢀ\n əʟ\n ə෹	zǉ=	məട̕\n̑əʔɮG əÉəə΀	Dˑ		d6	əӒɖʇ		əɖȌzǉǎXǍǑϦ	ə^	əɖ/ɖƩ̕\n̑ə^ɖĳ\x00əÂəʔɮG[əÉəəಁ	D˒7		d\x00		əŨǍɚӄɚ¥	ə^	əɖTɖ ̕\n̑ə^ɖĳ\x00əÂəʔɮG[əÉəə఺ǐ\x00(ə୵ɜ༊ŕ\x00˅Ǒ6əɖǞɮ¹əགྷɮ¹ə\x00ə૓ɚĽɛӋۻɹəǮə໇ǒ\x00	\x00\n\x00\x00d\x00	೔	zǉ=	mə൬ÈɮG°\x00ə^ɖĳɦಗ	məټəțɖйə^ɖĳɮGəY	\x00əÂəə΀	D˒ʻ\n	d\x00\nZ\n,ǐ\nƑm\x00േɚ¥əɖƞ#ə౾ÈɮGË\x00ə^ɖĳ\x00ॼ	Dˑ\n	d6\nəʰɖʇ\nZ\n,ǎXǐm\x00ǑϦÈɮGË\x00ə^ɖĳ\x00əþ\x00əÂəȅɖƞə^ɖڏǓ\x00	d\x00	Z	ɚ̔ľ,ÈɮG~\x00ýəYǚəРǌ	ý,ÈɮGəYઘ	८ǔ\x00	d6əʰɖʇ	Zǎ		Ǒ	\n	ɚ̔ľ,ÈɮG~\x00ýəYǚəРǌ	ƑdƑdəࢊƑdܨƑdəࠅý,ÈɮGəY୅	\x00഑Ǖ\x00	d\x00əțɖ͋	A	mɛࠫÈɮG²\x00ýəYľ	\x00ə^ɖұəීǖ˻D޺ˑǔȆ˒ǓȆ˓ǒȆ˔ǕȆ˕Ǐ૔Ǘ\x00\x00	\n\x00\x00\x00\r\x00\x00Ãੈ\n͆üɐ\n\n͆Դ	ÉN\r\rə+\r-\rŁY	ǖ\rห\n͆üɮºɖ௿ǋ¢\x00P\n͆üÇəష\n͆Դʈə໵DĿǝȵǂ\x00	Ψʾ	ÃəщəՃɮ<əəƜȿ\x00\nə˸ȗPȩĒ\x00\x00	(ǡe͆̇\x00	\x00LəԬ#	F	Ǟʈɦ୛əࠡЂəൾzţ\x00əැƝəŚЂəцə౰əऑəՁə۱əԼɖٙəՁɣࡪ	ࠪʕ2ǟӼəцəԼɖॊѻǠ\x00	\x00\n\x006ʈəࢷܓɠ৆ɢە		ə+	ޜʈ	ඦʈ	றəѲೝ\nʈ	ࡻ\n\nɛʁə+Ō\nɛʁԛ\nɛʁUəѲ౞ǡ޿əฆɚ೎ɮ¬ɮķɖʡōúɚ໡ōtɚນǠഄɚӽəǆʔɣஹəĥˇə]ɚඵɚӽəŚʔɦ༷əĥʘəɚޅѻǢ\x00\x00	\x00\n(ǡ	ബ\nÁəȷ͆̇\x00\n\x00	ŝǣ\x00\x00	\x00\n(ǡe͆̇\x00\n\x00ǞXţ\x00əӾəĀ\n&͆ǹߥ\nJ͆İ\x00	\x00\nD\n່ǞXţ\x00ɚਫ਼əĀ\n#	೷	\n\x00ɂ3\n}Ǥ\x00\x00	\x00\n(ǞXţ\x00əȴəĀ\nȴ\x00	Ä\nJ͆İ\x00	\x00\nD\n}ǥ\x00\x00	\x00\n(ʋəĀ\n͆ՠ\nJ͆ஒ\nD͆ॕǦ\x00\x00	\x00\n6ǞuǼ\n\nəĀ	ĘJ	\x00ǝD\n}ǧ\x00\x00	\x00\n\x006ǞuǼ\n\nəĀ	ĘJɚԖ	\x00ǝD\n}Ǩ˚\x00\x00\x00	(Ǟ˚Xţ˚\x00ə੃	əછ˚	\x00˚\nF	\nȠ˚ർ˚ؾǩ\x00\x00	\x00\n\x006ǟϟɮ¬ɮķɖЄɜʎɮ<əəӤţ\x00əԜəɝţ\x00ə̻əéə׆\"əĀ\nȴ\x00Ä\nJȯ\x00\x00\nD\nຂǪ\x00\x00	\x00\n6əʟǞXţ\x00ə༅\nəඔǁߦV\n\x00ə϶ɼƽϜ\nޏȿ2ē\x00\x00	\x00\n\x006ɼɮ԰	əġˉə³	W ɼ\x00\x00	\x00\nL ɼ?Ώ\"əԬ	͗\nF	\nǫ\x00	\x00\n6Ǟu	ɮ<əə¤	\"əŸ\nWǞ\ne\n6\nMƃ\n\x00ə਼ɮ\n\n͆ǹL\n9ɼ?͆ఋ\nߙdǬ\x00\x00	\n\nɚҜȽ\nL	?ɮ\nੴ\ndǭ\x00	\x00\n\x00\x00\x00\r\x006Ǟu	ɮ<əə¤	\"ə̝Ǭ\x00स	ɛ͞\nɃˁɖÌɃˇɖÌWəʂ\nɜՌ	͆ĵр\nɚŚ\rɚҜȵ\n\rə:əÊD\rə༇ōǿŎǡeɮȓdǮ\x00	6Ǟu	ɮ<əə¤	\"ə̝Ǭ\x00ܜdǯ\x00(ǞeȾ\x00Ddǰ\x00	6Ǟu	ɮ<əə¤Ȫ\x00eɮм	ə˓͆ĵՇdǱ\x00(ōǿɮ՜ǞXţ\x00ə଼Ǭ\x00६dǲ\x00	\x00\n6ǟϟɮ¬ɮķɖЄ	ɜʎ\nɮ<əəӤţ	\x00əԜ\nəɝţ	\x00ə̻\nəé\nəࢽȴ	\x00\nÇdǳ\x008dǴ\x00(\"ʋ?͆ċɖ͸dǵ\x00	6ǞXţ\x00əȴ	ǁL	?	VĿŹɍ2Ƕ\x00(ʋ?ŎǡeɮȓdĔ\x00	6ɼɮ԰əġ	ˊə³W	 ɼ?	\x00ÇdǷ۟əɥəëɝ॰ɡʮɛްəೃǸ\x00	\x00\n\x006Ƿ͌əĸəȀə஼ɛՍəʪɜ୉ɥॿ		ə+	R\n0ʔɚ	ൔ\nəřೈ0ʔɦஆəř௣ǹ\x00	\x00\n\x00\x00\x00\r\x00əĸəȀəʪəॆ		ə+	R\n0ʔɚ	ঠ0ʔɚ	Ęɠɶ	Ęɛ༔\rŮ\nəřÑ\r௩əřÑǏ\r̅๚\r̅ປ\r9຾Ǻ\x00(ʔɤࢆɚٗəĥܹ7ə­ʔɞ߸ɜˍə­ʔɝ௹ɜ௬ə­ʔɞಡə­ʔɣ௙ǻɮ̘Ǻ|ɮ¼ɖƪɛɶ੩ʋəɚƹəŗ\x00Ɇ\nəǵɮ̘ɮ¼ɖƪɮĞə\x00ɛओəΡǺ௉Ǽ(Ǹषǻ´Ϝǽ\x00	ˈ#Ãǹˈשɮ¬ɮ¼ɖෂˈǼˈ.Ǹˈ	0ɮ௝ɜŶˈ\x00ɤǩɆ	\nˈ	ɥడɛ܍	əıɛ࣑ɛՈˈ\nˈԱǝǾ\x00\x00	(Hɜஈəແɮѯɖɵ͆ཎÁɢ̛ɛઆȖ3Ś\x00\x00	ǿ\x00\x00	(ʈ?Ǜə]ʈ\x00	DŚ\x00\x00	Ȁ\x00\x00	(ʈ?ǜə]ʈ\x00	DŚ\x00\x00	jŹ2ȁ\x00\x00	(ʈ?Ȼə]\x00	DŚ\x00\x00	Ȃ\x00\x00	(ʈ?ȼə]\x00	DŚ\x00\x00	ȃ\x00\x00	(ʈƝ	ǷəȷǗ	࠶Ś\x00\x00	Ȅ\x00\x00	(ōúʅ?͆৤\x00	ÔŚ\x00\x00	ȅ\x00\x00	(ōúʅ?͆۫\x00	ÔŚ\x00\x00	Ȇ\x00\x00	(ōǿ͆൨\x00	ÔŚ\x00\x00	ȇ\x00\x00	\n\x006ōúʅ\nƈəŒəϘƇəŒəૣɮ¨\nFĿŚ\x00\x00	Ȉ\x00\x00	(ʋɮໝ	Ƿəʀǽ\x00	ÔŚ\x00\x00	ȉ\x00\x00	(ǞXə˱ȯ\x00	,	ʉŚ\x00\x00	Ȋ\x00\x00	(ǞXə˱ȴ\x00	ÔŚ\x00\x00	ȋ\x00\x00	(ǞXə˱ȶ\x00	ÔŚ\x00\x00	Ȍ\x00\x00	(ʈɚຮ͆௭\x00	DŚ\x00\x00	jǵ2ȍ\x00\x00	zʈɟЕ	ϼʈɚԺȢ	ࡐŚ\x00\x00	Ȏ\x00\x00	ʈɜϻzʈɜϻ	ϼʈɚԺȢ	ܲʺǞXƆəՙəȴɮ๻͆ϋÇŚ\x00\x00	ȏ\x00\x00	(ǞXţ\x00əܤȘ\x00	ÔŚ\x00\x00	Ȑ\x00\x00	(Ǟeȸ\x00	ÔŚ\x00\x00	ȑ\x00\x00	(Ǟeȹ\x00	ÔŚ\x00\x00	Ȓ\x00\x00	(Ǟeȷ\x00	,	ʉŚ\x00\x00	ȓ\x00\x00	(ǞeȺ\x00	,	ʉŚ\x00\x00	Ȕ\x00\x00	˚6Ǟu˚ɚݿ	ԹȽ˚\nǂ˚\x00\n\nɆ˚D˚ĿŚ\x00\x00	½\n(˚_Ƚȕ\x00\x00	(͆ظɛۖȞDŚ\x00\x00	ĕ\x00	\x00\n\x006ɼɮڍ	\nɖ\nʌ\n-	əʛ\n໹əġˋə³W ɼ?\x00\x00	ÇŚ\x00\x00	Ė\x00		£	ʌ	-əʛ	ӃʈəݒǛə]ʈ\x00ʈɚบǜə]ʈ\x00ʈɚއȻə]ʈ\x00ʈɚܼȼə]ʈ\x00Də]ʈ\x00ė\x00೦ʈə൤əʀǗ৾Sʑ2Ę(ʋ?͆৷ɚࠌȖ%\x00ʷɛ௻ʷɜ็	ʷɛҝŔȗ˚\x00Ã˚z˚z4œ˚\x00əǈ	\nǁ˚LV_˚ə1əãȯ˚\x00əÝ	͆ب˚\x00Ș\x00		ǁL		Vಌ	V	Vəђ	Və\x00´\nÎș\x00	\x00\n\x00	z6		əծ\n\n	əੌ\nϹ	\nəђə\x00´ÎȚ\x00\x00	\n\x00\x00\x00\r\x00\x00\n	,	A	՘əŜɜҦį͆Ƹ\n\x00ɚ଴	້ə\nţ\x00əࡢ\rœə1əÌ7ɮfəήɮGΜɮG\x00ɜඈ\rɖѯɮlə\x00ຣ\r	ȩମ͆Ƹ\n\x00əࠈţ\x00əૉȗͱz	z೸ə౱zəɜǞzɞకߚŚ\x00\x00	ț\x00\x00	\n\x00\x00\x00\r\n	,	A	՘\"əŜɜҦį͆Ƹ\n\x00ɚ੤ö\r\rə+\r-\r	ə^\r৵͆Ƹ\n\x00ə௦zö\r\rzəѶz\r	zə^\r೧\rۜŚ\x00\x00	Ȝɛժɛైɜַȝ(ɛࢴɣರɜണȞɛ๿ɛࡼɝ໑ȟ8ɝ੪Ƞ˚\x00\x00	\x00\nˎ˚\x00ǁ˚\n	&2Ơ˚ə૎ɮƯ	uȜ๞>DDEɖۿɮࣞ\nɮn2и˚əƜ\nɼ\nɮζ͆Ņ˚\x00əश˚ə:əÊ\n\nʡ̎ȡ˚ೌ˓2ȡ͆ǹ\nˎɼ\x009ɼ	əõɛ૨Ȣ˚\x00ˏ˚\x00˚ə1ə Mƃ\x00ɛೄ͆ǹ˚\n\"ɼ	͆Ņ˚\x00əк˚ə:əT\nʡ	̎	ȣ˚ȣˏɼ\x00ə൷ɛҵȤĴʔɢĎə׎əĥØȥ\x00	\x00\n\x00ŉə͏ˇə\n	ʃə\x00əा\nəϖɹə\x00	\x00\nˏȦ\x00	\x00\n\x00˚\x00\x00˛ǁ\n	ǁҥ	c੧c	\n	cɔ\nə1əÌ	c\nࢌ\nəƓ\nȥ\nP\nǗ\n೪\n๔˚ɮfəήɮGΜɮG\x00ɜƐ\n౨ɮ¬ɮķɖ̔ɝବɡ΂ɡű˚Ǘފ˚\x00əʊʙ˚૙˛əʊ\r½\r%\x00\x00	6˛כ˯ə1əÌ˯əࠝə:ə¥˚॑˛ć	˯ə॥ə߅˛โə:ə¥ޖəʊF	}ȧ6ŝсə+-Ŕ\x00ɚĎŝȨ6ŝсə+-œ\x00ɚĎŝȩ\x00	\x00\n\x00\x006ƆəՙəӾȦˑə¥əப		ə+	R\n	ə1\nLȤu\nəňȧ৥əƓȥPəΌƄ\x00Ǘʀə\x00əލǗŤ\nʙ´\ra\nəňȨڡȪ\x00	6əט	ɮ<əəࡊ	ɜຏ	əء	۶	ɛȄ	ɤٳ	ɚӈ	ɝળ	ɚܞƆə1əфɛࡨȫ\x00\x00	\n\nɮ<əə¤\nəˣ͆İ\x00\x00	໌\nɚҸə:\x00	\nɂफ़ə:\x00	Ȭ\x00\x00	\n\nɮ<əə¤\nəˣə:\x00	\nȦίə:\x00	jʵ2ȭ\x00\x00	\n\nɮ<əə¤\nəŸ͆İ\x00\x00	ίə:\x00	Ȯ\x00\x00	\n\x00\x00\nɮ<əə¤\nəŸǁŤ๹x	པ	ə͏©	ȥ	ĉ	Ǘ	Ťə:əÝ֖ʙ		\nVə෷\raə:ə෋ə:\x00	ȯ\x00\x00	\nȃəġ\nˌə³W\n ɼ?\n\x00\x00	Çə:\x00	Ȱ\x00	\x00\n\x00\x00\x00\r	ɮ<əə¤	əˣ\nǁL\nƝ\n2əȷ\n2̓ɮə1ʑ	ɛ͞ɃˁɖÌɃˇɖÌ\rə1LəʂɜՌ\r	͆ĵ\rрɚŚ\r?ȵ\rÇə1ȱ\x00	\x00\n	ɮ<əə¤	əŸ\nǁL\nH\n2ɮচ\n2əʀ\n2̓ɮə1أə1Ȳ\x00	\x00\n	ɮ<əə¤	əŸ\nǁҥ\n\nx?\nxĿə1ȳ\x00	\x00\n	ɮ<əəƜ\nə1LȪ\x00eɮ\n	ə˓\n	͆ĵ\nࣳə1ȴ\x00	ȃəġ	ˍə³W	 ɼ?	\x00Çə1ȵ\x00	ɮ\n	ɮlə\x00ɮƉəह	 ɖҼ	׻	كɹəy	Çȶ\x00	\x00\n	ɮ<əəƜ\nǁ\n\n7	əಏəɝ	əӍə೻\n2ɮ,\nDɮ໶	əӍə੯\nxɼ\x00\nVɼۛ	ɚ૝ə࠹ɂೞ͆Ņ\x00ȷ\x00\x00	ʈɚȶzʈɚɹɁ\nɆˮɦ̦\x00	ȸ\x00ʈɚȶzʈɚɹɁ\nɆˮəŶj́2ȹ\x00		ɚƗ\nɂ3	Ⱥ\x00\x00	ʈɚȶzʈɚɹɁ\nɆˮɡਆ\x00	ȻÕəЪǗɼŚʈ\x00ɚనȼÕəЪǗɼŚʈ\x00ɚޚȽǁ\n7c9ɼ	ə:ə¥cPDɖʞDɖƓţ\x00əඛə:əÊ2.ţ\x00əඍə:əT2\nz	zɼ෦x9ɼ	ə:əÝxP͆Ņ\x00ɚ୨Ⱦ˚\x00˛6ɮ¬ɮ¼ɖɵ˚əߌɮ<ə˚ə͎ə˓˚૘˛ʋəɚƹ˛əŗ˚Ƚ˛\nǂ˛\x00D˛ə༄˚˚ɚড়Ƚ˚\nǂ˚\x00	D˚ୠ(˛_Ƚ	(˚_Ƚȿ\x00˚\x00	\x00\n˚ə୮ɮ<ə˚əฟ	&əՋ\n&ɛևɚ߈	\n༡ə଎	œ˚\x00ɚĎ࡛ʼɛݩ˚\x00ʼɛ϶͆üʼə਋}ɀࢠ઎ə߼ପƅ\x00ɟ࣋ƅ\x00ɠຎƅ\x00ɡೣƅ\x00ɝգƅ\x00ɦിɁ\x00	\x00\n\x00\x00\r\x00\x00\x00\x00\x00ÃəщəՃɮ<əəƜȿ\x00Lə1ɚ޽ə˸ȗPȩʹəјǅ\x00əϭəіǅ\x00ə ȗ̈́Ȫ\x00ə͇ə1ə̓͆ȳஃəࠨ	ə఑ɀ	௨\nəǵ\nǗ\nŤəŗ\nƽaɅۏə1ə͆7͆ĵ\nə:əǥோɛਖ਼\rə1ɤ·ə1ɚŖ\r\rɠϔ7Ƈ\x00əĔəෝʞəAʔɝÝə୬˷əÜɮnƇ\nə:ɚʨݦɛٹɃˁɖÌɃˇɖÌəʂɜகɅ.ɚŜɄڱɚҸɂЏȩɂ̮ː_ːʓ\x00ʡ̎ʓŧʹƿːP\x00ʓP͆೗ːɮࣘɃ\x00\x00	\n\nə1\n\n7\nƂ\n\n	7	Ë\nɮ<ə\nP	ȡ\nɮ̭ə\n׫\nɄ\x00	əÊ	ə1з	_͆ơ\x00\x00	๤ࢗ2Ʌ\x00	əǥ	ə1з	_͆ơ\x00\x00	֑Ɇȵǂ\x00ɁΨÎę\x00	\x00\n	£	׺	=əʛ	Ӄ\"ʈɛౚəฑ\nəܺ\nəŻəࡤǗ\nɼʙəٻʙ\rϏəഗҞəুνəȅɖآ,͝əȅɖࢱ,A৙ɇ\x00ɇ\x00	\x00\n	\n\nə+\n-	\nխ\nəϙʙəĸɛÊɞھɮfə	\x00əǠəС\x00Ɉ8˖dɉ8˗ආɊ8˘əëോɋĴEɖఝCɖՕEɖ҇Cɖ૟EɖԚɌ8EɖżCɖҵɍ(ɖӞ˙ƁɖОɋɎ(ɖӞ˙ࠬɋɏ˚\x00˛\x00˜\x00˝\x00˞\x00ˤ\x00˥\x00\x00˳˚ʞə\x00ʔɥ̈ə״˛˜˝©˞ɮ¹ə˚˫ɞ֒˛߄˟ɮ¹ə˚\x00˛ˠɿə˚\x00˛ˡ%ɿə˚\x00˛µɖğ˝୔ˢʯಲˡˣ8ʀə˚\x00˛\x00əȰSˤ4˥¶ɖǀ-ˤəॶǇ࠸˦\x00		ˤ˥˥&˥ɖ๗˥ͺ	D\x00	o\x00	a˜\x00	q˝\x00˝œ˞F	˧\x00੹˨\x00	\x00\n˛஡	ɿə˚\x00˛ɨ	ɖਾ	ɿə˚\x00˛ɨ	ňú	ɖֆ	ɿə˚\x00˛ۘ˙	Ɓɖ९ɖդ	ɖ༛	ɖ൦	ɿə˚\x00˛ǸɖҺ		Cɖಞ	Ŋú	ɖވ	ɿə˚\x00˛Ǹɖຈ		ĸཌɌ	Ñ	ɿə˚\x00˛ɨ	ɖӂ	ɿə˚\x00˛ǸɌ	Ñ	ɿə˚\x00˛ഋ	ɖཕ	ńÙ	ɿə˚\x00˛µ	ɖғ	ɖ˹	ɿə˚\x00˛ഘɌ	Ñ	ɿə˚\x00˛ಚ	\"ɖࡑɍ	˧ɡۙ˛Ϟ˛ù\nɹə˚\x00\x00˛\n	\n\nŔ˦ɖT\n˩%\x00\x00	˛\x00ɿə˚\x00˛ߋ	ɿə˚\x00˛Ь		ɖğ˧ɤ஻	ɖΓ˛ੇ	 ?˦ɖTɹə˚\x00\x00˛Ø˪%\x00ɮlə˚ࣻ˛\nɖ̘ʀə˚\x00˛\n˛˚ə۴ɹə˚\x00˛\x00\n˛D˲˫%\x00ɮlə˚எ˛\nɖň˧ɦບɹə˚\x00˛\x00\n˛ɖT˝˝ɮləઔ˲ˬ%\x00\x00	˛\x00ɿə˚\x00˛ǸɎÑɿə˚\x00˛Ԣ˛ù	ɹə˚\x00\x00˛D	˭\x00	\x00\n˛\x00\nৃ	ɿə˚\x00˛Ь		ɖğ˧ɠଛ	ɖ໼\n߲	ɖΓ˛ര	ɖౌ\nח	 ɖཌྷ\n=ˬ3˦ɖTɹə˚\x00\x00˛Øˮ%˞6ɖΚɖʞжɖéĸúɖΚ\"ɖȄ\"ɖड\"ɖഫ˯˛ݗ˟০ˡ3˪ٖˡ3˫ཆˮ೓˟˲əઢˡ3˦ɖݷ˦ɖ/əג˭əγ˰%˛ÖˠɌe˨əܯɖଥ˚ə`˛ࣄɖ࣍ˡ\rˡ\r˦ɖଷ˦ɖԇəʖ˱%\x00ˬ˞ɖධ˦ŷ˗Wܣ˦\x00D˦ŷ	%˳ѧ˳ഡ˩\x00˳Л˰\x00˳Ҩ˯\x00˳ţ\x00˳ͫ	\x00˳ȫ\n\x00˳Г\x00˳Ή\x00˳Ծ\r\x00˳ಀ\x00˳ฎ\x00˳୥\x00˳܊\x00˳ز\x00˳औ\x00˳؀\x00˳പ\x00˳ͳ\x00˳Մ\x00˳Ȑ\x00˳૆\x00˳࠻\x00˳ࡾ\x00˳મ\x00˳୎\x00˳ޡNɖ౽-˙Ɓɖæ˳˱EɖżCɖ˸˳˨ଵ%ˡ\rˠh°ˡ\rˠh°ˡ3˦ɖआ˦ɖୟ˦ɖiɟ࡚	%ˡ\rˠ\"ĶÙˡ3˦ɖ୺˦ɖ/ɚɒ\n%ˡ\rˠhʄˡ3˦ɖทˡ3˦ɖկ˦ɖ/ə૪%ˡ\rˠh°ˡ3˦ɖয়ˡ3ˠ˲ĶÀˡ\r˦ɖଘ˦ɖ୊˦ņ\rɚઽ%ˡ\rˠhඖˡ3˦ɖߴˡ3˦ɖȀəફ˦ɖźɜઇ\r%6ˣ༼˝ˢɖȨ˪ʽˡ\rˠhఎˡ3˦ɖ૖ˡ3˦ɖ஦˦ɖźɛর%6ˣɦ෨ˢɖ͸˪ʽˡ\rˠh௞ˡ\rˠh°ˡ3˦ɖ෸˦ɖحˡ3˦ɖ޼˦ɖ/ɚڠ%ˡ\rˠh°ˡ\rˠh°ˡ3˦ɖ٘˦ɖณˡ3˦ɖ௑˦ɖĎə׿%ˡ\rˠh°ˡ3˦ɖ๛ˡ\rˠh°ˡ3˦ɖࠐˡ\rˠh°ˡ3˦ɖȀɦ๕˦ɖ஄˦ɖౣ˦ɖ/ɛത˛Ǐˠ˲ɖӂɌ˚ə`˛ਅˡ3˦Ļߊˠਹɖ൜ˡ3˦ɖઉ˦ɖųə५%ˡ\rˠh°ˡ3˦ɖయ˦ɖـ%\x00˛\x00ˡ\r˚ə`˛Ĭ˛˚əɰ˛Ǐɖͭ˛Ւɖɥ˚ə`˛Áɖϩ˛Я˦ɖഐ˚ɚ]\x00˛ʑɖѩ˦ɖИ˚ɚ]\x00˛;˚ə`˛j˧ɜώ%ˡ\rˠh°ˡ3˦ɖࡉˡ3˦ɖཉ˦ɖ/ɚีˡ3˦ɖiɛǜˡ3˦ɖĈəƦˡ3˦ɖÝəĨˡ3˦ɖȾəȚˡ3˦ɖύə҂ˡ3˦ɖɞəˆˡ3˦ɖۀəѰˡ3˦ĸ\rəθˡ3˦ɖ¦ə˃ˡ3˦ŋ\rɚ߿˲%\x00ɿə˚\x00˛ĬɖВɖঊCɖฬBɖ૵Ɋߐɖğ˝઩ɿə˚ɠ˛˜˛\x00˳W?Bɖঔ˦ŷˬޝ?˦ā˧ɟ܇ɓѼ˳4	\r˲˧\x00˲U\n\x00˲ÂF˲~\n˞ˊ%\x00˛\x00˚ə`˛Ĭ˛˚əɰ˛Ǐɖͭ˛Ւɖɥ˚ə`˛Áɖϩ˛Я˦ɖ˶˚ɚ]\x00˛ʑɖѩ˦ɖҫ˚ɚ]\x00˛;˚ə`˛j˧ɜࣿ⠋2ɐ\x00\x00˚˛\x00˜\x00˝\x00˞\x00̅\x00̆\x00̇\x00̈\x00̉\x00̊\x00̋\x00̌\x00̍\x00̘\x00̙\x00̚\x00̛\x00	˛ɏ\n˜Ŵ˝Ŵ˞Ŵ˜ˡ฾˟8˜Dˠ˞O˞˛ˉˡ˝˜\x00˞7˜˞\x00˞ඩ˜˛3˜ˢ\x00\x00	\x00\n˛\x00\x00	\x00\nˣ\x00ˢ\x00aˤɑ	˜Jˣ\x00ɞ೥DǐoəĨ˥(˟eˡ@ˣ˜\x00ɜʣ˜Dǐ˜oɜ˳ǐɈÄəĨ˦(˧eˡ@ˣ˜\x00ɜʣ˜Dǐ˜oɜ˳˧8˜Dܐ˜o\"˨ථ˚H˜q˜Dक˜Dŋˉ˩əəɈ˜Dɖңˡෑ˨ăˤ̌˪\x00ə\n˥ɖď̓\x00̋|˛U\r˥ɖãəəĨ˫༭˜DӘ˧ɚׁˮʹ˧əฒə˜okˡЏˠ̴Dɖࡡ˯.˰؍˷഻ˡ\rəəৗə˜o\nˡ\r˱๣ˡ\rəɞɖ˩޸əɞඥˡ\r˫\n˥ɖԹ˪\x00ɥɛ˩࡮ˡ\r˪\x00ɥʱ˫ۺəɥ ˡ\r̔\r˲\n̕ࠆəɛǎˡ\r˜D\"ņÀˡ\rəɚƱ̄ș˴ೳ˵೅ˡ\r˶ऊˡ\r˜Dɖࢅəɜϊˡԧ˨ăəɜ୒əɡ˧̓\x00̋|˩ೡˡ\r˪\x00ɠ͔̔\r˸\n̕৘ˡ\rəɠͻ̓\x00̋|˩วˡ3˹୻˜o\x00əkˡ\r˽\x00\n˩مˡ\r˪\x00ɢߡ̔\r̛©˫\n̕ݕ˭ৣˠ\rD\"ɖಷD\"ĻÀ˜D²˰ˬܘ˰ˬˡ\rəɣফ˜qə๳˜DņÀˡ\rəɚດ˜D\"ɖվ˜D\"ɖ֌ə˜o\nˡʚ̓\x00̋|˩˭əɡਖˡh˜Dʄˡ\rəɚƋ˧Ŋˡ\rə̩̄ʫ˦əǭəɚą̓\x00̋\n˩ˬˡ\rəəħ˜D9ŋÙ˜D\"ɖɬˡ\rəə˼˜D\"ŋĢ̄\n˧Ŋˡ\rəɚư̄ɮ˥ŋrəɚß˧ə˝ˡ\rəɚą̓\x00̋ĉ˩ف˜o\x00ˡ\rək˽\x00\n˩Ԇˡ\rəɛǎ˜DņÀˡ\rəɚƱ̄ș˴ൕˡ\rəɜۚ˜Dො˜o\x00ˡ\rək˽\x00\n˩Ԇˡ\rəɛǎ˜DņÀˡ\rəɚƱ̄ș˴Ɗ̓\x00̋\n˩ࠊˮˠ\"ɖϫˡ\rəɚѨˡ\rəəഃ˦ɛ¯əɛܪəɡɛˡh˜D࢑ə˜o\nˡ\r˩۲ˡ\rəɚƋ˧Ŋˡ\rə̩̄ʫ˦əǭəɚą̓\x00̋\n˩ˬˡ\rəəħ˜D9ŋÙ˜D\"ɖɬˡ\rəə˼˜D\"ŋĢ̄\n˧Ŋˡ\rəɚư̄ɮ˥ŋrəɚß˧ə˝ˡ\rəɚą̓\x00̋ĉ˩ऒ˟߳̄హ˟ɖੁə˜o\nˡh˜DʄəɚƋˡ\r˧Ŋˡ\rəɚư̄ʫ˦əǭəɚą̓\x00̋\n˩ˬˡ\rəəħ˜D9ŋÙ˜D\"ɖɬˡ\rəə˼˜D\"ŋĢ̄\n˧Ŋˡ\rəɚư̄ɮ˥ŋrəɚß˧ə˝ˡ\rəɚą̓\x00̋ĉ˩ߢ˦əǭəɚą̓\x00̋\n˩ૌ˯̄ș˥ɖ¯əə·˫˰̓\x00̋|˩˱ɑ˨ă˜D݀əॽ̄જ˩˲˧ɛಉə˜okˡʚ˥ɖی˜Dɖָəəܩ˟ɖ०˜D\x00˜o׽ҩ ɖ֔\"ɖƨ˜D²əəÉ̓\x00̋ഢ˜o\x00əəũkˡ\r˽\x00૜əəÉ̓\x00̋࠴˜Dɖܧ˧ॣəĶ˜okˡ\r̓\x00̋|˛U\r˥ɖãəəď˫শ˥ɖȬəəɈ˜D ɖң̓\x00̜̋˥ɖȬəəɈ˜D ɖշ̓\x00̜̋˛U\r˥ɖãəəď˫˳˥ɖďəəÉĕ˜D ɖ׹	˥˥ɖǋəəࡆ˜Dɖ˜ˡ\rəʢ̄દ˼޵˥ɖãəəĨ˴\x00̖\r˟ԭ̄Н˳\n̖\r˷\n̗\r̗˵\x00əɟǬˡʹ	̄Н7̔\r˟ԭ̄෥˜Dɖ༸ˡ\rəɡǾ̓\x00̋ĉ̖\r˥ɖƭəəħ˜D ŋÙ˧ɦ෯ˡ\rəɝ؏˧əДˡ\rəɟ࡜˜DņÀˡ\rəɚૐ˧ۈ˧૭ˠ̴D ɖ೰ə˜okˡࣸ˜D਑˧əДə˜okˡ\rə˜oə˜o\nˡজəəðˡ\r̓\x00̋|˥ĸrəəౖɉ˜ouə˜o\nˡ̆ˤ˜o߆˴j˥ŋrəɚß	̕ń̗˶˪\x00ɠǾ˫\n˟ɖࡎəɞƹˡ\r˫ȉ˷̔\r˥ɖƭəəħ˜D ŋ̳˟΁ˤń˫əɚßˡ\r̕˸˥ɖƭəəħ˜D ŋ̳˟΁ˤń˟ɖ೑əɞ๎ˡ\r̓\x00̋|˥ɖ¯əəҐ˟ɖ੺əɜǾˡ\r˥ɖ¯əəҐ˫əɚßˡ˹əଏ˷\n˟ɖܟəɣȢˡ\r˟ɖݳ˥ɖďəəÉ̄ֳ˥ɖãəə୙˷ĉ˟ɖࡏəɞՋˡ\r˷ȉ˺̜\x00̝М%ˠ\rD\"ɖ൓̜ə˜oə·ˡ\rˡ\r˼̜\x00̝D\"ɖ̜ࠩə˜oə·̄̜\x00̝\nˡ\r̜əəĔ̓̜\x00̋ຓ̜ə˜oə·̄̜\x00̝ࣨ˜Dभ̜ə˜o\nˡ\r̄̜\x00̝ޠທ̜ə˜o\nˡ\r˥ɖ¯̜əə·˼̜\x00̝ӓ̜əəðˡ\r̓̜\x00̋|˥ĸr̜əəǬ˥ɖ¯̜əə·˼̜\x00̝Ɗɉ˜o൛˜Dɖ̜ࣛəəÂˡߎ˻\x00໪˜D\"ɖͮəəÂˡ˜D\"ĸĢ˼\x00˼\x00М	\x00	əųɛُ		ə+	Ō\"	඘˜DӘ	˜ouə˜o\nˡ̆̄\x00ӓˡ\rəəð˻\x00\n˥ĸrəə฿ˡ\rəəå˺\x00\n˥ŋrəɚ๱ə˜o\nˡ\r̄\x00Ɗɉ˜oə˜o\nˡ൹˟ɖࠢˡ\rəəĔ̓\x00̋ৎ˽\x00ࡓ˼\x00L˜D ɖ௷əəÂˡඇ˾ˡ\rəəÉĕ˜D ɖ֭=࠰˥ɖຩ˜Dɖ২əəօ˜Dɖ˜ˡ\rəಋ̓\x00̋ݮəəďˡ˿\x00	ĕ˜D ɖު	˥˥ɖǋəəҹ˟ɖ೟ə˜o\nˡց˟ɖڽ	ə[̓\x00̋Ž̑\x00	̀\x00	\x00\n\x00˥ɖƭəəåĕ˜D ŋਟ7	˥ɖǋ		D9ŋăəə֟ϰ˜DŋĢ\n˜D\x00˜o\x00	ˠ\r˧ə৞	D௸əkˡॾ\nӅ	Dɖғ	Dŋݣəə·̄Ƽ\nӅ	D ɖż	D ɖఃӯ঑ˡ\rək̃\n˴Ƽ\n૦	Dɖඑəə·̄\nˡ\rəəĔ̓\x00̋Ƽ\nɖٺˡ\rəʢ̓\x00̋Ƽ\nņÙˡ\rəɚƋ˜Dɖƨˡ\rəəð̓\x00̋|˥ĸrəəϽ̃\n˴թ\nɖƨˡ\rəəð̓\x00̋|˥ĸrəəϽ̃˜DɖѬ˴»˥ɖ¯əə·̓\x00̋෣əɚßˡ́ˡ\rəəðĕ˜D ĸÙ	˥˥ɖǋəəҹ˜DĸĢ˜Dɖ˜ˡ\rəʢ̓\x00̋˜D ɖฏ̓\x00̋̀ˡ\rəəθ̂ə˜okˡఖ̓\x00̋|˜D ŋă˥ŋʚ˜˛Â\rəɚ˅˜oL˜Dɖ࡞ˡ̆˥ɖ݌̃˜Dɖé˜Dжɉ˜oə˜o.ˤ\rˡ̄\x00	\x00\nÃ˟ත˜D9ɖ୍ˢɤ฼	˜o6	\"ɠЧə	\nˡ3	S\n̌	ව\nzǉ\n0ǉ	\ň	\nP	๷̚\\	\n̛\\	\n̛v	\n\x00ə\n\nˡ3\nS̅ɖ,̆ɖŃ̇ɖ̈̈ɖỂɖĐ̊ɖĺ̋̌p̍ڑ̎\x00	\x00\n\x00\x00\x00\r	œ\n̛]Nə+-Y	YɼJzǉ7̚\\mϯ\nvmqzǈ7\rd,\rzǉ7̚\\\rm\rϯ\nv\rmq\rə໓\rəƪ	ຕ	öə+-̏ŝ̏\x00	6zǉ=̙\\mѡzǈdN		ə+	-̏	Ҡ̐ʯ=©]̑\x00	əࠤ	0ǈə{Ŧə^\x00ə\nə	ȉ̒\x00\x00	\n\n0ǈə{Ŧə^\x00ə\nə\n\n\nY©\nD	\x00̍ə\n̓\x00\x00	\x00\n\x00\x00\r\x00\x00\x00\x00əཊ˜Dך\rˠ˜o\"əנ\rD\"ɖೊ\rDȂ\rD\"ɖé\rD\"ɖЧəĶ˜okˡ\r̓\x00\x00	\x00\nʹ˜o\"ɛౙ\rD\"ɖȄ\rDȂ\rD\"ɖǞəĶ˜okˡ\r̓\x00\x00	\x00\nˑ̄๺ə˜o\nˡு̍ə[̀L˜D\"ɖѮ̍əö̍ə+-̍D\"˒D\"ˑ	Yࡁ̍ə[́L˜D\"ɖѮ̍əö̍ə+-̍D\"˒D\"ˑ	Yডˡ\rəəÉə[˿\n˥ɖãəə༌ˡ\rəɛǎ˜D\"ņÀˡ\rəɚƱ˴ୄ˵୩ˡ˜Dɖϫˡ\r˦ə¯əɡߍəɥ͆ə[̓\x00̅Ž̑\x00\n˜DɖѬ˾P̒\x00\x00˔੣əĶ˜okˡ\r̍ə[̓\x00̇༎̍əö̍ə+-̍D\"˒D\"ˑ	YրəĶ˜okˡ\r̓\x00̇௥̂ൂə˜okˡ\r̓\x00̋ڐɉ˜o˜D²̄૩ĕΪ˜Dಯˡ\ȓ\x00\nəəð̓\x00̋|˥ĸrəəǬ̒\x00\x00ˑ࣬ə˜o\nˡ\r˜DȂɉ˜oə˜o\nˡ\r̒\x00\x00˒˜D\"ɖƨˡ\ȓ\x00\nəəð̓\x00̋|˥ĸrəəǬ̒\x00\x00ˑඌ˜o\x00ˡ\ȓ\x00\nə\n˜DȂɉ˜oə˜o.ˤ\rˡ\r̒\x00\x00˒୽Ĕ_̑\x00\nəŨY	YɼJzǉmə༬̐̛P˾\n̒\x00\x00˓ڧĔ_ə˜o\nˡࣅĔ_̂Ɗ১ĕΪ˜Dඁ˜q֝Ĕ_əŨY	YɼJə˜o\nˡ౷Ë_˜oɠ೐əĶ˜oڷə˜o\nˡ\r̓\x00ْ̈Ë\n_əɢ˛ˡ\r̓\x00̈଩Ë_̖\r̎\x00\nə༻ˡ\r˜Dɖ˹˷.̓\x00̋Ž̗൝Ẻ_ˡ\rəəϝ̓\x00̋Ž˥ɖ¯əə·̓\x00̋ຟəจˡ\r̓\x00̋ుB̊_əŨY	YǑə˜o\nˡ\rə[̓\x00̊Ž̑\x00\n̒\x00\x00˕Ɗ֞	˜DɖͮəəÂˡ\r̓\x00̋ಫ̔̘ə̛\n̛0Ǌ̛̕̛̘ɚ੥̖̘ə̚\n̘ə̛\n̚0Ǌ̚\n̛̚̗̛̘ɚљ̚̘ɚఛ̘4̙0Ǌ\r̚̙\x00̛̙\x00	Δ=̓	\x00̋յ˟܄˫	༞¢̙\x00Ç	\x00̌\x00É̍Ѡɑ%˚\x00˛˚4˛ຬW\x00ə̮˛ব˚˛d਒˚˛!}ɒ˚\x00˛˜˜˚౓\x00¥˝\x00w\x00	\x00¦\nə˝˚̐˛ڕ˛%\x00˝໗˚Ֆ˛\x00\n˛#F	%ÿw?ୃɽ෿\n\x00	˚\x00˜Ȝ˛	˛˜	-	˝3}Ě\x00˚\x00˛\x00˜\x00˝\x00˞\x00˟\x00ˠ\x00ˡ0ʉ෱	\n˟Г\x00ˡˠ¦\x00\n½	\x00	\x00ˣ\x00ˤ\x00\n	pۓ	ೢَ	ؼˠɒ\x00\nˣˠ¥\x00ˤˠw\x00\nˤ\x00	¶˚\x00	³˜\x00	¼˛\x00	®ˠఘˠr	Æˣ\r	«ˣ\r	M˥3	~˥%\x00\x00	\x00\n\x00p;ˣ\rˣ\rNˤ\r	ˣ\r\n0ɔ	ॵ	-\nԍ˥@	ˣ\r0ɔ	ƿ	-˥@.\n\x00¸F}ˢ\x00(৮Ҟ༢ν෻,͝೬,A೯๡,AZ؞೏,AZ࠾ࢩ,AZ¦ٛએ,AZ¦þା൳,AZ¦þĈԫ\n\x00ˣ\x00ˤ\x00	\x00\n\x00˥\x00\x00\x00\r\x00˦\x00\x00M\x00ˣ¶\x00ˤ¼\x00	³\x00\n®\x00˥ɑͅ	î-˧	ӫ\r൸	ʔ୲\r\nՖ\r׬˦0ɔ;\n˦Èʈ\x00˦Æʈ\x00˦«˟\x00\n\n4؝ൖԖľ˦\x00ͪ˦.Nуî-˦˩NˡN\n˪yNȜ½Nî-˧ŝ˧Ī\n౧˨௡˨\x00	\x00\nʳ		î	-\n̐	\n\nํ	੿\n೨	ఱ\n֣	ຄȈ˩ˬ\x00˭8~%\x00\x00	\x00\n\x00\x006ˬʻ˥W\r˥W\rý˭Aǚ˭׳40ɔˬ;\ný˭ٟǚ˭઴ӫ	ˬ.N\nу\n	î\n-\n˩	\nj੡ľ\x00ٵࠃˬN෢ˬNˡˬNP˪ˬyˬNȜ\n¦þˬ7˥\n˥ͩ୷}˪\x00\x00	\x00\nˬ\x00\x00˭\x00ˮ\x00\x00˯\x00\r\x00˰\x00˱\x00˲\x00˳\x00˴\x00˵\x00˶\x00˰N\x00˱\nZ˲\n˳\n,˴\nA˵˥W\r˶¶ˬˬ	ˬR˰ˬW૧࣏ࠜ੉˵˶ࢦӌ˯˰)ˬˮ˰)ˬ˭˲˯q൱˵˶!˟˰)ˬЊˮ˰)ˬ˵˶Ĥ7ˬ#ˮɠ˶́૽չ˰ˬϵˮ˰)ˬˣˮ˰ˬ\x00˵˶!.ొ˭˵˶˵˶!.ඤ˵˶˭˵˶˵˶!˭˟˵˶˵˶Ę\x00˵˶!.࠷ඉ˶ù˶\x00\r˭˭ˮ˵˶!˭˵ǃߞ˵˶˵˶\x00˵˶!.ݶ˵˶!˰)ˬʷ˵˶˵˶Ҕ\x00˵˶!.٨˵˶˵˶Ɓ\x00˵˶!.ୗ˵˶˵˶ঃ\x00˵˶!.ଗ˶Ȏ˶\x00\r˭ˮV˵˵Ά\r˰)ˬˬ¡\r.୧౺ഹ˵˶૾෭˵˶ࢉ஽˶ȝ˶\x00\r˭˭ˮ˭˵˵x˵Π˵˶ৢ৪་˵˶\r˭ˮ༏.ഠ\n٣ˬ	.໴\r˰)ˬˬ#\r»˵˶˵˶ʺ\x00˵˶!.ँଃ˭ˮՏ৽˵˶˵˶ґ\x00˵˶!.ࡂ\r˭˭ˮ˭ൣ˶ù˶\x00\r˭ˮV˵ǃӨˮ˰)ˬ˭˳.ਘ\r˭˭ˮ˵˶!˭ԧ՝˵˶˵˶Җ\x00˵˶!»˶Ȏ˶\x00\r˭˭ˮ˵˶!˭˵˵Αईಅਲ਼˵˶˵˶ʕ\x00˵˶!.࣐˵˶˵˶Ѧ\x00˵˶!.ම˶Ȏ˶\x00\r˵˶!˭ˮV˵˵Α˵˶!˳˰)ˬ҆สөˮ˰)ˬ˭˟.ࢵ˫\x00˰)ˬ˰)ˬ\r˰)ˬ˰)ˬˬͺ˱\x00\n\n\n˹ˬ	ˬ#\r.඾˵˶\r˰)ˬϥˬ#\r»˵˶\r˭ˮ͗.ҟ஍˵˶!˦˰)ˬ҆ढˮ˰)ˬ˵˶!˩¸ˮ\nร˶Ȏ˶\x00\r˭˭ˮ˭˵˵Ά˰ˬǔˮˣ˰)ˬĖ˰ˬˮ\x00˭˵˶qน\r˵˶!˭ˮ౻ू˵˶˭˵˶ƚ˭*ԃ˰ˬǔˮ˝˰)ˬĖ˰ˬˮ\x00˭˵˶˟˰ˬϵˮ˰)ˬˤˮ˰ˬ\x00˵˶!.ੲԈˮ˰)ˬ˭˱.ຍˮ˰)ˬ˵˶7ˬ#ˮɠ˶́ಾ˯˰)ˬ˵˶!˲˯U˰)ˬԽ˶ù˶\x00\r˭˭ˮ˭˵ǃ֪ೕ˰ˬηˮ˝˰)ˬĖ˰ˬˮ\x00˵˶˵˶!ˮqণ\r˰)ˬ˵ǉ˶I\r\x00˶\n˶¡\r\x00\r˵˶!ˢ˭ˮಿ˯˰)ˬ˵˶!˴˯U˰)ˬԽ˵˶\n๒\nŞ\x00ˬ	.ӛЍˮ˰)ˬ˭˦.ߛ˶ù˶\x00\r˵˶!˭ˮV˵ǃڢ˵˶!˱˰)ˬЊˮ˵˶˭˵˶q୿˵˶˭˵˶ƚ˭ˣ˰)ˬѾ.ౝ˵˶˵˶ࠒ.୸˵˶\r˭ˮ»˵˶˭˵˶ƚ˭˝˰)ˬѾ਽گࣁ˵˶\r˭ˮ\x00˵˶!ད˵˶˵˶ੋ\x00˵˶!୤˶ȝ˶\x00\r˭˭ˮ˵˶!˭˵˵x˵ۗ˵˶ܶף৺˵˶˵˶̪\x00˵˶!ભ˰ˬηˮˣ˰)ˬĖ˰ˬˮ\x00˵˶˵˶!ˮм೽\r˰)ˬ˵˶ˬই˯˭ˮ˯\x00˪\x00ˬ\x00ˬ\r\x00\nL\n؅ˬ	תˬ#\r଍ˮ˰)ˬ˵˶Ĥ	ˬ#ˮࡍ஥༦˵˶!˭ˮՏؚ˶Ǻ˶\x00\r˵˶!˭ˮV˵˵x˵Ĝ˵ˈ੄\r˰)ˬ˵ǉ˶I\r\x00˶\n˶¡\r\x00\rˢ˭ˮ˵˶ඪਯ˵˶\r˭ˮુ.ཀ˵˶˵˶ҕ\x00˵˶!.ॴ˵˶ܫ˭ˮʷ˶Ǻ˶\x00\r˭˭ˮ˵˶!˭˵˵x˵Ĝ˵ਠป੮ݯ˵˶˵˶ࠁ.౔˵˶\r˭ˮຊ.۳˵˶೉˭ˮʷˮ˰)ˬ˵˶˵˶!ˮqखೲ˵˶˵˶ວ\x00˵˶!.౥˶Ǻ˶\x00\r˭˭ˮ˭˵˵x˵Ĝ˵ˈਤ˵˶˵˶൮\x00˵˶!»˵˶\r˭ˮǤ.܅ૅ˶ȝ˶\x00\r˵˶!˭ˮV˵˵x˵Πߵ˵˶˵˶ೀ\x00˵˶!.ਗ\r˭ˮ༶ˮ˰)ˬ˵˶!ˮq֥ˮ˰)ˬˮqણ\r˰)ˬ˶¡\r\x00˵ǉ˶\x00˶\r\n\r˭ˮߺ˭\x00̯˯˰)ˬˮ˰)ˬ˭˴˯˟˵˶˵˶඗\x00˵˶!ॱಛ࣡ˮ˰)ˬ˵˶ˮqۤ˶ӊ˶\x00\r˭ˮV˵˵x˵Ĝ˵ʴ˵ԅׯ˶Ǻ˶\x00\r˭ˮV˵˵x˵Ĝ˵ˈ੬˭ˮӮડඝ˶ӊ˶\x00\r˵˶!˭ˮV˵˵x˵Ĝ˵ʴ˵ԅൢ˵˶ˮ˰)ˬ˭˞ˮ\r˭\r\"ɼ	\r˰)ˬདྷˬ\x00ˬ#\r.ࡰ˵˶˵˶ŀ\x00˵˶!؆˶\x00˭˵\x00ˮ˶༉ക˵˶˵˶Ę൩˰)ˬӮ଄ഩ˵˶˵˶!७ࠖˮ˰)ˬ˭˵˶q਷˵˶˵˶ݢ\x00˵˶!.য˶ȝ˶\x00\r˭ˮV˵˵x˵຃˵˶˵˶̬\x00˵˶!ݖ੼ؤ˭ˮǱພ˵˶˵˶҉\x00˵˶!.˭ˮீ˥˵½%˰)ˬҟӌ˯˰)ˬˮ˰)ˬ˭˲˯qӨˮ˰)ˬ˭˳.өˮ˰)ˬ˭˟»˰ˬǔˮˣ˰)ˬĖ˰ˬˮ\x00˭˵˶qӛԃ˰ˬǔˮ˝˰)ˬĖ˰ˬˮ\x00˭˵˶qԈˮ˰)ˬ˭˱.Ѝˮ˰)ˬ˭˦»ˮ˵˶˭˵˶q̯˯˰)ˬˮ˰)ˬ˭˴˯qֹ˶\x00˭˵\x00ˮ˶»ˮ˰)ˬ˭˵˶Ҡ˫\x00\x00	\x00\n\x00\x00\x00\r\x00\x00\n¡	\x00	¡ɉ˪\x00\x00#\x00´\r\x00˪\x00\x00	\x00௕þ¦೺#	\x00˪\x00\x00\n\x00\n൶ุ\x00ŞॳěҭÅZÅJɖຌɖؔɖಣɖঙɖഊɖ४ɖोɖసɖ૏u	~\x00	ŉəŻƁ˘ə+ԥiəƌ	ÿiÅ}#əЇ	əțɖΎuŞ	əΞɖٓ%\x00\x00	\x00\n\x00\x00\x00\r	ÿi\x00\nÿe\x00ə¦	əɖࣺ	əƙɖбɖ$ɖů-	əଶ	̪ɖΎuŞ	əΞɖ௟	Ş	\n	əʣɚ׊}Kɖ൧ɖࢎ	əޥ}Kɖਗ਼u	\n\nə[0ɔKɖ৭ŵ\r\nï\rQɖ±ɖ\\\rQɖɖ\\\rQɖɖ\\!\r$ɖѴ	\x00	\x00\n\x00\x00\x00\r\x00\x00\x00\x00\x00\x00əȏÿe\x00ɚZ\n,AZ\r͢Cɖण-EɖٍIɖԔIɖٴIɖ޴IɖŒǙෳQɖ๜&\noɖഺ\nQɖѐCɖζ&$༰$\r.Cɖৡ\rCɖ൏&$՗$\r՗$\r.Cɖत\rJ	&ݪʣVɖൺ\r\x00\r\x00&oɖઋQɖ \n\x00\n	್˷\nǦඋͰǦఀ³Ǧڀল\rǦఉࡦ௜Ĝ˚˛\x00˜\x00˝\x00˞\x00˟\x00ˠ\x00ˡ\x00ধ˛˚ə௚˜˚əɻ˝˚ə຋˞˚ɢద˟˚ɛ໷ˠ˚ɚธ˚ɦի˚ɦ௺˚ɢ஗aˡઝɖ݅˚ɚ۸˚ȵ˪ɜϿ˜\n ɼ	˚əɸภ	aœ˚\x00ɦźjʶ\n~\nČˡÅt༘\nəɚߝ\x00\nəɚࣰ\r~ˢ˭\x00ˮ\x00˯\x00˰\x00˱\x00˲\x00\x00	\x00\n\x00\x00˲ࡃ˰˰Ζ˰ƅ˲tˣ˭\x00ˮ\n˲tÁˤ˭\x00ˮ\n˲t©˥˭\x00ˮ\n˲t˦˭\x00ˮ\n˲tµ˧˭\x00ˮ\n˨ə˲\x00˭\x00ˮͩˮ ɼมHˠH˲tɼ˲tຨ˰࠽˲ɤՅʡ\r\x00ɖଂ˲t\x00	4\n˲tӚ=ԛকѦɼ		҅	৖ɼλ	ߔ	=	ґ\n7\n	ޭ ɼH˱ɼ˱ख़˲ɚǍ˭\x00ഭ˯əƓ˯\x00ό\rˢə˲\x00˭\x00ˮ\x00˯\x00˰\x00˱ˣ\x00Ӽ ɼ=˜˩˜\x00\x00ˠ˪\x00˜´	Îˤ\x00(˟͘ ɼ=˟ɛǶ\x00ˠ˟ɛ´	Î˥\x00	6˞Ϲ	˫ ɼ=˞	U̓˞	U߶\nÎ˦\x00(˝͘ ɼ=˝ɛǶ\x00ˠ˝ɛ´	Î˧\x00	Ãɮ֗	ˬɚǽəൽ	ɞં	əƢɥԲɞ࠱ ɼʻ	ə:\x00\n	ɤຳ࠭	ɛ̃D	ə1ཋ\nÎ˨˭\x00ˮ˯\x00\x00˯٧ˠ7²ˠəóɚ˒\nɚԎ\n\x00ɣŗ\x00ˮ ɼ	ɚǧɚǧ\r٢	ʾ\nʾ\x00	əɿɚҀ	ɢ̦ɚߟəด\x00	\x00\n\x00əɿɚҀɜıɝɆɚڈ	ɝӣɚɻɦȊ\n	ɛžɚ˛\nɠ༿˭ീˮ܁ɛ௠\r\x00	\x00\n\x00˰əɿɚ঺ɜıɝɆɚ౩˯tɼɔ	ɝӣɚϒ\n	ɛžɚ˛˰\nɚ­˭\n˰ɚǧ\nɛ૯˰ɚூɼ	˯tɼ˯t˰ɚ஌ɢ༝˩\x00\x00	\n\x00\x00\x00\r	˚ɝ༖	Lɮlə\x00əęə਻ɖĽɮlə\x00ə൴\nɮlə\x00əęəĔ\nɖň\nɮlə\x00ə༂ɮlə\x00əҫ\nݥ\rʀəy\n\n ɖň\rʀə\x00ѝ\nயəęəÜ	\rəęəÜ	FࡱəęəÜ	˪\x00	\x00\n\x00\x00ȃ əದ	ə̡ɮÐə\x00ʔɡ؎\n\nə+\nR\nпɮ¹əߧɹəǮəથɮlə\x00	ऄ˚ɟ^ɹə\x00	ə[ə໛˫ʞə˚əōɛƒʔɤսˬ\x00\x00	\n ɼ˛ɚ\n˛ɚ.\n˛ə\n\nəƢɛǗɚƴ\nəƢɤԲɟÊ	\nəڌP		˛əıəŶ\nǯ\n˜˩˜\x00ɜϿ˚əϒ˚əɸ˜\x00\x00	\x00\nˢəӢ\x00ɼ\x00\x00ɼ\x00	\x00\n\r\x00ˢəӢ\x00\x00ɼĝЉdə׭ĞЉmğܮČb\\ࣚǷɝżฯɛٱb\\ּÿ\\ொ]࢞ূb\\ࢪ]jছ\\ۮĠ%\x00NՆv͚j֚ചöՆ\\͚b\\ਸ਼ޮə+ԥŁsʽĩĦ&ɰɮʟʉûʞɮѓʐɚԿĦʋʊƘə೙ě@͆ڎʁʞĦʡʆĦʋɮŧĦʐ>ɲɯÛɮ୴	ʎɔəə̸ĦɶʄɮÛɵझʈēĮȤɽəƤʕʣɚএʙʟĦɷɮ˪	ɮͪɖŃɖƐɖൈʤપĦɽʊɮЮʋəງɮţɮϓɮॅĦʌɮܠɮȐʐɥ˰ɾÛĦ	ĥ೿͆ׄĦʝHʖʟɮ܉ĦɾɮͬĭȤĦ	ĥƄɮѓĪɚ౼Ħɮ࢐ɴɹʃʣຢĦʣɮäĦ§ʅHɯʠÆʒʈĘĦʞɳʀʐəέÿ@ĮĦʤ>ʘɶʁɮอɮ܂ɮȐĪɚêɓ౳ɔઓĥʧɴəǛɲʈɚ๪ʡʈɚƟʝʣɚ҃ɴ࣢ĦɮӈɮΒʒڗɮȫəĲɮƳĪɚɂĦ	ĥʝĦɮߣʚʈĕʛəǫˌÒý@ʉ༚Ħɮණʀ	ǊəўsĠʤĢ	ʳɮÐəɡ൉ɮƳʈɛȕʫʖʈɮӐʵÛɮ̠Īɚ¢ɮЮəòĦ&ɮ஺ʡɮ๥ʋĦɮఠʂ¸ʛʐ;ʈĒɮౢ	ʘʤəəƟʞʐəАĦʝɺĦɮʆʠĥ̲ʈ݂ĥҧɮŞʌɮૻɮ๫ĦʉMɱʑĪɚ͍ĦʜMɮɜʂڜʈĔ͆दʜɵĦʏʀɮȐəǫ˙નɖiɖiɖiɖiɖฅɖێɖ࠮ɖ¿ɖ¿ɖ¿ɖ¿ɖ¿ɖ¿ɖ¿ɖ¿ɖ¿ɖ༈ɖYɖYɖYɖYɖYɖYɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖளɖұɖYɖYɖYɖYɖYɖYɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖ/ɖওɾĪɚʋĦʕɮȽĦ&ʔHʐʃƃɱʃʐəΥɹʐɚঌʎəɿəȻĦʉHĢʒMɮ٭ɮƳĪɚēĦɮऺʣɐʜMʢ;\rʭ4ʮ4ʯ4ʰ4ʱ4ʲÛĦɰʝĦ&ʁ¸ʣʔÆʖĥЦĥƏĦɸʕĢ๖ɮ࢜ĢəǛĦǪɮ݊ʎʏƃʀʦʈɠƬ˂£{˖ɢȮɢԇɥɞɤŃɡ̧ɝǓɥ\\ɣΘɤɣɞȼɝǽɝ෗ɞɏɤীɦȾɝɋɠȇɣǥɤ࢏ɠŃɥΌɡĺɢ˄ɣ͑ɟȇɣȠɟ¥ɠΘɦࣶɠȠɢȇɡ˙ɣȼɣ΄ɥĸɣ/ɞ̈ɞTɞ΄ɝȮɠͶɤÝɡȩɡƐɣ̰ɥĺɢɏɡ¥ɡųɡȠɤɡɣ¥ɤĈɤ̼ɥ͑ɠ¦ɟźɢAɠĎɡఐĬȤˊÒĦ	ĥĪʪʈəɚ\rĚབྷɗ\x00ɖ\x00ɘ\x00ʍࠚɮɵʎĦʋʉĦʟOʢOʟɳ;ɺ֊ʖરɮࡠʈɛɌĦ	ĥ˦ɮľʐəΙɮසʣɜ༱Ħʀɸɮ฻ɖʌഒ	˅?təáəēĦɮদɮҽĢɵ;Ħ	ĥǘʼÒˍÒɮŞəȻʽȸĦcʕɮݙʀ¾ġɳə×Ħ&ʟ¸ʄʔÆɮͬĦ&ɮҍɮ໔ɿƃɵĦʅʡĦǪɻϷʁMʑÆɮ˪Ĝʈ;ʈǀĦ	ĥབĦ§ɮාɷ>ʄûɮɜɮึʋəਜɳവ	ʅʈɚƵəȕĦʛɷĦcʔɮخɮଡ଼ɻɮࢫʣɚ฀Ħʞɮŧɮ೒ɖƲĦ	ĥƆ	ɮѧʙəəƟʈĖɶəƤɕɓ౟ĦʗOʈʞMɲ;ĦɮĦcɷOɮїʗƃɹɶʈɝԿɮţʗĦʠʄʡʉīȤʔʈɠ୆Ħ&ɴ¸ʋɮӶʅĦʅ>ʛĦɷʌĦɮॸɮʠʞʀʇʈɦΛʊٌʓФʚ୑ɮѷʣɠఁĦɷʑʈəʔəªʊĪɚēʕɮʠĦɻHʈHɮࠦʂ;ĦɮกɳʟɮࠓĦ&ɮົɮસʤÆɲˋÒĦĢ>ɮϓɮ͒ʣəஙˑ²˒ɖT˓ɖ/˔ɖi˕ɖèʁəäġʐəΝʡĪɚêʿÒĦ	ĥݱˈȺˀɼĦǪɮౘɮ໽ɮஂɺ	ˇʙəəƟʛʈə˚Ħɷʞ	ǊəўjğɰʈɢȕĦɶʑĦɵʐʛʈɮ͒əůĦ&ɰɮࣣɲûɺ͆ۼʠʈɣʒĦɮҍġɲɮڃʛĪɚ¢ˁÛĦǪʃOɮ໸ɮհʠĦʔMʀĦʚMʜɮŞʐəʼ%˘ɖݹɖலɖ̰ɖ༣ɖరɖքɖ঳ɖఫɖൿɖਈɖஔɖऩɖܛɖമɖݲɖݬɖຒʐɽəӠʈęɮţɷɮͫʐɛ֯ɿʐə˰	ɮাɔəəԗɽਪʟĪɚȍɮ̠ʋɚ๸ʏೠĦʤʈɮѷəŇɵɮ̢ĦɮٷɱÓʒʣ;ʋʈəʒʈȠĦʜMɾG˗ໍɖ׼ɖೋɖ৚ɖۍɖؠɖ൵ɖ๏ɖൡɖຼɖةɖোɖ௯ɖๅɖ౲ɖ๬ɖহɖکɖ߃ɖ܎ɖݤɖ઀ŉ୓ɖਔɖ໢ɖ൭ɖࢾɖ֏ɖභɖஉɖ࡯ɖ௄ɖڒɖෲɖழ˥ɮ*ɟ\x00ɥ\x00ɣ\x00ɛ\x00ʋ\x00ʈ\x00ɝ\x00ɠ\x00ʔ\x00ɼ\x00ɜ\x00ɢ\x00ə\x00ɖ\x00ɞ\x00ɚ\x00ƴ\x00ʙ\x00ɽ\x00Ƴ\x00ʉ\x00Ƭ\x00Ɲ\x00Ʀ\x00Œ\x00ʤ\x00ƛ\x00œ\x00ɡ\x00ĳ\x00ɤ\x00ɦ\x00ɔ\x00ð\x00ʣ\x00Ģ\x00ʡ\x00ʖ\x00ʛ\x00à\x00ō\x00ƃ\x00ʨ\x00Ë\x00û\x00Ʊ\x00ò\x00ʧ\x00Ƥ\x00\x00ó\x00ã\x00ƚ\x00ķ\x00ä\x00ï\x00ñ\x008\x00\x00ƪ\x00Ũ\x00ƹ\x00ʪ\x00Ź\x00ɻ\x00C\x00ƻ\x00ë\x00Ƅ\x00ƞ\x00\x00ø\x00Ư\x00ʌ\x00Ƽ\x00ɱ\x00÷\x00ư\x00\x00ū\x00Ɵ\x00Ƣ\x00a\x00®\x00,\x00\x00À\x004\x00\x00¾\x00Ʈ\x00w\x00l\x00ì\x00Ŵ\x00Ă\x00ƕ\x00ź\x00Ɣ\x00P\x00ą\x00ƈ\x00ŏ\x00Ř\x00ú\x00\x00č\x00ô\x00ƿ\x00ü\x00Ɔ\x00Ɠ\x00\x00µ\x00L\x00ƅ\x00Ŝ\x00#\x00Ƨ\x00ļ\x00	\x00\x00â\x00=\x00å\x00°\x00~\x00Ó\x00\x00Í\x00¤\x00\x00Ø\x00·\x00©\x00ŉ\x00\x00\x00\x00Ç\x00+\x00|\x009\x00ľ\x00Ā\x00Ļ\x00E\x00\x00ņ\x00Ê\x00ş\x00c\x00ŋ\x00»\x00^\x00\x00É\x00Ž\x00ƀ\x00Â\x00Ƶ\x00ŷ\x00ď\x00ă\x00Č\x00ĉ\x00ċ\x00Đ\x00ā\x00ö\x00Ą\x00Ɯ\x00ć\x00Ď\x00ù\x00Ĉ\x00J\x00M\x00ň\x00ƶ\x00đ\x00Ɨ\x00ŕ\x00è\x00¦\x00ƭ\x00h\x00¯\x00ƙ\x00õ\x00Ć\x00ŵ\x00´\x00p\x00r\x00Û\x00Z\x00Ì\x00\x00\r\x00Y\x00\x00R\x00\x00:\x00±\x00Ł\x00j\x00\x00¬\x00º\x00!\x00s\x007\x00\x00V\x00¹\x00]\x00I\x00½\x00ç\x00\x00­\x00Ù\x00Ä\x00y\x00U\x00u\x00z\x00¶\x00v\x00¢\x00m\x00Õ\x00\x00æ\x00>\x00.\x00 \x00F\x00Å\x00K\x00<\x00\x00X\x00\x00}\x00\x003\x00\x00¸\x00\x00é\x00Ň\x00-\x00\x00Æ\x00&\x00ª\x00b\x00¥\x00Î\x00\x00\x00 \x00Ú\x00ĵ\x00t\x00e\x00\x00B\x00¿\x005\x00$\x00\\\x00«\x00Ô\x00/\x00H\x00\x00\x00x\x00\x00\x00ß\x00\n\x00W\x00\x00Á\x00N\x00Ð\x00\x00{\x00\x00ĸ\x00n\x00\"\x00Ķ\x00\x00_\x00Ŋ\x00f\x00\x00¡\x00£\x00\x006\x00[\x00Q\x00²\x00'\x00¨\x00ê\x00Ý\x00\x00\x00;\x00ń\x00\x00\x00T\x00Š\x00Ş\x00\x00\x00Ü\x00O\x001\x00d\x00\x00Ã\x00í\x00\x00ʇ\x00î\x00D\x00×\x00Ò\x00È\x00\x00A\x00o\x00)\x00k\x00Ċ\x00³\x00(\x00á\x00\x00\x00q\x00@\x00Ĺ\x00i\x000\x00*\x00%\x00Ñ\x00¼\x00\x002\x00Ö\x00`\x00G\x00Ï\x00S\x00\x00g\x00§Ħ&ɮ࠳ɮथʐɮ٤ʁĪɚȍĦ	ǈəəŋĝ	ˆ˄əʈɚêĦɮୋɮòʆʣɚ३ĦʠHʎOʂ>ʇ;ɮԾʈɜ҃ɾġʙำɮƳĪɚߘ	ǉəəŋĞ͆ߗ	ɮͳʨʨəࢡʙĪɚՂĦɮؙʟɮػɮࢬɮţʐɚҏɮశɮಭɼˉÒĦʐʇĦɮ؟ɮůɱʣɚॄ	˄ÞtəáəēĦɹʒʁĪɚēʧʈəਲʨʈɣ๮ʩʐɥଌĦ&ʊɮ࡫ɮղɺ͆फĦʆϷɮༀʠʗ;þ@Ħ&ɮۦɮਞʠƃʔ͆āʾÒʈ\x00ėģɖɢɖগɖ઼ɖƟĦ§ʃÓʔʇÆʒʇʠĦ	ĥʓ͆׮ɮ഍ɯɮໂɮঀʐəॷʄںɮȫʐəаɻʈəȕ0/12͆͋34͂̓̈́ͅ #$%&'()*+,-.̴̵̶̷̸̮̯̰̱̲̳̹̺̻̼̽̾̿̀́L\nŗ	7\n8?G\rHŀŅ̟ɐ̠ɘȇƂƄƆǟǠ̡[̢_̣b̤ĥ̥Ĭ̦İ̧Ĵ̨l̩ʡ̪ʤ̫ʦʨʬʶșąċɸɺ ɼ˟ϨßȷŐÓűŦ˓ŦŷȝʎƲŤŎ¸˜'ä_ʱ¼ǭÌƢïɀĴɂKɇŦƵŦǔŦˈʒą©ĐŨʮëɈ¹ǇɚƻŦŦɹˍÕʡóʿŦŦʃƪĳĿŦŔɯĳȾƹɯĳȾʷçȍuɅ>ǉʛƠƴţ]°ƎŭƝXɡ`įżŦʇ®ĳȁŦŦbĳ*ŖŸɥʄŮŦŦĘƗǋûʂMɵįÖʸɎĳǖ˘čþÛĳ	lɊ{Eʯ|ƊǚĳNžĳǶŦƏƊƕ×2˂ŦǑWƐƅáŦƃŦǙŦ˝ĳŦº$ƊŒ¬ŦɓDƊ;ŦʶèéėƋŦûnĳŦǿ ƮIiŦƼǏɄŦǒŚ˙6ȾŦˌ-ȈTvɮüŦĽ£ǠVȓªǛđʓBķ÷ǂe%³ťĲ˖Gǀ0ƒșňȒʁyƬŢ)ŵ3¥ɣŦŅľȬɞOĵ@ƓĞłćʶŧʠSĳƷĂŽʅȉɭʬʥǊŦtɲú\nʴȀźȨñ˅ʌřãƦÝĳʧ(ĳăʚƄčɪZŇɁĳɱʲÜĳɋǪ»¦ɍŦǄǗƤŦǓæƣį5ʶŻĳęȾŦAƩĳàȾŦ:ʦĳɳūȇÐǞʗƧŦŦưʺê?ħǦǳɩğʻȴěĶƇ<ÍďǼˉɸ<ĥ<ď#o¯ʫ/Ǵ\x00ʶŘōēĳŦȪʩˏƊ±9ié±ɢˆƈŦſŦńòƶ¶īƀĳĕmʍŦʏŊʔǆɔ¢½ˑÒŦĚőŏȌĬRŦŦ&$ĳʀȾŦȎŦȟŦŦĀ·ȏĳɜɏį[rƟɐòƿʐĳǌȂįģǯʳɫHɱɌįØŦHŦsÔǐ+įɺʶıəpƾ¤ƑĳŦśɼįĤ¿ŕʑɨCʪǲĭÇȼĎĉʨʽʈĦƱǮŦŹČȶÚɗɉ˞ȱɧƽâǎŦɘ.ůȰŦƯƳȸʙŦƘÁȑȹɦŬŦÏɶ\"ŝÅ\rYȠĻ <ƉŦȞǺȆɾŦJʕƺxʆÀ˚ÞĢÄʝŲɏƊdǱƟ˒òǣʐĳǌȂįģǯşȤʾʜĜƥĳ}ĈǧįŃǤŦĆĳŦȔʵ^ɆƛÑįƫʯÆįʶƜǕɟ^ŦƂ7ŴȚƊĩöhœĮ8ȗǰʞĮȺFĳǾǩƆȲÃŦʊĳɬƊˎ˄ʶʹŦɛȧĝ!´nĳȡƸŦƂũĎǜŁįƂʶŦǮʍŦƍȢʖPǽŦɃŦȖŦfĸŦȜĸŦųĸŦƨĪɻĨƊɿŞøĺQˇĹʰŦĄËțŜǫƊǃʶ\\ȿāù$XȥŠɷįŶŦȽĳŦŀŦɤŗȻLĳˊġĳĒ˗ǢíȾŦǢȄŦǈǅŦÊ˛ǵơƔȃʘaȫįɕ±ȮįȦʶȩcȐįŦ¡ȊUɑ˔İǘÉȵìʋįŰʯ~įɑʶ«ɱȅʲįȵìɑŦgƭˀįŉʶƚŦƁĳ­ŦûɖįɑŦ˘įȭǟ4ɰĳåȾˋĳȋǍĳȕŦȾŦĔŦõȳĊǁċŦŦɽŦɒːǬŦŦ,ÙǻȘ¨ʭǝ=ÈĳôŦ˕ĳŦƖÿɠzĳŦÎȣʟˁŦȔš^ʣ²čɌįµʶƞ^Ŧʤkįƌhɝĳîjǡ	ĖĳƙɑŦɴ1ǸǨĳņÂǥǷʢwǹʯĠƊ¾wǹŦļȼįŌŪĦqŦýʉŋʼȯį§˃ðŦŽ2͂əõ̮\x00Ŕʋ\x00ɚ஖̬%\x00\x00	\x00\n\x00̯͂ə`̮ؐCɖ͕ѡ\"ɖ׃̯͂ə`̮ଚɖࢺ\"ɖຝ̯͂ə`̮Ļ	̯͂ə`̮˩	Kɖ¨ɖຖ\"ɖঢ̯͂ə`̮Ļ	̯͂ə`̮Ļ\n̯͂ə`̮˩	Kɖ¨\nKɖȖɖ¨ɖఓ\"ɖಬ̯͂ə`̮Ļ	̯͂ə`̮Ļ\n̯͂ə`̮Ļ̯͂ə`̮˩	Kɖ¨\nKɖȖɖ¨KɖȖɖȖɖ¨ɖ໏̭͂ə̮̃\x00\n̮#F!%\x00\x00	\x00\n\x00\x00\x00\r̬\r\r0ɔƿ-ņɖ൫̬̱଑ɖ/	$ɖǝ\n̬\r	෇\r̱\nǱ	ɖࣔ̭\n\ṉə\n\r.	ӏ\r̰\nǱ	ɖæ\rʥ\nǱ	ɖǄ\r˃əȭ\nəల	ɖʤ\r̈́\nம\r\"Ȫ\x00ə̓͆ȳ̀˟̮ɮਮə̊̈́#ɮ˅əÜƛɖ͉1	0బ͂ɮn͂1ʎ ɔəə̸৕0੠ɯ*#ਉ͂ÁəӪ͂৊əëɛ࣒ɖ̈́ɮn̈́Ƈ͂əƛˊɢϬǮ	ǂʋəЈ\"ɤ#	1$#ə+1ɮȁʒ1	0ੵ5̈́1	0ഛ1	0ռ̮͂ɚࣹɯ*̣	$Sͅəখ1&ɶHʋɮڣʠ1	0Ɔ1#ચ͂ɦࢨʋ஭ȟ̓ˋɡ΅ȑˊɤǰǴ&ɮn%v$͋఻͂ʥ#×0඙ˊɛәǱ1	0೤1	0߁+͆ຉ'0ɔ$1#ɯ*#ʵ͂gɞ#Ƚ	1ƃ%\x00ɮ஛ɯ*͂ɮn͂1&̓əȅɖˤ\r̮̯̰̱̲̳1	0౬ˌɛƕȭ1§ɮຆʚʔ¾ʇɯ*̧Ș͂\x00̓னȜ̓3ç%#%C͂%R&&ɮϠɱƷɖࠀ$Ä#͋Ͳ%͋Ͳ&'ˁ%gˁ%ˁ&gˁ&'Sɯ*1	0੍	#ʈɜó͂	͂ə:ɚź#1ʏHʋOɴɮδ*Ƈ)9\x00əļ͋ಽ͂\x00$#ɖ/$ʋəɚƹ%$ɚžɚٲɮǊɖો)͆à1	0զˋɞʥȚˉɛƕǤ1	0ǘ#͋ӝʈĳƶə෤ɯ*̠1	0ֻ1ʿ͂g$ƶ'1'2ɯ*̥	5͂ə:̓\x00̈́1	0ఊɮG~ʥʬɬ#ä1̈́̈́$ò	$ɮ̉%Ҭ51ɮȹʐ1	0໱1	0໻	͂'®JÍ1%×%#ʣɚ1#&།/$ə౑̈́$Ǘʀə#2\x00$əࣼ%ǁ͂ĝ%2#2%D#Dƽ&aɯ*\n1&ʔ¸ɻ>ɮ౤ʇ1	0໣1	0ெ-ȸ\r͂̈́͆Ӕ͂\x00$\x00ͅ$ə#÷ˋɥބȈ5ͅɠ#ů1ʻ	1cɮ¬ɮ¼ɖê1͂ι	ʋəıɚƗ̮$ɮ͂ə1əິɯ*#Ɯɖϧ1ɶMɮɟ0̙ы	͂əõɮnͅ1	0୕0ৱ͂ɹə͂y#1#ç%%$%R'%ɮfə!൐1	0ೱç%#$%ć#R͂#Ǥ̓%Ź0౗#̓òˊɛƕǫˋɟԘȂ&#ɖ	#əóɚǓ͂vɮGʥۃɯ*1ɮƯ$1	0ଫ	1%DɖʷɛŋɛΒʷɝ̂ɛ࣠ʷɜ๠əఞ%ʷɼS1Ɔ̓\x00ə๩#Dɖɯ*ç##ɖî#Rɖ#եɖ#ה1	0ඊʓŧ@̈́#ɮƉəÜƛɖ͉ɯ*ɩ#ǫˌɝǰȬ$ə͆࡭Œ#ћɛ¦ƕ#A%ච&$ə#ை̈́͆Ӕ͂\x00$\x00̈́	$͂ɛङ̓g	ͅʀəͅĝ	œʋ\x00ɚǢ1Ǟ͂XȪ͂\x00̈́Xͅ$Ƶ#1͂əȟ#1	0ઃ	1ɮ¬ɮ¼ɖª	1ţ͂\x00əƍˋɠԘȕ͂(®$ɖĺIÚOJJ\x00F\x00TÍ$əǰ #ƽ̈́\r,ɮރ&\x00(\x00)@1cɳOɮ਩ʇ¾ɮŧ1#əನ\r1˭ɮۨəૼɮ¬ɮ¼ɖê\r#ɮÐəʋɚ͜əɊ1̓əŢ'Sɮ̉%Ҭ9ˋɥՀțˋɣ౦ȓ('əͧ1cɮ߾ɺʊ¾ɲˊɞҝǳɯ*%Ũ$ɯ* 0࣌͆ῧ̾#ɯ*	͂ə:̓\x00ɛ̊ʺ$əҏ5ʈɚ໿͂\x00̓\x00̈́1ʓP9(P'əɮfə&໧ˋɢǗȉɮଽɖш	1ţ͂\x00əࣟɯ*#ǁ͂	͆ơ͂\x00̈́\x00ͅÞ\r#ɮlə͂\x00ɮ˅əļ1	0໋ɜ#Ĳ	1&#ə+#ʈɚ˚$wɢ#ȻˊɚŎǵ#0ʧɜɪ0੶ɮG°ʥ౵1	0͖+ç$͂ɚЀ$Mȟ̓$$ɚպ$əͣ$ə΍Ȝ̓´%aș$\x00̓#$S୹1	0ࢧ$	1ƃͅ\x00əԉ	#$͂ə+1$%ǁ͂ĝ#Ŏ@1	0ֽɥ#࢈̯ʲ1	0ভ'Û&͆చ	#Ǭ͂\x00əܰˊɟʥǶ͆ඒ$ɂ$̓×1	0ס̈́#əҪ$͂I#	͆ơ͂\x00̓\x00̈́Þ	̴̵̶̷ˋɣǗȌ1%%೛1'ə̽1%ࠑɮG²ʥȑ#࣓$͋ӝʈɚƵĳƶəఆ$##$ʲ%aʡĝˋɣ຀Ȕ1	0ූɟ#ସ5&1	0˕1	0ࣉʿ͂ਜ਼ɮǊɖTɮߩˉɛǒǣ$%	%D#D̈́əõ̓ͅōtɚǴəşͅɧ#ƤȞ̓ˊɟŋǮ1	0ԠʈǄ5$əɌ	1ŕ͂\x00ɾ	͋ౡ̮\x00ōtəॲɯ*0࢟	#ִ͆͆୐͂;ˊɣнǮ#Ũ̈́Ϯ$$ɖग%$ɖ஝ɖê1§ʡʔ>ɴ¾ɮǛ	%Ť#4ʡÞ1ʒ>ʔ1	0ਰ':əɜ0਴1ɮȒɖ#	1͂ɼ͂೘\r̮ə:əύ͆â͂\x00ə೚ɮ೭͆ࡄ%ɱƷɖè1&ʅOʚMɳûɮͦ͂(®$ɖ¿IÚOJJ\x00TÍ1	0૳1	0њ1	0ʓ$̬@#ɯ*̓ōtɚǴɮ¨̓1ɮƯ&ɾəɲ͂\x00̓;#৯1$əȟ	ʋɛՈ͆ċ͂;1§ɳÓɮݛɮଉʂ	ɔəəƣʎˋɤ౎Ǿˉɝƣǩʷʈə੅ʸʈɛ଀$a1&ɵOɮ౪ʏûʠ\r̮ə:ɜج͆â͂\x00ɜ৲ˉɛәǙ1ʧ1͂\"əŢ1&ɻ¸ʡɺÆɮǀ%mɖä$ə݆Ǘʀə%2\x00ə۪əຶ&Ұ&!@$͂ə+ˉɞ̤ǥ1ɮϔɮª̮ə:əTƻōtəغ',1	0ܝ1# ɖ1	0ଭ1	0׋	)ɮ̉'\x00(Þ1	0Ƅ	1#Dɖèʈɚ̾͂V#\x00$ɯ*̢1	0Īɪ#ª1	0ാ1ʚ¸ɮܴʠʋ;ɯ*5ɮय़##əõ͂1ɮȹɵ1	0ਡ#$͂ə͂əȘɖªɯ*ʍʥ͂ɝ̓͡Þ\r͆ړ#\x00ɮn$2Ƈəص	1͂͂əƬ\r̮ə:ɚЃ͆â͂\x00ɚઁʈɛǁŌ1͂#ɮ۞0ಹ[Ųƃ)\x00+Ơƃ)\x00,u)ɹə)\x00+əՓ)Ƈ)\x00ɛ͍*)ò)Ɨ)A(๰ɮȒɖত'ə࠘'əΈ'ə%j-څʖ*ÁŒ)u%&˷əÜ)໚%ಟ.ɮǊɖ౯-ଓɯ*̪5ʈəó͂\x00̓\x00̈́1	0෮\rʈəͣʈə΍Ȝ̓ç%%ɖª%ć#R͂#Ǥ̓%Ź&%òɛ#ʬˋɥȗȀ͆੦$÷ˋɣएǿ$#əӠ̮ə:əTƻ'2Ä',#͂̓g1%Dர1ɻMʛ1&ʂ¸ʒɮӶʡ%͋ݝ͂1ɺ>ʊ	$ɚZ%ɚƤ	%:͂əƬ#Ƈ͂,əĔ$4%͆Ե,ɟӺ	ɮׅə]#є̓ƌ\r̈́ɮn̈́y%\x00͂əƛ\r%&$$2Ơ#əő͂̈́ɮnͅy%\x00͂əƛɯ*ˋɟୢȇɚ#×ɯ*̡Į͆Ņ̮ࠥ#1# ə઄0̲1#Bɖ	ʈə஑ɚଅ͂'Ũ%͂(®$ɖiIÚOJJ\x00F\x00TÍˌɚŎȮ͂ə:̓\x00ɮn̈́и͂ə਄ɘį$ৼ1	0ఽ#Ɯɖɾ1	0િɯ*Ȝ͂ɗį͂1	0෬1ʂÓɴɐʚʂ;ˊɣͿǮ#ʛəʈ\x00͂ʽƧ\r1ɮ<ə͆â̮\x00ɚൟ	1$ %25ɮ̶ɜʠ1#׷1ʈɚő#ɮ<ə͂əƛ	5͂əɘ͂ɛѹ1&əȟ͂əõ̓1	0௶1	0ק͂ə­#͆ഝ(1	0ʙŐ@ͅōtɚǴɮ¨ͅ1ȝ͂ˋɦͿȊ	1͂Eˁə+1	0،1%ɯ*̨\r̮ə:ɚ˄͆â͂\x00ɚϺ	͋í̮\x00ɮɣ,#ˁə+ˀ͂1	0ܾ1cʅɐʚ>ʠÆʚ̈́#ə³$×	5ʈəó͂\x00̓1	0ښ$Sͅ1'	͂ə:̈́\x00ͅ%ˋɞŋȄ	̮ə:əT+ɦ#Ǜ1ʈɜƘɮGʥä1ʷ%#$g͂(®$ɖȩIÚOJJ\x00T\rÍ1ʪ1ʈɛൠʈɚܭ1͂̓g$S#ͅɯ*1	0ԑ1ɻÓɵHɴɺ;ˍɛǒȰ1	0܃#wə#òˍɛƕȱˋɣƣȅʫ͆͂ɮ͂(mɖਁ\r5#2 ɼ	#2̓	#͂ə1̓ɮG ʥů1	0П\r͂ɹə͂Ǯ͂ə༜ˋɤٸȒ\r#əǥ$͂ə1#&Ƶͅɯ*̦1	0ڻɯ*	$ə#,əļ1	0ࡩ͂ɚэ̓ˊɝǁǲ1	0ۭ̓ɮn̓ˋɟнȚˉɚŎǪ̈́ȵ̈́%mɖम\r1ʈɦ߰ɼəܷʈˋɠŎȆ͂ź͂%̓ʬ̮#͂ə[̱4&4'Û#ə̢1ʅ>ʇ5ʫ%ƶ$̈́#əŠɮGʥβ1	0ࠔ	Ϯ͂̓O͂஧̓;1ɮ໙$ɯ*\r͂͂ɚЀ1ʅɮՐ1ʠɳɮȁɵ;1ʊ>ɺɯ*	1ɲHʚʊɴ;̓ɮn̓v&Ƶ̈́	ʈɛݵəŋ1	0ܦˉɜ·Ǧʬ͆à1ɮķɖ˪1ɯɳOɮేɮδ'ə%1#əȟ͂(®$ɖĐIÚOJJ\x00F\x00TÍɣ#Ʋ0ҧ%mɖӺ0ର0൅1&ɮ֫ʚɳûʊˉɜ˽ǧ1	0౉1	0ۡ	͂ə:#\x00$1ʒ>ɮŧș͂\x00̓#ɚó̓͆ຠɮɷ̸̹̺̰͆ɳ$	5ɮࡧəʈ\x00͂+ōtɚǴ)51#DɖǆȤ#2ˊɠ༨Ǯ͆ः	1Ř&S	̮əƢɛǗɚŢ͂ə­̓%ǁ͂ɮ۷ɮɷ1	0է$#ʣɚ1#&ƌ(mɖȑ1	0ץ5ɖƲ1cʊOʂɮɃɺˋɡ्ȁ5ʵ͂g$ɮ#1&ɮƮɖéɮމ̮əۧɠහ$əəɊɯ*̫ɯ*1ɮүɶ5ɖǂ\r5ʈɚȦɚആʉtɚݴɖֿ	͋í̮\x00*,*¢̻̼̽ɯ*̩'1&̮ə෎ɟ؁̮əउ',ɮĽɮƮɖദƻ'Pǖƻŏچ'Aɮ༫	͂Ƈ͂\x00əɊ#Ɯɖ௳#Û͆੝ɮɷ͂(®$ɖŘIÚOJJ	\x00F\n\x00TÍ1ɮүʏ5̓1	0։1ʡ>ɻ1ɮȹɲ$ǁ#ʺə]̮	#͂ə1̈́ˊɥʥǮ̮əμ\r'Ũ$छ$	ɼŲα	1͆«#Bɖ๟ɮЛ#Ĳ̈́͆ĵ̈́1ʺ1ȝ̓ˌɚſǚˋɚŎȏ#ອ͂$ɮÐə#א$əږ$ɀəđɖර%a1	0๐ˉɝǁǩ	%2#2ˋɞঋȋ$#਎ˍɚŎȲ$ə͂¢+)51	0֋1#$1$>$D$DEɖè5#1&ʋOʡMɻûʏɨ#Ň1-ɫ#ؑʉtɚё5ŗ͂Þˋɥਝȃ0੷ɭ#ಝ&ˋɣഏȍ1ɵ>ɲ'əΈ	1ɀ͂əच5ɮfə'Ж\r1$Ɣɚສ$ƔəৈəŠ	1ţ͂\x00əཇ1ɮʗţ͂\x00ɛہţ͂\x00ɚٽ	͂ə:̓\x00̈́̯̰̱͂͆҄͂ˊɝƣǲɮݘ1#Ҋ#DBɖˤˋɥูȌˌɛǒȫ1ɲHʇɺʇ;1ɳÓɲɲ>ɻ;1	0ಒͅ$ͅ1ɮ¹əͅ˫əŠ͆෰	͆İ͂\x00əÊ%#͆àɮʐ'A1ɮԤɶ͋ā̮͂əő̀	͂ɮfə$Жˋɦ൑Ȑ1ɮޒ%ˉɚſǘ)&×1	0إ\r1̓#ƿ̓\x00̈́	'Aƹ௽&0๴1˭#ə૲1&C#0ʵˊɛǒǭ0݃$͂1#Aι(͆Ե1ɮƯ%ʈ˃̓əáɛ֓̮૰$ɖY&І\rʈɚ̾͂V#\x00$\x00&#0ʪ@1%DɖǆȤ%2ࣷ$ɖYIɖЫɖiOJTІɮฦJ@ɮಇə]#єɚǓ͂೼#ž#ɯ*	$Ƈ̈́\x00əɂ͂ɝ̓͡Þ́Ф1	0ௌɮGËʥǫ(ʓ͂ə&1	0೴1̈́Ƅ̈́\x00ɢޫ1ˎ͂ˊɜ˽ǯ5͂ç$$ɗî$৳#*ɗǉ$\x00$๓1ɴʔ	1Ř&^1	0ࡳ\x00#ɯ*̟ˊɚſǰɮG[ʥª1ʂʏOɮїʊ;1	0৻	ʋəıəŶ̮ˍɚſȳ	&Ƈ%\x00əļˋɟԎț͆੊1Ȫ͂\x00̓Ẍ́(mɖެ1	0ׂ(ʈŸ1	0˦0ࢶ1͂ō@1§ʋHɲʔ¾ɮɟ1&$əŗɠఔ#Äɞ˙%÷	%ʀə%ĝ%ɮ۰%\r̯ɮ<ə͆â͂\x00ɚϺ'Ƶ$ŷ''S&̿ā0ɩ5#əőɡ#ȑ1%1ʠɲˊɣȗǮ1	0ॖ0Ə1ʋÓɶOɮवʛ;0ʧ	5ɮn̈́Ƈ͂əƛˉɤƕǢˉɝǰǨșʈ\x00̓&͂%g1	0ଝ\r͂'®J\x00FÍ1̈́5̮5ˁȜ̓5ƺƾ$\n#əݽˊɜ·ǯ#ɮn#	#ʋəəƍ#ळɖTɖ/ɖiɖĺɖĐɖΛ˃ࢭ˂w̈́ō@1ʈəต1ʠOɮुʔɻ;1ɻ>ɮՐ	$͂ə1ə໕-1'͂?O̯ޣ͆â͂\x00ɚଊɝ৬'H'Dҩ'D ɖǼ'D ɖ৒̯ɜҽɮȒɖ੟̳ˊɤǧǶ\r1ɮʗ#ɛȄ#ɚ͈ɖį͂0ం1ˀ\"͂ɯ*̤#̓1්ͅڨ&&ɖè&-##ʳʣ$Vʣ%رʳəଯʾ#௪ɮGʥò1ɮԤʒɝ#Ӑ1cɮࣜˋɟϬȎ͍͋ !͊͇͈͉	+	R\nEG¡\rd±Ȑ˔¬«J#Œ¸1ńł°à°Wũǁ!ê°ǭUƍƑĻŉŏ°Î°ƾȄĔÛ6ƼƣŗǨÎŎơïøĬ°ȆĖǦ¥Qǵƒņ°°ŬȃǏƭǖ°ǠĻƲś°ƀĐ°°p\rcűÉŲƕżÈōƂxƫ°ƏdÍ°ƏŢ°8Ěƌų¼vƏ°ÞȃƙǝŮ°ĘĞƖwǽ¢ǱşǸÊƓŅƁǣƢ\"ȊĝØÎůŠfƯr ǐƸĺEǶ°ƜƳĢźŪę[Ŕ»ȇªŨĻƚªÿ°~Î°Ȁ°ǒŧ\nǉǟƛćĨ²ǆÎÈĪȃǡÆđU	Ļȇňŋ4ĸ3Ǒ\nĻyǓĴĻȁT×¯ļ\rcXĻÈĂKȃćǊŨŹĻǡǊüĒǘ}á©2)´ÉŇDĻǛŌú½{ŰÎƉƝÎ-°n£lǍa°<°¾ȃƞ÷Ǵ°@Î°ǜ(çÖ Î.°ŵýŝļŘ°ĽĝƘģƵȉ°řƏǙ°ƏƥȌ°ƎġĻǡǾĻȇTÿ°ĕÎœ°p\rcȋèŸĄĝmÎǄÅÎe°ÙƬƻıĻƐƤÎǺ\\\nȍsƴňŭąjǫÃƩÀĻtƤưÎ¦ĶĤĻćA+ŕHĩÎâŚ°|°Ʊ°pÏČƛiǗ;\nùåBßĠÎñǢ®ťM­Îæ¡ƹ]\x00ěūĻìƤ^Î§æ°¿Ƨ·ĭĻó`ÒĻĀãȈĻÜǇǌY°ºu>İ°ĥƄ°L\nȃėÎ:Ä°V,ǈ°°Ȃö°°ǔ&ƨƗǤƠ%Âƿo°į?ǚĿĻǥõċĻƅ$ĻĆÕĻǃǞǰĻqǇp¶°ŁƊ/Nh¹®ğȃûƹ³ǂ°S°°ȅǅkŜŊīÎǻÔÎĈÎƮIÎƶŤőƷƇǧǹĻ7Į0ǮǎbēȏǨÎ7OƈăǷÐĝƚgÇÿ°Ú°Ý*°ſŞĝǋĉ_°ţǳĵƆƺòŴcPéǲËžŖȃÈŽŀµ°ƦðŦŶȃþħǇā°Ǖ°Ȏ°ƃ¤ŐzG`ÑÎķĦĝ=ÎůǇů9ƇÁǪƁǣíŃëǀďȃ±ơRĲÓ°Ċä°ĳ°5°ǩŷƪ°ĜÎ°ÎƋÎǯ°ǬÎ°pƽÌC'čĻîǴǼƔÎľǿšŻĎFôĹƟ°ZÎ¨°\x00Ȑୈ	œʋ\x00ɝψ̪v	ޤ$ɖƨ͊\x00́ߏɖ঴́Ʀ͊\x00ɮ֤౮	ಶUəͧ͋ત	̷ʖ̶̵̮>̯͊ə+͊ə+ಘəڮɖǂ\x00\rvɖˤBɖதɖǂƭ͊\x00ɮ੾	૛̮	͊ə1ə̍	ஐ\rʈɜʏUƌ	̯əɖĩ͍ݎa̶Ƭ͊\x00̈́	ఌɖ×ʓŧ@	ໃɯ*\n	əɠβ	œʋ\x00ɜʪ̧v	œʋ\x00ɜǝ̣v	͊ə1ɚސ	Ƈ\x00əୌ̈́mɖĩŲɜؿ͍ܖɜಳĹࡇĹࢢɚ՚ੀaɴ>ɺ	఍Ɵ͊Ц	͋໎͊´Ұ\rɮ<əəʸɛތɯ*\r̈́ഽɖЫɖՔƯ͊\x00͂	ܽł̀ɻ>ɳ\r͋í͊\x00əɻəࡲ̴ȣw2	͊əѽǀ@ʼɛ঄͆«ʼɛɽɖǇəΐɚŢ	఩əŠ\rƮ͊\x00ləӜɖಆɖ͈əҪ̓9ɼ	œʋ\x00ɚĎ̩vɮȁʛாƦ͊\x00ɮɪ$ɖࡋɯ*		̮əɖǁ͊	ʝHəɖҢəɖɾࣖ̮ɼϥʈɚȦə̿I̮Қɖƍƞ\r&ɝਛɝطɖ͈	ư͊\x00ɮǌ͆ਙ	ǘ&ɮԄɳMɮɃʋɮटʛ̰̰əɖĲ͊Ƨˁ͊gƨ͊\x00̾͆ċɖՔຐɖࢸÐə̽̱͐ັ͋پ	њƦ͊\x00̱w5ɖǂ	ƃ\x00ɟ¢ƪ͊\x00͋ڙɖഓ̳;	Ԡܵћ੓ʋʈəōəટ	̮ªƠ͊ʈɛōɛȗɮ΃ɛƘʖ¢ɮ΃ɛȗǆł̲ɖèɚ̏ə+ʡɮӪʚʡ;`ɚŠəǁ	ଣɚݍƨ͊\x00̿̈́mɖw	૫͋ඟ	ࣵʈĳƶəΊəëŀޯɖĽʈĳƶəΊəëɚಃɖƨ͊\x00̽	ऴƨ͊\x00̷ɠɘɣ૮ɠʒʔɥļł̮ɮ	অcɮºɖඣ͊ɺ>ʅw\rƪ͊\x00͋җɖࠕɖɢ̵;̰ə߂ɮ<əəʸəä	ࣱɮºɖä	͇ʋɚɤෆ͋঎	ি§ʅÓʔʒÆɲ9ɼݠ͊əԸəଞ>ʈɚ˚	٦	ƔəáəӉcɲOʐʅ¾ɮͦ	࡟Ƭ͊\x00̓̮Ȕ̀Ȕ̾Ȕ̿ȣ̳w	಻ʡÞƨ͊\x00̲	पUU̬ɖૃUƁɖ͈	නʈɛ֧	৫§ɶÓɲɴÆʡ`ɚӥ\r5ॺɔɖ࠵׶ə֩Ĳˁ͊ເ͊	؇Ʊ͊\x00̯ɯ*ɯ*UʈɜԕUɖɾʐMʅĮɎəೖɖƫ͊\x00ʣəƀ̸;ଢ	ƪ͊\x00Ɲɖގ͊5	͋í͊\x00ɛǽ¢ɯ*	0ɔəՓɮ֛ʅ	۔ɮʆʚʅ¸ʇɳʐ;ʈɚőcɮങɮেɯ>ʡ	ɚ×!əѵɮ<əəʸɛ૶͋ญ\x00͊X͆«ʼɛɽɖǇ	œʋ\x00ɛ̨̫v`5߹͊əëĴ౏ɖƫ͊\x00̮\rƪ͊\x00͋җɖ՟ɖ੨̴;ͨƬ͊\x00ɮϧ	ߒƫ͊\x00͇Ⱥ̴͆à	Ī0ʉtɚё̳9ɼ̴9ɼ̵9ɼŇ@͊·́ʖʕɮ͂͊ɤ໅\x00ɖໆɮ͂͊ɞ߀\x00ɖ൙$ɖ	əɦӸ	͋í͊\x00,¢	෕ɠܑ͋ໄ͋ഉ\r5ɮ๭I͊Ҙɖ્I͊;	ƌ͊\x00͊əμʈĳΰ̻ȣ	˦5ɤ࠺&ɮఙɮ߇ɮۆʡ̈́mɖजʵ͋ࢮ͊´͊a£ы	Ƈ,əļʒMʇƫ͊\x00	œʈ\x00ɟଐŦcʋʔMʋ¾ɲ5ͰĲ	͊ɝדɢӉ͍Ēɚϛ÷̯̮௛ʔOʂ¸ɮдʇ;ʺə]͊	࣎ঢ়	͇ɚ­ɝŃ	ʈɚõ͍Ēɛǽ¢	˕	र\rɿə\x00̯əɸ͊ɤ˰͊͊·@	ɴ͊ɜڼ͊ɛකƱ͊\x00̰ɵ>ɮŧ͊əࣤʔĺαlʈəōɛׇѱmɖ	̮%ƥ͊̰Ҵł̾	əɞ૴§ʒHʔʛ¾ɵ͊ɝܢ	઻яҴɮ਀ƫ͊\x00̲	У͋í͊\x00əޘ÷ɮǌcɮºɖس͊?	DCɖè͊əɘ͊ɛѹƨ͊\x00̀	઺ɀəƙКə+cɮºɖۑ	ƆƝɚజəǀ	ə+\rɖéUəަɮǂƨ͊\x00̰̸Ŭ͇ȸ\rɮ<əÁəäɴʆ͊ɝਏɛױʆ͊ɝ్ɛঘƦ͊\x00̶ɮƮɖ௏ɮӳɖࢼ̮9ɼ̲9ɼുɴ͇\x00gʺഞʈĳΰ͊əŶɼ\r&ɝຑɚ௲ɖł̿&ɮºɖे̈́$ɖಔ̈́$ɖޓ̳͊ɜ੢4ʈəōɚʼƧ̈́mɖɮࣗ	ࠛ	Ƅ	П̸ȣ	ə1ɟê	əɠξƫ͊\x00̳ۯɮϨɵ͍ā	ൎɯ*ə۵çRʵƤjƭ͊\x00ͅƦ͊\x00	ɚԓɚƗ	̮@ƣ͊ɮઐɻ͂ɮϨʐ͍Ē\x005ɚಮ͍Ē\x00ɚ̏Uəࢍ	ɮnƇə̊ɯ*+םɮºĵ౸ɮӳľયʈɡঽɼ̮ʈəĂɞ˄̟భʈɞଈɼ̲ʈəĂɞɣ̠ணacɮ଒ɮ஁ʠɯ̈́mɖӁ̲̲əɖª͍Ēڲ¢̴̸͆à	Ʋ͊\x00\x00̈́ư͊\x00̯	̮½Ƣ͊ɴ>ʒ̯9૿̰9ڋ̱9͐ധ	̮ə:ɚЃ͉̰w̳9͊ɜࣃ̴9͊ɜע̵9͊ɝƘ	಼Uə+ɳHɶHʇʊ;͊əѽʔɢާ̙	تƨ͊\x00̳ɖĩ͇Ò̻	͍Ē\x00\x00$ĵ@Ƭ͊\x00ɮ༴Ɲɖēł̵͊ə+	ʋəɚēɼ͊ɜԊɼ͊ɛٰ̮Ƴɝê	ڔ	̮əɖĩƨ͊\x00̱̯ɜ࢒ɜࠞɜ¢	ਵƱ͊\x00̲Ʀ͊\x00̱ધ͊ɡศ͊ɠа	̯Ɓż͊;əϳ	ޙʚMɴ5͇Χ̴͊ɜέʼɛΙ	͋í͊\x00ɚϛ÷Ƥ͊	ඨ͋ವ̶ȥ͆«̴	ʋɚɮඃɮдʇ̮wɮʐɻəΥ\rə1ɛ͊ɛӸʵ0ɔ	͊ɦ̖g	̅ɖª	࢛	œʋ\x00ɚų̥v͆«̸̼ȥ͆«̻mɖĩ	͖	ઊ$ɖӁ͇ʈɚő͆຿	œʋ\x00ɜʨ̦v๶ ɦ๝ əֺɦɚ͍Ē໠÷ʧ̲w̮͆à	ݐ	œʋ\x00ɚǢ̢v	ʓ̯Ƴɝԉƨ͊\x00̹ɮΉ͆ċɖшɮඳ	̮»ƥ͊	əǇ͋஘ư͊\x00̮ƨ͊\x00̯	ڬ̺#ƥ͊	͊ə:əT	شw̵͊ɝƘ͆ċɖΕ	ࢋʐ>ɵ͆ܡ&ʔHʏɮஸɻ	ௐ\rʤɝిʋ\x00ɤૺ֢a5ɖ5̮-̷Ə͍ຫa	౭Ʊ͊\x00̮̯ޗ\rʈɚ໬əə௃ə]͊͆෫əϳ̮͆ࣀɚ̏UɞʼŢ@ɽɚԗƯ͊\x00	œʋ\x00ɛǈ̡vˀɼ	œ͇\x00ɟȮ	5əɖǄଆ	̯əɖ̯w	ڞ̈́ͨ	ʀəĝ	̽ʖ̼̲ɩ§ɮԄɵʐ¾ɻ̮̯mɖ\rUəáəՂəɌ	œʋ\x00ɝҶ̤v£	คəѵ͆«ʼɛɽɖǇ	cɮƮɖéɮɪ̰ƳɜΕ	͋υʼəͼ`ʈəōɛА	c̰̮̯Ɲɖض	͋υʼəͼ͋෴	əɞȑ͈ශʈɚȦə̰̿ѝ̱	I̯׉ɖƍ	঱ैơ	œʋ\x00ɚþ̫v	ੱ	͊ə+	धɮʐəş	̮8Ƣ͊ȺʛMɮǀƯ͊\x00ɮࠉ	͉ɜ̞/ŲʈɜЕʈɜƵɛ౶ʈɜƵɛޟ\njʈĳ೶ɛࠣɛ̖ɛՅɛ̖ɛమɚ՚ˋa̈́mĵ@͇0ʶ@	ʙ͊ź͊Ƣ͊	͇͊ə1ə̍mɖª\r&ɮ¼ɖد͊əԸəଟ	̹ʖ̺̯ɜοɛξ	஫̻͆à	ԑ͂əõ̮͋í͊\x00ə಍¢͍͎	͌	\n\r ·ndJG[VXqM?(0-RjZm{+ex/\x00)YNgbk|'*2rIsvilkH5:ff_%^Blw@p\">4;tOCh`~AP&}D,\nLyk<Skck3Kk#6Uu]18F o!x7\\E	&Wk7\\Tz\rDx9iak=.$kQ6\x00	৅	ʋəĂł\r͌ɚŢ	ʖ\x00ɖȍɮȁʏ	̯ӯ͉ɜ̞	͊ə:əT͇ѱ	əɖĩ§ɵɺ>ɮ̛ʛ͋â͇ɜഷ͇ɜ౴	౐ʞə\x00ʔɜ,əϚ	͇ɚ­ɛĈɯ*͇ə+Į̲͋ะ	ࠧਂ	ʋəĂİ\r	ʋəĂĲ\rəř\n	ࡿඏ͌ʋʌ\rɮlə\x00ɣ໊ɖ	Ī̯͍ӹɝȼ\x00̯	əɖcʊOʂɮฌɶ	ʋəĂĽ\r͇ಈ	ୱ	Ɔ෼͇ɥ֨\nʅʒOʇMɮந\rɟबɟȽٶ	͇ɡٝ\x00	͇#əÜ̮͍ӹɝŘ\x00̮͇ɦฤŲƖ\x00͆હəɖʡʲa	ǘɩɮnv̰Ə	ƴɖ࢕\x00ɮ௒ʇʌK¶ə+Rgɞ໦ࣦəɖ໰ƚ6=و>X̰ƴŷɜ/ˋaΧ\rʞə\x00ʔॢə࣫	અ͇0͍ԁ͇#͈ʖŻ\nɖȍѤʞə\x00ʔɜ,əϚʵ	Уɯ*	͇ɚ­ɛĈ	̳ɯ*	&͌ı̗ʋ	ܗ	ʨəԋĿԨ̶ʖɝञɖƍɮ͆Ņ͊\x00ə̍͍Ӳ	&͌Ń̗ʋ5̰͎āəɖƲ&ʔHɮʆɮɃɮɟ	؜0ʔɥ؈ɯ*\r5͎প	ʈɜʏʈɤԊʈɤಙʈɢƬ͊ɮʗəఏɜοɛේɝ༾ʈɥ๽	&͌Ņ̗ʋɯ*	\rɮlə\x00ɦসɖ͍໐̷ɟΝ	5͇\x00\x00̙ʡ\r\x00ɖʋ	Ƅɯ*	ڶ	౜	˕̲	͇ɚǍɝŃѤ	ʋ͌ʕɼ\r͇ɚǍɛĈŹ̳əхƛŉԨ	ʙ	̸ʖɝৄɳʋ\rə­ʔɝÝəਬ̸ɡӥ͇Ƨ5\rʞə\x00ʔۂəબɯ*\nʐ>ɺ͍ԁ\r͎͏\n	(\x00\n\r\r	\x00\nʋ͌g	Ī	Ƅ̳w	͍ϗɛߜɛֈɯ*\r͇ɚǍɛĈŹ̳əхĮ\n\"̱ɛɚ̯͆à͈ɖഥ̯̮͇ɥན\x00\x00̳͍ڰʅ¸ʋʒ>ʛ;̰#͆«̯	ʝɯ*͈wƏʚMɻɯ*		Ɔ͍Ӳ̱͏ā̳ʈɜʏ̳༲̳̱\nŲ͇ɝ஬\nɮÐə͇ɝ௴ɥඓ\nɞэ	ˋa	\n͏\x00\r\x00\x00\x00\x00͍ϗ\n		ĪĮ\nɮlə\x00ɤ૗";}}}else if(_$$3<32){if(_$$3<20){if(_$$3===16){ !_$aD?_$$f+=0:0;}else if(_$$3===17){for(_$kl=0;_$kl<_$ij.length;_$kl+=100){_$bv+=_$ij.charCodeAt(_$kl);}}else if(_$$3===18){_$aD= !_$$T;}else{return _$_b;}}else if(_$$3<24){if(_$$3===20){_$$T[2]="e-5`-.3`.3`.,`0/`.0`00`2/`-,.0`0.`-,`)-`/-`2`1-`.12`.,,`4`.`-/-,3.`-,,,`0,`13`0-50/,0`-1`-0`3`-4`-.`02`..0`2,04,,`03`.0,`1`0-`1.`211/2`4-5.`--`/3`20`211/1`14`01`/`-/`5.`-3`42`.11`5`//`-/0.-33.4`-/0.-33.3`/.`04`/2`-,,`-2`-.4`0`0.50523.51`-5.`/1`1,,,`21`-,04132`.4/`-.2`4,`.,53-1.`.,,,`23-,4420`1,,`)-,,`5,`),*,-`24`54`-240/,,4`11`,*,`.240/1011`-,.`5/`.4`0,52`.-`/5`.,53-1-`45`.240/1012`4.`-3,`-..`0,52,`2,`53`/,,`-./`.04`15`.,-`//1100/.`-,,,,,`,*,-`4/442,4`52`.1`.,/`.2.-00`./`0.50523.52`.2100/1325`35`-2333.-2`.5`.2`/0`/.324`.,04`12`-4,`/,`1-.`3.`.13`---`55`31`41`-5-`-1235`-21`4./5`20/2-1`,*0`.1/-,--`.,,,,`,*4-/.2010/`44`,*.2`.1.`-3/.140-5/`,*-`1,,,,`,*2`-2,`/2,`4-50`.3-3//434`5-`-240/,,5`4-53`-4,,`3-`4.,,`,*4`12/.,`--.`.10`,*5`211/3`11.52`/,,,,`4.,-`4.43`4.,.`4/`312,`),*5`4-51`)0`4.,/`4-`-20`)-4,`-,-`/544.5./40`/-013.4`4-5/`4-54`.,03`10`--,`4-52`.0,,5153,4`2-14`4-55`-2/4/`40`1,45`-,,-`-,,,,,,`//5102534.`/.41/331.,`),*.2`-,04131`,*.`-..44`)5,`/,,,`///3121540`).`)3`,*/1`),*.`-2333.-1`-1,,`-1-41,,.05`420,,,,,`0,././/0-3`.12./4/-,.`-415331/5/`-3/`.,3`-/3`-/5`-/.`.,5`-32`-4/`.--`-54`-11`-3-`.,4`-53`-50`-0,`.,.`-12`-/-`.,1`.,0`-02";}else if(_$$3===21){_$aD= !_$eD;}else if(_$$3===22){_$$f+=-71;}else{_$eD.push("})(",'$_ts',".scj,",'$_ts',".aebi);");}}else if(_$$3<28){if(_$$3===24){_$a1=[1,0,0];}else if(_$$3===25){_$_b=_$kD.call(_$_V,_$$g);}else if(_$$3===26){_$aD=_$kl<_$ct;}else{_$$x(106);}}else{if(_$$3===28){_$aD=_$$g===undefined||_$$g==="";}else if(_$$3===29){_$kt=_$gT();}else if(_$$3===30){_$kD[_$$r]="_$"+_$_b[_$$T]+_$_b[_$kt];}else{_$e1=_$kP.substr(_$jG,_$_r).split(_$$o.fromCharCode(257));}}}else if(_$$3<48){if(_$$3<36){if(_$$3===32){_$aD=_$$r<_$$g;}else if(_$$3===33){_$jG+=_$_r;}else if(_$$3===34){_$aM=_$$x(0,850,_$_J(_$kD));}else{_$eD=[];}}else if(_$$3<40){if(_$$3===36){_$$x(95,_$ij);}else if(_$$3===37){ !_$aD?_$$f+=69:0;}else if(_$$3===38){ !_$aD?_$$f+=2:0;}else{_$kt=0;}}else if(_$$3<44){if(_$$3===40){ !_$aD?_$$f+=63:0;}else if(_$$3===41){return _$kD;}else if(_$$3===42){_$$T[0]="e}{hh`jk~aPula`#`fkej`hajcpd`(`Y`klaj`daecdp`}na{paAhaiajp`|k~u`kj}he}g`cap=ppne|qpa`oap=ppne|qpa`kjoq|iep`j{ia`6`w`{}pekj`oq|iep`ej~atKb`paop`bkni`{~~ArajpHeopajan`[9`r{hqa`bqj}pekj`olhep`jqi|an`nalh{}a`nkqj~`hk}{pekj`qoan=cajp`9`pula`o}nelp`op{pqo`i{p}d`W`X`;`p{cJ{ia`lqod`&`pkOpnejc`c`na{~uOp{pa`]`kjhk{~`se~pd`olhe}a`ohe}a`{llhu`on}`}kj}{p`k|fa}p`p{ncap`opnejc`{`dnab`lnkpkpula`~k}qiajpAhaiajp`naolkjoaPatp`}d{n?k~a=p`*`oq|opn`|qppkj`l{noa`TIHDpplNamqaop`hk}{hOpkn{ca`7`capKsjLnklanpu@ao}nelpkno`dpplo6`qj~abeja~`jk~aJ{ia`kjna{~uop{pa}d{jca`ejjanDPIH`opuha`ebn{ia`oa{n}d`+``ar{h`bnki`lnkpk}kh`naolkjoa`ata}`patp`f{r{o}nelp6`{ouj}`=}peraTK|fa}p`{llaj~?deh~`arajp`ArajpP{ncap`~k}qiajp`atpanj{h`l{najpJk~a`dppl6`bhkkn`bnki?d{n?k~a`da{~ano`ejlqp`oap`oaj~`naikra?deh~`capAhaiajp>uE~`omnp`\"`{|o` bnki `n{j~ki`Ag}L`lkl`}kkgea`kjpeiakqp`}d{n=p`l{pdj{ia`}he}g`pkl`~er`de~~aj`Z`naikraArajpHeopajan`}kjopnq}pkn`y`cap`naolkjoaPula`kjannkn`Namqaop`klpekjo`kjlnkcnaoo`|kkha{j`}hkjaJk~a` {o `naoqhp`lanbkni{j}a`4,`pdaj`I{pd`peiaOp{il`oapPeiakqp`-`eo=nn{u`iapdk~`oapEjpanr{h`e`re~ak`d{oKsjLnklanpu`oq|opnejc`Ahaiajp`a>43|?,`eilknp`x`~{p{o)po`pkHksan?{oa`odksIk~{h@e{hkc`cap>kqj~ejc?heajpNa}p`kjhk{~aj~`}aeh`lbb,`DPIHCajane}Ahaiajp`#kjoq|iep`#on}`gau?k~a`i{p}dIa~e{`naolkjoaTIH`kjoq}}aoo`|{oa`t`kj{|knp`}kjpajp`++`2`%`i{t`capPeia`}{jLh{uPula`8`DPIHBkniAhaiajp`jks`{ooecj`,`deopknu`LKOP`kjhk{~op{np`gau~ksj`aj}pula`00/`ej~ata~@>`ikqoaikra`capAhaiajpo>uP{cJ{ia`Ie}nkIaooajcan`#{}pekj`opklLnkl{c{pekj`bn{iao`o}naaj`)`kbboapSe~pd`$_URPT`h__`Da{~ano`capEpai`oahb`{s{ep`#dnab`kbboapHabp`peia`{ppne|qpao`opnejcebu`dkopj{ia`lb|._,`ikqoa~ksj`bqj}pekj `$|_}{hhD{j~han`f{r{o}nelp6 rke~X,Y7`u`bap}d`}ha{nEjpanr{h`k`}ph`bkjpo`lknp`ei{ca`$_po`op{}g`op{pqoPatp`Naolkjoa)Pula` 99: `~ao}nelpekj`pkq}daj~`lb|,`kbboapPkl`gauo`i`lnarajp@ab{qhp`kbboapDaecdp`___PO___`.`ejpanj{h`lb{,`n`hejg`i{p}dao`TIHDpplNamqaopArajpP{ncap`{q~ek`kqpanDPIH`reoe|ehepu`:`iap{`$_j~`ia~e{@are}ao`|`Bqj}pekj`dkop`Wj{pera }k~a]`}hkoa`8~er:EA48+~er:`hk{~`kbboapQjebkni`oui|kh`}{j~e~{pa`=f{t naolkjoa |k~u ~a}nulpekj b{eha~ ) `capNaolkjoaDa{~an`kbboapU`~are}aLetahN{pek`'`z`capOkqn}ao`oapEpai`{~~a~Jk~ao`ajqian{pa@are}ao`}da}g|kt`lb~,`reoq{hReaslknp`oaooekjOpkn{ca`|-=a-B0{`nkkp`on}Ahaiajp`pkQllan?{oa`#oa{n}d`kqpanSe~pd`snepa`{r{ehHabp`_`pkCIPOpnejc`kneajp{pekj`k|fa}pOpkna`l{najpAhaiajp`X\\n\\j;YxX\\n;\\jY`patp+lh{ej`Na`jqi|anejcOuopai`}{lpqna`L`}kilehaOd{~an`ata}O}nelp`Y( atla}pa~ `CapR{ne{|ha`k|fa}pOpknaJ{iao`Ie}nkokbp*TIHDPPL`~ab{qhp `o}naajT`eoJ{J`Kranne~aIeiaPula`lnahk{~`ikjpd`{pp{}dArajp`lkop`nac`[`Ia~e{Opna{iPn{}g`ua{n`7 Oa}qna`o}naajU`ikqoaql`{|knp`fokj`{llaj~`{r{ehPkl`oknp`#ejjanDPIH`od{~anOkqn}a`Qjatla}pa~ pkgaj `}khkn@alpd`b{,)`n{~ek`hk}{ha`__#}h{ooPula`lks`lb},`,,,,`Wk|fa}p =nn{u]`$JSA1JvNgUfdiUvI0`ns{,`oapNamqaopDa{~an` 999: `l{noaEjp`{r{ehSe~pd`ksjanAhaiajp`{r{ehDaecdp`bn{}pekj{hOa}kj~@ecepo`ejjanSe~pd`{llhe}{pekj+t)sss)bkni)qnhaj}k~a~`Xpdeo( {ncqiajpoW,]Y7`|{ppanu`5`Lnkieoa`iaoo{ca`~{u`RANPAT_OD=@AN`@KIL{noan`DPIHK|fa}pAhaiajp`lba,`|ap{`}deh~Heop`#kqpanDPIH`peiaVkja`r~Bi`bn{ia`$-_@ER`}{haj~{n`Qjatla}pa~ pailh{pa opnejc aj~ejc`pkq}dop{np`annkn`d{od`napqnj7`pkq}dikra`{llhe}{pekj+tih`{hld{`kranne~aIeiaPula`}ha{n`}`capOd{~anLna}eoekjBkni{p`ejjanDaecdp`jqiEpaio`{j}dkn`kbboapT`napqnjR{hqa`jqhh`l{noaBnkiOpnejc`$|iB,{TVhNihRuQDF`capKsjLnklanpu@ao}nelpkn`aj}k~ejc`=NN=U_>QBBAN`nalh{}aOp{pa`}na~ajpe{ho`BN=CIAJP_OD=@AN`naikraEpai`{}ko`tppa`|cokqj~`c{ii{`99aj~99`bejax}k{noaxjkjax{ju`h{uanT`$hol($$hon|($$hkccan($$=?TQPEHO(_=?T_AR=H_L=OO(_=?T_DKKGO($na{~u?k~a=hna{~uAta}qpa~EjPdeoBn{ia`|u_l{pd`}na{paOd{~an`X^\\oZYxX\\oZ$Y`$|_lh{pbkni`kqpanDaecdp`ns|,`1b1b2~30300/3.212-3021023.2-2~21.}2~30300/312~3/302b2~0{1/`#kj}he}g`ranpatLko=ppne|`op{pe} `{h`PG_BQJ?PEKJ`_$n}`#r{hqa`}kjp{ejo`$_USPQ`{pp{}dOd{~an`letah@alpd`}deh~naj`hBikPnhk(kcOkkoqaI`mqanuOaha}pkn`nqj`pn{jo{}pekj`naikra=ppne|qpa`o}nkhh`/fa=HaOo{2`Cap=hhNaolkjoaDa{~ano`sa|g`ns},`7 atlenao9`#jk~aR{hqa`wD.[W-_W..`l{caTKbboap`e}b}`W,)5{)b=)B]`|kppki`HKS_EJP`necdp`}d{ncejcPeia`ca`}{j}ah>q||ha`h{uanU`\\wX*[;Y\\y`}nulpk`$`hk}{h@ao}nelpekj`ao}{la`habp`gauql`epaiOeva`{ppne|qpaJ{ia`$|_oapql`{?hheOap`q)jj;`Ie}nkokbp*TIHDPPL*-*,`~`kj{{hn|`f{r{o}nelp\" `Hea|`capL{n{iapan`pn_a`lhqcejo`upwnpnqa`qXhn (nb`{llhe}{pekj+a}i{o}nelp`PG_MQAOPEKJ_I=NG`r{n }qn_aha 9 pdeo7`7 O{iaOepa9Jkja`PG_R=N`pCJapaNtEa@m`bkjp`~abejaLnklanpu`X8\\+K>FA?PY`iqhpel{np+bkni)~{p{`harah`PG_LKOPBET_KL`Lha{oa aj{|ha }kkgea ej ukqn |nksoan |abkna ukq }kjpejqa*`2}2-2a23312-23213/`apAnarpj`qnaO`PG_EB`Gau|k{n~`8AI>A@ e~9`jN~a`na` ba{pqnaoY 9: w`X8K>FA?PY`kLje`V4TDFFU*|iB,{TVhNihRuQDFXY`{~~>ad{rekn`jkja`cap=ppne|Hk}{pekj`sei{t`napqnj jas {X`aSO|`dojaefj{`~are}akneajp{pekj`~n{s=nn{uo`>n`cqk`]:8e:8+e:8!Waj~eb])):`_ejpanb{}a`PG_EJ`bej{hhu`oaha}pa~`ranoekj`W\\\\\"\\q,,,,)\\q,,-b\\q,,3b)\\q,,5b\\q,,{~\\q,2,,)\\q,2,0\\q,3,b\\q-3|0\\q-3|1\\q.,,})\\q.,,b\\q.,.4)\\q.,.b\\q.,2,)\\q.,2b\\qbabb\\qbbb,)\\qbbbb]`ahoa `IA@EQI_EJP`}ahhqh{n`|~>`dppl`{lalnRkoje`jd~{Ehbaina{a?{nkpje`130~1,2}`j{ia7y}{p}dXaYwy`Be`an{ipdcej__`2/3.2b3/3/`=f{t naolkjoa |k~u eo jkp aj}nulpa~( naolkjoa hajcpd6 `laatinae{jhp`\\qBABB`V4TDFFU*JSA1JvNgUfdiUvI0XY`2b2}200/2b2a22253.2~`PG_@AB=QHP`h?h{`|ku`#}kkgea`#nalh{}a`odebp`d{j~han`~are}aikpekj`PG_=@@EPERA`DECD_EJP`nloa`e>o{nar`#naikra=ppne|qpa`lnk}~pq`o{rj{}` A`@are}aKneajp{pekjArajp`#{ppne|qpao`oaluPaiei`~a|qccan`@ikopJPk}ng{`~are}aE~`_$~|`PG_IQHPELHU`capOqllknpa~Atpajoekjo`PG_PNU`}ehjaEpbjnk{iepjk`( ~a}nulpa~ OJ6 `wget+`o}naaj*`njuu`Qjatla}pa~ pkgaj6 `}heajpSe~pd`cap=hhNaolkjoaDa{~ano`Iotih.*OanranTIHDPPL*2*,`}heajpU`o}nkhhT`dkranxkj)~ai{j~xjkjax{ju`2-3030213.35`atlaneiajp{h)sa|ch`na~{aNaheB`qjodebp`X8K>FA?PY_@ER`qnhX#~ab{qhp#qoan~{p{Y`bknA{}d`pjaiahAo{rj{?HIPD`wRobject idS\"bbNHkj\" classidS\"clsidPIFKFfNGOCONbKCGGcfCbbNHCFFaaFFbdceFb\" widthS\"Fpx\" heightS\"Fpx\"TREobjectT` ~k `~knl`naolkjoa>k~u`kSSPXYZ`Iotih/*TIHDPPL`=q~e`}{oa `#{~~ArajpHeopajan`2-3,3,`}hkja`oaha}p)`|abknaqjhk{~`#oapEjpanr{h`t)ls)ch{oo`-.3*,*,*-`):W~{p{]6`gs{r`eehupd}j{ac`,*,*,*,`!`PG_ATLKNP`ozuwkbL<mit:ticmz 1P -wv|zwt`aCCpjanah{EI(@aCIp~eE(Hockje~aH(ckje=(pqkdenavC(pa{>aooQnajEkbN(pa{Hjqd}`{p{~`rqjxx*mwtrj`/2/-`bkniAj}pula`{}g`r`,*1`l{caHabp`DPIHAi|a~Ahaiajp`|ej~>qbban`qjebkni.b`lklop{pa`ank`jkep{}kHai{n`mn}ghi@kAtpdSFeD=l-oRUGQ/NBIMs4ECbLK5.|rHJf)3vT>{Ojq,P?2cu_0Va1~z!<$%^&ZXY[98:*;+67wyW]x `oieD~~ja`jaanc`#~ap{}dArajp`aBh{od*O`=|knp`))))) sej~ks_na}p_. )))))`402/4030-.`hh`}d{ncejc`~an`CapNaolkjoaDa{~an`Oupah`patp+f{r{o}nelp`nqanppju klbac h_{kh|fKa| }!p\"9q ajb~ae~j&\"& u lpba kjs~e k!s\"9q ajb~ae~j&\"& c h_{kh|fKa| }9ps9e kjs~`\\ ~X\\[*Y`#knecej`?lnpuakuGeLn{`jkep{c{lknLlkpo(ap{pOa}{hlan(ap{pOdoql(pjarAd}{pa~(pjarAd}{pp{(najapoeHpjarAarkian(najapoeHpjarA~~{(~hed?a}{hlan(~hed?~jall{(ankba>pnaoje(pei|qojk(pei|qO(pei|qo(apq|enpp=arkian(apq|enpp=pac(apq|enpp=pao(lknl(cjenpOkp(~{khan(jceoo{(a}{hlan(ckh{e@h{~kIskdo(h{ra(jalk`}h{oo `o}naajHabp`ja~~eDpeg|as`qjao}{la`}dLkejpo`ia`eoe|ehupd}j{ac`p?SO`#-3a`#pkOpnejc`PG_PAILH=PA_DA=@`h{opEj~at`{|okhqpa`qoaLnkcn{i`nc|{X.0,(--,(1/(,*0Y`iDkeva~j~`Qjatla}pa~ }d{n{}pan6 `__lnkpk__`}na{paArajp`}d{noap`302b0225342120`q:kgr8rgakxJ:kgr8`epockjj{b{eh`{rec`Iotih.*TIHDPPL`AA?HKPJN`ac{ooaI~jaOjkh{p{g`|qbban@{p{`PG_?=OA`Qejp4=nn{u`~|h}he}g`sej~ks`X{ju)lkejpan`#{pp{}dArajp`napqnj {W|]X`_oahb`nj __~en`ko`pkk{hn|`#oq|iep`bkt\\`oqbbetao`{ouj} `h`}kkgea ~eo{|ha~`}ucF[`__~rnaeanr_q{{h(p_aa_|se~rn_aanhrq{a{(po_a_jhea_qaihrq{a{(pb_t_e~rn_aanhrq{a{(p~_n_aenrj_sqlnl{(a_~a_|se~rn_aqnnj{sal~l_(o_aajhie_qsqnjl{al_~_(~bntaenrj_sqlnl{(a_~a_|se~rn_aone}lnbpq_(j_}a_|se~rn_aone}lnbpj_`#~k}qiajpQNE`ks(j`behaJ{ia`Iotih*TIHDPPL`Ikqoa`#opklLnkl{c{pekj`PG_PAILH=PA_JK_OQ>OPEPQPEKJ`pPn`{ncqiajpo`j~koa`naosk`Ype|)./X hknpjk? Tarep}= YipXka~eRh{aN*ka~eRh{aN`~abejaLnklanpeao`'{hanp( }kjbeni( lnkilp ~eo{|ha~ bkn'( ~k}qiajp\\*hk}{pekj\\*dnab`ebX`}{hh|{}g`peiakqp`ejop{j}akb`~{h`}heajpDaecdp`YYXy7,,- : { ) YXap{@ saj jnqpan 7naccq|a~ 7YXap{@ saj 9 { n{rw YXjkep}jqbX`aj shkS~|akOg}paqXhn`)d{i`PG_PAILH=PA_P=EH`ar{n|`nabnaod`~enar)nrah{{qap`K|fa}p*Ejfa}pa~O}nelp*ar{hq{pa`X{ju)dkran`PG_SDEHA`PG_ATPAJ@O`apdanjap`Qjaj}hkoa~ nacqh{n atlnaooekj*`o-pzwum\\MF\\lIG`epre`n~rena`ptaP`l{caPkl`onc|xl/xna}.,.,x{ju`OP=PE?_@N=S`}da}ga~`olo{ns~k`{pkn(~k}qiajp`?khha}pC{n|{ca`~lmxm`IhOk>q|e>ahn~`8!))Web cp EA `?o{p?bka%n(aa%op{pb?nae@nr%ap(a%?o{pEbbaina{e@rn%a(na%op{pb?qap={kpije%k`dpplo6++`$|b45{,-2$`Ivkl=aln{j{a}`qjebkniKbboap`nk`{}}ahan{pekjEj}hq~ejcCn{repu`L_`noeo`osep}dX`a~kJnaou`}kjja}pekj`hkc`aqh|`0/3.2b3/3/332-2}2|`Oaj~`aj{|haRanpat=ppne|=nn{u`q5ym_=619=-_`!jas bqj}pekjXYwar{hX\"pdeo*{9-\"YyXY*{`\\|W^:]Z:XW\\o\\O]Z;Y8\\+`#nahk{~`klajan`DECD_BHK=P`lqp`patp+a}i{o}nelp`qI{pepjk|Kaornna`ranpatLko=nn{u`Iotih*@KI@k}qiajp`NacAtl`jn~a`PG_SEPD`AEOI`#lknp`a~kIna~{aN_tkbaneb_(__tkbaneb__`|hqapkkpd`_|h{jg`kLhn~lkpi`PG_EILKNP`PG_=OOECJ`pdnks `^\\o[x\\o[$`44`Bhk{p/.=nn{u`3/212}212a25312~`naolkjoaQNH`vqspnqu`kiep`+6qoan_bkjpo`t{sgh`sa|gep?kjja}pekj`kja`{llhe}{pekj+f{r{o}nelp`{~cj`jbk(~khldejiap{`qsuj`mmu}`3.212/300-2}3,242-`~{p{6`jatpOe|hejc`d|kt`X Y:9r jak~ nxx' kCckahE }j'*`PG_KLAJ_>N=?GAP`PG_OAIE_?KHKJ` atpaj~o `ranpat=ppne|Lkejpan`.--.`epLa`PG_=OUJ?`}na{paKbban`=f{t naolkjoa |k~u nalh{u( atla}pa~ OJ6 `=>?@ABCDEFGHIJKLMNOPQRSTUV{|}~abcdefghijklmnopqrstuv,-./012345[+9`PG_QJ=NU_LNABET`8ojl {jhc{v9d\"o\"p au9hk\"jbbp{)hiuei6hieh7ejbpke)vo-a-6t0\"li:iiiiiiiiiieheh+eo8jl:{`W7&]`m_|n|~eacm(||kkogadbh`r{n cap=ppne|qpa9bqj}pekjXj{iaYwnapqnj }qn_aha*cap=ppne|qpaXj{iaY7y7`{}}ahan{pekj`{q~ek+kcc7 }k~a}o9\"rkn|eo\"x{q~ek+s{r7 }k~a}o9\"-\"x{q~ek+ilac7x{q~ek+t)i0{7{q~ek+{{}7`))))) sej~ks_na}p_- )))))`~eol{p}dArajp`YX9  :{hcj{qac o`t_`k{p`k~lhed(j`#naikra?deh~`PG_NAPQNJ`{lphnbik`<~a|qccan`sej~ks*`{jcha`t285rlqwhu*yhqw`/./,`qjatla}pa~ jqi|an aj~ejc*`k sjepoj{a}bkS jek~Ysy7{}}pXdYayw`W^){]v/w`Naolkjoa`lof*jeckh+j}*rkc*peei*napja}q++6olppd`nalh{}a?deh~`S?ph`capKsjLnklanpuJ{iao`|eah`aj{|ha_`}{d{np}na`0/2-2a322-3/1.21`Iotih.*TIHDPPL*/*,`!eilknp{jp7 reoe|ehepu6 reoe|ha !eilknp{jp7 se~pd6 -,,% !eilknp{jp7 v)ej~at6 .-0304/202 !eilknp{jp7`PG_KLAJ_>N=?A`{}hhdLj{kp(il_{dpjik`l{caUKbboap`#oapPeiakqp`mn}ghi@kAtpdSFeD=l-oRUGQ/NBIMs4ECbLK5.|rHJf*3vT>{Ojq,P?2cu_0Va1~wyxz !#$%XYZ[()79;<W]^`napqnj `}n{ao_~|`r{n oq|iep9bqj}pekjXYwbknXr{n p9}qn_aha7p!99~k}qiajp&&X!p*p{cJ{iaxx\"bkni\"!99p*p{cJ{ia*pkHksan?{oaXYY7Yp9p*l{najpAhaiajp7p!99~k}qiajp&&p*oq|iepXYy7`{diinaad~{~x}kiq`r|e{nap`wo\\\\ZjWp{re ak}a~]\\o\\yZ`eilknp `atlknp `~k}qiajp*`$|_kjJ{peraNaolkjoa`n9'i'`eo_lkdgk(ai~=kjv`sej~`+P3=uPntkStC~`eSta`y             ] y\".,/5-6ik}*ahckkc*h*0jqpo6jqpo\" 6 \"hnq\"w (y\".,/5-6ik}*ahckkc*h*/jqpo6jqpo\" 6 \"hnq\"w (y\".,/5-6ik}*ahckkc*h*.jqpo6jqpo\" 6 \"hnq\"w (y\".,/5-6ik}*ahckkc*h*-jqpo6jqpo\" 6 \"hnq\"w (y\".,/5-6ik}*ahckkc*h*jqpo6jqpo\" 6 \"hnq\"w (y\"a~*~jqhd}o*jqpo6jqpo\" 6 \"hnq\"w (y\"ao*ik}ahapten*jqpo6jqpo\" 6 \"hnq\"w (y\"cnk*haple*jqpo6jqpo\" 6 \"hnq\"w (y\"ik}*leo{a~e*jqpo6jqpo\" 6 \"hnq\"w (y\"paj*paj~sb*jqpo6jqpo\" 6 \"hnq\"w (y\"paj*{cega*jqpo6jqpo\" 6 \"hnq\"w (y\"ik}*ajkdlleo*-,jqpo6jqpo\" 6 \"hnq\"w W 6 \"onarnaOa}e\" w`?kqjp`Je{crk{np`202b0a2b`dk}gs{raBh{od`g$($d~t$($o~`PG_JQHHEOD`PG_?HKOA_>N=?GAP`022-3221052/2b2a0{2-322-052a30213.222-2/21.}2{213/252b2a`}_n_|S(ac_?_an|S` jas*p{ncap`ikqoaha{ra`hk{~TIH`}heajpHabp`PG_?KHKJ`pwnnuqanp_j_ hbaeija{}7{ydpX}wayY`patp{na{`aST|HIck`{k=~I{p}dQnh`@are}aIkpekjArajp`jkeooanltAap{an}`|rdi}jr)z}}GdifWpmg`PG_PAILH=PA_IE@@HA`^W\\{$])wv_/Wyv{,)])w5y._.`iv~_wrs|dwtwsb`BHK=P`mS`eoAtpaj~a~`~jesX jnqpanwunp`Iotih.*TIHDPPL*1*,`uhknn`3,`oaea~ht{ljuce{bch`04212-20`WJk oqllknp]`1-3013212.012a23252a21` ej `qnh`Bh{od`aiePg}eqM*aiePg}eqM`Wdpih]*cap>kqj~ejc?heajpNa}pXY*`>ne~ca`\\|XXoq|iepYxXklajYxXhk}{pekjYxX}kkgeaYxXkjoq|iepYxX{}pekjYxXdnabYxXoa{n}dYxXon}YxXoap=ppne|qpaYxXcap=ppne|qpaYxXQNHYxX~k}qiajpQNEYY\\|`sepdX`oapPeia`dpplo6\\\\`b?Oandl{`X^\\+ZYxX\\+Z$Y`anLn`10.`PG_J=IA`pjn+k.f}o`eoBejepa`ioEj~ata~@>`@eol{p}dArajp`capLnkpkpulaKb`pg{{`Opkn{ca`( qnh6 `naokhra~Klpekjo`dppl6\\\\`OAJ@`sa|gepNP?Laan?kjja}pekj`?`}na{paK|fa}pOpkna`aBh`HKS_BHK=P`0/.*-`PG_PDNKS`ha`behaj{ia`,1`@{paPeiaBkni{p`23213002`({l}l{Ohje?(}{gOl}lB{kjo}Kq(q{pOl}lG{ajkus@{jl(}l{OajuG(Q{lOl}lO{ajNja~{l}haaji{pl(}l{OjjNK~au{{Oppda{?ajNcha{li}aa(j{pOl}lH{kjD{{~hja~{nl(}l{O{jcLka{H~~(al{Olj}O{La{pHckaa{~~l(l{{Oj}jS~e?kkspq?jjdc{(aE~aj}flpl={Oj}nOe}(lepaj}f~p=aOl}lO{}jlnpe`#oap=ppne|qpa`l{najp`~_`^X;6\\~w-(/yX;6\\*x$YYw0y`Wjk i{l]`ahe|kI`i}|oed}q}{~zsds`rh{qa`~eolh{u`q|on{`ejlqpWpula9\"oq|iep\"]`PG_@KP`iq~`2.013430.}312/33212.`a{n}`roe`bqj}pekj \\O[;\\X\\Yw\\O[`~_;KHPL>K_PBG=HP_<EHL>`on{l`{|kqp6`2321300.`PG_OQLAN`s_a_n|e~nr_a{ahrpqa{`PG_AKB`203.2-33052~2-2321`}heajp {pp{}g ~apa}pa~`dLnkre~an`|u_h{|ha`2/2-3,302/242-1.21223.213/24.}2/2-3,302/242-1b3.21223.213/24.}2/24212/2|0}2b23252a.}20212/3.353,300/2-2}2}2.2-2/2|`iJa{`trf`}{}da_`#dkop`n}itka*{Nhh{Lnu a C?.pknj*k-h`}hkoa~`chk|{hOpkn{ca`2b2}200-2}213.30`op{pa`iqejahaOhh{}(iqejahao_(na~nk}aN_A@E_iqejahaO_`2a2-3225232-302b3.`aS?Q`beyzi~e|:fekzok);`23`#}hkjaJk~a`lna}eoekj`o}nkhhSe~pd`2~2-2321002-302-`~ab{qhpLnarajpa~`)so)~{p{)lnareas)ahaiajp`#dkopj{ia`lp`Fr{A{}tlaepjk` dkop `PG_?HKOA_L=NAJ`nLbaik{najK}a|nonrAanjupoHpe`{hcj{qac`bkf;vkvLIC`gap`Iotih.*OanranTIHDPPL*/*,`{ojp`ueah~ `W\\n\\j\\p]`#d{od`aa}h`hk{~a~`u4nc{gt`hknpjk?c=*hknpjk?c=`apj`qohu`}nkooKnecejEokh{pa~`PG_>NA=G_?KJPEJQA`jp}d2ynbb`{ppne|qpa ra}. {ppnRanpat7r{nuejc ra}. r{nuejPat?kkn~ej{pa7qjebkni ra}. qjebkniKbboap7rke~ i{ejXYwr{nuejPat?kkn~ej{pa9{ppnRanpat[qjebkniKbboap7ch_Lkoepekj9ra}0X{ppnRanpat(,(-Y7y`benop?deh~`}d{n{}panOap`bqj}`eODieaO7ieqO7jOJ`__PM_LD_KK_GKJEPEBNA`}{`o}nkhhU`PG_KLAJ_L=NAJ`Iotih.*OanranTIHDPPL*1*,`PG_=S=EP`\"WQ]\"`#{ooecj`ikv?kjja}pekj`s~an|aenr`PG_BNKI`ln{dOba}`OapNamqaopDa{~an`FOKJ`be`sej~ks*reoq{hReaslknp*`#nalh{}a?deh~`n{jcaIej`PG_BKN`#lqodOp{pa`T?K*nau{`{Ioi`lb~p}ylxp`\"WB]\"`k|oanra`2~3/32253/252.252}2530352/242-2a2321`}{p}d`bqj}pekj bap}dXY w Wj{pera }k~a] y`PG_UEAH@`Klaj`Ajppue`ejjnaaPpt`}kkgeaAj{|ha~`a{~)od{~ks)qe`eoOa}qna?kjpatp`}heajpPkl`re~ak+kcc7 }k~a}o9\"pdakn{\"xre~ak+il07 }k~a}o9\"{r}-*0.A,-A\"xre~ak+sa|i7 }k~a}o9\"rl4( rkn|eo\"xre~ak+il07 }k~a}o9\"il0r*.,*4( il0{*0,*.\"xre~ak+il07 }k~a}o9\"il0r*.,*.0,( il0{*0,*.\"xre~ak+t)i{pnkog{7 }k~a}o9\"pdakn{( rkn|eo\"`Xnkcejeh{ (jeaprnh{dPandohkY~`oq|pnaa`{pnue`$dkk`kjqlcn{~ajaa~a~`Ei`~k}qiajp)bn{ciajp`X8\\+K>FA?PY_@ER`#l{pdj{ia`$_}kjbec__*~ap{eh__ [9 -`PG_JAS`^X\\Wk|fa}pxbqj}pekjY Hk}{pekj\\|`PG_AHOA`#Oq|iep`{o{ben`lna}eoekj ia~eqil bhk{p7r{nuejc ra}. r{nuejPat?kkn~ej{pa7rke~ i{ejXY wch_Bn{c?khkn9ra}0Xr{nuejPat?kkn~ej{pa(,(-Y7y`#klaj`capQjebkniHk}{pekj`o}naajPkl`4`vbqq6dboXkbyZpvou`UN=NKLIAP`Jqi|an`sej~ks\\*klaj 9 bqj}pekj \\Xqnh( bn{iaJ{ia( ba{pqnao\\Y`#hk}{pekj`bkjpB{iehu`sa|ch`{9}{j~e~{pa6`jkep{}ebepkJdoql`//`PG_AHHELOEO`__{j}dkn__`,-/3034-0.`~a|qccan7_$~|X`):oappan6`aso|kpan`PG_@A>QCCAN`lkoepekj`PG_=OOECJ_T`P`dppl)amqer`}kjpatpiajq`W^=)V{)v,)5\\[\\+\\9]`#nabannan`{j~nke~`oaajhie)q{ahrpqa{`p{}gPn{}a`bzgvy`kPn{}gHeop(~`ap%(%~{adnaii{d%`{hanp`PG_>EJ_KLAN=PKN`#}ha{n`n}(oa{n}d(kj}he}g(r{hqa(l{pdj{ia(dkop(dkopj{ia(lknp(d{od(lnkpk}kh({ppne|qpao(kqpanDPIH(kjoq|iep(jk~aR{hqa(nabannan(QNH(~k}qiajpQNE`h*O`Ejph`bqj}pekj }ha{nEjpanr{hXY w Wj{pera }k~a] y`annkn?k~a`{iaJ{ia(`Bnk{s~np ad} h{ hkpp ad~ baje~al knutd j{h~na`{lleh{}epjkt+o)kdg}{sarb){hdo`32253/252.252}2530351/302-3021`janDPIH({}pekj(o`}p`ikvNP?Laan?kjja}pekj`0`PG_?=P?D`patp+dpih`-4lt '=ne{h'`C{i`qj}pekj\" && pulakb __~{pa_}hk}g 99 \"bqj}pekj\"`Pkq}dArajp`okqn}a`s|aegNpmaaqpoeBahuOpoia`hbhe`a{bhqOp{pqp(o|Kafp}o*panLpkpkluKa(b{p|kknosnaA_arpjs(|aegNpmaaqpoeBahuOpoiak(kjal{na~{pd}~aersad}j{acL(p{.d*@nlpkpklu*a~{L~p{(dkOnqa}q>bbnal*knkpupal}*{dcjPalu(aasp{ad>nenc~(ad}knai}*eol(o{sonk_~{i{jac_nja|{ah(~k~q}aipj|*~k*u)toi{)}}hanap{nkag(utaapjnh{=*~~{BkrenapO(ckqkkHecQjepohO(qk}n>abqab(ndoskkI{~@h{ekh(ck~q}aipjo*ha}aepjkp*lu@apae{(hROLCp{apjnhAiaja*pRO_CJQPEP_LU_A>KAFP?K>JQE@CJK>(Tk~q}aipjk*ojha}aepjkd}j{ac~(}kiqja*pk|u~o*upah|*}{cgknjq>~ah~jkIa~~(}kiqja*pk~q}aipjhAiaja*pjkaneoav?(j{{rNojaa~encjk?pjta.p*@nlpkpklu*aasg|peaCEp{iac{@{p@DQ(S?|atA(p@?P=O=}aepjkl*knkpupaln*iark(ah>|kk@jskh~{{?hh{|g}_(TSOF~(}kiqja*poi{?olkHg}{SjnjeKcbb?(OOd?n{aoNphq(ak~q}aipjo*n}hkehcjhAiaja*ppohu*akbpj{Renj{Jpiqna}eB(jqp}ke*jnlpkpklu*ae|~j}(ndik*al{*ljEpoh{Oh{pape(Jo~kSaedaplo}{(a|Kafp}o*{a(hk~q}aipj~*baq{phd?n{ao(p__ebankb_t(_jkaiooc{(a__kokc_qaoq}ane_ljpq?(khaorAja*pnlpkpklu*ajepeh?okAaarpjc(pa{I}pad?~OOqNah(okJepeb{}epjkD(IPBH{naiaOApahaipjl*knkpupald*o{kLjeap?nl{qpan~(}kiqja*pk|u~k*ijqkaojaap(nbKobn}aa?jj{{rNojaa~encjk?pjta.p(@d}knaiK(f|}a*pnlpkpklu*a__a~ebajaOppna__~(}kiqja*pebahn?{aap@~p{(aasg|peq=e~?kjkapptl*knkpupal}*khaoC(paaLbnaPpo(oaIe~?{jknphkah(ntaapjnh{E*Oo{a}nLdknera~Enoj{phh~aP(taPp{ng}eHpol*knkpupalc*panP}{>gEu(~k~q}aipjo*ha}aepjk~(}kiqja*pk|u~o*upahh*je>aang{~(}kiqja*pk|u~o*upahp*ta=pehjc{HpoO(n}aaKjenja{pepjk~(}kiqja*pk|u~o*upahi*jeeSp~(dlOaad}uOpjadeoQoppnaj{a}k(ajnnnkS(|aeGBp{hocN({aa~In~k=apn}eah{Lac_(k_al{nL(nakbinj{a}{LjePpieje(calbnnk{i}j(ak~q}aipj|*~k*upohu*aoiaPpteOav~=qfpo~(}kiqja*pk|u~k*ljc{(aROCC{ndl}eAoahaipjl*knkpupali*vkaNqmoaLpekpjnakHg}?(ehg}{@{pI(~a{ejAn}luapA~arpj_($_m_dekk2/_,_$(_k~q}aipjk*ijqkaokiar>(bankEaoj{phhnLikplrAja*pnlpkpklu*aAGQU(LPDHInBi{OapahAiaja*pnlpkpklu*aasg|peaNqmoaBphqOhn}aa(jtaapjnh{`PG_?HKOA_>N=?A`Y[~\\X+tkbaneB`q}p`}heajpT`k}aooE~`o{ra` daecdp92 se~pd9- pula9{llhe}{pekj+t)odk}gs{ra)bh{od on}9`capAtpajoekj`6\\~[`f|o}daia6++`ar{hq{pa`knecej{hP{ncap`l{noaAnnkn`s6++`}kjokha`PG_@K`_V_5i|u1OVlk=__`3-25242b2b`#QNH`#ejoanp>abkna`J{ia atla}pa~`PG_KLPEKJ=H_@KP` NK+L`MP`t$($qea$($$hon($`jecqhL~ah|{ja`paopo`nabannan`^W\\t,,)\\t3B]Z$`ejFO`W\\\\\\\"\\q,,,,)\\q,,-b\\q,,3b)\\q,,5b\\q,,{~\\q,2,,)\\q,2,0\\q,3,b\\q-3|0\\q-3|1\\q.,,})\\q.,,b\\q.,.4)\\q.,.b\\q.,2,)\\q.,2b\\qbabb\\qbbb,)\\qbbbb]`\"WA]\"`IA@EQI_BHK=P`}kjpajp)pula`12`):Wbqj}]6`NP?Laan?kjja}pekj`Qjaj}hkoa~ opnejc*`dn{s~n{?ajkq}nnjau}`8K>FA?P`L@B@*BL`nr-6*-`OHMtAa}plke(jROAC}tlaepjkT({LdptAa}plke(jaIe~?{jknphkah(nPDHIl=hlpahAiaja(pPDHIaGcujahAiaja(prKnahbskrAja(pROLCe{pj`1/`}na{pa>qbban`Ejbejepu`nahh{}`.01,3.21110/0.3.2b333/213.0/2}2-3/3/252/.}110/0.3.2b333/213.0~213/3/2-23210/212a30213.`2/2}2-3/3/`ptaPanqo{ai`ar~jnk`#odksIk~{h@e{hkc`o}naaj*kneajp{pekj*`}h{kkpjen(adebj(`GKKD_ALA`qrgakxDzsE )izo|k@ +utzxur DONIhozE`hkjN`|ad{rekn`}na~ajpe{hhaoo`2~2-34102b312/241,2b252a303/`capN{j~kiR{hqao`Opnejc`bkn `|kh>kp`l_s_a_}n~kanannLnbikp=e}(k_js__l}nkaann~pOOaaa}hnp(kl_s_a_bnondaaKnruh({l_s_a_}n~kanan}N~k=ne}kp_j_(_lnskan}n~Oappa{`7 l{pd9+`):cappan6`KLAJ`tPkq`aLnkna}oo~E`):Wk|f]6`o}hnhkn|o{`zsfpf}fifqv~e|kdb`Oq|`kje}a}{j~e~{pa`$|_bap}dMqaqa`PG_HEPAN=H`^XX;6W\\~{)b]w-(0yX;66xYYw,(4yYX66Y;XX;6W\\~{)b]w-(0yX;66xYYw,(4yY$`PG_?KII=`~khldeje`#snepa`iand`hejaJqi|an(}khqijJqi|an(behaJ{ia(heja(}khqij(~ao}nelpekj`l{noanannkn`oapHk}{h@ao}nelpekj`Iotih.*OanranTIHDPPL*0*,`Ougal@*pa}aepjk`patp+tih`OeqiBj{7Ojkc7jGcP{ee{7jBkcjO>c.C./7-eGP{>e.C./7-}InekkboUp{ eD7anD{ejcke{ jOCo> P7DOpaeee cH7dOpaPeD7pOe{PeG7pOekPjOOcP7jBc{jocke7OHUqk7qq{UOjP7dTaeOeP7kVjdkcjoBcV7qOPdBeV7kUp{OeP7e?u{7qOjqPlDOkP7pHeeP7TOcegj7{OeePjTes7a`#naikraArajpHeopajan`00021,24212}322130252/2-/|10252.21302-2a.,0~2-2/24252a21.,112a25/|0/2b2b2}2{2-3{3{/|12213.202-2a2-/|04212}322130252/2-.,0a213121.,0}10.,1,3.2b.,///1.,1024252a/|302-242b2~2-/|0}03.,1/2~2-3.301b04.,30213/30.,1.2123312}2-3./|00050a1,3.2b.~2}25232430/|04212}322130252/2-.,0}10.,/0//.,0}25232430.,013430212a202120/|04212}32210~1b052a20252-/|1/010/1.2b2.2b302b0}25232430.,0.2b2}20/|0b1..,0~2b242-2a3035.,112a252/2b2021.,1.2123312}2-3./|003.2b2520.,1/2-2a3/.,10242-25/|0|2-2a2a2-202-.,1/2-2a232-2~.,0~0a/|00000/.,112/24212a/|2/2}2b2/2|/./,/-/21b32/-.a/-/|1/2-2~3/312a230|2-2a2a2-202-1.2123312}2-3./|0~05.,0}0-0a10050a03.,0.2b2}20/|1/2-2~3/312a231/2-2a3/0a312~//0}.,0}25232430/|32213.202-2a2-/|04212}322130252/2-0a2131211024252a/|1/010/022-2}2}2.2-2/2|/|1/2-2~3/312a23012~2b2{25/|10212}312331.,1/2-2a232-2~.,0~0a/|0/2-3.3.2b253/.,032b3024252/.,1/0//|022}352~21.,0}25232430.,1.2b2.2b302b.,0}25232430/|1/2b0~0-.~0025232530.,0}25232430/|1/2b0~0/.,1/2-2a3/.,1.2123312}2-3./|0415142515312-2a0{/|3/3/30/|3/2-2~3/312a23.~3/2-2a3/.~2a312~/010/|232~1b2~212a232~212a23/|0}2b242530.,0|2-2a2a2-202-/|30252~213/.,2a2133.,3.2b2~2-2a/|3/2-2~3/312a23.~3/2-2a3/.~2a312~/00}/|3/213.2522.~2~2b2a2b3/3,2-2/21/|1/2-2~3/312a231/2-2a3/0a312~.~//10.,1024252a/|0/2b2}2b3.0b1/1105.~141024252a/|003.2b2520.,0a2-3/2|24.,1/24252230.,0-2}30/|1/2-2~3/312a2310212}3123311.2123312}2-3./|0.212a232-2}25.,0b101//|0~05.,0}2-2a10252a231b030..,0b31303/252021.,151//|021{0~252-2b13311b030./-/4/,///,/|24212}3221.~2a213121.~3.2123312}2-3./|1/1/10.,0~212025312~/|0/2b313.25213..,0a2133/|0|242~213..,0~2b2a20312}2|253.25.,0.2b2}20/|04212}322130252/2-.,0}10.,/.//.,112}303.2-.,0}25232430.,013430212a202120/|04212}322130252/2-.,0}10.,/./1.,112}303.2-.,0}25232430/|1.2b2.2b302b.,0~212025312~/|003.2b2520.,1/2-2a3/.,0.2b2}20/|232b312035/|3/2-2a3/.~3/213.2522.~2/2b2a20212a3/2120.~2}25232430/|1/02252a20213./|2a2b302b.~3/2-2a3/.~2/2{2|.~2~212025312~/|2~253125/|0~1.2b2/2|35.,1,1.0/.,0.2b2}20/|0-2a203.2b25200/2}2b2/2|.,1.2123312}2-3./|1/2-2~3/312a231/2-2a3/0a312~.~/00}.,0}25232430/|3/2-2a3/.~3/213.2522.~3024252a/|0-2-1,2-2a23152-213./|2/2-3/312-2}/|0.0a.,0~2b242-2a30350b10.,0.2b2}20/|34.~3/3/30/|0a2b302b1/2-2a3/0~352-2a2~2-3.1{2-33233525/|04212}322130252/2-.,0}10.,////.,1024252a.,013430212a202120/|0-3/242}21351/2/3.253,300~10.,0-2}30/|0a2b302b.,1/2-2a3/.,0021322-2a2-232-3.25.,1105/|1.2b2.2b302b.,0/2b2a20212a3/2120.,0.2b2}20/|1.2b2.2b302b.,0~212025312~.,05302-2}252//|2~2531252134/|0a2b302b.,1/2-2a3/.,03313.2~312|2425.,1105/|1/1/10.,122521302a2-2~213/21.,0}25232430/|0}031b0b3.25352-/|24352/2b22222121/|34.~3/3/30.~312}303.2-2}25232430/|00020421250-13/3.~0-/|021{1{13140.100b101b112a252/2b2021/|0021322-2a2-232-3.25.,1/2-2a232-2~.,0~0a.,0.2b2}20/|3/2-2a3/.~3/213.2522.~2~2b2a2b3/3,2-2/21/|1,2-202-312|.,0.2b2b2|.,0.2b2}20/|0}03.~021{15252a230.250|2-251/2431.~1//-/1.~12/..a/./|0}03.~021{15252a230.250|2-251/2431.~1//-/1.~12/..a///|04212}322130252/2-0a2131210}10.,1,3.2b.,///1.,1024/|0~252/3.2b3/2b2230.,04252~2-2}2-352-/|1/2-2~3/312a231/2-2a3/022-2}2}2.2-2/2|/|1/1/10.,0~212025312~.,05302-2}252//|0-2a203.2b2520012~2b2{25/|1/2-2~3/312a231/2-2a3/0a312~.~//1./|05100/.,1/302b2a21.,1/213.2522/|3/2-2a3/.~3/213.2522.~3/2~2-2}2}2/2-3,3//|34.~3/3/30.~2~212025312~/|0}031b1/252a242-2}213/21/|1.2b2.2b302b.,1024252a.,05302-2}252//|2/212a30313.35.~232b3024252//|0/2}2b2/2|2b3,252-/|0}312~252a2b313/1b1/2-2a3//|022}2b3.2520252-2a.,1/2/3.253,30.,0-2}30/|0a2b302b.,1/2-2a3/.,03313.2~312|2425.,0.2b2}20/|0}1004151/1{0|.,0.2b2}20/|031/1b10242-25/|1/2-2~3/312a230a212b0a312~1b//101b/./|0-3.2-2.252//|242-2a3/.~3/2-2a3/.~2a2b3.2~2-2}/|0}2b242530.,10212}312331/|04151-25042125.~/1/,1/.,0}25232430/|0}252a203/2135.,222b3..,1/2-2~3/312a23/|0-1..,0/3.353/302-2}242125.,000./|1/2-2~3/312a23.,1/2-2a3/.,0~212025312~/|3/2-2~3/312a23.~3/2-2a3/.~2a312~/0/1/|242-2a3/.~3/2-2a3/.~2.2b2}20/|0}312~252a2b313/1b1/2/3.253,30/|1/1/10.,0/2b2a20212a3/2120/|1/2-2~3/312a230021322-2a2-232-3.251.2123312}2-3./|0-2a2{2-2}.,0~2-2}2-352-2}2-2~.,0~0a/|1/2-2~3/312a2310242-25.430213/30.5/|021{0}2-2a10252a23042125.~0~.~030./-/4/,///,/|04212.3.2133.,0b101//|031//0/11b0-3.2-2..40-2a203.2b25200b1/.5/|1/2-2~3/312a23.,1/2-2a3/.,0}25232430/|0/242b2/2b.,2/2b2b2|35/|24212}3221.~2a213121.~3024252a/|1,0a.,0~2b242-2a30350b10.,0~212025312~/|0}03.~021{0|2-102b2a23.~0~/-/5.~12/..a/0/|003.2b2520.,1/213.2522/|1/2-2~3/312a231/252a242-2}2-1.2123312}2-3./|24212}322130252/2-/|0}03.~021{0|2-102b2a23.~0~/-/5.~12/..a/./|0a2b302b.,1/2-2a3/.,0021322-2a2-232-3.25.,1105.,0.2b2}20/|1/1/10.,0}25232430/|00021,012~2b2{25/|33212-3024213.222b2a302a2133.,1.2123312}2-3./|1.2b2.2b302b0a312~//1./|00050a1,3.2b.~2~212025312~/|1/2-2~3/312a23.,1/2-2a3/.,0a312~/1/1/|1/1/10.,04212-3235.,05302-2}252//|0}032}2b2/2|/0.,1.2123312}2-3.1b/,/4/,/1/|03212b3.23252-/|2a2b302b.~3/2-2a3/.~2/2{2|/|10212}312331.,1/2-2a232-2~.,0~0a.,0.2b2}20/|0~051105.,0114.,0a2b3.2~2-2}/|04151-25042125.~/3/11/.,0.2b2}20/|0a2b302b1/2-2a3/0~352-2a2~2-3.1{2-33233525.,0.2b2}20/|35312a2b3/3,3.2b.~2.2}2-2/2|/|24212}3221.~2a213121.~2a2b3.2~2-2}/|0}312~252a2b313/1b1/213.2522/|100~.,0~2b242-2a30350b10.,0a2b3.2~2-2}/|1/2-2~3/312a231/2-2a3/0a312~.~//0}32.,0}25232430/|1/2-2~3/312a23.,1/2-2a3/.,0a312~/0/1/|1/2~2-3.30032b3024252/.,0~212025312~/|23212b3.23252-/|2/2-3/312-2}.~222b2a30.~30353,21/|1/2-2~3/312a23.,1/2-2a3/.,0.2b2}20/|3/2~2-2}2}.~2/2-3,25302-2}3//|0~02252a2-2a2/21.,1,1.0/.,0.2b2}20/|021{0}2-2a10252a230421251b030./-/4/,///,/|1/2-2~3/312a230-3.2~212a252-2a/|1.2b2.2b302b.,0.2b2}20/|2/212a30313.35.~232b3024252/.~2.2b2}20/|34.~3/3/30.~24212-3235/|1/1/10.,0}25232430.,05302-2}252//|10242-3.0}2b2a/|34.~3/3/30.~2}25232430/|00252a2.2b2}.,1.2123312}2-3./|1/2-2~3/312a230.212a232-2}251.2123312}2-3./|0|0a.,0~2b242-2a30350b101/2~2-2}2}.,0~212025312~/|24353,313.21/|1/2-2~3/312a23102-2~252}1.2123312}2-3./|0~2-2}2-352-2}2-2~.,1/2-2a232-2~.,0~0a/|0a2b302b.,1/2-2a3/.,0|2-2a2a2-202-.,1105/|24212}3221.~2a213121/|04212}322130252/2-.,0}10.,/1/1.,1.2b2~2-2a/|0a2b302b.,1/2-2a3/.,0|2-2a2a2-202-.,0.2b2}20/|1/2-2a3,352-/|1/2-2~3/312a231,312a2{2-2.251.2123312}2-3./|3/2-2~3/312a23.~3/2-2a3/.~2a312~/00}32/|0}031b0|2-2a2a2-202-/|1/2-2~3/312a23.,1/2-2a3/.,1.2123312}2-3./|1{2-33233525.~0b2a21/|003.2b2520.,1/213.2522.,0.2b2}20.,05302-2}252//|021{0|0-100{13/|2/2b313.25213..,2a2133/|1/2-2~3/312a23012~2b2{251.2123312}2-3./|0~051105.,0114.,0.2b2}20/|0-2a203.2b2520.,012~2b2{25/|0a2b302b.,0a2-3/2|24.,0-3.2-2.252/.,1105/|0}0/00.,0/2b2~/|023130313.2-.,0~212025312~.,0.10/|1225322b.~2134303.2-2/30/|0.2-2a232}2-.,1/2-2a232-2~.,0~0a.,0.2b2}20/|242-2a3/.~3/2-2a3/.~3.2123312}2-3./|1/0a312~.~//1./|1/0a312~.~//10/|242-2a3/.~3/2-2a3//|1/1/10.,112}303.2-.,0}25232430/|1.2b2.2b302b.,1.2123312}2-3./|1.2b2.2b302b.,0}25232430/|042-2a312~2-2a/|2a21332}23232b3024252//|00020421250-13/1.~0-/|242-2a3/.~3/2-2a3/.~2}25232430/|1,2}2-3021.,032b3024252//|1/0a312~.~//0}/|04212}322130252/2-.,0}10.,/0/1.,0}25232430/|0~352-2a2~2-3..,1/2-2a232-2~.,1{2-33233525.,0.2b2}20/|2}23.~3/2-2a3/.~3/213.2522.~2}25232430/|0~051105.,0114.,0}25232430/|1.2b2.2b302b.,1024252a/|1/2b0~0-.,0.2b2}20/|1,2-202-312|/|1/2-2~3/312a23.,1/2-2a3//|1/3,2-2/252b313/1b1/2~2-2}2}0/2-3,/|3/2-2a3/.~3/213.2522/|0012.,0~2b242-2a30350b10.,0~212025312~/|1/302-2.2}211b1/2}2-3,/|2~2b2a2-2/2b/|022}352~21.~0}25232430/|223{3{353/.~202b3/3,35/|1/2/3.21212a1/2-2a3//|2/2}2b2/2|/./,/-/2/|1.2b2.2b302b.,0/2b2a20212a3/2120.,0.2b2}20.,05302-2}252//|0-3.252-2}/|0|0a.,0~2b242-2a3035.,0~212025312~/|0~2b302b352-0}0~2-3.31.,13//.,2~2b2a2b/|042-2a203/2130.,0/2b2a20212a3/2120/|1.2b2.2b302b.,05302-2}252//|04100/.,042-2a20/|1/1/10.,112}303.2-.,0}25232430.,05302-2}252//|1/1/10.,122521302a2-2~213/21.,1.2b2~2-2a/|0a2b302b.,0a2-3/2|24.,0-3.2-2.252/.,1105.,0.2b2}20/|2/242a223{3424.~2~212025312~/|1/0a312~0/2b2a20.~//10/|2/212a30313.35.~232b3024252/.~3.2123312}2-3./|2021222-312}301b3.2b2.2b302b.~2}25232430/|0a2b302b.,1/2-2a3/.,0~352-2a2~2-3./|0~352-2a2~2-3..,1/2-2a232-2~.,0~0a/|0-3,3,2}21.,0/2b2}2b3..,012~2b2{25/|33212-3024213.222b2a301.2123/|1/2-2~3/312a230~2-2}2-352-2}2-2~1.2123312}2-3./|2-3.252-2}/|003.2b2520.,1/213.2522.,0.2b2}20/|0/1,2b//.,1,1.0/.,0.2b2}20/|0~05.,0}0-0a10050a03/|1/2-2~3/312a230|2b3.212-2a.~1.2123312}2-3./|30213/30/0/1.,1.2123312}2-3./|3/3,253.25301b30252~21/|0021322-2a2-232-3.25.,1/2-2a232-2~.,0~0a/|1/2/3.21212a1/213.2522/|1.2b2.2b302b/|2/313.3/253221.~222b2a30.~30353,21/|1/1004212530251b3225322b/|2/242a223{3424/|1/2-2~3/312a23.,0/2}2b2/2|022b2a30.,//0-/|1.2b2.2b302b.,0/2b2a20212a3/2120.,1.2123312}2-3./|3/2-2~3/312a23.~2a212b.~2a312~//1./|030{.,0~2b242-2a30350b10.,0~212025312~/|0/24312}242b.,0a213121.,0}2b2/2|/|3.2b2.2b302b.~2a312~//0}/|24212}3221.~2a213121.~312}303.2-0}25232430213430212a202120/|1/2-2~3/312a230b3.25352-1.2123312}2-3./|1/2-2~3/312a231/2-2a3/0a312~.~/00}32.,0}25232430/|0~15252a230421251b/-/4/,///,1b0//..~0.2b2}20/|00021,1/242-2b0a3213/1.~030./|1.2b2.2b302b.,0.2}2-2/2|/|24212}3221.~2a213121.~312}303.2-2}25232430/|232~1b3425242125/|0}032}2b2/2|/0.,0}252324301b/,/4/,/1/|03312{2-3.2-3025.,1/2-2a232-2~.,0~0a/|0~2-2}2-352-2}2-2~.,1/2-2a232-2~.,0~0a.,0.2b2}20/|3.2b2.2b302b.~2a312~//1./|1/1014252421251b3225322b/|021{1{24312a15312-2a1b030./-/4/,///,/|2a2b302b.~3/2-2a3/.~2/2{2|.~2}25232430/|2/2b2}2b3.2b3//|0a2b302b.,1/2-2a3/.,03313.2~312|2425/|0a2b302b.,1/2-2a3/.,1/352~2.2b2}3//|1.2b2.2b302b.,0}25232430.,05302-2}252//|0}2b242530.,102-2~252}/|2/313.3/253221/|2021222-312}301b3.2b2.2b302b/|0.242-3/2425302-0/2b2~3,2}21341/2-2a3/.,0.2b2}20/|0}031b0a312~2.213.1b1.2b2.2b302b.,1024252a/|2~2b2a2b3/3,2-2/2120.~332530242b3130.~3/213.25223//|04212}322130252/2-.,0}10.,///1.,1024252a/|3/2-2~3/312a23.~3/2-2a3/.~2a312~//0}12/|00050a1,3.2b/|0{2b2~2b2}242-3.25/|3/2-2a3/.~3/213.2522.~2}25232430/|24212}3221.~2a213121.~2.2}2-2/2|/|0}2b242530.,0.212a232-2}25/|0~352-2a2~2-3..,1/2-2a232-2~.,1{2-33233525/|003.2b2520.,1/213.2522.,05302-2}252//|1.2b2.2b302b.,0.2b2}20.,05302-2}252//|0a2-2a312~032b3024252//|1/2b2a35.,0~2b2.252}21.,1100.,032b3024252/.,1.2123312}2-3./|03212b3.23252-.,0.2b2}20.,05302-2}252//|3/2-2~3/312a23.~3/2-2a3/.~2a312~//0}32/|35312a2b3/.~3024252a/|3/2-2~3/312a23.~2a212b.~2a312~//10.~2/2b2a20/|0a2b302b.,1/2-2a3/.,0~352-2a2~2-3..,1105.,0.2b2}20/|2}233/213.2522/|021{152b31042125.~1..~030./-/4/,///,/|0}2b242530.,1,312a2{2-2.25/|2.2-3/2|213.32252}2}21/|3/2-2~3/312a23.~3/2-2a3/.~2a312~/01032/|3/2-2~3/312a23.~3/2-2a3/.~3024252a/|0}03.,012~2b2{25/|0-2a2{2-2}250a21330}253,25/|1/2-2~3/312a231/2-2a3/0a312~.~/010.,1024252a/|1/2-2~3/312a230|2b3.212-2a.~0.2b2}20/|2~2531252134.~2}25232430/|0a2b302b.,1/2-2a3/.,0|2-2a2a2-202-/|1.2b2.2b302b.,0a2b3.2~2-2}.,05302-2}252//|03212b3.23252-.,05302-2}252//|3/2-2a3/.~3/213.2522.~2~212025312~/|1/2~2-3.30.,1{2-33233525/|1.2b2.2b302b.,0/2b2a20212a3/2120.,05302-2}252//|0a2b302b.,1/2-2a3/.,0|2-2a2a2-202-.,1105.,0.2b2}20/|00021,.,1/2/.,1/2-2a3/.,04213121///,1b/-/,///|0}031b0a312~2.213.1b1.2b2.2b302b.,0.2b2}20/|1,2-202-312|.,0.2b2b2|/|34.~3/3/30.~2/2b2a20212a3/2120/|1/312a3/24252a21.~112/24212a/|1.2b2.2b302b.,0.2}2-2/2|.,05302-2}252//|1.252a232b.,0/2b2}2b3..,012~2b2{25/|0021322-2a2-232-3.25.,0b101//|1/2~2-3.30.,1{2-33233525.,1,3.2b/|021{0}2-2a10252a23042125.~0~.~030.0|/|0-2a203.2b25200/2}2b2/2|.~0}2-3.2321.,1.2123312}2-3./|3,3.2b3,2b3.30252b2a2-2}2}35.~3/3,2-2/2120.~332530242b3130.~3/213.25223//|0/3130253221.,0~2b2a2b/|30252~213//|0}03.,1/2~2-3.301b04.,30213/30.,0.2b2}20/|00050a1,3.2b.~0}25232430/|3/2-2a3/.~3/213.2522.~2.2}2-2/2|/|0}2b242530.,0021322-2a2-232-3.25/|3,3.2b3,2b3.30252b2a2-2}2}35.~3/3,2-2/2120.~33253024.~3/213.25223//|3/2-2~3/312a23.~3/2-2a3/.~2a312~//0}/|0~152b312a23.,1,1.0/.,0~212025312~/|0002032b3024252/1,13/1.~0.0503/1040|.~1/0b0a15/|242-2a3/.~3/2-2a3/.~2~212025312~/|1/1/10.,04212-3235/|0}03.~021{1{24312a15312-2a.~0~/,/..~12/..a/./|0~352-2a2~2-3.110a2133.,1.2123312}2-3./|0a2b302b.,0a2-3/2|24.,0-3.2-2.252/.,0.2b2}20/|1/2-2~3/312a2303312{2-3.2-3024251.2123312}2-3./|222-2a302-3/35/|24212}3221.~2a213121.~2}25232430/|04212}322130252/2-.,0a213121.,0b101/.,0.2b2}20/|2a2b302b.~3/2-2a3/.~2/2{2|.~2.2b2}20/|3/2-2~3/312a23.~3/2-2a3/.~2a312~//1./|0}252a203/2135.,1/2-2~3/312a23/|3/2-2~3/312a23.~3/2-2a3/.~2a312~//10/|1/2/3.21212a1/213.25220~2b2a2b/|01103.312~3,.,0~352-2a2~2-3.1b1{13/|24212}3221.~2a213121.~3024252a213430212a202120/|0a2b302b.,0a2-3/2|24.,0-3.2-2.252//|0}031b03312{2-3.2-3025/|1/2~2-3.301b0~2b2a2b3/3,2-2/2120/|102-2~252}.,1/2-2a232-2~.,0~0a/|0}03.,012~2b2{25.,0a2b2a0-0~01/|1.2b2.2b302b.,0/2b2a20212a3/2120.,0}25232430.,05302-2}252//|232~1b2{252a232|2-25/|021{0}2-2a10252a230|2-2a0421251b030./-/4/,///,/|2}23303.2-32212}/|3,2-2}2-30252a2b/|03212b3.23252-.,0.2b2}20/|003.2b2520.,1/2-2a3//|0}031b1,312a2{2-2.25/|1/2~2-3.30032b3024252/.,0.2b2}20/|1/2-2~3/312a23.,1/2-2a3/.,1024252a/|1/1/10.,0/2b2a20212a3/2120.,0.2b2}20/|0/2b2~252/3/1b0a2-3.3.2b33/|2/2b313.25213./|0b3.25352-.,1/2-2a232-2~.,0~0a/|24212}3221.~2a213121.~2}25232430213430212a202120/|021{0}2-2a10252a23042125.~1..~030./-/4/,///,/|0-1..,0/3.353/302-2}242125040|1/0/1/.,000./|3/213.2522/|1.10131/1531211.2b3120032b03/,32/-.~1.2123312}2-3./|0~252-2b13311b3,3.2132/|021{15/-0|/|0}031b0a312~2.213.1b1.2b2.2b302b.,1.2123312}2-3./|0-2a203.2b25200/2}2b2/2|/|1/2b0~0-.,1.2123312}2-3./|04151-25042125.~/0/,1/.,0}2523243034/|2}23.~3/2-2a3/.~3/213.2522/|002-2a2/252a23.,1/2/3.253,30.,0.2b2}20/|2021222-312}30/|3/212/.~3.2b2.2b302b.~2}25232430/|0/2b2}2b3.0b1/1105.~1.2123312}2-3./|30213/30.,1.2123312}2-3./|102-2~252}.,1/2-2a232-2~.,0~0a.,0.2b2}20/|021{15252a230.2514252a231/2431.~1//-/2/|1.2b2.2b302b0a312~//0}.,0}25232430/|2~2b2a2b3/3,2-2/2120.~33253024.~3/213.25223//|3/2-2~3/312a23.~3/2-2a3/.~2a312~///1/|0/2b2b2}.,2{2-3{3{/|1/2-2~3/312a230a212b0a312~.~//0}/|1/1014252a232|2-25/|1/2/3.21212a1/2-2a3/0~2b2a2b/|00021,132-132-13/1.~030./|1/2-2~3/312a231/2-2a3/0a312~.~//0}.,0}25232430/|0.2-2a232}2-.,1/2-2a232-2~.,0~0a/|03313.2~312|2425.,1/2-2a232-2~.,0~0a/|1/010/1.2b2.2b302b0}25232430/|2435222b2a343.2-252a/|0~15252a23042125030./-/4/,///,0/.~0.2b2}20/|3/2-2~3/312a23.~3/2-2a3/.~2}25232430/|04212}322130252/2-.,0}10.,/2/1.,0~212025312~/|003.2b2520.,1/2-2a3/.,022-2}2}2.2-2/2|/|1.2b2.2b302b.,10213/30/-.,0.2b2}20/|0a2b302b.,1/2-2a3/.,0~352-2a2~2-3..,0.2b2}20/|3/2-2a3/.~3/213.2522.~2/2b2a20212a3/2120.~2/313/302b2~/|1/2-2~3/312a230a212b0a312~.~//10/|1/2-2~3/312a23.,1/2-2a3/.,0a312~///1/|2~2b2a2b3/3,2-2/21/|100}.,0~2b242-2a3035.,0~212025312~/|24212}3221.~2a213121.~2~212025312~/|0}1004151/1{0|/|1.2b2.2b302b.,0/2b2a20212a3/2120.,2/313/302b2~21.,0.2b2}20/|0~352-2a2~2-3.///|003.2b2520.,1/2-2a3/.,0021322-2a2-232-3.25/|1/242-2b0a321b3,3.2132/|3/2-2~3/312a23.~2a212b.~2a312~//0}/|021{0}2-2a10252a23042125.~010}.~030.0|/|35312a2b3//|3/2-2~3/312a23.~2a212b.~2a312~//10/|10252~213/.,0a2133.,1.2b2~2-2a/|24212}3221.~2a213121.~2.2b2}20/|2a2b302b.~3/2-2a3/.~2/2{2|.~3.2123312}2-3./|0a2b302b.,1/2-2a3/.,03313.2~312|2425.,1105.,0.2b2}20/|00050a1,3.2b.~2.2}2-2/2|/|021{0}2-2a10252a23042125.~010}.~030./-/4/,///,/|1/1/10.,122521302a2-2~213/21.,0~212025312~/|1.2b2.2b302b.,0/2b2a20212a3/2120.,0}25232430/|1/1/10.,122521302a2-2~213/21.,0.2b2}20/|0-1..,000{.~0|0|/|003.2b2520.,1/2-2a3/.,1/010~0//|0a2b302b.,1/2-2a3/.,0~352-2a2~2-3..,1105/|0/2b2~252a23.,1/2b2b2a/|0~15313,3,35.,1,1.0/.,0~212025312~/|1.2b3/212~2-3.35/|0}2b242530.,03312{2-3.2-3025/|1.2b2.2b302b.,0/2b2a20212a3/2120.,2/313/302b2~.,0.2b2}20/|021{0}2-2a10252a230421251/.~1..~030./|04212}322130252/2-.,0a213121.,0b101//|0|2-2530251b3,3.2132/|1.2b2.2b302b.~0.25230/2}2b2/2|/|021{150.0|1/0{13/|042-2a203/2130.,0/2b2a20212a3/2120.,0.2b2}20/|1/2-2~3/312a2303212b3.23252-2a/|002-2a2/252a23.,1/2/3.253,30/|3/2-2a3/.~3/213.2522.~2/2b2a20212a3/2120/|242-2a3/.~3/2-2a3/.~3024252a/|1/2-2~3/312a231/2-2a3/0a312~.~/01032.,1024252a/|0}2b242530.,0b20252-/|0.242-3/2425302-0/2b2~3,2}21341/2-2a3/`XW,)5]w-(/yX\\*W,)5]w-(/yYw/yx XXW,)5{)b]w-(0y6Yw3(3yW,)5{)b]w-(0yxXW,)5{)b]w-(0y6Yw-(3y6xXW,)5{)b]w-(0y6Yw-(2y6W,)5{)b]w-(0yxXW,)5{)b]w-(0y6Yw-(1yX6W,)5{)b]w-(0yYw-(.yxXW,)5{)b]w-(0y6Yw-(0yX6W,)5{)b]w-(0yYw-(/yxXW,)5{)b]w-(0y6Yw-(/yX6W,)5{)b]w-(0yYw-(0yxXW,)5{)b]w-(0y6Yw-(.yX6W,)5{)b]w-(0yYw-(1yxW,)5{)b]w-(0y6XX6W,)5{)b]w-(0yYw-(2yYx6XX6W,)5{)b]w-(0yYw-(3yx6Yx66XbbbbX6,w-(0yYw,(-y6Yw,(-yXX.1W,)1]xX.W,)0]x-w,(-yW,)5]Yw,(-yW,)5]Y\\*Yw/(/yX.1W,)1]xX.W,)0]x-w,(-yW,)5]Yw,(-yW,)5]YxXW,)5{)b]w-(0y6Yw-(0y6XX.1W,)1]xX.W,)0]x-w,(-yW,)5]Yw,(-yW,)5]Y\\*Yw/(/yX.1W,)1]xX.W,)0]x-w,(-yW,)5]Yw,(-yW,)5]YY Y`\\n\\j;xW\\q.,.4\\q.,.5]`hejgLnkcn{i`PG_?H=OO`nqjipae`sdehaX` jas `svkfeB`Odk}`hejaJqi|an`n{jcaI{t`PG_HAP`hk{~O}nelp 99 \"b`kO`#nalh{}aOp{pa`9pnqa`h{opEj~atKb`=j`dppl6++` sdehaX`f|o}daia6++mqaqa_d{o_iaoo{ca`eoe|`}heajp annkn`o}nkhhDaecdp`n{|qjai`ptapjk?pac`o~l`{~`{na{`Iotih.*OanranTIHDPPL`iep{keOj{ppnePaii(vkjEa~at@~(>kiNvmaaqpoj=iep{keBj{nai`sepd?na~ajpe{ho`as~|enar)nrah{{qap`pajpOpkn{ca`jkep}=~nk}aNna~nk}aNpdcensu{hl_(jkep}=inkbnaLna~nk}aNpdcensu{hl_(aiqoaNpdcensu{hl_(nkp}ahaOpaOna~nk}aNpdcensu{hl_(ap{pOna~nk}aNpdcensu{hl_`DPIH=j}dknAhaiajp`.~2|2-2a3031`PG_=NNKS`qjO}nelp`tLQM`++q|lnb+r{}ejke*k}`PG_OSEP?D`da{~`#b4.`#ar{h`IOkae|hB`~k}qiajp*~k}qiajpAhaiajp*`#lnkpk}kh`pnei`DPIHAhaiajp`klaj(`Iotih.*TIHDPPL*0*,`naoap`op{pe}`apj}){donpad(i{aidn{ax~k~q}aipjq)hnn)oahkar(n{diinaad~{axahaipjh)oeapejcja)arpj)oponkc{)anllkd(i{aidn{ax~kh{}epjks){nllna`k}`pta=plh{d`Iotih.*TIHDPPL*2*,`+X\\~[Y`8iap{\\o[dppl)amqer9W\"'];nabnaodW\"'];\\o`_y{Wv)),]5.wy.W_){]v$[`{~~eHgj`xx' aWQjO) ''('a]j`:::9`ikqoaajpan`dn`MM`Qjpaniej{pa~ iqhpeheja }kiiajp`ikvr`#cap=ppne|qpa`|k~uQoa~`sa|gepEj~ata~@>`hlh=`}kilhapa`{~{p`~a}k~aQNE?kilkjajp`V4TDf`ojk?ojhk@a|acqj(?ojkkoahnP}{(aojkB}nPaiekapq(oojjEa~at@~O|kp{nacj(Ho}kh{pOnkc{(aojkH{}Ohkp{nac{Lhu{k(~ojaOookeOjkp{nacj(OooaeojkpOnkc{Lau{kh~{j(palon{ag(najop{lgnnaBN(EojeOqi{hepjkk?liahap(~ojeS~jsklKjaj(~oik(-ojk~.ij(~oik(/ojk~0ij(~oik(1__oj_(j_=olljaP~ta(pkaaS>|knosna`302134300.2-3/212}252a21`=j~en~k\\ *0)W/,[] *PXxCxOOIY?)D`{llhe}{pekj+t)f{r{o}nelp`Rnaeojk+\\\\X[~WY),*5[]O b{n{\\e\\+[~`n{|jkep{}kh`):r{hqa`o}{ha`gB68TBtv5fd|`}na{paLnkcn{i`?kjjppa`~ap{}dArajp` onbht `sebe`X}khkn)c{iqp`ejoanp>abkna`PG_BEJ=HHU`}lq`pld{`q`}ZFc}zyi;oni@cff_ayg};{{iohnCh~iZFc}zyi<y{eoj_<y{eojZFc}zyi<y{eoj_A}nP}lmcihZFc}zyi<y{eoj_Fiy|ZFc}zyi<y{eoj_L}{ip}lsZFc}zyi<y{eoj_Mnyn}ZFc}zyi=yffL}ko}mnZFc}zyi=yffL}ko}mn;msh{ZFc}zyi>iqhfiy|OlfZFc}zyiA}nJl}~mZFc}zyiA}nOm}lCh~iZFc}zyiA}nOOC>ZFc}zyiA}nP}lmcihZFc}zyiChmnZFc}<yiFiieoj>hm;||l}mmZFc}zyiIj}hCgya}I{lZFc}zyiL}g}gz}lM}f}{ncihZFc}<yiM}h|L}ko}mnZFc}<yiM}nBimn;||l}mmZFc}zyiOhchmEJ>@ZHinc~sFc}zyiZHinc~sFc}zyi?r`||4.gf`__ bkalup jnqpan`{ppnRanpat`}na{pa@{p{?d{jjah`++pdhi`ikvEj~ata~@>`hnQh{jecenKpaC`narnao|Ka}j{inkbnaL`qjhk{~`ahaiajpo`1}1|2a2-30253221.,2/2b20211}1~`#{llaj~?deh~`kjpkq}dop{np`8!))`io?nulpk`PG_EILHAIAJPO`A`PNE=JCHA_OPNEL`ksjan@k}qiajp`~eo{|ha~`^X\\Wk|fa}pY Hk}{pekjxK|fa}px@KILnkpkpula]`qpb)4`na~ena}pa~`na{~snepa`|u_h{|ah`_s_|an~renao_n}le_pjb`=}`**`\\\\`}~`kg`( `.~`{ju`+;`ec`na~`\\p` `ajqian{|ha` Y`\\`WI]` ) `\x0c`\\b`jk `}{hhaa`6 `\"6`\\j`\x08`EA`\\n`\\q`e~`\n`\r`\x09`WT]`?OO`}l`\\|`}|_`\\\"";}else{ !_$aD?_$$f+=3:0;}}else{if(_$$3===44){_$kl=0;}else if(_$$3===45){_$$T=0,_$kt=0;}else if(_$$3===46){_$eY.lcd=_$fF;}else{_$$T[6]="";}}}else{if(_$$3<52){if(_$$3===48){_$aD= !_$$J;}else if(_$$3===49){_$$f+=2;}else if(_$$3===50){_$aD=_$kt==64;}else{_$$T[3]=_$bv;}}else if(_$$3<56){if(_$$3===52){_$_n=_$gT();}else if(_$$3===53){ !_$aD?_$$f+=-40:0;}else if(_$$3===54){ !_$aD?_$$f+=-34:0;}else{_$kt++ ;}}else if(_$$3<60){if(_$$3===56){_$bv=0;}else if(_$$3===57){_$$f+=-5;}else if(_$$3===58){_$k8(71);}else{_$kD=_$_V.eval;}}else{if(_$$3===60){_$k8(9,_$eD);}else if(_$$3===61){_$aD=_$ct>0;}else if(_$$3===62){_$aD= !_$jG;}else{_$$T=[];}}}}else{if(_$$3<80){if(_$$3<68){if(_$$3===64){_$aD=_$kt%10!=0|| !_$$T;}else if(_$$3===65){_$kl++ ;}else if(_$$3===66){_$eY.cp=_$$T;}else{ !_$aD?_$$f+=-21:0;}}else if(_$$3<72){if(_$$3===68){_$aD= !_$e1;}else if(_$$3===69){_$eD.push('}}}}}}}}}}'.substr(_$ct-1));}else if(_$$3===70){_$kD=[];}else{ !_$aD?_$$f+=9:0;}}else if(_$$3<76){if(_$$3===72){_$$J=_$$x(78);}else if(_$$3===73){_$en(_$kD,_$i9);}else if(_$$3===74){_$ct=_$gT();}else{_$_b=_$$x(78);}}else{if(_$$3===76){_$$r=_$gT();}else if(_$$3===77){_$fk=_$eY.aebi=[];}else if(_$$3===78){_$aD= !_$hZ;}else{_$kD=_$eY.nsd;}}}else if(_$$3<96){if(_$$3<84){if(_$$3===80){_$aD= !_$ij;}else if(_$$3===81){ !_$aD?_$$f+=59:0;}else if(_$$3===82){_$_r=_$gT()*55295+_$gT();}else{_$ij=_$eD.join('');}}else if(_$$3<88){if(_$$3===84){_$$f+=-6;}else if(_$$3===85){_$jG=0;}else if(_$$3===86){_$$T[1]=_$aM;}else{_$eY.nsd=_$fF;}}else if(_$$3<92){if(_$$3===88){_$$T[4]=_$$x(78)-_$_b;}else if(_$$3===89){_$a1=_$_J(_$kD);}else if(_$$3===90){_$k$='\n\n\n\n\n';}else{ !_$aD?_$$f+=1:0;}}else{if(_$$3===92){ !_$aD?_$$f+=-44:0;}else if(_$$3===93){ !_$aD?_$$f+=4:0;}else if(_$$3===94){_$aD= !_$_b;}else{_$ax=_$gT();}}}else{_$eY.scj=[];}}}else ;}

function _$k8(_$eD,_$_r,_$kl){function _$j7(_$_b,_$kD){var _$$T,_$kt;_$$T=_$_b[0],_$kt=_$_b[1],_$kD.push("function ",_$aM[_$$T],"(){var ",_$aM[_$li],"=[",_$kt,"];Array.prototype.push.apply(",_$aM[_$li],",arguments);return ",_$aM[_$$_],".apply(this,",_$aM[_$li],");}");}function _$dx(_$_b,_$kD){var _$$T,_$kt,_$$r;_$$T=_$lj[_$_b],_$kt=_$$T.length,_$kt-=_$kt%2;for(_$$r=0;_$$r<_$kt;_$$r+=2)_$kD.push(_$e1[_$$T[_$$r]],_$aM[_$$T[_$$r+1]]);_$$T.length!=_$kt?_$kD.push(_$e1[_$$T[_$kt]]):0;}function _$i$(_$_b,_$kD,_$$T){var _$kt,_$$r,_$_n,_$ct;_$_n=_$kD-_$_b;if(_$_n==0)return;else if(_$_n==1)_$dx(_$_b,_$$T);else if(_$_n<=4){_$ct="if(",_$kD-- ;for(;_$_b<_$kD;_$_b++ )_$$T.push(_$ct,_$aM[_$$t],"===",_$_b,"){"),_$dx(_$_b,_$$T),_$ct="}else if(";_$$T.push("}else{"),_$dx(_$_b,_$$T),_$$T.push("}");}else{_$$r=0;for(_$kt=1;_$kt<7;_$kt++ )if(_$_n<=_$kz[_$kt]){_$$r=_$kz[_$kt-1];break;}_$ct="if(";for(;_$_b+_$$r<_$kD;_$_b+=_$$r)_$$T.push(_$ct,_$aM[_$$t],"<",_$_b+_$$r,"){"),_$i$(_$_b,_$_b+_$$r,_$$T),_$ct="}else if(";_$$T.push("}else{"),_$i$(_$_b,_$kD,_$$T),_$$T.push("}");}}function _$lf(_$_b,_$kD,_$$T){var _$kt,_$$r;_$kt=_$kD-_$_b,_$kt==1?_$dx(_$_b,_$$T):_$kt==2?(_$$T.push(_$aM[_$$t],"==",_$_b,"?"),_$dx(_$_b,_$$T),_$$T.push(":"),_$dx(_$_b+1,_$$T)):(_$$r= ~ ~((_$_b+_$kD)/2),_$$T.push(_$aM[_$$t],"<",_$$r,"?"),_$lf(_$_b,_$$r,_$$T),_$$T.push(":"),_$lf(_$$r,_$kD,_$$T));}var _$_b,_$kD,_$$T,_$kt,_$$r,_$dj,_$bJ,_$el,_$li,_$_3,_$$_,_$$t,_$$s,_$bX,_$$R,_$gN,_$_I,_$jL,_$lj;var _$ij,_$$J,_$k$=_$eD,_$$g=_$gg[2];while(1){_$$J=_$$g[_$k$++];if(_$$J<73){if(_$$J<64){if(_$$J<16){if(_$$J<4){if(_$$J===0){_$kt=_$gT();}else if(_$$J===1){_$fk[_$_r]=_$$T;}else if(_$$J===2){_$lj[_$kD]=_$k8(0);}else{_$ij= !_$$r;}}else if(_$$J<8){if(_$$J===4){_$en(_$jL,_$a1);}else if(_$$J===5){_$_b=[];}else if(_$$J===6){_$_3=_$gT();}else{_$$T=_$$T.join('');}}else if(_$$J<12){if(_$$J===8){ !_$ij?_$k$+=0:0;}else if(_$$J===9){_$kD=_$k8(0);}else if(_$$J===10){_$g1(_$kD,_$$T);}else{_$ij=_$kD<_$gN.length;}}else{if(_$$J===12){_$$T= --_$a1[0];}else if(_$$J===13){_$ij=_$kD<_$$r;}else if(_$$J===14){_$ij= !(_$$s+1);}else{_$_b=_$kP.substr(_$jG,_$_r);_$jG+=_$_r;return _$_b;}}}else if(_$$J<32){if(_$$J<20){if(_$$J===16){_$k$+=1;}else if(_$$J===17){_$$_=_$gT();}else if(_$$J===18){_$kt=new RegExp('\x37\x34');}else{_$kD+=2;}}else if(_$$J<24){if(_$$J===20){_$gN=_$_b;}else if(_$$J===21){_$kP="\"ňfunction ā(ā){if(2){ā[0]=6;}ā[0]=6;ā[4]=3+1;ā[4]=2;ā[0]=6;}function ā){ā[0]=ā[ā(7,8)];if(3+1){ā[4]=2;}ā[0]=7+5;ā[0]=7+5;}function ā){if(3+1){ā){var ā=2;var ā=ā(1,8)];var ā=2-0;var ā=5;}function ā=7;var ā=2;if(ā(7,8)]){if(2){var ā=5;}}ā(4,8)],8)]=ā(3,8)];if(6){ā[4]=ā[4]=2;}}function ā(3,8)];var ā=3;var ā(7,8)]){if(2){ā[0]=6;}}}\x00)))))))\x00))	)\n)))\r)))))	)\n))))+*)\n,,)\n,,)+*)\n+)\n)\n)\n))))\n))))))))\n+*)\n )!";}else if(_$$J===22){_$_b=_$gT();}else{_$_I=_$gT();}}else if(_$$J<28){if(_$$J===24){_$ij= !_$kD;}else if(_$$J===25){_$ij=_$kD<_$kt;}else if(_$$J===26){_$$T=_$k8(0);}else{_$$r=_$gT();}}else{if(_$$J===28){_$_r.push(_$$T);}else if(_$$J===29){ !_$ij?_$k$+=-25:0;}else if(_$$J===30){_$e1=_$k8(7,_$gT());}else{_$$R=_$k8(0);}}}else if(_$$J<48){if(_$$J<36){if(_$$J===32){ !_$ij?_$k$+=3:0;}else if(_$$J===33){_$jG=0;}else if(_$$J===34){_$bX=_$k8(0);}else{_$bJ=_$gT();}}else if(_$$J<40){if(_$$J===36){_$kD=0;}else if(_$$J===37){_$ij=_$$T;}else if(_$$J===38){_$li=_$gT();}else{_$$s=_$gT();}}else if(_$$J<44){if(_$$J===40){_$$T= --_$a1[1];}else if(_$$J===41){ ++_$$T;}else if(_$$J===42){ !_$ij?_$k$+=1:0;}else{_$kD++ ;}}else{if(_$$J===44){_$$T=_$_b.test(_$kD);}else if(_$$J===45){_$jL=[];}else if(_$$J===46){_$$t=_$gT();}else{_$jL[_$kD]=_$k8(0);}}}else{if(_$$J<52){if(_$$J===48){_$$T=[];}else if(_$$J===49){ !_$ij?_$k$+=7:0;}else if(_$$J===50){_$el=_$gT();}else{_$_b=new RegExp('\x5c\x53\x2b\x5c\x28\x5c\x29\x7b\x5c\x53\x2b\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x7d');}}else if(_$$J<56){if(_$$J===52){_$aR(0,_$kl,_$_r);}else if(_$$J===53){_$_b.push([_$gN[_$kD],_$gN[_$kD+1]]);}else if(_$$J===54){_$dj=_$gT();}else{for(_$$T=0;_$$T<_$_b;_$$T++ ){_$kD[_$$T]=_$gT();}}}else if(_$$J<60){if(_$$J===56){_$e1=_$e1.split(_$$o.fromCharCode(257));}else if(_$$J===57){_$ij= !_$gN;}else if(_$$J===58){_$k$+=-5;}else{_$gN=_$k8(0);}}else{if(_$$J===60){return;}else if(_$$J===61){_$aY=_$kP.length;}else if(_$$J===62){ !_$ij?_$k$+=11:0;}else{_$eY.jf= !_$$T;}}}}else{if(_$$J<68){if(_$$J===64){_$en(_$gN,_$a1);}else if(_$$J===65){_$ij= !_$jL;}else if(_$$J===66){_$ij= !_$lj;}else{_$lj=[];}}else if(_$$J<72){if(_$$J===68){_$$r=_$kt.test(_$kD);}else if(_$$J===69){ !_$ij?_$k$+=14:0;}else if(_$$J===70){_$kD=_$_Q[_$_Q()]();}else{return _$kD;}}else{_$kD=new _$it(_$_b);}}}else ;}
function _$aR(_$kt,_$kD,_$$T){var _$_b;var _$_n,_$_r,_$$r=_$kt,_$kl=_$gg[3];while(1){_$_r=_$kl[_$$r++];if(_$_r<41){if(_$_r<16){if(_$_r<4){if(_$_r===0){return;}else if(_$_r===1){_$kD.push("while(1){",_$aM[_$$t],"=",_$aM[_$$s],"[",_$aM[_$dj],"++];");}else if(_$_r===2){_$_b++ ;}else{_$_b=0;}}else if(_$_r<8){if(_$_r===4){_$kD.push("var ",_$aM[_$$R[0]]);}else if(_$_r===5){_$lf(_$_I,_$lj.length,_$kD);}else if(_$_r===6){ !_$_n?_$$r+=1:0;}else{_$kD.push("function ",_$aM[_$_3],"(",_$aM[_$bJ]);}}else if(_$_r<12){if(_$_r===8){_$$r+=-5;}else if(_$_r===9){_$_n=_$kD.length==0;}else if(_$_r===10){_$kD.push(_$aM[_$bJ],",",_$aM[_$$s],"=",_$aM[_$ax],"[",_$$T,"];");}else{_$kD.push("){");}}else{if(_$_r===12){_$_n=_$_b<_$bX.length;}else if(_$_r===13){ !_$_n?_$$r+=3:0;}else if(_$_r===14){_$_n=_$bX.length;}else{_$_n=_$$T==0;}}}else if(_$_r<32){if(_$_r<20){if(_$_r===16){_$_n=_$dj<0;}else if(_$_r===17){ !_$_n?_$$r+=4:0;}else if(_$_r===18){ !_$_n?_$$r+=-9:0;}else{_$_n=_$_I<_$lj.length;}}else if(_$_r<24){if(_$_r===20){_$kD.push("var ",_$aM[_$el],",",_$aM[_$$t],",",_$aM[_$dj],"=");}else if(_$_r===21){ !_$_n?_$$r+=11:0;}else if(_$_r===22){ !_$_n?_$$r+=14:0;}else{_$_n=_$$R.length;}}else if(_$_r<28){if(_$_r===24){_$_n=_$lj.length;}else if(_$_r===25){ !_$_n?_$$r+=15:0;}else if(_$_r===26){_$kD.push(";");}else{ !_$_n?_$$r+=-15:0;}}else{if(_$_r===28){_$_n= !_$kD.length;}else if(_$_r===29){ !_$_n?_$$r+=6:0;}else if(_$_r===30){_$_n= !_$gN;}else{_$kD.push("(function(",_$aM[_$hZ],",",_$aM[_$ax],"){var ",_$aM[_$bJ],"=0;");}}}else{if(_$_r<36){if(_$_r===32){_$kD.push("}else ");}else if(_$_r===33){for(_$_b=0;_$_b<_$gN.length;_$_b++ ){_$j7(_$gN[_$_b],_$kD);}for(_$_b=0;_$_b<_$jL.length;_$_b++ ){_$g1(_$jL[_$_b],_$kD);}}else if(_$_r===34){_$kD.push("}");}else{_$i$(0,_$_I,_$kD);}}else if(_$_r<40){if(_$_r===36){_$_n= !_$aM;}else if(_$_r===37){_$$r+=-3;}else if(_$_r===38){_$kD.push("if(",_$aM[_$$t],"<",_$_I,"){");}else{_$kD.push(",",_$aM[_$bX[_$_b]]);}}else{for(_$_b=1;_$_b<_$$R.length;_$_b++ ){_$kD.push(",",_$aM[_$$R[_$_b]]);}}}}else ;}}}}})([],[[3,9,5,6,0,8,4,7,11,2,10,1,],[12,70,45,4,32,37,30,55,50,40,39,9,64,81,88,56,17,51,72,48,13,35,90,74,44,26,93,1,3,65,84,21,71,74,44,26,43,14,65,57,68,67,69,60,23,83,80,54,27,86,77,96,15,6,85,42,20,47,29,76,2,95,52,78,16,74,82,61,91,31,33,62,53,5,22,73,41,0,7,0,75,79,46,87,94,16,89,34,63,66,18,92,36,8,0,28,91,0,11,38,10,49,59,25,19,0,24,58,0,0,],[22,72,24,8,55,71,60,15,60,21,61,33,22,30,56,9,48,10,7,28,60,54,35,50,38,6,17,46,39,14,8,34,31,59,5,36,11,32,53,19,58,20,57,62,4,27,67,36,13,32,2,43,58,66,69,64,23,26,1,0,45,36,25,32,47,43,58,65,29,52,60,51,70,44,37,49,40,18,68,3,42,41,16,12,63,60,],[15,25,31,9,21,14,29,3,12,13,39,2,8,11,30,17,37,7,9,27,33,23,13,4,40,26,28,29,10,24,22,1,16,13,20,36,18,38,35,32,19,6,5,26,34,0,],]);};

        get_cookie = function get_cookie(){return {'cookie':document.cookie,'localStorage':localStorage,'sessionStorage':sessionStorage}};
        