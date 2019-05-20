const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'client', 'index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'build.js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    // index: '', this would enable the root to be proxyed but I don't think we need this for the dev server
    contentBase: path.join(__dirname, '/public'),
    port: 8080,
    proxy: [
      {
        context: ['/login', '/signup'],
        target: 'http:localhost:3000',
      },
    ],
    publicPath: '/build',
    hot: true,
    historyApiFallback: true,
  },
};
