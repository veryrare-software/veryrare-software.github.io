const path = require('path');

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
            test: /\.css$/,
            use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    entry: './main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};