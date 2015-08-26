var React = require('react');
var util = require('./util')

//style
require('../scss/full-page.scss');

//单页组件
var Page = React.createClass({
    style: {
        position: "absolute",
        width: "100%",
        overflow: "hidden",
        transition: "all .4s cubic-bezier(0.86, 0, 0.07, 1)",
        WebkitTransition: "all .4s cubic-bezier(0.86, 0, 0.07, 1)"
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

//全屏滚动组件
var FullPage = React.createClass({
    getInitialState: function () {

        //滚轮防抖
        var wheel = function(event) {
            event.deltaY < 0 ? this.pageUp() : this.pageDown();
        }.bind(this);
        var debounceWheel = util.debounce( wheel, 50 );

        return {
            nowPage: 1,
            debounceWheel: debounceWheel
        }
    },
    componentDidMount: function () {
        //适应屏幕变化
        var deBounceResize = util.debounce(this.handleResize, 100);
        window.addEventListener('resize', function() {
            deBounceResize();
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