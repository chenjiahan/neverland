var React = require('react');

//style
require('../scss/full-page.scss');

var Page = React.createClass({
    render: function () {
        //style
        var height = window.innerHeight;
        var style = {
            position: "absolute",
            width: "100%",
            height: height,
            overflow: "hidden",
            top: (this.props.page - this.props.nowPage) * height,
            background: this.props.background,
            transition: "all .2s ease-in-out"
        };

        return (
            <section className="page" style={style}>
                {this.props.children}
            </section>
        )
    }
});

var FullPage = React.createClass({
    getInitialState: function () {
        return {
            nowPage: 1
        }
    },
    componentDidMount: function () {
        //适应屏幕变化
        window.addEventListener('resize', function() {
            this.forceUpdate();
        }.bind(this));

        //响应键盘事件
        document.onkeydown = function() {
            this.handleKeyDown();
        }.bind(this)
    },
    handleKeyDown: function() {

        switch (event.keyCode) {
            case 33: //page up
            case 38: //arrow up
                this.pageUp();
                break;
            case 34: //page down
            case 40: //arrow down
                this.pageDown();
                break;
        }
    },
    pageUp: function () {
        var nowPage = this.state.nowPage;
        if(nowPage > 1) {
            this.setState({ nowPage: nowPage - 1 });
        }
    },
    pageDown: function () {
        var nowPage = this.state.nowPage;
        if(nowPage < 3) {
            this.setState({ nowPage: nowPage + 1 });
        }
    },
    render: function () {

        return (
            <div>
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