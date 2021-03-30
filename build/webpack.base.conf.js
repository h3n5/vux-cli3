let path = require('path')
let utils = require('./utils')
let vueLoaderConfig = require('./vue-loader.conf')
const ESLintPlugin = require('eslint-webpack-plugin')
let projectRoot = path.resolve(__dirname, '../')
let config = require('../config')
let fs = require('fs')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
let argv = require('yargs').argv
argv.simulate = argv.simulate || false

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

function join(dir) {
  return path.join(__dirname, dir)
}
const webpackConfig = {
  mode: 'development',
  entry: {
    main: join('../src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'vux3.min.js',
    library: 'vux3',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [resolve('src'), resolve('node_modules')],
    alias: {
      vue$: 'vue/dist/vue.common.js',
      src: resolve('src'),
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      '@': resolve('src'),
    },
  },
  plugins: [
    // new ESLintPlugin({
    //   extensions: ['js', 'vue'],
    //   exclude: ['node_modules'],
    //   // include: [resolve('src'), resolve('test')],
    //   // formatter: require('eslint-friendly-formatter'),
    // }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: {
                css: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true,
                    },
                  },
                ],
                less: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      sourceMap: true,
                    },
                  },
                  {
                    loader: 'less-loader',
                    options: {
                      sourceMap: true,
                    },
                  },
                  {
                      loader: 'style-resources-loader',
                      options: {
                          patterns: path.resolve(__dirname, '../theme/theme.less'),
                          injector: 'append'
                      }
                  }
                ],
              },
              postLoaders: {
                html: 'babel-loader?sourceMap',
              },
              sourceMap: true,
            },
          },
          {
            loader: join('./vux-template-loader'),
            options: {
            },
          },
        ],
      },
      {
        test: /\.(yaml|yml)$/,
        loader: 'js-yaml-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          include: [resolve('src'), resolve('test')],
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'styleTag',
            },
          },
          {
            loader: 'css-loader',
            options: {
              // sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'styleTag',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            },
          },
          {
              loader: 'style-resources-loader',
              options: {
                  patterns: path.resolve(__dirname, '../theme/theme.less'),
                  injector: 'append'
              }
          }
        ],
      },
    ],
  },
}

// const vuxLoader = require('vux-loader')
// const vuxConfig = require('./vux-config')
module.exports = webpackConfig
