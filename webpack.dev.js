const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
// inline-source-map is important to get traceable console output
module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ]
});
