const path = require('path'); //引入path的依赖
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成HTML模板
const { merge } = require('webpack-merge'); //引入merge
const base = require('./webpack.base.conf.js'); //引入webpack.base.conf.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //分离CSS
const CopyWebpackPlugin = require('copy-webpack-plugin'); //拷贝静态文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清除文件
module.exports = merge(base, {
    // devtool: 'cheap-module-eval-source-map',
    plugins: [
        new HtmlWebpackPlugin({ //生成html模板
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                minimize: true, //是否打包为最小值
            },
            inject: 'body' // js的script注入到body底部
        }),
        new MiniCssExtractPlugin( //分离CSS
            {
                filename: 'style/main.css'
            }
        ),
        new CopyWebpackPlugin({ //拷贝静态文件
            patterns: [
                { from: './src/images', to: 'images' },
            ],
        }),
        new CleanWebpackPlugin(), //清除文件
    ]
})