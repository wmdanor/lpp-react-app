const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV;
const isDevBuild = mode !== 'production';
const buildPath = './dist';

const CONFIG = {
  entry: './src/scripts/index.js',
  mode,
  output: {
    filename: 'scripts/main.js',
    path: path.resolve(__dirname, buildPath),
  },
  optimization: {
    minimize: !isDevBuild,
    minimizer: !isDevBuild ? [
      // Prod
      new TerserWebpackPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCssAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ] : [
      // Dev
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: './index.html',
      minify: {
        collapseWhitespace: true,
        minifyCSS: true,
        removeComments: true,
      },
    }),
    new HtmlReplaceWebpackPlugin([
      {
        pattern:
          '<script type="text/javascript" src="/scripts/main.js"></script>',
        replacement: '',
      },
      {
        pattern: '<link rel="stylesheet" href="/styles/main.css">',
        replacement: '',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'styles/main.css',
    }),
    new CleanWebpackPlugin(),
  ].concat(isDevBuild ? [
    // Dev
    new CaseSensitivePathsPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      moduleFilenameTemplate: path.relative(buildPath, '[resourcePath]'),
    }),
  ] : [
    // Prod
  ]),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        resolve: { extensions: [".js", ".jsx"] },
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: true,
              plugins: [],
            },
          },
        ],
      },
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ].concat(isDevBuild ? [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'url-loader',
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
      },
    ] : [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '/images/[name].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '/fonts/[name].[ext]',
        },
      },
    ]),
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 3001,
    hot: true,
    watchContentBase: true,
    noInfo: true,
    proxy: {
      // '*': {
      //   target: '/',
      // },
    },
  },
};

module.exports = CONFIG;
