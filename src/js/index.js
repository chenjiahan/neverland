/**
 * Created by chenjiahan on 15/8/13.
 */
var React  = require("react");
var Router = require("react-router");
var Route  = Router.Route;



var RouteHandler = Router.RouteHandler;

var App = React.createClass({
    render () {
        return (
            <div>
                <h1>App</h1>
                <RouteHandler/>
            </div>
        )
    }
});

var routes = (
    <Route handler={App}>
        <Route path="about" handler={About}/>
        <Route path="inbox" handler={Inbox}/>
    </Route>
);

