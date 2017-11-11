var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [

        new HtmlWebpackPlugin(),

        /*
         * 抽取公共代码
         * name 是配置文件里面entry入口设置的键名，filename 是输出的文件名。
         * vendors 文件内容是entry入口设置的依赖包 + webpack的 hash 的文件
         * webpackAssets 是webpack存放 hash 的文件,获取这个文件是为了保证公共文件或库(vendors) 可以缓存在浏览器，
         **/
        new webpack.optimize.CommonsChunkPlugin({
            // name: 'vendors',                        //和上面配置的入口(entry)【必须】一一对应
            name: ['vendors','webpackAssets'],   // 数组的最后一个会抽取webpack相关的 hash 值文件
            filename: '[name].[chunkhash:8].js',      //导出的文件的名称
            minChunks: 2,                           // 一个依赖重复几次会被提取出来
            // chunks: ["pageA", "pageB"],          //抽取相关配置模块
        })

    ],
    entry: {
        main: './src/main.js',
        /*
        * 依赖的第三方全局框架与库
        * */
        vendors: [
            // 'babel-polyfill',
            // 'vue',
            // 'vue-router',
            // 'vuex'
        ]
    },
    output: {
        path: './dist',
        filename: '[name]-[chunkhash:8].bundle.js',  //hash值可以设置8
        /*
        * 哈希值 (hash) 来做版本号
        * [hash] 根据所有输出文件计算hash值，每一个文件改动，都会影响所有的文件的hash值
        * [chunkhash]  具体模块文件的内容计算所得的hash值，只改动单一文件，则只改变这个文件的hash值 （推荐）
        *
        * 所以在考虑用户缓存的情况下，用chunkhash来让用户获取改动的文件，没有改动的用浏览器缓存
        *
        * 哈希值 webpack默认是20位 可以设置为8位  [hash:8] [chunkhash:8]
        *
        * */
        chunkFilename: '[name]-[chunkhash:8]-chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader'
            }
        ]
    }
}
