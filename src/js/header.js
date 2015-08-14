var React = require('react');

var Header = React.createClass({
    render: function() {
        return (
            <header>
                <div className="container-fluid head-content">
                    <div className="head-mask">
                        <div className="nav-container">
                            <div className="container">
                                <div className="head-nav">
                                    <div className="navbar-header">
                                        <button className="navbar-toggle collapsed" type="button" data-toggle="collapse" data-target=".bs-navbar-collapse">
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                            <span className="icon-bar"></span>
                                        </button>
                                        <div className="navbar-brand"><a href="http://www.neverl.com/blog"><img className="logo" src="http://7xl2cu.com1.z0.glb.clouddn.com/logo.png" alt="logo" /></a><h2 className="logo-title">NEVERLAND</h2></div></div>
                                    <nav className="collapse navbar-collapse bs-navbar-collapse" role="navigation" aria-expanded="false">
                                        <ul className="nav navbar-nav navbar-right">
                                            <li className="nav-blog">
                                                <a href="http://www.neverl.com/blog/">
                                                    <h3 className="nav-btn"><span className="glyphicon glyphicon-tree-deciduous"></span>BLOG</h3>
                                                </a>
                                            </li>
                                            <li className="nav-work">
                                                <a href="http://www.neverl.com/work">
                                                    <h3 className="nav-btn"><span className="glyphicon glyphicon-piggy-bank"></span>WORK</h3>
                                                </a>
                                            </li>
                                            <li className="nav-home-active">
                                                <a href="http://www.neverl.com/about">
                                                    <h3 className="nav-btn"><span className="glyphicon glyphicon-home"></span>ABOUT</h3>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <h1>ABOUT NEVERLAND</h1>
                    </div>
                </div>
            </header>
        )
    }
});

module.exports = Header;