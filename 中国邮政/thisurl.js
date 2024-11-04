

data = []


mouse_count = {
    "mousemove": 56,     // 鼠标移动直接记录次数
    "mousedown":1,       // 鼠标按下直接记录次数
    "click": 0,          // 鼠标点击直接记录次数
    "scroll": 9,         // 轮滑滑动直接记录次数
    "mouseup": 65,       // 时间间隔与鼠标松开除
}



for(let mouse of data){
    let xy;
    let name = 'lixia_' + mouse;
    if(memory.EventListener[name] == undefined || window[name] == undefined){continue}

    xy = window[name].shift();

    for(let i=0; i<memory.EventListener[name].length;i++){
        if(mouse_count[mouse] == 0){
            if(mouse == 'mousemove'){
                memory.EventListener[name][i](xy);
            }
            if(mouse == 'click'){
                memory.EventListener[name][i](xy);
            }
            if(mouse == 'mousedown'){
                memory.EventListener[name][i](xy);
            }
            if(mouse == 'mouseup'){
                memory.EventListener[name][i](xy);
            }
            if(mouse == 'dblclick'){
                memory.EventListener[name][i](xy);
            }
            break
        }
        memory.EventListener[name][i](xy);
    }
    if(mouse_count[mouse]){
        mouse_count[mouse] = mouse_count[mouse] - 1;
    }
}


// debugger
// l = new XMLHttpRequest();
// url = l.open('POST','/service/freshHouse/getHosueList.action',true);
// console.log(url);

add_url_search = function add_url_search(url) {
    let l = new XMLHttpRequest();
    let enurl = l.open('GET',url,true);
    return {'url':enurl,'cookies':document.cookie}
}
add_url_search_post = function (url,data) {
    let l = new XMLHttpRequest();
    let enurl = l.open('POST',url,true);
    let data_ = l.send(data)
    return {'url':enurl,'cookies':document.cookie,'data':data_}
}

memory.EventListener['lixia_load'][0]()
memory.EventListener['lixia_popstate'][0]()
memory.EventListener['lixia_error'][0]()
// console.log(add_url_search('/service/freshHouse/getHosueList.action'))
// console.log(add_url_search_post('/service/freshHouse/getHosueList.action','{"qw":3,"regNum":"19614609","pageNum":1,"pageSize":50,"orderByColumn":"0"}'))
