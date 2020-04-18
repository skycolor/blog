// 函数节流
export function throttle (fn , interval) {
    let _self = fn,timer ,        //定时器
        isFirst = true;        //是否是第一次调用
    return function(){
        let args = arguments ,
            _this = this;
        if(isFirst){            //如果是第一次执行，不需要走定时器
            _self.apply(_this , args);
            return isFirst = false;
        }
        /*从第二次执行就要开始走定时器了*/
        if(timer)    return;            //如果定时器内的函数还未执行return
        timer = setTimeout(function(){        //定时函数
            clearTimeout(timer);
            timer = null;
            _self.apply(_this , args);
        } , interval || 100)
    }
}