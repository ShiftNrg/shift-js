module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		eslint: {
			options: {
				configFile: 'eslint_ecma5.json',
				reset: true
			},
			target: ['lib/**', 'test/**', '!test/mocha.opts', 'Gruntfile.js', 'index.js']
		},

		pkg: grunt.file.readJSON('package.json'),

		browserify: {
			js: {
				src: './index.js',
				dest: './dist/shift-js.js'
			},
			options: {
				browserifyOptions: {
					standalone: 'shift'
				},
				transform: [['babelify', { 'presets': ['es2015'] }]]
			}
		},

		watch: {
			scripts: {
				files: ['lib/*.js'],
				tasks: ['eslint', 'browserify'],
				options: {
					spawn: false,
					livereload: true
				},
			},
		},

		exec: {
			coverageSingle: {
				command: 'node_modules/.bin/istanbul cover --dir test/.coverage-unit ./node_modules/.bin/_mocha $TEST'
			}
		},

		uglify: {
			options: {
				mangle: false,
				compress: true
			},
			myTarget: {
				files: {
					'dist/shift-js.min.js': ['dist/shift-js.js']
				}
			}
		},

		coveralls: {
			src: 'test/.coverage-unit/*.info'
		}
	});
	
	grunt.registerTask('eslint-fix', 'Run eslint and fix formatting', function () {
		grunt.config.set('eslint.options.fix', true);
		grunt.task.run('eslint');
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-force');
	grunt.loadNpmTasks('grunt-coveralls');
	grunt.registerTask('travis', ['eslint', 'exec:coverageSingle', 'coveralls']);
	grunt.registerTask('default', [
		'force:on',
		'browserify',
		'eslint',
		'uglify'
	]);
};
