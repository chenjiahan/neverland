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
    }

}

module.exports = util;