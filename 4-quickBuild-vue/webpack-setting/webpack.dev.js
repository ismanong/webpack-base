const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const common = require('./webpack.common.js');

module.exports = merge(common, {

    plugins: [

        new ExtractTextPlugin("css/[name].css"),

        // 全局变量标识
        new webpack.DefinePlugin({

            __DEV__: true, //（开发标识）
            __DEVAPI__: "/devApi/", //（代理的标识） 热更新和后端服务结合的标识
            'process.env': {}

        }),

        new webpack.HotModuleReplacementPlugin({
            // multiStep: true
        }),

        // new OpenBrowserPlugin({url: 'http://localhost:8021' + PATHS.publicPath + 'app.html'})
        new OpenBrowserPlugin({
            url: 'http://localhost:8021/src/app.html'
        })
    ],

    devServer: {
        // compress: true, // 2废除 可能无效
        // inline: true,  // 2废除 可能无效
        // hot: true, //自动刷新，告诉 dev-server 我们在使用 HMR 2废除 可能无效
        // contentBase: path.join(__dirname, './'), // contentBase: './dist'

        publicPath: '/src/', // webpack dev server 定位资源目录 并且与请求资源路径一致 ( / 为根目录 )

        historyApiFallback: true,  // 启用历史API回退，所以基于HTML5历史API
        stats: 'errors-only', // 仅显示错误以减少输出量
        host: "localhost", // Defaults to `localhost`   process.env.HOST
        port: "8021",  // Defaults to 8080   process.env.PORT
        // proxy: { // 代理访问  可以绕过同源策略 和 webpack '热更新'结合使用
        //     '/devApi': {
        //         target: proxyTarget, //var proxyTarget = 'http://172.16.50.73:8001/'; //代理地址 热更新结合后端服务用
        //         pathRewrite: { '^/devApi': '' } // rewrite 的方式扩展性更强，不限制服务的名称
        //     }
        // }
    },

    // devtool: 'inline-source-map', // 'eval-source-map' 生成 sourcemap 的不同方式 => vendor.bundle.js 会变很大
});