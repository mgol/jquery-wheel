/**
 * Author & Copyright: Michał Gołębiowski <m.goleb@gmail.com>
 * License: MIT
 * Repository: https://github.com/mzgol/jquery-wheel
 *
 * Thanks to Brandon Aaron (http://brandonaaron.net) for the idea of this plugin.
 */

'use strict';

module.exports = function (grunt) {
    require('time-grunt')(grunt);

    grunt.initConfig({
        eslint: {
            all: {
                src: [
                    '*.js',
                    'src/*.js',
                ],
            },
        },

        jscs: {
            all: {
                src: '<%= eslint.all.src %>',
                options: {
                    config: '.jscsrc',
                },
            },
        },

        copy: {
            all: {
                files: {
                    'dist/jquery.wheel.js': 'src/jquery.wheel.js',
                },
            },
        },

        uglify: {
            all: {
                options: {
                    banner: '/*! jquery.wheel plugin; license: see LICENSE.txt */',
                    sourceMap: true,
                },
                files: {
                    'dist/jquery.wheel.min.js': 'dist/jquery.wheel.js',
                },
            },
        },
    });

    // Load all grunt tasks matching the `grunt-*` pattern.
    require('load-grunt-tasks')(grunt);

    grunt.registerTask('lint', [
        'eslint',
        'jscs',
    ]);

    grunt.registerTask('test', ['lint']);

    grunt.registerTask('build', [
        'copy',
        'uglify',
    ]);

    grunt.registerTask('default', [
        'test',
        'build',
    ]);
};
