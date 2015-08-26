var React = require('react');

//style
require('../scss/full-page.scss');

//单页组件
var Page = React.createClass({
    style: {
        position: "absolute",
        width: "100%",
        overflow: "hidden",
        transition: "all .4s ease-in-out",
        WebkitTransition: "all .4s ease-in-out"
    },
    render: function () {
        var height = window.innerHeight;
        var transform = "translate3d(0, " + (this.props.page - this.props.nowPage) * height + "px, 0)";
        this.style.height = height;
        this.style.transform = transform;
        this.style.WebkitTransform = transform;
        this.style.background = this.props.background;

        return (
            <section className="page" style={this.style}>
                {this.props.children}
            </section>
        )
    }
});

//获取当前时间
var _now = Date.now || function() {
        return new Date().getTime();
    };

//函数节流
var _throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    if (!options) options = {};
    var later = function() {
        previous = options.leading === false ? 0 : _now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };
    return function() {
        var now = _now();
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
};

//函数去抖
var _debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    var later = function() {
        var last = _now() - timestamp;
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
        timestamp = _now();
        var callNow = immediate && !timeout;
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };
};

//全屏滚动组件
var FullPage = React.createClass({
    getInitialState: function () {

        //滚轮防抖
        var wheel = function(event) {
            event.deltaY < 0 ? this.pageUp() : this.pageDown();
        }.bind(this);
        var debounceWheel = _debounce( wheel, 50 );

        return {
            nowPage: 1,
            debounceWheel: debounceWheel
        }
    },
    componentDidMount: function () {
        //适应屏幕变化
        var debounceResize = _debounce(this.handleResize, 100);
        window.addEventListener('resize', function() {
            debounceResize();
        }.bind(this));

        //响应键盘事件
        document.onkeydown = function() {
            this.handleKeyDown();
        }.bind(this);
    },
    //处理鼠标滚轮事件
    handleMouseWheel: function () {
        this.state.debounceWheel(event);
    },
    //处理屏幕变化时间
    handleResize: function () {
        this.forceUpdate()
    },
    //处理键盘事件
    handleKeyDown: function () {
        switch (event.keyCode) {
            case 33: //page up
            case 38: //arrow up
                this.pageUp();
                break;
            case 32: //space
            case 34: //page down
            case 40: //arrow down
                this.pageDown();
                break;
        }
    },
    //向上翻页
    pageUp: function () {
        var nowPage = this.state.nowPage;
        nowPage > 1 && this.setState({ nowPage: nowPage - 1 });
    },
    //向下翻页
    pageDown: function () {
        var nowPage = this.state.nowPage;
        nowPage < this.props.page && this.setState({ nowPage: nowPage + 1 });
    },
    render: function () {
        return (
            <div onWheel={this.handleMouseWheel}>
                <Page page={1}
                      background={"#00CED1"}
                      nowPage={this.state.nowPage}>
                    <h1>Page One</h1>
                </Page>

                <Page page={2}
                      background={"#2EBE21"}
                      nowPage={this.state.nowPage}>
                    <h1>Page Two</h1>
                </Page>

                <Page page={3}
                      background={"#BFDA00"}
                      nowPage={this.state.nowPage}>
                    <h1>Page Three</h1>
                </Page>
            </div>
        )
    }
});

module.exports = FullPage;