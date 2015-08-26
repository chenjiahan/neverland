/**
 * utils
 */

var util = {
    /**
     * addEventListener,兼容IE
     * @param target
     * @param eventType
     * @param callback
     * @returns {{remove: Function}}  用于移除监听器
     */
    addEventListener: function (target, eventType, callback) {
        if (target.addEventListener) {
            target.addEventListener(eventType, callback, false);
            return {
                remove: function () {
                    target.removeEventListener(eventType, callback, false);
                }
            };
        } else if (target.attachEvent) {
            target.attachEvent('on' + eventType, callback);
            return {
                remove: function () {
                    target.detachEvent('on' + eventType, callback);
                }
            };
        }
    },

    /**
     * 获取当前时间
     * @ returns {Function}
     */
    now: Date.now || function() {
        return new Date().getTime();
    },

    /**
     * 函数节流, 来自underscore
     * @param func
     * @param wait
     * @param options
     * @returns {Function}
     */
    throttle: function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function () {
            previous = options.leading === false ? 0 : this.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function () {
            var now = this.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    },

    /**
     * 函数防抖, 来自underscore
     * @param func
     * @param wait
     * @param immediate
     * @returns {Function}
     */
    debounce: function(func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        var later = function() {
            var last = this.now() - timestamp;
            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };
        return function() {
            context = this;
            args = arguments;
            timestamp = this.now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    },

    /**
     * 滚动到指定位置
     * @param target 滚动目标,高度或element
     * @param time   滚动时长,默认值为200ms
     */
    scroll: function (target, time) {
        //若target为元素,则获取其与顶部距离
        if(typeof target.offsetTop === 'number') {
            target = target.offsetTop
        }

        time = arguments[1] || 200;                       //滚动时长
        var offset = document.body.scrollTop;             //滚动条位置
        var step = Math.abs(offset - target) * 5 / time ; //滚动步长

        //滚动位置不超过底部
        var clientHeight = document.documentElement.clientHeight;
        var scrollHeight = document.body.scrollHeight;
        if(target + clientHeight > scrollHeight) {
            target = scrollHeight - clientHeight;
        }

        //定时器
        var scroll = window.setInterval(function() {
            if ( target == offset ) {
                window.clearInterval( scroll );
            } else if ( offset - target > step ) {
                offset -= step;
            } else if ( target - offset > step ) {
                offset += step;
            } else {
                offset = target;
            }
            window.scrollTo(0, offset);
        }, 5);
    },

    /**
     * 解析html,返回element
     * @param str
     * @returns {HTMLElement[]}
     */
    parseHTML: function (str) {
        var el = document.createElement('div');
        el.innerHTML = str;
        return el.children;
    },

    /**
     * 获取地址栏URL参数
     * @param name
     * @returns result | null
     */
    getUrlParam: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");  //构造正则表达式对象
        var r = decodeURI(window.location.search).substr(1).match(reg);  //匹配目标参数
        return r === null ? r : r[2];
    }
};

module.exports = util;