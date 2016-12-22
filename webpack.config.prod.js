var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

var extractCSS = new ExtractTextPlugin('styles.css');

module.exports = {
    debug: true,
    devtools: 'source-map',
    noInfo: false,
    entry: './client/scripts/index',
    target: 'web',
    output: {
        path: __dirname + '/dist',
        publicPath: 'http://financial-book.herokuapp.com/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './client/scripts'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        extractCSS
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            include: path.join(__dirname, 'client/scripts'),
            loaders: []
        }, {
            test: /\.(css|scss)$/,
            exclude: /node_modules/,
            loader: extractCSS.extract(['css', 'autoprefixer', 'sass'])
        }, {
            test: /\.(jpg|jpeg|png|gif|svg)$/,
            exclude: /node_modules/,
            loader: 'file?limit=1000000&name=assets/images/[name].[ext]'
        }, {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            exclude: /node_modules/,
            loader: 'file?limit=1000000&name=assets/fonts/[name].[ext]'
        }]
    }
}
