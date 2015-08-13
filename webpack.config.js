module.exports = {
    entry: "src/js/index.js",
    loaders: [
        { test: /\.jsx?$/, loaders: ['jsx?harmony']}
    ],
    output: {
        filename: "index.js"
    }
};