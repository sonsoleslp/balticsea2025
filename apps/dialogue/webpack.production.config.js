const { resolve } = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'production',
  entry: [
    'babel-polyfill',
    'react',
    'react-dom',
    './index.js'
  ],
  context: resolve(__dirname, 'src'),

  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '',
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/public/index.html`,
      filename: 'index.html',
      inject: false,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
    new CopyWebpackPlugin({ patterns: [
      { from: "./vendors", to: "vendors" },
    ]}),
  ],

  module: {
    rules: [
      {
        test: /\.(jsx|js|es6)?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]

      },
      {
          test: /\.css$/,
          use: [
              "style-loader",
              "css-loader",
          ],
      },
      {
          test: /\.(scss|sass)$/,
          exclude: /(node_modules|bower_components)/,
          use: [
              'style-loader',
              'css-loader',
              { loader: 'sass-loader', options: { sourceMap: false } },
          ],
      },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'file-loader' },
      { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, use: 'file-loader' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
    ]
  },
  resolve: {
        // resolve.alias could be useful for resolving certain modules easily
        extensions: ['.js', '.jsx', '.es6'],
    }
};

module.exports = config;
