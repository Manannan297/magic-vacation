const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './source/js/script.js',
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'build'),
    clean: true,
    filename: 'js/script.js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.sass', '.scss', '.css'],
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
    },
    devMiddleware: {
      writeToDisk: true,
    },
    port: 7777,
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              url: false,
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: false,
            },
          },
          {
            loader: 'posthtml-loader',
            options: {
              plugins: [
                require('posthtml-include')({root: 'source'}),
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'source/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/style.min.css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'source/fonts/**/*.{woff,woff2}',
          to: 'fonts/[name][ext]',
        },
        {
          from: 'source/img',
          to: 'img',
        },
        {
          from: 'source/*.ico',
          to: '[name][ext]',
          noErrorOnMissing: true,
        },
        {
          from: 'source/3d',
          to: '3d',
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
};
