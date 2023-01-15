const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const fs = require('fs');
const os = require('os');

module.exports = (env) => {
    return {
        devServer: {
            allowedHosts: 'all',
            port: 80,
            /*https: {
                cert: fs.readFileSync(path.join(os.homedir(), '.openssl', 'cert.pem')),
                key: fs.readFileSync(path.join(os.homedir(), '.openssl', 'key.pem')),
                //ca: fs.readFileSync(path.join(path.join(os.homedir(), '.openssl'), 'csr.pem'))
            }*/
        },
    mode: 'development',
    entry: {
      index: './src/index.ts',
    },
    plugins: [

      new webpack.DefinePlugin({
        WEBSOCKET_URL: JSON.stringify((env.WEBSOCKET_URL !== undefined) ? env.WEBSOCKET_URL : '')
      }),

      new HtmlWebpackPlugin({
        title: 'Development',
        template: './src/index.html',
        filename: 'index.html'
      }),

      new MiniCssExtractPlugin()

    ],
    // turn off so we can see the source map for dom delegate so we can debug the library
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: [
            /node_modules/,
          ],
        },
        {
          test: /\.html$/i,
          use: 'html-loader'
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
            test: /\.svg$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        limit: 10000
                    },
                },
            ],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            loader: 'file-loader'
          /*type: 'asset/resource',
          generator: {
            filename: 'images/[name]-[hash][ext]'
          },
            use: [
              {
                  loader: 'file-loader',
              }
          ],*/
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.svg'],
    },
    output: {
      filename: '[name].js',
      library: 'frontend', // change this to something more meaningful
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      globalObject: 'this'
    },
    optimization: {
      minimize: false
    },
  };
}
