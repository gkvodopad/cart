'use strict'

if (!TASK_CONFIG.javascripts) {
  return
}

const path            = require('path')
const pathToUrl       = require('./pathToUrl')
const projectPath     = require('./projectPath')
const webpack         = require('webpack')
const webpackManifest = require('./webpackManifest')
const querystring     = require('querystring')

module.exports = function (env) {

  process.env['BABEL_ENV'] = process.env['BABEL_ENV'] || process.env['NODE_ENV'] || env

  const jsSrc = projectPath(PATH_CONFIG.src, PATH_CONFIG.javascripts.src)
  const jsDest = projectPath(PATH_CONFIG.dest, PATH_CONFIG.javascripts.dest)
  const publicPath = pathToUrl(TASK_CONFIG.javascripts.publicPath || PATH_CONFIG.javascripts.dest, '/')
  //const rev = TASK_CONFIG.production.rev && env === 'production'
  const rev = false

  function ensureLeadingDot(string) {
    return string.indexOf('.') === 0 ? string : `.${string}`
  }
  const extensions = TASK_CONFIG.javascripts.extensions.map(ensureLeadingDot)

  TASK_CONFIG.javascripts.babelLoader.options = TASK_CONFIG.javascripts.babelLoader.options || TASK_CONFIG.javascripts.babel
  TASK_CONFIG.javascripts.babelLoader.test = TASK_CONFIG.javascripts.babelLoader.test || new RegExp(`(\\${extensions.join('$|')}$)`)

  const webpackConfig = {
    context: jsSrc,
    entry: TASK_CONFIG.javascripts.entry,
    output: {
      path: path.normalize(jsDest),
      filename: rev ? '[name]-[hash].js' : '[name].js',
      publicPath: publicPath
    },
    plugins: [
      new webpack.ProvidePlugin({
	      jQuery: 'jquery',
	      $: 'jquery',
	      jquery: 'jquery',
	      'window.jQuery': 'jquery',
	      'window.Tether': 'tether',
	      Util: 'exports-loader?Util!bootstrap/js/dist/util',
	      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
	      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
	      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
	      Button: 'exports-loader?Button!bootstrap/js/dist/button',
	      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
        ScrollSpy: 'exports-loader?ScrollSpy!bootstrap/js/dist/scrollspy',
        Scrollspy: 'exports-loader?ScrollSpy!bootstrap/js/dist/scrollspy',
        scrollspy: 'exports-loader?ScrollSpy!bootstrap/js/dist/scrollspy'
      }) 
    ],
    resolve: {
      extensions: extensions,
      alias: TASK_CONFIG.javascripts.alias,
      modules: [jsSrc, projectPath('node_modules')],
    },
    module: {
      rules: [ TASK_CONFIG.javascripts.babelLoader ]
    }
  }

  // Provide global objects to imported modules to resolve dependencies (e.g. jquery)
  if (TASK_CONFIG.javascripts.provide) {
    webpackConfig.plugins.push(new webpack.ProvidePlugin(TASK_CONFIG.javascripts.provide))
  }

  if (env === 'development') {
    webpackConfig.devtool = TASK_CONFIG.javascripts.development.devtool || TASK_CONFIG.javascripts.devtool || false
    webpackConfig.output.pathinfo = true

    // Create new entry object with webpack-hot-middleware and react-hot-loader (if enabled)
    if (!TASK_CONFIG.javascripts.hot || TASK_CONFIG.javascripts.hot.enabled !== false) {
      for (let key in TASK_CONFIG.javascripts.entry) {
        const entry = []

        const hotMiddleware = `webpack-hot-middleware/client?${querystring.stringify(TASK_CONFIG.javascripts.hot)}`

        if (TASK_CONFIG.javascripts.hot.react) {
          entry.push('react-hot-loader/patch')
        }

        TASK_CONFIG.javascripts.entry[key] = entry.concat(hotMiddleware, TASK_CONFIG.javascripts.entry[key])
      }

      webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
    }
  }

  if (env === 'production') {
    if (rev) {
      webpackConfig.plugins.push(new webpackManifest(PATH_CONFIG.javascripts.dest, PATH_CONFIG.dest))
    }

    // const uglifyConfig = TASK_CONFIG.javascripts.production.uglifyJsPlugin
    const babiliConfig = TASK_CONFIG.javascripts.production.babiliJsPlugin
    webpackConfig.devtool = TASK_CONFIG.javascripts.production.devtool

    if(webpackConfig.devtool) {
      // uglifyConfig.sourceMap = true
      babiliConfig.sourceMap = true
    }

    const BabiliPlugin = require("babili-webpack-plugin");
    webpackConfig.plugins.push(
      new webpack.DefinePlugin(TASK_CONFIG.javascripts.production.definePlugin),
      // new webpack.optimize.UglifyJsPlugin(uglifyConfig),
      new BabiliPlugin(babiliConfig),
      new webpack.NoEmitOnErrorsPlugin()
    )
  }

  // Add defined plugins and loaders for all environments
  if( TASK_CONFIG.javascripts.plugins ) {
    webpackConfig.plugins = webpackConfig.plugins.concat(TASK_CONFIG.javascripts.plugins(webpack) || [])
  }
  webpackConfig.module.rules = webpackConfig.module.rules.concat(TASK_CONFIG.javascripts.loaders || [])


  // Additional plugins and loaders according to environment
  if ( TASK_CONFIG.javascripts[env] ) {
    if( TASK_CONFIG.javascripts[env].plugins ) {
      webpackConfig.plugins = webpackConfig.plugins.concat(TASK_CONFIG.javascripts[env].plugins(webpack) || [])
    }
    webpackConfig.module.rules = webpackConfig.module.rules.concat(TASK_CONFIG.javascripts[env].loaders || [])
  }

  // Allow full manipulation of the webpack config
  const { customizeWebpackConfig = w => w } = TASK_CONFIG.javascripts
  return customizeWebpackConfig(webpackConfig, env, webpack)
}
