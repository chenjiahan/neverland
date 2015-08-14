//library
var React  = require("react");
var Router = require("react-router");
var Route  = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

//css
require('../scss/base.scss')
require('../scss/bootstrap.min.css')

//components
var Header = require('./header');
var Footer = require('./footer');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header />
                <Footer />
            </div>
        )
    }
});

var About = React.createClass({
    render: function() {
        return (
            <div>
                <h1>About</h1>
                <RouteHandler/>
            </div>
        )
    }
});

var Inbox = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Inbox</h1>
                <RouteHandler/>
            </div>
        )
    }
});

//router config
var routes = (
    <Route handler={App}>
        <DefaultRoute handler={About} />
        <Route path="about" handler={About} />
        <Route path="blog" handler={Inbox} >
            <Route path="blog/:id" />
        </Route>
    </Route>
);

//run router
Router.run(routes, Router.HashLocation, (App) => {
    React.render(
        <App/>,
        document.getElementById('body')
    );
});