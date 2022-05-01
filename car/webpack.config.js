const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'production',
  entry: './js/app.js',
  output: {
    path: path.join(__dirname, '.'),
    filename: 'main.bundle.js',
  },
  stats: {
    errorDetails: true,
  },
  resolve: {
    alias: {
      js: path.join(__dirname, './js'),
      images: path.join(__dirname, './images'),
    },
    extensions: ['.js', 'json'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './assets/index.html'),
    }),
  ],
}
