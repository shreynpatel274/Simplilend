// Karma configuration
// Generated on Sun Nov 13 2016 09:41:19 GMT+0530 (IST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',
    autoWatch: true,


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine',
      'browserify'],


    // list of files / patterns to load in the browser
    files: [
      
    // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-local-storage/dist/angular-local-storage.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-aws-s3-upload/angular-s3.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/**/*.js',
      // endbower

      //'app/third-party/*.js',
      
      'bower_components/jsbn/jsbn.js',
      'app/third-party/jsbn2.js',
      'bower_components/sjcl/sjcl.js',
      'app/third-party/aws-cognito-sdk.min.js',
      'app/third-party/amazon-cognito-identity.min.js',
      'bower_components/aws-sdk-js/dist/aws-sdk.js',
      

      'app/third-party/*.js.map',
      'app/*.js',
      'app/**/*.js',
      'app/app-services/*.js',
      //'app/!(third-party)/*.js',
      //'app/**/*.js.map',

      'test/*.js',
      'test/spec/**/*.js'
    ],


    // list of files to exclude
    // exclude: ['karma.conf.js', 'protractor-conf.js'    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    browserify: {
          watch: true,
          debug: true
    },

    preprocessors: {
        'app/*.js' : ['browserify'],
        'test/specs/*.js': [ 'browserify' ],
        'app/**/*.js': ['coverage'],
        'test/spec/**/*.js' :['coverage']
     },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    browsers: [
      'Chrome'
    ],
    reporters: ['progress', 'coverage'],
    coverageReporter: {  
      type: 'html',
      dir: 'coverage'
    },


    // web server port
    port: 9001,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-browserify',
      'karma-junit-reporter',
      'karma-coverage' 
    ],

    // enable / disable watching file and executing tests whenever any file changes
    


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
