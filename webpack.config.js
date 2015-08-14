module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: "build",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel" },
            { test: /\.css$/, loader: "style!css" },
            { test: /\.scss$/, loader: "style!css!autoprefixer!sass" }
        ]
    }
};
