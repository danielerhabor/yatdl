// webpack.config.js
const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.tsx')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true
  },
  devServer: {
    static: {       
      directory: path.resolve(__dirname, 'dist')
    },
    port: process.env.CLIENT_PORT || 8080,
    hot: true
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,    
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader",],
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "Pomodoro Tracker Application",
      filename: "index.html",
      template: "public/index.html"
    }),
    new MiniCssExtractPlugin(),
    new webpack.EnvironmentPlugin(['SERVER_URL'])
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
}