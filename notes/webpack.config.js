const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entry = {
  polyfills: [
    'core-js/es6'
    , 'core-js/es7/reflect'
    , 'zone.js/dist/zone'
    , 'zone.js/dist/long-stack-trace-zone'
  ]
  , vendor: [
    '@angular/platform-browser-dynamic'
    , '@angular/platform-browser'
    , '@angular/core'
    , '@angular/http'
    , '@angular/router'
    , 'rxjs/add/operator/map'
    , 'rxjs/add/operator/catch'
    , 'rxjs/add/observable/throw'
    , 'rxjs/Rx'
  ]
  , main: './main'
};

const config = {
  cache: true
  , devtool: 'source-map'
  , entry: entry
  , context: path.join(__dirname, 'src')
  , output: {
    path: path.join(__dirname, 'build')
    , filename: '[name].bundle.js'
    , sourceMapFilename: '[name].map'
    , chunkFilename: '[id].chunk.js'
  }
  , module: {
    loaders: [{
      test: /\.ts$/
      , loader: 'awesome-typescript-loader'
    }]
  }
  , resolve: {
    extensions: ['.ts', '.js']
  }
  , plugins: [
    new HtmlWebpackPlugin({
      hash: true
      , title: 'Angular2-Seed'
      , template: 'index.html'
      , inject: true
    })
    , new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/
      , __dirname
    )
    , new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'vendor', 'main'].reverse()
      , minChunks: Infinity
    })
  , ],

  devServer: {
    // Our Webpack Development Server config
    port: 5500
    , inline: true
      // , publicPath: '/src/'

    , outputPath: path.join(__dirname, 'build', path.sep)
    , stats: {
      // Config for minimal console.log mess.
      assets: false
      , colors: true
      , version: false
      , hash: false
      , timings: false
      , chunks: false
      , chunkModules: false
      , errors: true
      , errorDetails: true
      , warnings: true
    }
    , historyApiFallback: true
    , watchOptions: {
      aggregateTimeout: 300
      , poll: 1000
    }
  }
  , node: {
    global: true
    , process: true
    , Buffer: false
    , crypto: 'empty'
    , module: false
    , clearImmediate: false
    , setImmediate: false
    , clearTimeout: true
    , setTimeout: true
  }
};

module.exports = config;
