module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      less: {
        src: ['src/**/*.less'],
        dest: 'bin/main.less'
      }
    },

    less: {
      main: {
        options: {
          compress: true
        },
        files: {
          'bin/main.css': 'bin/main.less'
        }
      }
    },

    autoprefixer: {
      less: {
        src: 'bin/main.css'
      }
    },

    uglify: {
      js: {
        files: {
          'bin/main.js': ['lib/**/*.js', 'src/**/*.js']
        }
      }
    },

    processhtml: {
      dev: {
        options: {
          strip: true,
          data: {
            scripts: grunt.file.expand('lib/**/*.js').concat(grunt.file.expand({
              cwd: 'src'
            }, '**/*.js')),
          }
        },
        files: {
          'bin/index.html': 'src/index.html'
        }
      },
      dist: {
        options: {
          data: {
            scripts: ['main.js'],
            templates: grunt.file.expand({
              cwd: 'src'
            }, 'pages/**/*.html')
          }
        },
        files: {
          'bin/index.html': 'src/index.html',
        }
      }
    },
    copy: {
      img: {
        cwd: 'src',
        expand: true,
        src: ['img/**/*'],
        dest: 'dist/',
      }
    },

    inline: {
      options: {
        uglify: true,
        tag: '',
        cssmin: true
      },
      dist: {
        src: ['bin/index.html'],
        dest: ['dist/index.html']
      }
    },

    manifest: {
      generate: {
        options: {
          basePath: 'src',
          network: ['http://*', 'https://*'],
          timestamp: true
        },
        src: ['img/**/*'],
        dest: 'dist/manifest.appcache'
      }
    },

    clean: {
      dist: ['bin', 'dist']
    },

    connect: {
      dev: {
        options: {
          hostname: '*',
          port: 9000,
          base: ['.', 'bin', 'src'],
          livereload: true,
          useAvailablePort: true
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      less: {
        tasks: ['css'],
        files: ['src/**/*.less']
      },
      html: {
        tasks: ['processhtml:dev'],
        files: ['src/**/*.html']
      }
    },
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('css', ['concat', 'less', 'autoprefixer']);
  grunt.registerTask('dev', ['clean', 'css', 'processhtml:dev', 'connect', 'watch'])
  grunt.registerTask('dist', ['clean', 'css', 'processhtml:dist', 'uglify', 'copy', 'inline', 'manifest']);

  grunt.registerTask('default', ['dev']);
};