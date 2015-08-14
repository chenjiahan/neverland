var React  = require("react");
var Router = require("react-router");
var Header = require('./header');
var Route  = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

require('../scss/base.scss')
require('../scss/bootstrap.min.css')

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header />
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

var Message = React.createClass({
    getInitialState: function() {
        return {
            message: 1
        }
    },
    componentDidMount: function () {
        var id = this.props.params.id;
        this.setState({ message: id });
    },
    render: function() {
        return (
            <div>
                <h1>{this.state.message}</h1>
            </div>
        )
    }
});

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={About}/>
        <Route path="about" handler={About}/>
        <Route path="inbox" handler={Inbox}>
            <Route path="messages/:id" handler={Message}/>
        </Route>
    </Route>
);

Router.run(routes, Router.HashLocation, (App) => {
    React.render(
        <App/>,
        document.getElementById('body')
    );
});