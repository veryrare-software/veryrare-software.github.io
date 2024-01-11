const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")


module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, // instead of style-loader
                    'css-loader'
                ]
            }
        ]
    },
    entry: ['./index.css', './main.js'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({ template: './index.html' }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'img', to : 'img' }
            ]
        })
    ],
    
};