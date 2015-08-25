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

//router config
var routes = (
    <Route handler={App}>
        <DefaultRoute handler={} />
        <Route path="about" handler={} />
        <Route path="blog" handler={} >
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