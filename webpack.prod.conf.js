const path = require('path'); //引入path的依赖
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成HTML模板
const { merge } = require('webpack-merge'); //引入merge
const base = require('./webpack.base.conf.js'); //引入webpack.base.conf.js
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //分离CSS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //样式的压缩、优化
const CopyWebpackPlugin = require('copy-webpack-plugin'); //拷贝静态文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //清除文件
module.exports = merge(base, {
    // devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                minimize: true, //是否打包为最小值
                removeAttributeQuotes: true, //去除引号
                removeComments: true, //去除注释
                collapseWhitespace: true, //去除空格
                minifyCSS: true, //压缩html内的样式】
                minifyJS: true, //压缩html内的JS
                removeEmptyElements: true, //清理内容为空的元素
            },
            hash: true, //引入产出资源的时候加上哈希避免缓存
            inject: 'body', // js的script注入到body底部
        }),
        new MiniCssExtractPlugin( //分离CSS
            {
                filename: 'style/main.css'
            }
        ),
        new OptimizeCSSAssetsPlugin({ // 压缩和优化CSS文件
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }]
            },
            canPrint: true
        }),
        new CopyWebpackPlugin({ //拷贝静态文件
            patterns: [
                { from: './src/images', to: 'images' },
            ],
        }),
        new CleanWebpackPlugin(), //清除文件
    ]
})