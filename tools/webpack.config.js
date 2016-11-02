/* eslint-disable import/no-extraneous-dependencies, global-require */

import path from 'path';
import webpack from 'webpack';
import extend from 'extend';
import AssetsPlugin from 'assets-webpack-plugin';

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1',
];
const GLOBALS = {
  'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
  __DEV__: DEBUG,
};

const config = {
  context: path.resolve(__dirname, '../src'),

  output: {
    path: path.resolve(__dirname, '../build/public/assets'),
    publicPath: '/assets/',
    sourcePrefix: '  ',
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src'),
        ],
        query: {
          cacheDirectory: DEBUG,
          babelrc: false,
          presets: [
            'react',
            'es2015',
            'stage-0',
          ],
          plugins: [
            'transform-runtime',
            ...DEBUG ? [] : [
              'transform-react-remove-prop-types',
              'transform-react-constant-elements',
              'transform-react-inline-elements',
            ],
          ],
        },
      },
      {
        test: /\.css/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: DEBUG,
            modules: true,
            localIdentName: DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
            minimize: !DEBUG,
          })}`,
          'postcss-loader?pack=default',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'isomorphic-style-loader',
          `css-loader?${JSON.stringify({ sourceMap: DEBUG, minimize: !DEBUG })}`,
          'postcss-loader?pack=sass',
          'sass-loader',
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader',
        query: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: DEBUG ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
        },
      },
    ],
  },

  resolve: {
    root: path.resolve(__dirname, '../src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  postcss(bundler) {
    return {
      default: [
        require('postcss-import')({ addDependencyTo: bundler }),
        require('postcss-custom-properties')(),
        require('postcss-custom-media')(),
        require('postcss-media-minmax')(),
        require('postcss-custom-selectors')(),
        require('postcss-nesting')(),
        require('postcss-flexbugs-fixes')(),
        require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
      ],
      sass: [
        require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
      ],
    };
  },
};

//
// Configuration for the client-side bundle (client.js)
// -----------------------------------------------------------------------------

const clientConfig = extend(true, {}, config, {
  entry: './client.js',

  output: {
    filename: DEBUG ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
    chunkFilename: DEBUG ? '[name].[id].js?[chunkhash]' : '[name].[id].[chunkhash].js',
  },

  target: 'web',

  plugins: [
    new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': true }),
    new AssetsPlugin({
      path: path.resolve(__dirname, '../build'),
      filename: 'assets.js',
      processOutput: x => `module.exports = ${JSON.stringify(x)};`,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),

    ...DEBUG ? [] : [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
          warnings: VERBOSE,
        },
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
    ],
  ],
  devtool: DEBUG ? 'source-map' : false,
});

//
// Configuration for the server-side bundle (server.js)
// -----------------------------------------------------------------------------

const serverConfig = extend(true, {}, config, {
  entry: './server.js',

  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'server.js',
    chunkFilename: 'server.[name].js',
    libraryTarget: 'commonjs2',
  },

  target: 'node',

  externals: [
    /^\.\/assets$/,
    /^[@a-z][a-z\/\.\-0-9]*$/i,
  ],

  plugins: [
    new webpack.DefinePlugin({ ...GLOBALS, 'process.env.BROWSER': false }),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  devtool: 'source-map',
});

export default [clientConfig, serverConfig];
