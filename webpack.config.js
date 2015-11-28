module.exports = {
    entry: "./src/app.js",
    output: {
        path: __dirname + "/lib/",
        filename: "bundle.js"
    },
    module: {
        loaders: [
          {
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
          }
        ]
    }
};
