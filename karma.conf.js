const webpackConfig = require('./node_modules/@vue/cli-service/webpack.config.js')

module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'tests/unit/karma-index.js'
    ],
    preprocessors: {
      'tests/unit/karma-index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    reporters: ['spec'],

    browsers: ['Nightmare'],
    nightmareOptions: {
      width: 800,
      height: 600,
      show: false,
    }
  })
}
