const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development', // optional but very useful to specify the mode unless you want loads of yellow on computa
    devtool: 'inline-source-map', // inline-source-map is important to get traceable console output
    devServer: {
        contentBase: './dist' // remember, everything goes into the dist (distribution) folder, and index.html being the
                              // the first thing loaded needs the referenced output
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development') // optional as this isn't intended for a node environmemt
        })
    ]
});
