var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var jsPath = (process.env.NODE_ENV === 'production') ? 'js/notification-center.min.js' : 'notification-center.min.js';
var cssPath = (process.env.NODE_ENV === 'production') ? 'css/notification-center.min.css' : 'notification-center.min.css';
var fontsPath = (process.env.NODE_ENV === 'production') ? 'fonts/' : '/';
var publicPath = (process.env.NODE_ENV === 'production') ? '../' : '/dist/';


module.exports = {
    entry:  {
       Main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: publicPath,
        filename: jsPath
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff|ttf|otf|eot|svg|woff2)$/,
                loaders: "file-loader",
                options: {
                    name: fontsPath + '[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        // (process.env.NODE_ENV === 'production') ?
        //     new ExtractTextPlugin(cssPath + "/notification-center.min.css") :
            new ExtractTextPlugin(cssPath)

    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // new ExtractTextPlugin(cssPath + "/notification-center.min.css")
    ])

    // module.exports.output = {
    //     path: path.resolve(__dirname, './dist'),
    //     publicPath: '/../',
    //     filename: jsPath + '/notification-center.min.js'
    // };
}
