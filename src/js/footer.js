var React = require('react');

//返回顶部组件
var ToTop = React.createClass({
    render: function() {
        return (
            <a href="#" className="to-top" title="返回顶部"></a>
        )
    }
});

//页脚组件
var Footer = React.createClass({
    render: function() {
        return (
            <footer>
                <ToTop />
                <div className="container">
                    <div className="row">
                        <div className="col-md-2 col-xs-4 social-icons col-md-offset-3">
                            <a href="http://cn.linkedin.com/pub/%E5%98%89%E6%B6%B5-%E9%99%88/b1/518/65b" title="访问我的领英" target="_blank">
                                <img className="img-linkedin" src="http://nland-images.stor.sinaapp.com/social_linkedin.png" alt="linkedin"/>
                            </a>
                        </div>
                        <div className="col-md-2 col-xs-4 social-icons">
                            <div className="weixin-box">
                                <img className="img-rounded" src="http://nland-images.stor.sinaapp.com/social_weixin2.jpg"/>
                            </div>
                            <a>
                                <img className="img-weixin" title="微信" src="http://nland-images.stor.sinaapp.com/social_weixin.png" alt="weixin"/>
                            </a>
                        </div>
                        <div className="col-md-2 col-xs-4 social-icons">
                            <a href="http://www.renren.com/260476375/profile" title="访问我的人人" target="_blank">
                                <img className="img-renren" src="http://nland-images.stor.sinaapp.com/social_renren.png" alt="renren"/>
                            </a>
                        </div>
                        <div className="col-md-6 col-md-offset-3 col-xs-12 copyright">
                            <p>© 2015 Neverland  • All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
});

module.exports = Footer;