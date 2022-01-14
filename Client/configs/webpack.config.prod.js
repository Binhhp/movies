const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
//set path entry and output
const PATHS = {
    src: path.join(__dirname, '../src/index.js'),
    build: path.join(__dirname, '../build')
};

module.exports = {
    entry: ['@babel/polyfill', PATHS.src],
    
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: /src/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
            {
                test: /\.(jpg|png|jpeg)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        // Inline files smaller than 10 kB (10240 bytes)
                        limit: 10 * 1024,
                    },
                },
            },
            {
                test: /\.woff(2)?(\?[a-z0-9]+)?$/,
                use: {
                    loader: "url-loader?limit=10000&mimetype=application/font-woff"
                }
            }, 
            {
                test: /\.(ttf|eot|svg|gif|pdf)(\?[a-z0-9]+)?$/,
                use: {
                    loader: "file-loader",
                    options: {
                        // Inline files smaller than 10 kB (10240 bytes)
                        limit: 10 * 1024,
                        // Remove the quotes from the url
                        // (they’re unnecessary in most cases)
                        noquotes: true,
                    },
                },
            }
        ],
    },

    resolve: {
        extensions: ['.ts', '.tsx', ".js", ".jsx", ".json"],
    },
    
    output: {
        path: PATHS.build,
        filename: '[name]-[hash:6].bundle.js',
        chunkFilename: "[name]-[hash:6].bundle.js",
        publicPath: '/'
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //webpack css
        new MiniCssExtractPlugin({
            linkType: false,
            filename: '[name].css',
            chunkFilename: 'style-[id].css',
        }),
        //webpack html
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                conservativeCollapse: true,
                preserveLineBreaks: true,
                useShortDoctype: true,
                html5: true
            },
            mobile: true,
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            template: './public/404.html',
            filename: '404.html',
            inject: 'body'
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        })
    ],

    devServer: {
        contentBase: path.resolve(__dirname, './build'),
        hot: true,
        open: true,
        watchContentBase: true,
        historyApiFallback: true,
        https: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },

    optimization: {
        runtimeChunk: 'single',//enable "runtime" chunk
    },
};