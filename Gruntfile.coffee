module.exports = (grunt) ->
  path = require('path')

  grunt.loadNpmTasks 'grunt-jasmine-node'
  grunt.loadNpmTasks 'grunt-es6-module-transpiler'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-copy'

  grunt.initConfig
    'coffee':
      app:
        expand: true
        cwd: 'tmp/'
        src: ['*.coffee']
        dest: 'lib/'
        ext: '.js'
    'transpile':
      app:
        type: 'cjs'
        expand: true
        cwd: 'src/'
        src: ['*.coffee']
        dest: 'tmp/'
        ext: '.coffee'
    jasmine_node:
      specNameMatcher: '_spec'
      projectRoot: '.'
      requirejs: false
      extensions: 'js|coffee'
      forceExit: true
    copy:
      # run this when you want to build the transpiler with your current HEAD
      # and not last stable version installed from NPM
      # revert back to stable with `npm install`
      dist:
        src: 'lib/**/*'
        dest: 'node_modules/grunt-es6-module-transpiler/node_modules/es6-module-transpiler/'


  grunt.registerTask('default', ['transpile', 'coffee', 'jasmine_node'])
