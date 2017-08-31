var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [

        new HtmlWebpackPlugin({
            filename: 'a.html',
            template: __dirname + '/src/app.html',
            inject: 'true',
            chunksSortMode: 'dependency'
        })

    ],
    entry: [
        './src/main.js' //'index.js'
    ],
    output: {
        path: './dist',
        filename: '[name].bundle.js',
        /*
         * chunkFilename
         * 模块输出的名称 （比如 require.ensure 按需加载时，会输出...）
         * 要正确的引用此文件，必须要配置publicPath 属性
         * 文件名字 支持获取 模块id 和 require.ensure设置的name
         * */
        chunkFilename: '[name]-[id]-chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader'
            },

            /*
            * bundle-loader是对于require.ensuire的抽象，并且能够大大屏蔽底层的实现。
            * 如果某个模块选择使用Bundle Loader进行打包，那么其会被打包到一个单独的Chunk中，
            * 并且Webpack会自动地为我们生成一个加载函数，从而使得在需要时以异步请求方式进行加载。
            * */
            // {
            //     test: routeComponentRegex,
            //     include: path.resolve(__dirname, 'app'),
            //     loaders: ['bundle?lazy', 'babel']
            // }

        ]
    }
}