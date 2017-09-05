const webpack = require('webpack');
const merge = require('webpack-merge');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// 将 manifest 提取到一个单独的 JSON 文件（类似的插件有 webpack-manifest-plugin、chunk-manifest-webpack-plugin、assets-webpack-plugin）
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackChunkHash = require("webpack-chunk-hash");// 根据文件内容生成hash值（同类的插件还有webpack-md5-hash）
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const common = require('./webpack.common.js');

module.exports = merge(common, {

    output: {
        filename: 'js/[name]-[chunkhash:8].js',
        chunkFilename:'js/[name]-[chunkhash:8].js'
    },

    plugins: [



        // 生成文件与版本号映射文件
        new ManifestPlugin({
            fileName: 'fileMaps.json',
            basePath: ''
        }),

        // 根据文件内容生成hash值
        new WebpackChunkHash(),

        new ExtractTextPlugin("css/[name]-[chunkhash:8].css"),

        // 全局变量标识
        new webpack.DefinePlugin({

            __DEV__: false, //（开发标识）
            __DEVAPI__: "",
            //去除vue的所有警告代码：http://vue-loader.vuejs.org/en/workflow/production.html
            'process.env':{
                NODE_ENV: '"production"'
            }

        }),

        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require', 'module', '_'] //忽略这些变量标示
            },
            compress: {
                warnings: false, //禁止生成uglifyjs警告
                drop_console: true,
                pure_funcs: ['console.log']
            },
            output: {
                comments: false
            },
            // sourceMap: true //
        })
    ]
});