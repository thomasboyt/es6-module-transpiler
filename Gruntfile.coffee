module.exports = (grunt) ->
  path = require('path')

  grunt.loadNpmTasks 'grunt-jasmine-node'
  grunt.loadNpmTasks 'grunt-es6-module-transpiler'
  grunt.loadNpmTasks 'grunt-contrib-coffee'

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

  grunt.registerTask('default', ['transpile', 'coffee', 'jasmine_node'])
