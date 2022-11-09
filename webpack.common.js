const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const BASE_DIR = 'assets/';

module.exports = {
  entry: {
    index: './src/pages/index/main.js',
    about: './src/pages/about/main.js',
    contacts: './src/pages/contacts/main.js',
  },
  output: {
    filename: `${BASE_DIR  }js/[name].js`,
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: "assets/",
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
      template: './src/pages/about/tmpl.html',
      inject: true,
      chunks: ['about'],
      filename: 'about.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/contacts/tmpl.html',
      inject: true,
      chunks: ['contacts'],
      filename: 'contacts.html',
    }),
    new MiniCssExtractPlugin({
      filename: `${BASE_DIR  }css/[name].css`,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader', 'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          }],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${BASE_DIR  }img/[name][ext][query]`,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
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
    // moduleIds: "deterministic", //prevent vendors hash from change
    runtimeChunk: 'single', //split common files code
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, //spit vendors to separete files
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
