/**
 * grunt-togeojson
 * https://github.com/paazmaya/grunt-togeojson
 *
 * Copyright (c) Juga Paazmaya <olavic@gmail.com>
 * Licensed under the MIT license.
 */
'use strict';

module.exports = function gruntConf(grunt) {
  require('time-grunt')(grunt); // Must be first item

  // Project configuration.
  grunt.initConfig({
    eslint: {
      options: {
        config: '.eslintrc',
        format: 'stylish'
      },
      target: [
        'Gruntfile.js',
        'karma.conf.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ]
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    togeojson: {
      geojson: {
        files: {
          'tmp/Naginata.json': ['test/fixtures/Naginata.kml']
        }
      },
      topojson: {
        options: {
          output: 'topojson'
        },
        files: {
          'tmp/Naginata.topo': ['test/fixtures/Naginata.kml']
        }
      },
      geobuf: {
        options: {
          compress: true
        },
        files: {
          'tmp/Naginata.geobuf': ['test/fixtures/Naginata.kml']
        }
      },
      geobuf_topo: {
        options: {
          compress: true,
          output: 'topojson'
        },
        files: {
          'tmp/Naginata.topo.geobuf': ['test/fixtures/Naginata.kml']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    // Code coverage
    karma: {
      coverage: {
        configFile: 'karma.conf.js'
      }
    },

    // Coverage data to coveralls.io
    coveralls: {
      options: {
        coverage_dir: 'coverage'
      }
    }

  });

  grunt.loadTasks('tasks');

  require('jit-grunt')(grunt);

  grunt.registerTask('test', ['clean', 'togeojson', 'nodeunit']);
  grunt.registerTask('default', ['eslint', 'test', 'karma']);

};
