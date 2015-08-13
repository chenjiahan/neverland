/**
 * Created by chenjiahan on 15/8/13.
 */
var React  = require("react");
var Router = require("react-router");
var Route  = Router.Route;



var RouteHandler = Router.RouteHandler;

var App = React.createClass({
    render: function() {
        return (
            <div>
                <h1>App</h1>
                <RouteHandler/>
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

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={About}/>
        <Route path="about" handler={About}/>
        <Route path="inbox" handler={Inbox}/>
    </Route>
);

Router.run(routes, Router.HashLocation, (App) => {
    React.render(<App/>, document.body);
});