// Common webpack config for development and production scenarios, this is merged with them both so should cover only the bare necessities

const path = require('path');

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
