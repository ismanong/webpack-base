
## webpack.config.js

```javascript

    /**
     * Created by zhangzeren on 2016/8/17.
     */
    var path = require('path');
    // var validate = require('webpack-validator'); //验证 config 是否正确
    var webpack = require('webpack');

    // 将 manifest 提取到一个单独的 JSON 文件（类似的插件有 webpack-manifest-plugin、chunk-manifest-webpack-plugin、assets-webpack-plugin）
    var ManifestPlugin = require('webpack-manifest-plugin');

    // 根据文件内容生成hash值（同类的插件还有webpack-md5-hash）
    var WebpackChunkHash = require("webpack-chunk-hash");

    var CleanWebpackPlugin = require('clean-webpack-plugin'); // 清空发布目录
    var HtmlWebpackPlugin = require('html-webpack-plugin'); // 创建html
    var ExtractTextPlugin = require("extract-text-webpack-plugin"); // 将css文件单独输出  new ExtractTextPlugin('style-[contenthash:8].css'),
    var Merge = require('webpack-merge'); // 配置合并
    var OpenBrowserPlugin = require('open-browser-webpack-plugin'); //自动打开浏览器
    var markdown = require('./webpack-setting/webpack.markdown.js');
    var autoprefixer = require('autoprefixer'); // 自动添加 css3 前缀，依赖于 postcss

    /*
    * webpck打包 输出路径
    * */

    var imgPath = 'images/',                    //图片 超出10kb自动分离到此文件路径
        cssPath = 'css/',                        //css
        componentPath = 'components/',           //按需加载模块(jsx组件)
        vendorPath = 'vendors/',                 //第三方库与框架 && 公共的js合并
        outputPath = 'js/',                      //全局global，等js
        htmlPath = '',                           //html存放  设置 '' 为输出文件夹(dist)的根
        staticPath = '/react-demo/f9/dist/';    //静态资源 cdn 绝对路径  如：html模板打包自动引入的链接路径(暂时只跟html插件相关)

    var currentTarget = process.env.npm_lifecycle_event; //检测NPM运行时 npm run 的值 (dev build dist)

    module.exports = function (env) {

        console.log(currentTarget)

        var debug,          // 是否开启调试
            minimize;       // 是否开启压缩

        if (currentTarget == "build") { // online mode （线上模式）
            debug = false; minimize = true;
        } else if (currentTarget == "dev") { // dev mode （开发模式）
            debug = true; minimize = false;
        }


        var PATHS = {
            publicPath: debug ? '/src/' : './',
            node_modulesPath: path.resolve('./node_modules'),

        };

        var resolve = {
            extensions: ['.js', 'json', '.css', '.scss', '.jsx', '.vue', '.png', '.jpg'], //用于设置 webpack 处理的扩展名
            modules: [ //查找module的话从这里开始查找，必须绝对路径，搜索模块的优先级与数组的顺序有关，越靠前的越先匹配
                // path.resolve(__dirname, "src"),
                // PATHS.node_modulesPath
                'node_modules'
            ],
            alias: { // 别名配置，配置之后，可以在别的js文件中直接使用require('d3')，将导入的文件作为一个模块导入到你需要的项目中，不用配置别也可会当作模块导入项目中，只是你要重复写路径而已。
                'vue$': 'vue/dist/vue'
            }
        };

        /*
        * 入口文件
        * */
        var entry = {
            app: './src/main.js',
            // 'lib/utils/Global': [
            common: [ // 业务公用
                path.join(__dirname, 'src/js/common.js'),
                path.join(__dirname, 'src/js/config.js'),
            ],
            vendors: [// 依赖的第三方全局框架与库
                'babel-polyfill',
                'vue',
                'vue-router',
                'vuex',
            ],
        };

        /*
        * 输出配置
        * */
        var output = {
            path: path.join(__dirname, 'dist'),//即入口文件最终要存放到哪里
            filename: debug ? 'js/[name].js' : 'js/[name]-[chunkhash:8].js',
            chunkFilename: debug ? 'js/[name].js' : 'js/[name]-[chunkhash:8].js',
            //发布后静态资源引用的目录（ ‘发布目录’+资源目录）
            publicPath: PATHS.publicPath,
        };

        /*
        * 加载器配置
        * */
        var rules = [

            // babel-loader
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/  //排除不处理的目录，正常使用情况下，只需要/node_modules/
            },

            // vue loader
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            extractCSS: true
                        }
                    }
                ]

            },

            // vue-markdown-loader 配置
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'vue-markdown-loader',
                        options: markdown.getMarkDownSetting()
                    }
                ]
            },

            // css loader
            {
                test: /\.(sc|c)ss$/,
                use: ExtractTextPlugin.extract({ // 从js文件中提取CSS文件，减少JS文件大小，优化页面加载，但是它会增加包的时间，所以应该只在构建文件中使用
                    fallback: 'style-loader',
                    use: [
                        'css-loader?sourceMap',
                        {
                            loader: 'postcss-loader?sourceMap',// 自动添加css前缀的插件
                            options: {
                                plugins: () => [autoprefixer({browsers: ['last 2 versions']})]
                            }
                        },
                        'sass-loader'
                    ]
                })
            },

            // img loader
            {
                test: /\.(png|gif|jpe?g)$/,
                use: [{
                    loader: 'url-loader',
                    query: {
                        limit: 10000, // 图片文件使用 url-loader 来处理，小于10kb的直接转为base64
                        name: 'images/[name]-[hash:8].[ext]'
                    }
                }]
            },

            // font loader
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5000,
                        name: 'font/[name]-[hash:8].[ext]'
                    }
                }]
            },

            // html-loader
            {
                test: /\.html$/,
                use: [
                    "html-loader" // loader: "html?-minimize"
                ]
            }

        ];

        /*
        * 插件
        * */
        var plugins = [

            // 将公共库(vendor)和应用程序代码分离开来，并创建一个显式的 vendor chunk 以防止它频繁更改
            new webpack.optimize.CommonsChunkPlugin(
                debug ?
                    {name: "vendors", filename: "js/vendors.js"} :
                    {names: ["vendors", "manifest"]}
            ),

            // 生成文件与版本号映射文件
            new ManifestPlugin({ fileName: 'fileMaps.json', basePath: '' }),

            // 全局变量标识
            new webpack.DefinePlugin({
                //（开发标识）
                __DEV__: debug,
                // 代理的标识）
                __DEVAPI__: debug ? "/devApi/" : "''", // 热更新和后端服务结合的标识
                //去除vue的所有警告代码：http://vue-loader.vuejs.org/en/workflow/production.html
                'process.env': debug ? {
                    NODE_ENV: '"production"'
                }:{}
            }),

            /*
             * 1、暴露到全局变量
             * 2、先找 .resolve.alias 中的属性，若没找到会找 node_modules 下的文件，直到找到为止
             * (可以单独使用 但不建议使用  使用webpack.optimize.CommonsChunkPlugin + entry)
             * */
            new webpack.ProvidePlugin({}),
            /*new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                'React' : 'react',
                "ReactDOM": "react-dom",
            }),*/

            // 生成保存在构建中的标识符（开发模式用NamedModulesPlugin）
            new webpack.HashedModuleIdsPlugin(),

            // 根据文件内容生成hash值
            new WebpackChunkHash(),

            // new webpack.NoEmitOnErrorsPlugin(),
            new CleanWebpackPlugin(['dist'], {
                root: path.resolve(__dirname, '/dist'), // An absolute path for the root  of webpack.config.js
                verbose: true,// Write logs to console.
                dry: false // Do not delete anything, good for testing.
            }),

            new ExtractTextPlugin(debug ? "css/[name].css" : "css/[name]-[chunkhash:8].css"),

            // 创建html
            new HtmlWebpackPlugin({
                filename: 'app.html',
                template: __dirname + '/src/app.html',
                inject: 'true',
                // 需要依赖的模块
                // chunks: ['common','vendors', 'app', 'webpackAssets'],
                // 根据依赖自动排序
                chunksSortMode: 'dependency'
            })
        ];




        /*
         * 开启热更新，并自动打开浏览器devServer
        * */
        var devServer = {};
        if (debug) {

            // 启用 HMR
            plugins.push(new webpack.HotModuleReplacementPlugin({
                // multiStep: true
            }));

            // 编译完成自动打开浏览器
            plugins.push(new OpenBrowserPlugin({url: 'http://localhost:8021' + PATHS.publicPath + 'app.html'}));

            devServer = {
                // compress: true, // 2废除 可能无效
                // inline: true,  // 2废除 可能无效
                // hot: true, //自动刷新，告诉 dev-server 我们在使用 HMR 2废除 可能无效
                // contentBase: path.join(__dirname, './'),
                // publicPath: '/src/', // webpack dev server 定位资源目录
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
            }
        }

        /*
         * js、css 压缩
         * */
        if (minimize) {
            plugins.push(
                new webpack.optimize.UglifyJsPlugin({ //可以直接用new webpack.optimize.UglifyJsPlugin() ==> 最小化所有JavaScript块输出
                    mangle: {
                        except: ['$super', '$', 'exports', 'require', 'module', '_'] //忽略这些变量标示
                    },
                    compress: {
                        warnings: false  //禁止生成uglifyjs警告
                    },
                    output: {
                        comments: false
                    },
                    // sourceMap: true //
                })
            )
        }

        var config = {

            entry: entry,

            output: output,

            resolve: resolve,

            module: {
                rules: rules
            },

            plugins: plugins,

            devServer: devServer

            // devtool: 'eval-source-map' //生成 sourcemap 的不同方式 => vendor.bundle.js 会变很大

        };
        return config
    };


```


