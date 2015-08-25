//library
var React  = require("react");

//css
require('../scss/normalize.scss');

//components
var FullPage = require('./full-page');

//render
React.render(
    <FullPage />,
    document.getElementById('body')
);
