const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// Attempts to shrinken the production build wherever possible
module.exports = merge(common, {
    mode: 'production', // this be production grade mode of operating
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new UglifyJSPlugin({ // just save the bandwidth, go on i dare you :D
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false
                },
                compress: {
                    warnings: false,
                    drop_console: true
                }
            }
        })
    ]
});
