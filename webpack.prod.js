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
        new UglifyJSPlugin({
            uglifyOptions: {
                output: {
                    comments: false, 
                    beautify: false
                },
                compress: {
                    warnings: true,
                    drop_console: false // Set to true when happy with removing console output
                }
            }
        })
    ]
});
