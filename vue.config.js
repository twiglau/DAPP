const path = require('path')

const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin')
    // 判断开发环境
const isProduction = process.env.NODE_ENV === 'production';
const isWeb = process.env.VUE_APP_PLAT === 'Web';
function resolve(dir) {
    return path.join(__dirname, '.', dir)
}
// 项目部署基础
const BASE_URL = process.env.NODE_ENV === 'production' ?
    './' :
    '/'

const assetsCDN = {
    externals: {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'vuex': 'Vuex',
        'axios': 'axios'
       
    },
    //2.12.4
    css: [
    ],
    js: [
        'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
        'https://cdn.jsdelivr.net/npm/vue-router@3.0.3/dist/vue-router.min.js',
        'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
        'https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
    ]
}
module.exports = {
    //webpack配置
    configureWebpack: config => {
        config.module.rules.push({
            test: /\.(swf|ts|ttf|eot|woff(2))(\?[a-z0-9]+)?$/,
            loader: 'file-loader',
        })

        if (isProduction) {
            // 1.开启gzip压缩 ---> 具体是?
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: /\.js$|\.html$|\.json$|\.css/,
                threshold: 10240,
                minRatio: 0.8
            }));


            // 3.生产环境关闭console, 注意TerserPlugin 插件
            // 2.开启分离js ---> 与下面实现冲突了?
            config.optimization = {
                //Tree-shaking ---> 需要测试结果
                // //2.1 模块只导出被使用的成员
                // usedExports: true,
                // //2.2 尽可能合并每一个模块到一个函数中
                // concatenateModules: true,
                // //2.3 压缩输出结果
                // minimize: false,
                // //2.4 sideEffects
                // sideEffects: true,
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            ecma: undefined,
                            warnings: false,
                            parse: {},
                            compress: {
                                drop_console: true
                            },
                        },
                    }),
                ],
                runtimeChunk: 'single',
                splitChunks: {
                    chunks: 'all',
                    maxInitialRequests: Infinity,
                    minSize: 20000,
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                // get the name. E.g. node_modules/packageName/not/this/part.js
                                // or node_modules/packageName
                                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                                    // npm package names are URL-safe, but some servers don't like @ symbols
                                return `npm.${packageName.replace('@', '')}`
                            }
                        },
                        // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
                        commons: {
                            name: 'chunk-commons',
                            test: resolve('src/components'),
                            minChunks: 3, //  被至少用三次以上打包分离
                            priority: 5, // 优先级
                            reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
                        },
                        node_vendors: {
                            name: 'chunk-libs',
                            chunks: 'initial', // 只打包初始时依赖的第三方
                            test: /[\\/]node_modules[\\/]/,
                            priority: 10
                        },

                        'core-js': {
                            name: 'chunk-core_js', // 单独将 howler 拆包
                            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
                            test: /[\\/]node_modules[\\/]_?core-js(.*)/
                        },
                        vantUI: {
                            name: 'chunk-vantUI', // 单独将 vantUI 拆包
                            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
                            test: /[\\/]node_modules[\\/]_?vant(.*)/
                        },
                        html2canvas: {
                            name: 'chunk-html2canvas', // 单独将 vantUI 拆包
                            priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
                            test: /[\\/]node_modules[\\/]_?html2canvas(.*)/
                        },

                    }
                }
            };
            // 取消webpack警告的性能提示
            config.performance = {
                hints: 'warning',
                //入口起点的最大体积
                maxEntrypointSize: 50000000,
                //生成文件的最大体积
                maxAssetSize: 30000000,
                //只给出 js 文件的性能提示
                assetFilter: function(assetFilename) {
                    return assetFilename.endsWith('.js');
                }
            };
            // 修改vue.config.js 分离不常用代码库
            // 如果不配置webpack也可直接在index.html引入
            //// 在public文件夹的index.html 加载
            config.externals = isProduction? assetsCDN.externals : {}
        }
    },
    publicPath: BASE_URL,
    outputDir: 'dist',
    assetsDir: 'static',
    devServer: {
        host: '127.0.0.1',
        port: 8099, // 端口号
        hotOnly: false,
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        proxy: null, // 配置跨域处理,只有一个代理
        disableHostCheck: true, // 禁用webpack热重载检查 解决热更新失效问题
    },
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        },
        extract: true, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps
        requireModuleExtension: false // 启用 CSS modules for all css / pre-processor files.
    },
    chainWebpack: config => {


        // it can improve the speed of the first screen, it is recommended to turn on preload
        config.plugin('preload').tap(() => [{
                rel: 'preload',
                // to ignore runtime.js
                // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial'
            }])
            // config.plugins.delete('preload') // TODO: need test
        config.plugins.delete('prefetch') // TODO: need test


        //5. svg 图片处理 sprite 是不是与图片处理冲突了? 不起作用?
        // const dir = path.resolve(__dirname, 'src/icons')
        config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
        config.module
            .rule('svg-sprite-loader')
            .test(/\.svg$/)
            .include
            .add(resolve('src/icons')) //处理svg目录
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]',
            })
            .end()

        config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }])
        // config.module.rule('svg').exclude.add(dir)

        if (isProduction) {
            config.plugin('html').tap(args => {
                args[0].cdn = assetsCDN
                return args
            })

            if (process.env.npm_config_report) {
                config.plugin('webpack-bundle-analyzer')
                    .use(BundleAnalyzerPlugin)
                    .init(Plugin => new Plugin());
            }
        }

        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('@c', resolve('src/components'));
    },
    // 打包时不生成.map文件
    productionSourceMap: false
}