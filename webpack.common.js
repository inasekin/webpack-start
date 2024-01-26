const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');
const BASE_DIR = 'assets/';
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const LoggerPlugin = {
  apply: (compiler) => {
    compiler.hooks.done.tap('LoggerPlugin', (stats) => {
      console.log(stats.toString({ all: false, errors: true, warnings: true, colors: true }));
    });
  }
};


module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/pages/index', 'main.js'),
    contacts: path.resolve(__dirname, 'src/pages/contacts', 'main.js'),
    ui: path.resolve(__dirname, 'src/pages/ui', 'main.js'),
  },
  output: {
    filename: `${BASE_DIR}js/[name].[contenthash].js`,
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/index/tmpl.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/contacts/tmpl.html',
      inject: true,
      chunks: ['contacts'],
      filename: 'contacts.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/ui/tmpl.html',
      inject: true,
      chunks: ['ui'],
      filename: 'ui.html',
    }),
    new MiniCssExtractPlugin({
      filename: `${BASE_DIR}css/[name].css`,
    }),
    new SpriteLoaderPlugin({ plainSprite: true }),
    new webpack.ProgressPlugin(),
    LoggerPlugin,
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              publicPath: 'assets/img/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${BASE_DIR}img/[name][ext]`,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${BASE_DIR}fonts/[name][ext][query]`
        },
      },
      {
        test: /\.(mov|mp4)$/,
        type: 'asset/resource',
        generator: {
          filename: `${BASE_DIR}videos/[name][ext]`
        },
      },
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
      {
        resourceQuery: /template/,
        loader: 'html-loader',
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
